import { UserSessionType } from '@/types/userSession';
import { SessionOptions } from 'iron-session';

export const defaultUserSession: UserSessionType = {
  isLogin: false,
  nickname: '',
  userId: -1,
  isAdmin: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.NEXT_PUBLIC_SESSION_PW as string,
  cookieName: 'userInfo',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};
