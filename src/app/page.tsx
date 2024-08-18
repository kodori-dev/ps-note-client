import HomeSectionLayout from '@/components/Layout/HomeSectionLayout';
import SearchBar from '@/components/SearchBar';
import MemberSection from '@/components/Section/MemberSection';
import ProblemSection from '@/components/Section/ProblemSection';

const SECTION_LIST = [
  { title: '이런 문제를 추천해요!', children: <ProblemSection type="recommended" /> },
  { title: '오늘은 누가 먼저 놀았을까요?', children: <ProblemSection type="today" /> },
  { title: '놀이의 전당', children: <MemberSection /> },
];

export default function Home() {
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
