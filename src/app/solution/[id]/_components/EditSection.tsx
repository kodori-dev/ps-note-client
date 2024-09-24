'use client';

import ScreenLoading from '@/components/Loading/ScreenLoading';
import { api } from '@/utils/api';
import { useDisclosure, useToast } from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import CustomModal from '@/components/Modal';

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

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="flex gap-5">
        {isLoading && <ScreenLoading />}
        <Link href={`/solution/${solutionId}/edit`}>
          <button className="hover:opacity-50 border-primary text-primary border-b text-14">수정하기</button>
        </Link>
        <button onClick={onOpen} className="hover:opacity-50 text-gray-2 text-14">
          삭제하기
        </button>
      </div>

      <CustomModal
        title="정말 이 솔루션을 삭제할까요?"
        isOpen={isOpen}
        onClose={onClose}
        clickBtnFunc={handleDeleteClick}
        leftBtn="고민할래요"
        rightBtn="삭제할게요"
      >
        <p className="text-gray-2 text-center">
          한 번 삭제하면 돌이킬 수 없어요.
          <br />
          (복구해달라고 하기 금지입니다 🤚)
        </p>
      </CustomModal>
    </>
  );
}

export default EditSection;
