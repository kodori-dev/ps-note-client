import ProblemCard from '@/components/Card/ProblemCard';
import HomeSectionLayout from '@/components/Layout/HomeSectionLayout';
import SearchBar from '@/components/SearchBar';
import MemberSection from '@/components/Section/MemberSection';

const PROBLEM_MOCKUP = [
  {
    id: 1,
    name: '쿠키의 신체 측정',
    boj_id: '20125',
    level: 'ruby_1',
    created_at: '2024-08-17T13:12:15.445Z',
    updated_at: '2024-08-17T13:12:15.445Z',
    is_solved: true,
    is_starred: true,
    stars: 7,
  },
  {
    id: 2,
    name: '제목이엄청엄청긴문제가있었어요',
    boj_id: '12865',
    level: 'ruby_1',
    created_at: '2024-08-17T13:12:15.445Z',
    updated_at: '2024-08-17T13:12:15.445Z',
    is_solved: true,
    is_starred: false,
    stars: 3,
  },
];

const SECTION_LIST = [
  { title: '이런 문제를 추천해요!', children: <SearchBar /> },
  { title: '오늘은 누가 먼저 놀았을까요?', children: <SearchBar /> },
  { title: '놀이의 전당', children: <MemberSection /> },
];

export default function Home() {
  return (
    <div className="my-8">
      <SearchBar />
      {PROBLEM_MOCKUP.map(({ id, name, boj_id, is_solved, is_starred, stars }) => (
        <ProblemCard key={id} id={id} bojId={boj_id} title={name} stars={stars} isStar={is_starred} />
      ))}
      {SECTION_LIST.map(({ title, children }) => (
        <HomeSectionLayout key={title} title={title}>
          {children}
        </HomeSectionLayout>
      ))}
    </div>
  );
}
