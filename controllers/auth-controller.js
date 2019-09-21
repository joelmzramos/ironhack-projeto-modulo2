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
  //  Ajustar o formato do formulário para o model do Mongo.

  // explicitar os campos do body
  const { username, password, role, name, phoneNumber, cellPhone, email, cpf, profilePicture, street, number, complement, neighborhood, city, state, postalCode, cnpj, coreBusiness } = req.body;

  const userData = {
    username,
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

  // const dataUser = Object.keys(req.body).reduce((result, element) => {
  //   if (!element.match('_')) result[element] = req.body[element]
  //   else {
  //     const key = element.split(/_([^_]*)$/)
  //     if (!result[key[0]]) result[key[0]] = {}
  //     result[key[0]][key[1]] = req.body[element]
  //   }
  //   return result;
  // }, {});


  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(userData.password, salt);

  userData.password = hash;

  const newUser = new Users(userData);
  console.log(newUser);

  try {
    await newUser.save();
  } catch (error) {
    console.log(error);
  }
  

  // ========================NODEMAILER CODE (ABAIXO)===============================

  const nodemailer = require('nodemailer');
  async function main() {
    // let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: 'acompanheaqui@outlook.com',
        pass: 'Project2Ironhack2019'
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
// ===========================NODEMAILER CODE (ACIMA)==============================
  try {
    await main()
  } catch (error) {
    console.log(error);
  }

  res.render('public/signup', { modal: true });

};

module.exports = {
  getLogin,
  postLogin,
  getSignup,
  postSignup,
};
