export declare type PayloadFn = (payload?: any) => void | Promise<void>;
export interface Subscription {
    name: string;
    fn: PayloadFn;
}
export default class Observer {
    /**
     * A hash for storing convenient subscriptions.
     */
    subscriptions: Subscription[];
    /**
     * A hash for storing efficient subscriptions.
     */
    fastEvents: {
        [name: string]: PayloadFn;
    };
    /**
     * Publish a new event for all subscribers to consume.
     */
    publish(name: string, payload?: any): Promise<void>;
    /**
     * O(1) publishing. The limitations here is there can only be one subscriber.
     */
    publishFast(name: string, payload?: any): Promise<void>;
    /**
     * Subscribe to a published event.
     */
    subscribe(name: string, fn: PayloadFn): void;
    /**
     * O(1) subscribing. Same limitations as publishFast.
     */
    subscribeFast(name: string, fn: PayloadFn): void;
    /**
     * Remove any subscriptions that were subscribed.
     */
    unsubscribe(name: string, fn: PayloadFn): void;
    /**
     * Remove a fast subscription.
     */
    unsubscribeFast(name: string): void;
}
