import SearchBar from '@/components/SearchBar';
import { PROBLEMS } from '@/constants/mockup';
import { headers } from 'next/headers';
import CardList from './_components/CardList';
import { Problem } from '@/types/api/problem';

function Search() {
  const keyword = decodeURIComponent(headers().get('x-query-keyword') || '');

  //API 요청 & 무한스크롤
  const data = PROBLEMS;
  // const data = [];

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
