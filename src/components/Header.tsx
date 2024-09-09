'use client';

import Link from 'next/link';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import Button from './Button';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { useEffect, useState } from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import ScreenLoading from './Loading/ScreenLoading';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { getBojTime } from '@/utils/getBojTime';

function Header() {
  const [isDropdown, setIsDropDown] = useState(false);
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
      const today = getBojTime();
      if (!member) return false;
      const res = await api('GET', '/coupons', null, { date: today, member_id: member.id, usable: true });
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
      const res = await api('PATCH', `/coupons/${coupon.id}`, {
        name: coupon.name,
        member: member.id,
        used_at: cur.toISOString(),
        valid_to: coupon.valid_to,
        valid_from: coupon.valid_from,
      });
      if (typeof res == 'string') throw Error();
      setIsDropDown(false);
      toast({ title: '면제 티켓 사용 성공!', description: '내일은 더 열심히~!', status: 'success' });
    } catch (err) {
      toast({ title: '면제 티켓 사용 실패!', description: '잠시 후 다시 시도해 주세요.', status: 'error' });
    } finally {
      onClose();
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (member) refetch();
  }, [member]);

  const logout = () => {
    var today = new Date();
    today.setTime(today.getTime() - 1 * 24 * 60 * 60 * 1000);

    document.cookie = 'csrftoken=; path=/; expires=' + today.toUTCString() + ';';

    window.location.href = '/login';
  };

  const DROPDOWN_BTN = [
    { type: '꼬박꼬박 일지', onClick: () => (window.location.href = `/attend/${member?.id}`) },
    { type: '로그아웃', onClick: logout },
  ];

  return (
    <header className="relative flex items-center justify-between h-[72px]">
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
          <button onClick={() => setIsDropDown((prev) => !prev)}>
            <span className="font-700">{member.nickname}</span> 님{isDropdown ? <ChevronUpIcon boxSize={6} /> : <ChevronDownIcon boxSize={6} />}
          </button>
        </div>
      ) : (
        <Link href="/login">
          <Button theme="secondary" heightSize="sm" customStyle="w-[100px]">
            로그인
          </Button>
        </Link>
      )}
      {isDropdown && (
        <div className="absolute z-modal -bottom-[84px] right-0 bg-white shadow-md overflow-hidden rounded-md flex flex-col">
          {DROPDOWN_BTN.map(({ onClick, type }) => (
            <button
              key={type}
              disabled={type == '로그아웃'}
              onClick={() => {
                onClick();
                setIsDropDown(false);
              }}
              className="enabled:hover:text-primary enabled:hover:bg-primary/10 py-3 px-6 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              {type}
            </button>
          ))}
        </div>
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
