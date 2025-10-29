// /var/www/integraseller-app/backend/src/validators.js

export function requireFields(fields, reqBody) {
  for (const field of fields) {
    if (
      reqBody[field] === undefined ||
      reqBody[field] === null ||
      reqBody[field] === ""
    ) {
      throw new Error(`Campo obrigatório ausente: ${field}`);
    }
  }
}

export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(String(email).toLowerCase())) {
    throw new Error("Email inválido");
  }
}
