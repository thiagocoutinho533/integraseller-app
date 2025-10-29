import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !senha) {
      alert("Preencha e-mail e senha");
      return;
    }

    try {
      setLoading(true);
      const resp = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: senha }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        alert(err?.msg || "Login inválido");
        return;
      }

      const data = await resp.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Erro de rede. Tente novamente.");
    } finally {
      setLoading(false);
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

          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div style={{ marginTop: "0.5rem", fontSize: 14, textAlign: "center" }}>
          <a href="/register" style={{ color: "#6366f1" }}>Criar uma conta</a>
        </div>
        <div style={{ marginTop: "1rem", fontSize: 14, textAlign: "center" }}>
          <a href="#" style={{ color: "#6366f1" }}>Esqueci minha senha</a>
        </div>
      </div>
    </div>
  );
}

const styles = { /* ... seus estilos iguais ... */ };
