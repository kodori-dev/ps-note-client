import Input from '@/components/Input';
import ScreenLoading from '@/components/Loading/ScreenLoading';
import { api } from '@/utils/api';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MemberSchema } from '../../../../models';
import { NOT_USER_PW_ERR_CODE } from '@/constants/errorCode';
import { REQUIRED_INPUT } from '@/constants/errorMsg';
import Button from '@/components/Button';
import { toaster } from '@/components/ui/toaster';

interface Props {
  defaultValue: MemberSchema;
}

function PasswordEditBox({ defaultValue }: Props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    watch,
    setError,
  } = useForm({ mode: 'onSubmit' });
  const { cur_password, new_password, new_password_check } = watch();
  const isEdit =
    cur_password && new_password !== '' && new_password === new_password_check;

  const [isLoading, setIsLoading] = useState(false);

  const handleEditSubmit = async () => {
    setIsLoading(true);
    const { cur_password, new_password } = getValues();
    try {
      const res = await api('PATCH', `/members/${defaultValue.id}`, {
        original_password: cur_password,
        password: new_password,
      });
      if (typeof res === 'string') throw Error(res);
      await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/session`, {
        method: 'POST',
        body: JSON.stringify({ userId: res.id, nickname: res.nickname }),
      });

      toaster.create({
        title: `정보 변경 완료`,
        description: '문제 풀고 부자되세요😎',
        type: 'success',
      });

      window.location.reload();
    } catch (error: any) {
      let msg = '다시 시도해 주세요😥';
      if (error.message == NOT_USER_PW_ERR_CODE) {
        msg = '비밀번호가 일치하지 않습니다.';
        setError('cur_password', { message: msg });
      }
      toaster.create({
        title: '변경 실패!',
        description: msg,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <ScreenLoading />}
      <form
        className="flex flex-col gap-5 w-[400px]"
        onSubmit={handleSubmit(handleEditSubmit)}
      >
        <h2 className="text-32 font-700">비밀번호 변경</h2>
        <Input
          register={register('cur_password', { required: REQUIRED_INPUT })}
          label="현재 비밀번호"
          placeholder="현재 비밀번호를 입력해 주세요."
          type="password"
          error={errors.cur_password}
        />
        <Input
          register={register('new_password', { required: REQUIRED_INPUT })}
          label="새로운 비밀번호"
          placeholder="새로운 비밀번호를 입력해 주세요."
          type="password"
          error={errors.new_password}
        />
        <Input
          register={register('new_password_check', {
            required: REQUIRED_INPUT,
          })}
          label="새로운 비밀번호 확인"
          placeholder="새로운 비밀번호를 다시 입력해 주세요."
          type="password"
          error={errors.new_password_check}
        />
        <Button disabled={!isEdit}>수정하기</Button>
      </form>
    </>
  );
}

export default PasswordEditBox;
