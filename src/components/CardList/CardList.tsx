import ProblemCard from '@/components/Card/ProblemCard';
import { ProblemType } from '@/types/api/problem';
import { SolutionType } from '@/types/api/solution';
import React from 'react';

interface Props {
  data: ProblemType[] | SolutionType[];
  type: 'problem' | 'solution';
}

function CardList({ type, data }: Props) {
  return (
    <div className="grid grid-cols-3 gap-5">
      {type === 'problem' &&
        (data as ProblemType[]).map(({ boj_id, id, is_solved, is_starred, name, stars, solutions, level }) => (
          <ProblemCard
            key={id}
            customStyle=" w-full"
            bojId={boj_id}
            problemId={id}
            stars={stars}
            title={name}
            isStar={is_starred}
            isSolved={is_solved}
            solNum={solutions}
            level={level}
          />
        ))}
      {type === 'solution' &&
        (data as SolutionType[]).map(({ id, problem, is_correct_answer, score_label, source_lang }) => (
          <ProblemCard
            key={id}
            type="solution"
            bojId={problem.boj_id}
            isSolved={problem.is_solved}
            level={problem.level}
            problemId={problem.id}
            stars={problem.stars}
            title={problem.name}
            isCorrectAnswer={is_correct_answer}
            solutionId={id}
            isStar={problem.is_starred}
            resultLabel={score_label}
            solLang={source_lang}
            customStyle=" w-full"
          />
        ))}
    </div>
  );
}

export default CardList;
