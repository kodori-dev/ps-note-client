import SearchBar from '@/components/Search/SearchBar';
import { headers } from 'next/headers';
import CardList from '../../components/CardList/CardList';
import Button from '@/components/Button';
import Link from 'next/link';
import MetaTag from '@/components/MetaTag';
import { getServerData } from '@/utils/getServerData';

const PAGE_SIZE = 30;

async function Search() {
  const keyword = decodeURIComponent(headers().get('x-query-keyword') || '');
  const page = headers().get('x-query-page') || '';
  const data = await getServerData('/problems/search', { page: Number(page), size: PAGE_SIZE, query: keyword });

  return (
    <>
      <MetaTag title={`${keyword} - 검색 결과`} description={`${keyword} 로 검색한 결과입니다.`} />
      <div className="flex flex-col gap-6 mt-4">
        <SearchBar initialValue={keyword} />
        <p className="mt-6">
          <span className="text-primary">{keyword}</span>에 대해 <span className="text-primary">총 {data?.count}개</span>의 검색결과가 있습니다.
        </p>
        {data ? (
          data.count > 0 ? (
            <CardList type="problem" data={data.items} />
          ) : (
            <p className="text-gray-2 h-32 flex items-center justify-center">일치하는 데이터가 없어요🥲</p>
          )
        ) : (
          '로딩중'
        )}
        <div className="flex gap-12 items-center justify-center mt-12 mb-20">
          <Link passHref href={`/search?keyword=${keyword}&page=${Number(page) - 1}`}>
            <Button theme="secondary" disabled={Number(page) <= 1} customStyle="w-20">
              이전
            </Button>
          </Link>
          <p className="text-gray-2">
            <span className="text-primary">{page}</span> / {data ? Math.ceil(data.count / PAGE_SIZE) : 0}
          </p>
          <Link passHref href={`/search?keyword=${keyword}&page=${Number(page) + 1}`}>
            <Button theme="secondary" disabled={data.count < PAGE_SIZE} customStyle="w-20">
              다음
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Search;
