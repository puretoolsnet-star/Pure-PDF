import type { Locale } from "@/i18n/locale-types";

type ToolCopy = {
  title: string;
  description: string;
  hint: string;
  action: string;
  processAction: string;
  errors: { invalid: string; failed: string };
};

const splitPdf: Record<Locale, ToolCopy> = {
  uk: {
    title: "Розділити PDF",
    description: "Розбийте один PDF на окремі файли або діапазон сторінок — локально у браузері.",
    hint: "Один PDF. Drag & Drop або вибір файлу.",
    action: "Розділити",
    processAction: "Розділити PDF",
    errors: { invalid: "Оберіть коректний PDF.", failed: "Не вдалося розділити PDF." },
  },
  en: {
    title: "Split PDF",
    description: "Split one PDF into separate files or page ranges — locally in your browser.",
    hint: "One PDF. Pick pages to export.",
    action: "Split",
    processAction: "Prepare files",
    errors: { invalid: "Choose a valid PDF.", failed: "Could not split the PDF." },
  },
  pl: {
    title: "Podziel PDF",
    description: "Podziel PDF na osobne pliki lub zakresy stron — lokalnie w przeglądarce.",
    hint: "Jeden PDF. Wybierz strony do eksportu.",
    action: "Podziel",
    processAction: "Przygotuj pliki",
    errors: { invalid: "Wybierz poprawny PDF.", failed: "Nie udało się podzielić PDF." },
  },
  de: {
    title: "PDF teilen",
    description: "PDF in einzelne Dateien oder Seitenbereiche teilen — lokal im Browser.",
    hint: "Ein PDF. Seiten zum Export wählen.",
    action: "Teilen",
    processAction: "Dateien vorbereiten",
    errors: { invalid: "Gültiges PDF wählen.", failed: "PDF konnte nicht geteilt werden." },
  },
  es: {
    title: "Dividir PDF",
    description: "Divide un PDF en archivos o rangos de páginas — en local en el navegador.",
    hint: "Un PDF. Elige páginas para exportar.",
    action: "Dividir",
    processAction: "Preparar archivos",
    errors: { invalid: "Elige un PDF válido.", failed: "No se pudo dividir el PDF." },
  },
  fr: {
    title: "Scinder PDF",
    description: "Scindez un PDF en fichiers ou plages de pages — localement dans le navigateur.",
    hint: "Un PDF. Choisissez les pages à exporter.",
    action: "Scinder",
    processAction: "Préparer les fichiers",
    errors: { invalid: "Choisissez un PDF valide.", failed: "Impossible de scinder le PDF." },
  },
};

const removePages: Record<Locale, ToolCopy> = {
  uk: {
    title: "Видалити сторінки",
    description: "Приберіть непотрібні сторінки з PDF без завантаження на сервер.",
    hint: "Один PDF. Відмітьте сторінки для видалення.",
    action: "Видалити сторінки",
    processAction: "Застосувати",
    errors: { invalid: "Оберіть коректний PDF.", failed: "Не вдалося оновити PDF." },
  },
  en: {
    title: "Remove Pages",
    description: "Remove unwanted pages from a PDF with no server upload.",
    hint: "One PDF. Mark pages to delete.",
    action: "Remove pages",
    processAction: "Apply",
    errors: { invalid: "Choose a valid PDF.", failed: "Could not update the PDF." },
  },
  pl: {
    title: "Usuń strony",
    description: "Usuń niepotrzebne strony z PDF bez wysyłania na serwer.",
    hint: "Jeden PDF. Zaznacz strony do usunięcia.",
    action: "Usuń strony",
    processAction: "Zastosuj",
    errors: { invalid: "Wybierz poprawny PDF.", failed: "Nie udało się zaktualizować PDF." },
  },
  de: {
    title: "Seiten entfernen",
    description: "Unerwünschte PDF-Seiten entfernen — ohne Server-Upload.",
    hint: "Ein PDF. Seiten zum Löschen markieren.",
    action: "Seiten entfernen",
    processAction: "Anwenden",
    errors: { invalid: "Gültiges PDF wählen.", failed: "PDF konnte nicht aktualisiert werden." },
  },
  es: {
    title: "Eliminar páginas",
    description: "Quita páginas de un PDF sin subir el archivo al servidor.",
    hint: "Un PDF. Marca páginas para eliminar.",
    action: "Eliminar páginas",
    processAction: "Aplicar",
    errors: { invalid: "Elige un PDF válido.", failed: "No se pudo actualizar el PDF." },
  },
  fr: {
    title: "Supprimer des pages",
    description: "Retirez des pages d’un PDF sans envoi sur serveur.",
    hint: "Un PDF. Cochez les pages à supprimer.",
    action: "Supprimer les pages",
    processAction: "Appliquer",
    errors: { invalid: "Choisissez un PDF valide.", failed: "Impossible de mettre à jour le PDF." },
  },
};

