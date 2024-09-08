'use server';

import { getServerData } from './getServerData';
import { UserType } from '@/types/api/auth';

export const getUserInfo = async () => {
  const member = ((await getServerData('/api/me')) as UserType) || null;

  return member;
};
