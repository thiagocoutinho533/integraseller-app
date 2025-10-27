export function validateRegisterBody({ name, email, password }) {
  if (!name || !email || !password) return 'Campos obrigatórios ausentes';
  if (password.length < 6) return 'Senha muito curta';
  // validações simples, podemos refinar depois
  return null;
}

export function validateLoginBody({ email, password }) {
  if (!email || !password) return 'E-mail e senha são obrigatórios';
  return null;
}
