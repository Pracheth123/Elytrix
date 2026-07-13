// All API access lives here. Content falls back to the local snapshot so the
// page never blanks if the API or MongoDB is unreachable.
import fallback from './data/fallback.json';

const BASE = import.meta.env.VITE_API_BASE_URL || '';

export async function fetchContent() {
  try {
    const res = await fetch(`${BASE}/api/content`);
    if (!res.ok) throw new Error(`content request failed (${res.status})`);
    return await res.json();
  } catch (err) {
    console.warn('[api] using local fallback content:', err.message);
    return fallback;
  }
}

export async function submitAppointment(payload) {
  const res = await fetch(`${BASE}/api/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(body.error || 'Booking request failed.');
    error.details = body.details;
    throw error;
  }
  return body;
}
