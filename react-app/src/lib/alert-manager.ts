import {
  type AlertType,
  type AlertMessage,
  type AlertMessageProps,
  type LocalizationKey,
  AlertGlobalDispatcher,
} from "~/components/AlertMessageComponent";

import type { ReactNode } from "react";
import { ALERT_TYPE } from "../components/types";
import { INFINITE_DELAY } from "../config/constans";

/**
 * Normalizes different types of input into a full AlertMessage.
 */
function normalizeMessage(
  message: string | AlertMessage,
  type?: AlertType,
  extra?: Partial<AlertMessageProps>
): AlertMessage {
  // primitive string -> wrap into AlertMessageProps
  if (typeof message === "string") {
    return { message, type, delay: 0, ...extra };
  }

  // raw ReactNode (not an AlertMessage, not a LocalizationKey)
  if (typeof message === "object" && !("message" in message!) && !("key" in message!)) {
    return { message: message as ReactNode, type, delay: 0, ...extra };
  }

  // LocalizationKey
  if ("key" in (message as LocalizationKey)) {
    return message as LocalizationKey;
  }

  // Already a full AlertMessageProps
  return {
    ...(message as AlertMessageProps),
    type: (message as AlertMessageProps).type ?? type,
    ...extra,
  };
}

/**
 * Global Alert Manager (no React hook needed).
 */
export const AlertManager = {
  showMessage(message: AlertMessage) {
    AlertGlobalDispatcher.send(message);
  },

  showinfo(message: string | AlertMessage, title?: string) {
    AlertGlobalDispatcher.send(
      normalizeMessage(message, ALERT_TYPE.info, title ? { title } : {})
    );
  },

  showSuccess(message: string | AlertMessage, title?: string) {
    AlertGlobalDispatcher.send(
      normalizeMessage(message, ALERT_TYPE.success, title ? { title } : {})
    );
  },

  showWarning(message: string | AlertMessage, title?: string) {
    AlertGlobalDispatcher.send(
      normalizeMessage(message, ALERT_TYPE.warning, title ? { title } : {})
    );
  },

  showError(message: string | AlertMessage, title?: string) {
    AlertGlobalDispatcher.send(
      normalizeMessage(message, ALERT_TYPE.error, title ? { title } : {})
    );
  },

  showQuestion(
    message: string | AlertMessage,
    options?: Partial<
      Pick<
        AlertMessageProps,
        "title" | "onAccept" | "onClose" | "onExtra" |
        "acceptLabel" | "closeLabel" | "extraLabel"
      >
    >
  ) {
    AlertGlobalDispatcher.send(
      normalizeMessage(message, ALERT_TYPE.question, { ...options })
    );
  },

  showLoading(message: ReactNode) {
    AlertGlobalDispatcher.send({
      message,
      type: ALERT_TYPE.none,
      delay: INFINITE_DELAY,
    });
  },

  close() {
    AlertGlobalDispatcher.close();
  },
} as const;