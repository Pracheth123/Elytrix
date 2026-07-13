# Dr. Sravanthi J Portfolio — Vercel deployment package

This folder is a self-contained, deploy-ready copy of the website, adapted for Vercel:

- **`client/`** — the React + Vite + Tailwind site, built to static files by Vercel.
- **`server/`** — the Express + Mongoose API. On Vercel it does **not** run as a long-lived process; the app is exported from `server/src/app.js` and served as a serverless function.
- **`api/index.js`** — the Vercel serverless entry. `vercel.json` rewrites every `/api/*` request to it.
- **`vercel.json`** — build command, output directory (`client/dist`), and the API rewrite.

The only code difference from the main project: the server was split into `src/app.js` (the Express app, exported) + `src/index.js` (local `app.listen`), and the MongoDB connection is now lazy and cached per invocation (`ensureDb()` in `src/db.js`) — required because serverless functions have no startup phase.

## Prerequisites

1. **MongoDB Atlas** (free tier is fine) — Vercel cannot reach a database on your laptop.
   - Create a cluster, a database user, and allow network access from `0.0.0.0/0` (Vercel functions have no fixed IP).
   - Copy the connection string, e.g. `mongodb+srv://USER:PASS@cluster0.xxxxx.mongodb.net/dr-sravanthi-portfolio`.
2. A Vercel account, and either the [Vercel CLI](https://vercel.com/docs/cli) (`npm i -g vercel`) or a Git repository connected to Vercel.

## Step 1 — Seed the Atlas database (run once, from this folder)

```powershell
npm install
$env:MONGODB_URI = "mongodb+srv://USER:PASS@cluster0.xxxxx.mongodb.net/dr-sravanthi-portfolio"
npm run seed
```

Re-run the seed any time you edit `server/src/data/doctor-content.json` (and mirror edits into `client/src/data/fallback.json`).

## Step 2 — Deploy

**Option A — Vercel CLI (fastest):**

```powershell
vercel          # first deploy: accept defaults, root = this folder
vercel --prod
```

**Option B — Git:** push this folder as a repository and import it in the Vercel dashboard. The build command (`npm run build`) and output directory (`client/dist`) are already set by `vercel.json`.

## Step 3 — Environment variables (Vercel dashboard → Project → Settings → Environment Variables)

| Variable | Value |
|---|---|
| `MONGODB_URI` | your Atlas connection string |
| `ADMIN_TOKEN` | a long random string — protects `GET`/`PATCH /api/appointments` |

`CLIENT_ORIGIN` is not needed: on Vercel the site and the API share one origin.

Redeploy after adding variables (env vars are baked in at deploy time).

## Step 4 — Verify

- `https://your-project.vercel.app/api/health` → `{"status":"ok", ..., "mongo":"connected"}`
- `https://your-project.vercel.app/api/content` → the full content document
- Submit the booking form on the site → appears in `GET /api/appointments` (with the `x-admin-token` header)

## Notes & limits

- **If Atlas is unreachable**, the site still renders — the client ships a local content fallback; only the booking form degrades (it points visitors to call/WhatsApp).
- **Rate limiting** (5 booking requests/hour/IP) uses an in-memory store, which resets whenever a serverless instance is recycled. Acceptable at this traffic level; switch to a shared store (e.g. Upstash Redis) if it ever matters.
- **Local development** works the same as the main project: `npm run dev` (client on :5173 proxying to the API on :5000).
- Content placeholders still pending from the client are listed in the main project's `TODO.md`.
