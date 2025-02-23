/**
 * 로그아웃 only API 호출 로직
 * client에서만 사용
 */
export const logout = async () => {
  await fetch(`/proxy/auth/logout`, { method: 'POST' });
  await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/front/session`, { method: 'DELETE' });
};
