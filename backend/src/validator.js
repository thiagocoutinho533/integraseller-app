export function requireFields(obj, fields) {
  for (const f of fields) {
    if (!obj[f] || String(obj[f]).trim() === "") {
      return `Campo obrigatório ausente: ${f}`;
    }
  }
  return null;
}

export function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}
