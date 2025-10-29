import { Router } from "express";
import { register, login, me } from "./auth.controller.js";
import { requireAuth } from "./auth.middleware.js";
import { registerValidator, loginValidator } from "./auth.validators.js";

const router = Router();

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);
router.get("/me", requireAuth, me);

export default router;
