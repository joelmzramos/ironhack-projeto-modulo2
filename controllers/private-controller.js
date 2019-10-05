// const home = (req, res) => {
//   res.render('private/home', { user: req.user });
// };


const Users = require('../models/Users');
const Services = require('../models/Services');

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


const home = async (req, res, next) => {
  const user = await Users.findById(req.user._id);
  const isProvider = user.role === "provider";

  const services = await Services.find({ providerID: req.user._id }).populate('customerID');

  const dataHome = {
    user,
    services,
  };

  if (isProvider) {
    return res.render('private/provider/home', dataHome);
  } else {
    return res.render('private/customer/home', dataHome);
  };
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


// const customer = (req, res) => {
//   res.render('private/customer');
// };

const editUser = (req, res) => {
  res.render('private/edit-user', {user:req.user, coreBusiness: req.user.coreBusiness, state: req.user.completeAddress.state });

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
  editUser,
  // customer,
  detail,
  newService,
  createService,
};
