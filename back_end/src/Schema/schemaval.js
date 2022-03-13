const Joi = require('joi');

const Msgschema=Joi.object().keys({
    channelID:Joi.string().trim().max(24).required(),
    Msg:Joi.string().trim().required(),
    DAT:Joi.number().required()
});

const channelSchema=Joi.object().keys({
   channelName:Joi.string().trim().required(),
   channelDesc:Joi.string().required(),
   private:Joi.boolean().required(),
   userID:Joi.string().trim().max(24).required()
});

const getmessageSchema=Joi.object().keys({
    channelID:Joi.string().trim().max(24).required()
});


const emailfromauth=Joi.object().keys({
    Name:Joi.string().trim().required(),
    Profileurl:Joi.string().uri().required(),
    email:Joi.string().email().required()
});

module.exports={
    Msgschema,
    channelSchema,
    getmessageSchema,
    emailfromauth
}