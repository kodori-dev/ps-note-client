import { cookies } from 'next/headers';

export const getUserInfo = async () => {
  const cookieStore = cookies();

  const member = await (await fetch(`https://${process.env.NEXT_PUBLIC_API_BASE_URL}/api/me`, { headers: { Cookie: cookieStore.toString() || '' } })).json();

  if (member.code) return null;
  return member;
};
