const passport = require('passport');
const bcrypt = require('bcrypt');

const Users = require('../models/Users');

const saltRounds = 10;

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

const postSignup = async (req, res) => {
//  Ajusta o formato do formulário para o Model do Mongo.
  const dataUser = Object.keys(req.body).reduce((result, element) => {
    if (!element.match('_')) result[element] = req.body[element]
    else {
      const key = element.split(/_([^_]*)$/)
      if (!result[key[0]]) result[key[0]] = {}
      result[key[0]][key[1]] = req.body[element]
    }
    return result;
  }, {});

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(dataUser.password, salt);

  dataUser.password = hash;

  const newUser = new Users(dataUser);
  console.log(await newUser.save());
  res.render('public/signup', { modal: true });

};

module.exports = {
  getLogin,
  postLogin,
  getSignup,
  postSignup,
};
