import { cookies } from 'next/headers';
import MemberCard from '../Card/MemberCard';
import { Suspense } from 'react';
import { GetMembersRes } from '@/types/api/auth';
import HomeLock from '../Lock/HomeLock';

async function MemberSection() {
  const cookie = cookies();

  const getMembers = async () => {
    try {
      const res = await fetch(`http://${process.env.NEXT_PUBLIC_API_BASE_URL}/api/members`, {
        headers: { Cookie: cookie.toString() || '' },
        cache: 'no-store',
      });
      if (res.ok) return await res.json();
      else throw Error();
    } catch (err) {
      return null;
    }
  };

  const members = (await getMembers()) as GetMembersRes | null;

  return (
    <Suspense fallback={<p>로딩중</p>}>
      {members ? (
        <div className="flex gap-7 flex-wrap">
          {members.map(({ id, nickname, boj_id }) => (
            <MemberCard key={id} id={id} name={nickname} bojId={boj_id} />
          ))}
        </div>
      ) : (
        <HomeLock type="member" />
      )}
    </Suspense>
  );
}

export default MemberSection;
