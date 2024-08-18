import dayjs from 'dayjs';
import { cookies } from 'next/headers';
import HomeLock from '../Lock/HomeLock';
import ProblemCard from '../Card/ProblemCard';
import { GetProblemsRes, Problem } from '@/types/api/problem';

async function TodaySection() {
  let today = new Date();
  today.setHours(today.getHours() - 6);
  let bojDay = dayjs(today).format('YYYY-MM-DD');
  const cookie = cookies();

  const getTodayProblems = async () => {
    try {
      const res = await fetch(`https://${process.env.NEXT_PUBLIC_API_BASE_URL}/api/problems?submitted_at=${bojDay}`, {
        headers: { Cookie: cookie.toString() || '' },
        cache: 'no-store',
      });
      console.log(res);
      if (res.ok) return await res.json();
      else throw Error();
    } catch (err) {
      return null;
    }
  };

  const problems = (await getTodayProblems()) as GetProblemsRes | null;

  return (
    <>
      {problems ? (
        problems.count === 0 ? (
          <div className="h-[177px] flex items-center justify-center">오늘 풀어진 문제가 없어요😓</div>
        ) : (
          <div className="flex flex-nowrap overflow-x-scroll gap-3 scroll-hidden">
            {problems.results.map(({ boj_id, id, is_starred, name, stars }: Problem) => (
              <ProblemCard key={id} id={id} bojId={boj_id} stars={stars} title={name} isStar={is_starred} />
            ))}
          </div>
        )
      ) : (
        <HomeLock type="today" />
      )}
    </>
  );
}

export default TodaySection;
