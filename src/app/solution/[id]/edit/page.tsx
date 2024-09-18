import { getServerData } from '@/utils/getServerData';
import EditForm from './_components/EditForm';
import { PostFormType } from '@/types/input';
import { getUserSession } from '@/utils/getUserSession';
import { redirect } from 'next/navigation';
import dayjs from 'dayjs';

async function SolutionEdit({ params: { id } }: { params: { id: string } }) {
  const loginUser = await getUserSession();
  const data = await getServerData(`/solutions/${id}`);

  const isMyPost = data ? loginUser.userId === data.member.id : false;
  if (!isMyPost) redirect('/404');

  const defaultInput: PostFormType = {
    submitted_at: dayjs(data.submitted_at).format('YYYY-MM-DD'),
    boj_id: `${data.problem.boj_id} - ${data.problem.name}`,
    is_correct_answer: data.is_correct_answer ? 'AC' : 'WA',
    isStar: data.problem.is_starred ?? false,
    source_lang: data.source_lang,
    source_code: data.source_code,
    pid: String(data.problem.id),
    comment: data.comment,
  };

  return <>{isMyPost && <EditForm defaultValue={defaultInput} solutionId={id} />}</>;
}

export default SolutionEdit;
