import { cookies } from 'next/headers';
import { BodyInterfaceType, GetType } from './api';
import { UNAUTHORIZED_ERR_CODE } from '@/constants/errorCode';
import { redirect } from 'next/navigation';

/**
 * SSR을 위한 API fetch 함수
 */
export const getServerData = async <T extends keyof GetType>(url: T, query?: any): Promise<BodyInterfaceType<T>['res']> => {
  const cookie = cookies();

  let queryStr = '';
  if (query) {
    for (let key of Object.keys(query)) {
      queryStr += `${key}=${query[key]}&`;
    }
  }

  try {
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_API_BASE_URL}${url}?${queryStr}`, {
      headers: { Cookie: cookie.toString() || '' },
    });
    if (res.ok) return await res.json();

    const resObj = await res.json();
    throw Error(`${resObj.code}/${resObj.message}`);
  } catch (err: any) {
    const [code, msg] = err.message.split('/');
    if (code == UNAUTHORIZED_ERR_CODE) {
      redirect('/login');
    }
    return null;
  }
};
