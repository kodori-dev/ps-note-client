import { api } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

/**
 * 디바운싱으로 문제 검색
 * @param query keyword
 * @param trigger refetch 조건
 */
export const useDebouncingSearch = (query: string, trigger: boolean) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ['search', query],
    queryFn: async () => await api('GET', '/problems/search', null, { query }),
    enabled: false,
  });

  useEffect(() => {
    if (query === '') setIsOpen(false);
    const debounceTimer = setTimeout(async () => {
      if (trigger) {
        refetch();
        setIsOpen(true);
      }
    }, 1000);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  return { isOpen, setIsOpen, data, isLoading, isSuccess };
};
