// src/auth.routes.js
import { Router } from "express";
import { requireFields, validateEmail } from "./validators.js";
import * as controller from "./auth.controller.js";

const router = Router();

router.post(
  "/login",
  requireFields("email", "senha"),
  validateEmail("email"),
  controller.login
);

router.post(
  "/register",
  requireFields("nome", "email", "senha"),
  validateEmail("email"),
  controller.register
);

export default router;
