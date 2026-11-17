import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { DEFAULT_LOCALE, LOCALES } from "@/i18n/locales";
import { localizedPath } from "@/lib/i18n/routing";
import { getSubdomainFromHost } from "@/lib/subdomains";

const LOCALE_PREFIX = new RegExp(`^/(${LOCALES.join("|")})(/|$)`);

function shouldBypass(pathname: string): boolean {
  return (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/og") ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (shouldBypass(pathname)) {
    return NextResponse.next();
  }

  const host =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    "";
  const subdomain = getSubdomainFromHost(host);

  if (subdomain) {
    if (pathname.startsWith("/subdomains/")) {
      const response = NextResponse.next();
      response.headers.set("x-purepdf-subdomain", subdomain);
      return response;
    }

    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = `/subdomains/${subdomain}${pathname === "/" ? "" : pathname}`;

    const response = NextResponse.rewrite(rewriteUrl);
    response.headers.set("x-purepdf-subdomain", subdomain);
    return response;
  }

  if (pathname.startsWith("/subdomains/")) {
    const response = NextResponse.next();
    response.headers.set("x-purepdf-subdomain", "hub");
    return response;
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