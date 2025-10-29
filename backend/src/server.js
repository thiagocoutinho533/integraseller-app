import express from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import passwordResetRoutes from "./passwordReset.routes.js";

const app = express();
app.use(express.json());

// 🔥 rota de saúde da API (debug Nginx / PM2 / etc)
app.get("/health", (req, res) => {
  res.json({ ok: true, msg: "API rodando 👌" });
});

// rotas reais da aplicação
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/password-reset", passwordResetRoutes);

// porta
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API escutando na porta ${PORT}`);
});
