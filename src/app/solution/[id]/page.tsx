import { SOLUTIONS } from '@/constants/mockup';
import ProblemSection from './_components/ProblemSection';
import InfoSection from './_components/InfoSection';
import { SolutionType } from '@/types/api/solution';
import BodySection from './_components/BodySection';

function Solution({ params: { id } }: { params: { id: string } }) {
  const data = SOLUTIONS[1] as SolutionType;
  return (
    <main className="flex flex-col gap-8">
      <ProblemSection
        problemId={data.problem.id}
        title={data.problem.name}
        number={data.problem.boj_id}
        isCorrectAnswer={data.is_correct_answer}
        answerLabel={data.score_label}
      />
      <InfoSection
        nickname={data.member.nickname}
        sourceLang={data.source_lang}
        isVerified={data.is_boj_verified}
        solutionId={data.boj_solution_id}
        submittedAt={data.submitted_at}
      />
      <BodySection language={data.source_lang} code={data.source_code} comment={data.comment} />
    </main>
  );
}

export default Solution;