const organizePdf: Record<Locale, ToolCopy> = {
  uk: {
    title: "Організувати PDF",
    description: "Змінюйте порядок, обертайте та групуйте сторінки в одному робочому просторі.",
    hint: "Один PDF. Перетягування, стрілки або номер позиції.",
    action: "Організувати",
    processAction: "Зберегти порядок",
    errors: { invalid: "Оберіть коректний PDF.", failed: "Не вдалося зберегти зміни." },
  },
  en: {
    title: "Organize PDF",
    description: "Reorder, rotate, and group pages in one workspace.",
    hint: "One PDF. Drag, arrows, or position number.",
    action: "Organize",
    processAction: "Save order",
    errors: { invalid: "Choose a valid PDF.", failed: "Could not save changes." },
  },
  pl: {
    title: "Organizuj PDF",
    description: "Zmieniaj kolejność i układ stron w jednym widoku.",
    hint: "Jeden PDF. Przeciągnij, strzałki lub numer pozycji.",
    action: "Organizuj",
    processAction: "Zapisz kolejność",
    errors: { invalid: "Wybierz poprawny PDF.", failed: "Nie udało się zapisać zmian." },
  },
  de: {
    title: "PDF organisieren",
    description: "Seiten sortieren und gruppieren in einer Ansicht.",
    hint: "Ein PDF. Ziehen, Pfeile oder Positionsnummer.",
    action: "Organisieren",
    processAction: "Reihenfolge speichern",
    errors: { invalid: "Gültiges PDF wählen.", failed: "Änderungen konnten nicht gespeichert werden." },
  },
  es: {
    title: "Organizar PDF",
    description: "Reordena y agrupa páginas en un solo espacio.",
    hint: "Un PDF. Arrastrar, flechas o número de posición.",
    action: "Organizar",
    processAction: "Guardar orden",
    errors: { invalid: "Elige un PDF válido.", failed: "No se pudieron guardar los cambios." },
  },
  fr: {
    title: "Organiser PDF",
    description: "Réordonnez et regroupez les pages dans un espace unique.",
    hint: "Un PDF. Glisser, flèches ou numéro de position.",
    action: "Organiser",
    processAction: "Enregistrer l’ordre",
    errors: { invalid: "Choisissez un PDF valide.", failed: "Impossible d’enregistrer les modifications." },
  },
};

const rotatePdf: Record<Locale, ToolCopy> = {
  uk: {
    title: "Повернути PDF",
    description: "Поверніть окремі сторінки або весь документ на 90° — локально.",
    hint: "Один PDF. Крок 90°.",
    action: "Повернути",
    processAction: "Застосувати поворот",
    errors: { invalid: "Оберіть коректний PDF.", failed: "Не вдалося повернути сторінки." },
  },
  en: {
    title: "Rotate PDF",
    description: "Rotate selected pages or the whole document by 90° — locally.",
    hint: "One PDF. 90° steps.",
    action: "Rotate",
    processAction: "Apply rotation",
    errors: { invalid: "Choose a valid PDF.", failed: "Could not rotate pages." },
  },
  pl: {
    title: "Obróć PDF",
    description: "Obróć wybrane strony lub cały dokument o 90° — lokalnie.",
    hint: "Jeden PDF. Kroki 90°.",
    action: "Obróć",
    processAction: "Zastosuj obrót",
    errors: { invalid: "Wybierz poprawny PDF.", failed: "Nie udało się obrócić stron." },
  },
  de: {
    title: "PDF drehen",
    description: "Seiten oder das gesamte PDF um 90° drehen — lokal.",
    hint: "Ein PDF. 90°-Schritte.",
    action: "Drehen",
    processAction: "Drehung anwenden",
    errors: { invalid: "Gültiges PDF wählen.", failed: "Seiten konnten nicht gedreht werden." },
  },
  es: {
    title: "Rotar PDF",
    description: "Gira páginas o el documento completo 90° — en local.",
    hint: "Un PDF. Pasos de 90°.",
    action: "Rotar",
    processAction: "Aplicar rotación",
    errors: { invalid: "Elige un PDF válido.", failed: "No se pudieron rotar las páginas." },
  },
  fr: {
    title: "Pivoter PDF",
    description: "Faites pivoter des pages ou tout le document par 90° — en local.",
    hint: "Un PDF. Pas de 90°.",
    action: "Pivoter",
    processAction: "Appliquer la rotation",
    errors: { invalid: "Choisissez un PDF valide.", failed: "Impossible de pivoter les pages." },
  },
};

