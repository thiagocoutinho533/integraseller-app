// backend/src/validators.js
export function requireFields(fields = []) {
  return (req, res, next) => {
    // garante array
    const list = Array.isArray(fields) ? fields : [];
    for (const f of list) {
      const v = req.body?.[f];
      if (v === undefined || v === null || v === "") {
        return res.status(400).json({ error: `Campo obrigatório: ${f}` });
      }
    }
    next();
  };
}

export function validateEmail(req, res, next) {
  const { email } = req.body || {};
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "E-mail inválido" });
  }
  next();
}
