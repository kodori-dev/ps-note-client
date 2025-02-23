'use client';
import Input from '@/components/Input';
import AuthLayout from '@/components/Layout/AuthLayout';
import MetaTag from '@/components/MetaTag';
import { toaster } from '@/components/ui/toaster';
import { LOGIN_INPUT_LIST, PASSWORD_TYPE_LIST } from '@/constants/authInput';
import { FAIL_LOGIN_ERR_CODE } from '@/constants/errorCode';
import { FAIL_LOGIN_ERR } from '@/constants/errorMsg';
import { api } from '@/utils/api';
import { logout } from '@/utils/logout';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

function Login() {
  const {
    register,
    formState: { errors },
    getValues,
    setError,
    handleSubmit,
  } = useForm({ mode: 'onBlur', shouldFocusError: true });
  const [isLoading, setIsLoading] = useState(false);
  const [isLogout, setIsLogout] = useState(true);

  const handleLoginSubmit = async () => {
    setIsLogout(false);
    setIsLoading(true);
    const { user_id, password } = getValues();
    try {
      const res = await api('POST', '/auth/login', {
        username: user_id,
        password,
      });
      if (typeof res === 'string') throw Error(res);
      const member = await api('GET', '/me');
      toaster.create({
        title: `${member.nickname}님 환영해요!`,
        description: '문제 풀고 부자되세요😎',
        type: 'success',
      });

      await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/front/session`, {
        method: 'POST',
        body: JSON.stringify({ userId: member.id, nickname: member.nickname }),
      });

      window.location.href = '/';
    } catch (error: any) {
      toaster.create({
        title: '로그인 실패!',
        description: '다시 시도해 주세요😥',
        type: 'error',
      });
      if (error.message === FAIL_LOGIN_ERR_CODE) {
        setError('user_id', { message: FAIL_LOGIN_ERR });
        setError('password', { message: FAIL_LOGIN_ERR });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLogout) {
      setIsLoading(true);
      logout();
      setIsLoading(false);
    }
  }, [isLogout]);

  return (
    <>
      <MetaTag title="로그인" />
      <AuthLayout
        title="로그인"
        submitFunc={handleSubmit(handleLoginSubmit)}
        isLoading={isLoading}
      >
        {LOGIN_INPUT_LIST.map(({ label, placeholder, id }) => (
          <Input
            key={id}
            type={PASSWORD_TYPE_LIST.includes(id) ? 'password' : 'text'}
            label={label}
            placeholder={placeholder}
            error={errors[id]}
            register={register(id)}
          />
        ))}
      </AuthLayout>
    </>
  );
}

export default Login;
