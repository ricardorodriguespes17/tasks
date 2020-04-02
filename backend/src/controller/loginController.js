/****************************************************
* Autor: Ricardo Rodrigues   
* Objetivo: Definir as funcoes que serao usadas nas 
* rotas da aplicacao
*****************************************************/

//Importando conexao com o bd
const connection = require('../database/connection')
//Importando funcao de criptografia
const cryptograph = require('../utils/cryptograph')

async function create(request, response) {
  //Recebendo dados da requisicao
  const { email, password } = request.body
  //Criptografando senha recebida para comparacao
  const cryptoPassword = cryptograph(password)

  //Verificando se existe um usuario com o id enviado, e retorna o nome dele
  const user = await connection('users')
    .where('email', '=', email)
    .select(['id', 'password', 'name'])
    .first()

  if (user && user.id) {
    if (cryptoPassword === user.password)
      return response.json({ id: user.id, name: user.name })

    return response.status(401).json({ error: 'Incorret password' })
  }

  return response.status(400).json({ error: 'No user found with this email' })
}

//Exportando a funcao create do login
module.exports = {
  create
}