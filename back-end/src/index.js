import express, { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import { carros, Auth } from './app/controllers';
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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/carros', carros);
app.use('/auth', Auth);

console.log(`Servidor rodando no link http://localhost:${port}`);

app.listen(port);
