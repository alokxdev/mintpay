import { prisma } from "../../db/prisma.js";
import { GroupMemberRole } from "@prisma/client";

export const createGroup = async (data: { name: string; createdBy: string }) =>
  prisma.group.create({ data });

export const findGroupById = async (groupId: string) =>
  prisma.group.findUnique({ where: { id: groupId } });

// Find Group by ID with Members
export const groupWithMembers = async (groupId: string) =>
  prisma.group.findUnique({
    where: { id: groupId },
    include: { members: { include: { user: true } } },
  });

// List groups a user belongs to
export const findUserGroups = async (userId: string) =>
  prisma.group.findMany({ where: { members: { some: { userId } } } });

// Update Group
export const updateGroup = async (groupId: string, data: { name: string }) =>
  prisma.group.update({ where: { id: groupId }, data });

// Delete Group
export const deleteGroup = async (groupId: string) =>
  prisma.group.delete({ where: { id: groupId } });

// Add member
export const addMember = async (
  groupId: string,
  userId: string,
  role: GroupMemberRole = GroupMemberRole.MEMBER,
) => prisma.groupMember.create({ data: { groupId, userId, role } });

// Remove member
export const removeMember = async (groupId: string, userId: string) =>
  prisma.groupMember.delete({ where: { groupId_userId: { groupId, userId } } });

// Find member
export const findMember = async (groupId: string, userId: string) =>
  prisma.groupMember.findUnique({
    where: { groupId_userId: { groupId, userId } },
  });

// List group members
export const listMembers = async (groupId: string) =>
  prisma.groupMember.findMany({
    where: { groupId },
    include: {
      user: true,
    },
  });
