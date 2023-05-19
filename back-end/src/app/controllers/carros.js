import { Router } from 'express';
import Carro from '../schemes/Carro';
import AuthMiddleware from '@/app/middlewares/Auth';
import AdminAuth from '@/app/middlewares/AdminAuth';

const router = new Router();

router.get('/', (req, res) => {
  Carro.find()
    .then((data) => {
      const projects = data.map((project) => {
        return {
          id: project._id,
          nomeVeiculo: project.nomeVeiculo,
          placa: project.placa,
          combustivel: project.combustivel,
          cor: project.cor,
          ano: project.ano,
          valor: project.valor,
        };
      });
      res.send(projects);
    })
    .catch((error) => {
      console.error('Erro ao buscar o projeto no banco de dados', error);
      res.status(400).send({ error: 'Não foi possivel buscar o projeto' });
    });
});

router.post('/', [AuthMiddleware, AdminAuth], async (req, res) => {
  const { nomeVeiculo, placa, combustivel, cor, ano, valor } = req.body;

  Carro.findOne({ placa }).then((carro) => {
    if (carro) {
      res.status(400).send({ error: 'Placa já existente no sistema' });
    } else {
      Carro.create({ nomeVeiculo, placa, combustivel, cor, ano, valor })
        .then((project) => {
          res.status(200).send(project);
        })
        .catch((error) => {
          console.error('Erro ao salvar projeto no banco de dados', error);
          res.status(400).send({ error: 'Não foi possivel salvar o projeto' });
        });
    }
  });
});

router.put('/:projectId', [AuthMiddleware, AdminAuth], async (req, res) => {
  const { nomeVeiculo, placa, combustivel, cor, ano, valor } = req.body;

  Carro.findOne({ placa }).then((carro) => {
    if (carro && carro._id != req.params.projectId) {
      res.status(400).send({ error: 'Placa já existente no sistema' });
    } else {
      Carro.findByIdAndUpdate(
        req.params.projectId,
        { nomeVeiculo, placa, combustivel, cor, ano, valor },
        { new: true },
      )
        .then((project) => {
          res.status(200).send(project);
        })
        .catch((error) => {
          console.error('Erro ao editar o projeto no banco de dados', error);
          res.status(400).send({ error: 'Não foi possivel editar o projeto' });
        });
    }
  });
});

router.delete('/:projectId', [AuthMiddleware, AdminAuth], (req, res) => {
  Carro.findByIdAndRemove(req.params.projectId)
    .then(() => {
      res.send({ message: 'Carro removido com sucesso!' });
    })
    .catch((error) => {
      console.error('Erro ao remover projeto no banco de dados', error);
      res.status(400).send({ error: 'Não foi possivel remover o projeto' });
    });
});

export default router;
