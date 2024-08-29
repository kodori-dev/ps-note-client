'use server';

import dayjs from 'dayjs';
import { getServerData } from './getServerData';
import { UserType } from '@/types/api/auth';
import { GetCouponsRes } from '@/types/api/coupon';

export const getUserInfo = async () => {
  const today = new Date();
  let isUsed = false;

  const member = ((await getServerData('/api/me')) as UserType) || null;
  // if (member !== null) {
  //   const coupon = (await getServerData('/api/coupons', {
  //     date: dayjs(today).format('YYYY-MM-DD'),
  //     member_id: member.id,
  //     used_at: false,
  //   })) as GetCouponsRes | null;
  //   isUsed = Boolean(coupon && coupon.length > 0);
  // }

  return member;
};
