# Open Order

Open Order is an interactive product concept for a smarter restaurant QR menu. It replaces a long, passive menu with guided discovery, timely pairings, and a live basket that helps guests move from intent to an order with less friction.

- **Live site:** [open-order.pages.dev](https://open-order.pages.dev)
- **Interactive diner flow:** [open-order.pages.dev/order](https://open-order.pages.dev/order)

## About

This repository is the public snapshot of the Open Order experience. It demonstrates two sides of the product: an owner-facing explanation of the value proposition and a diner-facing ordering flow with mood-based recommendations, contextual pairings, and basket controls.

The snapshot is intentionally front-end only. Recommendations are deterministic, checkout is disabled, and there is no restaurant backend, payment integration, account system, or live machine-learning service. That keeps the project easy to inspect and deploy while making the intended interaction model concrete.

## Experience

- `/` presents the product story, venue-specific examples, operating problems, and the shift from a static QR menu to guided ordering.
- `/order` provides the interactive table demo: choose a mood, add a recommended main, see relevant pairings, and adjust basket quantities.

The product metrics shown in the presentation are illustrative and should not be interpreted as measured production results.

## Architecture

Open Order uses a conservative static architecture:

- Next.js App Router renders the two routes as a static export.
- React client components own the page interactions and local basket state.
- `lib/order-catalog.mjs` is the single source of truth for moods, mains, pairings, and recommendation relationships.
- `lib/cart.mjs` contains framework-independent basket operations.
- Plain CSS in `app/globals.css` preserves the custom visual system without a component or styling framework.
- Cloudflare Pages serves the generated `out/` directory and applies the response headers defined in `public/_headers`.

There are no server functions, databases, API routes, or runtime application secrets.

```text
app/
  layout.js                 Root metadata, fonts, and document shell
  page.js                   Product landing route
  order/page.js             Interactive order route
  globals.css               Shared visual system and responsive styles
components/
  landing-demo.js           Owner-facing product presentation
  order-demo.js             Diner flow and basket interface
lib/
  cart.mjs                  Pure basket operations
  order-catalog.mjs         Menu data, queries, and validation
public/
  assets/                    Menu photography
  _headers                   Cloudflare Pages security headers
scripts/
  validate-catalog.mjs      Catalog and asset integrity check
test/
  *.test.mjs                Node-native unit tests
```

## Local setup

Prerequisites:

- Node.js 24 or newer (the expected version is recorded in `.nvmrc`)
- npm 11 or newer

```bash
git clone https://github.com/sathwik-mamidi/open-order.git
cd open-order
nvm use
npm ci
npm run dev
```

The development server runs at `http://localhost:3000`.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server. |
| `npm run build` | Create the static production export in `out/`. |
| `npm test` | Run unit tests with Node's built-in test runner. |
| `npm run validate` | Verify catalog relationships, prices, paths, and referenced assets. |
| `npm run check` | Run catalog validation, tests, and the production build. |
| `npm run preview` | Build and serve `out/` through the local Cloudflare Pages runtime. |
| `npm run deploy` | Run all checks and directly upload `out/` to the `open-order` Pages project. |

## Environment variables

The application has no runtime environment variables.

Direct, non-interactive Wrangler operations may require `CLOUDFLARE_API_TOKEN`. Treat it as a deployment credential: store it in the shell or CI secret store, never commit it. Interactive local use can authenticate with `npm exec wrangler -- login` instead.

## Deployment

The production site is a Cloudflare Pages project connected to the repository's `main` branch. A push to `main` triggers the normal production deployment.

Cloudflare Pages build settings:

```text
Build command: npm run build
Build output directory: out
Node version: 24
```

`wrangler.jsonc` records the project name, static output directory, and compatibility date for local preview and direct uploads. Direct deployment is available through `npm run deploy`, but the Git integration is the preferred production path.

## Operational notes

- `next.config.mjs` uses `output: "export"`; features that require a Next.js server are intentionally unavailable.
- Menu and basket state are in-memory and reset on refresh.
- Checkout is intentionally disabled because this snapshot does not process orders or payments.
- Google Fonts are loaded from Google's font CDN and require network access in the browser.
- Cloudflare Pages consumes `public/_headers`; other static hosts may require equivalent security-header configuration.
- Run `npm run check` before merging catalog, interaction, dependency, or deployment changes.
