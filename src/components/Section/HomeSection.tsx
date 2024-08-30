import { HomePageProvider } from '@/contexts/HomePageContext';
import HomeSectionLayout from '@/components/Layout/HomeSectionLayout';
import { HomePageRes } from '@/types/api/home-page';
import ProblemSection from '@/components/Section/ProblemSection';
import MemberSection from '@/components/Section/MemberSection';

function HomeSection({ homePage }: { homePage: HomePageRes }) {
  const SECTION_LIST = [
    { title: '이런 문제를 추천해요!', children: <ProblemSection type="recommended" /> },
    { title: '오늘은 누가 먼저 놀았을까요?', children: <ProblemSection type="today" /> },
    { title: '놀이의 전당', children: <MemberSection /> },
  ];

  return (
    <HomePageProvider value={homePage}>
      {SECTION_LIST.map(({ title, children }) => (
        <HomeSectionLayout key={title} title={title}>
          {children}
        </HomeSectionLayout>
      ))}
    </HomePageProvider>
  );
}

export default HomeSection;
