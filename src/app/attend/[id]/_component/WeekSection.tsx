'use client';

import DateCard from '@/components/Card/DateCard';
import Input from '@/components/Input';
import ProgressBar from '@/components/ProgressBar';
import { WEEK_PENALTY } from '@/constants/mockup';
import { GetPenaltiesRes } from '@/types/api/penalty';
import { calcSimplePenalty } from '@/utils/calcSimplePenalty';
import { findThisWeek } from '@/utils/findThisWeek';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

function WeekSection() {
  const [dateArr, setDateArr] = useState<Date[]>([]);
  const today = new Date();
  const { register, watch } = useForm({ defaultValues: { selectedWeek: dayjs(today).format('YYYY-MM-DD') } });
  const { selectedWeek } = watch();

  const data = WEEK_PENALTY as GetPenaltiesRes;
  const { penalty, solveNum, isUsedCoupon } = calcSimplePenalty(data);

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
    <article className="flex flex-col gap-4">
      <h2 className="text-32">
        <span className="font-700">주차별 출석</span> 세부 조회
      </h2>
      <div className="flex gap-8">
        <div className="w-[386px]">
          <Input label="출석 조회 날짜" description="해당 날짜가 포함된 1주 단위로 조회됩니다." register={register('selectedWeek')} type="date" />
        </div>
        <div className="flex flex-col gap-7 bg-white rounded-md shadow-lg px-6 py-5 w-[523px]">
          <p className="text-16 text-gray-2">조회 날짜: {`${dayjs(dateArr[0]).format('YYYY-MM-DD')} ~ ${dayjs(dateArr[4]).format('YYYY-MM-DD')}`}</p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-12">
              <p className="text-gray-2">출석</p>
              <div className="w-[386px]">
                <ProgressBar sols={String(solveNum) as '1' | '2' | '3' | '4' | '5'} />
              </div>
            </div>
            <div className="flex items-center gap-12">
              <p className="text-gray-2 w-8">벌금</p>
              <p>{penalty.toLocaleString('kr')}원</p>
            </div>
            <label className="flex gap-2 text-gray-2">
              <input type="checkbox" className="w-5 h-5" defaultChecked={false} disabled />
              💸 벌금 납부
            </label>
            <label className="flex gap-2 text-gray-2">
              <input type="checkbox" className="w-5 h-5" defaultChecked={isUsedCoupon} disabled />
              🎟️ 면제 티켓 사용
            </label>
          </div>
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
    </article>
  );
}

export default WeekSection;
