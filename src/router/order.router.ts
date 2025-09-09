import { Router } from "express";
import { OrderController } from "../controller/order.controller";

const router = Router();
router.get("/", OrderController.getAll);
router.post("/", OrderController.create);
router.put("/:id", OrderController.update);
router.delete("/:id", OrderController.delete);

export default router;