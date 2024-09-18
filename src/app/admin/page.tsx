'use client';

import Input from '@/components/Input';
import ScreenLoading from '@/components/Loading/ScreenLoading';
import { useCheckAdmin } from '@/hooks/useCheckAdmin';
import { api } from '@/utils/api';
import { calcSimplePenalty } from '@/utils/calcSimplePenalty';
import { findThisWeek } from '@/utils/findThisWeek';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const CATEGORY = ['이름', 'M', 'T', 'W', 'T', 'F', '벌금', '납부', '세부'];

function Admin() {
  const isAdmin = useCheckAdmin();
  const [dateArr, setDateArr] = useState<Date[]>([]);
  let today = new Date();
  today.setHours(today.getHours() - 6);
  const { register, watch } = useForm({ defaultValues: { selectedWeek: dayjs(today).format('YYYY-MM-DD') } });
  const { selectedWeek } = watch();
  const [isOpen, setIsOpen] = useState(-1);

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

  const {
    data: membersData,
    isSuccess: isMembersSuccess,
    isLoading: isMembersLoading,
  } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const res = await api('GET', '/members', undefined, { is_off: false });
      return res;
    },
    staleTime: 10 * (60 * 1000),
    gcTime: Infinity,
  });

  const {
    data,
    isLoading,
    isSuccess,
    refetch: getPenalty,
  } = useQuery({
    queryKey: ['admin', dateArr[0], dateArr[4]],
    queryFn: async () => {
      if (!membersData) return null;
      let res = [] as any[];
      for (const member of membersData) {
        const memberPenalty = await api('GET', '/penalties', undefined, {
          member_id: member.id,
          order_by: 'day',
          start_date: dayjs(dateArr[0]).format('YYYY-MM-DD'),
          end_date: dayjs(dateArr[4]).format('YYYY-MM-DD'),
        });
        const { penalty } = calcSimplePenalty(memberPenalty);
        let colArr = [memberPenalty, penalty]; //[{m}, {t}, {w}, {t}, {f}], 벌금]
        res.push(colArr);
      }
      return res;
    },
    enabled: false,
  });

  useEffect(() => {
    if (isMembersSuccess && membersData) getPenalty();
  }, [isMembersSuccess]);

  useEffect(() => {
    getPenalty();
  }, [dateArr]);

  const handleMemberClick = (id: number) => {
    if (isOpen === id) setIsOpen(-1);
    else setIsOpen(id);
  };

  return (
    <>
      {!isAdmin && (
        <div className="flex flex-col gap-8">
          <div className="w-[386px]">
            <Input label="출석 조회 날짜" description="해당 날짜가 포함된 1주 단위로 조회됩니다." register={register('selectedWeek')} type="date" />
          </div>
          <div className="grid grid-cols-9">
            {CATEGORY.map((item, idx) => (
              <div className="text-gray-3 flex items-center" key={item}>
                {item}
                {item.length < 2 && <p className="text-12">{`(${dayjs(dateArr[idx - 1]).format('MM/DD') || ''})`}</p>}
              </div>
            ))}
            <>
              {isSuccess &&
                data &&
                data.map((item) => (
                  <>
                    {item[0].length > 0 && (
                      <Fragment key={item[0][0].member.id}>
                        <Link className="hover:text-primary" href={`/attend/${item[0][0].member.id}`}>
                          {item[0][0].member.nickname}
                        </Link>
                        {item[0].map((penalty: any) => (
                          <p key={`${penalty.day}+${penalty.member.id}`}>{penalty.coupons.length > 0 ? `🎟️` : penalty.is_penalty ? '✖️' : '✅'}</p>
                        ))}
                        <p>{(item[1] as number).toLocaleString('ko-KR')} 원</p>
                        <p>-</p>
                        <button onClick={() => handleMemberClick(item[0][0].member.id)} className="text-start py-1 px-4 w-fit rounded-sm hover:text-primary">
                          {item[0][0].member.id === isOpen ? '닫기' : '열기'}
                        </button>
                      </Fragment>
                    )}
                  </>
                ))}
            </>
          </div>
        </div>
      )}
      {(isLoading || isMembersLoading) && <ScreenLoading />}
    </>
  );
}
export default Admin;
