export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function requireFields(body, fields) {
  for (const f of fields) {
    if (!body[f]) {
      return { error: `Campo obrigatório ausente: ${f}` };
    }
  }
  return null;
}
