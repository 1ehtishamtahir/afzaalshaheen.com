import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password === 'shaheen123') {
      const response = NextResponse.json({ success: true });
      // Set simple cookie
      response.cookies.set('admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });
      return response;
    }

    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');

  if (session && session.value === 'authenticated') {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
