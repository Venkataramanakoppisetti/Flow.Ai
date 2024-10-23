const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).json({ message: 'No token provided' });
  }

  const tokenParts = authHeader.split(' ');

  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(403).json({ message: 'Invalid token format' });
  }

  const token = tokenParts[1];
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log('Token verification error:', err); 
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.userId = decoded.id; 
    next();
  });
}

module.exports = verifyToken;
