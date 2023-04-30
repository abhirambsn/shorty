const Joi = require('joi')

const schema = Joi.object({
    email: Joi.string().email({
        minDomainSegments: 2
    }).required(),
    password: Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')).required(),
    name: Joi.string().min(3).required()
})

module.exports = schema