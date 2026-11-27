import type { ReactNode } from "react";

import type { Locale } from "@/i18n/locales";
import type { PageSeoContentId } from "@/i18n/seo/page-content-types";
import { getPageSeoContent } from "@/i18n/seo/page-content";
import { cn } from "@/lib/cn";

type PageSeoSectionProps = {
  pageId: PageSeoContentId;
  locale: Locale;
  className?: string;
};

export function PageSeoSection({ pageId, locale, className }: PageSeoSectionProps) {
  const content = getPageSeoContent(pageId, locale);

  return (
    <section
      aria-labelledby={`seo-${pageId}-heading`}
      className={cn(
        "min-w-0 border-t border-white/10 pt-10 [overflow-wrap:anywhere]",
        className,
      )}
    >
      <div className="max-w-3xl space-y-8">
        <header>
          <h2
            id={`seo-${pageId}-heading`}
            className="text-lg font-semibold tracking-tight text-white sm:text-xl"
          >
            {content.mainHeading}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-400 sm:text-base">
            {content.lead}
          </p>
        </header>

        {content.sections.map((section) => (
          <ContentBlock key={section.heading} heading={section.heading} body={section.body} />
        ))}

        <ContentBlock heading={content.faqHeading}>
          <dl className="mt-4 space-y-4">
            {content.faq.map((item) => (
              <div
                key={item.question}
                className="rounded-lg border border-white/10 bg-surface/30 px-4 py-3 sm:px-5"
              >
                <dt className="text-sm font-medium text-white">{item.question}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-gray-400">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </ContentBlock>
      </div>
    </section>
  );
}

function ContentBlock({
  heading,
  body,
  children,
}: {
  heading: string;
  body?: string;
  children?: ReactNode;
}) {
  return (
    <div>
      <h3 className="text-base font-semibold text-gray-100">{heading}</h3>
      {body ? (
        <p className="mt-2 text-sm leading-relaxed text-gray-400 sm:text-base">{body}</p>
      ) : null}
      {children}
    </div>
  );
}