import SearchBar from '@/components/Search/SearchBar';
import { HomePageRes } from '@/types/api/home-page';
import HomeSectionLayout from '@/components/Layout/HomeSectionLayout';
import ProblemSection from '@/components/Section/ProblemSection';
import MemberSection from '@/components/Section/MemberSection';
import Link from 'next/link';
import { getBojTime } from '@/utils/getBojTime';
import { getUserSession } from '@/utils/getUserSession';

export default async function Home() {
  const session = await getUserSession();
  const memberId = session.isLogin ? session.userId : undefined;

  const bojDay = getBojTime();
  const getHomePage = async () => {
    try {
      const res = await fetch(`http://${process.env.NEXT_PUBLIC_SERVER_URL}/api-internal/v2/home-page?day=${bojDay}`, {
        headers: memberId ? { 'X-Member-Id': memberId.toString() } : {},
        cache: 'no-store',
      });
      if (res.ok) return await res.json();
      else throw Error();
    } catch (err) {
      return null;
    }
  };

  const homePage = (await getHomePage()) as HomePageRes;

  if (!homePage) {
    return (
      <div className="w-full h-36 flex flex-col gap-4 justify-center items-center">
        모든 서비스는 로그인 후에 이용할 수 있어요.
        <Link href="/login" className="text-primary underline">
          로그인하기
        </Link>
      </div>
    );
  }

  const SECTION_LIST = [
    { title: '이런 문제를 추천해요!', children: <ProblemSection problems={homePage.current_week_starred_problems} /> },
    { title: '오늘은 누가 먼저 놀았을까요?', children: <ProblemSection problems={homePage.today_problems} /> },
    { title: '놀이의 전당', children: <MemberSection members={homePage.members} penalty_map={homePage.penalty_map} /> },
  ];

  return (
    <div className="my-8 flex flex-col gap-12">
      <SearchBar />
      {SECTION_LIST.map(({ title, children }) => (
        <HomeSectionLayout key={title} title={title}>
          {children}
        </HomeSectionLayout>
      ))}
    </div>
  );
}
