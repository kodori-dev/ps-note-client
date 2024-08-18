'use client';
import Link from 'next/link';
import Chip from '../Chip';
import StarButton from '../Button/StarButton';

interface Props {
  id: number;
  bojId: string;
  title: string;
  state?: boolean;
  stars: number;
  isStar?: boolean;
}

function ProblemCard({ id, bojId, title, state = false, stars, isStar = false }: Props) {
  return (
    <div className="relative shrink-0 w-[296px] h-[177px] px-3 py-5 flex flex-col justify-between bg-white rounded-sm border border-gray-4">
      <StarButton isStar={isStar} stars={stars} />
      <div className="flex flex-col gap-2">
        {bojId}
        <p className="text-24 font-700 truncate">{title}</p>
        {state && <Chip type={'AC'} />}
      </div>
      <Link href={`https://www.acmicpc.net/problem/${bojId}`} className="text-12 text-gray-3 text-right hover:text-gray-1">
        BOJ 바로가기
      </Link>
    </div>
  );
}

export default ProblemCard;
