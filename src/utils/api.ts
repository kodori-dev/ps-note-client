import { SERVER_ERR } from '@/constants/errorMsg';
import { GetMembersRes, PostLoginReq, PostSignUpReq, PostSignUpRes } from '@/types/api/auth';
import { GetProblemsRes } from '@/types/api/problem';
import { PostSolReq, PostSolRes } from '@/types/api/solution';

interface GetType {
  '/api/me': {
    req: null;
    res: PostSignUpRes;
  };
  '/api/members/': {
    req: null;
    res: GetMembersRes;
  };
  '/api/problems': {
    req: null;
    res: GetProblemsRes;
    query: {
      order_by?: 'id' | '-id' | 'stars' | '-stars';
      page?: number;
      page_size?: number;
      query?: string;
      solved_at?: string | Date;
      boj_id?: string;
    };
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
  '/api/solutions': {
    req: PostSolReq;
    res: PostSolRes;
  };
}

const RES_BODY_NULL = ['/api/auth/login'];

interface BodyType {
  GET: GetType;
  POST: PostType;
}
type methodType = keyof BodyType;
type BodyInterfaceType<V> = V extends { res: any; req: any; query?: any } ? V : never;

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
    const res = await fetch(`/proxy${String(url)}${queryString}`, {
      method: method,
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include',
      body: body ? JSON.stringify(body) : null,
      cache: 'no-cache',
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
