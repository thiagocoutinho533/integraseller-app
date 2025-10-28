import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // por enquanto vamos só "fingir" login
    // depois vamos trocar por chamada à API nova
    if (email && senha) {
      // salva token fake no localStorage
      localStorage.setItem("token", "TOKEN_FAKE_AQUI");
      window.location.href = "/dashboard";
    } else {
      alert("Preencha e-mail e senha");
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
              onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
            />
          </label>

          <label style={styles.label}>
            Senha
            <input
              style={styles.input}
              type="password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              placeholder="••••••••"
            />
          </label>

          <button style={styles.button} type="submit">
            Entrar
          </button>
        </form>

        <div style={{ marginTop: "1rem", fontSize: 14, textAlign: "center" }}>
          <a href="#" style={{ color: "#6366f1" }}>Esqueci minha senha</a>
                 <a href="#" style={{ color: "#6366f1" }}>Cadastre-se</a>
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
    cursor: "pointer",
  },
};
