import { api } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useCheckLogin = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  const getMember = async () => {
    try {
      const res = await api('GET', '/api/me');
      if (typeof res === 'string') throw Error();
      setIsLogin(true);
    } catch (error) {
      router.push('/login');
    }
  };

  useEffect(() => {
    getMember();
  }, []);

  return { isLogin, setIsLogin };
};

/**
 * 로그인 유저는 home으로 리다이렉트
 */
export const useRedirectLoginUser = () => {
  const router = useRouter();
  const { isLogin, setIsLogin } = useCheckLogin();

  useEffect(() => {
    if (isLogin) router.push('/');
  }, [isLogin]);

  return { isLogin, setIsLogin };
};
