import ProblemCard from '@/components/Card/ProblemCard';
import { SolutionType } from '@/types/api/solution';

interface Props {
  data: SolutionType[];
}

function TodaySection({ data }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-32">
        <span className="font-700">오늘 제출</span>한 솔루션
      </h2>
      <div className="flex flex-nowrap w-[559px] gap-3 overflow-x-scroll scroll-hidden">
        {data.map(({ problem, is_correct_answer, score_label, source_lang, id }) => (
          <ProblemCard
            key={id}
            type="solution"
            bojId={problem.boj_id}
            problemId={problem.id}
            title={problem.name}
            isStar={problem.is_starred}
            stars={problem.stars}
            isCorrectAnswer={is_correct_answer}
            resultLabel={score_label}
            isSolved
            solLang={source_lang}
          />
        ))}
      </div>
    </div>
  );
}

export default TodaySection;
