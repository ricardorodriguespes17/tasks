//Importando o supertest para fazer as requisicoes
const request = require('supertest')
//Importando o objeto do express com rotas e funcoes de uso
const app = require('../../../src/app')

module.exports = async function login() {
  const response = await request(app)
    .post('/login')
    .send({
      email: 'ricardo@gmail.com',
      password: '123456'
    })

  return response
}