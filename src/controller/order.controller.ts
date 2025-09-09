import { NextFunction, Request, Response } from "express";
import { CustomError } from "../helper/CustomError";
import { Order } from "../model/order.model";

export const OrderController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await Order.findAll();
      res.status(200).send({ ok: true, data: orders });
    } catch (error) {
      next(error);
    }
  },
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      await Order.create({...req.body});
      res.status(201).send({ ok: true, message: "Buyurtma qo'shildi" });
    } catch (error) {
      next(error);
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const [affectedRows] = await Order.update({ ...req.body }, { where: { id } });
      if (affectedRows === 0) {
        throw new CustomError("Buyurtma topilmadi", 404);
      }
      const updatedOrder = await Order.findByPk(id);
      res.status(200).send({
        message: "Buyurtma yangilandi",
        data: updatedOrder,
      });
    } catch (error) {
      next(error);
    }
  },
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deletedRows = await Order.destroy({ where: { id } });
      if (deletedRows === 0) {
        throw new CustomError("Buyurtma topilmadi", 404);
      }
      res.status(200).json({
        message: "Buyurtma o‘chirildi",
      });
    } catch (error) {
      next(error);
    }
  },
};
