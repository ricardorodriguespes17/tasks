/****************************************************
* Autor: Ricardo Rodrigues   
* Objetivo: Determinar funceos de validacao do 
* registro
*****************************************************/

const { celebrate, Segments, Joi } = require('celebrate')

function create() {
    return celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required()
        })
    })
}

module.exports = {
    create
}
