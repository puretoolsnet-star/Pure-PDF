import type { Locale } from "@/i18n/locale-types";

export type OrganizeToolUiCopy = {
  workspaceHint: string;
  dragHint: string;
  positionLabel: (position: number) => string;
  sourcePageLabel: (page: number) => string;
  moveLeft: string;
  moveRight: string;
  moveToPosition: string;
  positionInputAria: (page: number) => string;
  dragHandle: string;
  removePage: (page: number) => string;
  removeFile: string;
  resetOrder: string;
  pagesRemaining: (count: number) => string;
  successTitle: string;
  successBody: string;
  errNoChanges: string;
  errEmpty: string;
  rewardedTitle: string;
  rewardedMessage: string;
  processing: string;
  loadingThumbnails: string;
  thumbnailProgress: (current: number, total: number) => string;
  zoomPreview: string;
  previewTitle: (page: number) => string;
  previewClose: string;
  previewLoading: string;
};

export const ORGANIZE_TOOL_UI: Record<Locale, OrganizeToolUiCopy> = {
  uk: {
    workspaceHint:
      "Змінюйте порядок: перетягніть за ручку, стрілками або введіть новий номер позиції. Кошик — прибрати сторінку з документа.",
    dragHint: "Перетягніть картку на іншу, щоб поміняти місцями.",
    positionLabel: (n) => `Позиція ${n}`,
    sourcePageLabel: (p) => `З файлу: стор. ${p}`,
    moveLeft: "На позицію раніше",
    moveRight: "На позицію далі",
    moveToPosition: "№",
    positionInputAria: (p) => `Нова позиція для сторінки ${p} з оригіналу`,
    dragHandle: "Перетягнути сторінку",
    removePage: (p) => `Прибрати сторінку ${p} з документа`,
    removeFile: "Прибрати файл",
    resetOrder: "Скинути порядок і повернути всі сторінки",
    pagesRemaining: (n) => `У новому PDF: ${n} стор.`,
    successTitle: "Порядок збережено",
    successBody: "PDF із новим порядком сторінок готовий до завантаження.",
    errNoChanges: "Спочатку змініть порядок або приберіть сторінки.",
    errEmpty: "Залиште хоча б одну сторінку в документі.",
    rewardedTitle: "Підтримайте проєкт переглядом реклами",
    rewardedMessage: "Коротке відео (5 с) — і ми зберемо PDF у вашому порядку.",
    processing: "Формуємо новий PDF…",
    loadingThumbnails: "Генеруємо мініатюри сторінок…",
    thumbnailProgress: (c, t) => `Мініатюри ${c} / ${t}`,
    zoomPreview: "Збільшити перегляд сторінки",
    previewTitle: (p) => `Сторінка ${p} — детальний перегляд`,
    previewClose: "Закрити",
    previewLoading: "Завантаження чіткого перегляду…",
  },
  en: {
    workspaceHint:
      "Reorder pages: drag by the handle, use arrows, or type a new position number. Trash removes a page from the output.",
    dragHint: "Drop a card onto another to swap their positions.",
    positionLabel: (n) => `Position ${n}`,
    sourcePageLabel: (p) => `From file: p. ${p}`,
    moveLeft: "Move earlier",
    moveRight: "Move later",
    moveToPosition: "#",
    positionInputAria: (p) => `New position for original page ${p}`,
    dragHandle: "Drag to reorder",
    removePage: (p) => `Remove page ${p} from output`,
    removeFile: "Remove file",
    resetOrder: "Reset order and restore all pages",
    pagesRemaining: (n) => `${n} page${n === 1 ? "" : "s"} in output`,
    successTitle: "Order saved",
    successBody: "Your reordered PDF is ready to download.",
    errNoChanges: "Change page order or remove pages before exporting.",
    errEmpty: "Keep at least one page in the document.",
    rewardedTitle: "Support the project by watching an ad",
    rewardedMessage: "A 5-second video — then we build your PDF in the new order.",
    processing: "Building your PDF…",
    loadingThumbnails: "Rendering page thumbnails…",
    thumbnailProgress: (c, t) => `Thumbnails ${c} / ${t}`,
    zoomPreview: "Enlarge page preview",
    previewTitle: (p) => `Page ${p} — detailed view`,
    previewClose: "Close",
    previewLoading: "Loading high-resolution preview…",
  },
  pl: {
    workspaceHint:
      "Zmieniaj kolejność: przeciągnij uchwyt, strzałki lub wpisz numer pozycji. Kosz usuwa stronę z wyniku.",
    dragHint: "Upuść kartę na inną, aby zamienić miejsca.",
    positionLabel: (n) => `Pozycja ${n}`,
    sourcePageLabel: (p) => `Z pliku: str. ${p}`,
    moveLeft: "Wcześniej",
    moveRight: "Później",
    moveToPosition: "№",
    positionInputAria: (p) => `Nowa pozycja dla strony ${p}`,
    dragHandle: "Przeciągnij, aby zmienić kolejność",
    removePage: (p) => `Usuń stronę ${p} z wyniku`,
    removeFile: "Usuń plik",
    resetOrder: "Resetuj kolejność i przywróć wszystkie strony",
    pagesRemaining: (n) => `${n} str. w wyniku`,
    successTitle: "Kolejność zapisana",
    successBody: "PDF z nową kolejnością jest gotowy do pobrania.",
    errNoChanges: "Zmień kolejność lub usuń strony przed eksportem.",
    errEmpty: "Zostaw co najmniej jedną stronę w dokumencie.",
    rewardedTitle: "Wesprzyj projekt, oglądając reklamę",
    rewardedMessage: "5 sekund wideo — potem tworzymy PDF w nowej kolejności.",
    processing: "Tworzenie PDF…",
    loadingThumbnails: "Generowanie miniaturek…",
    thumbnailProgress: (c, t) => `Miniatury ${c} / ${t}`,
    zoomPreview: "Powiększ podgląd strony",
    previewTitle: (p) => `Strona ${p} — widok szczegółowy`,
    previewClose: "Zamknij",
    previewLoading: "Ładowanie podglądu w wysokiej jakości…",
  },
  de: {
    workspaceHint:
      "Reihenfolge ändern: Griff ziehen, Pfeile oder Positionsnummer. Papierkorb entfernt eine Seite aus dem Ergebnis.",
    dragHint: "Karte auf eine andere legen, um Positionen zu tauschen.",
    positionLabel: (n) => `Position ${n}`,
    sourcePageLabel: (p) => `Aus Datei: S. ${p}`,
    moveLeft: "Nach vorne",
    moveRight: "Nach hinten",
    moveToPosition: "Nr.",
    positionInputAria: (p) => `Neue Position für Seite ${p}`,
    dragHandle: "Zum Sortieren ziehen",
    removePage: (p) => `Seite ${p} aus Ausgabe entfernen`,
    removeFile: "Datei entfernen",
    resetOrder: "Reihenfolge zurücksetzen und alle Seiten wiederherstellen",
    pagesRemaining: (n) => `${n} Seite${n === 1 ? "" : "n"} in Ausgabe`,
    successTitle: "Reihenfolge gespeichert",
    successBody: "Das PDF mit neuer Reihenfolge kann heruntergeladen werden.",
    errNoChanges: "Reihenfolge ändern oder Seiten entfernen vor dem Export.",
    errEmpty: "Mindestens eine Seite im Dokument behalten.",
    rewardedTitle: "Projekt durch Werbung unterstützen",
    rewardedMessage: "5 Sekunden Video — dann PDF in neuer Reihenfolge.",
    processing: "PDF wird erstellt…",
    loadingThumbnails: "Seiten-Vorschau wird erstellt…",
    thumbnailProgress: (c, t) => `Miniaturen ${c} / ${t}`,
    zoomPreview: "Seite vergrößern",
    previewTitle: (p) => `Seite ${p} — Detailansicht`,
    previewClose: "Schließen",
    previewLoading: "Scharfe Vorschau wird geladen…",
  },
  es: {
    workspaceHint:
      "Reordena: arrastra el asa, flechas o escribe el número de posición. La papelera quita la página del resultado.",
    dragHint: "Suelta una tarjeta sobre otra para intercambiar posiciones.",
    positionLabel: (n) => `Posición ${n}`,
    sourcePageLabel: (p) => `Del archivo: p. ${p}`,
    moveLeft: "Más arriba",
    moveRight: "Más abajo",
    moveToPosition: "N.º",
    positionInputAria: (p) => `Nueva posición para la página ${p}`,
    dragHandle: "Arrastrar para reordenar",
    removePage: (p) => `Quitar página ${p} del resultado`,
    removeFile: "Quitar archivo",
    resetOrder: "Restablecer orden y recuperar todas las páginas",
    pagesRemaining: (n) => `${n} página${n === 1 ? "" : "s"} en el resultado`,
    successTitle: "Orden guardado",
    successBody: "El PDF reordenado está listo para descargar.",
    errNoChanges: "Cambia el orden o elimina páginas antes de exportar.",
    errEmpty: "Conserva al menos una página en el documento.",
    rewardedTitle: "Apoya el proyecto viendo un anuncio",
    rewardedMessage: "Vídeo de 5 s — luego generamos el PDF en el nuevo orden.",
    processing: "Generando PDF…",
    loadingThumbnails: "Generando miniaturas…",
    thumbnailProgress: (c, t) => `Miniaturas ${c} / ${t}`,
    zoomPreview: "Ampliar vista de página",
    previewTitle: (p) => `Página ${p} — vista detallada`,
    previewClose: "Cerrar",
    previewLoading: "Cargando vista en alta resolución…",
  },
  fr: {
    workspaceHint:
      "Réordonnez : glissez la poignée, flèches ou numéro de position. La corbeille retire la page du résultat.",
    dragHint: "Déposez une carte sur une autre pour échanger les positions.",
    positionLabel: (n) => `Position ${n}`,
    sourcePageLabel: (p) => `Fichier d’origine : p. ${p}`,
    moveLeft: "Vers le haut",
    moveRight: "Vers le bas",
    moveToPosition: "N°",
    positionInputAria: (p) => `Nouvelle position pour la page ${p}`,
    dragHandle: "Glisser pour réordonner",
    removePage: (p) => `Retirer la page ${p} du résultat`,
    removeFile: "Retirer le fichier",
    resetOrder: "Réinitialiser l’ordre et restaurer toutes les pages",
    pagesRemaining: (n) => `${n} page${n === 1 ? "" : "s"} dans le résultat`,
    successTitle: "Ordre enregistré",
    successBody: "Votre PDF réordonné est prêt au téléchargement.",
    errNoChanges: "Modifiez l’ordre ou retirez des pages avant l’export.",
    errEmpty: "Conservez au moins une page dans le document.",
    rewardedTitle: "Soutenez le projet en regardant une publicité",
    rewardedMessage: "Vidéo de 5 s — puis PDF dans le nouvel ordre.",
    processing: "Génération du PDF…",
    loadingThumbnails: "Génération des miniatures…",
    thumbnailProgress: (c, t) => `Miniatures ${c} / ${t}`,
    zoomPreview: "Agrandir l’aperçu",
    previewTitle: (p) => `Page ${p} — vue détaillée`,
    previewClose: "Fermer",
    previewLoading: "Chargement de l’aperçu haute résolution…",
  },
};
