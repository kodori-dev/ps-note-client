import { GetPenaltiesRes } from '@/types/api/penalty';

export const calcSimplePenalty = (penalties: GetPenaltiesRes) => {
  let penalty = 0;
  let solveNum = 0;
  let isUsedCoupon = false;
  for (let item of penalties) {
    if (item.coupons.length > 0) isUsedCoupon = true;
    penalty += Number(item.amount);
    if (!item.is_penalty) solveNum++;
  }
  return { penalty, solveNum, isUsedCoupon };
};
