interface Props {
  id: number;
  name: string;
  bojId: string;
  weekSolved?: number;
  todaySolve?: string;
  fine?: number;
}

const PROGRESS_COLOR = ['bg-progress-blue', 'bg-progress-pink', 'bg-progress-yellow', 'bg-progress-purple', 'bg-progress-green'];

/**
 * @param weekSolved 이번 주 등록한 solution 수
 * @param todaySolve 오늘 등록한 solution의 title || 면제 티켓 || noSolve
 */
function MemberCard({ id, name, bojId, weekSolved = 4, todaySolve = '쿠키의 신체 측정', fine = 5000 }: Props) {
  const progressStyle = PROGRESS_COLOR[id % 5] + (weekSolved >= 5 ? ` w-full` : ` w-${weekSolved}/5`);
  return (
    <div className="relative overflow-hidden w-[276px] h-[276px] shrink-0 bg-white border border-gray-4 rounded-lg flex flex-col justify-between pt-6 px-6">
      <div className="flex flex-col">
        <p className="text-48 font-700">{name}</p>
        <p className="text-gray-2">@{bojId}</p>
      </div>
      <div className="absolute left-0 bottom-0 w-[276px] h-[76px] bg-gray-100">
        <div className={'absolute left-0 bottom-0 z-star h-[76px] ' + progressStyle}></div>
        <p className="absolute top-3 left-2 text-14 z-menu">{todaySolve}</p>
        <p className="absolute top-8 left-2 text-12 z-menu text-gray-2">💸 {fine.toLocaleString('kr')}</p>
      </div>
    </div>
  );
}

export default MemberCard;
