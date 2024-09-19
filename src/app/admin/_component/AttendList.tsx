'use client';

import { InternalPenaltyType } from '@/types/api/admin';
import dayjs from 'dayjs';
import { Fragment, useState } from 'react';
import { PenaltySchema } from '../../../../models';
import Link from 'next/link';
import { defaultMember, defaultPenalty } from '@/constants/defaultValue';

interface Props {
  startDate: string;
  data: InternalPenaltyType[];
}

const CATEGORY = ['이름', 'M', 'T', 'W', 'T', 'F', '벌금', '납부', '상세보기'];

function AttendList({ startDate, data }: Props) {
  const [detailMem, setDetailMem] = useState(-1);
  const [isAllOpen, setIsAllOpen] = useState(false);

  const getDate = (diff: number) => {
    const start = new Date(startDate);
    const target = new Date(start.setDate(start.getDate() + diff));
    return dayjs(target).format('MM/DD');
  };

  return (
    <div>
      <div className="flex justify-end mb-5">
        <label className="hover:cursor-pointer flex items-center gap-2 w-fit">
          <input
            className="w-4 h-4"
            type="checkbox"
            onChange={() => {
              setIsAllOpen((prev) => !prev);
              if (isAllOpen) setDetailMem(-1);
            }}
          />
          상세 정보 모두 열기
        </label>
      </div>
      <div className="grid grid-cols-9">
        {CATEGORY.map((item, idx) => (
          <div className="text-14 text-gray-3 flex items-center" key={item}>
            {item}
            {item.length < 2 && <p className="text-12">{`(${getDate(idx - 1)})`}</p>}
          </div>
        ))}
        {data.map(({ member, penalties, penalty_amount, is_deposit }) => {
          let attend: PenaltySchema[] = [defaultPenalty, defaultPenalty, defaultPenalty, defaultPenalty, defaultPenalty];
          for (const penalty of penalties) {
            const startDay = new Date(startDate);
            const attendDay = new Date(penalty.day);
            if ([6, 0].includes(attendDay.getDay())) continue; //weekend
            attend[attendDay.getDay() - startDay.getDay()] = penalty;
          }

          return (
            <Fragment key={member.id}>
              <Link className="hover:text-primary font-700" href={`/attend/${member.id}`}>
                {member.nickname} {member.is_off && '💤'}
              </Link>
              {attend.map(({ id, coupons, is_penalty, admitted_solutions, not_admitted_solutions }, idx) => (
                <div key={id} className="flex flex-col">
                  {id < 0 ? '😋' : coupons.length > 0 ? `🎟️` : is_penalty ? '✖️' : '✅'}
                  {(isAllOpen || member.id === detailMem) && (
                    <>
                      {admitted_solutions.map(({ id }) => (
                        <Link key={id} className="hover:opacity-70 text-14 text-blue-500 mb-2" href={`/solution/${id}`}>
                          {id} ✓
                        </Link>
                      ))}
                      {not_admitted_solutions.map(({ id }) => (
                        <div className="flex justify-between text-14 mb-2">
                          <Link key={id} className="hover:opacity-70 text-red-500 font-700" href={`/solution/${id}`}>
                            {id} ✕
                          </Link>
                          <button className="text-gray-2 hover:text-gray-1">재검증</button>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              ))}
              <p>{Number(penalty_amount).toLocaleString('ko-KR')} 원</p>
              <p>{is_deposit ? '✔️' : '✖️'}</p>
              <button
                onClick={() => setDetailMem(member.id === detailMem ? -1 : member.id)}
                className="font-700 text-start flex justify-start py-1 px-4 hover:text-primary"
              >
                {isAllOpen || member.id === detailMem ? '∧' : '∨'}
              </button>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default AttendList;
