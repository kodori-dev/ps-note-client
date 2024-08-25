/**
 * @return 이번 주 기준 월, 금요일 날짜
 */
export const findThisWeek = () => {
  const today = new Date();
  const diffFromMon = 1 - today.getDay();
  const mon = new Date(today.setDate(today.getDate() + diffFromMon));
  const fri = new Date(today.setDate(mon.getDate() + 4));

  return { mon, fri };
};
