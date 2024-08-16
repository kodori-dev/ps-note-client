import Link from 'next/link';
import Button from './Button';

function Header() {
  return (
    <div className="flex items-center justify-between mx-6 my-4">
      <Link href="/" className="text-14">
        $$합법 PS 놀이터$$
      </Link>
      <Link href="/login">
        <Button theme="secondary" heightSize="sm" customStyle="w-[117px]">
          로그인
        </Button>
      </Link>
    </div>
  );
}

export default Header;
