import HomeSectionLayout from '@/components/Layout/HomeSectionLayout';
import SearchBar from '@/components/SearchBar';
import MemberSection from '@/components/Section/MemberSection';
import ProblemSection from '@/components/Section/ProblemSection';
import { cookies } from 'next/headers';

export default async function Home() {
  const cookie = cookies();

  const getMembers = async () => {
    try {
      const res = await fetch(`http://${process.env.NEXT_PUBLIC_API_BASE_URL}/api/members`, {
        headers: { Cookie: cookie.toString() || '' },
        cache: 'no-store',
      });
      console.log('멤버fetch');
      if (res.ok) return await res.json();
      else throw Error();
    } catch (err) {
      return null;
    }
  };

  console.log('홈페이지 렌더링');

  const members = await getMembers();

  const SECTION_LIST = [
    { title: '이런 문제를 추천해요!', children: <ProblemSection type="recommended" /> },
    { title: '오늘은 누가 먼저 놀았을까요?', children: <ProblemSection type="today" /> },
    { title: '놀이의 전당', children: <MemberSection members={members} /> },
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
