import ProblemInfo from './_components/ProblemInfo';
import SolutionList from './_components/SolutionList';
import MetaTag from '@/components/MetaTag';
import { getServerData } from '@/utils/getServerData';

async function Problem({ params: { id } }: { params: { id: string } }) {
  const problem = await getServerData(`/problems/${id}` as `/problems/${number}`);
  const solutions = await getServerData(`/solutions`, { problem_id: Number(id), ordering: ['-submitted_at'] });

  return (
    <>
      <MetaTag title={`[ ${problem?.name} ] 솔루션 리스트`} description={`${problem?.name} 문제에 등록된 솔루션을 한 곳에서 확인하세요.`} />
      <div className="flex flex-col gap-16">
        {problem && (
          <ProblemInfo
            id={problem.id}
            title={problem.name}
            isSolved={problem.is_solved ? 'AC' : null}
            level={problem.level}
            number={problem.boj_id}
            stars={problem.stars}
            isStar={problem.is_starred ?? false}
            tags={problem.tags}
          />
        )}
        {problem === null && '문제 정보를 불러오지 못하였습니다.'}
        {solutions && solutions.count > 0 ? <SolutionList solutions={solutions.items} /> : '등록된 솔루션이 없습니다.'}
      </div>
    </>
  );
}

export default Problem;
