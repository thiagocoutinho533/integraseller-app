// src/validators.js
import { body, validationResult } from "express-validator";

/**
 * Gera validações para checar que os campos existem e não são vazios.
 * Uso: requireFields(["email", "password"])
 */
export function requireFields(fields = []) {
  if (!Array.isArray(fields)) {
    throw new TypeError("requireFields espera um array de strings");
  }
  const chain = fields.map((f) =>
    body(f).exists({ checkFalsy: true }).withMessage(`${f} é obrigatório`)
  );

  // middleware que aplica e retorna 400 se tiver erro
  return [
    ...chain,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ ok: false, errors: errors.array() });
      }
      next();
    },
  ];
}

/**
 * Valida formato de email no campo indicado (default: "email")
 */
export function validateEmail(field = "email") {
  return [
    body(field).isEmail().withMessage("E-mail inválido"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ ok: false, errors: errors.array() });
      }
      next();
    },
  ];
}
