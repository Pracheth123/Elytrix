import { ZodError } from 'zod';

export function notFound(req, res) {
  res.status(404).json({ error: 'Not found.' });
}

// Centralised error handler — every route throws or next(err)s into here.
export function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation failed.',
      details: err.issues.map((i) => ({ field: i.path.join('.'), message: i.message }))
    });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid identifier.' });
  }

  console.error('[error]', err);
  res.status(err.status || 500).json({ error: err.expose ? err.message : 'Internal server error.' });
}
