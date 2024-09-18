'use client';

import Button from '@/components/Button';
import { useState } from 'react';
import UserEditBox from './UserEditBox';
import Link from 'next/link';
import { MemberSchema } from '../../../../models';
import { useStore } from '@/store';

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

  return (
    <>
      {isEdit ? (
        <UserEditBox defaultValue={userData} />
      ) : (
        <div className="bg-white rounded-md p-9 relative flex flex-col gap-8">
          <Button onClickFunc={() => setIsEdit(true)} customStyle="w-[174px] absolute top-9 right-9" heightSize="sm" roundSize="sm">
            내 정보 수정하기
          </Button>
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
