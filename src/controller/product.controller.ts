import { NextFunction, Request, Response } from "express";
import { CustomError } from "../helper/CustomError";
import { Product } from "../model/product.model";
import { productSchema } from "../validation/product.validation";

export const ProductController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await Product.findAll();
      res.status(200).send({ ok: true, data: products });
    } catch (error) {
      next(error);
    }
  },
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = productSchema.validate(req.body);
      if (error) {
        // @ts-ignore
        throw new CustomError(error.details.map(d => d.message).join(", "), 400);
      }
      await Product.create(value);
      res.status(201).send({ ok: true, message: "Mahsulot qo'shildi" });
    } catch (error) {
      next(error);
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const [affectedRows] = await Product.update({ ...req.body }, { where: { id } });
      if (affectedRows === 0) {
        throw new CustomError("Mahsulot topilmadi", 404);
      }
      const updatedProduct = await Product.findByPk(id);
      res.status(200).send({
        message: "Mahsulot yangilandi",
        data: updatedProduct,
      });
    } catch (error) {
      next(error);
    }
  },
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deletedRows = await Product.destroy({ where: { id } });
      if (deletedRows === 0) {
        throw new CustomError("Mahsulot topilmadi", 404);
      }
      res.status(200).json({
        message: "Mahsulot o‘chirildi",
      });
    } catch (error) {
      next(error);
    }
  },
};
