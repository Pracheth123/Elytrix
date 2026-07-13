// The Express app, exported without listening — used by both the local dev
// server (src/index.js) and the Vercel serverless function (api/index.js).
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { ensureDb, isDbConnected } from './db.js';
import contentRouter from './routes/content.js';
import appointmentsRouter from './routes/appointments.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();
app.set('trust proxy', 1);

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN ? process.env.CLIENT_ORIGIN.split(',') : true
  })
);
app.use(express.json({ limit: '50kb' }));

// Ensure a DB connection before each request; never fail the request here —
// routes respond 503 themselves when Mongo is unreachable and the client
// falls back to its local content snapshot.
app.use(async (req, res, next) => {
  try {
    await ensureDb();
  } catch (err) {
    console.warn(`[mongo] connection unavailable: ${err.message}`);
  }
  next();
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), mongo: isDbConnected() ? 'connected' : 'disconnected' });
});
app.use('/api/content', contentRouter);
app.use('/api/appointments', appointmentsRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
