import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define the middleware function
export async function middleware(request: NextRequest) {

  // change the params for testing
  const { subject, object, action } = {subject:"oscar",object:"/protected/1029",action:"read"}

  const res = await fetch(`http://localhost:9000/verify_role?subject=${subject}&object=${object}&action=${action}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const r = await res.json()
  const result: Boolean = r["allowed"]
  console.log(r)

  if (result===true) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL(request.nextUrl.protocol + '//' + request.nextUrl.host + '/denied'));
  }
}

// Apply the middleware to all requests
export const config = {
  matcher: ['/protected/:path*'],
};