/****************************************************
* Autor: Ricardo Rodrigues   
* Objetivo: Determinar funcoes de validacao da 
* manuipulacao de tarefas
*****************************************************/

const { celebrate, Segments, Joi } = require('celebrate')

function index() {
  return celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown(),
  })
}

function create() {
  return celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
    })
  })
}

function update() {
  return celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().integer().required()
    }),
    // [Segments.BODY]: Joi.object().keys({
    //   title: Joi.string().required(),
    //   description: Joi.string().required(),
    //   startedIn: Joi.date(),
    //   finishedIn: Joi.date(),
    //   status: Joi.string().required()
    // })
  })
}

function del() {
  return celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().integer().required()
    })
  })
}

module.exports = {
  index, create, update, del
}