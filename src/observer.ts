export type PayloadFn = (payload?: any) => void | Promise<void>;

export interface Subscription {
  name: string;
  fn: PayloadFn;
}

export default class Observer {
  /**
   * A hash for storing subscriptions.
   */
  subscriptions: Subscription[] = [];

  /**
   * A hash for storing O(1) subscriptions.
   */
  fastEvents: { [name: string]: PayloadFn } = {};

  /**
   * Publish a new event for all subscribers to consume. Promises are sniffed
   * out to determine whether or not to Promise.all() at the end. Non-sync
   * functions have a performance hit so only await a promise if it's necessary.
   */
  async publish(name: string, payload?: any): Promise<void> {
    let hasPromises = false;
    const fns = [];
    const evts = this.subscriptions;

    for (let i = 0, l = evts.length; i < l; i++) {
      if (evts[i] && name === evts[i].name) {
        const fn = this.subscriptions[i].fn;
        const result = fn(payload);

        fns.push(result);

        if (!hasPromises && result && result["then"]) {
          hasPromises = true;
        }
      }
    }

    if (hasPromises) {
      await Promise.all(fns);
    }
  }

  /**
   * O(1) publishing. This is just a convenient way to call a function with a
   * trigger. This method should be used when performance is crucial and you'd
   * like to stay within the observer pub/sub paradigm. Otherwise use publish().
   */
  async publishFast(name: string, payload?: any): Promise<void> {
    const fn = this.fastEvents[name];

    if (fn) {
      const result = fn(payload);

      if (result && result["then"]) {
        await Promise.race([result]);
      } else {
        fn(payload);
      }
    }
  }

  /**
   * Subscribe to a published event.
   */
  subscribe(name: string, fn: PayloadFn) {
    this.subscriptions.push({ name, fn });
  }

  /**
   * O(1) subscribing. Same limitations as publishFast.
   */
  subscribeFast(name: string, fn: PayloadFn): void {
    this.fastEvents[name] = fn;
  }

  /**
   * Remove any subscriptions that were subscribed.
   */
  unsubscribe(name: string, fn: PayloadFn): void {
    let j = this.subscriptions.length;
    while (j--) {
      if (
        this.subscriptions[j].name === name &&
        fn === this.subscriptions[j].fn
      ) {
        this.subscriptions.splice(j, 1);
      }
    }
  }

  /**
   * Remove a fast subscription.
   */
  unsubscribeFast(name: string): void {
    if (this.fastEvents[name]) {
      delete this.fastEvents[name];
    }
  }
}
