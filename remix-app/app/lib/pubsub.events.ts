import type { AlertMessage } from '~/components/app/AlertMessage';

export const MESSAGE = {
  SHOW_ALERT: 'MSG_SHOW_ALERT',
  HIDE_ALERT: 'MSG_HIDE_ALERT',
  USER_LOGIN: 'MSG_USER_LOGIN',
  DATA_UPDATED: 'MSG_DATA_UPDATED',
} as const;

export type PubSubEventKeys = (typeof MESSAGE)[keyof typeof MESSAGE];

export interface PubSubEventMap {
  MSG_SHOW_ALERT: AlertMessage;
  MSG_HIDE_ALERT: void;
  MSG_USER_LOGIN: { userId: string; name: string };
  MSG_DATA_UPDATED: { updatedAt: Date; source?: string };
}

export type Callback<E extends PubSubEventKeys> = (data: PubSubEventMap[E]) => void;
