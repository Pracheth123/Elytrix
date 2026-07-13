import { Router } from 'express';
import Doctor from '../models/Doctor.js';
import { isDbConnected } from '../db.js';

const router = Router();

// Small in-memory cache — content changes only when re-seeded/edited.
const CACHE_TTL_MS = 5 * 60 * 1000;
let cache = { doc: null, at: 0 };

router.get('/', async (req, res, next) => {
  try {
    if (cache.doc && Date.now() - cache.at < CACHE_TTL_MS) {
      res.set('Cache-Control', 'public, max-age=300');
      return res.json(cache.doc);
    }
    if (!isDbConnected()) {
      return res.status(503).json({ error: 'Content database unavailable. The client should use its local fallback.' });
    }
    const doc = await Doctor.findOne({ slug: 'dr-sravanthi-j' }).lean();
    if (!doc) {
      return res.status(503).json({ error: 'Content not seeded yet. Run `npm run seed` in /server.' });
    }
    cache = { doc, at: Date.now() };
    res.set('Cache-Control', 'public, max-age=300');
    res.json(doc);
  } catch (err) {
    next(err);
  }
});

export default router;
