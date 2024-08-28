import { UserType } from './auth';
import { CouponType } from './coupon';
import { SolutionType } from './solution';

export interface GetPenaltiesRes {
  day: string;
  member: UserType;
  amount: string;
  admitted_solutions: SolutionType[];
  not_admitted_solutions: SolutionType[];
  coupons: CouponType[];
  is_penalty: boolean;
  manually_edited: boolean;
}
