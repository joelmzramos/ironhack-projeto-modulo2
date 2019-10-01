const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  // required fields for every user:
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'service provider'], required: true },
  name: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  cellPhone: { type: Number, required: true },
  email: { type: String, required: true },
  cpf: { type: Number, required: true },

  // optional fields for every user:
  profilePicture: { type: String },
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
  customerID: { type: Schema.Types.ObjectId, ref: 'Users' },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
