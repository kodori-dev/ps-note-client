import Link from 'next/link';
import { ReactNode } from 'react';
import Button from '../Button';

interface Props {
  children: ReactNode;
  title: '회원가입' | '로그인';
  submitFunc: () => void;
}

function AuthLayout({ children, title, submitFunc }: Props) {
  return (
    <div className="w-[400px] mx-auto my-16 flex flex-col gap-14">
      <h1 className="text-40 text-center">{title}</h1>
      <form onSubmit={submitFunc} className="flex flex-col gap-5">
        {children}
        <Button customStyle="mt-14">{title}</Button>
        {title === '로그인' && (
          <Link href="/signup">
            <Button theme="secondary" customStyle="w-full">
              회원가입
            </Button>
          </Link>
        )}
      </form>
    </div>
  );
}

export default AuthLayout;
