const home = (req, res) => {
  res.render('private/home');
};

const detail = (req, res) => {
  res.render('private/detail');
};

const newService = (req, res) => {
  res.render('private/newservice');
};

const createService = (req, res) => {

};

module.exports = {
  home,
  detail,
  newService,
  createService,
};
