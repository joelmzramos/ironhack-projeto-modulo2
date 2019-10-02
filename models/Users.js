const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  // required fields for every user:
  username: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'service provider'], required: true },
  name: { type: String },
  phoneNumber: { type: Number },
  cellPhone: { type: Number },
  email: { type: String },
  cpf: { type: Number },

  // optional fields for every user:
  imgPath: { type: String },
  adress: {
    street: { type: String },
    number: { type: Number },
    complement: { type: String },
    neighborhood: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: Number },
  },

  // fields for service providers:
  cnpj: { type: Number },
  coreBusiness: { type: String },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
