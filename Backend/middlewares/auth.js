const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token requerido.');
  
  const tokenWithoutBearer = token.split(' ')[1];

  jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send('Token inválido.');
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
