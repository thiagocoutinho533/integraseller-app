import { Router } from "express";
import jwt from "jsonwebtoken";
import { requireFields, validateEmail } from "./validators.js";


const router = Router();

// Usuário de teste (até ligar com DB/Prisma)
const DEMO_USER = {
  id: 1,
  name: "Admin Demo",
  email: "admin@integraseller.com.br",
  // senha "123456"
  password: "123456"
};

router.post(
  "/login",
  [...requireFields(["email", "password"]), ...validateEmail("email")],
  (req, res) => {
    const { email, password } = req.body;

    if (email !== DEMO_USER.email || password !== DEMO_USER.password) {
      return res.status(401).json({ ok: false, msg: "Credenciais inválidas" });
    }

    const token = jwt.sign(
      { sub: DEMO_USER.id, email: DEMO_USER.email },
      process.env.JWT_SECRET || "dev_secret",
      { expiresIn: "1d" }
    );

    res.json({
      ok: true,
      token,
      user: { id: DEMO_USER.id, name: DEMO_USER.name, email: DEMO_USER.email }
    });
  }
);

router.post(
  "/register",
  [...requireFields(["name", "email", "password"]), ...validateEmail("email")],
  (req, res) => {
    // aqui depois você cria no banco; por enquanto só feedback
    return res.status(501).json({
      ok: false,
      msg: "Registro ainda não implementado no servidor (vamos ligar ao DB/Prisma)."
    });
  }
);

export default router;
