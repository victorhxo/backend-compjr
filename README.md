# Capacitação CompJúnior
Projeto desenvolvido na capacitação de back-end para a empresa [Comp Junior](https://www.compjunior.com.br/), onde também foi feito a integração de um front-end apenas para questão de aprendizado.

## Especificações
- [ ] O projeto deve ter no mínimo 1 schema e 1 controller;
- [ ] Deve conter no mínimo 1 CRUD completo;
- [ ] Documentação no Swagger;
- [ ] Deve ser possível testar todas as requisições;
- [ ] Criar usuário, com e-mail e senha e realizar login;
- [ ] Mandar imagem com foto do usuário na mesma rota em que ele é criado;
- [ ] Ter uma rota que só pode ser acessado com token de autenticação;
- [ ] Ter um usuário administrador que terá permissões diferentes de um usuário comum;
- [ ] Função de recuperar senha;
- [ ] Fazer com que o usuário receba um email automático;

## Tecnologias Utilizadas
### Front-end
- Vue
- Bootstrap
- Axios

### Back-end
- Node
- MongoDB
- Mongoose
- Swagger
- Jest



## Executar

### Dependências
- [Node.js v16.20.1](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

```bash
$ git clone https://github.com/victorhxo/backend-compjr.git

$ cd backend-compjr

# executar o back-end
$ cd back-end
$ npm install
$ npm run serve

# executar o front-end
$ cd front-end
$ npm install
$ npm run serve

```

## Documentação

```bash
http://localhost:3000/docs
```
