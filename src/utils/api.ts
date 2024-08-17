import { SERVER_ERR } from '@/constants/errorMsg';
import { GetMembersRes, PostLoginReq, PostSignUpReq, PostSignUpRes } from '@/types/api/auth';

interface GetType {
  '/api/me': {
    req: null;
    res: PostSignUpRes;
  };
  '/api/members/': {
    req: null;
    res: GetMembersRes;
  };
}
interface PostType {
  '/api/auth/login': {
    req: PostLoginReq;
    res: null;
  };
  '/api/auth/signup': {
    req: PostSignUpReq;
    res: PostSignUpRes;
  };
}

const RES_BODY_NULL = ['/api/auth/login'];

interface BodyType {
  GET: GetType;
  POST: PostType;
}
type methodType = keyof BodyType;
type BodyInterfaceType<V> = V extends { res: any; req: any } ? V : never;

export const api = async <M extends methodType, T extends keyof BodyType[M]>(
  method: M,
  url: T,
  body?: BodyInterfaceType<BodyType[M][T]>['req']
): Promise<BodyInterfaceType<BodyType[M][T]>['res']> => {
  try {
    const res = await fetch(`/proxy${String(url)}`, {
      method: method,
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include',
      body: body ? JSON.stringify(body) : null,
    });
    if (res.status >= 500) throw Error(`500/${SERVER_ERR}`);
    if (res.status !== 200) {
      const resObj = await res.json();
      throw Error(`${resObj.code}/${resObj.message}`);
    }
    if (RES_BODY_NULL.includes(String(url))) return null;
    return await res.json();
  } catch (err: any) {
    const [code, msg] = err.message.split('/');
    if (code == 500) alert(msg);
    return code;
  }
};
