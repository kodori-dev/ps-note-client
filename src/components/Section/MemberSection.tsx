import MemberCard from '../Card/MemberCard';
import { GetMembersRes } from '@/types/api/auth';
import HomeLock from '../Lock/HomeLock';
import { cookies } from 'next/headers';
import { findThisWeek } from '@/utils/findThisWeek';
import dayjs from 'dayjs';
import { calcSimplePenalty } from '@/utils/calcSimplePenalty';
import { GetPenaltiesRes } from '@/types/api/penalty';

async function MemberSection() {
  const cookie = cookies();
  const { mon, fri } = findThisWeek();

  const getMembers = async () => {
    try {
      const res = await fetch(`http://${process.env.NEXT_PUBLIC_API_BASE_URL}/api/members`, {
        headers: { Cookie: cookie.toString() || '' },
        cache: 'no-store',
      });
      if (res.ok) return await res.json();
      else throw Error();
    } catch (err) {
      return null;
    }
  };
  const members = (await getMembers()) as GetMembersRes | null;
  const getPenalty = async (member: number) => {
    const res = await fetch(
      `http://${process.env.NEXT_PUBLIC_API_BASE_URL}/api/penalties?start_date=${dayjs(mon).format('YYYY-MM-DD')}&end_date=${dayjs(fri).format(
        'YYYY-MM-DD'
      )}&member_id=${member}`,
      {
        headers: { Cookie: cookie.toString() || '' },
        cache: 'no-store',
      }
    );
    if (res.ok) {
      const penaltyArr = (await res.json()) as GetPenaltiesRes;
      const { penalty, solveNum } = calcSimplePenalty(penaltyArr);
      return { penalty, solveNum, penaltyArr };
    }
    return { penalty: -1, solveNum: 0, penaltyArr: null };
  };

  return (
    <>
      {members ? (
        <div className="flex gap-7 flex-wrap">
          {members.map(async ({ id, nickname, boj_id, is_active }) => {
            const { penalty, solveNum, penaltyArr } = await getPenalty(id);
            if (!penaltyArr) return <div key={id}>오류가 발생했습니다.</div>;
            let today = new Date();
            today.setHours(today.getHours() - 6);

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
