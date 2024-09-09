'use server';

import { getServerData } from './getServerData';
import { UserType } from '@/types/api/auth';

export const getUserInfo = async () => {
  const member = ((await getServerData('/me')) as UserType) || null;

  // const res = await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/set-user`, {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     nickname: member.nickname,
  //     memberId: member.id,
  //   }),
  // });

  return member;
};
