'use client';

import Input from '@/components/Input';
import AuthLayout from '@/components/Layout/AuthLayout';
import { PASSWORD_TYPE_LIST, SIGNUP_INPUT_LIST } from '@/constants/authInput';
import { DUPLICATE_ID_ERR_CODE } from '@/constants/errorCode';
import { ALREADY_USER_ERR, PASSWORD_NOT_EQUAL_ERR } from '@/constants/errorMsg';
import { useRedirectLoginUser } from '@/hooks/useCheckLogin';
import { api } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

function Signup() {
  const {
    register,
    formState: { errors },
    getValues,
    setError,
    handleSubmit,
  } = useForm({ mode: 'onBlur', shouldFocusError: true });
  const router = useRouter();
  const login = useRedirectLoginUser();

  const handleSignupSubmit = async () => {
    const { user_id, name, boj_id, password, password_check } = getValues();
    if (password !== password_check) {
      setError('password_check', { message: PASSWORD_NOT_EQUAL_ERR });
      return;
    }
    try {
      const res = await api('POST', '/api/auth/signup', { username: user_id, password, nickname: name, boj_id });
      if (typeof res === 'string') throw Error(res);

      alert(`${res.nickname}님 가입을 환영해요!`);
      router.push('/login');
    } catch (error: any) {
      if (error.message === DUPLICATE_ID_ERR_CODE) setError('user_id', { message: ALREADY_USER_ERR }, { shouldFocus: true });
    }
  };

  return (
    <AuthLayout title="회원가입" submitFunc={handleSubmit(handleSignupSubmit)}>
      {SIGNUP_INPUT_LIST.map(({ label, placeholder, description, id, rules }) => (
        <Input
          key={id}
          type={PASSWORD_TYPE_LIST.includes(id) ? 'password' : 'text'}
          label={label}
          placeholder={placeholder}
          description={description}
          error={errors[id]}
          register={register(id, rules)}
        />
      ))}
    </AuthLayout>
  );
}

export default Signup;
