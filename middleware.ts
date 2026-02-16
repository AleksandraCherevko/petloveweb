import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/home", "/news", "/notices", "/friends"];
const PUBLIC_ONLY_ROUTES = ["/register", "/login"];
const PRIVATE_ROUTES = ["/profile", "/add-pet"];

function isExactOrNested(pathname: string, route: string) {
  return pathname === route || pathname.startsWith(`${route}/`);
}

function isTokenExpired(token: string): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return true;

    const payloadBase64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = payloadBase64.padEnd(
      payloadBase64.length + ((4 - (payloadBase64.length % 4)) % 4),
      "=",
    );

    const payloadJson = atob(padded);
    const payload = JSON.parse(payloadJson) as { exp?: number };

    if (!payload.exp) return true;
    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token =
    req.cookies.get("token")?.value ?? req.cookies.get("accessToken")?.value;

  const isAuth = token ? !isTokenExpired(token) : false;

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

  if (isPrivate && !isAuth) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    const res = NextResponse.redirect(url);
    res.cookies.set("token", "", { path: "/", maxAge: 0 });
    res.cookies.set("accessToken", "", { path: "/", maxAge: 0 });
    return res;
  }

  if (isPublicOnly && isAuth) {
    const url = req.nextUrl.clone();
    url.pathname = "/profile";
    return NextResponse.redirect(url);
  }

  if (isPublic || isPrivate || isPublicOnly) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
