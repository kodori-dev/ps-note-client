import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const isLogin = req.cookies.has('sessionid');
  if (!isLogin) return NextResponse.redirect(new URL('/login', req.url));

  const path = req.nextUrl.pathname;
  if (path === '/search') {
    const reqHeaders = new Headers(req.headers);
    const keyword = req.nextUrl.searchParams.get('keyword') || '';
    const page = req.nextUrl.searchParams.get('page') || '';
    const encodedKeyword = encodeURIComponent(keyword);
    const res = NextResponse.next({
      request: {
        headers: reqHeaders,
      },
    });
    res.headers.set('x-query-keyword', encodedKeyword);
    res.headers.set('x-query-page', page);
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/attend/:path*', '/problem/:path*', '/solution/:path*', '/post/:path*', '/search/:path*'],
};
