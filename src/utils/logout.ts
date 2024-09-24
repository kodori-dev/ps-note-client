/**
 * 로그아웃 only API 호출 로직
 * client에서만 사용
 */
export const logout = async () => {
  await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/session`, { method: 'DELETE' });
};
