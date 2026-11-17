import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { DEFAULT_LOCALE, LOCALES, isLocale, type Locale } from "@/i18n/locales";
import { localizedPath } from "@/lib/i18n/routing";
import { applyMiddlewareRateLimit } from "@/lib/bot-protection/middleware-rate-limit";
import {
  ecosystemPurePdfUrl,
  subdomainPublicUrl,
} from "@/lib/ecosystem-urls";
import {
  getSubdomainFromHost,
  isKnownSubdomain,
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

function localeFromPathname(pathname: string): Locale {
  const match = pathname.match(LOCALE_PREFIX);
  const code = match?.[1];
  return code && isLocale(code) ? code : DEFAULT_LOCALE;
}

function pathAfterLocale(pathname: string): string {
  const match = pathname.match(LOCALE_PREFIX);
  if (!match) return pathname || "/";
  const rest = pathname.slice(match[0].length);
  return rest === "" ? "/" : rest;
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
  const locale = localeFromPathname(pathname);
  const restPath = pathAfterLocale(pathname);

  if (hostSubdomain) {
    const active = normalizeSubdomainSlug(hostSubdomain);
    const canonicalPath = subdomainRoutePath(active);
    const pathSlug = pathSubdomainSlug(pathname);

    if (pathSlug && pathSlug !== active) {
      return NextResponse.redirect(subdomainPublicUrl(pathSlug, locale));
    }

    if (restPath.startsWith("/tools/")) {
      return NextResponse.redirect(ecosystemPurePdfUrl(locale, restPath));
    }

    if (pathname.startsWith("/subdomains/")) {
      if (pathSlug === active) {
        return NextResponse.redirect(
          new URL(localizedPath(locale, "/"), request.url),
        );
      }
      const response = NextResponse.next();
      response.headers.set("x-purepdf-subdomain", active);
      response.headers.set("x-purepdf-locale", locale);
      return response;
    }

    if (pathname === "/" && !pathname.match(LOCALE_PREFIX)) {
      return NextResponse.redirect(
        new URL(localizedPath(DEFAULT_LOCALE, "/"), request.url),
      );
    }

    if (LOCALE_PREFIX.test(pathname) && (restPath === "/" || restPath === "")) {
      const rewriteUrl = request.nextUrl.clone();
      rewriteUrl.pathname = canonicalPath;
      const response = NextResponse.rewrite(rewriteUrl);
      response.headers.set("x-purepdf-subdomain", active);
      response.headers.set("x-purepdf-locale", locale);
      return response;
    }

    if (!LOCALE_PREFIX.test(pathname) && pathname !== "/") {
      return NextResponse.redirect(
        new URL(localizedPath(locale, restPath), request.url),
      );
    }

    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = canonicalPath;
    const response = NextResponse.rewrite(rewriteUrl);
    response.headers.set("x-purepdf-subdomain", active);
    response.headers.set("x-purepdf-locale", locale);
    return response;
  }

  const publicSubdomainSlug = pathSubdomainSlug(pathname);
  if (
    pathname.startsWith("/subdomains/") &&
    publicSubdomainSlug &&
    isKnownSubdomain(publicSubdomainSlug)
  ) {
    return NextResponse.redirect(
      subdomainPublicUrl(publicSubdomainSlug, locale),
    );
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

  response.headers.set("x-purepdf-locale", locale);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};