const index = (req, res) => {
  res.render('public/index');
};

const about = (req, res) => {
  res.render('public/about');
};

const login = (req, res) => {
  res.render('public/login');
};

const signupMessage = (req, res) => {
  res.render('public/signupMessage');
};

const loginMessage = (req, res) => {
  res.render('public/loginMessage');
};

module.exports = {
  index,
  about,
  login,
  signupMessage,
  loginMessage
};
