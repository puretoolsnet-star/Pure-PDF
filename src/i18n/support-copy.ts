import type { Locale } from "@/i18n/locale-types";

export type SupportCopy = {
  title: string;
  body: string;
  watchCta: string;
  watchTitle: string;
  watchMessage: string;
  thanks: string;
  doneCta: string;
};

export const SUPPORT_COPY: Record<Locale, SupportCopy> = {
  uk: {
    title: "Підтримати PurePDF",
    body: "Сервіс безкоштовний і працює лише у браузері. Ви можете підтримати розробку коротким переглядом спонсорського відео — без донатів і реєстрації.",
    watchCta: "Підтримати проєкт переглядом реклами",
    watchTitle: "Коротке спонсорське відео",
    watchMessage:
      "Перегляд займе кілька секунд і допомагає тримати PurePDF безкоштовним для всіх.",
    thanks: "Дякуємо, що підтримали розробку безкоштовного сервісу!",
    doneCta: "Закрити",
  },
  en: {
    title: "Support PurePDF",
    body: "PurePDF is free and runs only in your browser. Support development with a brief sponsored video — no donations or signup.",
    watchCta: "Support the project by watching an ad",
    watchTitle: "Short sponsor video",
    watchMessage: "A few seconds of viewing helps keep PurePDF free for everyone.",
    thanks: "Thank you for supporting our free service!",
    doneCta: "Close",
  },
  pl: {
    title: "Wesprzyj PurePDF",
    body: "PurePDF jest darmowy i działa w przeglądarce. Wesprzyj projekt krótkim wideo sponsora — bez darowizn.",
    watchCta: "Wesprzyj projekt, oglądając reklamę",
    watchTitle: "Krótkie wideo sponsora",
    watchMessage: "Kilka sekund oglądania pomaga utrzymać PurePDF za darmo.",
    thanks: "Dziękujemy za wsparcie darmowej usługi!",
    doneCta: "Zamknij",
  },
  de: {
    title: "PurePDF unterstützen",
    body: "PurePDF ist kostenlos und läuft im Browser. Unterstützen Sie die Entwicklung mit einem kurzen Sponsor-Video — ohne Spenden.",
    watchCta: "Projekt durch Werbung unterstützen",
    watchTitle: "Kurzes Sponsor-Video",
    watchMessage: "Ein kurzer Blick hilft, PurePDF für alle kostenlos zu halten.",
    thanks: "Danke für die Unterstützung unseres kostenlosen Dienstes!",
    doneCta: "Schließen",
  },
  es: {
    title: "Apoya PurePDF",
    body: "PurePDF es gratis y funciona en el navegador. Apoya con un vídeo patrocinado breve — sin donaciones.",
    watchCta: "Apoyar el proyecto viendo un anuncio",
    watchTitle: "Vídeo patrocinado breve",
    watchMessage: "Unos segundos de visualización mantienen PurePDF gratis para todos.",
    thanks: "¡Gracias por apoyar nuestro servicio gratuito!",
    doneCta: "Cerrar",
  },
  fr: {
    title: "Soutenir PurePDF",
    body: "PurePDF est gratuit et fonctionne dans le navigateur. Soutenez le projet par une courte vidéo sponsor — sans don.",
    watchCta: "Soutenir le projet en regardant une pub",
    watchTitle: "Courte vidéo sponsor",
    watchMessage: "Quelques secondes d’affichage aident à garder PurePDF gratuit.",
    thanks: "Merci d’avoir soutenu notre service gratuit !",
    doneCta: "Fermer",
  },
};
