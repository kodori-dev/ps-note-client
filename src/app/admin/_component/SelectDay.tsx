'use client';
import Input from '@/components/Input';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  defaultDay: string;
}

function SelectDay({ defaultDay }: Props) {
  const { register, watch } = useForm({ defaultValues: { day: defaultDay } });
  const { day } = watch();

  useEffect(() => {
    if (day != defaultDay) {
      window.location.href = `/admin?day=${day}`;
    }
  }, [day]);

  return (
    <div className="w-[386px]">
      <Input label="출석 조회 날짜" register={register('day')} description="해당 날짜가 포함된 1주 단위로 조회됩니다." type="date" />
    </div>
  );
}

export default SelectDay;
