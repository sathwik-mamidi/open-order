"use client";

import Link from "next/link";
import { useState, useTransition } from "react";

const venueModes = [
  {
    id: "casual",
    label: "Casual Dining",
    stats: [
      { label: "Avg ticket lift", value: "+18%" },
      { label: "Faster decisions", value: "-32%" },
      { label: "Staff dependency", value: "lower" },
    ],
    badge: "Dinner rush",
    leadDish: "Short rib taco set",
    price: "$28",
    image: "/assets/short-rib-tacos.png",
    chips: ["Mood-first flow", "Smart pairings", "Timed upsell"],
    accent: "Guided dinner experience that sells",
  },
  {
    id: "cafe",
    label: "Cafe",
    stats: [
      { label: "Drink attach rate", value: "+22%" },
      { label: "Order speed", value: "-26%" },
      { label: "Repeat ordering", value: "easier" },
    ],
    badge: "Lunch hour",
    leadDish: "Pesto panini combo",
    price: "$14",
    image: "/assets/pesto-panini.png",
    chips: ["Quick picks", "One-tap combos", "Drink prompts"],
    accent: "Zero-friction flow that upsells quietly",
  },
  {
    id: "qsr",
    label: "QSR",
    stats: [
      { label: "Bundle rate", value: "+15%" },
      { label: "Queue pressure", value: "-21%" },
      { label: "Throughput", value: "faster" },
    ],
    badge: "Peak volume",
    leadDish: "Crispy wrap meal",
    price: "$11",
    image: "/assets/wagyu-sliders.png",
    chips: ["Fast reorder", "Bundle prompts", "Dessert nudges"],
    accent: "Shorter path to a bigger basket",
  },
];

const capabilities = [
  {
    number: "01",
    title: "Guided discovery",
    text: "Guests choose a mood — not scroll a 40-item menu. Fewer choices, faster decisions, higher confidence in what they order.",
  },
  {
    number: "02",
    title: "Contextual upsell",
    text: "\"People usually add this\" — surfaced at the exact moment intent is highest. Not a static extras section buried at the bottom.",
  },
  {
    number: "03",
    title: "Revenue per table",
    text: "Every interaction is designed to grow the basket — add-ons, combos, premium swaps — without feeling pushy to the guest.",
  },
];

const problems = [
  "Missed upsells at every table",
  "Guests stall on overwhelming menus",
  "Staff can't recommend consistently",
  "Peak hours slow to a crawl",
];

export default function LandingDemo() {
  const [activeMode, setActiveMode] = useState("casual");
  const [isPending, startTransition] = useTransition();

  const currentMode =
    venueModes.find((mode) => mode.id === activeMode) ?? venueModes[0];

  return (
    <div className="page-shell">
      <div className="ambient ambient-left" aria-hidden="true" />
      <div className="ambient ambient-right" aria-hidden="true" />

      <header className="topbar">
        <Link href="/" className="brand">
          Open Order
        </Link>
      </header>

      <main className="home-stack">
        {/* ── hero ── */}
        <section className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Smart QR ordering for restaurants</p>
            <h1>Your menu doesn&rsquo;t sell. We built one that does.</h1>
            <p className="hero-text">
              Today&rsquo;s QR menus are digital PDFs — they display, but they
              don&rsquo;t guide. Open Order replaces that with an AI ordering
              layer that reads the moment, recommends the right dish, and
              grows the basket — automatically, at every table.
            </p>

            <div className="action-row">
              <Link href="/order" className="button button-solid">
                See the table experience
              </Link>
              <a href="#how" className="button button-ghost">
                How it works
              </a>
            </div>

            <div className="toggle-row" role="group" aria-label="Venue type">
              {venueModes.map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  className={
                    mode.id === activeMode
                      ? "toggle-chip active"
                      : "toggle-chip"
                  }
                  aria-pressed={mode.id === activeMode}
                  onClick={() =>
                    startTransition(() => setActiveMode(mode.id))
                  }
                >
                  {mode.label}
                </button>
              ))}
            </div>

            <div className={isPending ? "stat-grid is-pending" : "stat-grid"}>
              {currentMode.stats.map((stat) => (
                <article key={stat.label} className="stat-card">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>
          </div>

          <div className={`hero-visual tone-${currentMode.id}`}>
            <div className="orbit-chip orbit-chip-top">AI picks</div>
            <div className="orbit-chip orbit-chip-bottom">Smart upsell</div>
            <div className="phone-preview">
              <div className="phone-preview-top">
                <div>
                  <p className="micro-label">{currentMode.badge}</p>
                  <h2>{currentMode.leadDish}</h2>
                </div>
                <span className="price-pill">{currentMode.price}</span>
              </div>

              <img
                className="hero-dish-img"
                src={currentMode.image}
                alt={currentMode.leadDish}
                width="512"
                height="512"
              />

              <div className="preview-copy">
                <p>{currentMode.accent}</p>
              </div>

              <div className="chip-stack">
                {currentMode.chips.map((chip) => (
                  <span key={chip} className="mini-chip">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── problem strip ── */}
        <section className="problem-strip">
          <div className="problem-header">
            <p className="eyebrow">The real problem</p>
            <h2>Menus today are passive. They show options — they don&rsquo;t help anyone decide.</h2>
          </div>
          <div className="problem-grid">
            {problems.map((problem) => (
              <div key={problem} className="problem-card">
                <span className="problem-icon" aria-hidden="true" />
                <p>{problem}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── how it works ── */}
        <section className="feature-grid" id="how">
          {capabilities.map((card) => (
            <article key={card.title} className="feature-card">
              <span className="feature-number">{card.number}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </section>

        {/* ── comparison ── */}
        <section className="pitch-strip" id="pitch">
          <div className="pitch-copy">
            <p className="eyebrow">The shift</p>
            <h2>From digital menu to ordering engine.</h2>
            <p className="pitch-sub">
              Existing QR solutions digitize the menu. Open Order optimizes the
              ordering behavior itself — what guests choose, how much they add,
              and how fast they decide.
            </p>
          </div>

          <div className="compare-card">
            <div className="compare-side">
              <span className="micro-label">Static QR menu</span>
              <div className="meter-track">
                <div
                  className="meter-fill meter-fill-soft"
                  style={{ width: "32%" }}
                />
              </div>
              <p>Long scroll. No guidance. Guests stall and under-order.</p>
            </div>

            <div className="compare-side">
              <span className="micro-label">Open Order</span>
              <div className="meter-track">
                <div className="meter-fill" style={{ width: "84%" }} />
              </div>
              <p>Guided flow. Right prompts. Measurably bigger baskets.</p>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cta-panel">
          <div>
            <p className="eyebrow">See it yourself</p>
            <h2>Walk through the experience your guests would have.</h2>
            <p className="cta-sub">
              Interactive demo — no signup, no setup. Just the ordering flow.
            </p>
          </div>
          <Link href="/order" className="button button-solid button-cta">
            Open the table demo &rarr;
          </Link>
        </section>
      </main>
    </div>
  );
}
