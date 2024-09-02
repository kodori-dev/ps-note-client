/**
 * @param initialDay 해당 날짜 포함된 월, 금 return
 * @return 이번 주 기준 월, 금요일 날짜
 */
export const findThisWeek = (initialDay?: string) => {
  let today = initialDay ? new Date(initialDay) : new Date();
  const diffFromMon = today.getDay() - 6;
  const mon = new Date(today.setDate(today.getDate() + diffFromMon));
  const fri = new Date(today.setDate(mon.getDate() + 4));

  return { mon, fri };
};
