import { UNAUTHORIZED_ERR_CODE } from '@/constants/errorCode';
import { SERVER_ERR } from '@/constants/errorMsg';
import { DeleteType } from '@/types/api/delete';
import { GetType } from '@/types/api/get';
import { PatchType } from '@/types/api/patch';
import { PostType } from '@/types/api/post';
import { logout } from './logout';

const RES_BODY_NULL = ['/coupons/use', '/auth/logout'];

interface BodyType {
  GET: GetType;
  POST: PostType;
  PATCH: PatchType;
  DELETE: DeleteType;
}
type methodType = keyof BodyType;
export type BodyInterfaceType<V> = V extends { res: any; req: any; query?: any } ? V : never;

export const api = async <M extends methodType, T extends keyof BodyType[M]>(
  method: M,
  url: T,
  body?: BodyInterfaceType<BodyType[M][T]>['req'],
  query?: BodyInterfaceType<BodyType[M][T]>['query']
): Promise<BodyInterfaceType<BodyType[M][T]>['res']> => {
  try {
    let queryString = '?';
    if (query) {
      Object.keys(query).map((key) => (query[key] ? (queryString += `${key}=${query[key]}&`) : null));
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL ?? process.env.API_SERVER_URL}${String(url)}${queryString}`, {
      method: method,
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include',
      body: body ? JSON.stringify(body) : null,
      cache: 'no-cache',
    });

    if (res.status >= 500) throw Error(`500/${SERVER_ERR}`);
    if (!res.ok) {
      const resObj = await res.json();
      throw Error(`${resObj.code}/${resObj.message}`);
    }
    if (method === 'DELETE') return null;
    if (RES_BODY_NULL.includes(String(url))) return null;
    return await res.json();
  } catch (err: any) {
    const [code, msg] = err.message.split('/');
    if (code == 500) alert(msg);
    if (code == UNAUTHORIZED_ERR_CODE) {
      alert('세션이 만료됐어요!\n다시 로그인해 주세요.');
      await logout();
      if(window.location.pathname !== '/login') window.location.href = '/login';
    }
    return err.message;
  }
};
