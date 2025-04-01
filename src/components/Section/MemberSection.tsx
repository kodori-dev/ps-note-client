"use client";

import dayjs from "dayjs";
import { MemberSchema, PenaltySchema } from "../../../models";
import MemberCard from "../Card/MemberCard";
import HomeLock from "../Lock/HomeLock";
import { calcSimplePenalty } from "@/utils/calcSimplePenalty";
import { getBojTime } from "@/utils/getBojTime";

interface Props {
  members: MemberSchema[];
  penalty_map: {
    [k: string]: PenaltySchema[];
  };
}

function MemberSection({ members, penalty_map }: Props) {
  return (
    <>
      {members ? (
        <div className="flex gap-7 flex-wrap">
          {members.map(({ id, nickname, boj_id, is_active, is_off }) => {
            const penaltyArr = penalty_map[id.toString()];
            const { penalty, solveNum, attend } = calcSimplePenalty(penaltyArr);
            const today = getBojTime();

            let todayPenalty = null;
            if (penaltyArr) {
              for (const item of penaltyArr) {
                if (dayjs(item.day).format("YYYY-MM-DD") === today) todayPenalty = item;
              }
            }

            return (
              <MemberCard
                key={id}
                id={id}
                name={nickname ?? "(알수없음)"}
                bojId={boj_id}
                fine={penalty}
                weekSolved={solveNum}
                attend={attend}
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
