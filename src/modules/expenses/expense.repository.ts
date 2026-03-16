import { prisma } from "../../db/prisma.js";
import type { Prisma } from "@prisma/client";

// CREATE EXPENSE
export const createExpense = async (data: Prisma.ExpenseCreateInput) =>
  prisma.expense.create({ data });

// BULK CREATE EXPENSE SPLITS
export const createExpenseSplits = async (
  data: Prisma.ExpenseSplitCreateManyInput[],
) => prisma.expenseSplit.createMany({ data });

// FIND EXPENSE BY ID
export const findExpenseById = async (expenseId: string) =>
  prisma.expense.findUnique({
    where: { id: expenseId },
    include: {
      splits: true,
      paidBy: {
        select: { id: true, firstName: true, lastName: true, email: true },
      },
    },
  });

// LIST EXPENSE BY GROUP
export const listGroupExpenses = async (groupId: string) =>
  prisma.expense.findMany({
    where: { groupId },
    include: {
      splits: true,
      paidBy: {
        select: { id: true, firstName: true, lastName: true, email: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

// DELETE  EXPENSE
export const deleteExpense = async (expenseId: string) =>
  prisma.expense.delete({ where: { id: expenseId } });

// DELETE EXPENSE SPLIT
export const deleteExpenseSplits = async (expenseId: string) =>
  prisma.expenseSplit.deleteMany({
    where: { expenseId },
  });

// UPDATE EXPENSE
export const updateExpense = async (
  expenseId: string,
  data: Prisma.ExpenseUpdateInput,
) => prisma.expense.update({ where: { id: expenseId }, data });
