const passport = require('passport');

const getLogin = (req, res) => {
  res.render('public/login');
};

const postLogin = passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: false,
});

const getSignup = (req, res) => {
  res.render('public/signup');
};

const postSignup = (req, res) => {
  res.redirect('/login');
};

module.exports = {
  getLogin,
  postLogin,
  getSignup,
  postSignup,
};
