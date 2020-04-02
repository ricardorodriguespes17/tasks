/****************************************************
* Autor: Ricardo Rodrigues   
* Objetivo: Passar as rotas para o express e passar 
* a escutar a porta 3333, onde serao feita as
* requisicoes
*****************************************************/

//Importando o express
const express = require('express')
//Importando as rotas
const routes = require('./routes')
//Importando errors do celebrate para o express usar nas rotas
const { errors } = require('celebrate')
//Importando o cors
const cors = require('cors')

//Inicializando express
const app = express()
//Passando parametros para o express usar
app.use(express.json())
app.use(cors())
app.use(routes)
app.use(errors())

//Exportando o express com as rotas e funcoes de uso
module.exports = app