import { getServerData } from "@/utils/getServerData";
import MetaTag from "@/components/MetaTag";
import dayjs from "dayjs";
import { headers } from "next/headers";
import MonthlySection from "./_component/MonthlySection";
import dynamic from "next/dynamic";
import { GetType } from "@/types/api/get";
import CardSection from "./_component/CardSection";

const ViewTab = dynamic(() => import("./_component/ViewTab"), { ssr: false });

async function Attend({ params: { id } }: { params: { id: string } }) {
  const loginUser = (await getServerData("/me")) as GetType["/me"]["res"];

  //오늘 날짜 계산
  const today = new Date();
  const year = headers().get("x-attend-yy") || `${today.getFullYear()}`;
  const month = headers().get("x-attend-mm") || `${today.getMonth() + 1}`;

  //이번달 날짜 계산
  const startDay = new Date(Number(year), Number(month) - 1, 1);
  const lastDay = new Date(Number(year), Number(month), 0);

  const member = await getServerData(`/members/${id}`);
  const holidays = await getServerData("/holidays", { year: Number(year) });

  //출석 데이터 (calendar)
  const penalties = await getServerData("/penalties", { start_date: dayjs(startDay).format("YYYY-MM-DD"), end_date: dayjs(lastDay).format("YYYY-MM-DD"), member_id: member.id });
  const vacations = await getServerData("/vacations", { start_date: dayjs(startDay).format("YYYY-MM-DD"), end_date: dayjs(lastDay).format("YYYY-MM-DD") });

  //솔루션 데이터 (list)
  const solutions = await getServerData("/solutions", { page: 1, size: 1_000, member_id: member.id, start_date: dayjs(startDay).format("YYYY-MM-DD"), end_date: dayjs(lastDay).format("YYYY-MM-DD") , ordering: ["-submitted_at"] });

  let totalPenalty = 0;
  penalties.forEach((item) => {
    totalPenalty += Number(item.amount);
  });

  const CONTENT = {
    calendar: <MonthlySection memberId={id} initialDate={lastDay} data={penalties} holidays={holidays} vacations={loginUser.id != member.id ? undefined : vacations} />,
    card: <CardSection viewType="card" initData={solutions} memberId={member.id} />,
    list: <CardSection viewType="list" initData={solutions} memberId={member.id} />,
  };

  return (
    <>
      <MetaTag
        title={`${member?.nickname}의 꼬박꼬박 일지`}
        description={`${member?.nickname}님의 출석 세부 현황을 확인할 수 있는 페이지입니다. 일주일 간 등록한 솔루션 목록을 조회할 수 있어요.`}
      />
      <div className="my-10 mobile:my-6 flex flex-col gap-2">
        <h1 className="text-36 mobile:text-24 ">
          <span className="font-700">{member?.nickname}</span> 님의 꼬박꼬박 PS일지
        </h1>
        <p className="text-14 text-[#8B95A1]">출석현황과 지금까지 등록한 솔루션을 확인할 수 있어요.</p>
      </div>

      <ViewTab content={CONTENT} />
    </>
  );
}

export default Attend;
