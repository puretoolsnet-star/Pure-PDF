import type { Locale } from "@/i18n/locale-types";

export type RewardedAdProcessCopy = {
  titleProcess: string;
  messageProcess: string;
  continueProcess: string;
  thanksProcess: string;
};

export const REWARDED_AD_PROCESS_COPY: Record<Locale, RewardedAdProcessCopy> = {
  uk: {
    titleProcess: "Прискорена обробка без черги",
    messageProcess:
      "Перегляньте коротке спонсорське відео — після нього важка операція (злиття, стискання, конвертація) запуститься без затримок і лімітів. Файли лишаються на вашому пристрої.",
    continueProcess: "Запустити обробку",
    thanksProcess: "Дякуємо! Натисніть нижче, щоб почати обробку у браузері.",
  },
  en: {
    titleProcess: "Faster processing, no queue",
    messageProcess:
      "Watch a short sponsor video — then heavy work (merge, compress, convert) starts without delays or limits. Files stay on your device.",
    continueProcess: "Start processing",
    thanksProcess: "Thanks! Tap below to start processing in your browser.",
  },
  pl: {
    titleProcess: "Szybsze przetwarzanie",
    messageProcess:
      "Obejrzyj krótkie wideo sponsora — potem merge, kompresja lub konwersja startuje bez limitów. Pliki zostają lokalnie.",
    continueProcess: "Rozpocznij przetwarzanie",
    thanksProcess: "Dzięki! Kliknij poniżej, aby rozpocząć przetwarzanie.",
  },
  de: {
    titleProcess: "Schnellere Verarbeitung",
    messageProcess:
      "Kurzes Sponsor-Video ansehen — danach starten Merge, Komprimieren oder Konvertieren ohne Limits. Dateien bleiben lokal.",
    continueProcess: "Verarbeitung starten",
    thanksProcess: "Danke! Unten tippen, um die Verarbeitung zu starten.",
  },
  es: {
    titleProcess: "Procesamiento más rápido",
    messageProcess:
      "Mira un vídeo patrocinado breve — luego merge, compresión o conversión sin límites. Los archivos permanecen en el dispositivo.",
    continueProcess: "Iniciar procesamiento",
    thanksProcess: "¡Gracias! Pulsa abajo para empezar el procesamiento.",
  },
  fr: {
    titleProcess: "Traitement accéléré",
    messageProcess:
      "Regardez une courte vidéo sponsor — puis fusion, compression ou conversion sans limites. Les fichiers restent sur l’appareil.",
    continueProcess: "Lancer le traitement",
    thanksProcess: "Merci ! Appuyez ci-dessous pour démarrer le traitement.",
  },
};
