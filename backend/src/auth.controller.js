// backend/src/auth.controller.js
import { prisma } from "./db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export async function register(req, res) {
  try {
    const { nome, email, senha } = req.body;

    const existe = await prisma.user.findUnique({ where: { email } });
    if (existe) return res.status(409).json({ error: "E-mail já cadastrado" });

    const hash = await bcrypt.hash(senha, 10);
    const user = await prisma.user.create({
      data: { nome, email, senhaHash: hash },
      select: { id: true, nome: true, email: true, createdAt: true },
    });

    return res.status(201).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao registrar" });
  }
}

export async function login(req, res) {
  try {
    const { email, senha } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Credenciais inválidas" });

    const ok = await bcrypt.compare(senha, user.senhaHash);
    if (!ok) return res.status(401).json({ error: "Credenciais inválidas" });

    const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: "12h" });
    return res.json({ token, user: { id: user.id, nome: user.nome, email: user.email } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao autenticar" });
  }
}
