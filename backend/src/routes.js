/****************************************************
* Autor: Ricardo Rodrigues   
* Objetivo: Definir as rotas que serao requiridas 
* na aplicacao
*****************************************************/

//Importando o express
const express = require('express')
//Importando as funcoes para as rotas
const tasksController = require('./controller/tasksController')
const loginController = require('./controller/loginController')
const signupController = require('./controller/signupController')
//Importando as funcoes de validacao
const tasksValidation = require('./validation/tasksValidation')
const loginValidation = require('./validation/loginValidation')
const signupValidation = require('./validation/signupValidation')

//Inicialziando as rotas
const routes = express.Router()

//Rota teste
routes.get('/users', signupController.index)

//Rota de Login
routes.post('/login', loginValidation.create(), loginController.create)

//Rota de Registro
routes.post('/signup', signupValidation.create(), signupController.create)

//Rotas das tarefas
routes.get('/tasks', tasksValidation.index(), tasksController.index)
routes.post('/tasks', tasksValidation.create(), tasksController.create)
routes.put('/tasks/:id', tasksValidation.update(), tasksController.update)
routes.delete('/tasks/:id', tasksValidation.del(), tasksController.del)

//Exportando as rotas
module.exports = routes