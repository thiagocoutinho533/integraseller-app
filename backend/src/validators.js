// backend/src/validators.js
export function requireFields(...fields) {
  // aceita requireFields('email','senha') OU requireFields(['email','senha'])
  const list = Array.isArray(fields[0]) ? fields[0] : fields;

  return (req, res, next) => {
    const bag = { ...req.body, ...req.query, ...req.params };
    const missing = list.filter((f) => bag[f] === undefined || bag[f] === null || bag[f] === "");
    if (missing.length) {
      return res.status(400).json({
        error: "missing_fields",
        fields: missing,
      });
    }
    next();
  };
}

export function validateEmail(field = "email") {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
  return (req, res, next) => {
    const value = (req.body?.[field] ?? req.query?.[field] ?? req.params?.[field] ?? "").toString();
    if (!re.test(value)) {
      return res.status(400).json({ error: "invalid_email", field });
    }
    next();
  };
}
