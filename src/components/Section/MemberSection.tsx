'use client';

import MemberCard from '../Card/MemberCard';
import HomeLock from '../Lock/HomeLock';
import { calcSimplePenalty } from '@/utils/calcSimplePenalty';
import { UserType } from '@/types/api/auth';
import { PenaltyType } from '@/types/api/penalty';
import { getBojTime } from '@/utils/getBojTime';

interface Props {
  members: UserType[];
  penalty_map: {
    [k: string]: PenaltyType[];
  };
}

function MemberSection({ members, penalty_map }: Props) {
  return (
    <>
      {members ? (
        <div className="flex gap-7 flex-wrap">
          {members.map(({ id, nickname, boj_id, is_active, is_off }) => {
            const penaltyArr = penalty_map[id.toString()];
            const { penalty, solveNum } = calcSimplePenalty(penaltyArr);
            if (!penaltyArr)
              return (
                <div key={id} className="w-[276px] h-[276px] shrink-0">
                  오류가 발생했습니다.
                </div>
              );
            const today = getBojTime();

            let todayPenalty = null;
            for (const item of penaltyArr) {
              if (item.day === today) todayPenalty = item;
            }
            return (
              <MemberCard
                key={id}
                id={id}
                name={nickname}
                bojId={boj_id}
                fine={penalty}
                weekSolved={solveNum - 2}
                isActive={is_active}
                isCoupon={todayPenalty ? todayPenalty?.coupons.length > 0 : false}
                todaySolve={todayPenalty?.admitted_solutions}
                isRest={is_off}
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
