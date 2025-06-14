const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('authHeader:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decoded token:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log('JWT error:', err.message);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

const admin = (req, res, next) => {
  console.log('User role:', req.user.role);
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admins only' });
  }
};

module.exports = { protect, admin };
