'use client';

import ScreenLoading from '@/components/Loading/ScreenLoading';
import { api } from '@/utils/api';
import { useDisclosure, useToast } from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import Button from '@/components/Button';

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

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-col gap-3 items-center pt-9 pb-4">
              <p className="font-700 text-24">정말 이 솔루션을 삭제할까요?</p>
              <p className="text-gray-2 text-center">
                한 번 삭제하면 돌이킬 수 없어요.
                <br />
                (복구해달라고 하기 금지입니다 🤚)
              </p>
            </div>
          </ModalBody>

          <ModalFooter>
            <div className="flex gap-11 w-full">
              <Button theme="secondary" customStyle="w-full" heightSize="lg" onClickFunc={onClose} roundSize="sm">
                고민할래요
              </Button>
              <Button heightSize="lg" customStyle="w-full" onClickFunc={handleDeleteClick} roundSize="sm">
                삭제할게요
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditSection;
