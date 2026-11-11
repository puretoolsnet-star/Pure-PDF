import type { Locale } from "@/i18n/locale-types";

export type RemoveToolUiCopy = {
  selectPagesHint: string;
  pageButton: (page: number) => string;
  markForRemoval: (page: number) => string;
  unmarkPage: (page: number) => string;
  pagesSelected: (count: number) => string;
  removeFile: string;
  successTitle: string;
  successBody: string;
  errAllPages: string;
  errNoneSelected: string;
  rewardedTitle: string;
  rewardedMessage: string;
  processing: string;
  clearSelection: string;
  loadingThumbnails: string;
  thumbnailProgress: (current: number, total: number) => string;
  zoomPreview: string;
  previewTitle: (page: number) => string;
  previewClose: string;
  previewLoading: string;
  removeCheckbox: string;
};

export const REMOVE_TOOL_UI: Record<Locale, RemoveToolUiCopy> = {
  uk: {
    selectPagesHint:
      "Позначте сторінки для видалення (чекбокс або картка). Лупа — детальний перегляд тексту.",
    pageButton: (p) => `Сторінка ${p}`,
    markForRemoval: (p) => `Позначити сторінку ${p} для видалення`,
    unmarkPage: (p) => `Зняти позначку зі сторінки ${p}`,
    pagesSelected: (n) => `${n} стор. для видалення`,
    removeFile: "Прибрати файл",
    successTitle: "PDF очищено",
    successBody: "Новий PDF без обраних сторінок готовий до завантаження.",
    errAllPages: "Не можна видалити всі сторінки — залиште щонайменше одну.",
    errNoneSelected: "Оберіть хоча б одну сторінку для видалення.",
    rewardedTitle: "Підтримайте проєкт переглядом реклами",
    rewardedMessage: "Коротке відео (5 с) — і ми одразу зберемо PDF без обраних сторінок.",
    processing: "Видаляємо сторінки…",
    clearSelection: "Зняти всі позначки",
    loadingThumbnails: "Генеруємо мініатюри сторінок…",
    thumbnailProgress: (c, t) => `Мініатюри ${c} / ${t}`,
    zoomPreview: "Збільшити перегляд сторінки",
    previewTitle: (p) => `Сторінка ${p} — детальний перегляд`,
    previewClose: "Закрити",
    previewLoading: "Завантаження чіткого перегляду…",
    removeCheckbox: "Видалити цю сторінку",
  },
  en: {
    selectPagesHint:
      "Mark pages to remove (checkbox or card). Use the magnifier for a detailed text preview.",
    pageButton: (p) => `Page ${p}`,
    markForRemoval: (p) => `Mark page ${p} for removal`,
    unmarkPage: (p) => `Unmark page ${p}`,
    pagesSelected: (n) => `${n} page${n === 1 ? "" : "s"} marked`,
    removeFile: "Remove file",
    successTitle: "PDF updated",
    successBody: "Your trimmed PDF is ready to download.",
    errAllPages: "You cannot remove every page — keep at least one.",
    errNoneSelected: "Select at least one page to remove.",
    rewardedTitle: "Support the project by watching an ad",
    rewardedMessage: "A 5-second video — then we build your PDF without those pages.",
    processing: "Removing pages…",
    clearSelection: "Clear selection",
    loadingThumbnails: "Rendering page thumbnails…",
    thumbnailProgress: (c, t) => `Thumbnails ${c} / ${t}`,
    zoomPreview: "Enlarge page preview",
    previewTitle: (p) => `Page ${p} — detailed view`,
    previewClose: "Close",
    previewLoading: "Loading high-resolution preview…",
    removeCheckbox: "Remove this page",
  },
  pl: {
    selectPagesHint:
      "Kliknij kartę strony, aby oznaczyć ją do usunięcia. Czerwona ramka i ikona kosza = do usunięcia.",
    pageButton: (p) => `Strona ${p}`,
    markForRemoval: (p) => `Oznacz stronę ${p} do usunięcia`,
    unmarkPage: (p) => `Odznacz stronę ${p}`,
    pagesSelected: (n) => `${n} str. do usunięcia`,
    removeFile: "Usuń plik",
    successTitle: "PDF gotowe",
    successBody: "Nowy PDF bez zaznaczonych stron jest gotowy do pobrania.",
    errAllPages: "Nie można usunąć wszystkich stron — zostaw co najmniej jedną.",
    errNoneSelected: "Wybierz co najmniej jedną stronę do usunięcia.",
    rewardedTitle: "Wesprzyj projekt, oglądając reklamę",
    rewardedMessage: "5 sekund wideo — potem tworzymy PDF bez tych stron.",
    processing: "Usuwanie stron…",
    clearSelection: "Wyczyść zaznaczenia",
    loadingThumbnails: "Generowanie miniaturek…",
    thumbnailProgress: (c, t) => `Miniatury ${c} / ${t}`,
    zoomPreview: "Powiększ podgląd strony",
    previewTitle: (p) => `Strona ${p} — widok szczegółowy`,
    previewClose: "Zamknij",
    previewLoading: "Ładowanie podglądu w wysokiej jakości…",
    removeCheckbox: "Usuń tę stronę",
  },
  de: {
    selectPagesHint:
      "Seitenkarte antippen zum Markieren. Roter Rand und Papierkorb = wird entfernt.",
    pageButton: (p) => `Seite ${p}`,
    markForRemoval: (p) => `Seite ${p} zum Entfernen markieren`,
    unmarkPage: (p) => `Markierung Seite ${p} aufheben`,
    pagesSelected: (n) => `${n} Seite${n === 1 ? "" : "n"} markiert`,
    removeFile: "Datei entfernen",
    successTitle: "PDF aktualisiert",
    successBody: "Das bereinigte PDF kann heruntergeladen werden.",
    errAllPages: "Alle Seiten können nicht entfernt werden — mindestens eine behalten.",
    errNoneSelected: "Mindestens eine Seite zum Entfernen wählen.",
    rewardedTitle: "Projekt durch Werbung unterstützen",
    rewardedMessage: "5 Sekunden Video — dann PDF ohne die markierten Seiten.",
    processing: "Seiten werden entfernt…",
    clearSelection: "Auswahl löschen",
    loadingThumbnails: "Seiten-Vorschau wird erstellt…",
    thumbnailProgress: (c, t) => `Miniaturen ${c} / ${t}`,
    zoomPreview: "Seite vergrößern",
    previewTitle: (p) => `Seite ${p} — Detailansicht`,
    previewClose: "Schließen",
    previewLoading: "Scharfe Vorschau wird geladen…",
    removeCheckbox: "Diese Seite entfernen",
  },
  es: {
    selectPagesHint:
      "Toca la tarjeta para marcar la página. Borde rojo e icono de papelera = se elimina.",
    pageButton: (p) => `Página ${p}`,
    markForRemoval: (p) => `Marcar página ${p} para eliminar`,
    unmarkPage: (p) => `Quitar marca de la página ${p}`,
    pagesSelected: (n) => `${n} pág. marcadas`,
    removeFile: "Quitar archivo",
    successTitle: "PDF listo",
    successBody: "El PDF sin las páginas marcadas está listo.",
    errAllPages: "No puedes eliminar todas las páginas — deja al menos una.",
    errNoneSelected: "Elige al menos una página para eliminar.",
    rewardedTitle: "Apoya el proyecto viendo un anuncio",
    rewardedMessage: "Vídeo de 5 s — luego generamos el PDF sin esas páginas.",
    processing: "Eliminando páginas…",
    clearSelection: "Borrar selección",
    loadingThumbnails: "Generando miniaturas…",
    thumbnailProgress: (c, t) => `Miniaturas ${c} / ${t}`,
    zoomPreview: "Ampliar vista de página",
    previewTitle: (p) => `Página ${p} — vista detallada`,
    previewClose: "Cerrar",
    previewLoading: "Cargando vista en alta resolución…",
    removeCheckbox: "Eliminar esta página",
  },
  fr: {
    selectPagesHint:
      "Touchez une carte pour marquer la page. Bord rouge et corbeille = sera supprimée.",
    pageButton: (p) => `Page ${p}`,
    markForRemoval: (p) => `Marquer la page ${p} pour suppression`,
    unmarkPage: (p) => `Retirer la marque de la page ${p}`,
    pagesSelected: (n) => `${n} p. marquée${n === 1 ? "" : "s"}`,
    removeFile: "Retirer le fichier",
    successTitle: "PDF prêt",
    successBody: "Le PDF sans les pages marquées est prêt au téléchargement.",
    errAllPages: "Impossible de tout supprimer — gardez au moins une page.",
    errNoneSelected: "Sélectionnez au moins une page à supprimer.",
    rewardedTitle: "Soutenir le projet en regardant une pub",
    rewardedMessage: "Vidéo de 5 s — puis nous créons le PDF sans ces pages.",
    processing: "Suppression des pages…",
    clearSelection: "Effacer la sélection",
    loadingThumbnails: "Génération des miniatures…",
    thumbnailProgress: (c, t) => `Miniatures ${c} / ${t}`,
    zoomPreview: "Agrandir l’aperçu",
    previewTitle: (p) => `Page ${p} — vue détaillée`,
    previewClose: "Fermer",
    previewLoading: "Chargement de l’aperçu haute résolution…",
    removeCheckbox: "Supprimer cette page",
  },
};
