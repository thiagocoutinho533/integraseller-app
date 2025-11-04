// backend/src/auth.routes.js
import { Router } from "express";
import { requireFields, validateEmail } from "./validators.js";
import * as Auth from "./auth.controller.js";

const router = Router();

router.post(
  "/login",
  requireFields(["email", "senha"]),
  validateEmail,
  Auth.login
);

router.post(
  "/register",
  requireFields(["nome", "email", "senha"]),
  validateEmail,
  Auth.register
);

export default router;
