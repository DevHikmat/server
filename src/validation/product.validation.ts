import Joi from "joi";

// Agar branch_id raqam bo'lsa shu qoladi; UUID bo'lsa pastdagi izohni ko'ring.
export const productSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "any.required": "name majburiy",
    "string.empty": "name bo'sh bo'lishi mumkin emas",
  }),

  branch_id: Joi.number().required().messages({
    "any.required": "branch_id majburiy",
    "number.base": "branch_id bo'sh yoki noto'g'ri formatda",
  }),

  selling_price: Joi.number().required().messages({
    "any.required": "selling_price majburiy",
    "number.base": "selling_price bo'sh yoki noto'g'ri formatda",
  }),

  type: Joi.string().valid("kg", "unit").required().messages({
    "any.required": "type majburiy",
    "any.only": "type faqat 'kg' yoki 'unit' bo'lishi kerak",
    "string.empty": "type bo'sh bo'lishi mumkin emas",
  }),

  amount: Joi.number().required().messages({
    "any.required": "amount majburiy",
    "number.base": "amount bo'sh yoki noto'g'ri formatda",
  }),
})
.required()
.messages({
  "any.required": "Body bo'sh bo'lmasligi kerak",
}).unknown(false);
