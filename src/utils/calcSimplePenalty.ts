import { PenaltySchema } from "../../types/models/data-contracts";

export const calcSimplePenalty = (penalties: PenaltySchema[]) => {
  let penalty = 0; //벌금
  let solveNum = 0; //등록한 솔루션 개수
  let attend = 0; //출석일
  let isUsedCoupon = false;
  if (penalties) {
    for (let item of penalties) {
      if (item.coupons.length > 0) isUsedCoupon = true;
      penalty += Number(item.amount);
      if (item.admitted_solutions.length > 0 || item.not_admitted_solutions.length > 0 || item.coupons.length > 0) {
        attend++;
        solveNum += item.admitted_solutions.length + item.not_admitted_solutions.length;
      }
    }
  }

  return { penalty, solveNum, isUsedCoupon, attend };
};
