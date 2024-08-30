'use client';

import MemberCard from '../Card/MemberCard';
import HomeLock from '../Lock/HomeLock';
import dayjs from 'dayjs';
import { calcSimplePenalty } from '@/utils/calcSimplePenalty';
import { useHomePageContext } from '@/contexts/HomePageContext';

function MemberSection() {
  const { members, penalty_map } = useHomePageContext();

  return (
    <>
      {members ? (
        <div className="flex gap-7 flex-wrap">
          {members.map(({ id, nickname, boj_id, is_active }) => {
            const penaltyArr = penalty_map[id.toString()];
            const { penalty, solveNum } = calcSimplePenalty(penaltyArr);
            if (!penaltyArr)
              return (
                <div key={id} className="w-[276px] h-[276px] shrink-0">
                  오류가 발생했습니다.
                </div>
              );
            let today = new Date();
            today.setHours(today.getHours() - 6);

            // console.log(nickname, solveNum);

            let todayPenalty = null;
            for (const item of penaltyArr) {
              if (item.day === dayjs(today).format('YYYY-MM-DD')) todayPenalty = item;
            }
            return (
              <MemberCard
                key={id}
                id={id}
                name={nickname}
                bojId={boj_id}
                fine={penalty}
                weekSolved={solveNum}
                isActive={is_active}
                isCoupon={todayPenalty ? todayPenalty?.coupons.length > 0 : false}
                todaySolve={todayPenalty?.admitted_solutions}
              />
            );
          })}
        </div>
      ) : (
        <HomeLock type="member" />
      )}
    </>
  );
}

export default MemberSection;
