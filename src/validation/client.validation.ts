import Joi from "joi";

export const clientSchema = Joi.object({
  fullname: Joi.string().trim().required().messages({
    "any.required": "name majburiy",
    "string.empty": "name bo'sh bo'lishi mumkin emas",
  }),

  phone1: Joi.string().trim().required().messages({
    "any.required": "phone1 majburiy",
    "string.empty": "phone1 bo'sh bo'lishi mumkin emas",
  }),

  phone2: Joi.string().trim().optional().allow("").messages({
    "string.empty": "phone2 bo'sh bo'lishi mumkin emas",
  }),

  branch_id: Joi.number().required().messages({
    "any.required": "branch_id majburiy",
    "number.base": "branch_id noto'g'ri formatda yoki bo'sh",
  }),
})
.required()
.messages({
  "any.required": "Body bo'sh bo'lishi mumkin emas",
}).unknown(false);
