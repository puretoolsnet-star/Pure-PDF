import type { EcosystemProjectId } from "@/lib/ecosystem";

export const LOCALES = ["uk", "en", "pl", "de", "es", "fr"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE = "uk" satisfies Locale;

export const TOOL_IDS = [
  "images-to-pdf",
  "pdf-to-images",
  "merge-pdf",
  "compress-pdf",
  "word-to-pdf",
  "text-to-pdf",
] as const satisfies readonly ToolId[];

export type ToolId =
  | "images-to-pdf"
  | "pdf-to-images"
  | "merge-pdf"
  | "compress-pdf"
  | "word-to-pdf"
  | "text-to-pdf";

export type Dictionary = {
  brand: {
    name: string;
    tagline: string;
  };
  nav: {
    selectLanguage: string;
    menuAria: string;
    menuClose: string;
  };
  ecosystem: {
    menuLabel: string;
    menuShort: string;
    menuAria: string;
    menuHint: string;
    activeHere: string;
    comingSoon: string;
    close: string;
    items: Record<EcosystemProjectId, { name: string; tagline: string }>;
  };
  security: {
    badge: string;
    badgeShort: string;
    bannerTitle: string;
    bannerBody: string;
    pointLocal: string;
    pointNoUpload: string;
    pointPrivate: string;
    toolNote: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    toolsHeading: string;
    toolsAria: string;
    openTool: string;
  };
  ad: {
    sponsored: string;
    titleBefore: string;
    supportMessage: string;
    close: string;
    wait: string;
    thanks: string;
    continue: string;
    watch: string;
    watching: string;
    waitHint: string;
    progress: (seconds: number) => string;
    slotLabel: string;
  };
  rewardedAd: {
    sponsored: string;
    title: string;
    message: string;
    watch: string;
    watching: string;
    download: string;
    waitHint: string;
    progress: (seconds: number) => string;
    thanks: string;
    close: string;
    slotLabel: string;
  };
  toolAd: {
    sponsored: string;
    slotTitle: string;
    slotHint: string;
  };
  botProtection: {
    rateLimited: string;
    unavailable: string;
  };
  common: {
    backToTools: string;
    dropzoneTitle: string;
    clearAll: string;
    up: string;
    down: string;
    remove: string;
    downloadPdf: string;
    building: string;
    merging: string;
    optimizing: string;
    converting: string;
    exporting: string;
    before: string;
    after: string;
    saved: string;
    minimalChange: string;
    downloadReadyPdf: string;
    downloadReadyZip: string;
  };
  tools: Record<
    ToolId,
    {
      title: string;
      description: string;
      hint: string;
      action: string;
      processAction: string;
      errors: {
        invalid: string;
        failed: string;
      };
    }
  >;
  toolsExtra: {
    imagesSelected: (count: number) => string;
    pdfsInQueue: (count: number) => string;
    pageLabel: (index: number) => string;
    pagesCount: (count: number) => string;
    positionLabel: (index: number) => string;
    mergeMinFiles: string;
    compressBalanced: string;
    compressBalancedHint: string;
    compressMaximum: string;
    compressMaximumHint: string;
    compressResult: string;
    formatLabel: string;
    scaleLabel: (scale: number) => string;
    qualityLabel: (percent: number) => string;
    exportZip: string;
    renderingPage: (current: number, total: number) => string;
    exportedPages: (count: number) => string;
    preview: string;
    preparingPreview: string;
    conversionNotes: string;
    docxOnly: string;
    optimization: string;
    textLabel: string;
    textPlaceholder: string;
    charactersCount: (count: number) => string;
    clearText: string;
  };
};

const uk: Dictionary = {
  brand: { name: "PurePDF", tagline: "Швидкі інструменти. Без зайвого." },
  nav: {
    selectLanguage: "Мова",
    menuAria: "Меню сайту",
    menuClose: "Закрити меню",
  },
  ecosystem: {
    menuLabel: "Наша екосистема",
    menuShort: "Екосистема",
    menuAria: "Проєкти нашої екосистеми",
    menuHint:
      "Пов’язані утиліти з локальною обробкою у браузері — одна команда, одна філософія приватності.",
    activeHere: "Активно",
    comingSoon: "Незабаром",
    close: "Закрити меню екосистеми",
    items: {
      purepdf: {
        name: "PurePDF",
        tagline: "Інструменти для роботи з PDF.",
      },
      pureQr: {
        name: "PureQR",
        tagline: "Генератор та менеджер QR-кодів.",
      },
      pureSign: {
        name: "PureSign",
        tagline: "Підпис та заповнення PDF локально.",
      },
      pureTable: {
        name: "PureTable",
        tagline: "Бізнес-утиліта для парсингу накладних у Excel/CSV.",
      },
    },
  },
  security: {
    badge: "Client-Side · 100% локально",
    badgeShort: "Локальна обробка",
    bannerTitle: "Ваші файли не покидають браузер",
    bannerBody:
      "PurePDF працює повністю на вашому пристрої. Документи не завантажуються на сервери та не передаються третім сторонам.",
    pointLocal: "Обробка лише у вашому браузері",
    pointNoUpload: "Без завантаження на сервер",
    pointPrivate: "Приватність за замовчуванням",
    toolNote: "Client-Side: файли залишаються на вашому пристрої.",
  },
  home: {
    heroTitle: "Усі PDF-інструменти в одному темному робочому просторі.",
    heroSubtitle:
      "Оберіть інструмент нижче, щоб конвертувати, об’єднувати чи стискати файли приватно у браузері.",
    toolsHeading: "PDF-інструменти",
    toolsAria: "PDF-інструменти",
    openTool: "Відкрити →",
  },
  ad: {
    sponsored: "Реклама",
    titleBefore: "Коротка реклама перед",
    supportMessage:
      "Перегляд реклами допомагає тримати PurePDF живим і безкоштовним для всіх. Дякуємо, що підтримуєте проєкт.",
    close: "Закрити рекламу",
    wait: "Зачекайте кілька секунд — це допомагає нам залишатися безкоштовними…",
    thanks: "Дякуємо за підтримку! Можете перейти до інструменту.",
    continue: "Продовжити до",
    watch: "Переглянути спонсорське відео",
    watching: "Триває спонсорський перегляд…",
    waitHint:
      "Натисніть кнопку нижче, щоб запустити спонсорський блок Adsterra. Продовжити без перегляду неможливо.",
    progress: (seconds) => `${seconds} с`,
    slotLabel: "Спонсорський блок Adsterra",
  },
  rewardedAd: {
    sponsored: "Підтримка проєкту",
    title: "Завантажити готовий документ",
    message:
      "Короткий перегляд спонсорського блоку — єдина умова, щоб тримати PurePDF безкоштовним, повністю приватним і без реєстрацій чи підписок.",
    watch: "Переглянути спонсорське відео для завантаження",
    watching: "Триває спонсорський перегляд…",
    download: "Завантажити файл",
    waitHint:
      "Натисніть кнопку нижче, щоб запустити спонсорський блок Adsterra. Продовжити без перегляду неможливо.",
    progress: (seconds) => `${seconds} с`,
    thanks: "Дякуємо за підтримку. Натисніть кнопку нижче, щоб зберегти файл на пристрої.",
    close: "Закрити",
    slotLabel: "Спонсорський блок Adsterra",
  },
  toolAd: {
    sponsored: "Реклама",
    slotTitle: "Місце для реклами",
    slotHint:
      "Партнерські оголошення тут допомагають тримати PurePDF безкоштовним для всіх.",
  },
  botProtection: {
    rateLimited:
      "Зачекайте кілька секунд перед наступною генерацією файлу.",
    unavailable:
      "Фонова перевірка браузера не пройшла. Оновіть сторінку та спробуйте знову.",
  },
  common: {
    backToTools: "Назад до інструментів",
    dropzoneTitle: "Перетягніть файли сюди або натисніть для вибору",
    clearAll: "Очистити все",
    up: "Вгору",
    down: "Вниз",
    remove: "Видалити",
    downloadPdf: "Завантажити PDF",
    building: "Створення PDF…",
    merging: "Об’єднання…",
    optimizing: "Оптимізація…",
    converting: "Конвертація…",
    exporting: "Експорт…",
    before: "До",
    after: "Після",
    saved: "Зекономлено",
    minimalChange: "Мінімальні зміни",
    downloadReadyPdf: "Завантажити готовий PDF",
    downloadReadyZip: "Завантажити архів (ZIP)",
  },
  tools: {
    "images-to-pdf": {
      title: "Зображення в PDF",
      description:
        "Завантажте зображення, змініть порядок сторінок і отримайте один PDF. Обробка — у браузері.",
      hint: "JPG, PNG і WebP. Кожне зображення — окрема сторінка PDF.",
      action: "Створити PDF",
      processAction: "Зібрати PDF",
      errors: {
        invalid: "Оберіть зображення JPG, PNG або WebP.",
        failed: "Не вдалося створити PDF.",
      },
    },
    "pdf-to-images": {
      title: "PDF у зображення",
      description:
        "Експорт кожної сторінки PDF у PNG або JPG через pdf.js, архів ZIP для завантаження.",
      hint: "Один PDF. Кожна сторінка — окреме зображення в ZIP.",
      action: "Експортувати сторінки",
      processAction: "Підготувати архів ZIP",
      errors: {
        invalid: "Оберіть коректний PDF-файл.",
        failed: "Не вдалося експортувати сторінки.",
      },
    },
    "merge-pdf": {
      title: "Об’єднати PDF",
      description:
        "Об’єднайте кілька PDF у потрібному порядку. Файли не покидають ваш пристрій.",
      hint: "Два або більше PDF. Стрілки змінюють порядок об’єднання.",
      action: "Об’єднати PDF",
      processAction: "Об’єднати файли",
      errors: {
        invalid: "Оберіть коректні PDF-файли.",
        failed: "Не вдалося об’єднати PDF.",
      },
    },
    "compress-pdf": {
      title: "Стиснути PDF",
      description:
        "Перезберіть PDF у браузері, щоб зменшити розмір за допомогою pdf-lib.",
      hint: "Один PDF. Оптимізація локально — без завантаження на сервер.",
      action: "Оптимізувати PDF",
      processAction: "Стиснути PDF",
      errors: {
        invalid: "Оберіть коректний PDF-файл.",
        failed: "Не вдалося стиснути PDF.",
      },
    },
    "word-to-pdf": {
      title: "Word у PDF",
      description:
        "Конвертація .docx у PDF у браузері. Складна верстка може трохи відрізнятися від Word.",
      hint: "Лише сучасні .docx. Формат .doc не підтримується.",
      action: "Конвертувати у PDF",
      processAction: "Підготувати PDF",
      errors: {
        invalid: "Завантажте документ Word у форматі .docx.",
        failed: "Не вдалося конвертувати документ у PDF.",
      },
    },
    "text-to-pdf": {
      title: "Текст у PDF",
      description:
        "Перетворіть нотатки чи plain text на PDF для завантаження — повністю у браузері.",
      hint: "Підтримуються переноси рядків і Unicode (укр., en тощо).",
      action: "Створити PDF",
      processAction: "Підготувати PDF",
      errors: {
        invalid: "Введіть текст перед створенням PDF.",
        failed: "Не вдалося створити PDF із тексту.",
      },
    },
  },
  toolsExtra: {
    imagesSelected: (n) => `${n} зображ. обрано`,
    pdfsInQueue: (n) => `${n} PDF у черзі`,
    pageLabel: (i) => `Сторінка ${i}`,
    pagesCount: (n) => `${n} стор.`,
    positionLabel: (i) => `Позиція ${i}`,
    mergeMinFiles: "Потрібно щонайменше 2 PDF",
    compressBalanced: "Збалансовано",
    compressBalancedHint: "Швидка перезбірка з меншим розміром.",
    compressMaximum: "Максимум",
    compressMaximumHint: "Object streams для додаткової економії.",
    compressResult: "Результат стиснення",
    formatLabel: "Формат зображення",
    scaleLabel: (s) => `Масштаб (${s.toFixed(1)}×)`,
    qualityLabel: (p) => `Якість JPEG (${p}%)`,
    exportZip: "Експорт зображень (ZIP)",
    renderingPage: (c, t) => `Рендер сторінки ${c} з ${t}…`,
    exportedPages: (n) => `Експортовано ${n} стор.`,
    preview: "Попередній перегляд",
    preparingPreview: "Підготовка перегляду…",
    conversionNotes: "Примітки конвертації",
    docxOnly: "Лише .docx",
    optimization: "Оптимізація",
    textLabel: "Ваш текст",
    textPlaceholder: "Вставте або введіть текст тут…",
    charactersCount: (n) => `${n.toLocaleString()} символів`,
    clearText: "Очистити текст",
  },
};

const en: Dictionary = {
  brand: { name: "PurePDF", tagline: "Fast tools. Zero clutter." },
  nav: {
    selectLanguage: "Language",
    menuAria: "Site menu",
    menuClose: "Close menu",
  },
  ecosystem: {
    menuLabel: "Our ecosystem",
    menuShort: "Ecosystem",
    menuAria: "Our ecosystem projects",
    menuHint:
      "Related browser-local tools from the same team — privacy-first, no unnecessary uploads.",
    activeHere: "Active",
    comingSoon: "Coming Soon",
    close: "Close ecosystem menu",
    items: {
      purepdf: {
        name: "PurePDF",
        tagline: "Fast PDF processing tools.",
      },
      pureQr: {
        name: "PureQR",
        tagline: "Modern QR code generator & manager.",
      },
      pureSign: {
        name: "PureSign",
        tagline: "Sign and fill PDF documents locally.",
      },
      pureTable: {
        name: "PureTable",
        tagline: "Business utility for parsing invoices into Excel/CSV.",
      },
    },
  },
  security: {
    badge: "Client-Side · 100% local",
    badgeShort: "Local processing",
    bannerTitle: "Your files never leave the browser",
    bannerBody:
      "PurePDF runs entirely on your device. Documents are not uploaded to servers or shared with third parties.",
    pointLocal: "Processing only in your browser",
    pointNoUpload: "No server uploads",
    pointPrivate: "Private by default",
    toolNote: "Client-Side: files stay on your device.",
  },
  home: {
    heroTitle: "Every PDF tool you need, in one dark workspace.",
    heroSubtitle:
      "Pick a tool below to convert, merge, or compress files privately in your browser.",
    toolsHeading: "PDF tools",
    toolsAria: "PDF tools",
    openTool: "Open tool →",
  },
  ad: {
    sponsored: "Sponsored",
    titleBefore: "Short ad before",
    supportMessage:
      "Watching this ad helps keep PurePDF alive and free for everyone. Thank you for supporting the project.",
    close: "Close advertisement",
    wait: "Please wait a few seconds — this helps us stay free for everyone…",
    thanks: "Thanks for your support! You can continue to your tool.",
    continue: "Continue to",
    watch: "Watch sponsor video",
    watching: "Sponsor view in progress…",
    waitHint:
      "Tap the button below to start the Adsterra sponsor block. There is no way to continue without watching.",
    progress: (seconds) => `${seconds}s`,
    slotLabel: "Adsterra sponsor block",
  },
  rewardedAd: {
    sponsored: "Support the project",
    title: "Download your document",
    message:
      "A short sponsor view is the only condition that keeps PurePDF free, fully private, and without sign-ups or subscriptions.",
    watch: "Watch sponsor video to download",
    watching: "Sponsor view in progress…",
    download: "Download file",
    waitHint:
      "Tap the button below to start the Adsterra sponsor block. There is no way to continue without watching.",
    progress: (seconds) => `${seconds}s`,
    thanks: "Thanks for watching. Tap the button below to save the file to your device.",
    close: "Close",
    slotLabel: "Adsterra sponsor block",
  },
  toolAd: {
    sponsored: "Sponsored",
    slotTitle: "Ad space",
    slotHint: "Partner placements here help keep PurePDF free for everyone.",
  },
  botProtection: {
    rateLimited: "Please wait a few seconds before generating another file.",
    unavailable:
      "Background browser verification did not complete. Refresh the page and try again.",
  },
  common: {
    backToTools: "Back to tools",
    dropzoneTitle: "Drop files here or click to browse",
    clearAll: "Clear all",
    up: "Up",
    down: "Down",
    remove: "Remove",
    downloadPdf: "Download PDF",
    building: "Building PDF…",
    merging: "Merging…",
    optimizing: "Optimizing…",
    converting: "Converting…",
    exporting: "Exporting…",
    before: "Before",
    after: "After",
    saved: "Saved",
    minimalChange: "Minimal change",
    downloadReadyPdf: "Download ready PDF",
    downloadReadyZip: "Download ZIP archive",
  },
  tools: {
    "images-to-pdf": {
      title: "Images to PDF",
      description:
        "Upload images, arrange page order, and download a single PDF. Processing stays in your browser.",
      hint: "Supports JPG, PNG, and WebP. Each image becomes one PDF page.",
      action: "Build PDF",
      processAction: "Assemble PDF",
      errors: {
        invalid: "Please choose JPG, PNG, or WebP images.",
        failed: "Could not build the PDF.",
      },
    },
    "pdf-to-images": {
      title: "PDF to Images",
      description:
        "Render every PDF page to PNG or JPG in your browser using pdf.js, then download a ZIP archive.",
      hint: "Upload one PDF. Each page is exported as a separate image inside a ZIP file.",
      action: "Export pages",
      processAction: "Prepare ZIP archive",
      errors: {
        invalid: "Please choose a valid PDF file.",
        failed: "Could not export PDF pages.",
      },
    },
    "merge-pdf": {
      title: "Merge PDF",
      description:
        "Combine multiple PDF documents in the order you choose. Files never leave your device.",
      hint: "Add two or more PDF files. Use the arrows to control merge order.",
      action: "Merge PDFs",
      processAction: "Merge files",
      errors: {
        invalid: "Please choose valid PDF files.",
        failed: "Could not merge PDF files.",
      },
    },
    "compress-pdf": {
      title: "Compress PDF",
      description:
        "Rebuild your PDF in the browser to strip redundant structure and reduce file size with pdf-lib.",
      hint: "Upload one PDF. We optimize it locally—nothing is uploaded to a server.",
      action: "Optimize PDF",
      processAction: "Compress PDF",
      errors: {
        invalid: "Please choose a valid PDF file.",
        failed: "Could not compress this PDF.",
      },
    },
    "word-to-pdf": {
      title: "Word to PDF",
      description:
        "Convert .docx files to PDF entirely in your browser. Complex layouts may differ slightly from Microsoft Word.",
      hint: "Supports modern .docx files. Legacy .doc format is not supported.",
      action: "Convert to PDF",
      processAction: "Prepare PDF",
      errors: {
        invalid: "Please upload a .docx Word document.",
        failed: "Could not convert this document to PDF.",
      },
    },
    "text-to-pdf": {
      title: "Text to PDF",
      description:
        "Turn notes or plain text into a downloadable PDF entirely in your browser.",
      hint: "Line breaks and Unicode (including Ukrainian) are preserved.",
      action: "Generate PDF",
      processAction: "Prepare PDF",
      errors: {
        invalid: "Enter some text before generating a PDF.",
        failed: "Could not create PDF from text.",
      },
    },
  },
  toolsExtra: {
    imagesSelected: (n) => `${n} image${n === 1 ? "" : "s"} selected`,
    pdfsInQueue: (n) => `${n} PDF${n === 1 ? "" : "s"} in queue`,
    pageLabel: (i) => `Page ${i}`,
    pagesCount: (n) => `${n} page${n === 1 ? "" : "s"}`,
    positionLabel: (i) => `Position ${i}`,
    mergeMinFiles: "At least 2 PDFs required",
    compressBalanced: "Balanced",
    compressBalancedHint: "Fast rebuild with a smaller footprint.",
    compressMaximum: "Maximum",
    compressMaximumHint: "Uses object streams for extra savings.",
    compressResult: "Compression result",
    formatLabel: "Image format",
    scaleLabel: (s) => `Resolution scale (${s.toFixed(1)}×)`,
    qualityLabel: (p) => `JPEG quality (${p}%)`,
    exportZip: "Export images (ZIP)",
    renderingPage: (c, t) => `Rendering page ${c} of ${t}…`,
    exportedPages: (n) => `Exported ${n} page${n === 1 ? "" : "s"}.`,
    preview: "Preview",
    preparingPreview: "Preparing preview…",
    conversionNotes: "Conversion notes",
    docxOnly: ".docx only",
    optimization: "Optimization",
    textLabel: "Your text",
    textPlaceholder: "Paste or type your content here…",
    charactersCount: (n) => `${n.toLocaleString()} characters`,
    clearText: "Clear text",
  },
};

const pl: Dictionary = {
  ...en,
  brand: { name: "PurePDF", tagline: "Szybkie narzędzia. Bez zbędnego bałaganu." },
  nav: {
    selectLanguage: "Język",
    menuAria: "Menu strony",
    menuClose: "Zamknij menu",
  },
  ecosystem: {
    menuLabel: "Nasz ekosystem",
    menuShort: "Ekosystem",
    menuAria: "Projekty naszego ekosystemu",
    menuHint:
      "Powiązane narzędzia działające lokalnie w przeglądarce — ta sama prywatność.",
    activeHere: "Aktywne",
    comingSoon: "Wkrótce",
    close: "Zamknij menu ekosystemu",
    items: {
      purepdf: {
        name: "PurePDF",
        tagline: "Szybkie narzędzia do obsługi plików PDF.",
      },
      pureQr: {
        name: "PureQR",
        tagline: "Nowoczesny generator i menedżer kodów QR.",
      },
      pureSign: {
        name: "PureSign",
        tagline: "Podpisywanie i wypełnianie PDF lokalnie.",
      },
      pureTable: {
        name: "PureTable",
        tagline: "Narzędzie biznesowe do parsowania faktur.",
      },
    },
  },
  security: {
    badge: "Client-Side · 100% lokalnie",
    badgeShort: "Przetwarzanie lokalne",
    bannerTitle: "Twoje pliki nie opuszczają przeglądarki",
    bannerBody:
      "PurePDF działa wyłącznie na Twoim urządzeniu. Dokumenty nie są wysyłane na serwery ani udostępniane osobom trzecim.",
    pointLocal: "Przetwarzanie tylko w przeglądarce",
    pointNoUpload: "Bez wysyłania na serwer",
    pointPrivate: "Prywatność domyślnie",
    toolNote: "Client-Side: pliki pozostają na Twoim urządzeniu.",
  },
  home: {
    heroTitle: "Wszystkie narzędzia PDF w jednym ciemnym workspace.",
    heroSubtitle:
      "Wybierz narzędzie poniżej, aby konwertować, łączyć lub kompresować pliki prywatnie w przeglądarce.",
    toolsHeading: "Narzędzia PDF",
    toolsAria: "Narzędzia PDF",
    openTool: "Otwórz →",
  },
  ad: {
    sponsored: "Sponsorowane",
    titleBefore: "Krótka reklama przed",
    supportMessage:
      "Obejrzenie reklamy pomaga utrzymać PurePDF przy życiu i bezpłatnym dla wszystkich. Dziękujemy za wsparcie projektu.",
    close: "Zamknij reklamę",
    wait: "Poczekaj kilka sekund — to pomaga nam pozostać bezpłatnymi…",
    thanks: "Dziękujemy za wsparcie! Możesz przejść do narzędzia.",
    continue: "Kontynuuj do",
    watch: "Obejrzyj wideo sponsora",
    watching: "Trwa odtwarzanie sponsora…",
    waitHint:
      "Kliknij przycisk poniżej, aby uruchomić blok Adsterra. Nie można kontynuować bez obejrzenia.",
    progress: (seconds) => `${seconds} s`,
    slotLabel: "Blok sponsora Adsterra",
  },
  rewardedAd: {
    sponsored: "Wesprzyj projekt",
    title: "Pobierz gotowy dokument",
    message:
      "Krótki blok sponsora to jedyny warunek, by PurePDF pozostał darmowy, w pełni prywatny i bez rejestracji oraz subskrypcji.",
    watch: "Obejrzyj wideo sponsora, aby pobrać",
    watching: "Trwa odtwarzanie sponsora…",
    download: "Pobierz plik",
    waitHint:
      "Kliknij przycisk poniżej, aby uruchomić blok Adsterra. Nie można kontynuować bez obejrzenia.",
    progress: (seconds) => `${seconds} s`,
    thanks:
      "Dziękujemy za obejrzenie. Kliknij przycisk poniżej, aby zapisać plik na urządzeniu.",
    close: "Zamknij",
    slotLabel: "Blok sponsora Adsterra",
  },
  common: {
    backToTools: "Wróć do narzędzi",
    dropzoneTitle: "Upuść pliki tutaj lub kliknij, aby wybrać",
    clearAll: "Wyczyść wszystko",
    up: "W górę",
    down: "W dół",
    remove: "Usuń",
    downloadPdf: "Pobierz PDF",
    building: "Tworzenie PDF…",
    merging: "Łączenie…",
    optimizing: "Optymalizacja…",
    converting: "Konwersja…",
    exporting: "Eksport…",
    before: "Przed",
    after: "Po",
    saved: "Oszczędność",
    minimalChange: "Minimalna zmiana",
    downloadReadyPdf: "Pobierz gotowy PDF",
    downloadReadyZip: "Pobierz archiwum ZIP",
  },
  tools: {
    "images-to-pdf": {
      title: "Obrazy do PDF",
      description:
        "Prześlij obrazy, ułóż kolejność stron i pobierz jeden PDF. Przetwarzanie w przeglądarce.",
      hint: "JPG, PNG i WebP. Każdy obraz to osobna strona PDF.",
      action: "Utwórz PDF",
      processAction: "Złóż PDF",
      errors: {
        invalid: "Wybierz obrazy JPG, PNG lub WebP.",
        failed: "Nie udało się utworzyć PDF.",
      },
    },
    "pdf-to-images": {
      title: "PDF na obrazy",
      description:
        "Eksportuj każdą stronę PDF do PNG lub JPG w przeglądarce (pdf.js), pobierz archiwum ZIP.",
      hint: "Jeden PDF. Każda strona jako osobny obraz w ZIP.",
      action: "Eksportuj strony",
      processAction: "Przygotuj archiwum ZIP",
      errors: {
        invalid: "Wybierz prawidłowy plik PDF.",
        failed: "Nie udało się wyeksportować stron.",
      },
    },
    "merge-pdf": {
      title: "Połącz PDF",
      description:
        "Połącz wiele PDF w wybranej kolejności. Pliki nie opuszczają urządzenia.",
      hint: "Dwa lub więcej PDF. Strzałki zmieniają kolejność.",
      action: "Połącz PDF",
      processAction: "Połącz pliki",
      errors: {
        invalid: "Wybierz prawidłowe pliki PDF.",
        failed: "Nie udało się połączyć PDF.",
      },
    },
    "compress-pdf": {
      title: "Kompresuj PDF",
      description:
        "Przebuduj PDF w przeglądarce, aby zmniejszyć rozmiar (pdf-lib).",
      hint: "Jeden PDF. Optymalizacja lokalnie — bez wysyłania na serwer.",
      action: "Optymalizuj PDF",
      processAction: "Skompresuj PDF",
      errors: {
        invalid: "Wybierz prawidłowy plik PDF.",
        failed: "Nie udało się skompresować PDF.",
      },
    },
    "word-to-pdf": {
      title: "Word do PDF",
      description:
        "Konwertuj .docx do PDF w przeglądarce. Złożony układ może nieznacznie różnić się od Worda.",
      hint: "Obsługiwane .docx. Stary format .doc nie jest wspierany.",
      action: "Konwertuj do PDF",
      processAction: "Przygotuj PDF",
      errors: {
        invalid: "Prześlij dokument Word w formacie .docx.",
        failed: "Nie udało się przekonwertować dokumentu.",
      },
    },
    "text-to-pdf": {
      title: "Tekst do PDF",
      description:
        "Zamień notatki lub zwykły tekst w PDF do pobrania — w całości w przeglądarce.",
      hint: "Obsługiwane Unicode i łamanie wierszy.",
      action: "Wygeneruj PDF",
      processAction: "Przygotuj PDF",
      errors: {
        invalid: "Wpisz tekst przed utworzeniem PDF.",
        failed: "Nie udało się utworzyć PDF z tekstu.",
      },
    },
  },
  toolsExtra: {
    ...en.toolsExtra,
    imagesSelected: (n) => `Wybrano ${n} obraz.`,
    pdfsInQueue: (n) => `${n} PDF w kolejce`,
    pageLabel: (i) => `Strona ${i}`,
    positionLabel: (i) => `Pozycja ${i}`,
    compressBalanced: "Zbalansowany",
    compressMaximum: "Maksymalny",
    compressResult: "Wynik kompresji",
    formatLabel: "Format obrazu",
    scaleLabel: (s) => `Skala (${s.toFixed(1)}×)`,
    qualityLabel: (p) => `Jakość JPEG (${p}%)`,
    renderingPage: (c, t) => `Renderowanie strony ${c} z ${t}…`,
    exportedPages: (n) => `Wyeksportowano ${n} str.`,
    preview: "Podgląd",
    preparingPreview: "Przygotowanie podglądu…",
    conversionNotes: "Uwagi konwersji",
    optimization: "Optymalizacja",
    textLabel: "Twój tekst",
    textPlaceholder: "Wklej lub wpisz treść tutaj…",
    charactersCount: (n) => `${n.toLocaleString()} znaków`,
    clearText: "Wyczyść tekst",
  },
  toolAd: {
    sponsored: "Sponsorowane",
    slotTitle: "Miejsce na reklamę",
    slotHint:
      "Partnerzy pomagają utrzymać PurePDF bezpłatnym dla wszystkich.",
  },
  botProtection: {
    rateLimited:
      "Poczekaj kilka sekund przed kolejną generacją pliku.",
    unavailable:
      "Weryfikacja przeglądarki nie powiodła się. Odśwież stronę i spróbuj ponownie.",
  },
};

const de: Dictionary = {
  ...en,
  brand: { name: "PurePDF", tagline: "Schnelle Tools. Kein Ballast." },
  nav: {
    selectLanguage: "Sprache",
    menuAria: "Website-Menü",
    menuClose: "Menü schließen",
  },
  ecosystem: {
    menuLabel: "Unser Ökosystem",
    menuShort: "Ökosystem",
    menuAria: "Projekte unseres Ökosystems",
    menuHint:
      "Verwandte Tools, die lokal im Browser laufen — datenschutzfreundlich und ohne unnötige Uploads.",
    activeHere: "Aktiv",
    comingSoon: "Demnächst",
    close: "Ökosystem-Menü schließen",
    items: {
      purepdf: {
        name: "PurePDF",
        tagline: "Schnelle PDF-Verarbeitungstools.",
      },
      pureQr: {
        name: "PureQR",
        tagline: "Moderne QR-Code-Erstellung & Verwaltung.",
      },
      pureSign: {
        name: "PureSign",
        tagline: "PDF-Dokumente lokal signieren und ausfüllen.",
      },
      pureTable: {
        name: "PureTable",
        tagline: "Geschäftsdienstprogramm zum Parsen von Rechnungen.",
      },
    },
  },
  security: {
    badge: "Client-Side · 100 % lokal",
    badgeShort: "Lokale Verarbeitung",
    bannerTitle: "Ihre Dateien verlassen nie den Browser",
    bannerBody:
      "PurePDF läuft vollständig auf Ihrem Gerät. Dokumente werden nicht auf Server hochgeladen oder an Dritte weitergegeben.",
    pointLocal: "Verarbeitung nur im Browser",
    pointNoUpload: "Kein Server-Upload",
    pointPrivate: "Standardmäßig privat",
    toolNote: "Client-Side: Dateien bleiben auf Ihrem Gerät.",
  },
  home: {
    heroTitle: "Alle PDF-Tools in einem dunklen Workspace.",
    heroSubtitle:
      "Wählen Sie unten ein Tool, um Dateien privat im Browser zu konvertieren, zusammenzuführen oder zu komprimieren.",
    toolsHeading: "PDF-Tools",
    toolsAria: "PDF-Tools",
    openTool: "Tool öffnen →",
  },
  ad: {
    sponsored: "Gesponsert",
    titleBefore: "Kurze Anzeige vor",
    supportMessage:
      "Wenn Sie diese Anzeige ansehen, bleibt PurePDF am Leben und für alle kostenlos. Vielen Dank für Ihre Unterstützung.",
    close: "Anzeige schließen",
    wait: "Bitte kurz warten — so bleiben wir für alle kostenlos…",
    thanks: "Danke für Ihre Unterstützung! Weiter zum Tool.",
    continue: "Weiter zu",
    watch: "Sponsor-Video ansehen",
    watching: "Sponsor-Ansicht läuft…",
    waitHint:
      "Tippen Sie unten, um den Adsterra-Sponsorblock zu starten. Ein Fortfahren ohne Ansehen ist nicht möglich.",
    progress: (seconds) => `${seconds} s`,
    slotLabel: "Adsterra-Sponsorblock",
  },
  rewardedAd: {
    sponsored: "Projekt unterstützen",
    title: "Fertiges Dokument herunterladen",
    message:
      "Ein kurzer Sponsor-Block ist die einzige Bedingung, damit PurePDF kostenlos, vollständig privat und ohne Registrierung oder Abo bleibt.",
    watch: "Sponsor-Video ansehen, um herunterzuladen",
    watching: "Sponsor-Ansicht läuft…",
    download: "Datei herunterladen",
    waitHint:
      "Tippen Sie unten, um den Adsterra-Sponsorblock zu starten. Ein Fortfahren ohne Ansehen ist nicht möglich.",
    progress: (seconds) => `${seconds} s`,
    thanks:
      "Danke fürs Ansehen. Tippen Sie unten, um die Datei auf Ihrem Gerät zu speichern.",
    close: "Schließen",
    slotLabel: "Adsterra-Sponsorblock",
  },
  common: {
    backToTools: "Zurück zu den Tools",
    dropzoneTitle: "Dateien hier ablegen oder klicken zum Auswählen",
    clearAll: "Alles löschen",
    up: "Hoch",
    down: "Runter",
    remove: "Entfernen",
    downloadPdf: "PDF herunterladen",
    building: "PDF wird erstellt…",
    merging: "Zusammenführen…",
    optimizing: "Optimieren…",
    converting: "Konvertieren…",
    exporting: "Exportieren…",
    before: "Vorher",
    after: "Nachher",
    saved: "Gespart",
    minimalChange: "Minimale Änderung",
    downloadReadyPdf: "Fertiges PDF herunterladen",
    downloadReadyZip: "ZIP-Archiv herunterladen",
  },
  tools: {
    "images-to-pdf": {
      title: "Bilder in PDF",
      description:
        "Bilder hochladen, Reihenfolge festlegen und ein PDF laden. Verarbeitung im Browser.",
      hint: "JPG, PNG und WebP. Jedes Bild wird eine PDF-Seite.",
      action: "PDF erstellen",
      processAction: "PDF zusammenstellen",
      errors: {
        invalid: "Bitte JPG-, PNG- oder WebP-Bilder wählen.",
        failed: "PDF konnte nicht erstellt werden.",
      },
    },
    "pdf-to-images": {
      title: "PDF in Bilder",
      description:
        "Jede PDF-Seite als PNG oder JPG im Browser (pdf.js), Download als ZIP.",
      hint: "Ein PDF. Jede Seite als separates Bild in einer ZIP-Datei.",
      action: "Seiten exportieren",
      processAction: "ZIP-Archiv vorbereiten",
      errors: {
        invalid: "Bitte eine gültige PDF-Datei wählen.",
        failed: "Seiten konnten nicht exportiert werden.",
      },
    },
    "merge-pdf": {
      title: "PDF zusammenführen",
      description:
        "Mehrere PDFs in gewünschter Reihenfolge kombinieren. Dateien verlassen Ihr Gerät nicht.",
      hint: "Zwei oder mehr PDFs. Pfeile steuern die Reihenfolge.",
      action: "PDFs zusammenführen",
      processAction: "Dateien zusammenführen",
      errors: {
        invalid: "Bitte gültige PDF-Dateien wählen.",
        failed: "PDFs konnten nicht zusammengeführt werden.",
      },
    },
    "compress-pdf": {
      title: "PDF komprimieren",
      description:
        "PDF im Browser neu aufbauen, um die Größe mit pdf-lib zu reduzieren.",
      hint: "Ein PDF. Lokale Optimierung — kein Upload auf Server.",
      action: "PDF optimieren",
      processAction: "PDF komprimieren",
      errors: {
        invalid: "Bitte eine gültige PDF-Datei wählen.",
        failed: "PDF konnte nicht komprimiert werden.",
      },
    },
    "word-to-pdf": {
      title: "Word in PDF",
      description:
        ".docx im Browser in PDF konvertieren. Komplexes Layout kann leicht abweichen.",
      hint: "Moderne .docx-Dateien. Legacy .doc wird nicht unterstützt.",
      action: "In PDF konvertieren",
      processAction: "PDF vorbereiten",
      errors: {
        invalid: "Bitte ein Word-Dokument (.docx) hochladen.",
        failed: "Dokument konnte nicht konvertiert werden.",
      },
    },
    "text-to-pdf": {
      title: "Text in PDF",
      description:
        "Notizen oder Klartext im Browser in ein PDF zum Download umwandeln.",
      hint: "Zeilenumbrüche und Unicode werden beibehalten.",
      action: "PDF generieren",
      processAction: "PDF vorbereiten",
      errors: {
        invalid: "Bitte Text eingeben, bevor ein PDF erstellt wird.",
        failed: "PDF aus Text konnte nicht erstellt werden.",
      },
    },
  },
  toolsExtra: {
    ...en.toolsExtra,
    imagesSelected: (n) => `${n} Bild(er) ausgewählt`,
    pdfsInQueue: (n) => `${n} PDF in Warteschlange`,
    pageLabel: (i) => `Seite ${i}`,
    positionLabel: (i) => `Position ${i}`,
    compressBalanced: "Ausgewogen",
    compressMaximum: "Maximum",
    compressResult: "Kompressionsergebnis",
    formatLabel: "Bildformat",
    scaleLabel: (s) => `Auflösung (${s.toFixed(1)}×)`,
    qualityLabel: (p) => `JPEG-Qualität (${p}%)`,
    renderingPage: (c, t) => `Seite ${c} von ${t} wird gerendert…`,
    exportedPages: (n) => `${n} Seite(n) exportiert.`,
    preview: "Vorschau",
    preparingPreview: "Vorschau wird vorbereitet…",
    conversionNotes: "Hinweise zur Konvertierung",
    optimization: "Optimierung",
    textLabel: "Ihr Text",
    textPlaceholder: "Text hier einfügen oder eingeben…",
    charactersCount: (n) => `${n.toLocaleString()} Zeichen`,
    clearText: "Text löschen",
  },
  toolAd: {
    sponsored: "Anzeige",
    slotTitle: "Werbefläche",
    slotHint: "Partneranzeigen helfen, PurePDF für alle kostenlos zu halten.",
  },
  botProtection: {
    rateLimited:
      "Bitte warten Sie einige Sekunden vor der nächsten Dateigenerierung.",
    unavailable:
      "Die Hintergrundprüfung des Browsers ist fehlgeschlagen. Seite neu laden und erneut versuchen.",
  },
};

const es: Dictionary = {
  ...en,
  brand: { name: "PurePDF", tagline: "Herramientas rápidas. Sin ruido." },
  nav: {
    selectLanguage: "Idioma",
    menuAria: "Menú del sitio",
    menuClose: "Cerrar menú",
  },
  ecosystem: {
    menuLabel: "Nuestro ecosistema",
    menuShort: "Ecosistema",
    menuAria: "Proyectos de nuestro ecosistema",
    menuHint:
      "Herramientas relacionadas que funcionan en el navegador — privacidad primero, sin subidas innecesarias.",
    activeHere: "Activo",
    comingSoon: "Próximamente",
    close: "Cerrar menú del ecosistema",
    items: {
      purepdf: {
        name: "PurePDF",
        tagline: "Herramientas rápidas para archivos PDF.",
      },
      pureQr: {
        name: "PureQR",
        tagline: "Generador y gestor de códigos QR.",
      },
      pureSign: {
        name: "PureSign",
        tagline: "Firma y completa archivos PDF localmente.",
      },
      pureTable: {
        name: "PureTable",
        tagline: "Utilidad de negocio para procesar facturas.",
      },
    },
  },
  security: {
    badge: "Client-Side · 100 % local",
    badgeShort: "Procesamiento local",
    bannerTitle: "Tus archivos no salen del navegador",
    bannerBody:
      "PurePDF funciona completamente en tu dispositivo. Los documentos no se suben a servidores ni se comparten con terceros.",
    pointLocal: "Procesamiento solo en el navegador",
    pointNoUpload: "Sin subida al servidor",
    pointPrivate: "Privado por defecto",
    toolNote: "Client-Side: los archivos permanecen en tu dispositivo.",
  },
  home: {
    heroTitle: "Todas las herramientas PDF en un espacio oscuro.",
    heroSubtitle:
      "Elige una herramienta para convertir, unir o comprimir archivos de forma privada en el navegador.",
    toolsHeading: "Herramientas PDF",
    toolsAria: "Herramientas PDF",
    openTool: "Abrir →",
  },
  ad: {
    sponsored: "Patrocinado",
    titleBefore: "Anuncio breve antes de",
    supportMessage:
      "Ver este anuncio ayuda a mantener PurePDF activo y gratis para todos. Gracias por apoyar el proyecto.",
    close: "Cerrar anuncio",
    wait: "Espera unos segundos — esto nos ayuda a seguir siendo gratis…",
    thanks: "¡Gracias por tu apoyo! Ya puedes continuar a tu herramienta.",
    continue: "Continuar a",
    watch: "Ver vídeo del patrocinador",
    watching: "Reproducción del patrocinador en curso…",
    waitHint:
      "Pulsa el botón para iniciar el bloque Adsterra. No se puede continuar sin verlo.",
    progress: (seconds) => `${seconds} s`,
    slotLabel: "Bloque patrocinador Adsterra",
  },
  rewardedAd: {
    sponsored: "Apoya el proyecto",
    title: "Descargar el documento listo",
    message:
      "Un breve bloque de patrocinio es la única condición para mantener PurePDF gratis, totalmente privado y sin registros ni suscripciones.",
    watch: "Ver vídeo del patrocinador para descargar",
    watching: "Reproducción del patrocinador en curso…",
    download: "Descargar archivo",
    waitHint:
      "Pulsa el botón para iniciar el bloque Adsterra. No se puede continuar sin verlo.",
    progress: (seconds) => `${seconds} s`,
    thanks:
      "Gracias por ver el anuncio. Pulsa el botón de abajo para guardar el archivo en tu dispositivo.",
    close: "Cerrar",
    slotLabel: "Bloque patrocinador Adsterra",
  },
  common: {
    backToTools: "Volver a herramientas",
    dropzoneTitle: "Suelta archivos aquí o haz clic para buscar",
    clearAll: "Borrar todo",
    up: "Subir",
    down: "Bajar",
    remove: "Eliminar",
    downloadPdf: "Descargar PDF",
    building: "Creando PDF…",
    merging: "Uniendo…",
    optimizing: "Optimizando…",
    converting: "Convirtiendo…",
    exporting: "Exportando…",
    before: "Antes",
    after: "Después",
    saved: "Ahorro",
    minimalChange: "Cambio mínimo",
    downloadReadyPdf: "Descargar PDF listo",
    downloadReadyZip: "Descargar archivo ZIP",
  },
  tools: {
    "images-to-pdf": {
      title: "Imágenes a PDF",
      description:
        "Sube imágenes, ordena páginas y descarga un PDF. Todo en el navegador.",
      hint: "JPG, PNG y WebP. Cada imagen es una página PDF.",
      action: "Crear PDF",
      processAction: "Montar PDF",
      errors: {
        invalid: "Elige imágenes JPG, PNG o WebP.",
        failed: "No se pudo crear el PDF.",
      },
    },
    "pdf-to-images": {
      title: "PDF a imágenes",
      description:
        "Exporta cada página a PNG o JPG con pdf.js y descarga un ZIP.",
      hint: "Un PDF. Cada página como imagen dentro de un ZIP.",
      action: "Exportar páginas",
      processAction: "Preparar archivo ZIP",
      errors: {
        invalid: "Elige un PDF válido.",
        failed: "No se pudieron exportar las páginas.",
      },
    },
    "merge-pdf": {
      title: "Unir PDF",
      description:
        "Combina varios PDF en el orden que elijas. Los archivos no salen de tu dispositivo.",
      hint: "Dos o más PDF. Las flechas controlan el orden.",
      action: "Unir PDF",
      processAction: "Fusionar archivos",
      errors: {
        invalid: "Elige archivos PDF válidos.",
        failed: "No se pudieron unir los PDF.",
      },
    },
    "compress-pdf": {
      title: "Comprimir PDF",
      description:
        "Reconstruye el PDF en el navegador para reducir tamaño con pdf-lib.",
      hint: "Un PDF. Optimización local — sin subida al servidor.",
      action: "Optimizar PDF",
      processAction: "Comprimir PDF",
      errors: {
        invalid: "Elige un PDF válido.",
        failed: "No se pudo comprimir el PDF.",
      },
    },
    "word-to-pdf": {
      title: "Word a PDF",
      description:
        "Convierte .docx a PDF en el navegador. Diseños complejos pueden variar ligeramente.",
      hint: "Solo .docx modernos. El formato .doc antiguo no está soportado.",
      action: "Convertir a PDF",
      processAction: "Preparar PDF",
      errors: {
        invalid: "Sube un documento Word .docx.",
        failed: "No se pudo convertir el documento.",
      },
    },
    "text-to-pdf": {
      title: "Texto a PDF",
      description:
        "Convierte notas o texto plano en un PDF descargable en el navegador.",
      hint: "Se conservan saltos de línea y Unicode.",
      action: "Generar PDF",
      processAction: "Preparar PDF",
      errors: {
        invalid: "Introduce texto antes de generar el PDF.",
        failed: "No se pudo crear el PDF a partir del texto.",
      },
    },
  },
  toolsExtra: {
    ...en.toolsExtra,
    imagesSelected: (n) => `${n} imagen(es) seleccionada(s)`,
    pdfsInQueue: (n) => `${n} PDF en cola`,
    pageLabel: (i) => `Página ${i}`,
    positionLabel: (i) => `Posición ${i}`,
    compressBalanced: "Equilibrado",
    compressMaximum: "Máximo",
    compressResult: "Resultado de compresión",
    formatLabel: "Formato de imagen",
    scaleLabel: (s) => `Escala (${s.toFixed(1)}×)`,
    qualityLabel: (p) => `Calidad JPEG (${p}%)`,
    renderingPage: (c, t) => `Renderizando página ${c} de ${t}…`,
    exportedPages: (n) => `Exportadas ${n} pág.`,
    preview: "Vista previa",
    preparingPreview: "Preparando vista previa…",
    conversionNotes: "Notas de conversión",
    optimization: "Optimización",
    textLabel: "Tu texto",
    textPlaceholder: "Pega o escribe tu contenido aquí…",
    charactersCount: (n) => `${n.toLocaleString()} caracteres`,
    clearText: "Borrar texto",
  },
  toolAd: {
    sponsored: "Patrocinado",
    slotTitle: "Espacio publicitario",
    slotHint: "Los anuncios de socios ayudan a mantener PurePDF gratis.",
  },
  botProtection: {
    rateLimited:
      "Espera unos segundos antes de generar otro archivo.",
    unavailable:
      "La verificación del navegador no se completó. Actualiza la página e inténtalo de nuevo.",
  },
};

const fr: Dictionary = {
  ...en,
  brand: { name: "PurePDF", tagline: "Outils rapides. Zéro superflu." },
  nav: {
    selectLanguage: "Langue",
    menuAria: "Menu du site",
    menuClose: "Fermer le menu",
  },
  ecosystem: {
    menuLabel: "Notre écosystème",
    menuShort: "Écosystème",
    menuAria: "Projets de notre écosystème",
    menuHint:
      "Outils associés, exécutés localement dans le navigateur — confidentialité d’abord, sans envois superflus.",
    activeHere: "Actif",
    comingSoon: "Bientôt",
    close: "Fermer le menu écosystème",
    items: {
      purepdf: {
        name: "PurePDF",
        tagline: "Outils de traitement PDF rapides.",
      },
      pureQr: {
        name: "PureQR",
        tagline: "Générateur et gestionnaire de codes QR.",
      },
      pureSign: {
        name: "PureSign",
        tagline: "Signer et remplir des PDF localement.",
      },
      pureTable: {
        name: "PureTable",
        tagline: "Utilitaire métier pour analyser les factures.",
      },
    },
  },
  security: {
    badge: "Client-Side · 100 % local",
    badgeShort: "Traitement local",
    bannerTitle: "Vos fichiers ne quittent jamais le navigateur",
    bannerBody:
      "PurePDF fonctionne entièrement sur votre appareil. Les documents ne sont pas envoyés sur des serveurs ni partagés avec des tiers.",
    pointLocal: "Traitement uniquement dans le navigateur",
    pointNoUpload: "Aucun envoi serveur",
    pointPrivate: "Confidentialité par défaut",
    toolNote: "Client-Side : les fichiers restent sur votre appareil.",
  },
  home: {
    heroTitle: "Tous les outils PDF dans un espace sombre.",
    heroSubtitle:
      "Choisissez un outil pour convertir, fusionner ou compresser vos fichiers en privé dans le navigateur.",
    toolsHeading: "Outils PDF",
    toolsAria: "Outils PDF",
    openTool: "Ouvrir →",
  },
  ad: {
    sponsored: "Sponsorisé",
    titleBefore: "Courte pub avant",
    supportMessage:
      "Regarder cette publicité aide à garder PurePDF actif et gratuit pour tous. Merci de soutenir le projet.",
    close: "Fermer la publicité",
    wait: "Patientez quelques secondes — cela nous aide à rester gratuits…",
    thanks: "Merci pour votre soutien ! Vous pouvez continuer vers l’outil.",
    continue: "Continuer vers",
    watch: "Regarder la vidéo sponsor",
    watching: "Visionnage sponsor en cours…",
    waitHint:
      "Appuyez ci-dessous pour lancer le bloc Adsterra. Impossible de continuer sans le regarder.",
    progress: (seconds) => `${seconds} s`,
    slotLabel: "Bloc sponsor Adsterra",
  },
  rewardedAd: {
    sponsored: "Soutenir le projet",
    title: "Télécharger le document prêt",
    message:
      "Un court bloc sponsor est la seule condition pour garder PurePDF gratuit, entièrement privé, sans inscription ni abonnement.",
    watch: "Regarder la vidéo sponsor pour télécharger",
    watching: "Visionnage sponsor en cours…",
    download: "Télécharger le fichier",
    waitHint:
      "Appuyez ci-dessous pour lancer le bloc Adsterra. Impossible de continuer sans le regarder.",
    progress: (seconds) => `${seconds} s`,
    thanks:
      "Merci d’avoir regardé. Appuyez sur le bouton ci-dessous pour enregistrer le fichier.",
    close: "Fermer",
    slotLabel: "Bloc sponsor Adsterra",
  },
  common: {
    backToTools: "Retour aux outils",
    dropzoneTitle: "Déposez des fichiers ici ou cliquez pour parcourir",
    clearAll: "Tout effacer",
    up: "Monter",
    down: "Descendre",
    remove: "Supprimer",
    downloadPdf: "Télécharger le PDF",
    building: "Création du PDF…",
    merging: "Fusion…",
    optimizing: "Optimisation…",
    converting: "Conversion…",
    exporting: "Export…",
    before: "Avant",
    after: "Après",
    saved: "Économie",
    minimalChange: "Changement minimal",
    downloadReadyPdf: "Télécharger le PDF prêt",
    downloadReadyZip: "Télécharger l’archive ZIP",
  },
  tools: {
    "images-to-pdf": {
      title: "Images en PDF",
      description:
        "Importez des images, ordonnez les pages et téléchargez un PDF. Traitement dans le navigateur.",
      hint: "JPG, PNG et WebP. Chaque image devient une page PDF.",
      action: "Créer le PDF",
      processAction: "Assembler le PDF",
      errors: {
        invalid: "Choisissez des images JPG, PNG ou WebP.",
        failed: "Impossible de créer le PDF.",
      },
    },
    "pdf-to-images": {
      title: "PDF en images",
      description:
        "Exportez chaque page en PNG ou JPG avec pdf.js, téléchargez une archive ZIP.",
      hint: "Un PDF. Chaque page en image dans un ZIP.",
      action: "Exporter les pages",
      processAction: "Préparer l’archive ZIP",
      errors: {
        invalid: "Choisissez un PDF valide.",
        failed: "Impossible d’exporter les pages.",
      },
    },
    "merge-pdf": {
      title: "Fusionner PDF",
      description:
        "Combinez plusieurs PDF dans l’ordre choisi. Les fichiers ne quittent pas votre appareil.",
      hint: "Deux PDF ou plus. Les flèches contrôlent l’ordre.",
      action: "Fusionner les PDF",
      processAction: "Fusionner les fichiers",
      errors: {
        invalid: "Choisissez des PDF valides.",
        failed: "Impossible de fusionner les PDF.",
      },
    },
    "compress-pdf": {
      title: "Compresser PDF",
      description:
        "Reconstruisez le PDF dans le navigateur pour réduire la taille avec pdf-lib.",
      hint: "Un PDF. Optimisation locale — aucun envoi serveur.",
      action: "Optimiser le PDF",
      processAction: "Compresser le PDF",
      errors: {
        invalid: "Choisissez un PDF valide.",
        failed: "Impossible de compresser le PDF.",
      },
    },
    "word-to-pdf": {
      title: "Word en PDF",
      description:
        "Convertissez des .docx en PDF dans le navigateur. Les mises en page complexes peuvent légèrement différer.",
      hint: "Fichiers .docx modernes. L’ancien .doc n’est pas pris en charge.",
      action: "Convertir en PDF",
      processAction: "Préparer le PDF",
      errors: {
        invalid: "Importez un document Word .docx.",
        failed: "Impossible de convertir le document.",
      },
    },
    "text-to-pdf": {
      title: "Texte en PDF",
      description:
        "Transformez notes ou texte brut en PDF téléchargeable dans le navigateur.",
      hint: "Sauts de ligne et Unicode conservés.",
      action: "Générer le PDF",
      processAction: "Préparer le PDF",
      errors: {
        invalid: "Saisissez du texte avant de générer le PDF.",
        failed: "Impossible de créer le PDF à partir du texte.",
      },
    },
  },
  toolsExtra: {
    ...en.toolsExtra,
    imagesSelected: (n) => `${n} image(s) sélectionnée(s)`,
    pdfsInQueue: (n) => `${n} PDF en file`,
    pageLabel: (i) => `Page ${i}`,
    positionLabel: (i) => `Position ${i}`,
    compressBalanced: "Équilibré",
    compressMaximum: "Maximum",
    compressResult: "Résultat de compression",
    formatLabel: "Format d’image",
    scaleLabel: (s) => `Échelle (${s.toFixed(1)}×)`,
    qualityLabel: (p) => `Qualité JPEG (${p}%)`,
    renderingPage: (c, t) => `Rendu page ${c} sur ${t}…`,
    exportedPages: (n) => `${n} page(s) exportée(s).`,
    preview: "Aperçu",
    preparingPreview: "Préparation de l’aperçu…",
    conversionNotes: "Notes de conversion",
    optimization: "Optimisation",
    textLabel: "Votre texte",
    textPlaceholder: "Collez ou saisissez votre contenu ici…",
    charactersCount: (n) => `${n.toLocaleString()} caractères`,
    clearText: "Effacer le texte",
  },
  toolAd: {
    sponsored: "Sponsorisé",
    slotTitle: "Espace publicitaire",
    slotHint: "Les annonces partenaires aident à garder PurePDF gratuit.",
  },
  botProtection: {
    rateLimited:
      "Veuillez patienter quelques secondes avant une nouvelle génération.",
    unavailable:
      "La vérification du navigateur a échoué. Actualisez la page et réessayez.",
  },
};

export const dictionaries: Record<Locale, Dictionary> = {
  uk,
  en,
  pl,
  de,
  es,
  fr,
};

export const LOCALE_LABELS: Record<
  Locale,
  { code: string; native: string; flag: string }
> = {
  uk: { code: "UK", native: "Українська", flag: "🇺🇦" },
  en: { code: "EN", native: "English", flag: "🇬🇧" },
  pl: { code: "PL", native: "Polski", flag: "🇵🇱" },
  de: { code: "DE", native: "Deutsch", flag: "🇩🇪" },
  es: { code: "ES", native: "Español", flag: "🇪🇸" },
  fr: { code: "FR", native: "Français", flag: "🇫🇷" },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export const STORAGE_KEY = "purepdf-locale";
