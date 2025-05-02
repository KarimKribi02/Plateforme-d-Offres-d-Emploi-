const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant ou invalide.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // même secret que dans le microservice auth
    req.user = decoded; // { id, email, role }
    
    // For admin routes, if we're checking role-specific access
    // the controller will handle the permission checks
    
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token invalide.' });
  }
};
