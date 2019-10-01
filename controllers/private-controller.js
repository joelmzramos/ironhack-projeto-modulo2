const Users = require('../models/Users');
const home = (req, res) => {
  
  res.render('private/home');
};

const customer = (req, res) => {
  
  res.render('private/customer');
};

const detail = (req, res) => {
  res.render('private/detail');
};

const newService = (req, res) => {
  res.render('private/newservice');
  // Users.find({})
};

const createService = (req, res) => {

};

module.exports = {
  home,
  customer,
  detail,
  newService,
  createService,
};
