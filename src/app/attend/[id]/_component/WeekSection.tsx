'use client';

import DateCard from '@/components/Card/DateCard';
import ProblemCard from '@/components/Card/ProblemCard';
import Input from '@/components/Input';
import ScreenLoading from '@/components/Loading/ScreenLoading';
import ProgressBar from '@/components/ProgressBar';
import { GetType } from '@/types/api/get';
import { api } from '@/utils/api';
import { calcSimplePenalty } from '@/utils/calcSimplePenalty';
import { findThisWeek } from '@/utils/findThisWeek';
import { getBojTime } from '@/utils/getBojTime';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SolutionSchema } from '../../../../../models';

interface Props {
  holidayData: GetType['/holidays']['res'];
  memberId: number;
}

function WeekSection({ holidayData, memberId }: Props) {
  const [dateArr, setDateArr] = useState<Date[]>([]);
  const today = getBojTime();
  const { register, watch } = useForm({ defaultValues: { selectedWeek: today } });
  const { selectedWeek } = watch();
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['checkin', memberId, dateArr[0], dateArr[1]],
    queryFn: async () => {
      const penalties = await api('GET', '/penalties', undefined, {
        start_date: dayjs(dateArr[0]).format('YYYY-MM-DD'),
        end_date: dayjs(dateArr[4]).format('YYYY-MM-DD'),
        member_id: memberId,
      });
      const { penalty, solveNum, isUsedCoupon } = calcSimplePenalty(penalties);
      return { penalty, solveNum, isUsedCoupon, penalties };
    },
  });

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

  const ATTEND_CARD_STR = {
    holiday: '공휴일',
    coupon: '🎟️ 면제 티켓 사용',
    noSolve: '문제를 풀지 않았어요 😭',
  };

  return (
    <article className="flex flex-col gap-4">
      {isLoading && <ScreenLoading />}
      <h2 className="text-32">
        <span className="font-700">주차별 출석</span> 세부 조회
      </h2>
      <div className="flex gap-8">
        <div className="w-[386px]">
          <Input label="출석 조회 날짜" description="해당 날짜가 포함된 1주 단위로 조회됩니다." register={register('selectedWeek')} type="date" />
        </div>
        <div className="flex flex-col gap-7 bg-white rounded-md shadow-lg px-6 py-5 w-[523px]">
          <p className="text-16 text-gray-2">조회 날짜: {`${dayjs(dateArr[0]).format('YYYY-MM-DD')} ~ ${dayjs(dateArr[4]).format('YYYY-MM-DD')}`}</p>
          {isSuccess && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-12">
                <p className="text-gray-2">출석</p>
                <div className="w-[386px]">
                  <ProgressBar sols={String(data.solveNum) as '0' | '1' | '2' | '3' | '4' | '5'} />
                </div>
              </div>
              <div className="flex items-center gap-12">
                <p className="text-gray-2 w-8">벌금</p>
                <p>{data.penalty.toLocaleString('kr')}원</p>
              </div>
              <label className="flex gap-2 text-gray-2">
                <input type="checkbox" className="w-5 h-5" defaultChecked={false} disabled />
                💸 벌금 납부
              </label>
              <label className="flex gap-2 text-gray-2">
                <input type="checkbox" className="w-5 h-5" defaultChecked={data.isUsedCoupon} disabled />
                🎟️ 면제 티켓 사용
              </label>
            </div>
          )}
        </div>
      </div>
      {isSuccess && (
        <div className="flex flex-col gap-6 mt-5">
          {dateArr.map((day) => {
            let type = 'attend';
            let holidayName = '';

            //공휴일
            if (holidayData && holidayData.length > 0) {
              for (let holiday of holidayData) {
                if (dayjs(holiday.date).format('YYYY-MM-DD') === dayjs(day).format('YYYY-MM-DD')) {
                  type = 'holiday';
                  holidayName = holiday.name;
                }
              }
            }

            const penaltyArr = data?.penalties.filter(({ day: dataDay }) => dayjs(dataDay).format('YYYY-MM-DD') == dayjs(day).format('YYYY-MM-DD'));
            const penalty = penaltyArr.length === 0 ? null : penaltyArr[0];
            if (type !== 'holiday' && (!penalty || penalty.is_penalty)) type = 'noSolve';

            let daySolutions = [] as SolutionSchema[];
            if (penalty && !penalty.is_penalty) {
              daySolutions = penalty.admitted_solutions.concat(penalty.not_admitted_solutions);
              if (daySolutions.length > 0) type = 'attend';
              if (penalty.coupons.length > 0) type = 'coupon';
            }

            return (
              <div key={day.getDay()} className="flex gap-20">
                <DateCard
                  isHoliday={holidayName !== '' || type === 'holiday'}
                  holidayName={holidayName}
                  date={day.getDate()}
                  day={day.getDay()}
                  isToday={dayjs(day).format('YYYY-MM-DD') === today}
                />
                {type === 'attend' ? (
                  <div className="flex flex-nowrap gap-4 w-full overflow-x-scroll scroll-hidden">
                    {daySolutions.map(({ id, source_lang, is_correct_answer, score_label, problem }) => (
                      <ProblemCard
                        key={id}
                        type="solution"
                        bojId={problem.boj_id}
                        problemId={problem.id}
                        isSolved={problem.is_solved ?? false}
                        title={problem.name}
                        stars={problem.stars}
                        isStar={problem.is_starred ?? false}
                        solLang={source_lang}
                        isCorrectAnswer={is_correct_answer}
                        resultLabel={score_label}
                        solutionId={id}
                        level={problem.level}
                      />
                    ))}
                  </div>
                ) : (
                  <p
                    className={[
                      'h-[177px] w-full flex flex-col gap-2 items-center justify-center rounded-sm border border-gray-4 bg-white/30',
                      type === 'holiday' ? 'text-red' : null,
                    ].join(' ')}
                  >
                    {ATTEND_CARD_STR[type as 'holiday' | 'coupon' | 'noSolve']}
                    {dayjs(day).format('YYYY-MM-DD') === today && (
                      <Link href={'/post'} className="text-12 text-primary border-b border-primary">
                        지금 바로 체크인하기
                      </Link>
                    )}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </article>
  );
}

export default WeekSection;
