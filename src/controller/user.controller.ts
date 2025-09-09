import { NextFunction, Request, Response } from "express";
import { CustomError } from "../helper/CustomError";
import { comparePassword, hashedPassword } from "../helper/bcrypt";
import { User } from "../model/user.model";
import { createUserSchema } from "../validation/user.validation";
import { loginSchema } from "../validation/auth.validation";
import { generateToken } from "../helper/jwt";
import { UserType } from "../enums/user.enum";

export const UserController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = createUserSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        console.log(error)
        throw new CustomError(
          error.details.map((d) => d.message).join(", "),
          400
        );
      }

      const { fullname, username, password, phone1, phone2 } = value;

      const isExist = await User.findOne({ where: { username }, raw: true });
      if (isExist) {
        throw new CustomError("This username already have: " + username, 401);
      }

      const hashPass = hashedPassword(password);
      const newUser = await User.create({
        fullname,
        username,
        password: hashPass,
        phone1,
        phone2,
        role: UserType.ADMIN
      });
      res.status(201).json({
        ok: true,
        data: newUser,
        message: "Mijoz qo'shildi!",
      });
    } catch (error) {
      next(error);
    }
  },
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = loginSchema.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        throw new CustomError(
          error.details.map((d) => d.message).join(", "),
          400
        );
      }

      const { username, password } = value;

      const targetUser = await User.findOne({
        where: { username },
        raw: true,
      });
      if (!targetUser) {
        throw new CustomError(
          "User not found by this username: " + username,
          401
        );
      }

      const isEqual = comparePassword(password, targetUser.password);
      if (!isEqual) {
        throw new CustomError("Password is incorrect", 401);
      }

      const currentUser = await User.findOne({
        where: { username },
        raw: true,
        attributes: {
          exclude: ["password"],
        },
      });

      const token = generateToken({
        userId: targetUser.id
      });

      res.status(200).json({
        ok: true,
        data: currentUser,
        token,
        message: "Ma'lumotlar tasdiqlandi",
      });
    } catch (error) {
      next(error);
    }
  },
  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      // @ts-ignore
      const userId = req.user.userId;
      const user = await User.findOne({
        where: {id: userId},
        attributes: {
          exclude: ['password']
        },
        raw: true
      })
      res.status(200).json({
        ok: true,
        user
      });
    } catch (error) {
      next(error);
    }
  }, 
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
          const { id } = req.params;
          const deletedRows = await User.destroy({ where: { id } });
          if (deletedRows === 0) {
            throw new CustomError("Foydalanuvchi topilmadi", 404);
          }
          res.status(200).json({
            message: "Foydalanuvchi o‘chirildi",
          });
        } catch (error) {
          next(error);
        }
  }
};
