import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './auth.routes.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // frontend local
  credentials: true,
}));
app.use(express.json());

// healthcheck
app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

// rotas de autenticação
app.use('/api/auth', authRoutes);

// rota protegida de exemplo
import { authMiddleware } from './auth.middleware.js';
app.get('/api/dashboard', authMiddleware, (req, res) => {
  res.json({
    message: 'Bem-vindo ao dashboard',
    user: req.user,
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API up on :${PORT}`);
});
