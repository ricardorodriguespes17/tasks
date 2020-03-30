//Importando o supertest para fazer as requisicoes
const request = require('supertest')
//Importando o objeto do express com rotas e funcoes de uso
const app = require('../../../src/app')

module.exports = async function signup() {
  const response = await request(app)
    .post('/signup')
    .send({
      name: 'Ricardo',
      email: 'ricardo@gmail.com'
    })

  return response
}