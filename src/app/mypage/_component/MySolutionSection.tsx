'use client';

import ProblemCard from '@/components/Card/ProblemCard';
import Link from 'next/link';
import { SolutionSchema } from '../../../../models';
import { useStore } from '@/store';

interface Props {
  solutionsData: SolutionSchema[];
}

function MySolutionSection({ solutionsData }: Props) {
  const { isEdit } = useStore((state) => ({ isEdit: state.isInfoEdit }));
  return (
    <>
      {!isEdit && (
        <div className="flex flex-col gap-4">
          <div className="flex gap-6 items-center">
            <h3 className="text-32">
              내가 <span className="font-700">제출</span>한 솔루션
            </h3>
            <Link href={`/mypage/solutions?page=1`} className="text-gray-2 text-12">
              더보기
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {solutionsData.length > 0 ? (
              solutionsData.map(({ id, problem, is_correct_answer, score_label }) => (
                <ProblemCard
                  key={id}
                  type="solution"
                  bojId={problem.boj_id}
                  isSolved={problem.is_solved ?? false}
                  level={problem.level}
                  problemId={problem.id}
                  stars={problem.stars}
                  title={problem.name}
                  isCorrectAnswer={is_correct_answer}
                  solutionId={id}
                  isStar={problem.is_starred ?? false}
                  resultLabel={score_label}
                  customStyle=" w-full"
                />
              ))
            ) : (
              <div>제출한 솔루션이 없어요 🥲</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default MySolutionSection;
