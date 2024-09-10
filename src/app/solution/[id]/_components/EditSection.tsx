'use client';

import ScreenLoading from '@/components/Loading/ScreenLoading';
import { api } from '@/utils/api';
import { useToast } from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
  solutionId: string;
}

function EditSection({ solutionId }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleDeleteClick = async () => {
    setIsLoading(true);
    try {
      const res = await api('DELETE', `/solutions/${solutionId}`);
      if (typeof res === 'string') throw Error();
      toast({
        title: `solution 삭제 완료!`,
        description: '오늘도 행복한 하루 ~✨',
        status: 'success',
      });
      window.location.href = `/`;
    } catch (err) {
      toast({
        title: `solution 삭제 실패!`,
        description: '잠시 후 다시 시도해 주세요.',
        status: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-5">
      {isLoading && <ScreenLoading />}
      <Link href={`/solution/${solutionId}/edit`}>
        <button className="hover:border-primary text-primary border-b text-14">✏️수정하기</button>
      </Link>
      <button onClick={handleDeleteClick} className="hover:border-red hover:text-red text-gray-2 border-b text-14">
        🗑️삭제하기
      </button>
    </div>
  );
}

export default EditSection;
