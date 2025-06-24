import ProblemCard from "@/components/Card/ProblemCard";
import React from "react";
import { ProblemSchema, SolutionSchema } from "../../../types/models/data-contracts";

interface Props {
  data: ProblemSchema[] | SolutionSchema[];
  type: "problem" | "solution";
}

function CardList({ type, data }: Props) {
  return (
    <div className="grid grid-cols-3 gap-5">
      {type === "problem" &&
        (data as ProblemSchema[]).map(({ oj_type, oj_id, id, is_solved, is_starred, name, stars, solutions, level }) => (
          <ProblemCard
            key={id}
            customStyle=" w-full"
            ojId={oj_id}
            problemId={id}
            stars={stars}
            title={name}
            isStar={is_starred ?? false}
            isSolved={is_solved ?? false}
            solNum={solutions}
            level={level}
            ojType={oj_type}
          />
        ))}
      {type === "solution" &&
        (data as SolutionSchema[]).map(({ id, problem, is_correct_answer, score_label, source_lang }) => (
          <ProblemCard
            key={id}
            type="solution"
            ojId={problem.oj_id}
            ojType={problem.oj_type}
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
