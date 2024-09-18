import ProblemCard from '@/components/Card/ProblemCard';
import React from 'react';
import { ProblemSchema, SolutionSchema } from '../../../models';

interface Props {
  data: ProblemSchema[] | SolutionSchema[];
  type: 'problem' | 'solution';
}

function CardList({ type, data }: Props) {
  return (
    <div className="grid grid-cols-3 gap-5">
      {type === 'problem' &&
        (data as ProblemSchema[]).map(({ boj_id, id, is_solved, is_starred, name, stars, solutions, level }) => (
          <ProblemCard
            key={id}
            customStyle=" w-full"
            bojId={boj_id}
            problemId={id}
            stars={stars}
            title={name}
            isStar={is_starred ?? false}
            isSolved={is_solved ?? false}
            solNum={solutions}
            level={level}
          />
        ))}
      {type === 'solution' &&
        (data as SolutionSchema[]).map(({ id, problem, is_correct_answer, score_label, source_lang }) => (
          <ProblemCard
            key={id}
            type="solution"
            bojId={problem.boj_id}
            isSolved={problem.is_solved ?? false}
            level={problem.level}
            problemId={problem.id}
            stars={problem.stars}
            title={problem.name}
            isCorrectAnswer={is_correct_answer}
            solutionId={id}
            isStar={problem.is_starred ?? false}
            resultLabel={score_label}
            solLang={source_lang}
            customStyle=" w-full"
          />
        ))}
    </div>
  );
}

export default CardList;
