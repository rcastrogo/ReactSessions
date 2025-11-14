import {
  CheckCircle,
  Info,
  TriangleAlert,
  FileQuestionIcon,
  XCircle,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import PubSub from '~/lib/pubsub';

import { cn } from '../../lib/utils';
import Show from './Show';
import { Button } from '../ui/button';
import { Dialog, DialogTitle, DialogContent, DialogDescription } from '../ui/dialog';
import { Separator } from '../ui/separator';
import { DialogSizeClasses } from './DialogLayout';

export const ALERT_TYPE = {
  none: Symbol('none'),
  success: Symbol('sucess'),
  info: Symbol('info'),
  warning: Symbol('warning'),
  question: Symbol('question'),
  error: Symbol('error'),
};

export type LocalizationKey = { key: string };
export type AlertType = (typeof ALERT_TYPE)[keyof typeof ALERT_TYPE];
export type AlertMessageProps = {
  title?: string;
  message: ReactNode;
  type?: AlertType;
  delay?: number;
  onAccept?: () => void;
  onClose?: () => void;
  onExtra?: () => void;
  acceptLabel?: string;
  closeLabel?: string;
  extraLabel?: string;
};

export type AlertMessage = AlertMessageProps | ReactNode | LocalizationKey;

type ShowAlertMessageFn = (target: AlertMessage) => void;

export const AlertGlobalDispatcher = (function () {
  let _fn: ShowAlertMessageFn | undefined = undefined;
  let _fnClose: () => void | undefined;

  PubSub.subscribe(PubSub.messages.SHOW_ALERT, message => {
    AlertGlobalDispatcher.send(message);
  });

  PubSub.subscribe(PubSub.messages.HIDE_ALERT, () => AlertGlobalDispatcher.close());

  return {
    register: (showFn: ShowAlertMessageFn | undefined, closeFn: () => void | undefined) => {
      _fn = showFn;
      _fnClose = closeFn;
    },
    unRegister: () => (_fn = undefined),
    send: (message: AlertMessage) => _fn && _fn(message),
    close: () => _fnClose && _fnClose(),
  };
})();

function isLocalizationKey(obj: unknown): obj is LocalizationKey {
  if (typeof obj !== 'object' || obj === null) return false;
  if (typeof (obj as LocalizationKey).key !== 'string') return false;
  const keys = Object.keys(obj);
  if (keys.length !== 1 || !keys.includes('key')) return false;
  return true;
}

function isAlertMessageProps(obj: unknown): obj is AlertMessageProps {
  if (typeof obj !== 'object' || obj === null) return false;
  return Object.keys(obj).includes('message');
}

export default function AlertMessageComponent() {
  const [messages, setMessages] = useState<AlertMessageProps[]>([]);
  const [currentMsg, setCurrentMsg] = useState<ReactNode>(null);
  const timerRef = useRef<number | null>(null);
  const messageDivRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { t } = useTranslation();

  const current = messages[0];
  const DEFAULT_DELAY = 2000;

  const close = useCallback(
    (notify = true) => {
      if (notify && current) current.onClose?.();
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setMessages(prev => {
        const [_, ...rest] = prev;
        return rest;
      });
      setCurrentMsg(null);
    },
    [current]
  );

  const accept = useCallback(() => {
    current.onAccept?.();
    close(false);
  }, [close, current]);

  const showMessage = useCallback(
    (target: AlertMessage) => {
      let msg = {
        message: '',
        delay: DEFAULT_DELAY,
        title: '',
        type: ALERT_TYPE.none,
      } as AlertMessageProps;
      if (typeof target === 'string') {
        msg.message = target;
      } else if (React.isValidElement(target)) {
        msg.message = target;
      } else if (isLocalizationKey(target)) {
        msg.message = t(target.key);
      } else if (isAlertMessageProps(target)) {
        Object.assign(msg, {
          ...target,
          delay: target.delay ?? 0,
          type: target.type ?? ALERT_TYPE.none,
        });
      } else {
        return;
      }
      setMessages(prev => [...prev, msg]);
    },
    [t]
  );

  useEffect(() => {
    console.log('MessageContainer mounted!');
  }, []);

  useEffect(() => {
    AlertGlobalDispatcher.register(showMessage, close);
    return () => {
      AlertGlobalDispatcher.unRegister();
    };
  }, [showMessage]);

  useEffect(() => {
    if (!currentMsg && messages.length) {
      const target = messages[0];
      setCurrentMsg(target.message);
      if (target.delay == null) {
        timerRef.current = window.setTimeout(close, DEFAULT_DELAY);
      } else if (target.delay > 0 && target.delay != 31416) {
        timerRef.current = window.setTimeout(close, target.delay);
      }
    }
  }, [close, currentMsg, messages, messages.length]);

  useEffect(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setMessages([]);
  }, [location.pathname]);

  if (!current) return null;

  const renderIcon = (type: AlertType) => {
    if (type === ALERT_TYPE.success)
      return <CheckCircle style={{ width: '40px', height: '40px' }} />;
    if (type === ALERT_TYPE.info) return <Info style={{ width: '40px', height: '40px' }} />;
    if (type === ALERT_TYPE.warning)
      return <TriangleAlert style={{ width: '40px', height: '40px' }} />;
    if (type === ALERT_TYPE.question)
      return <FileQuestionIcon style={{ width: '40px', height: '40px' }} />;
    if (type === ALERT_TYPE.error) return <XCircle style={{ width: '40px', height: '40px' }} />;
    return null;
  };

  const showTitle = !!current.title;
  const showCloseBtn = current.delay == null || current.delay == 0;
  const cancelCloseOnClick = current.delay == 31416;
  const iconContent =
    current.type && current.type !== ALERT_TYPE.none ? (
      <div className="p-3">{renderIcon(current.type)}</div>
    ) : null;

  const ui = {
    accept: t(current.acceptLabel ?? 'general.action.accept'),
    close: t(current.closeLabel ?? 'general.action.close'),
    cancel: t(current.closeLabel ?? 'general.action.cancel'),
    extra: t(current.extraLabel ?? 'general.action.extra'),
    copy: t('general.action.copy'),
    copied: t('general.action.copied'),
  };

  return (
    <Dialog open={true} onOpenChange={() => close()}>
      <DialogContent
        className={cn('border-border bg-background text-foreground fixed top-[50%] left-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-0 border p-2 shadow-lg duration-200 sm:rounded-lg',
          DialogSizeClasses.sm)}
        showCloseButton={false}
        onEscapeKeyDown={(event) => {
          if (cancelCloseOnClick) {
            event.preventDefault();
          } else {
            close();
          }
        }}
        onInteractOutside={e => (showCloseBtn || cancelCloseOnClick) && e.preventDefault()}
      >
        <Show when={showTitle}>
          <DialogTitle className="p-1 text-center">{current.title}</DialogTitle>
          <Separator className="mt-1 mb-1 border-b"></Separator>
        </Show>
        <Show when={!showTitle}>
          <DialogTitle className="hidden">{current.title}</DialogTitle>
        </Show>
        <div className="group relative flex flex-row items-center justify-items-center">
          {iconContent}
          <div
            ref={messageDivRef}
            className={cn(
              'text-foreground max-h-[50vh] w-full overflow-hidden overflow-y-auto text-left',
              {
                'text-center': current.type === ALERT_TYPE.none,
              }
            )}
          >
            <DialogDescription className="hidden"></DialogDescription>
            {current.message}
          </div>
        </div>
        <Show when={showCloseBtn}>
          <Separator className="mt-1 mb-2" />
          <div className="flex flex-row justify-center gap-1">
            <Button variant="secondary" className="w-[33%]" onClick={() => close()}>
              {ui.close}
            </Button>
            <Show when={current.type == ALERT_TYPE.question}>
              <Button variant="outline" className="w-[33%]" onClick={accept}>
                {ui.accept}
              </Button>
              <Show when={current.onExtra != undefined}>
                <Button variant="default" className="flex-1" onClick={current.onExtra}>
                  {ui.extra}
                </Button>
              </Show>
            </Show>
          </div>
        </Show>
      </DialogContent>
    </Dialog>
  );
}
