import TodaySection from './_component/TodaySection';
import WeekSection from './_component/WeekSection';

function Attend({ params: { id } }: { params: { id: string } }) {
  console.log(id);

  return (
    <>
      <div className="flex flex-col gap-2 border-b border-gray-4 py-9 px-5 mb-9">
        <h1 className="text-48">
          <span className="font-700">안희원</span> 님의 출석 현황
        </h1>
        <TodaySection />
      </div>
      <WeekSection />
    </>
  );
}

export default Attend;
