# ✨ Wishlist App

A beautiful, full-stack CRUD application for managing your wishlist. Save links to items you want with notes, all stored in a lightweight SQLite database.

## Features

- ✅ **Create** - Add new items with links and notes
- 📝 **Read** - View all your wishlist items
- ✏️ **Update** - Edit existing items
- 🗑️ **Delete** - Remove items you no longer want
- 🎨 **Beautiful UI** - Modern, responsive design with dark mode support
- 🔗 **URL Validation** - Ensures all links are valid URLs
- 💾 **Persistent Storage** - SQLite database for reliable data storage

## Tech Stack

- **Frontend**: Next.js 16, React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite (better-sqlite3)
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 20.5.1 or higher
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd Wishlist
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

The app will automatically create a SQLite database in the `data/` directory.

## Deployment

### Vercel (Recommended)

#### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub:
\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
\`\`\`

2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js settings
6. Click "Deploy"

#### Option 2: Deploy via Vercel CLI

\`\`\`bash
npm install -g vercel
vercel
\`\`\`

Follow the prompts to deploy.

### Important Notes for Production

⚠️ **Database Persistence on Vercel:**

Vercel's serverless environment doesn't persist files between deployments. For production, you'll want to upgrade to a cloud database:

#### Recommended Database Options:

1. **Vercel Postgres** (Easiest for Vercel deployments)
   - Free tier available
   - Seamless integration with Vercel
   - [Setup Guide](https://vercel.com/docs/storage/vercel-postgres)

2. **Supabase** (PostgreSQL)
   - Free tier available
   - Great for relational data
   - [Setup Guide](https://supabase.com/docs)

3. **PlanetScale** (MySQL)
   - Free tier available
   - Serverless database platform
   - [Setup Guide](https://planetscale.com/docs)

#### To Migrate to a Cloud Database:

1. Choose a database provider from above
2. Update `lib/db.ts` to use the new database connection
3. Install the appropriate database client (e.g., `@vercel/postgres`, `pg`, or `mysql2`)
4. Add database credentials to Vercel environment variables

### Alternative Deployment Options

#### Railway

\`\`\`bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
\`\`\`

Railway supports persistent storage, so SQLite will work out of the box!

#### Render

1. Create a new Web Service
2. Connect your GitHub repository
3. Render will auto-detect Next.js
4. Deploy

Note: For persistent SQLite on Render, you'll need to use a persistent disk.

## Project Structure

\`\`\`
Wishlist/
├── app/
│   ├── api/
│   │   └── wishlist/
│   │       ├── route.ts          # GET, POST endpoints
│   │       └── [id]/
│   │           └── route.ts      # GET, PUT, DELETE by ID
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page with UI
├── lib/
│   └── db.ts                     # Database utilities
├── data/
│   └── wishlist.db              # SQLite database (auto-created)
├── public/                       # Static assets
└── package.json
\`\`\`

## API Routes

### Get All Items
\`\`\`
GET /api/wishlist
\`\`\`

### Create Item
\`\`\`
POST /api/wishlist
Body: { link: string, notes?: string }
\`\`\`

### Get Single Item
\`\`\`
GET /api/wishlist/:id
\`\`\`

### Update Item
\`\`\`
PUT /api/wishlist/:id
Body: { link: string, notes?: string }
\`\`\`

### Delete Item
\`\`\`
DELETE /api/wishlist/:id
\`\`\`

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Database Schema

\`\`\`sql
CREATE TABLE wishlist_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  link TEXT NOT NULL,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
\`\`\`

## Customization

### Changing Colors

Edit the gradient in `app/page.tsx`:

\`\`\`tsx
// From purple/pink/blue theme
className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50"

// To your custom colors
className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50"
\`\`\`

### Adding Features

Some ideas for extensions:
- 🔍 Search functionality
- 🏷️ Tags/categories
- 📊 Priority levels
- 🖼️ Image previews for links
- 👥 User authentication
- 📱 Mobile app (React Native)

## Troubleshooting

### Port Already in Use

If port 3000 is already in use:
\`\`\`bash
PORT=3001 npm run dev
\`\`\`

### Database Locked Error

If you get a "database is locked" error, ensure you're not running multiple instances of the app.

### Module Not Found Errors

Clear the cache and reinstall:
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project however you'd like!

## Support

If you have any questions or run into issues, please open an issue on GitHub.

---

Made with ❤️ using Next.js and TypeScript
