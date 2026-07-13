// Simple admin-token header check for the appointments admin endpoints.
// Deliberately not a full auth system (per spec).
export function adminAuth(req, res, next) {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) {
    return res.status(503).json({ error: 'Admin access is not configured on this server (ADMIN_TOKEN missing).' });
  }
  const provided = req.get('x-admin-token');
  if (provided !== expected) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }
  next();
}
