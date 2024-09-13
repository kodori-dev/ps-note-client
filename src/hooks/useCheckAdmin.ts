import { useEffect, useState } from 'react';
import { useGetUserInfo } from './useGetUserInfo';

export const useCheckAdmin = () => {
  const { data: user, isSuccess } = useGetUserInfo();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if ([process.env.NEXT_PUBLIC_ADMIN_ID1, process.env.NEXT_PUBLIC_ADMIN_ID2].includes(String(user.userId))) setIsAdmin(true);
  }, [isSuccess]);

  return isAdmin;
};
