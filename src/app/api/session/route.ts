import { UserSessionType } from '@/types/userSession';
import { sessionOptions } from '@/utils/getUserSession';
import { getIronSession } from 'iron-session';
import { NextApiRequest, NextApiResponse } from 'next';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const session = await getIronSession<UserSessionType>(cookies(), sessionOptions);

  session.nickname = body.nickname;
  session.userId = body.userId;
  session.isLogin = true;

  await session.save();
  revalidatePath('/', 'layout');

  return NextResponse.json({ ok: true });
}
