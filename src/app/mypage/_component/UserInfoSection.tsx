'use client';

import UserEditBox from './UserEditBox';
import Link from 'next/link';
import { MemberSchema } from '../../../../models';
import { useStore } from '@/store';
import PasswordEditBox from './PasswordEditBox';

interface Props {
  userData: MemberSchema;
}

function UserInfoSection({ userData }: Props) {
  const { isEdit, setIsEdit } = useStore((state) => ({ isEdit: state.isInfoEdit, setIsEdit: state.setIsInfoEdit }));
  const { boj_id, nickname, username, is_off } = userData;

  const INFO = [
    {
      type: '현재 상태',
      value: is_off ? '잠시 쉬어가는 중💤' : '열심히 달리는 중❤️‍🔥',
    },
    { type: '연동된 ID (BOJ)', value: <Link href={`https://www.acmicpc.net/user/${boj_id}`}>@{boj_id}</Link> },
  ];

  const EDIT_BOX = {
    info: <UserEditBox defaultValue={userData} />,
    pw: <PasswordEditBox defaultValue={userData} />,
  };

  return (
    <>
      {isEdit ? (
        <>{EDIT_BOX[isEdit as 'info' | 'pw']}</>
      ) : (
        <div className="bg-white rounded-md p-9 relative flex flex-col gap-8">
          <div className="flex gap-4 absolute top-9 right-9 text-14">
            <button onClick={() => setIsEdit('info')} className="text-primary border-b border-primary hover:opacity-50">
              내 정보 수정
            </button>
            <button onClick={() => setIsEdit('pw')} className="text-primary border-b border-primary hover:opacity-50">
              비밀번호 수정
            </button>
          </div>
          <div>
            <p className="text-40">
              <span className="font-700">{nickname}</span> 님
            </p>
            <p className="text-gray-1">{`(${username})`}</p>
          </div>
          <div className="flex gap-12">
            {INFO.map(({ type, value }) => (
              <div key={type} className="flex flex-col gap-1">
                <p className={['text-20 bg-black/10 rounded-sm py-1 px-3', type === '현재 상태' && !is_off ? 'bg-progress-pink/50' : ''].join(' ')}>
                  {value}
                </p>
                <p className="text-gray-3 text-14">{type}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default UserInfoSection;
