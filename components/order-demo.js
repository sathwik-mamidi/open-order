"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import {
  addCartItem,
  changeCartItemQuantity,
  summarizeCart,
} from "../lib/cart.mjs";
import {
  getMainsForMood,
  getPairingsForMain,
  mains,
  moods,
} from "../lib/order-catalog.mjs";

function formatPrice(value) {
  return `$${value}`;
}

export default function OrderDemo() {
  const [activeMood, setActiveMood] = useState("comfort");
  const [cart, setCart] = useState([]);
  const [isPending, startTransition] = useTransition();

  const visibleMains = getMainsForMood(activeMood);
  const featuredMain = visibleMains[0] ?? mains[0];
  const lastMainInCart = [...cart].reverse().find((item) => item.kind === "main");
  const suggestionSource =
    mains.find((item) => item.id === lastMainInCart?.id) ?? featuredMain;
  const suggestionItems = getPairingsForMain(suggestionSource);
  const { mainCount, pairingCount, totalItems, totalPrice } =
    summarizeCart(cart);

  const progress = pairingCount > 0 ? 100 : mainCount > 0 ? 68 : 32;
  const progressLabel =
    pairingCount > 0
      ? "Ready to checkout"
      : mainCount > 0
        ? "Add a pairing"
        : "Pick a main";

  function addToCart(item, kind) {
    setCart((current) => addCartItem(current, item, kind));
  }

  function changeQuantity(id, amount) {
    setCart((current) => changeCartItemQuantity(current, id, amount));
  }

  return (
    <div className="page-shell">
      <div className="ambient ambient-left" aria-hidden="true" />
      <div className="ambient ambient-right" aria-hidden="true" />

      <header className="topbar">
        <Link href="/" className="brand">
          Open Order
        </Link>
      </header>

      <main className="order-stack">
        <section className="order-grid">
          <div className="mobile-frame">
            <div className="screen-shell">
              <div className="screen-top">
                <div>
                  <p className="eyebrow">table-12.openorder.demo</p>
                  <h1>Juniper Table</h1>
                  <p className="hero-text">
                    Tap through a diner-facing order flow.
                  </p>
                </div>
                <span className="live-pill">Demo</span>
              </div>

              <div className="progress-card">
                <div className="progress-copy">
                  <span>{progressLabel}</span>
                  <strong aria-live="polite">{totalItems} items</strong>
                </div>
                <div className="meter-track">
                  <div className="meter-fill" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <section className="section-card">
                <div className="section-title">
                  <span className="micro-label">1. Pick a mood</span>
                </div>
                <div
                  className={isPending ? "mood-row is-pending" : "mood-row"}
                  role="group"
                  aria-label="Dining mood"
                >
                  {moods.map((mood) => (
                    <button
                      key={mood.id}
                      type="button"
                      className={
                        mood.id === activeMood
                          ? "mood-chip active"
                          : "mood-chip"
                      }
                      aria-pressed={mood.id === activeMood}
                      onClick={() =>
                        startTransition(() => setActiveMood(mood.id))
                      }
                    >
                      {mood.label}
                    </button>
                  ))}
                </div>
              </section>

              <section className="section-card highlight-card">
                <div className="section-title">
                  <div>
                    <span className="micro-label">2. Recommended main</span>
                    <h2>{featuredMain.title}</h2>
                  </div>
                  <strong>{formatPrice(featuredMain.price)}</strong>
                </div>
                <div className="feature-line">
                  <img
                    className="dish-img"
                    src={featuredMain.image}
                    alt={featuredMain.title}
                    width="192"
                    height="192"
                  />
                  <p>{featuredMain.description}</p>
                </div>
                <button
                  type="button"
                  className="button button-solid button-block"
                  onClick={() => addToCart(featuredMain, "main")}
                >
                  Add main
                </button>
              </section>

              <section className="section-card">
                <div className="section-title">
                  <span className="micro-label">Other picks</span>
                </div>
                <div className="item-grid">
                  {visibleMains.slice(1).map((item) => (
                    <article key={item.id} className="item-card">
                      <img
                        className="dish-img"
                        src={item.image}
                        alt={item.title}
                        width="192"
                        height="192"
                      />
                      <div className="item-copy">
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>
                      <div className="item-foot">
                        <strong>{formatPrice(item.price)}</strong>
                        <button
                          type="button"
                          className="button button-ghost mini-button"
                          onClick={() => addToCart(item, "main")}
                        >
                          Add
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="section-card">
                <div className="section-title">
                  <div>
                    <span className="micro-label">3. Smart pairings</span>
                    <h2>
                      Usually ordered with {suggestionSource.title.toLowerCase()}
                    </h2>
                  </div>
                </div>
                <div className="item-grid pairing-grid">
                  {suggestionItems.map((item) => (
                    <article key={item.id} className="item-card item-card-soft">
                      <img
                        className="dish-img"
                        src={item.image}
                        alt={item.title}
                        width="192"
                        height="192"
                      />
                      <div className="item-copy">
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>
                      <div className="item-foot">
                        <strong>{formatPrice(item.price)}</strong>
                        <button
                          type="button"
                          className="button button-ghost mini-button"
                          onClick={() => addToCart(item, "pairing")}
                        >
                          Add
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <aside className="cart-column">
            <div className="cart-card">
              <div className="section-title">
                <div>
                  <span className="micro-label">Live basket</span>
                  <h2>Table 12</h2>
                </div>
                <strong>{formatPrice(totalPrice)}</strong>
              </div>

              {cart.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-plate" aria-hidden="true" />
                  <p>Tap a main to start the order.</p>
                </div>
              ) : (
                <div className="cart-list">
                  {cart.map((item) => (
                    <div key={item.id} className="cart-row">
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.kind === "main" ? "Main" : "Pairing"}</p>
                      </div>
                      <div className="cart-actions">
                        <button
                          type="button"
                          className="qty-button"
                          aria-label={`Remove one ${item.title}`}
                          onClick={() => changeQuantity(item.id, -1)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          className="qty-button"
                          aria-label={`Add one ${item.title}`}
                          onClick={() => changeQuantity(item.id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="summary-grid">
                <div className="summary-row">
                  <span>Mains</span>
                  <strong>{mainCount}</strong>
                </div>
                <div className="summary-row">
                  <span>Pairings</span>
                  <strong>{pairingCount}</strong>
                </div>
                <div className="summary-row">
                  <span>Total</span>
                  <strong>{formatPrice(totalPrice)}</strong>
                </div>
              </div>

              <button
                type="button"
                className="button button-solid button-block"
                disabled
              >
                Checkout demo
              </button>
            </div>

            <div className="owner-note">
              <p className="eyebrow">Owner takeaway</p>
              <h2>Same menu. Better sequencing.</h2>
              <ul className="note-list">
                <li>Guests pick faster.</li>
                <li>Pairings appear at the right time.</li>
                <li>The basket grows without extra staff prompts.</li>
              </ul>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
