import Image from 'next/image';
import MemberImg from '../../../public/image-lock-home-member.png';
import TodayImg from '../../../public/image-lock-home-today.png';

interface Props {
  type: 'today' | 'member';
}

const IMAGE = {
  today: <Image src={TodayImg} alt="오늘의 문제 섹션 블러 처리 이미지" fill />,
  member: <Image src={MemberImg} alt="놀이의 전당 섹션 블러 처리 이미지" fill />,
};

const HEIGHT = {
  today: 'h-[240px]',
  member: 'h-[316px]',
};

function HomeLock({ type }: Props) {
  return (
    <div className={`relative flex justify-center items-center ${HEIGHT[type]}`}>
      {IMAGE[type]}
      <p className="font-700 text-20 z-star">회원가입 후에 확인하세요 😏</p>
    </div>
  );
}

export default HomeLock;
