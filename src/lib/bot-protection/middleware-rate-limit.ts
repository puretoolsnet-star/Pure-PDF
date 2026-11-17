import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type Bucket = {
  count: number;
  windowStart: number;
};

type RateLimitConfig = {
  windowMs: number;
  maxRequests: number;
};

type GlobalRateLimitStore = typeof globalThis & {
  __purepdfRateLimit?: Map<string, Bucket>;
};

const store: Map<string, Bucket> =
  (globalThis as GlobalRateLimitStore).__purepdfRateLimit ??
  new Map<string, Bucket>();
(globalThis as GlobalRateLimitStore).__purepdfRateLimit = store;

const PAGE_LIMIT: RateLimitConfig = { windowMs: 60_000, maxRequests: 180 };
const API_LIMIT: RateLimitConfig = { windowMs: 60_000, maxRequests: 40 };
const SUSPICIOUS_LIMIT: RateLimitConfig = { windowMs: 60_000, maxRequests: 24 };

const SEARCH_ENGINE_UA =
  /googlebot|bingbot|applebot|yandexbot|duckduckbot|slurp|baiduspider|facebookexternalhit|twitterbot|linkedinbot|discordbot|telegrambot|whatsapp|semrushbot|ahrefsbot/i;

const SUSPICIOUS_UA =
  /^$|curl\/|wget\/|python-requests|scrapy|httpclient|java\/|libwww|go-http-client|axios\/|node-fetch|headlesschrome|phantomjs|puppeteer|playwright|bytespider|petalbot/i;

const MAX_BUCKETS = 8_000;

function pruneStore(now: number): void {
  if (store.size <= MAX_BUCKETS) return;
  for (const [key, bucket] of store) {
    if (now - bucket.windowStart > 120_000) store.delete(key);
    if (store.size <= MAX_BUCKETS * 0.75) break;
  }
}

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  return "unknown";
}

function limitsForRequest(
  request: NextRequest,
  pathname: string,
): RateLimitConfig {
  const ua = request.headers.get("user-agent") ?? "";
  if (SUSPICIOUS_UA.test(ua)) return SUSPICIOUS_LIMIT;
  if (pathname.startsWith("/api/")) return API_LIMIT;
  return PAGE_LIMIT;
}

function rateLimitKey(ip: string, pathname: string, config: RateLimitConfig) {
  const scope = pathname.startsWith("/api/") ? "api" : "page";
  return `${scope}:${ip}`;
}

function isLimited(
  key: string,
  config: RateLimitConfig,
  now: number,
): { limited: boolean; retryAfterSec: number } {
  const existing = store.get(key);
  if (!existing || now - existing.windowStart >= config.windowMs) {
    store.set(key, { count: 1, windowStart: now });
    return { limited: false, retryAfterSec: 0 };
  }

  existing.count += 1;
  const retryAfterSec = Math.max(
    1,
    Math.ceil((config.windowMs - (now - existing.windowStart)) / 1000),
  );

  if (existing.count > config.maxRequests) {
    return { limited: true, retryAfterSec };
  }

  return { limited: false, retryAfterSec: 0 };
}

function isApiPath(pathname: string): boolean {
  return pathname.startsWith("/api/");
}

/**
 * Soft edge rate limit — blocks only aggressive automated bursts.
 * Legitimate users stay under thresholds; search crawlers are exempt.
 */
export function applyMiddlewareRateLimit(
  request: NextRequest,
): NextResponse | null {
  const { pathname } = request.nextUrl;
  const ua = request.headers.get("user-agent") ?? "";

  if (SEARCH_ENGINE_UA.test(ua)) {
    return null;
  }

  const now = Date.now();
  pruneStore(now);

  const config = limitsForRequest(request, pathname);
  const key = rateLimitKey(clientIp(request), pathname, config);
  const { limited, retryAfterSec } = isLimited(key, config, now);

  if (!limited) {
    return null;
  }

  const headers = {
    "Retry-After": String(retryAfterSec),
    "Cache-Control": "no-store",
  };

  if (isApiPath(pathname)) {
    return NextResponse.json(
      { error: "rate_limit" },
      { status: 429, headers },
    );
  }

  return new NextResponse("Too Many Requests", { status: 429, headers });
}