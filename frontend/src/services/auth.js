import { apiPost } from './api';

export async function registerUser({ name, email, password }) {
  const { user, token } = await apiPost('/auth/register', { name, email, password });
  // salva
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  return { user, token };
}

export async function loginUser({ email, password }) {
  const { user, token } = await apiPost('/auth/login', { email, password });
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  return { user, token };
}

export function getCurrentUser() {
  const raw = localStorage.getItem('user');
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export function isAuthenticated() {
  return !!localStorage.getItem('token');
}
