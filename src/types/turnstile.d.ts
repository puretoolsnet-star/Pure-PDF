type TurnstileRenderOptions = {
  sitekey: string;
  size?: "normal" | "compact" | "flexible" | "invisible";
  callback?: (token: string) => void;
  "error-callback"?: () => void;
  "expired-callback"?: () => void;
  action?: string;
  appearance?: "always" | "execute" | "interaction-only";
};

type TurnstileApi = {
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
  execute: (widgetId: string) => void;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

interface Window {
  turnstile?: TurnstileApi;
}
