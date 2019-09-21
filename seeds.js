const mongoose = require('mongoose');
const Users = require('./models/Users'); // Import of the model Recipe from './models/Recipe'
const bcrypt = require('bcrypt');

const saltRounds = 10;
const password = '123456';
const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync(password, salt);


const data = [
  {
    username: 'JRAMOS',
    password: hash,
    role: 'service provider',
    name: 'Joel Ramos',
    phoneNumber: 1149442222,
    cellPhone: 11999440033,
    email: 'testeprojeto@ironhack.com',
    cpf: '33802223136',
    profilePicture: '',
    adress: {
      street: 'Rua da Ironhack',
      number: 2950,
      complement: '',
      neighborhood: 'Jardim Paulista',
      city: 'São Paulo',
      state: 'SP',
      postalCode: '05555000',
    },
    cnpj: '36340375000148',
    coreBusiness: 'Mecânica',
  },
  {
    user: 'MBRANDAO',
    password: hash,
    role: 'service provider',
    name: 'Marcos Brandão',
    phoneNumber: 1149442222,
    cellPhone: 11999440033,
    email: 'testeprojeto@ironhack.com',
    cpf: '33802223136',
    profilePicture: '',
    adress: {
      street: 'Rua da Ironhack',
      number: 2950,
      complement: '',
      neighborhood: 'Jardim Paulista',
      city: 'São Paulo',
      state: 'SP',
      postalCode: '05555000',
    },
    cnpj: '36340375000148',
    coreBusiness: 'Mecânica',
  },
];

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/project-module-2', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

// Users.insertMany(data)
//   .then((celebritys) => {
//     console.log(celebritys);
//     mongoose.disconnect();
//   })
//   .catch((err) => {
//     console.log(err);
//   });

Users.deleteMany()
  .then((celebritys) => {
    console.log(celebritys);
    mongoose.disconnect();
  })
  .catch((err) => {
    console.log(err);
  });

// console.log(Users.find());
