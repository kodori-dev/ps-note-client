import SearchBar from '@/components/SearchBar';
import { PROBLEMS } from '@/constants/mockup';
import { cookies, headers } from 'next/headers';
import CardList from './_components/CardList';
import { GetProblemsRes, Problem } from '@/types/api/problem';

const PAGE_SIZE = 30;

async function Search() {
  const keyword = decodeURIComponent(headers().get('x-query-keyword') || '');
  const page = headers().get('x-query-page') || '';
  const cookie = cookies();

  const getSearchData = async () => {
    try {
      const res = await fetch(`http://${process.env.NEXT_PUBLIC_API_BASE_URL}/api/problems?page=${page}&page_size=${PAGE_SIZE}&query=${keyword}`, {
        headers: { Cookie: cookie.toString() || '' },
      });
      if (res.ok) return await res.json();
      throw Error();
    } catch (err) {
      return null;
    }
  };
  const data = (await getSearchData()) as GetProblemsRes | null;

  return (
    <div className="flex flex-col gap-6">
      <SearchBar initialValue={keyword} />
      <p>
        <span className="text-primary">{keyword}</span>에 대해 <span className="text-primary">총 999개</span>의 검색결과가 있습니다.
      </p>
      {data ? (
        data.length > 0 ? (
          <CardList data={data} />
        ) : (
          <p className="text-gray-2 h-32 flex items-center justify-center">일치하는 데이터가 없어요🥲</p>
        )
      ) : (
        '로딩중'
      )}
    </div>
  );
}

export default Search;
