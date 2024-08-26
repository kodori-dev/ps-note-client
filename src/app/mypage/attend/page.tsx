'use client';
import DateCard from '@/components/Card/DateCard';
import Input from '@/components/Input';
import { findThisWeek } from '@/utils/findThisWeek';
import { getUserInfo } from '@/utils/getUserInfo';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

function Attend() {
  const [dateArr, setDateArr] = useState<Date[]>([]);
  // const user = await getUserInfo();
  const today = new Date();
  const { register, watch } = useForm({ defaultValues: { selectedWeek: dayjs(today).format('YYYY-MM-DD') } });
  const { selectedWeek } = watch();

  const fine = 5000;

  useEffect(() => {
    const { mon } = findThisWeek(selectedWeek);
    let week = [mon];
    for (let i = 1; i < 5; i++) {
      const tempDay = new Date(mon);
      const day = new Date(tempDay.setDate(mon.getDate() + i));
      week.push(day);
    }
    setDateArr(week);
  }, [selectedWeek]);

  return (
    <>
      <div className="text-48 flex flex-col gap-2 border-b border-gray-4 py-9 px-5">
        <p>
          <span className="font-700">안희원</span> 님의 출석 현황 조회
        </p>
        <div className="w-[270px]">
          <Input label="출석 조회 날짜 선택" description="해당 날짜가 포함된 1주 단위로 조회됩니다." register={register('selectedWeek')} type="date" />
        </div>
        <p className="text-end">
          <span className="font-700">4</span> 문제
        </p>
        <p className="text-end">
          <span className="font-700">{fine.toLocaleString('kr')}</span> 원
        </p>
      </div>
      <p className="text-16 text-gray-2 my-4">조회 기간: {`${dayjs(dateArr[0]).format('YYYY-MM-DD')} ~ ${dayjs(dateArr[4]).format('YYYY-MM-DD')}`}</p>
      <div className="flex flex-col gap-6">
        {dateArr.map((day) => (
          <DateCard
            key={day.getDay()}
            date={day.getDate()}
            day={day.getDay()}
            isToday={dayjs(day).format('YYYY-MM-DD') === dayjs(today).format('YYYY-MM-DD')}
          />
        ))}
      </div>
    </>
  );
}

export default Attend;
