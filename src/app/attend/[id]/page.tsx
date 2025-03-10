import { getServerData } from "@/utils/getServerData";
import MetaTag from "@/components/MetaTag";
import MonthlySection from "./_component/MonthlySection";
import dayjs from "dayjs";
import { headers } from "next/headers";

async function Attend({ params: { id } }: { params: { id: string } }) {
  const today = new Date();
  const year = headers().get("x-attend-yy") || `${today.getFullYear()}`;
  const month = headers().get("x-attend-mm") || `${today.getMonth() + 1}`;

  const member = await getServerData(`/members/${id}`);
  const holidays = await getServerData("/holidays", { year: Number(year) });

  const startDay = new Date(Number(year), Number(month) - 1, 1);
  const lastDay = new Date(Number(year), Number(month), 0);

  const penalties = await getServerData("/penalties", { start_date: dayjs(startDay).format("YYYY-MM-DD"), end_date: dayjs(lastDay).format("YYYY-MM-DD"), member_id: member.id });
  const vacations = await getServerData("/vacations", { start_date: dayjs(startDay).format("YYYY-MM-DD"), end_date: dayjs(lastDay).format("YYYY-MM-DD") });

  return (
    <>
      <MetaTag
        title={`${member?.nickname}의 꼬박꼬박 일지`}
        description={`${member?.nickname}님의 출석 세부 현황을 확인할 수 있는 페이지입니다. 일주일 간 등록한 솔루션 목록을 조회할 수 있어요.`}
      />
      <h1 className="text-36 my-12 mobile:text-24 mobile:my-6">
        <span className="font-700">{member?.nickname}</span> 님의 꼬박꼬박 PS일지
      </h1>

      <MonthlySection initialDate={lastDay} data={penalties} holidays={holidays} vacations={vacations} />
    </>
  );
}

export default Attend;
