const Observer = require("../lib/observer").default;
const PubSub = require("pubsub-js");

let executed = 0;

function bench(iterations, fn) {
  const start = new Date();

  for (let i = 0; i < iterations; i++) {
    fn();
  }

  const finish = new Date();

  console.info(
    `Executed ${executed} times in ${finish.getTime() - start.getTime()} ms`
  );
}

function testObserver() {
  const o = new Observer();
  let rounds = 10000;

  while (rounds--) {
    o.subscribe("a", () => {
      executed++;
    });
  }

  bench(1000, () => o.publish("a"));
}

function testPubsubJS() {
  let rounds = 10000;

  while (rounds--) {
    PubSub.subscribe("a", () => {
      executed++;
    });
  }

  bench(1000, () => PubSub.publishSync("a"));
}

// testPubsubJS();
testObserver();
