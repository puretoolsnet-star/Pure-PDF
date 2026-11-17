import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { DEFAULT_LOCALE, LOCALES } from "@/i18n/locales";
import { localizedPath } from "@/lib/i18n/routing";
import { applyMiddlewareRateLimit } from "@/lib/bot-protection/middleware-rate-limit";
import {
  getSubdomainFromHost,
  normalizeSubdomainSlug,
  subdomainRoutePath,
} from "@/lib/subdomains";

const LOCALE_PREFIX = new RegExp(`^/(${LOCALES.join("|")})(/|$)`);

function shouldBypass(pathname: string): boolean {
  return (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/og") ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  );
}

function pathSubdomainSlug(pathname: string): string | null {
  if (!pathname.startsWith("/subdomains/")) {
    return null;
  }
  const slug = pathname.split("/")[2];
  return slug ? normalizeSubdomainSlug(slug) : null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (shouldBypass(pathname)) {
    if (pathname.startsWith("/api")) {
      const apiLimit = applyMiddlewareRateLimit(request);
      if (apiLimit) return apiLimit;
    }
    return NextResponse.next();
  }

  const rateLimitResponse = applyMiddlewareRateLimit(request);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const host =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    "";
  const hostSubdomain = getSubdomainFromHost(host);

  if (hostSubdomain) {
    const active = normalizeSubdomainSlug(hostSubdomain);
    const canonicalPath = subdomainRoutePath(active);
    const pathSlug = pathSubdomainSlug(pathname);

    if (pathSlug && pathSlug !== active) {
      const url = request.nextUrl.clone();
      url.pathname = canonicalPath;
      return NextResponse.redirect(url);
    }

    if (pathname.startsWith("/subdomains/")) {
      const response = NextResponse.next();
      response.headers.set("x-purepdf-subdomain", active);
      return response;
    }

    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = canonicalPath;
    const response = NextResponse.rewrite(rewriteUrl);
    response.headers.set("x-purepdf-subdomain", active);
    return response;
  }

  if (pathname.startsWith("/subdomains/")) {
    const slug = pathSubdomainSlug(pathname) ?? "hub";
    const response = NextResponse.next();
    response.headers.set("x-purepdf-subdomain", slug);
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