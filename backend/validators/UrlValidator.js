const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schema = Joi.object({
    title: Joi.string().required(),
    url: Joi.string().uri({
        scheme: ['http', 'https', 'git', '/git\+https?/']
    }).required(),
    created_by: Joi.objectId().required()
})

module.exports = schema