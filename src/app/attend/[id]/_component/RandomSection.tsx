import ProblemCard from '@/components/Card/ProblemCard';
import { PROBLEMS } from '@/constants/mockup';

interface Props {
  randomNum: number;
}

function RandomSection({ randomNum }: Props) {
  const data = PROBLEMS[0];
  return (
    <article className="flex flex-col gap-3 w-[559px]">
      <h2 className="text-32">
        <span className="font-700">오늘의 추천</span> 문제
      </h2>
      <ProblemCard
        bojId={data.boj_id}
        isSolved={data.is_solved}
        problemId={data.id}
        stars={data.stars}
        title={data.name}
        isStar={data.is_starred}
        solNum={data.solutions}
      />
    </article>
  );
}

export default RandomSection;
