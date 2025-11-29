import { cookies } from 'next/headers';
import { BodyInterfaceType } from './api';
import { NOT_FOUND_SOL_ERR_CODE, UNAUTHORIZED_ERR_CODE } from '@/constants/errorCode';
import { redirect } from 'next/navigation';
import { GetType } from '@/types/api/get';

/**
 * SSR을 위한 API fetch 함수
 */
export const getServerData = async <T extends keyof GetType>(
  url: T,
  query?: BodyInterfaceType<GetType[T]>['query']
): Promise<BodyInterfaceType<GetType[T]>['res']> => {
  const cookie = cookies();

  let queryStr = '';
  if (query) {
    for (const key of Object.keys(query)) {
      queryStr += `${key}=${(query as any)[key]}&`;
    }
  }

  try {
    const res = await fetch(`${process.env.API_SERVER_URL}${url}?${queryStr}`, {
      headers: { Cookie: cookie.toString() || '' },
    });
    if (res.ok) return await res.json();

    const resObj = await res.json();
    throw Error(`${resObj.code}/${resObj.message}`);
  } catch (err: any) {
    const [code, msg] = err.message.split('/');
    if (code == NOT_FOUND_SOL_ERR_CODE) redirect('/404');
    if (code == UNAUTHORIZED_ERR_CODE) {
      redirect('/login');
    }
    return err;
  }
};
