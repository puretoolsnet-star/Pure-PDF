export const LOCALES = ["uk", "en", "pl", "de", "es", "fr"] as const;

export type Locale = (typeof LOCALES)[number];
