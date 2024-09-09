import dayjs from 'dayjs';

export const getBojTime = () => {
  let today = new Date();
  today.setHours(today.getHours() + 3);
  const bojDay = dayjs(today).toISOString().split('T');

  return bojDay[0];
};
