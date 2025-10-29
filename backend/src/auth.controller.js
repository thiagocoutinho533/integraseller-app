import { validationResult } from "express-validator";
import {
  createUser,
  findUserByEmail,
  generateToken,
  sanitizeUser,
} from "./auth.service.js";
import bcrypt from "bcryptjs";

export async function register(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ ok: false, errors: errors.array() });
  }

  const { name, email, password } = req.body;

  // já existe?
  const existing = await findUserByEmail(email);
  if (existing) {
    return res
      .status(409)
      .json({ ok: false, msg: "E-mail já cadastrado" });
  }

  const newUser = await createUser({ name, email, password });
  const token = generateToken(newUser);

  res.json({
    ok: true,
    token,
    user: sanitizeUser(newUser),
  });
}

export async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ ok: false, errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) {
    return res
      .status(401)
      .json({ ok: false, msg: "Credenciais inválidas" });
  }

  const okPass = await bcrypt.compare(password, user.password_hash);
  if (!okPass) {
    return res
      .status(401)
      .json({ ok: false, msg: "Credenciais inválidas" });
  }

  const token = generateToken(user);

  res.json({
    ok: true,
    token,
    user: sanitizeUser(user),
  });
}

export async function me(req, res) {
  // req.user vem do middleware de auth
  res.json({
    ok: true,
    user: sanitizeUser(req.user),
  });
}
