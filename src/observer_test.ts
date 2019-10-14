import Observer from "./observer";
import * as assert from "assert";

function wait(t: number) {
  return new Promise(resolve => setTimeout(resolve, t));
}

describe("Observer", function() {
  it("should publish to all listeners async", async function() {
    const o = new Observer();
    let callCount = 0;

    o.subscribe("foobar", function(val) {
      assert.equal(1, val, "Value should be 1");
      callCount++;
    });

    o.subscribe("foobar", async function asyncer(val) {
      await wait(50);
      assert.equal(1, val, "Value should be 1");
      callCount++;
    });

    await o.publish("foobar", 1);
    assert.equal(callCount, 2, "Both methods should have executed");
  });

  it("should unsubscribe to a listener", function() {
    const o = new Observer();

    const cb = () => assert.fail("should be unsubscribed");
    const cb2 = () => assert.ok(1);

    o.subscribe("foobar", cb);
    o.subscribe("foobar", cb2);

    o.unsubscribe("foobar", cb);
    o.publish("foobar");
  });

  it("should handle fast subscriptions", async function() {
    const o = new Observer();
    let callCount = 0;

    o.subscribeFast("fast event", async function() {
      await wait(5);
      callCount++;
    });

    await o.publishFast("not fast event");
    o.publishFast("not fast event");

    assert.equal(callCount, 0);

    await o.publishFast("fast event");

    assert.equal(callCount, 1);
  });
});
