/****************************************************
* Autor: Ricardo Rodrigues   
* Objetivo: Definir as funcoes que serao usadas nas 
* rotas da aplicacao
*****************************************************/

//Importando conexao com o bd
const connection = require('../database/connection')
//Importando funcao que gera id
const generateUniqueId = require('../utils/generateUniqueId')

async function index(request, response) {
    //Selecionando todos os dados de todos os usuarios (caso de teste)
    const users = await connection('users').select('*')

    return response.json(users)
}

async function create(request, response) {
    //Recebendo dados da requisicao
    const { name, email } = request.body
    const id = generateUniqueId()

    const user = await connection('users')
        .where('email', '=', email)
        .select('*')
        .first()

    if(user)
        return response.status(400).json({error: 'Email is being used'})

    //Inserindo dados do novo usuario
    await connection('users').insert({
        name,
        email,
        id
    })

    return response.status(201).json({ id })
}

//Exportando as funcoes de registro
module.exports = {
    index,
    create
}