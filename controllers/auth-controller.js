const passport = require('passport');
const bcrypt = require('bcrypt');
const Users = require('../models/Users');
const saltRounds = 10;
require('dotenv').config();

const emailAdress = process.env.NODEMAILER_ADDRESS;
// console.log(Adress, "========================================================================");
const emailPassword = process.env.NODEMAILER_PASSWORD;
// console.log(Password, "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");

const getSignup = (req, res) => {
  res.render('public/signup');
};

const postSignup = async (req, res) => {
  const { username, password, role, name, phoneNumber, cellPhone, email, cpf, profilePicture, street, number, complement, neighborhood, city, state, postalCode, cnpj, coreBusiness } = req.body;
  const userData = {
    username, // same as "username = username"
    password,
    role,
    name,
    phoneNumber,
    cellPhone,
    email,
    cpf,
    profilePicture,
    street,
    number,
    complement,
    neighborhood,
    city,
    state,
    postalCode,
    cnpj,
    coreBusiness,
    adress: {
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      postalCode,
    }
  };

  // =================================SIGNUP CONTROLS BELOW==========================================

  if (username === "" || email === "" || password === "") {
    console.log("empty username, e-mail or password");
    res.render("public/signup-message", { message: `Os campos "usuário", "e-mail" e "senha" são de preenchimento obrigatório. Tente novamente.` });
  } else if (username.length > 15 || password.length > 15) {
    console.log("username or password less than 15 characters");
    res.render("public/signup-message", { message: `Os campos "usuário" e "senha" devem ter no máximo 15 caracteres. Tente novamente.` });
  }

  Users.findOne({ username })
    .then(user => {
      if (user) {
        res.render("public/signup-message", { message: `O nome de "usuário" escolhido já está em uso. Tente outro.` });
        return;
      }
    })
    .catch(error => {
      next(error)
    });

  Users.findOne({ email })
    .then(user => {
      if (user) {
        res.render("public/signup-message", { message: `O endereço de e-mail escolhido já está em uso. Tente outro.` });
        return;
      }
    })
    .catch(error => {
      next(error)
    });

  // =================================SIGNUP CONTROLS ABOVE==========================================

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(userData.password, salt);

  userData.password = hash;

  const newUser = new Users(userData);
  console.log(newUser);

  // ========================NODEMAILER CODE (BELOW)===============================

  const nodemailer = require('nodemailer');
  async function main() {
    // let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        // user: emailAdress,
        // pass: emailPassword

      }
    });

    let info = await transporter.sendMail({
      from: 'Acompanhe Aqui', // sender address
      to: userData.email, // list of receivers
      subject: 'Cadastro no aplicativo Acompanhe Aqui', // Subject line
      text: 'Bem vindo ao aplicativo Acompanhe Aqui! Não perca tempo e acompanhe já os seus serviços contratados. Acesse a nossa plataforma por meio da url: http://acompanheaqui.herokuapp.com e complete o seu cadastro. Sua senha inicial é 1234 e, para a sua segurança, deve ser alterada no primeiro acesso. Equipe Acompanhe Aqui', // plain text body
      html: '<p>Bem vindo ao aplicativo Acompanhe Aqui!</p><br><p>Não perca tempo e acompanhe já os seus serviços contratados. Acesse a nossa plataforma por meio da url: http://acompanheaqui.herokuapp.com e complete o seu cadastro. Sua senha inicial é 1234 e, para a sua segurança, deve ser alterada no primeiro acesso.</p><br><p>Equipe Acompanhe Aqui</p>'// html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  // ===========================NODEMAILER CODE (ABOVE)==============================

  try {
    await main()
    newUser.save((err) => {
      if (err) {
        res.render("public/signup-message", { message: "Ocorreu um erro no cadastro do usuário. Tente novamente." });
      }
    });
    res.render('public/signup-message', { modal: true });
  } catch (error) {
    res.render("public/signup-message", { message: "Ocorreu um erro no envio de e-mail para o usuário cadastrado. Verifique se o endereço inserido de e-mail está correto e tente novamente. Caso o erro persista, entre em contato com a Acompanhe Aqui." });

  }
  // res.render('public/succes-login-page');
};

// =================================LOGIN CONTROLS BELOW==========================================


const getLogin = (req, res) => {
  res.render('public/login');
};

const postLogin = passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: false,
});

// =================================LOGIN CONTROLS ABOVE==========================================

const getLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) console.log(err);
    res.redirect('/login');
  });
};

module.exports = {
  getLogin,
  postLogin,
  getSignup,
  postSignup,
  getLogout,
};

