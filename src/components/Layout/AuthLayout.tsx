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
      </form>
    </div>
  );
}

export default AuthLayout;
