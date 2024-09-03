import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const response = NextResponse.json({ message: 'Set user cookie.' });

  response.cookies.set('f-user_nickname', body.nickname, {
    httpOnly: true,
    sameSite: 'strict',
  });

  response.cookies.set('f-user_id', body.memberId, {
    httpOnly: true,
    sameSite: 'strict',
  });

  return response;
}
