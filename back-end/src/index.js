import express, { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import { carros, Auth } from './app/controllers';
import Usuario from './app/schemes/Usuario';
import path from 'path';
import cors from 'cors';
import swaggerDocs from './swagger.json';

const app = express();
const port = 3000;

module.exports = app;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '')));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/carros', carros);
app.use('/auth', Auth);

function createAdminUser() {
  const nome = 'Victor';
  const email = 'victor';
  const senha = '123';
  const imagem = '../uploads/images/img1.png';
  const administrador = true;

  Usuario.findOne({ email })
    .then((userData) => {
      if (userData) {
        console.log('Usuário já existe');
        return;
      }

      const novoUsuario = new Usuario({
        nome,
        email,
        senha,
        imagem,
        administrador,
      });
      novoUsuario
        .save()
        .then(() => {
          console.log('Usuário admin criado com sucesso');
        })
        .catch((error) => {
          console.error('Erro ao criar usuário:', error);
        });
    })
    .catch((error) => {
      console.error('Erro ao consultar usuário no banco de dados:', error);
    });
}

createAdminUser();

console.log(`Servidor rodando no link http://localhost:${port}`);

app.listen(port);
