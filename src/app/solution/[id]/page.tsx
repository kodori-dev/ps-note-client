import ProblemSection from './_components/ProblemSection';
import InfoSection from './_components/InfoSection';
import BodySection from './_components/BodySection';
import { getServerData } from '@/utils/getServerData';
import MetaTag from '@/components/MetaTag';
import { getUserSession } from '@/utils/getUserSession';
import EditSection from './_components/EditSection';
import dayjs from 'dayjs';

async function Solution({ params: { id } }: { params: { id: string } }) {
  const loginUser = await getUserSession();
  const data = await getServerData(`/solutions/${id}`);
  const isMySol = loginUser.userId === data.member.id;

  return (
    <>
      <MetaTag
        title={`[ ${data.problem.name} ] by ${data.member.nickname}`}
        description={`${data.member.nickname} 님이 등록한 ${data.problem.name} 문제 솔루션을 확인하세요.`}
      />
      <main className="flex flex-col gap-9">
        <ProblemSection
          problemId={data.problem.id}
          title={data.problem.name}
          number={data.problem.boj_id}
          isCorrectAnswer={data.is_correct_answer}
          answerLabel={data.score_label}
        />

        <InfoSection
          nickname={data.member.nickname ?? '(알수없음)'}
          sourceLang={data.source_lang}
          isVerified={data.is_boj_verified}
          solutionId={data.boj_solution_id}
          submittedAt={dayjs(data.submitted_at).format('YYYY-MM-DD')}
        />
        {isMySol && <EditSection solutionId={id} />}
        <BodySection language={data.source_lang} code={data.source_code} comment={data.comment} />
      </main>
    </>
  );
}

export default Solution;
