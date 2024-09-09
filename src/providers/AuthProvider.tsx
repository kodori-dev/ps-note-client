'use server';

import { defaultUserSession } from '@/constants/userSession';
import { getUserSession } from '@/utils/getUserSession';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

async function AuthProvider({ children }: Props) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const session = await getUserSession();
      return session;
    },
    initialData: defaultUserSession,
    staleTime: 0,
    gcTime: Infinity,
  });

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}

export default AuthProvider;
