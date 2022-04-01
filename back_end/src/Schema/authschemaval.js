const Joi = require('joi');

const emailfromauth=Joi.object().keys({
    Name:Joi.string().trim().required(),
    Profileurl:Joi.string().uri().required(),
    email:Joi.string().email().required()
});

const normalAuth=Joi.object().keys({
    email:Joi.string().email().required(),
    password:Joi.string().required()
});


module.exports={
    emailfromauth,
    normalAuth
}