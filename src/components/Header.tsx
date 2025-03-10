"use client";

import Link from "next/link";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
// import Button from './Button';
import { useQuery } from "@tanstack/react-query";
import { api } from "@/utils/api";
import { Fragment, useEffect, useId, useState } from "react";
import { Avatar, Button, Field, Icon, IconButton, Input, Spinner, useDisclosure } from "@chakra-ui/react";
import ScreenLoading from "./Loading/ScreenLoading";
import { getBojTime } from "@/utils/getBojTime";
import { logout } from "@/utils/logout";
import dayjs from "dayjs";
import { useCheckAdmin } from "@/hooks/useCheckAdmin";
import CustomDialog from "./Dialog";
import { toaster } from "@/components/ui/toaster";
import { MenuContent, MenuItem, MenuItemGroup, MenuRoot, MenuTrigger } from "./ui/menu";
import { Tooltip } from "./ui/tooltip";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { IoMenu } from "react-icons/io5";

function Header() {
  const [isUsed, setIsUsed] = useState(false);
  const isAdmin = useCheckAdmin();
  const id = useId(); //뭐하는애지?

  const { data: user, isSuccess: isUserSuccess } = useGetUserInfo();
  const {
    data: coupon,
    refetch: getCoupon,
    isSuccess: isCouponSuccess,
    isLoading: isCouponLoading,
  } = useQuery({
    queryKey: ["coupon", user.userId],
    queryFn: async () => {
      if (!user.isLogin) return false;
      const today = getBojTime();
      const res = await api("GET", "/coupons", undefined, {
        day: today,
        member_id: user.userId,
        usable: true,
      });
      setIsUsed(res.length === 0 ? true : false);
      return res.length > 0 ? res[0] : null;
    },
    enabled: false,
    staleTime: 60 * (60 * 1000),
    gcTime: Infinity,
  });

  useEffect(() => {
    if (isUserSuccess && user.isLogin) {
      getCoupon();
    }
  }, [isUserSuccess]);

  const { open, onOpen, onClose } = useDisclosure();

  const handleCouponClick = async () => {
    try {
      if (!coupon || !user.isLogin) throw Error("/이미 이번 주 티켓을 사용했어요");
      const cur = new Date();
      const res = await api("POST", `/coupons/use`, {
        coupon_id: coupon.id,
        use_date: dayjs(cur).format("YYYY-MM-DDTHH:mm:ss"),
      });
      if (typeof res == "string") throw Error();
      toaster.create({
        title: "면제 티켓 사용 성공!",
        description: "내일은 더 열심히~!",
        type: "success",
      });
      getCoupon();
    } catch (err: any) {
      const [code, msg] = err.message.split("/");
      toaster.create({
        title: "면제 티켓 사용 실패!",
        description: msg,
        type: "error",
      });
    } finally {
      onClose();
    }
  };

  const handleLogoutClick = async () => {
    await logout();
    window.location.reload();
  };

  const { register, getValues } = useForm();
  const [isVacationOpen, setIsVacationOpen] = useState(false);
  const handleVacationClick = async () => {
    try {
      const { vacation_start, vacation_end, vacation_memo } = getValues();
      const res = await api("POST", `/vacations`, {
        start_date: vacation_start,
        end_date: vacation_end,
        memo: vacation_memo,
      });
      if (typeof res == "string") {
        const [code, msg] = res.split("/");
        throw Error(msg);
      }
      toaster.create({
        title: "휴가 신청 성공😎",
        description: "푹 쉬고 빠르게 돌아오세요!",
        type: "success",
      });
      setIsVacationOpen(false);
      window.location.href = "/mypage";
    } catch (err: any) {
      toaster.create({
        title: "휴가 신청 실패",
        description: err.message,
        type: "error",
      });
    }
  };

  return (
    <header className="relative flex items-center justify-between h-[60px]">
      <Link href="/" className="text-14 font-bold">
        PS-NOTE
      </Link>

      <div className="flex gap-5">
        {user.isLogin && (
          <>
            {/* pc menu */}
            <div className="flex gap-5 mobile:hidden">
              <Button onClick={onOpen} loading={isCouponLoading} loadingText="Loading..." disabled={isUsed} colorPalette={"blue"} variant="ghost" size="sm">
                면제티켓
              </Button>
              <Button onClick={() => (window.location.href = "/post")} colorPalette={"blue"} variant="ghost" size="sm">
                Check-In
              </Button>
              <Button onClick={() => window.open("https://forms.gle/pJodnUMUpXciL6Hs5")} colorPalette={"blue"} variant="ghost" size="sm">
                버그제보
              </Button>

              <MenuRoot>
                <MenuTrigger asChild>
                  <Button colorPalette={"blue"} variant="ghost" size="sm">
                    MENU
                  </Button>
                </MenuTrigger>
                <MenuContent>
                  <MenuItem value="꼬박꼬박 일지" onClick={() => (window.location.href = `/attend/${user.userId}`)}>
                    꼬박꼬박 일지
                  </MenuItem>
                  <MenuItem value="휴가" onClick={() => setIsVacationOpen(true)}>
                    휴가 떠나기
                  </MenuItem>
                  <MenuItem value="마이페이지" onClick={() => (window.location.href = `/mypage`)}>
                    마이페이지
                  </MenuItem>
                  {isAdmin && (
                    <MenuItem value="관리자" onClick={() => (window.location.href = `/admin`)}>
                      관리자
                    </MenuItem>
                  )}
                  <MenuItem value="로그아웃" color={"blue.600"} _hover={{ bg: "blue.50" }} onClick={handleLogoutClick}>
                    로그아웃
                  </MenuItem>
                </MenuContent>
              </MenuRoot>
            </div>

            {/* mobile menu */}
            <MenuRoot>
              <MenuTrigger asChild className="hidden mobile:block">
                <IconButton aria-label="메뉴 열기" variant={"ghost"}>
                  <Icon size={"xl"} color={"gray.400"}>
                    <IoMenu />
                  </Icon>
                </IconButton>
              </MenuTrigger>
              <MenuContent>
                <MenuItemGroup title="출석" className="hidden mobile:block">
                  <MenuItem value="체크인" onClick={() => (window.location.href = "/post")}>
                    Check-In
                  </MenuItem>
                  <MenuItem value="면제티켓" onClick={onOpen} disabled={isUsed}>
                    면제티켓
                  </MenuItem>
                </MenuItemGroup>
                <MenuItemGroup title="당신의 UX를 위해··♡">
                  <MenuItem value="꼬박꼬박 일지" onClick={() => (window.location.href = `/attend/${user.userId}`)}>
                    꼬박꼬박 일지
                  </MenuItem>
                  <MenuItem value="휴가" onClick={() => setIsVacationOpen(true)}>
                    휴가 떠나기
                  </MenuItem>
                  <MenuItem value="마이페이지" onClick={() => (window.location.href = `/mypage`)}>
                    마이페이지
                  </MenuItem>
                </MenuItemGroup>
                <MenuItemGroup title="개발자를 위해">
                  <MenuItem className="hidden mobile:block" value="버그제보" onClick={() => window.open("https://forms.gle/pJodnUMUpXciL6Hs5")}>
                    버그제보
                  </MenuItem>
                  {isAdmin && (
                    <MenuItem value="관리자" onClick={() => (window.location.href = `/admin`)}>
                      관리자
                    </MenuItem>
                  )}
                </MenuItemGroup>
                <MenuItemGroup title="---">
                  <MenuItem value="로그아웃" color={"blue.600"} _hover={{ bg: "blue.50" }} onClick={handleLogoutClick}>
                    로그아웃
                  </MenuItem>
                </MenuItemGroup>
              </MenuContent>
            </MenuRoot>
          </>
        )}

        {/* 프로필 영역 */}
        <Tooltip content={user.isLogin ? `${user.nickname} 님 출석 보기` : "로그인"} ids={{ trigger: id }} openDelay={300} closeDelay={300}>
          <Avatar.Root
            ids={{ root: id }}
            as={"button"}
            className="cursor-pointer"
            size={"sm"}
            onClick={() => (window.location.href = user.isLogin ? `/attend/${user.userId}` : "/login")}
          >
            <Avatar.Fallback name={user.nickname} />
          </Avatar.Root>
        </Tooltip>
      </div>
      {/* 면제 티켓 모달 */}
      <CustomDialog clickBtnFunc={handleCouponClick} title="정말 오늘 놀기를 스킵하시겠어요?" isOpen={open} onClose={onClose} leftBtn="고민할래요" rightBtn="스킵할래요">
        <>면제 티켓은 1주에 1번밖에 쓸 수 없어요.</>
      </CustomDialog>

      {/* 면제 티켓 모달 */}
      <CustomDialog
        clickBtnFunc={handleVacationClick}
        title="휴가를 신청할 기간을 입력하세요."
        isOpen={isVacationOpen}
        onClose={() => setIsVacationOpen(false)}
        leftBtn="고민할래요"
        rightBtn="휴가쓸게요"
      >
        <div className="w-full mt-5 flex flex-col gap-2 px-10">
          <Field.Root required orientation="horizontal">
            <Field.Label>휴가명</Field.Label>
            <Input {...register("vacation_memo")} />
          </Field.Root>
          <Field.Root required orientation="horizontal">
            <Field.Label>시작일</Field.Label>
            <Input type="date" {...register("vacation_start")} />
          </Field.Root>
          <Field.Root required orientation="horizontal">
            <Field.Label>종료일</Field.Label>
            <Input type="date" {...register("vacation_end")} />
          </Field.Root>
          <p className="text-gray-3 text-14 mt-3">! 휴가 반영 상태는 마이 페이지에서 확인할 수 있어요.</p>
        </div>
      </CustomDialog>
    </header>
  );
}

export default Header;
