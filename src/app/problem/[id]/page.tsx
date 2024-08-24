import ProblemInfo from './_components/ProblemInfo';
import SolutionList from './_components/SolutionList';
import { cookies } from 'next/headers';
import { GetProblemRes } from '@/types/api/problem';
import { GetSolsRes } from '@/types/api/solution';

async function Problem({ params: { id } }: { params: { id: string } }) {
  const cookie = cookies();

  const getData = async (url: string) => {
    try {
      const res = await fetch(`http://${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
        headers: { Cookie: cookie.toString() || '' },
      });
      if (res.ok) return await res.json();
      throw Error();
    } catch (err) {
      return null;
    }
  };

  const problem = (await getData(`/api/problems/${id}`)) as GetProblemRes | null;
  const solutions = (await getData(`/api/solutions?order_by=-submitted_at&problem_id=${id}`)) as GetSolsRes | null;

  return (
    <div className="flex flex-col gap-16">
      {problem && (
        <ProblemInfo
          title={problem.name}
          isSolved={problem.is_solved ? 'AC' : null}
          level={problem.level}
          number={problem.boj_id}
          stars={problem.stars}
          isStar={problem.is_starred}
          tags={problem.tags}
        />
      )}
      {problem === null && '문제 정보를 불러오지 못하였습니다.'}
      {solutions && solutions.count > 0 ? <SolutionList solutions={solutions.results} /> : '등록된 솔루션이 없습니다.'}
    </div>
  );
}

export default Problem;
