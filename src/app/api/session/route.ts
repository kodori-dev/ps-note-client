import { sessionOptions } from '@/constants/userSession';
import { UserSessionType } from '@/types/userSession';
import { getUserSession } from '@/utils/getUserSession';
import { getIronSession } from 'iron-session';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const session = await getUserSession();
  return NextResponse.json(session);
}

export async function DELETE() {
  const session = await getUserSession();
  session.destroy();

  revalidatePath('/', 'layout');

  return NextResponse.json({ ok: true });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const session = await getIronSession<UserSessionType>(cookies(), sessionOptions);

  session.nickname = body.nickname;
  session.userId = body.userId;
  session.isLogin = true;

  await session.save();
  revalidatePath('/', 'layout');

  return NextResponse.json({ ok: true, cookies: session });
}
