import { UserType } from './auth';

export interface CouponType {
  id: number;
  name: string;
  member: UserType;
  used_at: string;
  valid_to: string;
  valid_from: string;
  created_at: string;
  updated_at: string;
}

export type GetCouponsRes = CouponType[];

export interface PatchCouponReq {
  name: string;
  member: number;
  used_at: string;
  valid_to: string;
  valid_from: string;
}

export interface PatchCouponRes {
  id: number;
  name: string;
  member: number;
  used_at: string;
  valid_to: string;
  valid_from: string;
  created_at: string;
  updated_at: string;
}
