'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import ScreenLoading from '@/components/Loading/ScreenLoading';
import { REQUIRED_INPUT } from '@/constants/errorMsg';
import { api } from '@/utils/api';
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MemberSchema } from '../../../../models';
import { NOT_USER_PW_ERR_CODE } from '@/constants/errorCode';

interface Props {
  defaultValue: MemberSchema;
}

function UserEditBox({ defaultValue }: Props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    watch,
  } = useForm({ mode: 'onSubmit', defaultValues: { ...defaultValue, cur_password: '' } });
  const { boj_id, cur_password } = watch();

  const isEdit = boj_id !== defaultValue.boj_id && cur_password;

  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const handleEditSubmit = async () => {
    setIsLoading(true);

    const { boj_id, cur_password } = getValues();
    try {
      const res = await api('PATCH', `/members/${defaultValue.id}`, {
        boj_id,
        original_password: cur_password,
      });
      if (typeof res === 'string') throw Error(res);
      await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/session`, {
        method: 'POST',
        body: JSON.stringify({ userId: res.id, nickname: res.nickname }),
      });

      toast({
        title: `정보 변경 완료`,
        description: '문제 풀고 부자되세요😎',
        status: 'success',
      });

      window.location.reload();
    } catch (error: any) {
      const msg = error.message == NOT_USER_PW_ERR_CODE ? '비밀번호가 일치하지 않습니다.' : '다시 시도해 주세요😥';
      toast({
        title: '변경 실패!',
        description: msg,
        status: 'error',
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <ScreenLoading />}
      <form className="flex flex-col gap-5 w-[400px]" onSubmit={handleSubmit(handleEditSubmit)}>
        <h2 className="text-32 font-700">내 정보 변경</h2>
        <p className="text-gray-3 text-14">* 상태 변경은 관리자에게 문의해 주세요.</p>
        <Input register={register('username')} disabled label="ID" />
        <Input register={register('nickname')} disabled label="닉네임" />
        <Input
          register={register('boj_id', { required: REQUIRED_INPUT })}
          label="연동 ID(BOJ)"
          description="해당 계정으로 솔루션을 검증합니다. 실제 사용 계정을 입력해 주세요."
          placeholder="연동할 BOJ ID를 입력하세요."
          error={errors.boj_id}
        />
        <Input
          register={register('cur_password', { required: REQUIRED_INPUT })}
          label="비밀번호 확인"
          placeholder="현재 비밀번호를 입력해 주세요."
          type="password"
        />
        <Button disabled={!isEdit}>수정하기</Button>
      </form>
    </>
  );
}

export default UserEditBox;
