// Vercel serverless entry — every /api/* request is rewritten here (see
// vercel.json) and handled by the same Express app used in local dev.
// The app connects to MongoDB lazily per invocation (cached across warm
// invocations) instead of at startup.
import app from '../server/src/app.js';

export default app;
