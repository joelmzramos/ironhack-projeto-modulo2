const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  // required fields for every user:
  role: { type: String, enum: ['customer', 'provider'], required: true },
  username: { type: String, required: true},
  email: { type: String, required: true},
  password: { type: String, required: true },
  
  // optional fields for every user:
  name: { type: String },
  phoneNumber: { type: Number },
  cellPhone: { type: Number },
  cpf: { type: Number },
  imgPath: { type: String },
  completeAddress: {
    address: { type: String },
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
  // userCanceled: { type: Boolean, default: false},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
