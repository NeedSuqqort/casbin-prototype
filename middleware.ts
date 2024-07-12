import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from './utils/casbin';
import { newEnforcer } from 'casbin';

// Define the middleware function
export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  console.log(pathname,origin)
  // Check if the user is accessing a protected route
  if (pathname.startsWith('/protected')) {
    try {
      // Get the user session from the request
      const session = await getSession(req);

      if (!session || !session.user) {
        // Redirect the user to the login page if not authenticated
        return NextResponse.redirect(`${origin}/404`);
      }
      // Check if the user is authorized using Casbin
      const subject = session.user.role;
      const object = pathname;
      const action = req.method;

      const enforcer = await newEnforcer('utils/model.conf', 'utils/policy.csv');

      const authorized = true;
      //const authorized = await enforcer.enforce(subject, object, action);

      if (!authorized) {
        // Redirect the user to the login page if not authorized
        return NextResponse.redirect(new URL('/403', req.url));
      }
    } catch (error) {
      // Redirect the user to the login page if there's an error
      return NextResponse.redirect(`${origin}/404`);
    }
  }

  // Pass the request to the next middleware or route handler
  return NextResponse.next();
}

// Apply the middleware to all requests
export const config = {
  matcher: ['/protected/:path*'],
};