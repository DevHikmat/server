import { NextFunction, Request, Response } from "express";
import { CustomError } from "../helper/CustomError";
import { branchSchema } from "../validation/branch.validation";
import { Branch } from "../model/branch.model";

export const BranchController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const branches = await Branch.findAll();
      res.status(200).send({ ok: true, data: branches });
    } catch (error) {
      next(error);
    }
  },
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = branchSchema.validate(req.body);
      if (error) {
        // @ts-ignore
        throw new CustomError(error.details[0]?.message, 400);
      }
      const { name } = value;
      await Branch.create({ name });
      res.status(201).send({ ok: true, message: "Do'kon qo'shildi" });
    } catch (error) {
      next(error);
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { error, value } = branchSchema.validate(req.body);
      if (error) {
        // @ts-ignore
        throw new CustomError(error.details[0]?.message, 400);
      }
      const { name } = value;
      const [affectedRows] = await Branch.update({ name }, { where: { id } });
      if (affectedRows === 0) {
        throw new CustomError("Do'kon topilmadi", 404);
      }
      const updatedBranch = await Branch.findByPk(id);
      res.status(200).send({
        message: "Do'kon yangilandi",
        data: updatedBranch,
      });
    } catch (error) {
      next(error);
    }
  },
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deletedRows = await Branch.destroy({ where: { id } });
      if (deletedRows === 0) {
        throw new CustomError("Do'kon topilmadi", 404);
      }
      res.status(200).json({
        message: "Do'kon o‘chirildi",
      });
    } catch (error) {
      next(error);
    }
  },
};
