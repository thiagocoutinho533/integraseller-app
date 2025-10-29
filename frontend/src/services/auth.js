export function saveSession({ token, user }) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user || null));
}

export function isAuthenticated() {
  const t = localStorage.getItem("token");
  return Boolean(t && t !== "TOKEN_FAKE_AQUI");
}
