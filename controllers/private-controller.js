const passport = require('passport');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Users = require('../models/Users');
const Services = require('../models/Services');

const home = async (req, res, next) => {
  const user = await Users.findById(req.user._id);
  const isProvider = user.role === "provider";

  if (isProvider) {
    const services = await Services.find({ providerID: req.user._id }).populate('customerID');
    const dataHome = {
      user,
      services,
    };
    return res.render('private/provider/home', dataHome);
  } else {
    const services = await Services.find({ customerID: req.user._id }).populate('providerID');
    const dataHome = {
      user,
      services,
    };
    return res.render('private/customer/home', dataHome);
  };
};

// =================================EDIT USER CONTROLS BELOW==========================================

const getEditUser = (req, res) => {
  res.render('private/edit-user', { user: req.user, coreBusiness: req.user.coreBusiness, state: req.user.completeAddress.state });
};

const postEditUser = async (req, res) => {
  console.log(req.user);
  const { username, role, name, phoneNumber, cellPhone, email, cpf, address, number, complement, neighborhood, city, state, postalCode, cnpj, coreBusiness } = req.body;
  try {
    const id = req.user._id;
    await Users.findByIdAndUpdate(id, { username, role, name, phoneNumber, cellPhone, email, cpf, address, number, complement, neighborhood, city, state, postalCode, cnpj, coreBusiness });
    res.redirect('/home');
  } catch (error) {
    console.log(error);
  }
};

// =================================EDIT PASSWORD CONTROLS BELOW==========================================

const passwordMessage = (req, res) => {
  res.render('public/pssword-message');
};

const getEditPassword = (req, res) => {
  res.render('private/edit-password', { user: req.user, coreBusiness: req.user.coreBusiness, state: req.user.completeAddress.state });
};

const postEditPassword = async (req, res) => {
  const id = req.user._id;
  const { password } = req.body;
  console.log(password, 'string grandonaaaaaaaaaaaaaaaaaaaaaaaaaa');
  if (password === '') {
    res.render("private/password-message", { message: `O campo "senha" é de preenchimento obrigatório.` });
    return;
  }
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  
  try {
    await Users.findByIdAndUpdate(id, { password: hash });
    res.render("private/password-message", { modal: true });
  } catch (error) {
    console.log(error);
  }
};

// =================================SERVICES CONTROLS BELOW==========================================

const service = async (req, res) => {
  const { serviceId } = req.params;
  const detail = await Services.findById(serviceId);
  res.render('private/service', detail);
};

const newService = (req, res) => {
  res.render('private/newservice');
};

// const createService = (req, res) => {
// };

// =================================LOGOUT CONTROLS BELOW==========================================

const getLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) console.log(err);
    res.redirect('/login');
  });
};

// ===================================================================================================


module.exports = {
  home,
  getEditUser,
  postEditUser,
  getEditPassword,
  postEditPassword,
  passwordMessage,
  service,
  newService,
  // createService,
  getLogout,
};



// =================================EDIT PASSWORD CONTROLS BELOW==========================================



// router.get('/edit-password', ensureLogin.ensureLoggedIn(), (req, res) => {
//   res.render('private/edit-password', { id: req.user._id });
// });

// router.post('/edit-password/:id', ensureLogin.ensureLoggedIn(), async (req, res) => {
//   const { id } = req.params;
//   const { password } = req.body;
//   console.log(password, 'string grandonaaaaaaaaaaaaaaaaaaaaaaaaaa');
//   if (password === '') {
//     res.render('private/edit-password', { errorMessage: 'Required password!' });
//     return;
//   }
//   const salt = bcrypt.genSaltSync(saltRounds);
//   const hashPass = bcrypt.hashSync(password, salt);

//   try {
//     await User.findByIdAndUpdate(id, { password: hashPass });
//     res.redirect('/show-users');
//   } catch (error) {
//     console.log(error);
//   }
// });




// router.get('/edit/:id', ensureLogin.ensureLoggedIn(), (req, res) => {
//   let {id} = req.params;
//   Interesse.findById(id)
//   .then(interesse => {
//     res.render('interesse/edit', { interesse, user: req.user});
//   })
//   .catch(err => console.log(err));
// });

// router.post('/edit/:id', (req, res) => {
//   let {id} = req.params;
//   let {tipo, aeroportos} = req.body;
//   let airports = aeroportos.split(',');
//   Interesse.update({_id: id}, {tipo: tipo, airports: airports})
//   .then(() => {
//     res.redirect('/interesse');
//   })
//   .catch(err => console.log(err));
// });


// <div class="bg admin">
// <form method="POST" action="/interesse/edit/{{_id}}" class="form-signin">
//   <p><label for="tipo">Nome do interesse: </label><input type="text" name="tipo" value="{{tipo}}" class="form-signin"></p>
//   <p><label for="aeroportos">Aeroportos (Separar por vírgula): </label><input type="text" name="aeroportos" value="{{airports}}" class="form-signin"></p>
//   <p><button type="submit" class="btn btn-lg btn-primary logo">Enviar</button></p>
// </form>
// </div>