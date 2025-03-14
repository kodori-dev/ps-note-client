'use client';

import Button from '@/components/Button';
import CardList from '@/components/CardList/CardList';
import ScreenLoading from '@/components/Loading/ScreenLoading';
import Tag from '@/components/Tag';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import { GetType } from '@/types/api/get';
import { api } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ORDER_STRING = ['최신순', '오래된순', '풀이 언어순'] as const;
type orderType = (typeof ORDER_STRING)[number];

const ORDER = {
  '풀이 언어순': 'source_lang',
  최신순: '-submitted_at',
  오래된순: 'submitted_at',
};

const PAGE_SIZE = 30;

function MySolutions() {
  const page = useSearchParams().get('page');
  const { data: user } = useGetUserInfo();
  const [order, setOrder] = useState<orderType>('최신순');

  const { data, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ['my_solutions', order, page],
    queryFn: async () => {
      const res = await api('GET', '/solutions', undefined, {
        member_id: user.userId,
        ordering: [ORDER[order]] as GetType['/solutions']['query']['ordering'],
        page: Number(page),
        size: PAGE_SIZE,
      });
      return res;
    },
  });

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-32 mb-4">
        <span className="font-700">내가 제출한 솔루션</span>을 확인하세요.
      </h1>
      <div className="flex gap-2">
        {ORDER_STRING.map((item) => (
          <Tag key={item} onClickFunc={() => setOrder(item)} initialState={order === item} customStyle="px-3">
            {item}
          </Tag>
        ))}
      </div>
      {isSuccess && data && data.count > 0 ? (
        <>
          <CardList type="solution" data={data.items} />
          <div className="flex gap-12 items-center justify-center mt-12 mb-20">
            <Link passHref href={`/mypage/solutions?page=${Number(page) - 1}`}>
              <Button theme="secondary" disabled={Number(page) <= 1} customStyle="w-20">
                이전
              </Button>
            </Link>
            <p className="text-gray-2">
              <span className="text-primary">{page}</span> / {data ? Math.ceil(data.count / PAGE_SIZE) : 0}
            </p>
            <Link passHref href={`/mypage/solutions?page=${Number(page) + 1}`}>
              <Button theme="secondary" disabled={data.count < PAGE_SIZE} customStyle="w-20">
                다음
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center">제출한 솔루션이 없습니다.</div>
      )}
      {isLoading && <ScreenLoading />}
    </div>
  );
}

export default MySolutions;
