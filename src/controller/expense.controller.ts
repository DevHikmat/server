import { NextFunction, Request, Response } from "express";
import { CustomError } from "../helper/CustomError";
import { Expense } from "../model/expense.model";

export const ExpenseController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const expenses = await Expense.findAll();
      res.status(200).send({ ok: true, data: expenses });
    } catch (error) {
      next(error);
    }
  },
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      await Expense.create({ ...req.body });
      res.status(201).send({ ok: true, message: "Xarajat qo'shildi" });
    } catch (error) {
      next(error);
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const [affectedRows] = await Expense.update(
        { ...req.body },
        { where: { id } }
      );
      if (affectedRows === 0) {
        throw new CustomError("Xarajat topilmadi", 404);
      }
      const updatedExpense = await Expense.findByPk(id);
      res.status(200).send({
        message: "Xarajat yangilandi",
        data: updatedExpense,
      });
    } catch (error) {
      next(error);
    }
  },
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deletedRows = await Expense.destroy({ where: { id } });
      if (deletedRows === 0) {
        throw new CustomError("Xarajat topilmadi", 404);
      }
      res.status(200).json({
        message: "Xarajat o‘chirildi",
      });
    } catch (error) {
      next(error);
    }
  },
};
