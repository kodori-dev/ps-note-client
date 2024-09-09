import dayjs from 'dayjs';

/**
 * BOJ 시간에 맞춰 KST-6 시간으로 변환하는 함수
 * @returns YYYY-MM-DD 형식
 */
export const getBojTime = () => {
  let today = new Date();
  today.setHours(today.getHours() + 3);
  const bojDay = dayjs(today).toISOString().split('T');

  return bojDay[0];
};
