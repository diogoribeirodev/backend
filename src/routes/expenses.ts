import { Router } from "express";
import {
  getExpense,
  getExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
} from "../controllers/expenses";
import { authMiddleware } from "../middlewares/auth";

const expenseRouter = Router();

expenseRouter.use(authMiddleware);
expenseRouter.get("/:id", getExpense);
expenseRouter.get("/", getExpenses);
expenseRouter.post("/", createExpense);
expenseRouter.delete("/:id", deleteExpense);
expenseRouter.put("/:id", updateExpense);

export default expenseRouter;
