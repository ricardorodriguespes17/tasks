/****************************************************
* Autor: Ricardo Rodrigues   
* Objetivo: Definir as funcoes que serao usadas nas 
* rotas da aplicacao
*****************************************************/

//Importando conexao com o bd
const connection = require('../database/connection')
//Imporando funcao para formatar a date para datetime do SQL
const formatToDateTimeSQL = require('../utils/formatToDateTimeSQL')

async function index(request, response) {
  //Recendo dados da requisicao
  const userID = request.headers.authorization

  //Selecionar todos os dados que todas tarefa do usuario
  const tasks = await connection('tasks')
    .where('user_id', '=', userID)
    .select('*')

  return response.json(tasks)
}

async function create(request, response) {
  //Recebendo os dados da requisicao
  const { title, description } = request.body
  const userID = request.headers.authorization

  //Verifica se o id do usuario passado pertence a algum usuario
  const user = await connection('users')
    .where('id', '=', userID)
    .first()

  if (!user) {
    return response.status(401).json({ error: 'User not found' })
  }

  //Insercao dos dados na tabela
  const [id] = await connection('tasks').insert({
    title,
    description,
    status: 'no-started',
    startedIn: null,
    finishedIn: null,
    user_id: userID
  })

  return response.status(201).json({ id })
}

async function update(request, response) {
  //Recebendo os dados da requicao
  const { id } = request.params
  const userID = request.headers.authorization
  const { title, description, startedIn, status, finishedIn } = request.body

  //Verifica se a tarefa existe e pertence ao usuario  
  const task = await connection('tasks')
    .where('id', '=', id)
    .first()

  if (!task) {
    return response.status(404).json({ error: 'Task not found' })
  }

  if (task.user_id !== userID) {
    return response.status(401).json({ error: 'Operation not permited' })
  }

  //Faz a atualizacao dos dados
  await connection('tasks')
    .where('id', '=', id)
    .update({
      title,
      description,
      startedIn: formatToDateTimeSQL(startedIn),
      status,
      finishedIn: formatToDateTimeSQL(finishedIn)
    })

  return response.status(204).send()
}

async function del(request, response) {
  //Recebendo os dados da requisicao
  const { id } = request.params
  const userID = request.headers.authorization

  //Verifica se a tarefa existe e pertence ao usuario  
  const task = await connection('tasks')
    .where('id', '=', id)
    .first()

  if (!task) {
    return response.status(404).json({ error: 'Task not found' })
  }

  if (task.user_id !== userID) {
    return response.status(401).json({ error: 'Operation not permited' })
  }

  //Deletando tarefa da tabela pelo id
  await connection('tasks')
    .where('id', '=', id)
    .delete()

  return response.status(204).send()
}

// Exportando todas as funcoes da tarefas
module.exports = {
  index,
  create,
  update,
  del
}