/****************************************************
* Autor: Ricardo Rodrigues   
* Objetivo: Definir as funcoes que serao usadas nas 
* rotas da aplicacao
*****************************************************/

//Importando conexao com o bd
const connection = require('../database/connection')

async function create(request, response) {
  //Recebendo dados da requisicao
  const { id } = request.body

  //Verificando se existe um usuario com o id enviado, e retorna o nome dele
  const name = await connection('users')
    .where('id', '=', id)
    .select('name')
    .first()

  if (!name)
    return response.status(400).json({ error: 'No user found with this ID' })

  return response.json(name)
}

//Exportando a funcao create do login
module.exports = {
  create
}