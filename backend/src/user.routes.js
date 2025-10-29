import express from "express";
import { prisma } from "./db.js";
import { authMiddleware } from "./auth.middleware.js";

const router = express.Router();

/**
 * GET /users
 * Lista usuários (somente logado, depois podemos filtrar por admin)
 */
router.get("/", authMiddleware, async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  res.json(users);
});

/**
 * PATCH /users/:id
 * body: { name?, role? }
 */
router.patch("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, role } = req.body;

  const updated = await prisma.user.update({
    where: { id },
    data: {
      ...(name ? { name } : {}),
      ...(role ? { role } : {}),
    },
    select: { id: true, name: true, email: true, role: true },
  });

  res.json(updated);
});

/**
 * DELETE /users/:id
 */
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  await prisma.user.delete({
    where: { id },
  });

  res.json({ ok: true });
});

export default router;
