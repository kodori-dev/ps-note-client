import Chip from '@/components/Chip';
import LevelChip from '@/components/Chip/LevelChip';
import Link from 'next/link';
import GoodIcon from '../../../../../public/icon-problem-good.svg';
import LevelIcon from '../../../../../public/icon-problem-level.svg';
import ListIcon from '../../../../../public/icon-problem-list.svg';
import LinkIcon from '../../../../../public/icon-link-arrow.svg';
import Button from '@/components/Button';
import { ProblemTagSchema } from '../../../../../models';
import { LevelType } from '@/types/problem';

interface Props {
  id: number;
  number: string;
  isSolved?: 'AC' | 'WA' | null;
  title: string;
  level: string;
  isStar?: boolean;
  stars: number;
  tags: ProblemTagSchema[];
}

function ProblemInfo({ id, number, isSolved = null, title, level, isStar = false, stars, tags }: Props) {
  const INFO_GRID = [
    { icon: <GoodIcon fill="#ACACAC" />, head: '이 문제를 추천한 사람', body: <p className="text-20">{stars}</p> },
    {
      icon: <LevelIcon fill="#ACACAC" />,
      head: '난이도',
      body: <LevelChip type={level.split('_')[0] as LevelType} step={level === 'unrated' ? undefined : (Number(level.split('_')[1]) as 1 | 2 | 3 | 4 | 5)} />,
    },
    {
      icon: <ListIcon fill="#ACACAC" />,
      head: '문제 분류',
      body: (
        <div className="flex gap-2 flex-wrap justify-center w-[320px]">
          {tags.map(({ id, name }) => (
            <span key={id} className="py-1 px-2 bg-gray-4/60 rounded-sm">
              {name}
            </span>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="relative">
      <Link href={`/post?id=${id}&boj_id=${number} - ${title}`}>
        <Button heightSize="sm" roundSize="sm" customStyle="px-4 absolute top-0 right-0">
          이 문제 바로 체크인하기
        </Button>
      </Link>
      <div className="flex gap-5 items-center">
        <Link
          target="_blank"
          href={`https://www.acmicpc.net/problem/${number}`}
          className="group relative hover:text-black text-gray-2 text-24 border-b border-gray-3"
        >
          {number}
          <LinkIcon fill="#ACACAC" className="absolute top-[6px] -right-3" />
          <span className="hidden group-hover:inline-block text-12 absolute whitespace-nowrap -right-56 top-2 px-2 py-[2px] bg-black/30 text-white rounded-md">
            클릭해서 바로 이 문제를 풀어 보세요!
          </span>
        </Link>
        {isSolved && <Chip type={isSolved} />}
      </div>
      <h1 className="text-40 font-700 mt-2 mb-8">{title}</h1>
      <div className="grid grid-cols-3">
        {INFO_GRID.map(({ icon, head, body }) => (
          <div key={head} className="flex flex-col gap-2 items-center">
            {icon}
            <p className="text-gray-3">{head}</p>
            {body}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProblemInfo;
