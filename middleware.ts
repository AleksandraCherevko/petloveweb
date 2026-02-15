// /Users/Heyshurka/Desktop/petloveweb/middleware.ts
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/home", "/news", "/notices", "/friends"];
const PUBLIC_ONLY_ROUTES = ["/register", "/login"]; // only for guests
const PRIVATE_ROUTES = ["/profile", "/add-pet"]; // only for authorized users

function isExactOrNested(pathname: string, route: string) {
  return pathname === route || pathname.startsWith(`${route}/`);
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token =
    req.cookies.get("token")?.value ?? req.cookies.get("accessToken")?.value;
  const isAuth = Boolean(token);

  // Redirect root to /home
  if (pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/home";
    return NextResponse.redirect(url);
  }

  const isPublic = PUBLIC_ROUTES.some((r) => isExactOrNested(pathname, r));
  const isPublicOnly = PUBLIC_ONLY_ROUTES.some((r) =>
    isExactOrNested(pathname, r),
  );
  const isPrivate = PRIVATE_ROUTES.some((r) => isExactOrNested(pathname, r));

  // Guests cannot access private pages
  if (isPrivate && !isAuth) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Authorized users should not access /login and /register
  if (isPublicOnly && isAuth) {
    const url = req.nextUrl.clone();
    url.pathname = "/profile";
    return NextResponse.redirect(url);
  }

  // Public pages are always accessible
  if (isPublic || isPrivate || isPublicOnly) {
    return NextResponse.next();
  }

  // Fallback (for any other app routes): allow
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Run on app routes, skip api and static assets
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
