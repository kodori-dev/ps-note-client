import dayjs from 'dayjs';
import { cookies } from 'next/headers';
import HomeLock from '../Lock/HomeLock';
import ProblemCard from '../Card/ProblemCard';
import { GetProblemsRes, Problem } from '@/types/api/problem';

interface Props {
  type: 'today' | 'recommended';
}

async function ProblemSection({ type }: Props) {
  let today = new Date();
  today.setHours(today.getHours() - 6);
  const bojDay = dayjs(today).format('YYYY-MM-DD');
  const cookie = cookies();

  const getProblems = async () => {
    try {
      const query = type === 'today' ? `submitted_at=${bojDay}` : `order_by=stars&page_size=10`;
      const res = await fetch(`http://${process.env.NEXT_PUBLIC_API_BASE_URL}/api/problems?${query}`, {
        headers: { Cookie: cookie.toString() || '' },
        cache: 'no-store',
      });
      if (res.ok) return await res.json();
      else throw Error();
    } catch (err) {
      return null;
    }
  };

  const problems = (await getProblems()) as GetProblemsRes | null;

  return (
    <>
      {problems ? (
        problems.count === 0 ? (
          <div className="h-[177px] flex items-center justify-center">오늘 풀어진 문제가 없어요😓</div>
        ) : (
          <div className="flex flex-nowrap overflow-x-scroll gap-3 scroll-hidden">
            {problems.results.map(({ boj_id, id, is_starred, name, stars, is_solved }: Problem) => (
              <ProblemCard key={id} id={id} bojId={boj_id} stars={stars} title={name} isStar={is_starred} state={is_solved} />
            ))}
          </div>
        )
      ) : (
        <HomeLock type="today" />
      )}
    </>
  );
}

export default ProblemSection;
