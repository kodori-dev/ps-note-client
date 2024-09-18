import { getServerData } from '@/utils/getServerData';
import WeekSection from './_component/WeekSection';
import MetaTag from '@/components/MetaTag';
import { MemberSchema, PenaltySchema } from '../../../../models';
import { GetType } from '@/types/api/get';

async function Attend({ params: { id } }: { params: { id: string } }) {
  const today = new Date();
  const member = (await getServerData(`/members/${id}`)) as GetType[`/members/${string}`]['res'];
  const holidays = (await getServerData('/holidays', { year: today.getFullYear() })) as GetType['/holidays']['res'];
  const calcPassMemCnt = (data: PenaltySchema[]) => {
    let attendCnt = 0;
    for (const mem of data) {
      if (mem.is_penalty) continue;
      attendCnt++;
    }
    return attendCnt;
  };

  return (
    <>
      <MetaTag
        title={`${member?.nickname}의 꼬박꼬박 일지`}
        description={`${member?.nickname}님의 출석 세부 현황을 확인할 수 있는 페이지입니다. 일주일 간 등록한 솔루션 목록을 조회할 수 있어요.`}
      />
      <div className="flex flex-col gap-9">
        <h1 className="text-48">
          <span className="font-700">{member?.nickname}</span> 님의 꼬박꼬박 PS일지
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
