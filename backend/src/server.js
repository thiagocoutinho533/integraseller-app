// src/server.js
import "dotenv/config";
import express from "express";
import cors from "cors";

import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import passwordResetRoutes from "./passwordReset.routes.js";

const app = express();

// CORS: libera só seu domínio em produção
app.use(
  cors({
    origin: [
      "https://integraseller.com.br",
      "https://www.integraseller.com.br",
      "http://localhost:5173", // mantém pra desenvolvimento local
    ],
    credentials: true,
  })
);

app.use(express.json());

// healthcheck
app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

// rotas de autenticação
app.use("/api/auth", authRoutes);

// rotas CRUD user
app.use("/api/users", userRoutes);

// fluxo esqueci a senha
app.use("/api/password-reset", passwordResetRoutes);

// porta da API
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`✅ API rodando na porta ${PORT} (env=${process.env.NODE_ENV || "dev"})`);
});
