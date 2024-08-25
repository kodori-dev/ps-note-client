'use client';

interface Props {
  id: number;
  name: string;
  bojId: string;
  weekSolved: number;
  todaySolve?: string;
  fine: number;
}

const PROGRESS_COLOR = ['bg-progress-blue', 'bg-progress-pink', 'bg-progress-yellow', 'bg-progress-purple', 'bg-progress-green'];
const PROGRESS_SIZE = {
  1: 'w-1/5',
  2: 'w-2/5',
  3: 'w-3/5',
  4: 'w-4/5',
};

/**
 * @param weekSolved 이번 주 등록한 solution 수
 * @param todaySolve 오늘 등록한 solution의 title || 면제 티켓 || noSolve
 */
function MemberCard({ id, name, bojId, weekSolved, todaySolve = '', fine }: Props) {
  const progressStyle = [PROGRESS_COLOR[id % 5], weekSolved >= 5 ? `w-full` : PROGRESS_SIZE[weekSolved as 1 | 2 | 3 | 4]].join(' ');

  return (
    <div className="relative overflow-hidden w-[276px] h-[276px] shrink-0 bg-white border border-gray-4 rounded-lg flex flex-col justify-between pt-6 px-6">
      <div className="flex flex-col">
        <p className="text-48 font-700">{name}</p>
        <p className="text-gray-2">@{bojId}</p>
      </div>
      <div className="absolute left-0 bottom-0 w-[276px] h-[76px] bg-gray-100">
        <div className={'absolute left-0 bottom-0 z-star h-[76px] ' + progressStyle}></div>
        <p className="absolute top-3 left-2 text-14 z-menu">{todaySolve || '오늘 문제를 풀지 않았어요 😓'}</p>
        <p className="absolute top-8 left-2 text-12 z-menu text-gray-2">💸 {fine >= 0 ? fine.toLocaleString('kr') : '계산 실패'}</p>
      </div>
    </div>
  );
}

export default MemberCard;
