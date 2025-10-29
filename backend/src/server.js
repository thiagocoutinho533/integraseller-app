import "dotenv/config";
import express from "express";
import cors from "cors";

import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import passwordResetRoutes from "./passwordReset.routes.js";

const app = express();

// ajuste CORS pro teu frontend
app.use(cors({
  origin: true, // depois em produção podemos travar p/ "https://integraseller.com.br"
  credentials: true,
}));
app.use(express.json());

// healthcheck
app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

// rotas de auth
app.use("/api/auth", authRoutes);

// rotas de usuários (CRUD básico)
app.use("/api/users", userRoutes);

// fluxo esqueci minha senha
app.use("/api/password-reset", passwordResetRoutes);

// porta
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
