import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { validateRegisterBody, validateLoginBody } from './validators.js';

const prisma = new PrismaClient();

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );
}

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    // valida request
    const invalid = validateRegisterBody({ name, email, password });
    if (invalid) {
      return res.status(400).json({ error: invalid });
    }

    // já existe email?
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return res.status(400).json({ error: 'E-mail já cadastrado' });
    }

    // hash da senha
    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
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

  } catch (err) {
    console.error('register error:', err);
    return res.status(500).json({ error: 'Erro interno' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    // valida request
    const invalid = validateLoginBody({ email, password });
    if (invalid) {
      return res.status(400).json({ error: invalid });
    }

    // busca user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // confere senha
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
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

  } catch (err) {
    console.error('login error:', err);
    return res.status(500).json({ error: 'Erro interno' });
  }
}
