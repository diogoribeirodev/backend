import { db } from "@/server/db";
import { insertExpenseParams, updateExpenseParams } from "@/server/db/schema/expense";
import { RequestHandler } from "express"

export const getExpenses: RequestHandler = async (req, res, next) => {
    try {
        const user = req.body.user.id;
        const expenses = await db.expense.findMany({
            where: { userId: user },
        });
        if (!expenses) {
            return res.status(404).json({ description: "No expenses found!" });
        }
        return res.status(200).json(expenses);
    } catch (error) {
        return next(error);
    }
}

export const getExpense: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const user = req.body.user.id;
        const expense = await db.expense.findUnique({
            where: { id: id, userId: user },
        });
        if (!expense) {
            return res.status(404).json({ description: "Expense not found!" });
        }
        return res.status(200).json(expense);
    } catch (error) {
        return next(error);
    }
}

export const createExpense: RequestHandler = async (req, res, next) => {
    try {
        const params = insertExpenseParams.parse(req.body.values);
        const user = req.body.user.id;
        const expense = await db.expense.create({
            data: { 
               ...params,
            userId: user,
            },
        });
        return res.status(201).json({ description: "Expense created!", expense });
    } catch (error) {
        return next(error);
    }
}

export const updateExpense: RequestHandler = async (req, res, next) => {
    try {
        const params = insertExpenseParams.parse(req.body.values);
        const id = Number(req.params.id);
        const user = req.body.user.id;
        const expense = await db.expense.update({
            where: { id: id, userId: user },
            data: params,
        });
        return res.status(200).json({ description: "Expense updated!", expense });
    } catch (error) {
        return next(error);
    }
}

export const deleteExpense: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const user = req.body.user.id;
        await db.expense.delete({
            where: { id: id, userId: user },
        });
        return res.status(200).json({ description: "Expense deleted!" });
    } catch (error) {
        return next(error);
    }
}