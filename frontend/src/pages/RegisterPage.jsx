import { useState } from "react";
import { registerUser } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");

    try {
      await registerUser({ name, email, password });
      navigate("/dashboard");
    } catch (error) {
      setErr(error?.error || "Falha no registro");
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "4rem auto", fontFamily: "sans-serif" }}>
      <h2>Criar Conta</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome</label>
          <input
            style={{ width: "100%" }}
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Seu nome"
          />
        </div>

        <div style={{ marginTop: 12 }}>
          <label>E-mail</label>
          <input
            style={{ width: "100%" }}
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="seu@email.com"
          />
        </div>

        <div style={{ marginTop: 12 }}>
          <label>Senha</label>
          <input
            style={{ width: "100%" }}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="min 6 caracteres"
          />
        </div>

        {err && <div style={{ color: "red", marginTop: 12 }}>{err}</div>}

        <button
          style={{ marginTop: 20, width: "100%", padding: "10px 0" }}
          type="submit"
        >
          Registrar
        </button>
      </form>

      <div style={{ marginTop: 16 }}>
        <Link to="/login">Já tenho conta</Link>
      </div>
    </div>
  );
}
