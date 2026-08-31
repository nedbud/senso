import { NextResponse, type NextRequest } from "next/server";

/**
 * Exposes the request path to the root layout so it can set <html lang>
 * correctly for the /en subtree. Next does not pass pathname to layouts, and
 * a single root layout cannot vary its lang attribute any other way without
 * moving every existing URL under a /[lang] segment — which would throw away
 * the ranking the current URLs already have.
 */
export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets).*)"],
};
