// frontend/src/pages/LoginPage.jsx
import { useState } from "react";
import { apiLogin } from "../services/api";
import { saveToken } from "../services/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const r = await apiLogin({ email, senha });
      const data = await r.json();
      if (!r.ok) {
        alert(data?.msg || "Credenciais inválidas");
        return;
      }
      saveToken(data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      alert("Falha ao comunicar com o servidor.");
    }
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>Entrar</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            E-mail
            <input
              style={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
            />
          </label>

          <label style={styles.label}>
            Senha
            <input
              style={styles.input}
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
            />
          </label>

          <button style={styles.button} type="submit">Entrar</button>
        </form>

        <div style={{ marginTop: 8, textAlign: "center" }}>
          <a href="/register" style={{ color: "#6366f1" }}>Criar uma conta</a>
        </div>
        <div style={{ marginTop: 8, textAlign: "center" }}>
          <a href="/forgot" style={{ color: "#6366f1" }}>Esqueci minha senha</a>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: { minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", padding: 32 },
  card: { width: "100%", maxWidth: 360, background: "#fff", borderRadius: 12, boxShadow: "0 20px 25px -5px rgba(0,0,0,.1), 0 10px 10px -5px rgba(0,0,0,.04)", padding: 24, border: "1px solid #e2e8f0" },
  title: { fontSize: 24, fontWeight: 600, color: "#0f172a", textAlign: "center", marginBottom: 16 },
  form: { display: "flex", flexDirection: "column", gap: 12 },
  label: { fontSize: 14, fontWeight: 500, color: "#1e293b", display: "flex", flexDirection: "column", gap: 6 },
  input: { height: 40, borderRadius: 8, border: "1px solid #cbd5e1", padding: "0 12px", fontSize: 15, outline: "none" },
  button: { height: 42, borderRadius: 8, background: "#2563eb", color: "#fff", border: "none", fontWeight: 600, fontSize: 16, cursor: "pointer" },
};
