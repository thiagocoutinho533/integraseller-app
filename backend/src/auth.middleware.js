import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token não enviado' });

  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Token mal formatado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded tem id, email, name, role
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}
