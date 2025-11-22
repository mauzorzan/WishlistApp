# 🚀 Deployment Guide

## Quick Deploy to Vercel (5 minutes)

### Step 1: Prepare Your Code

Make sure all your changes are committed to Git:

\`\`\`bash
git init
git add .
git commit -m "Initial wishlist app"
\`\`\`

### Step 2: Push to GitHub

1. Create a new repository on [GitHub](https://github.com/new)
2. Push your code:

\`\`\`bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
\`\`\`

### Step 3: Deploy on Vercel

**Option A: Using Vercel Dashboard (Easiest)**

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js - no configuration needed!
5. Click "Deploy"
6. Wait 2-3 minutes
7. Your app is live! 🎉

**Option B: Using Vercel CLI**

\`\`\`bash
npm install -g vercel
vercel login
vercel
\`\`\`

Follow the prompts and your app will be deployed!

### Step 4: Access Your App

After deployment, Vercel will give you a URL like:
\`\`\`
https://your-app-name.vercel.app
\`\`\`

## ⚠️ Important: Database Persistence

The current SQLite setup works great for local development, but Vercel's serverless environment doesn't persist files between deployments.

**What this means:**
- Your data will be reset on each new deployment
- The database works fine between requests, just not across deployments

### Solution: Upgrade to Cloud Database (Recommended for Production)

Choose one of these options:

---

## Option 1: Vercel Postgres (Easiest)

### Setup (5 minutes)

1. In your Vercel project dashboard:
   - Go to "Storage" tab
   - Click "Create Database"
   - Select "Postgres"
   - Click "Continue"

2. Install the Vercel Postgres package:

\`\`\`bash
npm install @vercel/postgres
\`\`\`

3. Update `lib/db.ts`:

\`\`\`typescript
import { sql } from '@vercel/postgres';

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

// Initialize table
export async function initializeDatabase() {
  await sql\`
    CREATE TABLE IF NOT EXISTS wishlist_items (
      id SERIAL PRIMARY KEY,
      link TEXT NOT NULL,
      notes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  \`;
}

export const getAll = async (): Promise<WishlistItem[]> => {
  const { rows } = await sql\`SELECT * FROM wishlist_items ORDER BY created_at DESC\`;
  return rows as WishlistItem[];
};

export const getById = async (id: number): Promise<WishlistItem | undefined> => {
  const { rows } = await sql\`SELECT * FROM wishlist_items WHERE id = \${id}\`;
  return rows[0] as WishlistItem | undefined;
};

export const create = async (item: NewWishlistItem): Promise<WishlistItem> => {
  const { rows } = await sql\`
    INSERT INTO wishlist_items (link, notes)
    VALUES (\${item.link}, \${item.notes || null})
    RETURNING *
  \`;
  return rows[0] as WishlistItem;
};

export const update = async (id: number, item: Partial<NewWishlistItem>): Promise<WishlistItem | undefined> => {
  const existing = await getById(id);
  if (!existing) return undefined;

  const { rows } = await sql\`
    UPDATE wishlist_items
    SET link = \${item.link !== undefined ? item.link : existing.link},
        notes = \${item.notes !== undefined ? item.notes : existing.notes},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = \${id}
    RETURNING *
  \`;
  return rows[0] as WishlistItem | undefined;
};

export const remove = async (id: number): Promise<boolean> => {
  const result = await sql\`DELETE FROM wishlist_items WHERE id = \${id}\`;
  return result.rowCount > 0;
};
\`\`\`

4. Update your API routes to use async/await (they already do!)

5. Deploy:

\`\`\`bash
git add .
git commit -m "Upgrade to Vercel Postgres"
git push
\`\`\`

Vercel will automatically redeploy with the database connected!

---

## Option 2: Supabase (Great Free Tier)

### Setup (10 minutes)

1. Go to [supabase.com](https://supabase.com) and create account
2. Create a new project
3. Get your connection string from Settings → Database
4. Install Postgres client:

\`\`\`bash
npm install pg
npm install -D @types/pg
\`\`\`

5. Add to Vercel environment variables:
   - Go to your Vercel project → Settings → Environment Variables
   - Add: \`DATABASE_URL\` = your Supabase connection string

6. Update `lib/db.ts` with Postgres client code

7. Deploy!

---

## Option 3: Railway (Keeps SQLite!)

Railway supports persistent storage, so you can keep using SQLite!

### Setup (5 minutes)

\`\`\`bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up
\`\`\`

Railway will:
- Build your app
- Create persistent storage for SQLite
- Give you a live URL

No code changes needed!

---

## Testing Your Deployment

1. Open your deployed URL
2. Add a test item
3. Refresh the page - item should persist
4. Try all CRUD operations
5. Check dark mode works

## Updating Your Deployed App

Whenever you make changes:

\`\`\`bash
git add .
git commit -m "Your change description"
git push
\`\`\`

Vercel will automatically rebuild and redeploy!

## Troubleshooting

### "Module not found" errors
- Make sure all dependencies are in \`package.json\`
- Run \`npm install\` locally first
- Commit \`package-lock.json\`

### Database connection errors
- Check environment variables are set in Vercel
- Verify connection string is correct
- Check database is running (for Supabase/PlanetScale)

### Build fails
- Check build logs in Vercel dashboard
- Try building locally first: \`npm run build\`
- Ensure no TypeScript errors

### App loads but data doesn't save
- Check API routes are working: \`https://your-app.vercel.app/api/wishlist\`
- Check browser console for errors
- Verify database connection

## Custom Domain (Optional)

1. Go to your Vercel project → Settings → Domains
2. Add your domain
3. Follow DNS setup instructions
4. Wait for SSL certificate (automatic)

## Monitoring

Vercel provides:
- **Analytics**: Usage stats
- **Logs**: Runtime logs
- **Speed Insights**: Performance metrics

Access from your project dashboard!

---

## Need Help?

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Postgres Guide](https://vercel.com/docs/storage/vercel-postgres)

---

Happy deploying! 🚀

