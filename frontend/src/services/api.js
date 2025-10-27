// base do backend em dev
export const API_URL = 'http://localhost:4000/api';

export async function apiPost(path, data) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) throw json;
  return json;
}

export async function apiGet(path) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const json = await res.json();
  if (!res.ok) throw json;
  return json;
}
