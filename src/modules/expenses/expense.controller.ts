import type { Request, Response, NextFunction } from "express";

import {
  createExpenseService,
  getGroupExpenseService,
  getExpenseService,
  updateExpenseService,
  deleteExpenseService,
} from "./expense.service.js";

import type {
  CreateExpenseInput,
  UpdateExpenseInput,
} from "./expense.schema.js";

import { sendSuccess } from "../../lib/response.js";

// Create Expense
export const createExpenseController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.userId;
    const { groupId } = req.params as { groupId: string };
    const data = req.body as CreateExpenseInput;

    const expense = await createExpenseService(groupId, userId, data);

    sendSuccess(res, "Expense created successfully", expense, 201);
  } catch (error) {
    next(error);
  }
};

// List group expense
export const getGroupExpensesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.userId;
    const { groupId } = req.params as { groupId: string };

    const expenses = await getGroupExpenseService(groupId, userId);

    sendSuccess(res, "Expenses fetched successfully", expenses);
  } catch (error) {
    next(error);
  }
};

// Get simple expense
export const getExpenseController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.userId;
    const { expenseId } = req.params as { expenseId: string };

    const expense = await getExpenseService(expenseId, userId);

    sendSuccess(res, "Expense fetched successfully", expense);
  } catch (error) {
    next(error);
  }
};

// Update expense
export const updateExpenseController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.userId;
    const { expenseId } = req.params as { expenseId: string };
    const data = req.body as UpdateExpenseInput;

    const expense = await updateExpenseService(expenseId, userId, data);

    sendSuccess(res, "Expense updated successfully", expense);
  } catch (error) {
    next(error);
  }
};

// Delete expense
export const deleteExpenseController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.userId;
    const { expenseId } = req.params as { expenseId: string };

    await deleteExpenseService(expenseId, userId);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
