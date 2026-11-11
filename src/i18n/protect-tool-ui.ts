import type { Locale } from "@/i18n/locale-types";

export type ProtectToolUiCopy = {
  formHint: string;
  passwordLabel: string;
  confirmLabel: string;
  showPassword: string;
  hidePassword: string;
  strengthEmpty: string;
  strengthWeak: string;
  strengthFair: string;
  strengthStrong: string;
  strengthHeading: string;
  passwordsMatch: string;
  passwordsMismatch: string;
  removeFile: string;
  alreadyEncryptedWarning: string;
  successTitle: string;
  successBody: string;
  errPasswordShort: string;
  errPasswordMismatch: string;
  errAlreadyEncrypted: string;
  rewardedTitle: string;
  rewardedMessage: string;
  processing: string;
  minPasswordHint: string;
};

export const PROTECT_TOOL_UI: Record<Locale, ProtectToolUiCopy> = {
  uk: {
    formHint:
      "Пароль потрібен щоразу для відкриття PDF. Обробка лише у браузері — файл і пароль не надсилаються на сервер.",
    passwordLabel: "Пароль для відкриття",
    confirmLabel: "Підтвердіть пароль",
    showPassword: "Показати пароль",
    hidePassword: "Приховати пароль",
    strengthEmpty: "Введіть пароль",
    strengthWeak: "Слабкий пароль",
    strengthFair: "Середня надійність",
    strengthStrong: "Надійний пароль",
    strengthHeading: "Надійність",
    passwordsMatch: "Паролі збігаються",
    passwordsMismatch: "Паролі не збігаються",
    removeFile: "Прибрати файл",
    alreadyEncryptedWarning: "Цей PDF уже захищений паролем. Спочатку зніміть захист (інструмент «Розблокувати»).",
    successTitle: "PDF захищено",
    successBody: "Зашифрований файл готовий до завантаження. Збережіть пароль — відновити його неможливо.",
    errPasswordShort: "Пароль має містити щонайменше 4 символи.",
    errPasswordMismatch: "Паролі не збігаються.",
    errAlreadyEncrypted: "Документ уже захищений — додати другий пароль неможливо.",
    rewardedTitle: "Підтримайте проєкт переглядом реклами",
    rewardedMessage: "Коротке відео (5 с) — і ми зашифруємо PDF локально у браузері.",
    processing: "Шифруємо PDF…",
    minPasswordHint: "Мінімум 4 символи; для важливих документів — 12+ символів.",
  },
  en: {
    formHint:
      "The password is required every time the PDF is opened. Processing stays in your browser — no server upload.",
    passwordLabel: "Open password",
    confirmLabel: "Confirm password",
    showPassword: "Show password",
    hidePassword: "Hide password",
    strengthEmpty: "Enter a password",
    strengthWeak: "Weak password",
    strengthFair: "Fair strength",
    strengthStrong: "Strong password",
    strengthHeading: "Strength",
    passwordsMatch: "Passwords match",
    passwordsMismatch: "Passwords do not match",
    removeFile: "Remove file",
    alreadyEncryptedWarning:
      "This PDF is already password-protected. Remove protection first (Unlock tool).",
    successTitle: "PDF protected",
    successBody: "Encrypted file ready to download. Save your password — it cannot be recovered.",
    errPasswordShort: "Password must be at least 4 characters.",
    errPasswordMismatch: "Passwords do not match.",
    errAlreadyEncrypted: "Document is already encrypted.",
    rewardedTitle: "Support the project by watching an ad",
    rewardedMessage: "A 5-second video — then we encrypt your PDF locally.",
    processing: "Encrypting PDF…",
    minPasswordHint: "At least 4 characters; use 12+ for sensitive documents.",
  },
  pl: {
    formHint:
      "Hasło będzie wymagane przy każdym otwarciu PDF. Przetwarzanie tylko w przeglądarce.",
    passwordLabel: "Hasło otwarcia",
    confirmLabel: "Potwierdź hasło",
    showPassword: "Pokaż hasło",
    hidePassword: "Ukryj hasło",
    strengthEmpty: "Wpisz hasło",
    strengthWeak: "Słabe hasło",
    strengthFair: "Średnia siła",
    strengthStrong: "Silne hasło",
    strengthHeading: "Siła",
    passwordsMatch: "Hasła zgodne",
    passwordsMismatch: "Hasła nie są zgodne",
    removeFile: "Usuń plik",
    alreadyEncryptedWarning: "Ten PDF jest już zabezpieczony hasłem.",
    successTitle: "PDF zabezpieczony",
    successBody: "Zaszyfrowany plik gotowy do pobrania. Zapisz hasło — nie da się go odzyskać.",
    errPasswordShort: "Hasło musi mieć co najmniej 4 znaki.",
    errPasswordMismatch: "Hasła nie są zgodne.",
    errAlreadyEncrypted: "Dokument jest już zaszyfrowany.",
    rewardedTitle: "Wesprzyj projekt, oglądając reklamę",
    rewardedMessage: "5 sekund wideo — potem szyfrujemy PDF lokalnie.",
    processing: "Szyfrowanie PDF…",
    minPasswordHint: "Min. 4 znaki; dla wrażliwych dokumentów 12+.",
  },
  de: {
    formHint:
      "Passwort wird beim Öffnen benötigt. Verarbeitung nur im Browser — kein Upload.",
    passwordLabel: "Öffnen-Passwort",
    confirmLabel: "Passwort bestätigen",
    showPassword: "Passwort anzeigen",
    hidePassword: "Passwort verbergen",
    strengthEmpty: "Passwort eingeben",
    strengthWeak: "Schwaches Passwort",
    strengthFair: "Mittlere Stärke",
    strengthStrong: "Starkes Passwort",
    strengthHeading: "Stärke",
    passwordsMatch: "Passwörter stimmen überein",
    passwordsMismatch: "Passwörter stimmen nicht überein",
    removeFile: "Datei entfernen",
    alreadyEncryptedWarning: "Dieses PDF ist bereits passwortgeschützt.",
    successTitle: "PDF geschützt",
    successBody: "Verschlüsselte Datei zum Download bereit. Passwort sichern — keine Wiederherstellung.",
    errPasswordShort: "Mindestens 4 Zeichen.",
    errPasswordMismatch: "Passwörter stimmen nicht überein.",
    errAlreadyEncrypted: "Dokument ist bereits verschlüsselt.",
    rewardedTitle: "Projekt durch Werbung unterstützen",
    rewardedMessage: "5 Sekunden Video — dann lokale Verschlüsselung.",
    processing: "PDF wird verschlüsselt…",
    minPasswordHint: "Min. 4 Zeichen; für sensible Dokumente 12+.",
  },
  es: {
    formHint:
      "La contraseña se pedirá al abrir el PDF. Todo en el navegador, sin subir el archivo.",
    passwordLabel: "Contraseña de apertura",
    confirmLabel: "Confirmar contraseña",
    showPassword: "Mostrar contraseña",
    hidePassword: "Ocultar contraseña",
    strengthEmpty: "Introduce la contraseña",
    strengthWeak: "Contraseña débil",
    strengthFair: "Fortaleza media",
    strengthStrong: "Contraseña fuerte",
    strengthHeading: "Fortaleza",
    passwordsMatch: "Las contraseñas coinciden",
    passwordsMismatch: "Las contraseñas no coinciden",
    removeFile: "Quitar archivo",
    alreadyEncryptedWarning: "Este PDF ya está protegido con contraseña.",
    successTitle: "PDF protegido",
    successBody: "Archivo cifrado listo. Guarda la contraseña — no se puede recuperar.",
    errPasswordShort: "Mínimo 4 caracteres.",
    errPasswordMismatch: "Las contraseñas no coinciden.",
    errAlreadyEncrypted: "El documento ya está cifrado.",
    rewardedTitle: "Apoya el proyecto viendo un anuncio",
    rewardedMessage: "Vídeo de 5 s — luego ciframos el PDF localmente.",
    processing: "Cifrando PDF…",
    minPasswordHint: "Mín. 4 caracteres; 12+ para documentos sensibles.",
  },
  fr: {
    formHint:
      "Le mot de passe sera demandé à chaque ouverture. Traitement dans le navigateur uniquement.",
    passwordLabel: "Mot de passe d’ouverture",
    confirmLabel: "Confirmer le mot de passe",
    showPassword: "Afficher le mot de passe",
    hidePassword: "Masquer le mot de passe",
    strengthEmpty: "Saisissez un mot de passe",
    strengthWeak: "Mot de passe faible",
    strengthFair: "Force moyenne",
    strengthStrong: "Mot de passe fort",
    strengthHeading: "Robustesse",
    passwordsMatch: "Les mots de passe correspondent",
    passwordsMismatch: "Les mots de passe ne correspondent pas",
    removeFile: "Retirer le fichier",
    alreadyEncryptedWarning: "Ce PDF est déjà protégé par mot de passe.",
    successTitle: "PDF protégé",
    successBody: "Fichier chiffré prêt. Conservez le mot de passe — aucune récupération possible.",
    errPasswordShort: "Au moins 4 caractères.",
    errPasswordMismatch: "Les mots de passe ne correspondent pas.",
    errAlreadyEncrypted: "Le document est déjà chiffré.",
    rewardedTitle: "Soutenez le projet en regardant une publicité",
    rewardedMessage: "Vidéo de 5 s — puis chiffrement local du PDF.",
    processing: "Chiffrement du PDF…",
    minPasswordHint: "Min. 4 caractères ; 12+ pour documents sensibles.",
  },
};
