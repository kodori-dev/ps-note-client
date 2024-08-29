import { getServerData } from '@/utils/getServerData';
import TodaySection from './_component/TodaySection';
import WeekSection from './_component/WeekSection';
import { HOLIDAY, TODAY_PENALTY } from '@/constants/mockup';
import { GetPenaltiesRes, PenaltyType } from '@/types/api/penalty';
import AllTodaySection from './_component/AllTodaySection';
import RandomSection from './_component/RandomSection';
import { UserType } from '@/types/api/auth';
import { GetHolidayRes } from '@/types/api/holiday';

const ALL_BOJ_PROBLEM = 31200;

async function Attend({ params: { id } }: { params: { id: string } }) {
  const today = new Date();
  const member = (await getServerData(`/api/members/${id}`)) as UserType;
  const holidays = (await getServerData('/api/holidays', { year: today.getFullYear() })) as GetHolidayRes;
  // const todayMemberData = TODAY_PENALTY[10] as PenaltyType; //특정 멤버 & 오늘
  // const todayPenaltyData = TODAY_PENALTY as GetPenaltiesRes; //전 멤버 & 오늘
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
          <span className="font-700">{member.nickname}</span> 님의 출석 현황
        </h1>
        {/* <section className="flex gap-8">
          <AllTodaySection
            today={todayMemberData.day}
            all={todayPenaltyData.length}
            todayAttendNum={calcPassMemCnt(todayPenaltyData)}
            attend={todayMemberData.coupons.length > 0 ? 'coupon' : todayMemberData.is_penalty ? 'notYet' : 'already'}
            nickname={todayMemberData.member.nickname}
          />
          <div className="flex flex-col justify-between">
            <TodaySection data={todayMemberData.admitted_solutions.concat(todayMemberData.not_admitted_solutions)} />
            <RandomSection randomNum={12345 % ALL_BOJ_PROBLEM} />
          </div>
        </section> */}
        <section>
          <WeekSection holidayData={holidays} memberId={Number(id)} />
        </section>
      </div>
    </>
  );
}

export default Attend;
