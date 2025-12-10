
export type SortDirection = 'asc' | 'desc' | null;
export type DialogSize = "sm" | "md" | "lg" | "xl" | "fullscreen";

// Tailwind size presets
export const DialogSizeClasses: Record<DialogSize, string> = {
  sm: "!max-w-sm",
  md: "!max-w-lg",
  lg: "!max-w-2xl",
  xl: "!max-w-4xl",
  fullscreen: "!w-screen h-screen max-w-none",
};

export const ALERT_TYPE = {
  none: Symbol('none'),
  success: Symbol('sucess'),
  info: Symbol('info'),
  warning: Symbol('warning'),
  question: Symbol('question'),
  error: Symbol('error'),
};

export const CUSTOM_ACTIONS = {
  reload: 'reload-data',
}