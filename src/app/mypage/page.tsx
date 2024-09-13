import { getServerData } from '@/utils/getServerData';
import UserInfoSection from './_component/UserInfoSection';
import MetaTag from '@/components/MetaTag';
import { UserType } from '@/types/api/auth';
import { GetSolsRes } from '@/types/api/solution';
import MySolutionSection from './_component/MySolutionSection';

async function Mypage() {
  const user = (await getServerData('/me')) as UserType;
  const solutions = (await getServerData('/solutions', { member_id: user.id, order_by: '-submitted_at', page_size: 3 })) as GetSolsRes;

  return (
    <div className="flex flex-col gap-9">
      <MetaTag title="마이페이지" description="내 계정 정보를 확인하고, 수정할 수 있습니다." />
      <UserInfoSection userData={user} />
      <MySolutionSection solutionsData={solutions.results} />
    </div>
  );
}

export default Mypage;
