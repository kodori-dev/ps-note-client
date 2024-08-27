import { SERVER_ERR } from '@/constants/errorMsg';
import { GetMembersRes, PostLoginReq, PostSignUpReq, PostSignUpRes } from '@/types/api/auth';
import { GetProblemsRes } from '@/types/api/problem';
import { PostSolReq, PostSolRes } from '@/types/api/solution';
import { GetStarsRes, PostStarReq } from '@/types/api/star';

type GetType = {
  '/api/me': {
    req: null;
    res: PostSignUpRes;
  };
  '/api/members': {
    req: null;
    res: GetMembersRes;
  };
  [key: `/api/members/${string}`]: {
    req: null;
    res: PostSignUpRes;
  };
  '/api/problems': {
    req: null;
    res: GetProblemsRes;
    query: {
      boj_id?: string;
      order_by?: 'id' | '-id' | 'stars' | '-stars' | 'solutions' | '-solutions';
      page?: number;
      page_size?: number;
      submitted_at?: string;
      submitted_at__end?: string;
      submitted_at__start?: string;
    };
  };
  '/api/problems/search': {
    req: null;
    res: GetProblemsRes;
    query: {
      boj_id?: string;
      order_by?: 'id' | '-id' | 'stars' | '-stars' | 'solutions' | '-solutions';
      page?: number;
      page_size?: number;
      query?: string;
      submitted_at?: string;
      submitted_at__end?: string;
      submitted_at__start?: string;
    };
  };
  '/api/problem-stars': {
    req: null;
    res: GetStarsRes;
    query: {
      member_id: number;
      problem_id?: number;
    };
  };
};
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
  '/api/problem-stars': {
    req: PostStarReq;
    res: PostStarReq;
  };
}

interface DeleteType {
  [key: `/api/problem-stars/${string}`]: {
    req: null;
    res: null;
  };
}

const RES_BODY_NULL = ['/api/auth/login'];

interface BodyType {
  GET: GetType;
  POST: PostType;
  DELETE: DeleteType;
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
    return code;
  }
};
