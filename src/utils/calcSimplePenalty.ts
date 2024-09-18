import { PenaltySchema } from '../../models';

export const calcSimplePenalty = (penalties: PenaltySchema[]) => {
  let penalty = 0;
  let solveNum = 0;
  let isUsedCoupon = false;
  if (penalties.length > 0) {
    for (let item of penalties) {
      if (item.coupons.length > 0) isUsedCoupon = true;
      penalty += Number(item.amount);
      if (!item.is_penalty) solveNum++;
    }
  }

  return { penalty, solveNum, isUsedCoupon };
};
