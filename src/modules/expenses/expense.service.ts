import { ApiError } from "../../utils/ApiError.js";
import { listMembers } from "../group/group.repository.js";

export const validateParticipantsAreMemberOf = async (
  groupId: string,
  userIds: string[],
) => {
  const members = await listMembers(groupId);

  const memberIds = new Set(members.map((m) => m.userId));

  for (const userId in userIds) {
    if (!memberIds.has(userId)) {
      throw new ApiError(400, `User ${userId} is not a member of this group`);
    }
  }
};
