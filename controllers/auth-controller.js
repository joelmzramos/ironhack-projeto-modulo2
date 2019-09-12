const getLogin = (req, res) => {
  res.render('public/login');
};

const postLogin = (req, res) => {
  res.redirect('/home');
};

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
