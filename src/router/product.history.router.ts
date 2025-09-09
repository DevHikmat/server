import { Router } from "express";
import { ProductHistoryController } from "../controller/product.history.controller";

const router = Router();

router.get("/", ProductHistoryController.getAll);
router.post("/", ProductHistoryController.create);
router.put("/:id", ProductHistoryController.update);
router.delete("/:id", ProductHistoryController.delete);

export default router;