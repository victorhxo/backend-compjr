import mongoose from '../../database';
import bcrypt from 'bcryptjs';

const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  senha: { type: String, required: true, select: false },
  tokenResetarSenha: { type: String, select: false },
  tokenResetarSenhaExpirado: { type: Date, select: false },
  dataCriacao: { type: Date, default: Date.now },
  imagem: { type: String, required: true },
  administrador: {
    type: Boolean,
    default: false,
  },
});

usuarioSchema.pre('save', function (next) {
  bcrypt
    .hash(this.senha, 10)
    .then((hash) => {
      this.senha = hash;
      next();
    })
    .catch((error) => {
      console.error('Error hashing password', error);
    });
});

export default mongoose.model('Usuario', usuarioSchema);
