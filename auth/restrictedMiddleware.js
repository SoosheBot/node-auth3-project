const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets');

module.exports = (req,res,next) => {
  
  const { authorization } = req.headers;

  if (authorization) {
    jwt.verify(authorization, jwtSecret, (err, decodedToken) => {
      if (err) {
        //the token is not valid
        res.status(401).json({ message: "token is not valid"})
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    })  
  } else {
    res.status(401).json({ message: "missing token"});
  }
};
