//Importando o supertest para fazer as requisicoes
const request = require('supertest')
//Importando o objeto do express com rotas e funcoes de uso
const app = require('../../../src/app')

module.exports = async function updateTask(id) {
  const response = await request(app)
    .post('/tasks')
    .set('Authorization', id)
    .send({
      title: 'Tarefa 1',
      description: 'Detalhes da tarefa...'
    })

  return response
} 