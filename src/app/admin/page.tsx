'use client';

import Input from '@/components/Input';
import { findThisWeek } from '@/utils/findThisWeek';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const CATEGORY = ['이름', 'M', 'T', 'W', 'T', 'F', '벌금', '납부'];

function Admin() {
  const [dateArr, setDateArr] = useState<Date[]>([]);
  let today = new Date();
  today.setHours(today.getHours() - 6);
  const { register, watch } = useForm({ defaultValues: { selectedWeek: dayjs(today).format('YYYY-MM-DD') } });
  const { selectedWeek } = watch();

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
    <div>
      <div className="w-[386px]">
        <Input label="출석 조회 날짜" description="해당 날짜가 포함된 1주 단위로 조회됩니다." register={register('selectedWeek')} type="date" />
      </div>
      <div className="grid grid-cols-8">
        {CATEGORY.map((item) => (
          <p className="text-gray-3">{item}</p>
        ))}
      </div>
    </div>
  );
}

export default Admin;
