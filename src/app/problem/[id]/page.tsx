import { PROBLEMS } from '@/constants/mockup';
import ProblemInfo from './_components/ProblemInfo';

function Problem({ params: { id } }: { params: { id: string } }) {
  const { name, is_solved, is_starred, boj_id, level, stars } = PROBLEMS[0];
  console.log(id);
  return (
    <div>
      <ProblemInfo title={name} isSolved={is_solved ? 'AC' : null} level={level} number={boj_id} stars={stars} isStar={is_starred} />
    </div>
  );
}

export default Problem;
