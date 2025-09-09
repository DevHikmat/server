import { NextFunction, Request, Response } from "express";
import { CustomError } from "../helper/CustomError";
import { ProductHistory } from "../model/product.history.model";

export const ProductHistoryController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const productHistories = await ProductHistory.findAll();
      res.status(200).send({ ok: true, data: productHistories });
    } catch (error) {
      next(error);
    }
  },
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      await ProductHistory.create(req.body);
      res.status(201).send({ ok: true, message: "Yaratildi" });
    } catch (error) {
      next(error);
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const [affectedRows] = await ProductHistory.update({ ...req.body }, { where: { id } });
      if (affectedRows === 0) {
        throw new CustomError("Topilmadi", 404);
      }
      const updatedProductHistory = await ProductHistory.findByPk(id);
      res.status(200).send({
        message: "Yangilandi",
        data: updatedProductHistory,
      });
    } catch (error) {
      next(error);
    }
  },
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deletedRows = await ProductHistory.destroy({ where: { id } });
      if (deletedRows === 0) {
        throw new CustomError("Topilmadi", 404);
      }
      res.status(200).json({
        message: "O‘chirildi",
      });
    } catch (error) {
      next(error);
    }
  },
};
