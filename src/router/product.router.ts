import { Router } from "express";
import { ProductController } from "../controller/product.controller";

const router = Router();

router.get("/", ProductController.getAll);
router.post("/", ProductController.create);
router.put("/:id", ProductController.update);
router.delete("/:id", ProductController.delete);

export default router;