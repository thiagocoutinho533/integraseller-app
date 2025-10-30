// src/validators.js
export function requireFields(...fields) {
  return (req, res, next) => {
    for (const f of fields) {
      const v = req.body?.[f];
      if (v === undefined || v === null || String(v).trim() === "") {
        return res.status(400).json({ error: `Campo '${f}' é obrigatório.` });
      }
    }
    next();
  };
}

export function validateEmail(field = "email") {
  return (req, res, next) => {
    const value = req.body?.[field];
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || "");
    if (!ok) {
      return res.status(400).json({ error: `Campo '${field}' inválido.` });
    }
    next();
  };
}
