// backend/src/server.js
import express from "express";
import cors from "cors";
import authRoutes from "./auth.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API ouvindo na porta ${PORT}`));
