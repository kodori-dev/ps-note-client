import ProblemCard from '@/components/Card/ProblemCard';
import { Problem } from '@/types/api/problem';
import React from 'react';

interface Props {
  data: Problem[];
}

function CardList({ data }: Props) {
  return (
    <div className="grid grid-cols-3 gap-5">
      {data.map(({ boj_id, id, is_solved, is_starred, name, stars }) => (
        <ProblemCard customStyle=" w-[312px]" bojId={boj_id} id={id} stars={stars} title={name} isStar={is_starred} key={id} state={is_solved} />
      ))}
    </div>
  );
}

export default CardList;
