import { SERVER_ERR } from '@/constants/errorMsg';
import { PostLoginReq, PostSignUpReq, PostSignUpRes } from '@/types/api/auth';

type methodType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

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

type endPointType = keyof PostType;

export const api = async <T extends endPointType>(method: methodType, url: T, body?: PostType[T]['req']): Promise<PostType[T]['res']> => {
  try {
    const res = await fetch(`/proxy/${url}`, {
      method: method,
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include',
      body: body ? JSON.stringify(body) : null,
    });
    if (res.status === 500) throw Error(`500/${SERVER_ERR}`);

    const resObj = await res.json();
    if (resObj.code) throw Error(`${resObj.code}/${resObj.message}`);

    return resObj;
  } catch (err: any) {
    const [code, msg] = err.message.split('/');
    if (code == 500) alert(`⚠️ ${msg}`);
    return code;
  }
};
