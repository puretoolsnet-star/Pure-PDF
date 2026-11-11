import type { Locale } from "@/i18n/locale-types";

export type RotateToolUiCopy = {
  selectPagesHint: string;
  pageButton: (page: number) => string;
  pagesSelected: (count: number) => string;
  clearSelection: string;
  selectPage: string;
  removeFile: string;
  successTitle: string;
  successBody: string;
  errNoChanges: string;
  rewardedTitle: string;
  rewardedMessage: string;
  processing: string;
  loadingThumbnails: string;
  thumbnailProgress: (current: number, total: number) => string;
  zoomPreview: string;
  previewTitle: (page: number) => string;
  previewClose: string;
  previewLoading: string;
  rotationLabel: (degrees: number) => string;
  rotateCw90: string;
  rotateCcw90: string;
  rotate180: string;
  resetPage: string;
  resetAll: string;
  rotateAllCw: string;
  rotateAllCcw: string;
  rotateAll180: string;
  rotateSelectedCw: string;
  rotateSelectedCcw: string;
  rotateSelected180: string;
  bulkHint: string;
};

export const ROTATE_TOOL_UI: Record<Locale, RotateToolUiCopy> = {
  uk: {
    selectPagesHint:
      "Поверніть окремі сторінки кнопками на картці або скористайтесь масовими діями зверху. Лупа — детальний перегляд.",
    pageButton: (p) => `Сторінка ${p}`,
    pagesSelected: (n) => `${n} стор. обрано для групових дій`,
    clearSelection: "Зняти виділення",
    selectPage: "Обрати сторінку для групових дій",
    removeFile: "Прибрати файл",
    successTitle: "PDF повернуто",
    successBody: "Новий PDF із застосованими кутами готовий до завантаження.",
    errNoChanges: "Спочатку поверніть хоча б одну сторінку.",
    rewardedTitle: "Підтримайте проєкт переглядом реклами",
    rewardedMessage: "Коротке відео (5 с) — і ми одразу зберемо повернутий PDF.",
    processing: "Застосовуємо поворот…",
    loadingThumbnails: "Генеруємо мініатюри сторінок…",
    thumbnailProgress: (c, t) => `Мініатюри ${c} / ${t}`,
    zoomPreview: "Збільшити перегляд сторінки",
    previewTitle: (p) => `Сторінка ${p} — детальний перегляд`,
    previewClose: "Закрити",
    previewLoading: "Завантаження чіткого перегляду…",
    rotationLabel: (d) => `Кут: ${d}°`,
    rotateCw90: "На 90° за годинниковою",
    rotateCcw90: "На 90° проти годинникової",
    rotate180: "На 180°",
    resetPage: "Скинути поворот сторінки",
    resetAll: "Скинути всі повороти",
    rotateAllCw: "Усі сторінки: +90°",
    rotateAllCcw: "Усі сторінки: −90°",
    rotateAll180: "Усі сторінки: 180°",
    rotateSelectedCw: "Обрані: +90°",
    rotateSelectedCcw: "Обрані: −90°",
    rotateSelected180: "Обрані: 180°",
    bulkHint: "Оберіть сторінки (чекбокс), щоб крутити лише їх, або використайте дії для всього документа.",
  },
  en: {
    selectPagesHint:
      "Rotate pages with the card buttons or use bulk actions above. Magnifier opens a detailed preview.",
    pageButton: (p) => `Page ${p}`,
    pagesSelected: (n) => `${n} page${n === 1 ? "" : "s"} selected`,
    clearSelection: "Clear selection",
    selectPage: "Select page for bulk actions",
    removeFile: "Remove file",
    successTitle: "PDF rotated",
    successBody: "Your rotated PDF is ready to download.",
    errNoChanges: "Rotate at least one page before exporting.",
    rewardedTitle: "Support the project by watching an ad",
    rewardedMessage: "A 5-second video — then we build your rotated PDF.",
    processing: "Applying rotation…",
    loadingThumbnails: "Rendering page thumbnails…",
    thumbnailProgress: (c, t) => `Thumbnails ${c} / ${t}`,
    zoomPreview: "Enlarge page preview",
    previewTitle: (p) => `Page ${p} — detailed view`,
    previewClose: "Close",
    previewLoading: "Loading high-resolution preview…",
    rotationLabel: (d) => `Angle: ${d}°`,
    rotateCw90: "Rotate 90° clockwise",
    rotateCcw90: "Rotate 90° counter-clockwise",
    rotate180: "Rotate 180°",
    resetPage: "Reset page rotation",
    resetAll: "Reset all rotations",
    rotateAllCw: "All pages: +90°",
    rotateAllCcw: "All pages: −90°",
    rotateAll180: "All pages: 180°",
    rotateSelectedCw: "Selected: +90°",
    rotateSelectedCcw: "Selected: −90°",
    rotateSelected180: "Selected: 180°",
    bulkHint: "Check pages for batch rotation, or use whole-document actions.",
  },
  pl: {
    selectPagesHint:
      "Obracaj strony przyciskami na karcie lub użyj akcji grupowych u góry. Lupa — podgląd szczegółowy.",
    pageButton: (p) => `Strona ${p}`,
    pagesSelected: (n) => `Wybrano ${n} str.`,
    clearSelection: "Wyczyść wybór",
    selectPage: "Wybierz stronę do akcji grupowych",
    removeFile: "Usuń plik",
    successTitle: "PDF obrócono",
    successBody: "Nowy PDF z zastosowanym obrotem jest gotowy do pobrania.",
    errNoChanges: "Obróć co najmniej jedną stronę przed eksportem.",
    rewardedTitle: "Wesprzyj projekt, oglądając reklamę",
    rewardedMessage: "5 sekund wideo — potem tworzymy obrócony PDF.",
    processing: "Stosowanie obrotu…",
    loadingThumbnails: "Generowanie miniaturek…",
    thumbnailProgress: (c, t) => `Miniatury ${c} / ${t}`,
    zoomPreview: "Powiększ podgląd strony",
    previewTitle: (p) => `Strona ${p} — widok szczegółowy`,
    previewClose: "Zamknij",
    previewLoading: "Ładowanie podglądu w wysokiej jakości…",
    rotationLabel: (d) => `Kąt: ${d}°`,
    rotateCw90: "O 90° zgodnie z ruchem wskazówek",
    rotateCcw90: "O 90° przeciwnie do ruchu wskazówek",
    rotate180: "O 180°",
    resetPage: "Resetuj obrót strony",
    resetAll: "Resetuj wszystkie obroty",
    rotateAllCw: "Wszystkie: +90°",
    rotateAllCcw: "Wszystkie: −90°",
    rotateAll180: "Wszystkie: 180°",
    rotateSelectedCw: "Wybrane: +90°",
    rotateSelectedCcw: "Wybrane: −90°",
    rotateSelected180: "Wybrane: 180°",
    bulkHint: "Zaznacz strony dla obrotu partii lub użyj akcji dla całego dokumentu.",
  },
  de: {
    selectPagesHint:
      "Seiten per Karte drehen oder Sammelaktionen oben. Lupe für Detailvorschau.",
    pageButton: (p) => `Seite ${p}`,
    pagesSelected: (n) => `${n} Seite${n === 1 ? "" : "n"} ausgewählt`,
    clearSelection: "Auswahl löschen",
    selectPage: "Seite für Sammelaktion wählen",
    removeFile: "Datei entfernen",
    successTitle: "PDF gedreht",
    successBody: "Das gedrehte PDF kann heruntergeladen werden.",
    errNoChanges: "Drehen Sie mindestens eine Seite vor dem Export.",
    rewardedTitle: "Projekt durch Werbung unterstützen",
    rewardedMessage: "5 Sekunden Video — dann PDF mit Drehung erstellen.",
    processing: "Drehung wird angewendet…",
    loadingThumbnails: "Seiten-Vorschau wird erstellt…",
    thumbnailProgress: (c, t) => `Miniaturen ${c} / ${t}`,
    zoomPreview: "Seite vergrößern",
    previewTitle: (p) => `Seite ${p} — Detailansicht`,
    previewClose: "Schließen",
    previewLoading: "Scharfe Vorschau wird geladen…",
    rotationLabel: (d) => `Winkel: ${d}°`,
    rotateCw90: "90° im Uhrzeigersinn",
    rotateCcw90: "90° gegen Uhrzeigersinn",
    rotate180: "180° drehen",
    resetPage: "Seitendrehung zurücksetzen",
    resetAll: "Alle Drehungen zurücksetzen",
    rotateAllCw: "Alle Seiten: +90°",
    rotateAllCcw: "Alle Seiten: −90°",
    rotateAll180: "Alle Seiten: 180°",
    rotateSelectedCw: "Auswahl: +90°",
    rotateSelectedCcw: "Auswahl: −90°",
    rotateSelected180: "Auswahl: 180°",
    bulkHint: "Seiten markieren für Stapel-Drehung oder Aktionen für das ganze Dokument.",
  },
  es: {
    selectPagesHint:
      "Gira páginas con los botones de la tarjeta o acciones masivas arriba. Lupa para vista detallada.",
    pageButton: (p) => `Página ${p}`,
    pagesSelected: (n) => `${n} página${n === 1 ? "" : "s"} seleccionada${n === 1 ? "" : "s"}`,
    clearSelection: "Borrar selección",
    selectPage: "Seleccionar página para acciones masivas",
    removeFile: "Quitar archivo",
    successTitle: "PDF rotado",
    successBody: "El PDF con rotación aplicada está listo para descargar.",
    errNoChanges: "Rota al menos una página antes de exportar.",
    rewardedTitle: "Apoya el proyecto viendo un anuncio",
    rewardedMessage: "Vídeo de 5 s — luego generamos tu PDF rotado.",
    processing: "Aplicando rotación…",
    loadingThumbnails: "Generando miniaturas…",
    thumbnailProgress: (c, t) => `Miniaturas ${c} / ${t}`,
    zoomPreview: "Ampliar vista de página",
    previewTitle: (p) => `Página ${p} — vista detallada`,
    previewClose: "Cerrar",
    previewLoading: "Cargando vista en alta resolución…",
    rotationLabel: (d) => `Ángulo: ${d}°`,
    rotateCw90: "90° en sentido horario",
    rotateCcw90: "90° en sentido antihorario",
    rotate180: "180°",
    resetPage: "Restablecer rotación de página",
    resetAll: "Restablecer todas las rotaciones",
    rotateAllCw: "Todas: +90°",
    rotateAllCcw: "Todas: −90°",
    rotateAll180: "Todas: 180°",
    rotateSelectedCw: "Selección: +90°",
    rotateSelectedCcw: "Selección: −90°",
    rotateSelected180: "Selección: 180°",
    bulkHint: "Marca páginas para rotación por lotes o usa acciones para todo el documento.",
  },
  fr: {
    selectPagesHint:
      "Faites pivoter les pages via la carte ou les actions groupées. Loupe pour un aperçu détaillé.",
    pageButton: (p) => `Page ${p}`,
    pagesSelected: (n) => `${n} page${n === 1 ? "" : "s"} sélectionnée${n === 1 ? "" : "s"}`,
    clearSelection: "Effacer la sélection",
    selectPage: "Sélectionner pour actions groupées",
    removeFile: "Retirer le fichier",
    successTitle: "PDF pivoté",
    successBody: "Votre PDF avec rotations appliquées est prêt au téléchargement.",
    errNoChanges: "Faites pivoter au moins une page avant l’export.",
    rewardedTitle: "Soutenez le projet en regardant une publicité",
    rewardedMessage: "Vidéo de 5 s — puis nous générons votre PDF pivoté.",
    processing: "Application des rotations…",
    loadingThumbnails: "Génération des miniatures…",
    thumbnailProgress: (c, t) => `Miniatures ${c} / ${t}`,
    zoomPreview: "Agrandir l’aperçu",
    previewTitle: (p) => `Page ${p} — vue détaillée`,
    previewClose: "Fermer",
    previewLoading: "Chargement de l’aperçu haute résolution…",
    rotationLabel: (d) => `Angle : ${d}°`,
    rotateCw90: "90° dans le sens horaire",
    rotateCcw90: "90° dans le sens antihoraire",
    rotate180: "180°",
    resetPage: "Réinitialiser la page",
    resetAll: "Réinitialiser toutes les rotations",
    rotateAllCw: "Toutes : +90°",
    rotateAllCcw: "Toutes : −90°",
    rotateAll180: "Toutes : 180°",
    rotateSelectedCw: "Sélection : +90°",
    rotateSelectedCcw: "Sélection : −90°",
    rotateSelected180: "Sélection : 180°",
    bulkHint: "Cochez des pages pour une rotation groupée ou utilisez les actions sur tout le document.",
  },
};
