import { getServerData } from '@/utils/getServerData';
import EditForm from './_components/EditForm';
import { PostFormType } from '@/types/input';
import { getUserSession } from '@/utils/getUserSession';
import { redirect } from 'next/navigation';
import { GetType } from '@/types/api/get';

async function SolutionEdit({ params: { id } }: { params: { id: string } }) {
  const loginUser = await getUserSession();
  const data = (await getServerData(`/solutions/${id}`)) as GetType[`/solutions/${string}`]['res'];

  const isMyPost = data ? loginUser.userId === data.member.id : false;
  if (!isMyPost) redirect('/404');

  const defaultInput: PostFormType = {
    boj_id: `${data.problem.boj_id} - ${data.problem.name}`,
    is_correct_answer: data.is_correct_answer ? 'AC' : 'WA',
    isStar: data.problem.is_starred ?? false,
    source_lang: data.source_lang,
    source_code: data.source_code,
    pid: String(data.problem.id),
    comment: data.comment,
  };

  return <>{isMyPost && <EditForm userId={loginUser.userId} defaultValue={defaultInput} solutionId={id} />}</>;
}

export default SolutionEdit;
