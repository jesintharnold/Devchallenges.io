const Joi = require('joi');

const addItemSchema=Joi.object().keys({
  name:Joi.string().trim().required(),
  description:Joi.string().trim().allow(null).required(),
  imageurl:Joi.string().trim().allow(null).required(),
  categoryname:Joi.string().trim().required(),
  categoryID:Joi.string().trim().max(24).allow(null).required(),
  userID:Joi.string().trim().max(24).required()
});

const cartgetSchema=Joi.object().keys({
  userID:Joi.string().trim().max(24).required()
});
const historySchema=Joi.object().keys({
  listID:Joi.string().trim().max(24).required(),
  userID:Joi.string().trim().max(24).required()
});


const postCartSchema=Joi.object().keys({
cartID:Joi.string().trim().allow(null).max(24).required(),
listname:Joi.string().trim().allow(null).required(),
status:Joi.string().required(),
userID:Joi.string().trim().max(24).required(),
list:Joi.array().items(Joi.object({
  categoryID:Joi.string().trim().max(24).required(),
  category:Joi.string().trim().required(),
  items:Joi.array().items(Joi.object({
    item:Joi.string().trim().required(),
    itemID:Joi.string().trim().max(24).required(),
    quantity:Joi.number().required(),
    checked:Joi.boolean().required()
  }))
})).required()
});


module.exports={
  addItemSchema,
  postCartSchema,
  cartgetSchema,
  historySchema
}