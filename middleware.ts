import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Authorizer } from 'casbin.js';
import permissions from "./permissions.json"

// Define the middleware function
export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl

  // manually set permission
  const role = "TA"
  const auth = new Authorizer("manual");
  auth.setPermission(permissions[role]);
  // Check if the user is accessing a protected route
  try {
    console.log(pathname, origin)
    const res = await auth.can('read',pathname)
    if(!res){
      return NextResponse.redirect(`${origin}/denied`);
    }

  } catch (error) {
    // Redirect the user to the login page if there's an error
    return NextResponse.redirect(`${origin}/404`);
  }
  // Pass the request to the next middleware or route handler
  return NextResponse.next();
}

// Apply the middleware to all requests
export const config = {
  matcher: ['/protected/:path*'],
};