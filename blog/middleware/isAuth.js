const jwt = require('jsonwebtoken')

exports.authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (token == null) {
    req.user = null;
    next();
  } else {
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET_JWT);
      req.user = decodedToken._id;
      //console.log('Decoded user ID:', req.user); // Log decoded user ID -working fine
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      req.user = null;
      next();
    }
  }
};
