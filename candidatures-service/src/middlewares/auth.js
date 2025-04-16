const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (role) => (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token manquant' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (role && decoded.role !== role) {
      return res.status(403).json({ message: 'Accès interdit' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide' });
  }
};