const protectPdf: Record<Locale, ToolCopy> = {
  uk: {
    title: "Захистити PDF",
    description: "Додайте пароль і обмеження друку — обробка на вашому пристрої.",
    hint: "Один PDF. Пароль для відкриття (мін. 4 символи).",
    action: "Захистити",
    processAction: "Застосувати захист",
    errors: { invalid: "Оберіть коректний PDF.", failed: "Не вдалося захистити PDF." },
  },
  en: {
    title: "Protect PDF",
    description: "Add a password and permissions — processed on your device.",
    hint: "One PDF. Open password (min. 4 characters).",
    action: "Protect",
    processAction: "Apply protection",
    errors: { invalid: "Choose a valid PDF.", failed: "Could not protect the PDF." },
  },
  pl: {
    title: "Chroń PDF",
    description: "Hasło i uprawnienia — przetwarzanie na urządzeniu.",
    hint: "Jeden PDF. Hasło otwarcia (min. 4 znaki).",
    action: "Chroń",
    processAction: "Zastosuj ochronę",
    errors: { invalid: "Wybierz poprawny PDF.", failed: "Nie udało się zabezpieczyć PDF." },
  },
  de: {
    title: "PDF schützen",
    description: "Passwort und Berechtigungen — auf Ihrem Gerät.",
    hint: "Ein PDF. Öffnen-Passwort (min. 4 Zeichen).",
    action: "Schützen",
    processAction: "Schutz anwenden",
    errors: { invalid: "Gültiges PDF wählen.", failed: "PDF konnte nicht geschützt werden." },
  },
  es: {
    title: "Proteger PDF",
    description: "Contraseña y permisos — en tu dispositivo.",
    hint: "Un PDF. Contraseña de apertura (mín. 4 caracteres).",
    action: "Proteger",
    processAction: "Aplicar protección",
    errors: { invalid: "Elige un PDF válido.", failed: "No se pudo proteger el PDF." },
  },
  fr: {
    title: "Protéger PDF",
    description: "Mot de passe et permissions — sur votre appareil.",
    hint: "Un PDF. Mot de passe d’ouverture (min. 4 caractères).",
    action: "Protéger",
    processAction: "Appliquer la protection",
    errors: { invalid: "Choisissez un PDF valide.", failed: "Impossible de protéger le PDF." },
  },
};

