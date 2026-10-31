// Locally, calls go to /api, which Vite proxies to the Spring Boot backend (see vite.config.js).
// Online, VITE_API_URL (set in Netlify) points at the deployed backend, e.g. https://navya-portfolio-api.onrender.com
const API_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');
const BASE = `${API_URL}/api`;

async function handle(res) {
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(body.message || `Request failed (${res.status})`);
  }
  return body;
}

export function fetchProfile() {
  return fetch(`${BASE}/profile`).then(handle);
}

export function photoUrl(version) {
  return `${BASE}/profile/photo?v=${version}`;
}

export function uploadPhoto(file, adminKey) {
  const form = new FormData();
  form.append('file', file);
  return fetch(`${BASE}/profile/photo`, {
    method: 'POST',
    headers: { 'X-Admin-Key': adminKey },
    body: form,
  }).then(handle);
}

export function sendContactMessage(message) {
  return fetch(`${BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message),
  }).then(handle);
}
