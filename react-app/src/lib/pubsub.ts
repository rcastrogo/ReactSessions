import { MESSAGE, type Callback, type PubSubEventKeys, type PubSubEventMap } from './pubsub.events';

const PubSub = (() => {
  const subscribers: Partial<Record<PubSubEventKeys, Callback<PubSubEventKeys>[]>> = {};

  function subscribe<E extends PubSubEventKeys>(event: E, callback: Callback<E>) {
    if (!subscribers[event]) subscribers[event] = [];
    (subscribers[event] as Callback<E>[]).push(callback);
    return () => unsubscribe(event, callback);
  }

  function publish<E extends PubSubEventKeys>(event: E, data: PubSubEventMap[E]) {
    console.log(event);
    (subscribers[event] as Callback<E>[] | undefined)?.forEach(cb => cb(data));
  }

  function unsubscribe<E extends PubSubEventKeys>(event: E, callback: Callback<E>) {
    const list = subscribers[event];
    if (!list) return;
    subscribers[event] = list.filter(cb => cb !== callback) as Callback<PubSubEventKeys>[];
  }

  return { subscribe, publish, unsubscribe, messages: MESSAGE };
})();

export default PubSub;
