const request = require('supertest');
const app = require('../index');
import Carro from '../app/schemes/Carro';
import Usuario from '../app/schemes/Usuario';

const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NDk4ODgxYWI5YjBjMjgzZTRmY2MwODAiLCJhZG1pbmlzdHJhZG9yIjp0cnVlLCJpYXQiOjE2ODc3MTg0NzIsImV4cCI6MTY5MDMxMDQ3Mn0.6nFUUBukso2s55iXGakpuC7vL1I50LAdpsbiDMqRpJ0';

const tokenUsuario = 'Bearer ';

describe('/carros', () => {
  it('Deve retornar status 200 e criar um novo projeto quando a placa não existir no sistema', async () => {
    const newCar = {
      nomeVeiculo: 'Carro Novo',
      placa: 'ABC123',
      combustivel: 'Gasolina',
      cor: 'Preto',
      ano: 2022,
      valor: 50000,
    };
    const res = await request(app)
      .post('/carros')
      .set('Authorization', token)
      .send(newCar);

    expect(res.statusCode).toEqual(200);
  });

  it('Deve retornar status 400 quando tentar cadastrar um novo carro e a placa já existir no sistema', async () => {
    const existingCar = {
      nomeVeiculo: 'Carro Existente',
      placa: 'ABC123',
      combustivel: 'Gasolina',
      cor: 'Vermelho',
      ano: 2020,
      valor: 40000,
    };

    const res = await request(app)
      .post('/carros')
      .set('Authorization', token)
      .send(existingCar);

    expect(res.statusCode).toEqual(400);
  });

  it('Deve retornar status 401 quando tentar cadastrar um novo carro e o usuario não está autenticado ou não é administrador', async () => {
    const existingCar = {
      nomeVeiculo: 'Carro Teste',
      placa: 'ABC89123',
      combustivel: 'Gasolina',
      cor: 'Vermelho',
      ano: 2020,
      valor: 40000,
    };

    const res = await request(app)
      .post('/carros')
      .set('Authorization', tokenUsuario)
      .send(existingCar);

    expect(res.statusCode).toEqual(401);
  });

  it('Deve retornar status 200 e atualizar os dados do carro no sistema', async () => {
    const existingCar = {
      nomeVeiculo: 'Carro Existente',
      placa: 'ABC1235',
      combustivel: 'Gasolina',
      cor: 'Vermelho',
      ano: 2020,
      valor: 40000,
    };

    const createdCar = await Carro.create(existingCar);

    const updatedCar = {
      nomeVeiculo: 'Carro Atualizado',
      placa: 'ABC1235',
      combustivel: 'Álcool',
      cor: 'Azul',
      ano: 2021,
      valor: 45000,
    };

    const res = await request(app)
      .put(`/carros/${createdCar._id}`)
      .set('Authorization', token)
      .send(updatedCar);

    expect(res.statusCode).toEqual(200);
  });

  it('Deve retornar status 400 quando a placa já existir cadastrada em outro carro no sistema', async () => {
    const existingCar = {
      nomeVeiculo: 'Carro Existente',
      placa: 'ABC1234',
      combustivel: 'Gasolina',
      cor: 'Vermelho',
      ano: 2020,
      valor: 40000,
    };

    // Cria um registro existente no sistema
    await Carro.create(existingCar);

    const updatedCar = {
      nomeVeiculo: 'Carro Atualizado',
      placa: 'ABC1234', // Mesma placa do registro existente
      combustivel: 'Álcool',
      cor: 'Azul',
      ano: 2021,
      valor: 45000,
    };

    const res = await request(app)
      .put(`/carros/${existingCar._id}`)
      .set('Authorization', token)
      .send(updatedCar);

    expect(res.statusCode).toEqual(400);
  });
});

describe('/auth', () => {
  it('Deve retornar o token de autenticação ao fornecer credenciais corretas', async () => {
    const user = {
      email: 'victor',
      senha: '123',
    };

    const res = await request(app).post(`/auth/login`).send(user);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('tokenExpiration');
  });

  it('Deve retornar erro de senha inválida ao fornecer senha incorreta', async () => {
    const user = {
      email: 'victor',
      senha: 'senha_incorreta',
    };

    const res = await request(app).post('/auth/login').send(user);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Senha invalida');
  });

  it('Deve retornar erro de usuário não encontrado ao fornecer um email não registrado', async () => {
    const user = {
      email: 'email_nao_registrado',
      senha: '123',
    };

    const res = await request(app).post('/auth/login').send(user);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error', 'Usuario não encontrado');
  });
});

afterAll(async () => {
  try {
    await Carro.deleteMany({});

    console.log('Coleção de carros dropada com sucesso.');
  } catch (error) {
    console.error('Erro ao dropar a coleção de carros:', error);
  }
});
