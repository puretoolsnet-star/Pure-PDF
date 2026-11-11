import type { Locale } from "@/i18n/locale-types";
import type { SeoCopy } from "@/i18n/seo/copy";

type PlannedSeoId =
  | "split-pdf"
  | "remove-pages"
  | "organize-pdf"
  | "rotate-pdf"
  | "protect-pdf"
  | "unlock-pdf"
  | "sign-pdf";

type PlannedSeoCatalog = Record<PlannedSeoId, Record<Locale, SeoCopy>>;

export const PLANNED_TOOL_SEO: PlannedSeoCatalog = {
  "split-pdf": {
    uk: {
      title: "Розділити PDF — безкоштовно онлайн | PurePDF",
      description:
        "Розділіть PDF на окремі сторінки або діапазон локально у браузері. Без завантаження на сервер.",
      keywords: ["розділити PDF", "split PDF", "PurePDF"],
    },
    en: {
      title: "Split PDF — free online | PurePDF",
      description:
        "Split a PDF by page range or into separate files locally in your browser. No server upload.",
      keywords: ["split PDF", "divide PDF", "PurePDF"],
    },
    pl: {
      title: "Podziel PDF — wkrótce | PurePDF",
      description: "Dzielenie PDF lokalnie w przeglądarce. Wkrótce w PurePDF.",
      keywords: ["podziel PDF", "PurePDF"],
    },
    de: {
      title: "PDF teilen — demnächst | PurePDF",
      description: "PDFs lokal im Browser teilen. Demnächst bei PurePDF.",
      keywords: ["PDF teilen", "PurePDF"],
    },
    es: {
      title: "Dividir PDF — próximamente | PurePDF",
      description: "Divide PDF en local en el navegador. Próximamente en PurePDF.",
      keywords: ["dividir PDF", "PurePDF"],
    },
    fr: {
      title: "Scinder PDF — bientôt | PurePDF",
      description: "Scindez des PDF localement dans le navigateur. Bientôt sur PurePDF.",
      keywords: ["scinder PDF", "PurePDF"],
    },
  },
  "remove-pages": {
    uk: {
      title: "Видалити сторінки з PDF — онлайн | PurePDF",
      description:
        "Позначте сторінки в сітці та завантажте очищений PDF локально у браузері.",
      keywords: ["видалити сторінки PDF", "PurePDF"],
    },
    en: {
      title: "Remove PDF pages — free online | PurePDF",
      description:
        "Mark pages in a grid and download a trimmed PDF locally in your browser.",
      keywords: ["remove PDF pages", "PurePDF"],
    },
    pl: {
      title: "Usuń strony PDF — wkrótce | PurePDF",
      description: "Usuwaj strony z PDF lokalnie. Wkrótce w PurePDF.",
      keywords: ["usuń strony PDF", "PurePDF"],
    },
    de: {
      title: "PDF-Seiten entfernen — demnächst | PurePDF",
      description: "Seiten lokal aus PDF entfernen. Demnächst bei PurePDF.",
      keywords: ["PDF Seiten löschen", "PurePDF"],
    },
    es: {
      title: "Eliminar páginas PDF — próximamente | PurePDF",
      description: "Elimina páginas de PDF en local. Próximamente en PurePDF.",
      keywords: ["eliminar páginas PDF", "PurePDF"],
    },
    fr: {
      title: "Supprimer des pages PDF — bientôt | PurePDF",
      description: "Supprimez des pages localement. Bientôt sur PurePDF.",
      keywords: ["supprimer pages PDF", "PurePDF"],
    },
  },
  "organize-pdf": {
    uk: {
      title: "Організувати PDF — порядок сторінок онлайн | PurePDF",
      description:
        "Змінюйте порядок і прибирайте сторінки у сітці з мініатюрами — локально у браузері, без завантаження на сервер.",
      keywords: ["організувати PDF", "порядок сторінок", "PurePDF"],
    },
    en: {
      title: "Organize PDF — reorder pages online | PurePDF",
      description:
        "Reorder and remove pages in a thumbnail grid — locally in your browser, no server upload.",
      keywords: ["organize PDF", "reorder pages", "PurePDF"],
    },
    pl: {
      title: "Organizuj PDF — wkrótce | PurePDF",
      description: "Układaj strony PDF lokalnie. Wkrótce w PurePDF.",
      keywords: ["organizuj PDF", "PurePDF"],
    },
    de: {
      title: "PDF organisieren — demnächst | PurePDF",
      description: "PDF-Seiten sortieren — lokal. Demnächst bei PurePDF.",
      keywords: ["PDF sortieren", "PurePDF"],
    },
    es: {
      title: "Organizar PDF — próximamente | PurePDF",
      description: "Reordena páginas en local. Próximamente en PurePDF.",
      keywords: ["organizar PDF", "PurePDF"],
    },
    fr: {
      title: "Organiser PDF — bientôt | PurePDF",
      description: "Réordonnez les pages localement. Bientôt sur PurePDF.",
      keywords: ["organiser PDF", "PurePDF"],
    },
  },
  "rotate-pdf": {
    uk: {
      title: "Повернути PDF — безкоштовно онлайн | PurePDF",
      description:
        "Поверніть окремі сторінки або весь PDF на 90° і 180° локально у браузері. Без завантаження на сервер.",
      keywords: ["повернути PDF", "обернути сторінки", "PurePDF"],
    },
    en: {
      title: "Rotate PDF — free online | PurePDF",
      description:
        "Rotate single pages or the whole PDF by 90° and 180° locally in your browser. No server upload.",
      keywords: ["rotate PDF", "turn PDF pages", "PurePDF"],
    },
    pl: {
      title: "Obróć PDF — wkrótce | PurePDF",
      description: "Obracaj strony PDF lokalnie. Wkrótce w PurePDF.",
      keywords: ["obróć PDF", "PurePDF"],
    },
    de: {
      title: "PDF drehen — demnächst | PurePDF",
      description: "PDF-Seiten lokal drehen. Demnächst bei PurePDF.",
      keywords: ["PDF drehen", "PurePDF"],
    },
    es: {
      title: "Rotar PDF — próximamente | PurePDF",
      description: "Gira páginas PDF en local. Próximamente en PurePDF.",
      keywords: ["rotar PDF", "PurePDF"],
    },
    fr: {
      title: "Pivoter PDF — bientôt | PurePDF",
      description: "Faites pivoter des pages localement. Bientôt sur PurePDF.",
      keywords: ["pivoter PDF", "PurePDF"],
    },
  },
  "protect-pdf": {
    uk: {
      title: "Захистити PDF паролем — безкоштовно онлайн | PurePDF",
      description:
        "Додайте пароль для відкриття PDF локально у браузері (AES-256). Файл і пароль не завантажуються на сервер.",
      keywords: ["захистити PDF", "пароль PDF", "PurePDF"],
    },
    en: {
      title: "Protect PDF with password — free online | PurePDF",
      description:
        "Add an open password to your PDF locally in the browser (AES-256). No server upload of file or password.",
      keywords: ["protect PDF", "password PDF", "PurePDF"],
    },
    pl: {
      title: "Chroń PDF — wkrótce | PurePDF",
      description: "Hasło na PDF lokalnie. Wkrótce w PurePDF.",
      keywords: ["chroń PDF", "PurePDF"],
    },
    de: {
      title: "PDF schützen — demnächst | PurePDF",
      description: "PDF mit Passwort lokal schützen. Demnächst.",
      keywords: ["PDF Passwort", "PurePDF"],
    },
    es: {
      title: "Proteger PDF — próximamente | PurePDF",
      description: "Protege PDF con contraseña en local. Próximamente.",
      keywords: ["proteger PDF", "PurePDF"],
    },
    fr: {
      title: "Protéger PDF — bientôt | PurePDF",
      description: "Mot de passe PDF en local. Bientôt sur PurePDF.",
      keywords: ["protéger PDF", "PurePDF"],
    },
  },
  "unlock-pdf": {
    uk: {
      title: "Розблокувати PDF — зняти пароль онлайн | PurePDF",
      description:
        "Зніміть пароль із PDF у браузері (AES-256 / RC4), якщо знаєте пароль. Файл не завантажується на сервер.",
      keywords: ["розблокувати PDF", "зняти пароль PDF", "PurePDF"],
    },
    en: {
      title: "Unlock PDF — remove password online | PurePDF",
      description:
        "Remove a PDF open password locally in the browser (AES-256 / RC4) when you know it. No server upload.",
      keywords: ["unlock PDF", "remove PDF password", "PurePDF"],
    },
    pl: {
      title: "Odblokuj PDF — wkrótce | PurePDF",
      description: "Usuń hasło PDF lokalnie. Wkrótce w PurePDF.",
      keywords: ["odblokuj PDF", "PurePDF"],
    },
    de: {
      title: "PDF entsperren — demnächst | PurePDF",
      description: "PDF-Passwort lokal entfernen. Demnächst.",
      keywords: ["PDF entsperren", "PurePDF"],
    },
    es: {
      title: "Desbloquear PDF — próximamente | PurePDF",
      description: "Quita contraseña de PDF en local. Próximamente.",
      keywords: ["desbloquear PDF", "PurePDF"],
    },
    fr: {
      title: "Déverrouiller PDF — bientôt | PurePDF",
      description: "Retirez le mot de passe en local. Bientôt sur PurePDF.",
      keywords: ["déverrouiller PDF", "PurePDF"],
    },
  },
  "sign-pdf": {
    uk: {
      title: "Підписати PDF — візуальний підпис онлайн | PurePDF",
      description:
        "Намалюйте або введіть підпис і вставте на обрану сторінку PDF локально у браузері. Без завантаження на сервер.",
      keywords: ["підписати PDF", "підпис PDF", "PurePDF"],
    },
    en: {
      title: "Sign PDF — draw signature online | PurePDF",
      description:
        "Draw or type a signature and place it on a PDF page locally in your browser. No server upload.",
      keywords: ["sign PDF", "PDF signature", "PurePDF"],
    },
    pl: {
      title: "Podpisz PDF — wkrótce | PurePDF",
      description: "Podpis wizualny PDF lokalnie. Wkrótce w PurePDF.",
      keywords: ["podpisz PDF", "PurePDF"],
    },
    de: {
      title: "PDF signieren — demnächst | PurePDF",
      description: "Visuelle PDF-Signatur lokal. Demnächst.",
      keywords: ["PDF signieren", "PurePDF"],
    },
    es: {
      title: "Firmar PDF — próximamente | PurePDF",
      description: "Firma visual en PDF en local. Próximamente.",
      keywords: ["firmar PDF", "PurePDF"],
    },
    fr: {
      title: "Signer PDF — bientôt | PurePDF",
      description: "Signature visuelle PDF en local. Bientôt sur PurePDF.",
      keywords: ["signer PDF", "PurePDF"],
    },
  },
};
