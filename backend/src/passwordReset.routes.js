import express from "express";
import bcrypt from "bcryptjs";
import { prisma } from "./db.js";
import { requireFields, validateEmail } from "./validators.js";
import { createResetTokenForUser, validateResetCode } from "./passwordReset.service.js";
import { sendResetCode } from "./mailer.js";

const router = express.Router();

/**
 * POST /password-reset/request
 * body: { email }
 * gera código e manda e-mail
 */
router.post("/request", async (req, res) => {
  const err = requireFields(req.body, ["email"]);
  if (err) return res.status(400).json({ message: err });

  const { email } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).json({ message: "E-mail inválido" });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  // Segurança: Nunca revelar se o e-mail existe ou não.
  if (!user) {
    return res.json({ ok: true });
  }

  const code = await createResetTokenForUser(user.id);

  // dispara e-mail
  try {
    await sendResetCode(email, code);
  } catch (e) {
    console.error("Falha ao enviar e-mail:", e);
  }

  return res.json({ ok: true });
});

/**
 * POST /password-reset/verify
 * body: { email, code }
 * verifica se código é válido e não expirou
 */
router.post("/verify", async (req, res) => {
  const err = requireFields(req.body, ["email", "code"]);
  if (err) return res.status(400).json({ message: err });

  const { email, code } = req.body;

  const result = await validateResetCode(email, code);
  if (!result) {
    return res.status(400).json({ valid: false, message: "Código inválido ou expirado" });
  }

  return res.json({ valid: true });
});

/**
 * POST /password-reset/confirm
 * body: { email, code, newPassword }
 */
router.post("/confirm", async (req, res) => {
  const err = requireFields(req.body, ["email", "code", "newPassword"]);
  if (err) return res.status(400).json({ message: err });

  const { email, code, newPassword } = req.body;

  const result = await validateResetCode(email, code);
  if (!result) {
    return res.status(400).json({ message: "Código inválido ou expirado" });
  }

  const { user, tokenRow } = result;

  // atualiza senha
  const hash = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash: hash,
    },
  });

  // marca token como usado
  await prisma.passwordResetToken.update({
    where: { id: tokenRow.id },
    data: {
      used: true,
    },
  });

  return res.json({ ok: true });
});

export default router;