const unlockPdf: Record<Locale, ToolCopy> = {
  uk: {
    title: "Розблокувати PDF",
    description: "Зніміть пароль із PDF, якщо ви знаєте пароль — без відправки файлу на сервер.",
    hint: "Захищений PDF і пароль, яким його відкривають.",
    action: "Розблокувати",
    processAction: "Зняти пароль",
    errors: { invalid: "Оберіть коректний PDF.", failed: "Не вдалося розблокувати PDF." },
  },
  en: {
    title: "Unlock PDF",
    description: "Remove a PDF password when you know it — no server upload.",
    hint: "Encrypted PDF and the password you use to open it.",
    action: "Unlock",
    processAction: "Remove password",
    errors: { invalid: "Choose a valid PDF.", failed: "Could not unlock the PDF." },
  },
  pl: {
    title: "Odblokuj PDF",
    description: "Usuń hasło PDF, jeśli je znasz — bez wysyłki na serwer.",
    hint: "Zaszyfrowany PDF i hasło otwarcia.",
    action: "Odblokuj",
    processAction: "Usuń hasło",
    errors: { invalid: "Wybierz poprawny PDF.", failed: "Nie udało się odblokować PDF." },
  },
  de: {
    title: "PDF entsperren",
    description: "PDF-Passwort entfernen, wenn bekannt — ohne Upload.",
    hint: "Verschlüsseltes PDF und Öffnen-Passwort.",
    action: "Entsperren",
    processAction: "Passwort entfernen",
    errors: { invalid: "Gültiges PDF wählen.", failed: "PDF konnte nicht entsperrt werden." },
  },
  es: {
    title: "Desbloquear PDF",
    description: "Quita la contraseña si la conoces — sin subir el archivo.",
    hint: "PDF cifrado y contraseña de apertura.",
    action: "Desbloquear",
    processAction: "Quitar contraseña",
    errors: { invalid: "Elige un PDF válido.", failed: "No se pudo desbloquear el PDF." },
  },
  fr: {
    title: "Déverrouiller PDF",
    description: "Retirez le mot de passe si vous le connaissez — sans envoi serveur.",
    hint: "PDF chiffré et mot de passe d’ouverture.",
    action: "Déverrouiller",
    processAction: "Retirer le mot de passe",
    errors: { invalid: "Choisissez un PDF valide.", failed: "Impossible de déverrouiller le PDF." },
  },
};

const signPdf: Record<Locale, ToolCopy> = {
  uk: {
    title: "Підписати PDF",
    description: "Додайте візуальний підпис або ініціали — локально у браузері.",
    hint: "Один PDF. Малюнок або текстовий підпис.",
    action: "Підписати",
    processAction: "Вставити підпис",
    errors: { invalid: "Оберіть коректний PDF.", failed: "Не вдалося підписати PDF." },
  },
  en: {
    title: "Sign PDF",
    description: "Add a visual signature or initials — locally in the browser.",
    hint: "One PDF. Draw or type your signature.",
    action: "Sign",
    processAction: "Place signature",
    errors: { invalid: "Choose a valid PDF.", failed: "Could not sign the PDF." },
  },
  pl: {
    title: "Podpisz PDF",
    description: "Dodaj podpis wizualny — lokalnie w przeglądarce.",
    hint: "Jeden PDF. Rysuj lub wpisz podpis.",
    action: "Podpisz",
    processAction: "Umieść podpis",
    errors: { invalid: "Wybierz poprawny PDF.", failed: "Nie udało się podpisać PDF." },
  },
  de: {
    title: "PDF signieren",
    description: "Visuelle Signatur hinzufügen — lokal im Browser.",
    hint: "Ein PDF. Zeichnen oder Textsignatur.",
    action: "Signieren",
    processAction: "Signatur platzieren",
    errors: { invalid: "Gültiges PDF wählen.", failed: "PDF konnte nicht signiert werden." },
  },
  es: {
    title: "Firmar PDF",
    description: "Añade una firma visual — en local en el navegador.",
    hint: "Un PDF. Dibuja o escribe la firma.",
    action: "Firmar",
    processAction: "Colocar firma",
    errors: { invalid: "Elige un PDF válido.", failed: "No se pudo firmar el PDF." },
  },
  fr: {
    title: "Signer PDF",
    description: "Ajoutez une signature visuelle — localement dans le navigateur.",
    hint: "Un PDF. Dessiner ou saisir la signature.",
    action: "Signer",
    processAction: "Placer la signature",
    errors: { invalid: "Choisissez un PDF valide.", failed: "Impossible de signer le PDF." },
  },
};

export const PLANNED_TOOL_COPY: Record<
  Locale,
  {
    "split-pdf": ToolCopy;
    "remove-pages": ToolCopy;
    "organize-pdf": ToolCopy;
    "rotate-pdf": ToolCopy;
    "protect-pdf": ToolCopy;
    "unlock-pdf": ToolCopy;
    "sign-pdf": ToolCopy;
  }
