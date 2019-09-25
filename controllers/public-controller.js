const index = (req, res) => {
  res.render('public/index');
};

const about = (req, res) => {
  res.render('public/about');
};

const login = (req, res) => {
  res.render('public/login');
};

const message = (req, res) => {
  res.render('public/message');
};

module.exports = {
  index,
  about,
  login,
  message
};
