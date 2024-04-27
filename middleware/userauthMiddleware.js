const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'thala', (err, decodedToken) => {
      if (err) {
        reject(err);
      } else {
        resolve(decodedToken);
      }
    });
  });
};

const userRequireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    verifyToken(token)
      .then((decodedToken) => {
        console.log(decodedToken);
        next();
      })
      .catch((err) => {
        console.log(err.message);
        res.redirect('/userlogin');
      });
  } else {
    res.redirect('/userlogin');
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    verifyToken(token)
      .then((decodedToken) => {
        console.log(decodedToken);
        User.findById(decodedToken.id)
          .then((user) => {
            res.locals.user = user;
            next();
          })
          .catch((err) => {
            console.error(err.message);
            res.locals.user = null;
            next();
          });
      })
      .catch((err) => {
        console.log(err.message);
        res.locals.user = null;
        next();
      });
  } else {
    res.locals.user = null;
    next();
  }
};

const getUsername = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    verifyToken(token)
      .then((decodedToken) => {
        console.log(decodedToken);
        User.findById(decodedToken.id)
          .then((user) => {
            res.locals.username = user.username;
            next();
          })
          .catch((err) => {
            console.error(err.message);
            res.locals.username = null;
            next();
          });
      })
      .catch((err) => {
        console.log(err.message);
        res.locals.username = null;
        next();
      });
  } else {
    res.locals.username = null;
    next();
  }
};

module.exports = { userRequireAuth, checkUser, getUsername };
