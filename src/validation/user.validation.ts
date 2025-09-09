// validations/user.validation.ts
import Joi from "joi";

export const createUserSchema = Joi.object({
  fullname: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Fullname is required",
    "string.min": "Fullname must be at least 3 characters",
    "string.max": "Fullname must be at most 50 characters",
  }),
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.empty": "Username is required",
    "string.alphanum": "Username must contain only letters and numbers",
    "string.min": "Username must be at least 3 characters",
    "string.max": "Username must be at most 30 characters",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),
  phone1: Joi.string()
    .pattern(/^\+998\d{9}$/)
    .required()
    .messages({
      "string.empty": "Primary phone is required",
      "string.pattern.base": "Phone number must be in format +998901234567",
    }),
  phone2: Joi.string()
    .pattern(/^\+998\d{9}$/)
    .optional()
    .messages({
      "string.pattern.base": "Phone number must be in format +998901234567",
    }),
});
