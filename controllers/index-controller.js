const index = (req, res) => {
  res.render('public/index');
};

const login = (req, res) => {
  res.render('public/login');
};

module.exports = {
  index,
  login,
};
