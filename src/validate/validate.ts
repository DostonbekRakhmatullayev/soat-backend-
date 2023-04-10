import Joi from "joi"

// 1
export const products_joi = Joi.object().keys({
  product_name: Joi.string().required(),
  price: Joi.string().required(),
  protuctes_title: Joi.string().required(),
  protuctes_brend: Joi.string().required(),
  discount: Joi.string().required(),
  model: Joi.string().required(),
})
// 1
export const users_joi = Joi.object().keys({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
})

export const login_joi = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
})

export const users_pacht = Joi.object().keys({
  first_name: Joi.string(),
  last_name: Joi.string(),
  email: Joi.string(),
  gendry: Joi.string(),
  password: Joi.string(),
})

export const orderJoi = Joi.object().keys({
  username: Joi.string().required(),
  tel: Joi.number().required(),
  email: Joi.string().required(),
  address: Joi.string().required(),
  product: Joi.string().required()
})
