import { GetPenaltiesRes } from '@/types/api/penalty';

export const calcSimplePenalty = (penalties: GetPenaltiesRes) => {
  let penalty = 0;
  let solveNum = 0;
  let isUsedCoupon = false;
  for (let item of penalties) {
    if (item.coupons.length > 0) isUsedCoupon = true;
    penalty += Number(item.amount);
    if (Number(item.amount) == 0) solveNum++;
  }
  return { penalty, solveNum, isUsedCoupon };
};
