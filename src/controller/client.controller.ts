import { NextFunction, Request, Response } from "express";
import { CustomError } from "../helper/CustomError";
import { Client } from "../model/client.model";
import { clientSchema } from "../validation/client.validation";

export const ClientController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const clients = await Client.findAll();
      res.status(200).send({ ok: true, data: clients });
    } catch (error) {
      next(error);
    }
  },
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = clientSchema.validate(req.body);
      if (error) {
        // @ts-ignore
        throw new CustomError(error.details.map(d => d.message).join(", "), 400);
      }
      await Client.create(value);
      res.status(201).send({ ok: true, message: "Mijoz qo'shildi" });
    } catch (error) {
      next(error);
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const [affectedRows] = await Client.update({...req.body}, { where: { id } });
      if (affectedRows === 0) {
        throw new CustomError("Mijoz topilmadi", 404);
      }
      const updatedClient = await Client.findByPk(id);
      res.status(200).send({
        message: "Mijoz ma'lumotlari yangilandi",
        data: updatedClient,
      });
    } catch (error) {
      next(error);
    }
  },
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deletedRows = await Client.destroy({ where: { id } });
      if (deletedRows === 0) {
        throw new CustomError("Mijoz topilmadi", 404);
      }
      res.status(200).json({
        message: "Mijoz o‘chirildi",
      });
    } catch (error) {
      next(error);
    }
  },
};
