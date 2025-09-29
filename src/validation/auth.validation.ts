// validations/auth.validation.ts
import Joi from "joi";

export const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.empty": "Username is required",
    "string.alphanum": "Username must contain only letters and numbers",
    "string.min": "Username must be at least 3 characters",
    "string.max": "Username must be at most 30 characters",
  }),
  password: Joi.string().min(3).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 3 characters",
  }),
});
