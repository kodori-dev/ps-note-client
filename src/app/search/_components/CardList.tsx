import ProblemCard from '@/components/Card/ProblemCard';
import { ProblemType } from '@/types/api/problem';
import React from 'react';

interface Props {
  data: ProblemType[];
}

function CardList({ data }: Props) {
  return (
    <div className="grid grid-cols-3 gap-5">
      {data.map(({ boj_id, id, is_solved, is_starred, name, stars, solutions }) => (
        <ProblemCard
          customStyle=" w-[312px]"
          bojId={boj_id}
          problemId={id}
          stars={stars}
          title={name}
          isStar={is_starred}
          key={id}
          isSolved={is_solved}
          solNum={solutions}
        />
      ))}
    </div>
  );
}

export default CardList;
