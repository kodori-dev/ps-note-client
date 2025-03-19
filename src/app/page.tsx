import SearchBar from "@/components/Search/SearchBar";
import { HomePageRes } from "@/types/api/home-page";
import HomeSectionLayout from "@/components/Layout/HomeSectionLayout";
import ProblemSection from "@/components/Section/ProblemSection";
import MemberSection from "@/components/Section/MemberSection";
import { getBojTime } from "@/utils/getBojTime";
import { getUserSession } from "@/utils/getUserSession";

export default async function Home() {
  const session = await getUserSession();
  const memberId = session.isLogin ? session.userId : undefined;

  const bojDay = getBojTime();
  const getHomePage = async () => {
    try {
      const res = await fetch(`${process.env.SERVER_URL}/api-internal/v2/home-page?day=${bojDay}`, {
        headers: memberId ? { "X-Member-Id": memberId.toString() } : {},
        cache: "no-store",
      });
      if (res.ok) return await res.json();
      else throw Error();
    } catch (err) {
      return null;
    }
  };

  const homePage = (await getHomePage()) as HomePageRes;

  const SECTION_LIST = [
    {
      title: "이런 문제를 추천해요!",
      children: <ProblemSection problems={homePage?.current_week_starred_problems} />,
    },
    {
      title: "오늘은 누가 먼저 놀았을까요?",
      children: <ProblemSection problems={homePage?.today_problems} />,
    },
    {
      title: "놀이의 전당",
      children: <MemberSection members={homePage?.members} penalty_map={homePage?.penalty_map} />,
    },
  ];

  return (
    <div className="my-8 flex flex-col gap-12">
      <div className="text-center">
        <h1 className="mt-24 mb-2 text-4xl font-bold">
          팀원들과 목표를 설정하고
          <br />
          나만의 <span className="text-primary">PS-NOTE</span>를 만들어 보세요!
        </h1>
        {/* <p className="text-14 text-gray-6">팀을 만들고 팀원을 초대해, 함께 문제를 풀며 성장하세요.</p> */}
        <p className="text-14 text-gray-6">팀 기능 Coming Soon!</p>
      </div>
      <SearchBar />
      {homePage &&
        SECTION_LIST.map(({ title, children }) => (
          <HomeSectionLayout key={title} title={title}>
            {children}
          </HomeSectionLayout>
        ))}
    </div>
  );
}
