import { prisma } from "./db.js";
import crypto from "crypto";

function generateCode() {
  // gera 6 dígitos
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function createResetTokenForUser(userId) {
  const code = generateCode();
  const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 min

  // opcional: invalidar tokens antigos ainda não usados
  await prisma.passwordResetToken.updateMany({
    where: {
      userId,
      used: false,
      expiresAt: { gt: new Date() },
    },
    data: {
      used: true,
    },
  });

  const tokenRow = await prisma.passwordResetToken.create({
    data: {
      userId,
      code,
      expiresAt: expires,
    },
  });

  return tokenRow.code;
}

export async function validateResetCode(email, code) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const tokenRow = await prisma.passwordResetToken.findFirst({
    where: {
      userId: user.id,
      code,
      used: false,
      expiresAt: { gt: new Date() },
    },
  });

  if (!tokenRow) return null;

  return { user, tokenRow };
}
