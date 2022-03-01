const Joi = require('joi');

const Msgschema=Joi.object().keys({
    channelID:Joi.string().trim().max(24).required(),
    channelName:Joi.string().trim().required(),
    Msg:Joi.string().trim().required(),
    Dat:Joi.string().trim().required()
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

module.exports={
    Msgschema,
    channelSchema,
    getmessageSchema
}