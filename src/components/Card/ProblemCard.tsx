import Link from 'next/link';
import NoStarIcon from '../../../public/icon-star-f.svg';
import StarIcon from '../../../public/icon-star-t.svg';
import Chip from '../Chip';

interface Props {
  id: number;
  bojId: string;
  title: string;
  state?: 'AC' | 'WA' | null;
  stars: number;
  isStar?: boolean;
}

function ProblemCard({ id, bojId, title, state = null, stars, isStar = false }: Props) {
  return (
    <div className="relative w-[312px] h-[177px] px-3 py-5 flex flex-col justify-between bg-white rounded-sm border border-gray-4">
      <div className="absolute top-2 right-2 flex flex-col items-center hover:cursor-pointer">
        {isStar ? <StarIcon /> : <NoStarIcon />}
        <p className="text-12 text-gray-3">{stars}</p>
      </div>
      <div className="flex flex-col gap-2">
        {bojId}
        <p className="text-24 font-700 truncate">{title}</p>
        <Chip type={'AC'} />
      </div>
      <Link href={`https://www.acmicpc.net/problem/${bojId}`} className="text-12 text-gray-3 text-right hover:text-gray-1">
        BOJ 바로가기
      </Link>
    </div>
  );
}

export default ProblemCard;
