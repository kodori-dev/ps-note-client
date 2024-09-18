import { getServerData } from '@/utils/getServerData';
import UserInfoSection from './_component/UserInfoSection';
import MetaTag from '@/components/MetaTag';
import MySolutionSection from './_component/MySolutionSection';
import { GetType } from '@/types/api/get';

async function Mypage() {
  const user = (await getServerData('/me')) as GetType['/me']['res'];
  const solutions = (await getServerData('/solutions', { member_id: user.id, ordering: ['-submitted_at'], size: 3 })) as GetType['/solutions']['res'];

  return (
    <div className="flex flex-col gap-9">
      <MetaTag title="마이페이지" description="내 계정 정보를 확인하고, 수정할 수 있습니다." />
      <UserInfoSection userData={user} />
      <MySolutionSection solutionsData={solutions.items} />
    </div>
  );
}

export default Mypage;
