import test from "node:test";
import assert from "node:assert/strict";
import {
  addCartItem,
  changeCartItemQuantity,
  summarizeCart,
} from "../lib/cart.mjs";

const main = { id: "tacos", title: "Short rib tacos", price: 16 };
const pairing = { id: "corn", title: "Smoky corn", price: 6 };

test("adds new items and increments an existing item", () => {
  const firstCart = addCartItem([], main, "main");
  const secondCart = addCartItem(firstCart, main, "main");

  assert.deepEqual(firstCart, [{ ...main, kind: "main", quantity: 1 }]);
  assert.equal(secondCart[0].quantity, 2);
  assert.notStrictEqual(secondCart, firstCart);
});

test("changes quantities and removes items at zero", () => {
  const cart = [{ ...main, kind: "main", quantity: 2 }];

  assert.equal(changeCartItemQuantity(cart, main.id, -1)[0].quantity, 1);
  assert.deepEqual(changeCartItemQuantity(cart, main.id, -2), []);
});

test("summarizes counts and prices by item kind", () => {
  const cart = [
    { ...main, kind: "main", quantity: 2 },
    { ...pairing, kind: "pairing", quantity: 1 },
  ];

  assert.deepEqual(summarizeCart(cart), {
    mainCount: 2,
    pairingCount: 1,
    totalItems: 3,
    totalPrice: 38,
  });
});

test("rejects invalid item kinds and quantity changes", () => {
  assert.throws(() => addCartItem([], main, "dessert"), /Unsupported/);
  assert.throws(() => changeCartItemQuantity([], main.id, 0), /non-zero/);
});
