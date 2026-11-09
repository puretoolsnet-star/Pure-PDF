import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { DEFAULT_LOCALE, LOCALES } from "@/i18n/locales";
import { localizedPath } from "@/lib/i18n/routing";

const LOCALE_PREFIX = new RegExp(`^/(${LOCALES.join("|")})(/|$)`);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/og") ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  let response: NextResponse;

  if (pathname === "/") {
    response = NextResponse.redirect(
      new URL(localizedPath(DEFAULT_LOCALE, "/"), request.url),
    );
  } else if (pathname.startsWith("/tools/")) {
    response = NextResponse.redirect(
      new URL(localizedPath(DEFAULT_LOCALE, pathname), request.url),
    );
  } else {
    response = NextResponse.next();
  }

  const localeMatch = pathname.match(LOCALE_PREFIX);
  const locale = localeMatch?.[1] ?? DEFAULT_LOCALE;
  response.headers.set("x-purepdf-locale", locale);

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
