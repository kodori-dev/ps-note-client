'use client';

import Input from '@/components/Input';
import AuthLayout from '@/components/Layout/AuthLayout';
import { PASSWORD_MIN_LENGTH_ERR, PASSWORD_NOT_EQUAL_ERR, REQUIRED_INPUT } from '@/constants/errorMsg';
import { inputType } from '@/types/input';
import { useForm } from 'react-hook-form';

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_TYPE_LIST = ['password', 'passwordCheck'];
const INPUT_LIST: inputType[] = [
  {
    label: '아이디',
    placeholder: '아이디를 입력해 주세요.',
    description: undefined,
    id: 'userId',
    rules: {
      required: REQUIRED_INPUT,
    },
  },
  {
    label: '이름',
    placeholder: '이름(실명)을 입력해 주세요.',
    description: undefined,
    id: 'name',
    rules: {
      required: REQUIRED_INPUT,
    },
  },
  {
    label: 'BOJ 아이디',
    placeholder: 'BOJ 아이디를 입력해 주세요.',
    description: undefined,
    id: 'boj_id',
    rules: {
      required: REQUIRED_INPUT,
    },
  },
  {
    label: '비밀번호',
    placeholder: '비밀번호를 입력해 주세요.',
    description: `${PASSWORD_MIN_LENGTH}자 이상`,
    id: 'password',
    rules: {
      required: REQUIRED_INPUT,
      minLength: { value: PASSWORD_MIN_LENGTH, message: PASSWORD_MIN_LENGTH_ERR },
    },
  },
  {
    label: '비밀번호 확인',
    placeholder: '비밀번호를 다시 입력해 주세요.',
    description: undefined,
    id: 'password_check',
    rules: {
      required: REQUIRED_INPUT,
    },
  },
];

function Signup() {
  const {
    register,
    formState: { errors },
    getValues,
    setError,
    handleSubmit,
  } = useForm({ mode: 'onBlur', shouldFocusError: true });

  const handleSignupSubmit = () => {
    const { userId, name, boj_id, password, password_check } = getValues();
    if (password !== password_check) {
      setError('password_check', { message: PASSWORD_NOT_EQUAL_ERR });
      return;
    }
    console.log('회원가입 로직');
  };

  return (
    <AuthLayout title="회원가입" submitFunc={handleSubmit(handleSignupSubmit)}>
      {INPUT_LIST.map(({ label, placeholder, description, id, rules }) => (
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
      <button className="mt-14 h-[54px] bg-primary text-white rounded-md hover:bg-primary-hover">회원가입</button>
    </AuthLayout>
  );
}

export default Signup;
