# Eco Homes Lagos Functional Upgrade

## What was built

- Localized the site from US luxury real estate to Lagos, Nigeria while preserving the existing visual layout and animation system.
- Replaced static listing behavior with a functional Lagos property search experience on `/spaces`.
- Added 24 local Nigerian listings in `src/data/properties.json` across Lekki Phase 1, Ikoyi, Victoria Island, Ajah, Yaba, Ikeja GRA, and Magodo.
- Added Next.js mock API routes:
  - `GET /api/properties`
  - `GET /api/properties/:id`
  - `POST /api/bookings`
- Added modular feature folders under `src/features` for search, listings, booking, and neighbourhoods.
- Added dynamic property detail pages at `/properties/[id]`.
- Redirected `/sample-space` to the featured Lagos property.
- Added hybrid booking flow:
  - validates booking form
  - detects duplicate local bookings
  - calls mock booking API
  - saves confirmed bookings to `localStorage`
  - shows animated confirmation
  - provides a prefilled `mailto:` handoff to `hello@studioeco.co`
- Added “My Bookings” slide-in panel.
- Added neighbourhood insights data and comparison page at `/neighbourhoods`.
- Added non-API location panel with coordinates and external Google Maps link.
- Avoided Google Maps API because it requires API key and billing setup.

## Test coverage

Vitest coverage added for:

- price, type, bedroom, fuzzy location, and combined property filters
- property service and `/api/properties` route behavior
- listing shape validation
- booking form validation
- Nigerian phone validation
- past-date and Sunday rejection
- duplicate booking detection
- booking API success response
- Studio Eco inquiry email generation
- neighbourhood data shape and insight-card render smoke test

Playwright coverage added for:

- `/spaces` search/filter smoke flow
- navigation from filtered results into a property detail page

## How to run

```bash
npm run dev
npm test
npm run build
```

Run Playwright after browser binaries are installed:

```bash
npx playwright install
npm run test:e2e
```

This workspace had no Playwright browser binary installed, so `npm run test:e2e` could not complete here until `npx playwright install` is run.
