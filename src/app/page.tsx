import SearchBar from '@/components/Search/SearchBar';
import dayjs from 'dayjs';
import { HomePageRes } from '@/types/api/home-page';
import HomeSection from '@/components/Section/HomeSection';
import { getUserInfo } from '@/utils/getUserInfo';

export default async function Home() {
  const meRes = await getUserInfo();
  const memberId = meRes?.id;

  let today = new Date();
  today.setHours(today.getHours() - 6);
  const bojDay = dayjs(today).format('YYYY-MM-DD');
  const getHomePage = async () => {
    try {
      const res = await fetch(`http://${process.env.NEXT_PUBLIC_API_BASE_URL}/api-internal/home-page?day=${bojDay}`, {
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

  return (
    <div className="my-8 flex flex-col gap-12">
      <SearchBar />
      <HomeSection homePage={homePage} />
    </div>
  );
}
