const jwt = require('jsonwebtoken');
const createError = require('http-errors');
// const client = require('./init_redisHelper');
const passport = require('passport');

module.exports = {
  signAccessToken: (user) => {
    return new Promise((resolve, reject) => {
      const payload = { user };
      console.log(process.env.ACCESS_TOKEN_SECRET);
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: '30m',
        issuer: 'ibrew-Hub.com',
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err);
          reject(createError(500, 'Internal Server Error'));
          return;
        }
        const bearerToken = 'Bearer ' + token;
        resolve(bearerToken);
      });
    });
  },
  verifyAccessToken: (req, res, next) => {
    if (!req.headers['authorization']) return next(createError(401, 'Unauthorized'));
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        const message = err.name === 'JsonWebTokenError' ? 'Unauthorized Access' : err.message;
        return next(createError(401, message));
      }
      req.payload = payload;
      next();
    });
  },
};
