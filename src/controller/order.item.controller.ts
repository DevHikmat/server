import { NextFunction, Request, Response } from "express";
import { CustomError } from "../helper/CustomError";
import { OrderItem } from "../model/order.item.model";

export const OrderItemController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const orderItems = await OrderItem.findAll();
      res.status(200).send({ ok: true, data: orderItems });
    } catch (error) {
      next(error);
    }
  },
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      await OrderItem.create({...req.body});
      res.status(201).send({ ok: true, message: "Buyurtma qo'shildi" });
    } catch (error) {
      next(error);
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const [affectedRows] = await OrderItem.update({ ...req.body }, { where: { id } });
      if (affectedRows === 0) {
        throw new CustomError("Buyurtma topilmadi", 404);
      }
      const updatedItem = await OrderItem.findByPk(id);
      res.status(200).send({
        message: "Buyurtma yangilandi",
        data: updatedItem,
      });
    } catch (error) {
      next(error);
    }
  },
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deletedRows = await OrderItem.destroy({ where: { id } });
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
