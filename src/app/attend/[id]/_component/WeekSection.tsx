'use client';

import DateCard from '@/components/Card/DateCard';
import Input from '@/components/Input';
import { findThisWeek } from '@/utils/findThisWeek';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

function WeekSection() {
  const [dateArr, setDateArr] = useState<Date[]>([]);
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
    <div className="flex flex-col gap-4">
      <h2 className="text-32">주차별 출석 세부 조회</h2>
      <div className="flex gap-8">
        <div className="w-[386px]">
          <Input label="출석 조회 날짜 선택" description="해당 날짜가 포함된 1주 단위로 조회됩니다." register={register('selectedWeek')} type="date" />
        </div>
        <div>
          출석카드
          <p className="text-16 text-gray-2 my-4">조회 기간: {`${dayjs(dateArr[0]).format('YYYY-MM-DD')} ~ ${dayjs(dateArr[4]).format('YYYY-MM-DD')}`}</p>
        </div>
      </div>
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
    </div>
  );
}

export default WeekSection;
