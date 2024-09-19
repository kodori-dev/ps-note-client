import { getBojTime } from '@/utils/getBojTime';
import { getUserSession } from '@/utils/getUserSession';
import AttendList from './_component/AttendList';
import { redirect } from 'next/navigation';
import { AdminPageRes } from '@/types/api/admin';

async function Admin() {
  const session = await getUserSession();
  const memberId = session.isLogin ? session.userId : undefined;
  if (!memberId) redirect('/login');

  const bojDay = getBojTime();
  const getAdminData = async () => {
    try {
      const res = await fetch(`http://${process.env.NEXT_PUBLIC_SERVER_URL}/api-internal/v2/admin-page?day=2024-09-05`, {
        headers: memberId ? { 'X-Member-Id': memberId.toString() } : {},
        cache: 'no-store',
      });
      if (res.ok) return await res.json();
      else throw Error();
    } catch (err) {
      redirect('/404');
    }
  };

  const data = (await getAdminData()) as AdminPageRes;

  return (
    <div>
      <AttendList me={memberId} startDate={data.start_date} data={data.member_penalties} />
    </div>
  );
}
export default Admin;
