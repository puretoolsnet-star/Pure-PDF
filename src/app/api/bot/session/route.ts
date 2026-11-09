import {
  issueSessionToken,
  verifySessionToken,
} from "@/lib/bot-protection/session-token.server";

type SessionRequestBody = {
  turnstileToken?: string;
  sessionToken?: string;
};

function getSessionSecret(): string {
  return (
    process.env.BOT_SESSION_SECRET ??
    process.env.TURNSTILE_SECRET_KEY ??
    "purepdf-dev-session-secret"
  );
}

async function verifyTurnstile(response: string, remoteIp: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;

  const params = new URLSearchParams({
    secret,
    response,
  });
  if (remoteIp) params.set("remoteip", remoteIp);

  const result = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    },
  );

  if (!result.ok) return false;
  const data = (await result.json()) as { success?: boolean };
  return Boolean(data.success);
}

export async function POST(request: Request) {
  const body = (await request.json()) as SessionRequestBody;
  const remoteIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;

  if (body.sessionToken) {
    const valid = verifySessionToken(body.sessionToken, getSessionSecret());
    return Response.json({ ok: valid });
  }

  const turnstileToken = body.turnstileToken?.trim();
  if (!turnstileToken) {
    return Response.json({ error: "missing_token" }, { status: 400 });
  }

  const hasTurnstile = Boolean(process.env.TURNSTILE_SECRET_KEY);
  if (hasTurnstile) {
    const passed = await verifyTurnstile(turnstileToken, remoteIp);
    if (!passed) {
      return Response.json({ error: "turnstile_failed" }, { status: 403 });
    }
  }

  const sessionToken = issueSessionToken(getSessionSecret());
  return Response.json({ sessionToken, expiresInMs: 30 * 60 * 1000 });
}