> = {
  uk: {
    "split-pdf": splitPdf.uk,
    "remove-pages": removePages.uk,
    "organize-pdf": organizePdf.uk,
    "rotate-pdf": rotatePdf.uk,
    "protect-pdf": protectPdf.uk,
    "unlock-pdf": unlockPdf.uk,
    "sign-pdf": signPdf.uk,
  },
  en: {
    "split-pdf": splitPdf.en,
    "remove-pages": removePages.en,
    "organize-pdf": organizePdf.en,
    "rotate-pdf": rotatePdf.en,
    "protect-pdf": protectPdf.en,
    "unlock-pdf": unlockPdf.en,
    "sign-pdf": signPdf.en,
  },
  pl: {
    "split-pdf": splitPdf.pl,
    "remove-pages": removePages.pl,
    "organize-pdf": organizePdf.pl,
    "rotate-pdf": rotatePdf.pl,
    "protect-pdf": protectPdf.pl,
    "unlock-pdf": unlockPdf.pl,
    "sign-pdf": signPdf.pl,
  },
  de: {
    "split-pdf": splitPdf.de,
    "remove-pages": removePages.de,
    "organize-pdf": organizePdf.de,
    "rotate-pdf": rotatePdf.de,
    "protect-pdf": protectPdf.de,
    "unlock-pdf": unlockPdf.de,
    "sign-pdf": signPdf.de,
  },
  es: {
    "split-pdf": splitPdf.es,
    "remove-pages": removePages.es,
    "organize-pdf": organizePdf.es,
    "rotate-pdf": rotatePdf.es,
    "protect-pdf": protectPdf.es,
    "unlock-pdf": unlockPdf.es,
    "sign-pdf": signPdf.es,
  },
  fr: {
    "split-pdf": splitPdf.fr,
    "remove-pages": removePages.fr,
    "organize-pdf": organizePdf.fr,
    "rotate-pdf": rotatePdf.fr,
    "protect-pdf": protectPdf.fr,
    "unlock-pdf": unlockPdf.fr,
    "sign-pdf": signPdf.fr,
  },
};

export type ToolCategoryCopy = {
  title: string;
  summary: string;
};

export const TOOL_CATEGORY_COPY: Record<
  Locale,
  Record<"pages" | "convert" | "security", ToolCategoryCopy>
> = {
  uk: {
    pages: {
      title: "Маніпуляція та організація сторінок",
      summary: "Об’єднання, розділення, видалення та порядок сторінок.",
    },
    convert: {
      title: "Конвертація та оптимізація",
      summary: "Стиснення, зображення, обертання та офісні формати.",
    },
    security: {
      title: "Безпека та захист",
      summary: "Пароль, розблокування та підпис документів.",
    },
  },
  en: {
    pages: {
      title: "Page manipulation & organization",
      summary: "Merge, split, remove, and reorder pages.",
    },
    convert: {
      title: "Conversion & optimization",
      summary: "Compress, images, rotation, and office formats.",
    },
    security: {
      title: "Security & protection",
      summary: "Passwords, unlock, and document signing.",
    },
  },
  pl: {
    pages: {
      title: "Strony — edycja i układ",
      summary: "Łączenie, dzielenie, usuwanie i kolejność stron.",
    },
    convert: {
      title: "Konwersja i optymalizacja",
      summary: "Kompresja, obrazy, obrót i formaty biurowe.",
    },
    security: {
      title: "Bezpieczeństwo",
      summary: "Hasła, odblokowanie i podpis.",
    },
  },
  de: {
    pages: {
      title: "Seiten bearbeiten & ordnen",
      summary: "Zusammenführen, teilen, löschen und sortieren.",
    },
    convert: {
      title: "Konvertierung & Optimierung",
      summary: "Komprimieren, Bilder, Drehen und Office-Formate.",
    },
    security: {
      title: "Sicherheit & Schutz",
      summary: "Passwort, Entsperren und Signatur.",
    },
  },
  es: {
    pages: {
      title: "Páginas — manipulación y orden",
      summary: "Unir, dividir, eliminar y reordenar páginas.",
    },
    convert: {
      title: "Conversión y optimización",
      summary: "Comprimir, imágenes, rotación y formatos de oficina.",
    },
    security: {
      title: "Seguridad y protección",
      summary: "Contraseña, desbloqueo y firma.",
    },
  },
  fr: {
    pages: {
      title: "Pages — manipulation et ordre",
      summary: "Fusionner, scinder, supprimer et réordonner.",
    },
    convert: {
      title: "Conversion et optimisation",
      summary: "Compression, images, rotation et formats bureautique.",
    },
    security: {
      title: "Sécurité et protection",
      summary: "Mot de passe, déverrouillage et signature.",
    },
  },
};

