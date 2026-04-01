import type { Request, Response, NextFunction } from "express";

import {
  getGroupBalancesService,
  getUserBalancesService,
} from "./settlement.service.js";

import { sendSuccess } from "../../lib/response.js";

export const getGroupBalancesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.userId;
    const { groupId } = req.params as { groupId: string };

    const balances = await getGroupBalancesService(groupId, userId);

    sendSuccess(res, "Group balances fetched successfully", balances);
  } catch (error) {
    next(error);
  }
};

export const getUserBalancesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.userId;

    const result = await getUserBalancesService(userId);

    sendSuccess(res, "User balances fetched successfully", result);
  } catch (error) {
    next(error);
  }
};
