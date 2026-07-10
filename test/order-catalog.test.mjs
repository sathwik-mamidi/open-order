import test from "node:test";
import assert from "node:assert/strict";
import {
  getMainsForMood,
  getPairingsForMain,
  mains,
  validateCatalog,
} from "../lib/order-catalog.mjs";

test("catalog references are internally valid", () => {
  assert.deepEqual(validateCatalog(), []);
});

test("mood filters return only matching mains", () => {
  const quickMains = getMainsForMood("quick");

  assert.ok(quickMains.length > 0);
  assert.ok(quickMains.every((item) => item.moodIds.includes("quick")));
  assert.deepEqual(getMainsForMood("unknown"), []);
});

test("main recommendations resolve to pairing records", () => {
  const tacoPairings = getPairingsForMain(mains[0]);

  assert.deepEqual(
    tacoPairings.map((item) => item.id),
    mains[0].pairingIds,
  );
});
