import { Router } from "express";
import authRouter from "./auth";
import expenseRouter from "./expenses";

const router = Router();

router.use("/auth", authRouter);
router.use("/expenses", expenseRouter);

export default router;
