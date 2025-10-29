// server.js
import "dotenv/config.js"; // mantém
import express from "express";
import cors from "cors";
import authRoutes from "./auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// rota health (pra monitor / nginx / uptime)
app.get("/api/health", (req, res) => {
  res.json({ ok: true, msg: "API rodando 👌" });
});

// rotas de auth (cadastrar, logar, etc)
app.use("/api/auth", authRoutes);

// porta
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API ouvindo na porta ${PORT}`);
});
