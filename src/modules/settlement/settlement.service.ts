import { requireGroupMember } from "../../utils/groupAuth.js";
import {
  buildBalanceMap,
  settleBalances,
  splitBalances,
} from "../../utils/settlement.js";
import {
  findUserExpense,
  listGroupExpenses,
} from "../expenses/expense.repository.js";

export const getGroupBalancesService = async (
  groupId: string,
  userId: string,
) => {
  await requireGroupMember(groupId, userId);

  const expenses = await listGroupExpenses(groupId);

  if (!expenses.length) return [];

  const balanceMap = buildBalanceMap(expenses);
  const { creditors, debtors } = splitBalances(balanceMap);
  const settlements = settleBalances(creditors, debtors);

  return settlements;
};

export const getUserBalancesService = async (userId: string) => {
  const expenses = await findUserExpense(userId);

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
