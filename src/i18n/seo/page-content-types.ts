import type { Locale, ToolId } from "@/i18n/locales";

export type SeoFaqItem = {
  question: string;
  answer: string;
};

export type SeoContentSection = {
  heading: string;
  body: string;
};

export type PageSeoContent = {
  mainHeading: string;
  lead: string;
  sections: SeoContentSection[];
  faqHeading: string;
  faq: SeoFaqItem[];
};

export type PageSeoContentId = "home" | ToolId;