import { body } from "express-validator";

export const registerValidator = [
  body("name").isString().notEmpty().withMessage("Nome é obrigatório"),
  body("email").isEmail().withMessage("E-mail inválido"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Senha precisa ter pelo menos 6 caracteres"),
];

export const loginValidator = [
  body("email").isEmail().withMessage("E-mail inválido"),
  body("password").notEmpty().withMessage("Senha é obrigatória"),
];
