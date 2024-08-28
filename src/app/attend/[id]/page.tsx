import { getServerData } from '@/utils/getServerData';
import TodaySection from './_component/TodaySection';
import WeekSection from './_component/WeekSection';
import { TODAY_PENALTY } from '@/constants/mockup';
import { GetPenaltiesRes, PenaltyType } from '@/types/api/penalty';
import AllTodaySection from './_component/AllTodaySection';

async function Attend({ params: { id } }: { params: { id: string } }) {
  /**
   * 필요 데이터
   * - 전 멤버 & 오늘 페널티 (server)
   * - 특정 멤버 & 오늘 페널티 (server)
   * - 특정 멤버 & 선택 주 페널티 (client)
   */

  // const todayPenalty = await getServerData('/api/penalties', {})
  const todayMemberData = TODAY_PENALTY[10] as PenaltyType; //특정 멤버 & 오늘
  const todayPenaltyData = TODAY_PENALTY as GetPenaltiesRes; //전 멤버 & 오늘
  const calcPassMemCnt = (data: PenaltyType[]) => {
    let attendCnt = 0;
    for (const mem of data) {
      if (mem.is_penalty) continue;
      attendCnt++;
    }
    return attendCnt;
  };

  return (
    <>
      <div className="flex flex-col gap-9">
        <h1 className="text-48">
          <span className="font-700">{todayMemberData.member.nickname}</span> 님의 출석 현황
        </h1>
        <div className="flex gap-8">
          <AllTodaySection
            today={todayMemberData.day}
            all={todayPenaltyData.length}
            todayAttendNum={calcPassMemCnt(todayPenaltyData)}
            attend={todayMemberData.coupons.length > 0 ? 'coupon' : todayMemberData.is_penalty ? 'notYet' : 'already'}
            nickname={todayMemberData.member.nickname}
          />
          <TodaySection data={todayMemberData.admitted_solutions.concat(todayMemberData.not_admitted_solutions)} />
        </div>
      </div>
      {/* <WeekSection /> */}
    </>
  );
}

export default Attend;
