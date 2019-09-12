const mongoose = require('mongoose');

const { Schema } = mongoose;

const serviceSchema = new Schema({
  //
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  deadline: { type: Number, required: true },
  price: { type: Number, required: true },
  description: String,
  status: { type: String, enum: ['Aguardando orçamento', 'Orçamento disponibilizado', 'Em andamento', 'Concluído'] },
  userID: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;