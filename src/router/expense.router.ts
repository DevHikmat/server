import { Router } from "express";
import { ExpenseController } from "../controller/expense.controller";

const router = Router()

router.get("/", ExpenseController.getAll);
router.post("/", ExpenseController.create);
router.put("/:id", ExpenseController.update);
router.delete("/:id", ExpenseController.delete);

export default router;