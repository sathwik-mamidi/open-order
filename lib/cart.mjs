const CART_KINDS = new Set(["main", "pairing"]);

function assertCartItem(item, kind) {
  if (!item?.id || !item.title || !Number.isFinite(item.price)) {
    throw new TypeError("A cart item requires an id, title, and numeric price.");
  }
  if (!CART_KINDS.has(kind)) {
    throw new TypeError(`Unsupported cart item kind: ${kind}`);
  }
}

export function addCartItem(cart, item, kind) {
  assertCartItem(item, kind);
  const existing = cart.find((entry) => entry.id === item.id);

  if (existing) {
    if (existing.kind !== kind) {
      throw new Error(`Cart item ${item.id} cannot change kind.`);
    }
    return cart.map((entry) =>
      entry.id === item.id
        ? { ...entry, quantity: entry.quantity + 1 }
        : entry,
    );
  }

  return [
    ...cart,
    {
      id: item.id,
      title: item.title,
      price: item.price,
      kind,
      quantity: 1,
    },
  ];
}

export function changeCartItemQuantity(cart, id, amount) {
  if (!Number.isInteger(amount) || amount === 0) {
    throw new TypeError("Quantity changes must be non-zero integers.");
  }

  return cart.flatMap((entry) => {
    if (entry.id !== id) {
      return [entry];
    }

    const quantity = entry.quantity + amount;
    return quantity > 0 ? [{ ...entry, quantity }] : [];
  });
}

export function summarizeCart(cart) {
  return cart.reduce(
    (summary, item) => {
      summary.totalItems += item.quantity;
      summary.totalPrice += item.quantity * item.price;
      summary[item.kind === "main" ? "mainCount" : "pairingCount"] +=
        item.quantity;
      return summary;
    },
    { mainCount: 0, pairingCount: 0, totalItems: 0, totalPrice: 0 },
  );
}
