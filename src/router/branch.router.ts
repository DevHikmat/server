import { Router } from "express";
import { BranchController } from "../controller/branch.controller";

const router = Router();
router.get("/", BranchController.getAll);
router.post("/", BranchController.create);
router.put("/:id", BranchController.update);
router.delete("/:id", BranchController.delete);

export default router;