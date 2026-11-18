import fs from "fs";

const tools = [
  "merge-pdf",
  "split-pdf",
  "remove-pages",
  "organize-pdf",
  "compress-pdf",
  "images-to-pdf",
  "pdf-to-images",
  "rotate-pdf",
  "word-to-pdf",
  "text-to-pdf",
  "protect-pdf",
  "unlock-pdf",
  "sign-pdf",
];
const locales = ["uk", "en", "pl", "de", "es", "fr"];
const titles = {
  "merge-pdf": {
    en: "Merge PDF online free",
    uk: "Об'єднати PDF онлайн безкоштовно",
    pl: "Połącz PDF online za darmo",
    de: "PDF zusammenführen kostenlos online",
    es: "Unir PDF online gratis",
    fr: "Fusionner PDF gratuitement en ligne",
  },
  "split-pdf": {
    en: "Split PDF online free",
    uk: "Розділити PDF онлайн безкоштовно",
    pl: "Podziel PDF online za darmo",
    de: "PDF teilen kostenlos online",
    es: "Dividir PDF online gratis",
    fr: "Scinder PDF gratuitement en ligne",
  },
  "remove-pages": {
    en: "Remove PDF pages online",
    uk: "Видалити сторінки PDF онлайн",
    pl: "Usuń strony PDF online",
    de: "PDF-Seiten online entfernen",
    es: "Eliminar páginas PDF online",
    fr: "Supprimer des pages PDF en ligne",
  },
  "organize-pdf": {
    en: "Organize PDF pages online",
    uk: "Організувати сторінки PDF онлайн",
    pl: "Organizuj strony PDF online",
    de: "PDF-Seiten online sortieren",
    es: "Organizar páginas PDF online",
    fr: "Organiser les pages PDF en ligne",
  },
  "compress-pdf": {
    en: "Compress PDF online free",
    uk: "Стиснути PDF онлайн безкоштовно",
    pl: "Kompresuj PDF online za darmo",
    de: "PDF online komprimieren kostenlos",
    es: "Comprimir PDF online gratis",
    fr: "Compresser PDF gratuitement en ligne",
  },
  "images-to-pdf": {
    en: "Convert images to PDF online",
    uk: "Зображення в PDF онлайн",
    pl: "Zdjęcia do PDF online",
    de: "Bilder in PDF online",
    es: "Imágenes a PDF online",
    fr: "Images en PDF en ligne",
  },
  "pdf-to-images": {
    en: "Convert PDF to images online",
    uk: "PDF у зображення онлайн",
    pl: "PDF na obrazy online",
    de: "PDF in Bilder online",
    es: "PDF a imágenes online",
    fr: "PDF en images en ligne",
  },
  "rotate-pdf": {
    en: "Rotate PDF pages online",
    uk: "Повернути PDF онлайн",
    pl: "Obróć PDF online",
    de: "PDF drehen online",
    es: "Rotar PDF online",
    fr: "Pivoter PDF en ligne",
  },
  "word-to-pdf": {
    en: "Convert Word to PDF online",
    uk: "Word у PDF онлайн",
    pl: "Word do PDF online",
    de: "Word in PDF online",
    es: "Word a PDF online",
    fr: "Word en PDF en ligne",
  },
  "text-to-pdf": {
    en: "Text to PDF online free",
    uk: "Текст у PDF онлайн безкоштовно",
    pl: "Tekst do PDF online",
    de: "Text in PDF online",
    es: "Texto a PDF online",
    fr: "Texte en PDF en ligne",
  },
  "protect-pdf": {
    en: "Protect PDF with password online",
    uk: "Захистити PDF паролем онлайн",
    pl: "Chroń PDF hasłem online",
    de: "PDF mit Passwort schützen online",
    es: "Proteger PDF con contraseña online",
    fr: "Protéger PDF par mot de passe en ligne",
  },
  "unlock-pdf": {
    en: "Unlock PDF password online",
    uk: "Розблокувати PDF онлайн",
    pl: "Odblokuj PDF online",
    de: "PDF-Passwort entfernen online",
    es: "Desbloquear PDF online",
    fr: "Déverrouiller PDF en ligne",
  },
  "sign-pdf": {
    en: "Sign PDF online free",
    uk: "Підписати PDF онлайн безкоштовно",
    pl: "Podpisz PDF online",
    de: "PDF online signieren",
    es: "Firmar PDF online gratis",
    fr: "Signer PDF gratuitement en ligne",
  },
};
const faqLabels = {
  uk: {
    faq: "Часті питання",
    q1: "Чи завантажуються файли на сервер?",
    a1: "Ні. PurePDF працює у браузері: PDF та зображення залишаються на вашому пристрої.",
    q2: "Чи безкоштовний цей інструмент?",
    a2: "Так. Використання без реєстрації та оплати.",
    q3: "Які формати підтримуються?",
    a3: "Підтримуються стандартні PDF та сумісні із вашим браузером вхідні файли інструменту.",
    q4: "Чи можна на телефоні?",
    a4: "Так, сучасні мобільні браузери підтримують локальну обробку.",
  },
  en: {
    faq: "Frequently asked questions",
    q1: "Are my files uploaded to a server?",
    a1: "No. PurePDF runs in your browser; files stay on your device unless you choose to download the result.",
    q2: "Is this tool free?",
    a2: "Yes — no account or payment required.",
    q3: "Which file formats are supported?",
    a3: "Standard PDF files plus the input formats listed for this tool, as supported by your browser.",
    q4: "Does it work on mobile?",
    a4: "Yes, on modern mobile browsers with sufficient memory for your file.",
  },
  pl: {
    faq: "Często zadawane pytania",
    q1: "Czy pliki trafiają na serwer?",
    a1: "Nie. PurePDF działa w przeglądarce — pliki pozostają na urządzeniu.",
    q2: "Czy to jest darmowe?",
    a2: "Tak, bez rejestracji i opłat.",
    q3: "Jakie formaty są obsługiwane?",
    a3: "Standardowe PDF oraz formaty wejściowe tego narzędzia zgodnie z przeglądarką.",
    q4: "Czy działa na telefonie?",
    a4: "Tak, w nowoczesnych przeglądarkach mobilnych.",
  },
  de: {
    faq: "Häufige Fragen",
    q1: "Werden Dateien auf einen Server hochgeladen?",
    a1: "Nein. PurePDF läuft im Browser — Dateien bleiben auf Ihrem Gerät.",
    q2: "Ist das Tool kostenlos?",
    a2: "Ja, ohne Konto oder Zahlung.",
    q3: "Welche Formate werden unterstützt?",
    a3: "Standard-PDF und die für dieses Tool genannten Eingabeformate, je nach Browser.",
    q4: "Funktioniert es auf dem Handy?",
    a4: "Ja, in modernen mobilen Browsern.",
  },
  es: {
    faq: "Preguntas frecuentes",
    q1: "¿Se suben los archivos a un servidor?",
    a1: "No. PurePDF funciona en el navegador; los archivos permanecen en tu dispositivo.",
    q2: "¿Es gratis?",
    a2: "Sí, sin registro ni pago.",
    q3: "¿Qué formatos admite?",
    a3: "PDF estándar y los formatos de entrada de esta herramienta según tu navegador.",
    q4: "¿Funciona en el móvil?",
    a4: "Sí, en navegadores móviles modernos.",
  },
  fr: {
    faq: "Questions fréquentes",
    q1: "Les fichiers sont-ils envoyés sur un serveur ?",
    a1: "Non. PurePDF s'exécute dans le navigateur ; les fichiers restent sur votre appareil.",
    q2: "Est-ce gratuit ?",
    a2: "Oui, sans compte ni paiement.",
    q3: "Quels formats sont pris en charge ?",
    a3: "PDF standard et formats d'entrée de cet outil selon votre navigateur.",
    q4: "Fonctionne-t-il sur mobile ?",
    a4: "Oui, sur les navigateurs mobiles récents.",
  },
};
const leadTpl = {
  uk: (t) =>
    `${t} у PurePDF виконується локально у браузері — без обов'язкової реєстрації та без завантаження на сервер.`,
  en: (t) =>
    `${t} with PurePDF runs locally in your browser — no signup and no server upload.`,
  pl: (t) =>
    `${t} w PurePDF działa lokalnie w przeglądarce — bez rejestracji i bez wysyłania na serwer.`,
  de: (t) =>
    `${t} mit PurePDF läuft lokal im Browser — ohne Anmeldung und ohne Server-Upload.`,
  es: (t) =>
    `${t} con PurePDF se procesa en el navegador — sin registro ni subida al servidor.`,
  fr: (t) =>
    `${t} avec PurePDF s'effectue localement dans le navigateur — sans inscription ni envoi vers un serveur.`,
};
const sect = {
  uk: {
    h: "Приватність і швидкість",
    b: "Обробка на вашому пристрої зменшує ризик витоку даних і прибирає черги на серверах — зручно для ділових і особистих документів.",
  },
  en: {
    h: "Privacy and speed",
    b: "On-device processing lowers data-leak risk and skips server queues — ideal for business and personal documents.",
  },
  pl: {
    h: "Prywatność i szybkość",
    b: "Przetwarzanie na urządzeniu ogranicza ryzyko wycieku i eliminuje kolejki na serwerze.",
  },
  de: {
    h: "Datenschutz und Tempo",
    b: "Verarbeitung auf dem Gerät reduziert Datenrisiko und Server-Wartezeiten.",
  },
  es: {
    h: "Privacidad y velocidad",
    b: "El procesamiento local reduce fugas de datos y colas en servidor.",
  },
  fr: {
    h: "Confidentialité et rapidité",
    b: "Le traitement local limite les fuites et évite les files d'attente serveur.",
  },
};
const how = {
  uk: { h: "Як користуватися", b: "Відкрийте інструмент, додайте файл, налаштуйте параметри й завантажте результат після обробки." },
  en: { h: "How to use", b: "Open the tool, add your file, adjust options, then download the result when processing finishes." },
  pl: { h: "Jak używać", b: "Otwórz narzędzie, dodaj plik, ustaw opcje i pobierz wynik." },
  de: { h: "So geht's", b: "Tool öffnen, Datei hinzufügen, Optionen wählen und Ergebnis herunterladen." },
  es: { h: "Cómo usar", b: "Abre la herramienta, añade el archivo, ajusta opciones y descarga el resultado." },
  fr: { h: "Comment utiliser", b: "Ouvrez l'outil, ajoutez le fichier, réglez les options et téléchargez le résultat." },
};
const homeHead = {
  uk: "Безкоштовні PDF-інструменти з локальною обробкою",
  en: "Free PDF tools with local in-browser processing",
  pl: "Darmowe narzędzia PDF z lokalnym przetwarzaniem",
  de: "Kostenlose PDF-Tools mit lokaler Verarbeitung",
  es: "Herramientas PDF gratis con procesamiento local",
  fr: "Outils PDF gratuits avec traitement local",
};
const homeLead = {
  uk: "PurePDF на pdf.kixt.net — 13 інструментів для сторінок, конвертації та захисту PDF. Усі операції виконуються у вашому браузері.",
  en: "PurePDF at pdf.kixt.net offers 13 tools for pages, conversion, and PDF security — all processed in your browser.",
  pl: "PurePDF na pdf.kixt.net — 13 narzędzi do stron, konwersji i bezpieczeństwa PDF, lokalnie w przeglądarce.",
  de: "PurePDF auf pdf.kixt.net — 13 Tools für Seiten, Konvertierung und PDF-Sicherheit, lokal im Browser.",
  es: "PurePDF en pdf.kixt.net — 13 herramientas para páginas, conversión y seguridad PDF en el navegador.",
  fr: "PurePDF sur pdf.kixt.net — 13 outils pour pages, conversion et sécurité PDF dans le navigateur.",
};
const cat = {
  uk: [
    ["Маніпуляція сторінками", "Об'єднання, розділення, видалення та впорядкування сторінок без серверів."],
    ["Конвертація", "Стиснення, зображення, Word, текст і обертання — швидко та приватно."],
    ["Захист", "Паролі, розблокування та візуальний підпис без передачі файлу третім сторонам."],
  ],
  en: [
    ["Page tools", "Merge, split, remove, and reorder pages with no server upload."],
    ["Conversion", "Compress, images, Word, text, and rotation — fast and private."],
    ["Security", "Passwords, unlock, and visual signing without sending files to third parties."],
  ],
  pl: [
    ["Narzędzia stron", "Łączenie, dzielenie, usuwanie i kolejność stron bez serwera."],
    ["Konwersja", "Kompresja, obrazy, Word, tekst i obrót — szybko i prywatnie."],
    ["Bezpieczeństwo", "Hasła, odblokowanie i podpis bez wysyłki plików."],
  ],
  de: [
    ["Seiten-Tools", "Zusammenführen, Teilen, Entfernen und Sortieren ohne Server-Upload."],
    ["Konvertierung", "Komprimieren, Bilder, Word, Text und Drehen — schnell und privat."],
    ["Sicherheit", "Passwörter, Entsperren und Signatur ohne Drittanbieter-Upload."],
  ],
  es: [
    ["Herramientas de páginas", "Unir, dividir, eliminar y reordenar sin subir al servidor."],
    ["Conversión", "Comprimir, imágenes, Word, texto y rotación — rápido y privado."],
    ["Seguridad", "Contraseñas, desbloqueo y firma sin enviar archivos a terceros."],
  ],
  fr: [
    ["Outils pages", "Fusion, découpe, suppression et ordre sans envoi serveur."],
    ["Conversion", "Compression, images, Word, texte et rotation — rapide et privé."],
    ["Sécurité", "Mots de passe, déverrouillage et signature sans tiers."],
  ],
};
const data = { tools: {}, home: {} };
for (const loc of locales) {
  const f = faqLabels[loc];
  data.home[loc] = {
    mainHeading: homeHead[loc],
    lead: homeLead[loc],
    sections: cat[loc].map(([h, b]) => ({ heading: h, body: b })),
    faqHeading: f.faq,
    faq: [
      { question: f.q1, answer: f.a1 },
      { question: f.q2, answer: f.a2 },
      { question: f.q3, answer: f.a3 },
      { question: f.q4, answer: f.a4 },
    ],
  };
}
for (const id of tools) {
  data.tools[id] = {};
  for (const loc of locales) {
    const f = faqLabels[loc];
    const t = titles[id][loc];
    const s = sect[loc];
    const h = how[loc];
    data.tools[id][loc] = {
      mainHeading: t,
      lead: leadTpl[loc](t),
      sections: [s, { heading: h.h, body: h.b }],
      faqHeading: f.faq,
      faq: [
        { question: f.q1, answer: f.a1 },
        { question: f.q2, answer: f.a2 },
        { question: f.q3, answer: f.a3 },
        { question: f.q4, answer: f.a4 },
      ],
    };
  }
}
const out = `import type { Locale, ToolId } from "@/i18n/locales";
import type { PageSeoContent, PageSeoContentId } from "@/i18n/seo/page-content-types";

const HOME: Record<Locale, PageSeoContent> = ${JSON.stringify(data.home, null, 2)} as Record<Locale, PageSeoContent>;

const TOOLS: Record<ToolId, Record<Locale, PageSeoContent>> = ${JSON.stringify(data.tools, null, 2)} as Record<ToolId, Record<Locale, PageSeoContent>>;

export function getPageSeoContent(pageId: PageSeoContentId, locale: Locale): PageSeoContent {
  if (pageId === "home") return HOME[locale];
  return TOOLS[pageId][locale];
}

export function getPageFaqForSchema(pageId: PageSeoContentId, locale: Locale) {
  return getPageSeoContent(pageId, locale).faq;
}
`;
fs.writeFileSync("src/i18n/seo/page-content.ts", out);
console.log("wrote page-content.ts", out.length, "bytes");