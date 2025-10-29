import { apiPost } from "../services/api";
import { saveSession } from "../services/auth";

async function handleSubmit(e) {
  e.preventDefault();
  if (!email || !senha) return alert("Preencha e-mail e senha");

  try {
    const resp = await apiPost("/auth/login", { email, password: senha });
    // só entra se a API retornar ok e token
    if (resp?.ok && resp.token) {
      saveSession(resp);                 // guarda token + user
      window.location.href = "/dashboard";
    } else {
      alert(resp?.msg || "Credenciais inválidas");
    }
  } catch (err) {
    alert(err.message || "Falha no login");
  }
}
