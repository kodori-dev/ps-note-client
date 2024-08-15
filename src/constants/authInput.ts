import { inputType } from '@/types/input';
import { PASSWORD_MIN_LENGTH_ERR, REQUIRED_INPUT } from './errorMsg';

const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_TYPE_LIST = ['password', 'password_check'];

export const LOGIN_INPUT_LIST: inputType[] = [
  {
    label: '아이디',
    placeholder: '아이디를 입력해 주세요.',
    description: undefined,
    id: 'user_id',
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
    },
  },
];

let [id, pw] = [...LOGIN_INPUT_LIST];
pw.rules.minLength = { value: PASSWORD_MIN_LENGTH, message: PASSWORD_MIN_LENGTH_ERR };

export const SIGNUP_INPUT_LIST: inputType[] = [
  id,
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
  pw,
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
