'use client';
import MemberCard from '../Card/MemberCard';
import { GetMembersRes } from '@/types/api/auth';
import HomeLock from '../Lock/HomeLock';

interface Props {
  members: GetMembersRes | null;
}

function MemberSection({ members }: Props) {
  return (
    <>
      {members ? (
        <div className="flex gap-7 flex-wrap">
          {members.map(({ id, nickname, boj_id }) => (
            <MemberCard key={id} id={id} name={nickname} bojId={boj_id} />
          ))}
        </div>
      ) : (
        <HomeLock type="member" />
      )}
    </>
  );
}

export default MemberSection;
