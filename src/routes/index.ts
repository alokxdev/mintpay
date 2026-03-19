import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes.js";
import userRoutes from "../modules/user/user.routes.js";
import groupRoutes from "../modules/group/group.routes.js";
import expenseRoutes from "../modules/expenses/expense.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/groups", groupRoutes);
router.use("/expense", expenseRoutes);

export default router;
