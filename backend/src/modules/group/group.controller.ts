import type { Request, Response, NextFunction } from "express";

import {
  createGroupService,
  getUserGroupsService,
  getGroupService,
  updateGroupService,
  deleteGroupService,
  addMemberService,
  removeMemberService,
  listMembersService,
} from "./group.service.js";

import type {
  CreateGroupInput,
  UpdateGroupInput,
  AddMemberInput,
} from "./group.schema.js";

import { sendSuccess } from "../../lib/response.js";

export const createGroupController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.userId;
    const data = req.body as CreateGroupInput;

    const group = await createGroupService(userId, data);

    sendSuccess(res, "Group created successfully", group, 201);
  } catch (err) {
    next(err);
  }
};

export const getUserGroupsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.userId;

    const groups = await getUserGroupsService(userId);

    sendSuccess(res, "Groups fetched successfully", groups);
  } catch (err) {
    next(err);
  }
};

export const getGroupController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.userId;
    const { groupId } = req.params as { groupId: string };

    const group = await getGroupService(groupId, userId);

    sendSuccess(res, "Group fetched successfully", group);
  } catch (err) {
    next(err);
  }
};

export const updateGroupController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.userId;
    const { groupId } = req.params as { groupId: string };
    const data = req.body as UpdateGroupInput;

    const group = await updateGroupService(groupId, userId, data);

    sendSuccess(res, "Group updated successfully", group);
  } catch (err) {
    next(err);
  }
};

export const deleteGroupController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.userId;
    const { groupId } = req.params as { groupId: string };

    await deleteGroupService(groupId, userId);

    sendSuccess(res, "Group deleted successfully");
  } catch (err) {
    next(err);
  }
};

export const addMemberController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.userId;
    const { groupId } = req.params as { groupId: string };
    const data = req.body as AddMemberInput;

    const member = await addMemberService(groupId, userId, data);

    sendSuccess(res, "Member added successfully", member, 201);
  } catch (err) {
    next(err);
  }
};

export const removeMemberController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.userId;
    const { groupId, userId: targetUserId } = req.params as {
      groupId: string;
      userId: string;
    };

    await removeMemberService(groupId, userId, targetUserId);

    sendSuccess(res, "Member removed successfully");
  } catch (err) {
    next(err);
  }
};

export const listMembersController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.userId;
    const { groupId } = req.params as { groupId: string };

    const members = await listMembersService(groupId, userId);

    sendSuccess(res, "Members fetched successfully", members);
  } catch (err) {
    next(err);
  }
};
