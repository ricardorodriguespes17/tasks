/****************************************************
* Autor: Ricardo Rodrigues   
* Objetivo: Determinar funceos de validacao do 
* login
*****************************************************/

const { celebrate, Segments, Joi } = require('celebrate')

function create() {
    return celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required()
        })
    })
}

module.exports = {
    create
}
