import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from './lib/middleware';

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("main middleware user",user) 
  if (!user && !(request.nextUrl.pathname === '/' || request.nextUrl.pathname.startsWith('/login'))) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return response;
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|auth|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
