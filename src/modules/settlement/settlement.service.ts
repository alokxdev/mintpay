import { prisma } from "../../db/prisma.js";
import { requireGroupMember } from "../../utils/groupAuth.js";
import {
  buildBalanceMap,
  settleBalances,
  splitBalances,
} from "../../utils/settlement.js";

export const getGroupBalancesService = async (
  groupId: string,
  userId: string,
) => {
  // auth check
  await requireGroupMember(groupId, userId);

  // fetch expenses
  const expenses = await prisma.expense.findMany({
    where: { groupId },
    include: {
      splits: true,
    },
  });

  if (!expenses.length) return [];

  // step 1
  const balanceMap = buildBalanceMap(expenses);

  // step 2
  const { creditors, debtors } = splitBalances(balanceMap);

  // step 3
  const settlements = settleBalances(creditors, debtors);

  return settlements;
};

/**
 * OPTIONAL — Get User Net Balance Across All Groups
 */
export const getUserBalancesService = async (userId: string) => {
  const expenses = await prisma.expense.findMany({
    where: {
      OR: [
        { paidById: userId },
        {
          splits: {
            some: {
              userId,
            },
          },
        },
      ],
    },
    include: {
      splits: true,
    },
  });

  if (!expenses.length) {
    return {
      netBalance: 0,
    };
  }

  const balanceMap = buildBalanceMap(expenses);

  return {
    netBalance: Number((balanceMap.get(userId) || 0).toFixed(2)),
  };
};
