import { getServerData } from '@/utils/getServerData';
import UserInfoSection from './_component/UserInfoSection';
import MetaTag from '@/components/MetaTag';

async function Mypage() {
  const user = await getServerData('/me');

  return (
    <>
      <MetaTag title="마이페이지" description="내 계정 정보를 확인하고, 수정할 수 있습니다." />
      <UserInfoSection userData={user} />
    </>
  );
}

export default Mypage;
