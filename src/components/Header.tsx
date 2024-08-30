'use client';

import Link from 'next/link';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import Button from './Button';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import ScreenLoading from './Loading/ScreenLoading';

function Header() {
  const [isUsed, setIsUsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: member } = useGetUserInfo();
  const {
    data: coupon,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: ['coupon', member?.id],
    queryFn: async () => {
      let today = new Date();
      today.setHours(today.getHours() - 6);
      if (!member) return false;
      const res = await api('GET', '/api/coupons', null, { date: dayjs(today).format('YYYY-MM-DD'), member_id: member.id, usable: true });
      setIsUsed(res.length === 0 ? true : false);
      return res.length > 0 ? res[0] : null;
    },
    enabled: false,
  });
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleCouponClick = async () => {
    try {
      setIsLoading(true);
      if (!coupon || !member) throw Error();
      const cur = new Date();
      const res = await api('PATCH', `/api/coupons/${coupon.id}`, {
        name: coupon.name,
        member: member.id,
        used_at: cur.toISOString(),
        valid_to: coupon.valid_to,
        valid_from: coupon.valid_from,
      });
      if (typeof res == 'string') throw Error();
      toast({ title: '면제 티켓 사용 성공!', description: '내일은 더 열심히~!', status: 'success' });
    } catch (err) {
      toast({ title: '면제 티켓 사용 실패!', description: '잠시 후 다시 시도해 주세요.', status: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (member) refetch();
  }, [member]);

  return (
    <header className="flex items-center justify-between h-[72px]">
      {isLoading && <ScreenLoading />}
      <Link href="/" className="text-14">
        $$합법 PS 놀이터$$
      </Link>
      {member ? (
        <div className="flex gap-12">
          {isSuccess && (
            <button disabled={isUsed} onClick={onOpen} className="active:hover:text-gray-2 disabled:opacity-30 disabled:cursor-not-allowed">
              면제 티켓
            </button>
          )}
          <Link href={'/post'}>
            <button className="hover:text-gray-2">체크인</button>
          </Link>
          <p>
            <span className="font-700">{member.nickname}</span> 님
          </p>
        </div>
      ) : (
        <Link href="/login">
          <Button theme="secondary" heightSize="sm" customStyle="w-[100px]">
            로그인
          </Button>
        </Link>
      )}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-col gap-3 items-center py-9">
              <p className="font-700 text-24">정말 오늘 놀기를 스킵하시겠어요?</p>
              <p className="text-gray-2">면제 티켓은 1주에 1번밖에 쓸 수 없어요.</p>
            </div>
          </ModalBody>

          <ModalFooter>
            <div className="flex gap-11 w-full">
              <Button theme="secondary" customStyle="w-full" heightSize="sm" onClickFunc={onClose} roundSize="sm">
                고민할래요
              </Button>
              <Button heightSize="sm" customStyle="w-full" onClickFunc={handleCouponClick} roundSize="sm">
                스킵할래요
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </header>
  );
}

export default Header;
