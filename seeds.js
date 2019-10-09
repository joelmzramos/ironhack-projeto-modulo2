const mongoose = require('mongoose');
const Users = require('./models/Users'); // Import of the model Recipe from './models/Recipe'
const Service = require('./models/Services'); // Import of the model Recipe from './models/Recipe'

const { Schema } = mongoose;

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
    imgPath: '',
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
    username: 'MBRANDAO',
    password: hash,
    role: 'service provider',
    name: 'Marcus Brandão',
    phoneNumber: 1149442222,
    cellPhone: 11999440033,
    email: 'testeprojeto@ironhack.com',
    cpf: '33802223136',
    imgPath: '',
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

const dataServices = [{
  name: 'Revisão Completa',
  startDate: new Date(),
  deadline: '2',
  price: 40,
  description: 'Revisão completa com troca de óleo',
  status: 'Aguardando orçamento',
  providerID: '5d9e4fac53f20c0e878766c0',
  customerID: '5d9e4fc253f20c0e878766c1',
},
{
  name: 'Alinhamento',
  startDate: new Date(),
  deadline: '1',
  price: 40,
  description: 'Alinhamento e Balanceamento',
  status: 'Aguardando orçamento',
  providerID: '5d9e4fac53f20c0e878766c0',
  customerID: '5d9e4fc253f20c0e878766c1',
},
{
  name: 'Funilaria',
  startDate: new Date(),
  deadline: '1',
  price: 40,
  description: 'Alinhamento e Balanceamento',
  status: 'Aguardando orçamento',
  providerID: '5d9e4fac53f20c0e878766c0',
  customerID: '5d9e4fc253f20c0e878766c1',
},
]

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/project-module-2', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

Service.insertMany(dataServices)
  .then((celebritys) => {
    console.log(celebritys);
    mongoose.disconnect();
  })
  .catch((err) => {
    console.log(err);
  });

// Service.deleteMany()
//   .then((celebritys) => {
//     console.log(celebritys);
//     mongoose.disconnect();
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Users.insertMany(data)
//   .then((celebritys) => {
//     console.log(celebritys);
//     mongoose.disconnect();
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Users.deleteMany()
//   .then((celebritys) => {
//     console.log(celebritys);
//     mongoose.disconnect();
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// console.log(Users.find());
