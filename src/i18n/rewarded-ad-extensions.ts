import type { Locale } from "@/i18n/locale-types";

export type RewardedAdProcessCopy = {
  titleProcess: string;
  messageProcess: string;
  continueProcess: string;
  thanksProcess: string;
};

export const REWARDED_AD_PROCESS_COPY: Record<Locale, RewardedAdProcessCopy> = {
  uk: {
    titleProcess: "Обробка локально у браузері",
    messageProcess:
      "Важка операція (злиття, стискання, конвертація) виконується безкоштовно і повністю локально у браузері — без завантаження файлів на сервер і без реєстрації.",
    continueProcess: "Запустити обробку",
    thanksProcess: "Натисніть нижче, щоб почати обробку у браузері.",
  },
  en: {
    titleProcess: "Processing in your browser",
    messageProcess:
      "Heavy work (merge, compress, convert) runs free and entirely in your browser — files are never uploaded to a server, and no registration is required.",
    continueProcess: "Start processing",
    thanksProcess: "Tap below to start processing in your browser.",
  },
  pl: {
    titleProcess: "Przetwarzanie w przeglądarce",
    messageProcess:
      "Duże operacje (łączenie, kompresja, konwersja) są darmowe i działają lokalnie w przeglądarce — bez wysyłania plików na serwer i bez rejestracji.",
    continueProcess: "Rozpocznij przetwarzanie",
    thanksProcess: "Kliknij poniżej, aby rozpocząć przetwarzanie.",
  },
  de: {
    titleProcess: "Verarbeitung im Browser",
    messageProcess:
      "Aufwändige Aufgaben (Zusammenführen, Komprimieren, Konvertieren) laufen kostenlos vollständig in Ihrem Browser — ohne Server-Upload und ohne Registrierung.",
    continueProcess: "Verarbeitung starten",
    thanksProcess: "Unten tippen, um die Verarbeitung zu starten.",
  },
  es: {
    titleProcess: "Procesamiento en el navegador",
    messageProcess:
      "Las tareas pesadas (unir, comprimir, convertir) son gratis y se ejecutan por completo en tu navegador — sin subir archivos a un servidor y sin registro.",
    continueProcess: "Iniciar procesamiento",
    thanksProcess: "Pulsa abajo para empezar el procesamiento.",
  },
  fr: {
    titleProcess: "Traitement dans le navigateur",
    messageProcess:
      "Les tâches lourdes (fusion, compression, conversion) sont gratuites et s’exécutent entièrement dans votre navigateur — sans envoi de fichiers vers un serveur et sans inscription.",
    continueProcess: "Lancer le traitement",
    thanksProcess: "Appuyez ci-dessous pour démarrer le traitement.",
  },
};