export const CATALOG_UI_COPY: Record<
  Locale,
  {
    comingSoonBadge: string;
    comingSoonBody: string;
    rewardedHeavyBadge: string;
    expandCategory: string;
    collapseCategory: string;
    rewardedFeature: {
      title: string;
      body: string;
      note: string;
      demoCta: string;
    };
  }
> = {
  uk: {
    comingSoonBadge: "Незабаром",
    comingSoonBody:
      "Ми готуємо цей інструмент. Усі операції, як і раніше, залишаться локальними у браузері.",
    rewardedHeavyBadge: "Коротке відео перед обробкою",
    expandCategory: "Розгорнути категорію",
    collapseCategory: "Згорнути категорію",
    rewardedFeature: {
      title: "Реклама за винагороду",
      body: "Важкі операції — масове об’єднання чи стиснення великих PDF — безкоштовні після короткого спонсорського перегляду.",
      note: "Один перегляд = одне завантаження. Файли не покидають пристрій.",
      demoCta: "Як це працює",
    },
  },
  en: {
    comingSoonBadge: "Coming soon",
    comingSoonBody:
      "We are building this tool. Processing will stay local in your browser.",
    rewardedHeavyBadge: "Short video before processing",
    expandCategory: "Expand category",
    collapseCategory: "Collapse category",
    rewardedFeature: {
      title: "Rewarded unlock",
      body: "Heavy jobs — bulk merge or large PDF compression — stay free after a brief sponsored view.",
      note: "One view = one download. Files never leave your device.",
      demoCta: "See how it works",
    },
  },
  pl: {
    comingSoonBadge: "Wkrótce",
    comingSoonBody:
      "Pracujemy nad tym narzędziem. Przetwarzanie pozostanie lokalne w przeglądarce.",
    rewardedHeavyBadge: "Krótkie wideo przed przetwarzaniem",
    expandCategory: "Rozwiń kategorię",
    collapseCategory: "Zwiń kategorię",
    rewardedFeature: {
      title: "Nagroda za reklamę",
      body: "Duże operacje — łączenie wielu plików lub kompresja — pozostają darmowe po krótkiej reklamie.",
      note: "Jeden podgląd = jedno pobranie. Pliki nie opuszczają urządzenia.",
      demoCta: "Jak to działa",
    },
  },
  de: {
    comingSoonBadge: "Demnächst",
    comingSoonBody:
      "Dieses Tool ist in Arbeit. Die Verarbeitung bleibt lokal im Browser.",
    rewardedHeavyBadge: "Kurzes Video vor der Verarbeitung",
    expandCategory: "Kategorie aufklappen",
    collapseCategory: "Kategorie zuklappen",
    rewardedFeature: {
      title: "Belohnte Anzeige",
      body: "Schwere Aufgaben — große PDFs zusammenführen oder komprimieren — bleiben nach kurzer Anzeige kostenlos.",
      note: "Ein Blick = ein Download. Dateien verlassen Ihr Gerät nicht.",
      demoCta: "So funktioniert’s",
    },
  },
  es: {
    comingSoonBadge: "Próximamente",
    comingSoonBody:
      "Estamos preparando esta herramienta. El procesamiento seguirá siendo local en el navegador.",
    rewardedHeavyBadge: "Vídeo breve antes de procesar",
    expandCategory: "Expandir categoría",
    collapseCategory: "Contraer categoría",
    rewardedFeature: {
      title: "Desbloqueo con recompensa",
      body: "Tareas pesadas — unir muchos PDF o comprimir archivos grandes — siguen gratis tras un anuncio corto.",
      note: "Una vista = una descarga. Los archivos no salen del dispositivo.",
      demoCta: "Cómo funciona",
    },
  },
  fr: {
    comingSoonBadge: "Bientôt",
    comingSoonBody:
      "Cet outil arrive bientôt. Le traitement restera local dans le navigateur.",
    rewardedHeavyBadge: "Courte vidéo avant le traitement",
    expandCategory: "Déplier la catégorie",
    collapseCategory: "Replier la catégorie",
    rewardedFeature: {
      title: "Déblocage récompensé",
      body: "Les grosses tâches — fusion massive ou gros PDF — restent gratuites après une courte pub.",
      note: "Une vue = un téléchargement. Les fichiers ne quittent pas l’appareil.",
      demoCta: "Comment ça marche",
    },
  },
};
