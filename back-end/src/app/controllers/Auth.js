import { Router } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import Usuario from '../schemes/Usuario';
import authConfig from '@/config/auth';
import Mailer from '@/modules/Mailer';
import Multer from '../middlewares/Multer';

const router = new Router();

const generateToken = (params) => {
  return jwt.sign(params, authConfig.secret, { expiresIn: 86400 });
};

router.post('/register', Multer.single('imagem'), (req, res) => {
  const { nome, email, senha } = req.body;

  Usuario.findOne({ email })
    .then((userData) => {
      if (userData) {
        return res.status(400).send({ error: 'Usuario já existe' });
      } else {
        if (req.file) {
          console.log('Arquivo recebido', req.file);

          const caminhoImagem = req.file.path;
          Usuario.create({ nome, email, senha, imagem: caminhoImagem })
            .then((user) => {
              return res.send({ user });
            })
            .catch((error) => {
              console.error('Erro ao salvar usuario', error);
              return res.status(400).send({ error: 'Registro falhou' });
            });
        }
      }
    })
    .catch((error) => {
      console.error('Erro ao consultar usuario no banco de dados', error);
      return res.status(500).send({ error: 'Registro falhou' });
    });
});

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  Usuario.findOne({ email })
    .select('+senha')
    .then((user) => {
      if (user) {
        bcrypt
          .compare(senha, user.senha)
          .then((result) => {
            if (result) {
              const token = generateToken({
                uid: user.id,
                permissao: user.permissao,
              });
              return res.send({ token: token, tokenExpiration: '1d' });
            } else {
              return res.status(400).send({ error: 'Senha invalida' });
            }
          })
          .catch((error) => {
            console.error('Error ao verificar senha', error);
            return res.status(500).send({ error: 'Internal server error' });
          });
      } else {
        return res.status(404).send({ error: 'Usuario não encontrado' });
      }
    })
    .catch((error) => {
      console.error('Erro ao logar', error);
      return res.status(500).send({ error: 'Internal server error' });
    });
});

router.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  Usuario.findOne({ email })
    .then((user) => {
      if (user) {
        const token = crypto.randomBytes(20).toString('hex');
        const expiration = new Date();
        expiration.setHours(new Date().getHours() + 3);

        Usuario.findByIdAndUpdate(user.id, {
          $set: {
            tokenResetarSenha: token,
            tokenResetarSenhaExpirado: expiration,
          },
        })
          .then(() => {
            Mailer.sendMail(
              {
                to: email,
                from: 'teste@ufla',
                template: 'auth/forgot_password',
                context: { token },
              },
              (error) => {
                if (error) {
                  console.error('Erro ao enviar email', error);
                  return res
                    .status(400)
                    .send({ error: 'Failed to sending recover password mail' });
                } else {
                  return res.send();
                }
              },
            );
          })
          .catch((error) => {
            console.error(
              'Erro ao salvar o token de recuperação de senha',
              error,
            );
            return res.status(500).send({ error: 'Internal server error' });
          });
      } else {
        return res.status(404).send({ error: 'Usuario não encontrado' });
      }
    })
    .catch((error) => {
      console.error('Erro ao recuperar senha', err);
      return res.status(500).send({ error: 'Internal server error' });
    });
});

router.post('/reset-password', (req, res) => {
  const { email, token, novaSenha } = req.body;
  Usuario.findOne({ email })
    .select('+tokenResetarSenha tokenResetarSenhaExpirado')
    .then((user) => {
      if (user) {
        if (
          token != user.tokenResetarSenha ||
          new Date().now > user.tokenResetarSenhaExpirado
        ) {
          return res.status(400).send({ error: 'Invalid token' });
        } else {
          user.tokenResetarSenha = undefined;
          user.tokenResetarSenhaExpirado = undefined;
          user.senha = novaSenha;

          user
            .save()
            .then(() => {
              return res.send({ message: 'Senha trocada com sucesso' });
            })
            .catch((error) => {
              console.error('Erro ao salvar nova senha de usuario', error);
              return res.status(500).send({ error: 'Internal server error' });
            });
        }
      } else {
        return res.status(404).send({ error: 'Usuario não encontrado' });
      }
    })
    .catch((error) => {
      console.error('Erro ao recuperar senha', err);
      return res.status(500).send({ error: 'Internal server error' });
    });
});

export default router;
