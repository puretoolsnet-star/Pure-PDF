import type { Locale } from "@/i18n/locale-types";

export type SignToolUiCopy = {
  workspaceHint: string;
  selectPageHint: string;
  selectedPage: (page: number) => string;
  modeDraw: string;
  modeText: string;
  signaturePadLabel: string;
  textSignatureLabel: string;
  textSignaturePlaceholder: string;
  clearSignature: string;
  strokeWidth: string;
  strokeColor: string;
  colorCyan: string;
  colorWhite: string;
  colorInk: string;
  placementTitle: string;
  placementLeft: string;
  placementCenter: string;
  placementRight: string;
  marginBottom: string;
  signatureSize: string;
  removeFile: string;
  successTitle: string;
  successBody: string;
  errNoSignature: string;
  errNoPage: string;
  rewardedTitle: string;
  rewardedMessage: string;
  processing: string;
  loadingThumbnails: string;
  thumbnailProgress: (current: number, total: number) => string;
};

export const SIGN_TOOL_UI: Record<Locale, SignToolUiCopy> = {
  uk: {
    workspaceHint:
      "Оберіть сторінку в сітці, намалюйте підпис пальцем або мишею, або введіть текстом. Підпис накладається внизу сторінки.",
    selectPageHint: "Клацніть мініатюру, щоб обрати сторінку для підпису.",
    selectedPage: (p) => `Підпис на сторінці ${p}`,
    modeDraw: "Малювання",
    modeText: "Текст",
    signaturePadLabel: "Поле для підпису від руки",
    textSignatureLabel: "Текстовий підпис",
    textSignaturePlaceholder: "Ініціали або ПІБ",
    clearSignature: "Очистити підпис",
    strokeWidth: "Товщина лінії",
    strokeColor: "Колір",
    colorCyan: "Блакитний",
    colorWhite: "Білий",
    colorInk: "Чорнило",
    placementTitle: "Позиція на сторінці",
    placementLeft: "Ліворуч",
    placementCenter: "По центру",
    placementRight: "Праворуч",
    marginBottom: "Відступ знизу",
    signatureSize: "Розмір підпису",
    removeFile: "Прибрати файл",
    successTitle: "PDF підписано",
    successBody: "Документ із візуальним підписом готовий до завантаження.",
    errNoSignature: "Створіть підпис (малюнок або текст) перед збереженням.",
    errNoPage: "Оберіть сторінку для підпису.",
    rewardedTitle: "Підтримайте проєкт переглядом реклами",
    rewardedMessage: "Коротке відео (5 с) — і ми вставимо підпис локально у браузері.",
    processing: "Вставляємо підпис…",
    loadingThumbnails: "Генеруємо мініатюри сторінок…",
    thumbnailProgress: (c, t) => `Мініатюри ${c} / ${t}`,
  },
  en: {
    workspaceHint:
      "Pick a page, draw your signature with finger or mouse, or type it. The signature is placed near the bottom of the page.",
    selectPageHint: "Tap a thumbnail to choose the signing page.",
    selectedPage: (p) => `Signing page ${p}`,
    modeDraw: "Draw",
    modeText: "Text",
    signaturePadLabel: "Hand-drawn signature pad",
    textSignatureLabel: "Typed signature",
    textSignaturePlaceholder: "Name or initials",
    clearSignature: "Clear signature",
    strokeWidth: "Stroke width",
    strokeColor: "Color",
    colorCyan: "Cyan",
    colorWhite: "White",
    colorInk: "Ink",
    placementTitle: "Position on page",
    placementLeft: "Left",
    placementCenter: "Center",
    placementRight: "Right",
    marginBottom: "Bottom offset",
    signatureSize: "Signature size",
    removeFile: "Remove file",
    successTitle: "PDF signed",
    successBody: "Your visually signed document is ready to download.",
    errNoSignature: "Create a signature (draw or type) before saving.",
    errNoPage: "Select a page to sign.",
    rewardedTitle: "Support the project by watching an ad",
    rewardedMessage: "A 5-second video — then we place the signature locally.",
    processing: "Placing signature…",
    loadingThumbnails: "Rendering page thumbnails…",
    thumbnailProgress: (c, t) => `Thumbnails ${c} / ${t}`,
  },
  pl: {
    workspaceHint:
      "Wybierz stronę, narysuj podpis lub wpisz tekstem. Podpis trafia u dołu strony.",
    selectPageHint: "Kliknij miniaturę, aby wybrać stronę.",
    selectedPage: (p) => `Podpis na stronie ${p}`,
    modeDraw: "Rysuj",
    modeText: "Tekst",
    signaturePadLabel: "Pole podpisu odręcznego",
    textSignatureLabel: "Podpis tekstowy",
    textSignaturePlaceholder: "Imię lub inicjały",
    clearSignature: "Wyczyść podpis",
    strokeWidth: "Grubość linii",
    strokeColor: "Kolor",
    colorCyan: "Cyjan",
    colorWhite: "Biały",
    colorInk: "Atrament",
    placementTitle: "Pozycja na stronie",
    placementLeft: "Lewo",
    placementCenter: "Środek",
    placementRight: "Prawo",
    marginBottom: "Odstęp od dołu",
    signatureSize: "Rozmiar podpisu",
    removeFile: "Usuń plik",
    successTitle: "PDF podpisany",
    successBody: "Dokument z podpisem jest gotowy do pobrania.",
    errNoSignature: "Utwórz podpis przed zapisem.",
    errNoPage: "Wybierz stronę do podpisu.",
    rewardedTitle: "Wesprzyj projekt, oglądając reklamę",
    rewardedMessage: "5 sekund wideo — potem lokalne umieszczenie podpisu.",
    processing: "Umieszczanie podpisu…",
    loadingThumbnails: "Generowanie miniaturek…",
    thumbnailProgress: (c, t) => `Miniatury ${c} / ${t}`,
  },
  de: {
    workspaceHint:
      "Seite wählen, Signatur zeichnen oder als Text eingeben. Unten auf der Seite platziert.",
    selectPageHint: "Miniatur antippen, um die Seite zu wählen.",
    selectedPage: (p) => `Signatur auf Seite ${p}`,
    modeDraw: "Zeichnen",
    modeText: "Text",
    signaturePadLabel: "Unterschriftenfeld",
    textSignatureLabel: "Textsignatur",
    textSignaturePlaceholder: "Name oder Initialen",
    clearSignature: "Signatur löschen",
    strokeWidth: "Strichstärke",
    strokeColor: "Farbe",
    colorCyan: "Cyan",
    colorWhite: "Weiß",
    colorInk: "Tinte",
    placementTitle: "Position auf der Seite",
    placementLeft: "Links",
    placementCenter: "Mitte",
    placementRight: "Rechts",
    marginBottom: "Abstand unten",
    signatureSize: "Signaturgröße",
    removeFile: "Datei entfernen",
    successTitle: "PDF signiert",
    successBody: "Dokument mit Signatur kann heruntergeladen werden.",
    errNoSignature: "Signatur erstellen vor dem Speichern.",
    errNoPage: "Seite zum Signieren wählen.",
    rewardedTitle: "Projekt durch Werbung unterstützen",
    rewardedMessage: "5 Sekunden Video — dann Signatur lokal platzieren.",
    processing: "Signatur wird platziert…",
    loadingThumbnails: "Miniaturen werden erstellt…",
    thumbnailProgress: (c, t) => `Miniaturen ${c} / ${t}`,
  },
  es: {
    workspaceHint:
      "Elige página, dibuja o escribe la firma. Se coloca en la parte inferior.",
    selectPageHint: "Toca una miniatura para elegir la página.",
    selectedPage: (p) => `Firma en página ${p}`,
    modeDraw: "Dibujar",
    modeText: "Texto",
    signaturePadLabel: "Lienzo de firma manuscrita",
    textSignatureLabel: "Firma escrita",
    textSignaturePlaceholder: "Nombre o iniciales",
    clearSignature: "Borrar firma",
    strokeWidth: "Grosor",
    strokeColor: "Color",
    colorCyan: "Cian",
    colorWhite: "Blanco",
    colorInk: "Tinta",
    placementTitle: "Posición en la página",
    placementLeft: "Izquierda",
    placementCenter: "Centro",
    placementRight: "Derecha",
    marginBottom: "Margen inferior",
    signatureSize: "Tamaño de firma",
    removeFile: "Quitar archivo",
    successTitle: "PDF firmado",
    successBody: "Documento con firma listo para descargar.",
    errNoSignature: "Crea una firma antes de guardar.",
    errNoPage: "Selecciona una página.",
    rewardedTitle: "Apoya el proyecto viendo un anuncio",
    rewardedMessage: "Vídeo de 5 s — luego colocamos la firma localmente.",
    processing: "Colocando firma…",
    loadingThumbnails: "Generando miniaturas…",
    thumbnailProgress: (c, t) => `Miniaturas ${c} / ${t}`,
  },
  fr: {
    workspaceHint:
      "Choisissez une page, dessinez ou saisissez la signature. Placée en bas de page.",
    selectPageHint: "Touchez une miniature pour choisir la page.",
    selectedPage: (p) => `Signature sur la page ${p}`,
    modeDraw: "Dessiner",
    modeText: "Texte",
    signaturePadLabel: "Zone de signature manuscrite",
    textSignatureLabel: "Signature texte",
    textSignaturePlaceholder: "Nom ou initiales",
    clearSignature: "Effacer la signature",
    strokeWidth: "Épaisseur",
    strokeColor: "Couleur",
    colorCyan: "Cyan",
    colorWhite: "Blanc",
    colorInk: "Encre",
    placementTitle: "Position sur la page",
    placementLeft: "Gauche",
    placementCenter: "Centre",
    placementRight: "Droite",
    marginBottom: "Marge basse",
    signatureSize: "Taille de la signature",
    removeFile: "Retirer le fichier",
    successTitle: "PDF signé",
    successBody: "Document avec signature prêt au téléchargement.",
    errNoSignature: "Créez une signature avant d’enregistrer.",
    errNoPage: "Sélectionnez une page.",
    rewardedTitle: "Soutenez le projet en regardant une publicité",
    rewardedMessage: "Vidéo de 5 s — puis placement local de la signature.",
    processing: "Placement de la signature…",
    loadingThumbnails: "Génération des miniatures…",
    thumbnailProgress: (c, t) => `Miniatures ${c} / ${t}`,
  },
};

export const SIGN_STROKE_COLORS = {
  cyan: "#22d3ee",
  white: "#f8fafc",
  ink: "#0f172a",
} as const;
