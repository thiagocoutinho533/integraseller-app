import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "./db.js";
import { requireFields, validateEmail } from "./validators.js";
import { authMiddleware } from "./auth.middleware.js";

const router = express.Router();

// Gera JWT
function generateToken(user) {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );
}

/**
 * POST /auth/register
 * body: { name, email, password }
 */
router.post("/register", async (req, res) => {
  const err = requireFields(req.body, ["name", "email", "password"]);
  if (err) return res.status(400).json({ message: err });

  const { name, email, password } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).json({ message: "E-mail inválido" });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(400).json({ message: "E-mail já cadastrado" });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: hash,
    },
  });

  const token = generateToken(user);

  return res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
});

/**
 * POST /auth/login
 * body: { email, password }
 */
router.post("/login", async (req, res) => {
  const err = requireFields(req.body, ["email", "password"]);
  if (err) return res.status(400).json({ message: err });

  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }

  const token = generateToken(user);

  return res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
});

/**
 * GET /auth/me
 * header: Authorization: Bearer <token>
 * retorna dados do usuário logado
 */
router.get("/me", authMiddleware, async (req, res) => {
  const current = await prisma.user.findUnique({
    where: { id: req.user.userId },
    select: { id: true, name: true, email: true, role: true },
  });

  return res.json({ user: current });
});

export default router;
