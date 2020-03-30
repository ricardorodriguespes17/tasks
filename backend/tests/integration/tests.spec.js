//Importando conexao do knex
const connection = require('../../src/database/connection')

const signup = require('./responses/signup')
const login = require('./responses/login')
const createTask = require('./responses/createTask')
const updateTask = require('./responses/updateTask')
const deleteTask = require('./responses/deleteTask')

describe('Integration tests', () => {
  //Antes de comecar restar o banco de dados
  beforeEach(async () => {
    await connection.migrate.rollback()
    await connection.migrate.latest()
  })

  //Depois que terminar tudo encerra a conexao do knex
  afterAll(async () => {
    await connection.destroy()
  })


  it('Should be able to signup', async () => {
    const response = await signup()

    expect(response.body).toHaveProperty('id')
    expect(response.body.id).toHaveLength(8)
    expect(201)
  })

  it('Should be able to login', async () => {
    const { id } = (await signup()).body
    const response = await login(id)

    expect(response.body).toHaveProperty('name')
    expect(201)
  })

  it('Should be able to create task', async () => {
    const { id } = (await signup()).body
    const response = await createTask(id)

    expect(response.body).toHaveProperty('id')
    expect(201)
  })

  it('Should be able to update task', async () => {
    const { id } = (await signup()).body
    const response = await updateTask(id)

    expect(response.body).toHaveProperty('id')
    expect(204)
  })

  it('Should be able to delete task', async () => {
    const { id } = (await signup()).body
    const response = await deleteTask(id)

    expect(response.body).toHaveProperty('id')
    expect(204)
  })

})