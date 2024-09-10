import { SolutionType } from '@/types/api/solution';
import { getServerData } from '@/utils/getServerData';
import EditForm from './_components/EditForm';
import { PostFormType } from '@/types/input';
import { getUserSession } from '@/utils/getUserSession';
import { redirect } from 'next/navigation';

async function SolutionEdit({ params: { id } }: { params: { id: string } }) {
  const loginUser = await getUserSession();
  const data = (await getServerData(`/solutions/${id}`)) as SolutionType;

  const isMyPost = loginUser.userId === data.member.id;
  if (!isMyPost) redirect('/404');

  const defaultInput: PostFormType = {
    boj_id: `${data.problem.boj_id} - ${data.problem.name}`,
    is_correct_answer: data.is_correct_answer ? 'AC' : 'WA',
    isStar: data.problem.is_starred,
    source_lang: data.source_lang,
    source_code: data.source_code,
    pid: String(data.problem.id),
    comment: data.comment,
  };

  return <>{isMyPost && <EditForm userId={loginUser.userId} defaultValue={defaultInput} solutionId={id} />}</>;
}

export default SolutionEdit;
