import { api } from '@/utils/api';

/**
 * @param id 찾고자 하는 유저의 id
 * @return 유저의 nickname
 */
export const useGetUserName = async (id: number) => {
  try {
    const res = await api('GET', `/api/members/${id}`);
    // console.log(res);
    if (typeof res === 'string') throw Error();
    return res.nickname;
  } catch (err) {
    return '(알 수 없음)';
  }
};
