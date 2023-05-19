import mongoose from '../../database';

const carroSchema = new mongoose.Schema({
  nomeVeiculo: { type: String, required: true },
  placa: { type: String, required: true, unique: true },
  combustivel: { type: String, required: true },
  cor: { type: String, required: true },
  ano: { type: Number, required: true },
  valor: { type: Number, required: true },
});

export default mongoose.model('Carro', carroSchema);
