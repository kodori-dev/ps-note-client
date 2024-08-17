'use client';

import Link from 'next/link';
import Button from './Button';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';

function Header() {
  const { data: member } = useGetUserInfo();

  return (
    <header className="flex items-center justify-between h-[72px]">
      <Link href="/" className="text-14">
        $$합법 PS 놀이터$$
      </Link>
      {member ? (
        <div className="flex gap-12">
          <button className="hover:text-gray-2">면제 티켓</button>
          <button className="hover:text-gray-2">체크인</button>
          <p>
            <span className="font-700">{member.nickname}</span> 님
          </p>
        </div>
      ) : (
        <Link href="/login">
          <Button theme="secondary" heightSize="sm" customStyle="w-[100px]">
            로그인
          </Button>
        </Link>
      )}
    </header>
  );
}

export default Header;
