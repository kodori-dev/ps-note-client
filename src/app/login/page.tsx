'use client';
import Input from '@/components/Input';
import AuthLayout from '@/components/Layout/AuthLayout';
import { LOGIN_INPUT_LIST, PASSWORD_TYPE_LIST } from '@/constants/authInput';
import { FAIL_LOGIN_ERR_CODE } from '@/constants/errorCode';
import { FAIL_LOGIN_ERR } from '@/constants/errorMsg';
import { api } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

function Login() {
  const {
    register,
    formState: { errors },
    getValues,
    setError,
    handleSubmit,
  } = useForm({ mode: 'onBlur', shouldFocusError: true });
  const router = useRouter();

  const handleLoginSubmit = async () => {
    const { user_id, password } = getValues();
    try {
      const res = await api('POST', '/api/auth/login', { username: user_id, password });
      if (typeof res === 'string') throw Error(res);
    } catch (error: any) {
      if (error.message === FAIL_LOGIN_ERR_CODE) {
        setError('user_id', { message: FAIL_LOGIN_ERR });
        setError('password', { message: FAIL_LOGIN_ERR });
      }
    }
  };

  return (
    <AuthLayout title="로그인" submitFunc={handleSubmit(handleLoginSubmit)}>
      {LOGIN_INPUT_LIST.map(({ label, placeholder, id, rules }) => (
        <Input
          key={id}
          type={PASSWORD_TYPE_LIST.includes(id) ? 'password' : 'text'}
          label={label}
          placeholder={placeholder}
          error={errors[id]}
          register={register(id, rules)}
        />
      ))}
    </AuthLayout>
  );
}

export default Login;
