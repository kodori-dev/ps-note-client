import Image from 'next/image';
import MemberImg from '../../../public/image-lock-home-member.png';

interface Props {
  type: 'recommended' | 'today' | 'member';
}

function HomeLock({ type }: Props) {
  return (
    <div className="h-[316px] relative flex justify-center items-center">
      {type === 'member' && <Image src={MemberImg} alt="놀이의 전당 섹션 블러 처리 이미지" fill />}
      <p className="font-700 text-20 z-star">회원가입 후에 확인하세요 😏</p>
    </div>
  );
}

export default HomeLock;
