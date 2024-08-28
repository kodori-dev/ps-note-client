import ProblemCard from '@/components/Card/ProblemCard';
import { SolutionType } from '@/types/api/solution';

interface Props {
  data?: SolutionType[];
}

function TodaySection({ data }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-32">오늘 제출한 솔루션</h2>
      <div>카드리스트</div>
    </div>
  );
}

export default TodaySection;
