const jwt = require('jsonwebtoken')

exports.authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (token == null) {
    req.user = null; // Set req.user to an empty object to indicate that the user is not authenticated
    next();
  } else {
    const decodedToken = jwt.verify(token, process.env.SECRET_JWT);
    if (decodedToken) {
      req.user = decodedToken._id;
    } else {
      // Set req.user to an empty object to indicate that the user is not authenticated
      req.user = null;
    }
    next();
  }
};