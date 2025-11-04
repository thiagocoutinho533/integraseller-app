// backend/src/validators.js
export function requireFields(fields) {
  // fields PRECISA ser array: ["email", "senha"]
  return function (req, res, next) {
    if (!Array.isArray(fields)) {
      return res.status(500).json({ error: "validators: 'fields' deve ser um array" });
    }
    for (const f of fields) {
      const v = req.body?.[f];
      if (v === undefined || v === null || v === "") {
        return res.status(400).json({ error: `Campo '${f}' é obrigatório` });
      }
    }
    next();
  };
}

export function validateEmail(req, res, next) {
  const email = req.body?.email;
  if (email) {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!ok) return res.status(400).json({ error: "E-mail inválido" });
  }
  next();
}
