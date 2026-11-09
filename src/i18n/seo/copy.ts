import type { Locale, ToolId } from "@/i18n/locales";

export type SeoPageId = "home" | ToolId;

export type SeoCopy = {
  title: string;
  description: string;
  keywords: string[];
};

type SeoCatalog = Record<SeoPageId, Record<Locale, SeoCopy>>;

export const SEO_COPY: SeoCatalog = {
  home: {
    uk: {
      title: "PurePDF — безкоштовні PDF-інструменти в браузері",
      description:
        "Конвертуйте, об’єднуйте та стискайте PDF локально. 6 приватних інструментів без завантаження файлів на сервер — швидко та безкоштовно.",
      keywords: [
        "PDF онлайн",
        "конвертер PDF",
        "об’єднати PDF",
        "стиснути PDF",
        "PurePDF",
        "безкоштовно",
      ],
    },
    en: {
      title: "PurePDF — Free private PDF tools in your browser",
      description:
        "Convert, merge, compress, and export PDFs locally in your browser. Six free tools, no server uploads, privacy-first processing.",
      keywords: [
        "PDF tools online",
        "merge PDF",
        "compress PDF",
        "PDF converter",
        "PurePDF",
        "free PDF",
      ],
    },
    pl: {
      title: "PurePDF — darmowe narzędzia PDF w przeglądarce",
      description:
        "Konwertuj, łącz i kompresuj PDF lokalnie w przeglądarce. Sześć darmowych narzędzi bez wysyłania plików na serwer.",
      keywords: ["PDF online", "łączenie PDF", "kompresja PDF", "PurePDF", "darmowe PDF"],
    },
    de: {
      title: "PurePDF — Kostenlose PDF-Tools im Browser",
      description:
        "PDFs lokal konvertieren, zusammenführen und komprimieren. Sechs kostenlose Tools ohne Server-Upload — privat und schnell.",
      keywords: ["PDF online", "PDF zusammenführen", "PDF komprimieren", "PurePDF", "kostenlos"],
    },
    es: {
      title: "PurePDF — Herramientas PDF gratis en el navegador",
      description:
        "Convierte, une y comprime PDF en local. Seis herramientas gratuitas sin subir archivos al servidor — rápido y privado.",
      keywords: ["PDF online", "unir PDF", "comprimir PDF", "PurePDF", "PDF gratis"],
    },
    fr: {
      title: "PurePDF — Outils PDF gratuits dans le navigateur",
      description:
        "Convertissez, fusionnez et compressez des PDF localement. Six outils gratuits sans envoi de fichiers — rapide et privé.",
      keywords: ["PDF en ligne", "fusionner PDF", "compresser PDF", "PurePDF", "gratuit"],
    },
  },
  "images-to-pdf": {
    uk: {
      title: "Зображення в PDF — безкоштовно онлайн | PurePDF",
      description:
        "Об’єднайте JPG, PNG і WebP в один PDF у браузері. Без реєстрації та завантаження на сервер — швидкий локальний конвертер.",
      keywords: ["зображення в PDF", "JPG в PDF", "PNG в PDF", "PurePDF", "онлайн"],
    },
    en: {
      title: "Images to PDF — Free online converter | PurePDF",
      description:
        "Combine JPG, PNG, and WebP into one PDF in your browser. No signup, no server upload — fast local image to PDF conversion.",
      keywords: ["images to PDF", "JPG to PDF", "PNG to PDF", "PurePDF", "online"],
    },
    pl: {
      title: "Zdjęcia do PDF — darmowy konwerter | PurePDF",
      description:
        "Połącz JPG, PNG i WebP w jeden PDF w przeglądarce. Bez konta i bez wysyłania plików na serwer.",
      keywords: ["zdjęcia do PDF", "JPG do PDF", "PurePDF", "online"],
    },
    de: {
      title: "Bilder in PDF — Kostenlos online | PurePDF",
      description:
        "JPG, PNG und WebP im Browser zu einem PDF zusammenführen. Kein Upload, keine Anmeldung — lokal und schnell.",
      keywords: ["Bilder in PDF", "JPG zu PDF", "PurePDF", "online"],
    },
    es: {
      title: "Imágenes a PDF — Conversor gratis | PurePDF",
      description:
        "Une JPG, PNG y WebP en un PDF en el navegador. Sin registro ni subida al servidor — conversión local rápida.",
      keywords: ["imágenes a PDF", "JPG a PDF", "PurePDF", "online"],
    },
    fr: {
      title: "Images en PDF — Convertisseur gratuit | PurePDF",
      description:
        "Combinez JPG, PNG et WebP en un PDF dans le navigateur. Sans inscription ni envoi de fichiers — conversion locale.",
      keywords: ["images en PDF", "JPG en PDF", "PurePDF", "en ligne"],
    },
  },
  "pdf-to-images": {
    uk: {
      title: "PDF у зображення — експорт сторінок | PurePDF",
      description:
        "Експортуйте сторінки PDF у PNG або JPEG у браузері. ZIP-архів, налаштування якості — без завантаження на сервер.",
      keywords: ["PDF в JPG", "PDF в PNG", "експорт PDF", "PurePDF"],
    },
    en: {
      title: "PDF to Images — Export pages online | PurePDF",
      description:
        "Export PDF pages to PNG or JPEG in your browser. Download a ZIP, tune quality and scale — no server upload.",
      keywords: ["PDF to JPG", "PDF to PNG", "export PDF pages", "PurePDF"],
    },
    pl: {
      title: "PDF na obrazy — eksport stron | PurePDF",
      description:
        "Eksportuj strony PDF do PNG lub JPEG w przeglądarce. Pobierz ZIP — bez wysyłania plików na serwer.",
      keywords: ["PDF na JPG", "PDF na PNG", "PurePDF", "online"],
    },
    de: {
      title: "PDF in Bilder — Seiten exportieren | PurePDF",
      description:
        "PDF-Seiten im Browser als PNG oder JPEG exportieren. ZIP-Download, Qualität wählen — ohne Server-Upload.",
      keywords: ["PDF zu JPG", "PDF zu PNG", "PurePDF", "online"],
    },
    es: {
      title: "PDF a imágenes — Exportar páginas | PurePDF",
      description:
        "Exporta páginas PDF a PNG o JPEG en el navegador. Descarga ZIP — sin subir archivos al servidor.",
      keywords: ["PDF a JPG", "PDF a PNG", "PurePDF", "online"],
    },
    fr: {
      title: "PDF en images — Exporter les pages | PurePDF",
      description:
        "Exportez des pages PDF en PNG ou JPEG dans le navigateur. ZIP téléchargeable — sans envoi de fichiers.",
      keywords: ["PDF en JPG", "PDF en PNG", "PurePDF", "en ligne"],
    },
  },
  "merge-pdf": {
    uk: {
      title: "Об’єднати PDF — онлайн безкоштовно | PurePDF",
      description:
        "З’єднайте кілька PDF у правильному порядку в браузері. Локальне об’єднання без завантаження файлів на сервер.",
      keywords: ["об’єднати PDF", "склеїти PDF", "merge PDF", "PurePDF"],
    },
    en: {
      title: "Merge PDF — Combine files free online | PurePDF",
      description:
        "Join multiple PDFs in the order you choose, entirely in your browser. Local merge with no server upload.",
      keywords: ["merge PDF", "combine PDF", "join PDF files", "PurePDF"],
    },
    pl: {
      title: "Połącz PDF — scal pliki online | PurePDF",
      description:
        "Połącz wiele plików PDF w wybranej kolejności w przeglądarce. Lokalnie, bez wysyłania na serwer.",
      keywords: ["połączyć PDF", "scalić PDF", "PurePDF", "online"],
    },
    de: {
      title: "PDF zusammenführen — Kostenlos online | PurePDF",
      description:
        "Mehrere PDFs in der gewünschten Reihenfolge im Browser verbinden. Lokal, ohne Server-Upload.",
      keywords: ["PDF zusammenführen", "PDF merge", "PurePDF", "online"],
    },
    es: {
      title: "Unir PDF — Combinar archivos gratis | PurePDF",
      description:
        "Une varios PDF en el orden que elijas en el navegador. Fusión local sin subir archivos al servidor.",
      keywords: ["unir PDF", "combinar PDF", "PurePDF", "online"],
    },
    fr: {
      title: "Fusionner PDF — Gratuit en ligne | PurePDF",
      description:
        "Fusionnez plusieurs PDF dans l’ordre souhaité dans le navigateur. Traitement local sans envoi de fichiers.",
      keywords: ["fusionner PDF", "combiner PDF", "PurePDF", "en ligne"],
    },
  },
  "compress-pdf": {
    uk: {
      title: "Стиснути PDF — зменшити розмір онлайн | PurePDF",
      description:
        "Зменште розмір PDF у браузері з балансом якості. Локальне стиснення — файли не покидають ваш пристрій.",
      keywords: ["стиснути PDF", "зменшити PDF", "compress PDF", "PurePDF"],
    },
    en: {
      title: "Compress PDF — Reduce file size online | PurePDF",
      description:
        "Shrink PDF file size in your browser with balanced or maximum compression. Files never leave your device.",
      keywords: ["compress PDF", "reduce PDF size", "optimize PDF", "PurePDF"],
    },
    pl: {
      title: "Kompresja PDF — zmniejsz rozmiar | PurePDF",
      description:
        "Zmniejsz rozmiar PDF w przeglądarce. Lokalna kompresja — pliki nie trafiają na serwer.",
      keywords: ["kompresja PDF", "zmniejszyć PDF", "PurePDF", "online"],
    },
    de: {
      title: "PDF komprimieren — Dateigröße senken | PurePDF",
      description:
        "PDF-Größe im Browser reduzieren — ausgewogen oder maximal. Dateien bleiben auf Ihrem Gerät.",
      keywords: ["PDF komprimieren", "PDF verkleinern", "PurePDF", "online"],
    },
    es: {
      title: "Comprimir PDF — Reducir tamaño online | PurePDF",
      description:
        "Reduce el tamaño del PDF en el navegador. Compresión local — tus archivos no se suben al servidor.",
      keywords: ["comprimir PDF", "reducir PDF", "PurePDF", "online"],
    },
    fr: {
      title: "Compresser PDF — Réduire la taille | PurePDF",
      description:
        "Réduisez la taille d’un PDF dans le navigateur. Compression locale — fichiers sur votre appareil.",
      keywords: ["compresser PDF", "réduire PDF", "PurePDF", "en ligne"],
    },
  },
  "word-to-pdf": {
    uk: {
      title: "Word у PDF — DOCX онлайн | PurePDF",
      description:
        "Конвертуйте DOCX у PDF у браузері. Швидко, безкоштовно та приватно — документ не завантажується на сервер.",
      keywords: ["Word в PDF", "DOCX в PDF", "конвертер Word", "PurePDF"],
    },
    en: {
      title: "Word to PDF — DOCX converter online | PurePDF",
      description:
        "Convert DOCX to PDF in your browser. Free, fast, and private — your document stays on your device.",
      keywords: ["Word to PDF", "DOCX to PDF", "PurePDF", "online converter"],
    },
    pl: {
      title: "Word do PDF — konwerter DOCX | PurePDF",
      description:
        "Konwertuj DOCX do PDF w przeglądarce. Szybko i prywatnie — bez wysyłania dokumentu na serwer.",
      keywords: ["Word do PDF", "DOCX do PDF", "PurePDF", "online"],
    },
    de: {
      title: "Word zu PDF — DOCX online konvertieren | PurePDF",
      description:
        "DOCX im Browser in PDF umwandeln. Kostenlos und privat — kein Upload auf den Server.",
      keywords: ["Word zu PDF", "DOCX zu PDF", "PurePDF", "online"],
    },
    es: {
      title: "Word a PDF — Convertir DOCX online | PurePDF",
      description:
        "Convierte DOCX a PDF en el navegador. Gratis y privado — el documento no se sube al servidor.",
      keywords: ["Word a PDF", "DOCX a PDF", "PurePDF", "online"],
    },
    fr: {
      title: "Word en PDF — Convertir DOCX en ligne | PurePDF",
      description:
        "Convertissez DOCX en PDF dans le navigateur. Gratuit et privé — aucun envoi de document.",
      keywords: ["Word en PDF", "DOCX en PDF", "PurePDF", "en ligne"],
    },
  },
  "text-to-pdf": {
    uk: {
      title: "Текст у PDF — створити PDF онлайн | PurePDF",
      description:
        "Перетворіть текст або нотатки на PDF у браузері. Unicode, переноси рядків — безкоштовно та локально.",
      keywords: ["текст у PDF", "txt в PDF", "створити PDF", "PurePDF"],
    },
    en: {
      title: "Text to PDF — Create PDF from text | PurePDF",
      description:
        "Turn plain text or notes into a downloadable PDF in your browser. Unicode-friendly, free local generation.",
      keywords: ["text to PDF", "plain text PDF", "PurePDF", "online"],
    },
    pl: {
      title: "Tekst do PDF — utwórz PDF online | PurePDF",
      description:
        "Zamień tekst na PDF w przeglądarce. Unicode, lokalnie i bezpłatnie — bez wysyłania na serwer.",
      keywords: ["tekst do PDF", "PurePDF", "PDF online"],
    },
    de: {
      title: "Text zu PDF — PDF aus Text erstellen | PurePDF",
      description:
        "Plain Text im Browser in PDF umwandeln. Unicode-freundlich, kostenlos und lokal.",
      keywords: ["Text zu PDF", "PurePDF", "PDF online"],
    },
    es: {
      title: "Texto a PDF — Crear PDF desde texto | PurePDF",
      description:
        "Convierte texto plano en PDF en el navegador. Unicode, gratis y procesamiento local.",
      keywords: ["texto a PDF", "PurePDF", "PDF online"],
    },
    fr: {
      title: "Texte en PDF — Créer un PDF en ligne | PurePDF",
      description:
        "Transformez du texte brut en PDF dans le navigateur. Unicode, gratuit et local.",
      keywords: ["texte en PDF", "PurePDF", "PDF en ligne"],
    },
  },
};

export function getSeoCopy(page: SeoPageId, locale: Locale): SeoCopy {
  return SEO_COPY[page][locale];
}
