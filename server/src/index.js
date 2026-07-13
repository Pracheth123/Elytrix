// Local development entry — runs the same app Vercel serves as a function.
import app from './app.js';
import { ensureDb } from './db.js';

const port = process.env.PORT || 5000;

ensureDb().catch((err) => {
  console.warn(`[mongo] initial connection failed (${err.message}). API running; content served from client fallback.`);
});

app.listen(port, () => console.log(`[api] listening on http://localhost:${port}`));
