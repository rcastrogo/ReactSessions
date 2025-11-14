import {
  ALERT_TYPE,
  type AlertType,
  type AlertMessage,
  type AlertMessageProps,
  type LocalizationKey,
  AlertGlobalDispatcher,
} from '../components/app/AlertMessageComponent';

import type { ReactNode } from 'react';

interface UseAlertManagerReturn {
  showMessage: (message: AlertMessage) => void;
  loading: (message: ReactNode) => void;
  close: () => void;
  info: (message: string | AlertMessage, title?: string) => void;
  success: (message: string | AlertMessage, title?: string) => void;
  warning: (message: string | AlertMessage, title?: string) => void;
  error: (message: string | AlertMessage, title?: string) => void;
  question: (
    message: string | AlertMessage,
    options?: Partial<
      Pick<
        AlertMessageProps,
        'title' | 'onAccept' | 'onClose' | 'onExtra' | 'acceptLabel' | 'closeLabel' | 'extraLabel'
      >
    >
  ) => void;
}

/**
 * Hook para mostrar alertas globales con métodos atajo tipados.
 */
export default function useAlertManager(): UseAlertManagerReturn {
  /**
   * Normaliza distintos tipos de entrada en un AlertMessageProps completo.
   */
  const normalizeMessage = (
    message: string | AlertMessage,
    type?: AlertType,
    extra?: Partial<AlertMessageProps>
  ): AlertMessage => {
    if (typeof message === 'string') {
      return {
        message,
        type,
        delay: 0,
        ...extra,
      };
    }
    if (typeof message === 'object' && !('message' in message!) && !('key' in message!)) {
      return {
        message: message as ReactNode,
        type,
        delay: 0,
        ...extra,
      };
    }
    if ('key' in (message as LocalizationKey)) {
      return message as LocalizationKey;
    }
    return {
      ...(message as AlertMessageProps),
      type: (message as AlertMessageProps).type ?? type,
      ...extra,
    };
  };

  const showMessage = (message: AlertMessage) => {
    AlertGlobalDispatcher.send(message);
  };

  const info = (message: string | AlertMessage, title?: string) => {
    AlertGlobalDispatcher.send(normalizeMessage(message, ALERT_TYPE.info, title ? { title } : {}));
  };

  const success = (message: string | AlertMessage, title?: string) => {
    AlertGlobalDispatcher.send(
      normalizeMessage(message, ALERT_TYPE.success, title ? { title } : {})
    );
  };

  const warning = (message: string | AlertMessage, title?: string) => {
    AlertGlobalDispatcher.send(
      normalizeMessage(message, ALERT_TYPE.warning, title ? { title } : {})
    );
  };

  const error = (message: string | AlertMessage, title?: string) => {
    AlertGlobalDispatcher.send(normalizeMessage(message, ALERT_TYPE.error, title ? { title } : {}));
  };

  const question = (
    message: string | AlertMessage,
    options?: Partial<
      Pick<
        AlertMessageProps,
        'title' | 'onAccept' | 'onClose' | 'onExtra' | 'acceptLabel' | 'closeLabel' | 'extraLabel'
      >
    >
  ) =>
    AlertGlobalDispatcher.send(
      normalizeMessage(message, ALERT_TYPE.question, {
        ...options,
      })
    );

  const loading = (message: ReactNode) => {
      const target = {
        message, 
        ALERT_TYPE: ALERT_TYPE.none,
        delay: 31416
      };
      AlertGlobalDispatcher.send(target);
  }

  return {
    showMessage,
    info,
    success,
    warning,
    error,
    question,
    loading,
    // PubSub.publish(PubSub.messages.HIDE_ALERT, undefined);
    close: AlertGlobalDispatcher.close,
  };
}
