const API_BASE = "/api"; // nginx já proxy /api -> backend

function getAuthHeader() {
  const token = localStorage.getItem("token");
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

export async function apiPost(path, bodyObj) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(bodyObj),
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    // tenta mensagem amigável do backend
    const msg =
      (data && data.msg) ||
      (data && data.error) ||
      "Erro ao comunicar com servidor";
    throw new Error(msg);
  }

  return data;
}

export async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      ...getAuthHeader(),
    },
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const msg =
      (data && data.msg) ||
      (data && data.error) ||
      "Erro ao comunicar com servidor";
    throw new Error(msg);
  }

  return data;
}
