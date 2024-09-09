import { SERVER_ERR } from '@/constants/errorMsg';
import { GetMembersRes, PostLoginReq, PostSignUpReq, PostSignUpRes } from '@/types/api/auth';
import { CouponType, GetCouponsRes, PatchCouponReq } from '@/types/api/coupon';
import { GetHolidayRes } from '@/types/api/holiday';
import { GetPenaltiesRes } from '@/types/api/penalty';
import { GetProblemsRes } from '@/types/api/problem';
import { PostSolReq, PostSolRes, SolutionType } from '@/types/api/solution';
import { GetStarsRes, PostStarReq } from '@/types/api/star';

export type GetType = {
  '/me': {
    req: null;
    res: PostSignUpRes;
  };
  '/members': {
    req: null;
    res: GetMembersRes;
  };
  [key: `/members/${string}`]: {
    req: null;
    res: PostSignUpRes;
  };
  '/problems': {
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
  '/problems/search': {
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
  '/problem-stars': {
    req: null;
    res: GetStarsRes;
    query: {
      member_id: number;
      problem_id?: number;
    };
  };
  [key: `/solutions/${string}`]: {
    req: null;
    res: SolutionType;
  };
  '/penalties': {
    req: null;
    res: GetPenaltiesRes;
    query: {
      end_date: string;
      member_id?: number;
      order_by?: '-day' | '-id' | '-member' | 'day' | 'id' | 'member';
      start_date: string;
    };
  };
  '/holidays': {
    req: null;
    res: GetHolidayRes;
    query: {
      year: number;
    };
  };
  '/coupons': {
    req: null;
    res: GetCouponsRes;
    query: {
      date?: string;
      member_id?: number;
      usable?: boolean;
    };
  };
};
interface PostType {
  '/auth/login': {
    req: PostLoginReq;
    res: null;
  };
  '/auth/signup': {
    req: PostSignUpReq;
    res: PostSignUpRes;
  };
  '/solutions': {
    req: PostSolReq;
    res: PostSolRes;
  };
  '/problem-stars': {
    req: PostStarReq;
    res: PostStarReq;
  };
}

interface PatchType {
  [key: `/coupons/${string}`]: {
    req: PatchCouponReq;
    res: CouponType;
  };
}

interface DeleteType {
  [key: `/problem-stars/${string}`]: {
    req: null;
    res: null;
  };
}

const RES_BODY_NULL = ['/auth/login'];

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
