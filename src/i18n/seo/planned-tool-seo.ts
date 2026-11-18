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
      title: "Split PDF online free | PurePDF",
      description:
        "Split a PDF by page range or into separate files locally in your browser. No server upload.",
      keywords: ["split PDF", "divide PDF", "PurePDF"],
    },
    pl: {
      title: "Podziel PDF online za darmo | PurePDF",
      description:
        "Podziel PDF na pliki lub zakresy stron lokalnie w przeglądarce. Bez wysyłania na serwer.",
      keywords: ["podziel PDF", "PDF online", "PurePDF"],
    },
    de: {
      title: "PDF online kostenlos teilen | PurePDF",
      description:
        "PDFs nach Seitenbereich oder in Dateien im Browser teilen. Kein Server-Upload.",
      keywords: ["PDF teilen", "PurePDF", "online"],
    },
    es: {
      title: "Dividir PDF online gratis | PurePDF",
      description:
        "Divide un PDF por rango o en archivos en el navegador. Sin subida al servidor.",
      keywords: ["dividir PDF", "PurePDF", "online"],
    },
    fr: {
      title: "Scinder PDF gratuitement en ligne | PurePDF",
      description:
        "Scindez un PDF par plage ou en fichiers dans le navigateur. Sans envoi serveur.",
      keywords: ["scinder PDF", "PurePDF", "en ligne"],
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
      title: "Usuń strony PDF online | PurePDF",
      description:
        "Zaznacz strony w siatce i pobierz przycięty PDF lokalnie w przeglądarce.",
      keywords: ["usuń strony PDF", "PurePDF", "online"],
    },
    de: {
      title: "PDF-Seiten online entfernen | PurePDF",
      description:
        "Seiten in der Miniaturansicht markieren und PDF lokal im Browser herunterladen.",
      keywords: ["PDF Seiten löschen", "PurePDF", "online"],
    },
    es: {
      title: "Eliminar páginas PDF online | PurePDF",
      description:
        "Marca páginas en la cuadrícula y descarga el PDF recortado en el navegador.",
      keywords: ["eliminar páginas PDF", "PurePDF", "online"],
    },
    fr: {
      title: "Supprimer des pages PDF en ligne | PurePDF",
      description:
        "Marquez des pages dans la grille et téléchargez le PDF épuré dans le navigateur.",
      keywords: ["supprimer pages PDF", "PurePDF", "en ligne"],
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
      title: "Organizuj PDF — kolejność stron online | PurePDF",
      description:
        "Zmieniaj kolejność i usuwaj strony w siatce miniatur — lokalnie w przeglądarce.",
      keywords: ["organizuj PDF", "PurePDF", "online"],
    },
    de: {
      title: "PDF organisieren — Seiten online sortieren | PurePDF",
      description:
        "Seiten in der Miniaturansicht umsortieren und entfernen — lokal im Browser.",
      keywords: ["PDF sortieren", "PurePDF", "online"],
    },
    es: {
      title: "Organizar PDF — reordenar páginas online | PurePDF",
      description:
        "Reordena y elimina páginas en miniaturas — localmente en el navegador.",
      keywords: ["organizar PDF", "PurePDF", "online"],
    },
    fr: {
      title: "Organiser PDF — réordonner les pages en ligne | PurePDF",
      description:
        "Réordonnez et supprimez des pages en miniatures — localement dans le navigateur.",
      keywords: ["organiser PDF", "PurePDF", "en ligne"],
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
      title: "Obróć PDF online za darmo | PurePDF",
      description:
        "Obracaj strony lub cały PDF o 90° i 180° lokalnie w przeglądarce. Bez serwera.",
      keywords: ["obróć PDF", "PurePDF", "online"],
    },
    de: {
      title: "PDF online drehen — kostenlos | PurePDF",
      description:
        "Seiten oder gesamtes PDF um 90° und 180° im Browser drehen. Kein Server-Upload.",
      keywords: ["PDF drehen", "PurePDF", "online"],
    },
    es: {
      title: "Rotar PDF online gratis | PurePDF",
      description:
        "Gira páginas o el PDF completo 90° y 180° en el navegador. Sin subida al servidor.",
      keywords: ["rotar PDF", "PurePDF", "online"],
    },
    fr: {
      title: "Pivoter PDF gratuitement en ligne | PurePDF",
      description:
        "Faites pivoter des pages ou tout le PDF de 90° et 180° dans le navigateur.",
      keywords: ["pivoter PDF", "PurePDF", "en ligne"],
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
      title: "Chroń PDF hasłem online | PurePDF",
      description:
        "Dodaj hasło otwarcia PDF lokalnie w przeglądarce (AES-256). Plik nie trafia na serwer.",
      keywords: ["chroń PDF", "hasło PDF", "PurePDF"],
    },
    de: {
      title: "PDF mit Passwort schützen — online | PurePDF",
      description:
        "Öffnungspasswort für PDF lokal im Browser (AES-256). Kein Upload von Datei oder Passwort.",
      keywords: ["PDF Passwort", "PurePDF", "online"],
    },
    es: {
      title: "Proteger PDF con contraseña online | PurePDF",
      description:
        "Añade contraseña de apertura al PDF en el navegador (AES-256). Sin subir archivo.",
      keywords: ["proteger PDF", "PurePDF", "online"],
    },
    fr: {
      title: "Protéger PDF par mot de passe en ligne | PurePDF",
      description:
        "Ajoutez un mot de passe d'ouverture au PDF dans le navigateur (AES-256). Sans envoi de fichier.",
      keywords: ["protéger PDF", "PurePDF", "en ligne"],
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
      title: "Odblokuj PDF — usuń hasło online | PurePDF",
      description:
        "Usuń hasło otwarcia PDF lokalnie w przeglądarce (AES-256 / RC4), jeśli je znasz.",
      keywords: ["odblokuj PDF", "PurePDF", "online"],
    },
    de: {
      title: "PDF entsperren — Passwort online entfernen | PurePDF",
      description:
        "Öffnungspasswort lokal im Browser entfernen (AES-256 / RC4), wenn bekannt.",
      keywords: ["PDF entsperren", "PurePDF", "online"],
    },
    es: {
      title: "Desbloquear PDF — quitar contraseña online | PurePDF",
      description:
        "Quita la contraseña de apertura en el navegador (AES-256 / RC4) si la conoces.",
      keywords: ["desbloquear PDF", "PurePDF", "online"],
    },
    fr: {
      title: "Déverrouiller PDF — retirer le mot de passe en ligne | PurePDF",
      description:
        "Retirez le mot de passe d'ouverture dans le navigateur (AES-256 / RC4) si vous le connaissez.",
      keywords: ["déverrouiller PDF", "PurePDF", "en ligne"],
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
      title: "Podpisz PDF online — podpis wizualny | PurePDF",
      description:
        "Narysuj lub wpisz podpis i umieść go na stronie PDF lokalnie w przeglądarce.",
      keywords: ["podpisz PDF", "PurePDF", "online"],
    },
    de: {
      title: "PDF online signieren — Unterschrift zeichnen | PurePDF",
      description:
        "Unterschrift zeichnen oder tippen und auf eine PDF-Seite im Browser platzieren.",
      keywords: ["PDF signieren", "PurePDF", "online"],
    },
    es: {
      title: "Firmar PDF online — firma visual | PurePDF",
      description:
        "Dibuja o escribe una firma y colócala en una página PDF en el navegador.",
      keywords: ["firmar PDF", "PurePDF", "online"],
    },
    fr: {
      title: "Signer PDF en ligne — signature visuelle | PurePDF",
      description:
        "Dessinez ou saisissez une signature et placez-la sur une page PDF dans le navigateur.",
      keywords: ["signer PDF", "PurePDF", "en ligne"],
    },
  },
};
