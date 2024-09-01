'use client';

import { SolutionType } from '@/types/api/solution';
import Link from 'next/link';

interface Props {
  id: number;
  name: string;
  bojId: string;
  weekSolved: number;
  todaySolve?: SolutionType[];
  fine: number;
  isActive?: boolean;
  isCoupon?: boolean;
  isRest?: boolean;
}

const PROGRESS_COLOR = ['bg-progress-blue', 'bg-progress-pink', 'bg-progress-yellow', 'bg-progress-purple', 'bg-progress-green'];
const PROGRESS_SIZE = {
  0: 'w-0',
  1: 'w-1/5',
  2: 'w-2/5',
  3: 'w-3/5',
  4: 'w-4/5',
};

/**
 * @param weekSolved 이번 주 등록한 solution 수
 * @param todaySolve 오늘 등록한 solution의 title || 면제 티켓 || noSolve
 */
function MemberCard({ id, name, bojId, weekSolved, todaySolve = [], fine, isActive = true, isCoupon = false, isRest = false }: Props) {
  const progressStyle = [PROGRESS_COLOR[id % 5], weekSolved >= 5 ? `w-full` : PROGRESS_SIZE[weekSolved as 0 | 1 | 2 | 3 | 4]].join(' ');

  return (
    <div
      className={[
        'up-card hover:cursor-pointer relative overflow-hidden w-[298px] h-[298px] shrink-0 bg-white border border-gray-4 rounded-lg flex flex-col justify-between pt-6 px-6',
        isActive ? '' : 'opacity-20',
      ].join(' ')}
      tabIndex={0}
      onClick={() => (window.location.href = `/attend/${id}`)}
    >
      <div className="flex flex-col">
        <p className="text-48 font-700">{name}</p>
        <Link href={`https://www.acmicpc.net/user/${bojId}`} className="text-gray-3 hover:border-b hover:text-gray-1 border-gray-1 w-fit">
          @{bojId}
        </Link>
        {isRest && <p className="text-12 text-gray-1 mt-1 bg-black/10 rounded-md px-2 w-fit">잠시 쉬어 가는 중..💤</p>}
      </div>
      <div className="absolute left-0 bottom-0 w-[298px] h-[88px] bg-gray-100">
        <div className={'absolute left-0 bottom-0 z-star h-[88px] ' + progressStyle}></div>
        <div className="absolute top-3 left-2 text-14 z-menu flex gap-[2px] items-center">
          {todaySolve.length > 0 ? (
            <>
              <Link
                className="font-700 hover:border-b border-b-black max-w-[190px] truncate inline-block"
                href={`/problem/${todaySolve[0].problem.id}`}
                onClick={(e) => e.stopPropagation()}
              >
                {todaySolve[0].problem.name}
              </Link>
              <span className="text-12 text-gray-2 font-400"> 말고 무려 {todaySolve.length - 1}개!</span>
            </>
          ) : (
            <p className="text-gray-1">{isCoupon ? '🎟️ 면제 티켓 사용' : '오늘 문제를 풀지 않았어요 😓'}</p>
          )}
        </div>
        <p className="absolute top-8 left-2 text-12 z-menu text-gray-2">💸 {fine >= 0 ? fine.toLocaleString('kr') : '계산 실패'}</p>
      </div>
    </div>
  );
}

export default MemberCard;
