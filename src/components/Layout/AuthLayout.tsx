import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  title: '회원가입' | '로그인';
  submitFunc: () => void;
}

function AuthLayout({ children, title, submitFunc }: Props) {
  return (
    <div className="w-[400px] mx-auto mt-16 flex flex-col gap-14">
      <h1 className="text-40 text-center">{title}</h1>
      <form onSubmit={submitFunc} className="flex flex-col gap-5">
        {children}
        <button className="mt-14 h-[54px] bg-primary text-white rounded-md hover:bg-primary-hover">{title}</button>
        {title === '로그인' && (
          <Link href="/signup">
            <button className="w-full h-[54px] bg-white text-primary rounded-md hover:bg-gray-100 border border-primary">회원가입</button>
          </Link>
        )}
      </form>
    </div>
  );
}

export default AuthLayout;
