import { prisma } from "./db.js";            // ajuste seu import do prisma
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

function normalizeEmail(email) {
  return (email || "").trim().toLowerCase();
}

export async function register(req, res) {
  try {
    const { nome, email } = req.body;
    const passRaw = req.body.senha ?? req.body.password;

    if (!nome || !email || !passRaw) {
      return res.status(400).json({ ok: false, msg: "Campos obrigatórios" });
    }

    const emailNorm = normalizeEmail(email);
    const exists = await prisma.user.findUnique({ where: { email: emailNorm } });
    if (exists) {
      return res.status(409).json({ ok: false, msg: "E-mail já cadastrado" });
    }

    const hash = await bcrypt.hash(passRaw, 10);
    const user = await prisma.user.create({
      data: { nome, email: emailNorm, senhaHash: hash }, // use o nome do campo de senha que estiver no seu schema
      select: { id: true, nome: true, email: true }
    });

    return res.status(201).json({ ok: true, user });
  } catch (err) {
    console.error("REGISTER ERR:", err);
    return res.status(500).json({ ok: false, msg: "Erro interno" });
  }
}

export async function login(req, res) {
  try {
    const { email } = req.body;
    const passRaw = req.body.senha ?? req.body.password;

    if (!email || !passRaw) {
      return res.status(400).json({ ok: false, msg: "E-mail e senha são obrigatórios" });
    }

    const emailNorm = normalizeEmail(email);
    const user = await prisma.user.findUnique({
      where: { email: emailNorm },
      select: { id: true, nome: true, email: true, senhaHash: true } // ajuste pro campo certo
    });

    if (!user) {
      return res.status(401).json({ ok: false, msg: "Credenciais inválidas" });
    }

    const ok = await bcrypt.compare(passRaw, user.senhaHash);
    if (!ok) {
      return res.status(401).json({ ok: false, msg: "Credenciais inválidas" });
    }

    const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: "7d" });
    return res.json({
      ok: true,
      token,
      user: { id: user.id, nome: user.nome, email: user.email }
    });
  } catch (err) {
    console.error("LOGIN ERR:", err);
    return res.status(500).json({ ok: false, msg: "Erro interno" });
  }
}
