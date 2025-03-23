import { getBojTime } from '@/utils/getBojTime';
import { getUserSession } from '@/utils/getUserSession';
import AttendList from './_component/AttendList';
import { redirect } from 'next/navigation';
import { AdminPageRes } from '@/types/api/admin';
import { headers } from 'next/headers';
import SelectDay from './_component/SelectDay';

async function Admin() {
  const session = await getUserSession();
  const memberId = session.isLogin ? session.userId : undefined;
  if (!memberId) redirect('/login');

  const day = headers().get('x-query-day') || '';
  const bojDay = getBojTime();
  const getAdminData = async () => {
    try {
      const res = await fetch(`${process.env.INTERNAL_SERVER_URL}/api-internal/v2/admin-page?day=${day || bojDay}`, {
        headers: memberId ? { 'X-Member-Id': memberId.toString() } : {},
        cache: 'no-store',
      });
      if (res.ok) return await res.json();
      else throw Error();
    } catch (err) {
      console.log(err);
      redirect('/404');
    }
  };

  const data = (await getAdminData()) as AdminPageRes;

  return (
    <div>
      <SelectDay defaultDay={day || bojDay} />
      <AttendList me={memberId} startDate={data.start_date} data={data.member_penalties} />
    </div>
  );
}
export default Admin;
