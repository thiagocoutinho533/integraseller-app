// src/pages/RegisterPage.jsx
import { useState } from "react";

export default function RegisterPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!nome || !email || !senha || !confirmar) return alert("Preencha todos os campos");
    if (senha !== confirmar) return alert("As senhas não conferem");
    // (depois vamos trocar por chamada à API)
    localStorage.setItem("token", "TOKEN_FAKE_AQUI");
    window.location.href = "/dashboard";
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirmar senha"
          value={confirmar}
          onChange={(e) => setConfirmar(e.target.value)}
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}
