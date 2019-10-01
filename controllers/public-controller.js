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
  res.render('public/signup-message');
};

const loginMessage = (req, res) => {
  res.render('public/login-message', { message: 'Incorrect*************************** password' });
};

module.exports = {
  index,
  about,
  login,
  signupMessage,
  loginMessage
};
