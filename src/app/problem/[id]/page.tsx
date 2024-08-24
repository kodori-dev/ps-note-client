import { PROBLEMS, SOLUTIONS } from '@/constants/mockup';
import ProblemInfo from './_components/ProblemInfo';
import SolutionList from './_components/SolutionList';

function Problem({ params: { id } }: { params: { id: string } }) {
  const { name, is_solved, is_starred, boj_id, level, stars } = PROBLEMS[0];

  return (
    <div className="flex flex-col gap-16">
      <ProblemInfo title={name} isSolved={is_solved ? 'AC' : null} level={level} number={boj_id} stars={stars} isStar={is_starred} />
      <SolutionList solutions={SOLUTIONS} />
    </div>
  );
}

export default Problem;
