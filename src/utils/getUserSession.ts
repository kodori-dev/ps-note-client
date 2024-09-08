import { UserSessionType } from '@/types/userSession';
import { getIronSession, SessionOptions } from 'iron-session';
import { cookies } from 'next/headers';

export const defaultUserSession: UserSessionType = {
  isLogin: false,
  nickname: '',
  userId: -1,
};

export const sessionOptions: SessionOptions = {
  password: process.env.NEXT_PUBLIC_SESSION_PW as string,
  cookieName: 'userInfo',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export const getUserSession = async () => {
  'use server';
  const session = await getIronSession<UserSessionType>(cookies(), sessionOptions);

  console.log('왜없느', session);

  if (!session.isLogin) {
    session.isLogin = defaultUserSession.isLogin;
    session.nickname = defaultUserSession.nickname;
    session.userId = defaultUserSession.userId;
  }

  return session;
};
