const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'meu_segredo_jwt';

// Middleware para verificar se o token é válido
const verificarToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];  // Extrai o token do header Authorization

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    req.user = decoded;  // Armazena as informações do usuário no `req`
    next();  // Chama o próximo middleware ou controlador
  });
};

module.exports = { verificarToken };
