const Joi = require('joi');

const addItemSchema=Joi.object().keys({
  name:Joi.string().trim().required(),
  description:Joi.string().trim().allow(null).required(),
  imageurl:Joi.string().trim().allow(null).required(),
  categoryname:Joi.string().trim().required(),
  categoryID:Joi.string().trim().max(24).allow(null).required()
});

const cartgetSchema=Joi.object().keys({
  userID:Joi.string().trim().max(24).required()
});
const historySchema=Joi.object().keys({
  listID:Joi.string().trim().max(24).required()
});


const postCartSchema=Joi.object().keys({
cartID:Joi.string().trim().allow(null).max(24).optional(),
listName:Joi.string().trim().optional(),
status:Joi.string().required(),
userID:Joi.string().trim().max(24).required(),
items:Joi.array().items(Joi.object({
  category_ID:Joi.string().trim().max(24).required(),
  Item_ID:Joi.string().trim().max(24).required(),
  quantity:Joi.number().required(),
  checked:Joi.boolean().required()
})).required()
});


module.exports={
  addItemSchema,
  postCartSchema,
  cartgetSchema,
  historySchema
}