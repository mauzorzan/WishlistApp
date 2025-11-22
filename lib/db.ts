import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbDir = path.join(process.cwd(), 'data');
const dbPath = path.join(dbDir, 'wishlist.db');

// Ensure data directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS wishlist_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    link TEXT NOT NULL,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export interface WishlistItem {
  id: number;
  link: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface NewWishlistItem {
  link: string;
  notes?: string;
}

export const getAll = (): WishlistItem[] => {
  const stmt = db.prepare('SELECT * FROM wishlist_items ORDER BY created_at DESC');
  return stmt.all() as WishlistItem[];
};

export const getById = (id: number): WishlistItem | undefined => {
  const stmt = db.prepare('SELECT * FROM wishlist_items WHERE id = ?');
  return stmt.get(id) as WishlistItem | undefined;
};

export const create = (item: NewWishlistItem): WishlistItem => {
  const stmt = db.prepare('INSERT INTO wishlist_items (link, notes) VALUES (?, ?)');
  const result = stmt.run(item.link, item.notes || null);
  return getById(result.lastInsertRowid as number)!;
};

export const update = (id: number, item: Partial<NewWishlistItem>): WishlistItem | undefined => {
  const existing = getById(id);
  if (!existing) return undefined;

  const stmt = db.prepare(
    'UPDATE wishlist_items SET link = ?, notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
  );
  stmt.run(
    item.link !== undefined ? item.link : existing.link,
    item.notes !== undefined ? item.notes : existing.notes,
    id
  );
  return getById(id);
};

export const remove = (id: number): boolean => {
  const stmt = db.prepare('DELETE FROM wishlist_items WHERE id = ?');
  const result = stmt.run(id);
  return result.changes > 0;
};

export default db;

