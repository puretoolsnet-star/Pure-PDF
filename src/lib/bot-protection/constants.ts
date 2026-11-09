export const BOT_SESSION_STORAGE_KEY = "purepdf-bot-session";

/** Minimum time between PDF generation runs (client-side flood guard). */
export const GENERATION_COOLDOWN_MS = 2500;

/** Client-side session lifetime (matches server-issued token). */
export const SESSION_TTL_MS = 30 * 60 * 1000;

export const TURNSTILE_SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
