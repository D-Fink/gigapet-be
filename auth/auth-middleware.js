const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config/secrets.js')

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if(token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if(err) {
        // the token is not valid
        res.status(401).json({ message: `token invalid: ${err}`, token})
      } else {
        req.user = decodedToken;
        next();
      }
    })
  } else {
    res.status(401).json({ you: 'shall not pass!'})
  }
};