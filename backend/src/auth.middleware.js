import jwt from "jsonwebtoken";
import { pool } from "./db.js";

export async function requireAuth(req, res, next) {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ")
      ? auth.slice(7)
      : null;

    if (!token) {
      return res.status(401).json({ ok: false, msg: "Token ausente" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // buscar usuário atual
    const result = await pool.query(
      `SELECT id, name, email FROM users WHERE id = $1 LIMIT 1`,
      [decoded.sub]
    );
    const user = result.rows[0];
    if (!user) {
      return res.status(401).json({ ok: false, msg: "Usuário não encontrado" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ ok: false, msg: "Token inválido" });
  }
}
