import type { Locale } from "@/i18n/locale-types";

export type UnlockToolUiCopy = {
  formHint: string;
  passwordLabel: string;
  showPassword: string;
  hidePassword: string;
  removeFile: string;
  notEncryptedWarning: string;
  encryptedBadge: (algorithm?: string) => string;
  successTitle: string;
  successBody: string;
  errWrongPassword: string;
  errNotEncrypted: string;
  errPasswordRequired: string;
  rewardedTitle: string;
  rewardedMessage: string;
  processing: string;
};

export const UNLOCK_TOOL_UI: Record<Locale, UnlockToolUiCopy> = {
  uk: {
    formHint:
      "Введіть пароль, яким відкривається PDF. Розшифрування лише у браузері — файл не надсилається на сервер.",
    passwordLabel: "Поточний пароль PDF",
    showPassword: "Показати пароль",
    hidePassword: "Приховати пароль",
    removeFile: "Прибрати файл",
    notEncryptedWarning: "Цей PDF не захищений паролем — пароль знімати не потрібно.",
    encryptedBadge: (algo) =>
      algo ? `Захищено: ${algo}` : "Документ захищений паролем",
    successTitle: "PDF розблоковано",
    successBody: "Незахищена копія готова до завантаження.",
    errWrongPassword: "Невірний пароль. Перевірте введення та спробуйте знову.",
    errNotEncrypted: "Файл не зашифрований — зняття пароля не потрібне.",
    errPasswordRequired: "Введіть пароль для розблокування.",
    rewardedTitle: "Підтримайте проєкт переглядом реклами",
    rewardedMessage: "Коротке відео (5 с) — і ми знімемо захист локально у браузері.",
    processing: "Розблоковуємо PDF…",
  },
  en: {
    formHint:
      "Enter the password used to open this PDF. Decryption runs only in your browser — no server upload.",
    passwordLabel: "Current PDF password",
    showPassword: "Show password",
    hidePassword: "Hide password",
    removeFile: "Remove file",
    notEncryptedWarning: "This PDF is not password-protected — nothing to unlock.",
    encryptedBadge: (algo) =>
      algo ? `Protected: ${algo}` : "Password-protected document",
    successTitle: "PDF unlocked",
    successBody: "An unprotected copy is ready to download.",
    errWrongPassword: "Incorrect password. Check your entry and try again.",
    errNotEncrypted: "File is not encrypted — no password to remove.",
    errPasswordRequired: "Enter the password to unlock.",
    rewardedTitle: "Support the project by watching an ad",
    rewardedMessage: "A 5-second video — then we remove protection locally.",
    processing: "Unlocking PDF…",
  },
  pl: {
    formHint:
      "Wpisz hasło do otwarcia PDF. Odszyfrowanie tylko w przeglądarce — bez wysyłki na serwer.",
    passwordLabel: "Aktualne hasło PDF",
    showPassword: "Pokaż hasło",
    hidePassword: "Ukryj hasło",
    removeFile: "Usuń plik",
    notEncryptedWarning: "Ten PDF nie jest chroniony hasłem.",
    encryptedBadge: (algo) =>
      algo ? `Chroniony: ${algo}` : "Dokument chroniony hasłem",
    successTitle: "PDF odblokowany",
    successBody: "Kopia bez hasła jest gotowa do pobrania.",
    errWrongPassword: "Nieprawidłowe hasło. Spróbuj ponownie.",
    errNotEncrypted: "Plik nie jest zaszyfrowany.",
    errPasswordRequired: "Wpisz hasło, aby odblokować.",
    rewardedTitle: "Wesprzyj projekt, oglądając reklamę",
    rewardedMessage: "5 sekund wideo — potem lokalne usunięcie hasła.",
    processing: "Odblokowywanie PDF…",
  },
  de: {
    formHint:
      "Passwort zum Öffnen eingeben. Entschlüsselung nur im Browser — kein Upload.",
    passwordLabel: "Aktuelles PDF-Passwort",
    showPassword: "Passwort anzeigen",
    hidePassword: "Passwort verbergen",
    removeFile: "Datei entfernen",
    notEncryptedWarning: "Dieses PDF ist nicht passwortgeschützt.",
    encryptedBadge: (algo) =>
      algo ? `Geschützt: ${algo}` : "Passwortgeschütztes Dokument",
    successTitle: "PDF entsperrt",
    successBody: "Ungeschützte Kopie zum Download bereit.",
    errWrongPassword: "Falsches Passwort. Bitte erneut versuchen.",
    errNotEncrypted: "Datei ist nicht verschlüsselt.",
    errPasswordRequired: "Passwort zum Entsperren eingeben.",
    rewardedTitle: "Projekt durch Werbung unterstützen",
    rewardedMessage: "5 Sekunden Video — dann lokales Entfernen des Schutzes.",
    processing: "PDF wird entsperrt…",
  },
  es: {
    formHint:
      "Introduce la contraseña de apertura. El descifrado es solo en el navegador — sin subir el archivo.",
    passwordLabel: "Contraseña actual del PDF",
    showPassword: "Mostrar contraseña",
    hidePassword: "Ocultar contraseña",
    removeFile: "Quitar archivo",
    notEncryptedWarning: "Este PDF no está protegido con contraseña.",
    encryptedBadge: (algo) =>
      algo ? `Protegido: ${algo}` : "Documento protegido con contraseña",
    successTitle: "PDF desbloqueado",
    successBody: "Copia sin contraseña lista para descargar.",
    errWrongPassword: "Contraseña incorrecta. Inténtalo de nuevo.",
    errNotEncrypted: "El archivo no está cifrado.",
    errPasswordRequired: "Introduce la contraseña para desbloquear.",
    rewardedTitle: "Apoya el proyecto viendo un anuncio",
    rewardedMessage: "Vídeo de 5 s — luego quitamos la protección localmente.",
    processing: "Desbloqueando PDF…",
  },
  fr: {
    formHint:
      "Saisissez le mot de passe d’ouverture. Déchiffrement uniquement dans le navigateur — pas d’envoi au serveur.",
    passwordLabel: "Mot de passe actuel du PDF",
    showPassword: "Afficher le mot de passe",
    hidePassword: "Masquer le mot de passe",
    removeFile: "Retirer le fichier",
    notEncryptedWarning: "Ce PDF n’est pas protégé par mot de passe.",
    encryptedBadge: (algo) =>
      algo ? `Protégé : ${algo}` : "Document protégé par mot de passe",
    successTitle: "PDF déverrouillé",
    successBody: "Copie sans mot de passe prête au téléchargement.",
    errWrongPassword: "Mot de passe incorrect. Réessayez.",
    errNotEncrypted: "Le fichier n’est pas chiffré.",
    errPasswordRequired: "Saisissez le mot de passe pour déverrouiller.",
    rewardedTitle: "Soutenez le projet en regardant une publicité",
    rewardedMessage: "Vidéo de 5 s — puis suppression locale de la protection.",
    processing: "Déverrouillage du PDF…",
  },
};
