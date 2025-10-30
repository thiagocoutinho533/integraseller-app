import "dotenv/config.js";
import express from "express";
import cors from "cors";
import authRoutes from "./auth.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true, msg: "API rodando 👌" }));
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API ouvindo na porta ${PORT}`));
