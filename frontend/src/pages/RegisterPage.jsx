import { useState } from "react";
import { apiPost } from "../services/api.js";

export default function RegisterPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!nome || !email || !senha || !confirmar) {
      alert("Preencha todos os campos");
      return;
    }

    if (senha !== confirmar) {
      alert("As senhas não conferem");
      return;
    }

    try {
      setLoading(true);

      // chama backend: POST /auth/register
      const resp = await apiPost("/auth/register", {
        name: nome,
        email,
        password: senha,
      });

      // resp esperado: { ok: true, token, user }
      if (resp && resp.ok && resp.token) {
        localStorage.setItem("token", resp.token);
        localStorage.setItem("user", JSON.stringify(resp.user));
        window.location.href = "/dashboard";
      } else {
        alert("Resposta inesperada do servidor");
      }
    } catch (err) {
      alert(err.message || "Falha ao cadastrar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>Criar conta</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Nome
            <input
              style={styles.input}
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder="Seu nome completo"
              disabled={loading}
            />
          </label>

          <label style={styles.label}>
            E-mail
            <input
              style={styles.input}
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              disabled={loading}
            />
          </label>

          <label style={styles.label}>
            Senha
            <input
              style={styles.input}
              type="password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              placeholder="Crie uma senha"
              disabled={loading}
            />
          </label>

          <label style={styles.label}>
            Confirmar senha
            <input
              style={styles.input}
              type="password"
              value={confirmar}
              onChange={e => setConfirmar(e.target.value)}
              placeholder="Repita a senha"
              disabled={loading}
            />
          </label>

          <button
            style={{
              ...styles.button,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            type="submit"
            disabled={loading}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <div style={styles.linksArea}>
          <a href="/login" style={styles.linkBack}>
            Já tenho conta
          </a>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  },
  card: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#fff",
    borderRadius: 12,
    boxShadow:
      "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
    padding: "2rem",
    border: "1px solid #e2e8f0",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#0f172a",
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  label: {
    fontSize: "0.9rem",
    fontWeight: 500,
    color: "#1e293b",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  input: {
    height: 40,
    borderRadius: 8,
    border: "1px solid #cbd5e1",
    padding: "0 0.75rem",
    fontSize: "0.95rem",
    outline: "none",
  },
  button: {
    height: 42,
    borderRadius: 8,
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    fontWeight: 600,
    fontSize: "1rem",
  },
  linksArea: {
    marginTop: "1.25rem",
    fontSize: 14,
    textAlign: "center",
  },
  linkBack: {
    color: "#6366f1",
    textDecoration: "none",
    fontWeight: 500,
  },
};
