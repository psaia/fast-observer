# Fast Observer

**Does the world need another event dispatcher library?**

Most event dispatchers are O(N). Fast Observer is a lightweight O(1) and
asynchronous library. This is useful when:

* Performance matters (think mouse events or `requestAnimationFrame()`)
* You want to work with async/await on publishing
* You care about file size
* Convenience features such as namespaces aren't necessary

Some extra tidbits:

* There are zero-dependencies
* It's well tested

### Installation

```
npm i --save fast-observer
```

### Usage

```typescript
import Observer from "fast-observer";

const o = new Observer();

// Define some O(N) subscriptions (nothing new here).
o.subscribe("launch ship", launchTheShip);
o.subscribe("launch ship", launchTheOtherShip);
o.subscribe("launch ship", launchTheOtherShip);

await o.publish("launch ship"); // Wait for all the ships to launch.

// Define O(1) subscription.
o.subscribeFast("engine propulsion", handlePropulsion);

await o.publishFast("engine propulsion"); // Similar to publish, is a promise.
```

The major caveat of `subscribeFast` is that there can only be one. If there are
multiple, they will override each other. There's no magic here -
`subscribeFast` and `publishFast` is just more of structured way to call a
function.

### API

* `subscribe(eventName: string, (payload?: any) => void | Promise<void>): void`
* `unsubscribe(eventName: string, fn): void`
* `subscribeFast(eventName: string, (payload?: any) => void | Promise<void>): void`
* `unsubscribeFast(eventName: string): void`
* `publish(eventName: string): Promise<void>`
* `publishFast(eventName: string): Promise<void>`

### Development

1. `npm i && tsc -w` to install dev-deps & watch
2. `npm test` to run tests

## License

Apache Version 2.0

See [LICENSE](https://github.com/psaia/fast-observer/blob/master/LICENSE)
