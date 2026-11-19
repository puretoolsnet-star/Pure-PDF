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
    title: "Безкоштовно і приватно",
    body: "PurePDF безкоштовний і працює повністю локально у браузері. Файли не завантажуються на сервер, реєстрація не потрібна.",
    watchCta: "Продовжити",
    watchTitle: "Локальна обробка",
    watchMessage:
      "Усі дії виконуються у вашому браузері — без завантаження на сервер і без облікового запису.",
    thanks: "Можете користуватися PurePDF безкоштовно.",
    doneCta: "Закрити",
  },
  en: {
    title: "Free and private",
    body: "PurePDF is free and runs entirely in your browser. Files are never uploaded to a server, and no registration is required.",
    watchCta: "Continue",
    watchTitle: "Local processing",
    watchMessage:
      "Everything runs in your browser — no server uploads and no account.",
    thanks: "You can use PurePDF for free.",
    doneCta: "Close",
  },
  pl: {
    title: "Bezpłatnie i prywatnie",
    body: "PurePDF jest darmowy i działa w całości w przeglądarce. Pliki nie są wysyłane na serwer, rejestracja nie jest wymagana.",
    watchCta: "Kontynuuj",
    watchTitle: "Przetwarzanie lokalne",
    watchMessage:
      "Wszystko działa w przeglądarce — bez wysyłania na serwer i bez konta.",
    thanks: "Możesz korzystać z PurePDF za darmo.",
    doneCta: "Zamknij",
  },
  de: {
    title: "Kostenlos und privat",
    body: "PurePDF ist kostenlos und läuft vollständig in Ihrem Browser. Dateien werden nicht auf einen Server hochgeladen, eine Registrierung ist nicht nötig.",
    watchCta: "Weiter",
    watchTitle: "Lokale Verarbeitung",
    watchMessage:
      "Alles läuft in Ihrem Browser — ohne Server-Upload und ohne Konto.",
    thanks: "Sie können PurePDF kostenlos nutzen.",
    doneCta: "Schließen",
  },
  es: {
    title: "Gratis y privado",
    body: "PurePDF es gratuito y funciona por completo en tu navegador. Los archivos no se suben a un servidor y no hace falta registrarse.",
    watchCta: "Continuar",
    watchTitle: "Procesamiento local",
    watchMessage:
      "Todo se ejecuta en el navegador: sin subidas al servidor y sin cuenta.",
    thanks: "Puedes usar PurePDF gratis.",
    doneCta: "Cerrar",
  },
  fr: {
    title: "Gratuit et privé",
    body: "PurePDF est gratuit et fonctionne entièrement dans votre navigateur. Les fichiers ne sont pas envoyés sur un serveur, et aucune inscription n’est requise.",
    watchCta: "Continuer",
    watchTitle: "Traitement local",
    watchMessage:
      "Tout s’exécute dans le navigateur — sans envoi vers un serveur et sans compte.",
    thanks: "Vous pouvez utiliser PurePDF gratuitement.",
    doneCta: "Fermer",
  },
};
