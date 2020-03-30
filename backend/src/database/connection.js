//Importando knex
const knex = require('knex')
//Importando arquivo de configuracoes do knex
const configuration = require('../../knexfile')

//Escolhendo se vai rodar em modo test ou de desenvolvimento
const configMode = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development

//Inicializando knex
const connection = knex(configMode)

//Exportando conexao do knex
module.exports = connection
