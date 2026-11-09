import { createHmac, timingSafeEqual } from "crypto";

import { SESSION_TTL_MS } from "@/lib/bot-protection/constants";

function signPayload(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function issueSessionToken(secret: string): string {
  const exp = Date.now() + SESSION_TTL_MS;
  const payload = `${exp}`;
  const signature = signPayload(payload, secret);
  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string, secret: string): boolean {
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [expRaw, signature] = parts;
  const exp = Number(expRaw);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;

  const expected = signPayload(expRaw, secret);
  try {
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function parseSessionExpiry(token: string): number | null {
  const expRaw = token.split(".")[0];
  const exp = Number(expRaw);
  return Number.isFinite(exp) ? exp : null;
}
