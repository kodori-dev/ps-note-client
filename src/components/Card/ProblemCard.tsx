'use client';
import Link from 'next/link';
import StarButton from '../Button/StarButton';
import Chip from '../Chip';
import { Tooltip } from '@chakra-ui/react';

interface Props {
  id: number;
  bojId: string;
  title: string;
  state?: boolean;
  stars: number;
  isStar?: boolean;
  customStyle?: string;
}

function ProblemCard({ id, bojId, title, state = false, stars, isStar = false, customStyle }: Props) {
  return (
    <div
      className={
        'group hover:shadow-lg hover:border-primary relative shrink-0 w-[296px] h-[177px] px-3 py-5 flex flex-col justify-between bg-white rounded-sm border border-gray-4' +
        customStyle
      }
    >
      <Link href={`/problem/${id}`} className="absolute inset-0 z-menu" />
      <StarButton problemId={id} isStar={isStar} stars={stars} isSolve={state} />
      <div className="flex flex-col gap-2">
        <p className="text-black">{bojId}</p>
        <p className="text-24 font-700 truncate group-hover:text-primary">{title}</p>
        {state && <Chip type={'AC'} />}
      </div>
      <Link href={`https://www.acmicpc.net/problem/${bojId}`} className="text-12 text-gray-3 text-right hover:text-gray-1 z-10">
        BOJ 바로가기
      </Link>
    </div>
  );
}

export default ProblemCard;
