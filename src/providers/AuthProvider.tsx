'use server';

import { getUserInfo } from '@/utils/getUserInfo';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

async function AuthProvider({ children }: Props) {
  const member = await getUserInfo();
  if (member) await fetch('http://localhost:3000/api/session', { method: 'POST', body: JSON.stringify({ userId: member.id, nickname: member.nickname }) });

  return <>{children}</>;
}

export default AuthProvider;
