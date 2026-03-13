import { Router } from "express";

import { authMiddleware } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";

import {
  createGroupSchema,
  updateGroupSchema,
  addMemberSchema,
  groupParamSchema,
  memberParamSchema,
} from "./group.schema.js";

import {
  createGroupController,
  getUserGroupsController,
  getGroupController,
  updateGroupController,
  deleteGroupController,
  addMemberController,
  removeMemberController,
  listMembersController,
} from "./group.controller.js";

const router = Router();

router.use(authMiddleware);

router.post("/", validate({ body: createGroupSchema }), createGroupController);

router.get("/", getUserGroupsController);

router.get(
  "/:groupId",
  validate({ params: groupParamSchema }),
  getGroupController,
);

router.patch(
  "/:groupId",
  validate({ params: groupParamSchema, body: updateGroupSchema }),
  updateGroupController,
);

router.delete(
  "/:groupId",
  validate({ params: groupParamSchema }),
  deleteGroupController,
);

router.post(
  "/:groupId/members",
  validate({ params: groupParamSchema, body: addMemberSchema }),
  addMemberController,
);

router.get(
  "/:groupId/members",
  validate({ params: groupParamSchema }),
  listMembersController,
);

router.delete(
  "/:groupId/members/:userId",
  validate({ params: memberParamSchema }),
  removeMemberController,
);

export default router;
