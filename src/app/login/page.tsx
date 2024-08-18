'use client';
import Input from '@/components/Input';
import AuthLayout from '@/components/Layout/AuthLayout';
import { LOGIN_INPUT_LIST, PASSWORD_TYPE_LIST } from '@/constants/authInput';
import { FAIL_LOGIN_ERR_CODE } from '@/constants/errorCode';
import { FAIL_LOGIN_ERR } from '@/constants/errorMsg';
import { api } from '@/utils/api';
import { useState } from 'react';
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

  const handleLoginSubmit = async () => {
    setIsLoading(true);
    const { user_id, password } = getValues();
    try {
      const res = await api('POST', '/api/auth/login', { username: user_id, password });
      if (typeof res === 'string') throw Error(res);
      window.location.href = '/';
    } catch (error: any) {
      if (error.message === FAIL_LOGIN_ERR_CODE) {
        setError('user_id', { message: FAIL_LOGIN_ERR });
        setError('password', { message: FAIL_LOGIN_ERR });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="로그인" submitFunc={handleSubmit(handleLoginSubmit)} isLoading={isLoading}>
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
  );
}

export default Login;
