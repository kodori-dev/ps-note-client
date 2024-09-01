import { api } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

export const useGetUserInfo = () => {
  const obj = useQuery({
    queryKey: ['member'],
    queryFn: async () => {
      const res = await api('GET', '/api/me');
      if (res?.nickname) return res;
      return null;
    },
  });

  return obj;
};
