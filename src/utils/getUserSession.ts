'use server';

import { defaultUserSession, sessionOptions } from '@/constants/userSession';
import { UserSessionType } from '@/types/userSession';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export const getUserSession = async () => {
  const session = await getIronSession<UserSessionType>(cookies(), sessionOptions);

  if (!session.isLogin) {
    session.isLogin = defaultUserSession.isLogin;
    session.nickname = defaultUserSession.nickname;
    session.userId = defaultUserSession.userId;
    session.isAdmin = defaultUserSession.isAdmin;
  }

  return session;
};
