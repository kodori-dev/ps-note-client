import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isLogin = req.cookies.has("sessionid");
  if (!isLogin) return NextResponse.redirect(new URL("/login", req.url));

  const path = req.nextUrl.pathname;
  if (path === "/search") {
    const reqHeaders = new Headers(req.headers);
    const keyword = req.nextUrl.searchParams.get("keyword") || "";
    const page = req.nextUrl.searchParams.get("page") || "";
    const encodedKeyword = encodeURIComponent(keyword);
    const res = NextResponse.next({
      request: {
        headers: reqHeaders,
      },
    });
    res.headers.set("x-query-keyword", encodedKeyword);
    res.headers.set("x-query-page", page);
    return res;
  }

  if (path === "/admin") {
    const reqHeaders = new Headers(req.headers);
    const day = req.nextUrl.searchParams.get("day") || "";
    const res = NextResponse.next({
      request: {
        headers: reqHeaders,
      },
    });
    res.headers.set("x-query-day", day);
    return res;
  }

  if (path.startsWith("/attend")) {
    const reqHeaders = new Headers(req.headers);
    const year = req.nextUrl.searchParams.get("yy") || "";
    const month = req.nextUrl.searchParams.get("mm") || "";
    const res = NextResponse.next({
      request: {
        headers: reqHeaders,
      },
    });
    res.headers.set("x-attend-yy", year);
    res.headers.set("x-attend-mm", month);
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/attend/:path*", "/problem/:path*", "/solution/:path*", "/post/:path*", "/search/:path*", "/admin/:path"],
};
