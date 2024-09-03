import Link from 'next/link';
import StarButton from '../Button/StarButton';
import Chip from '../Chip';
import SolutionIcon from '../../../public/icon-card-sol.svg';
import LanguageIcon from '../../../public/icon-card-lang.svg';
import { LanguageType } from '@/types/api/solution';
import LevelChip from '../Chip/LevelChip';
import { LevelType } from '@/types/api/problem';

interface Props {
  type?: 'problem' | 'solution';
  problemId: number;
  solutionId?: number;
  bojId: string;
  title: string;
  isSolved: boolean;
  stars: number;
  isStar?: boolean;
  solNum?: number;
  solLang?: LanguageType;
  customStyle?: string;
  isCorrectAnswer?: boolean;
  resultLabel?: string;
  level: string;
}

function ProblemCard({
  type = 'problem',
  solNum = 0,
  problemId,
  bojId,
  title,
  level,
  isSolved = false,
  stars,
  isStar = false,
  customStyle,
  solLang = 'c++',
  isCorrectAnswer = false,
  resultLabel,
  solutionId,
}: Props) {
  const DETAIL_INFO = {
    problem: (
      <>
        <SolutionIcon fill="#ACACAC" />
        {solNum > 999 ? '999+' : solNum}
      </>
    ),
    solution: (
      <>
        <LanguageIcon fill="#ACACAC" />
        {solLang}
      </>
    ),
  };

  return (
    <div
      className={
        'group hover:shadow-lg hover:border-primary relative shrink-0 w-[296px] h-[177px] px-3 py-5 flex flex-col justify-between bg-white rounded-sm border border-gray-4' +
        customStyle
      }
    >
      <Link href={type === 'problem' ? `/problem/${problemId}` : `/solution/${solutionId}`} className="absolute inset-0 z-menu" />
      <StarButton problemId={problemId} isStar={isStar} stars={stars} isSolve={isSolved} />
      <div className="flex flex-col gap-2">
        <div className="text-black flex gap-2 items-center">
          {bojId}
          {type === 'problem' && isSolved && <Chip type={'AC'} />}
          {type === 'solution' && <Chip type={isCorrectAnswer ? 'AC' : 'WA'}>{resultLabel}</Chip>}
        </div>
        <p className="text-24 font-700 truncate group-hover:text-primary">{title}</p>
        <div className="flex gap-1 items-center text-12 text-gray-3">{DETAIL_INFO[type]}</div>
        <LevelChip style="mini" type={level.split('_')[0] as LevelType} step={Number(level.split('_')[1]) as 1 | 2 | 3 | 4 | 5} />
      </div>
      {type === 'problem' && (
        <Link href={`https://www.acmicpc.net/problem/${bojId}`} className="text-12 text-gray-3 text-right hover:text-gray-1 z-10">
          BOJ 바로가기
        </Link>
      )}
    </div>
  );
}

export default ProblemCard;
