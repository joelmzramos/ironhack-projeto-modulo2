// const home = (req, res) => {
//   res.render('private/home', { user: req.user });
// };


const Users = require('../models/Users');

// const home = (req, res, next) => {
//   console.log("////////////////////////////////////////////", req.user, "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
//   Users.find()
//     .then(users => {
//       console.log(users);
//       res.render('private/home', { users });
// // res.render("private/home", { user: username });
//     })
//     .catch(err => console.log(err));
// };


const home = (req, res, next) => {
  console.log('============>entrou na home<======================================');
  Users.findById(req.user._id)
    .then(user => {
      console.log(user);
      res.render('private/home', user)
    })
    .catch(err => console.log(err));
};

// router.get('/:id', (req, res, next) => {
//   console.log('============>entrou na show celebrities<================');
//   Celebrity.findById(req.params.id)
//   .then(celebrity => {
//     console.log(celebrity);
//     res.render('celebrities/show', celebrity)
//   })
//   .catch(err => console.log(err));
// });


// router.get('/profile', ensureLogin.ensureLoggedIn(), (req, res) => {
//   // console.log(req.user)
//   res.render('auth/profile', { user: req.user });
// });


const customer = (req, res) => {
  res.render('private/customer');
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
  customer,
  detail,
  newService,
  createService,
};
