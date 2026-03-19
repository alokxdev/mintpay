import { Router } from "express";

import { authMiddleware } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";

import { groupParamSchema } from "../group/group.schema.js";
import {
  createExpenseParamSchema,
  createExpenseBodySchema,
  updateExpenseParamSchema,
  updateExpenseBodySchema,
  expenseParamSchema,
} from "./expense.schema.js";

import {
  createExpenseController,
  getGroupExpensesController,
  getExpenseController,
  updateExpenseController,
  deleteExpenseController,
} from "./expense.controller.js";

const router = Router();

router.use(authMiddleware);

router.get(
  "/:expenseId",
  validate({ params: expenseParamSchema }),
  getExpenseController,
);

router.patch(
  "/:expenseId",
  validate({
    params: updateExpenseParamSchema,
    body: updateExpenseBodySchema,
  }),
  updateExpenseController,
);

router.delete(
  "/:expenseId",
  validate({ params: expenseParamSchema }),
  deleteExpenseController,
);

export default router;
