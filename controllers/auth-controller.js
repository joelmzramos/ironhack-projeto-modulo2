const bcrypt = require('bcrypt');

const Users = require('../models/Users');

const getLogin = (req, res) => {
  res.render('public/login');
};

const postLogin = async (req, res) => {
  
}
// const postLogin = async (req, res) => {
//   console.log(req.body);
//   const { username, password } = req.body;
//   if (username === '' || password === '') {
//     res.render('public/login', {
//       errorMessage: 'Please enter both, username and password to sign up.',
//     });
//     return;
//   }

//   const user = await Users.findOne({ user: username });

//   if (!user) {
//     res.render('public/login', { errorMessage: "The username doesn't exist." });
//     return;
//   }

//   if (bcrypt.compareSync(password, user.password)) {
//     // req.session.currentUser = user;
//     // console.log(req.user);
//     // req.user.role = user.role;
//     console.log(req.isAuthenticated());
//     res.redirect('/');
//   } else {
//     res.render('public/login', { errorMessage: 'Usuário ou senha inválido!' });
//   }
//   res.redirect('/home');
// };

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
