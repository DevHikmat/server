import Joi from "joi";

export const branchSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "any.required": "Iltimos nomini kiriting !",
    "string.empty": "Iltimos nomini kiriting !"
  }),
}).required().messages({
  "any.required": "Body bo‘sh bo‘lishi mumkin emas!"
});;