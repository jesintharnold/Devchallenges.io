const Joi = require('joi');

const messageSchema=Joi.object().keys({
    channelID:Joi.string().trim().max(24).required(),
    message:Joi.string().trim().required(),
    timestamp:Joi.number().required(),
    userID:Joi.string().trim().max(24).required()
});

const channelSchema=Joi.object().keys({
   channelName:Joi.string().trim().required(),
   channelDesc:Joi.string().required(),
   private:Joi.boolean().optional(),
   userID:Joi.string().trim().max(24).required()
});

const getmessageSchema=Joi.object().keys({
    channelID:Joi.string().trim().max(24).required()
});



module.exports={
    messageSchema,
    channelSchema,
    getmessageSchema
}