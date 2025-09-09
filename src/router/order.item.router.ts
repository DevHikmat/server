import { Router } from "express";
import { OrderItemController } from "../controller/order.item.controller";

const router = Router()

router.get("/", OrderItemController.getAll);
router.post("/", OrderItemController.create);
router.put("/:id", OrderItemController.update);
router.delete("/:id", OrderItemController.delete);

export default router;