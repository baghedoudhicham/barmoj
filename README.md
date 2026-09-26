# Barmoj — برموج

Arabic-first learning product for children in Morocco, focused on **systems thinking, problem solving, modeling, testing, debugging and explaining decisions**.

> نتعلّم كيف نفكّر، ثم كيف نبرمج.
>
> لا نعلّم الطفل كتابة الكود. نعلّمه بناء نظام.

## Current prototype

The repository contains a runnable Vite + React + TypeScript pilot prototype.

Core flow:

**Landing → parent setup → Kid Home → Mission Lab → learning evidence → Parent Dashboard**

Implemented mission labs:

- **خزان لا يفيض** — sensor → rule → output, normal/failure tests, safeguard and explanation
- **رتّب التوصيلات** — constraints, sequencing and re-planning after a blocked road
- **تقاطع آمن** — state conflicts and a safety interlock
- **لعبة لا تنكسر** — feedback loops, runaway rewards and rule tuning

The learning cycle is:

**Observe → Question → Model → Predict → Build → Break → Debug → Improve → Explain**

The first track remains `فكّر كنظام` with 12 missions. Code and AI are execution tools, not the learning objective.

## Firebase Hosting

Live pilot: https://barmoj-266b8.web.app/

Firebase project: `barmoj-266b8`

The repository includes `firebase.json` and `.firebaserc`. Hosting serves the Vite `dist` directory and rewrites SPA routes such as `/kid`, `/mission/water`, and `/parent` to `index.html`, so direct links work after deployment.

Build and deploy manually when needed:

```bash
npm install
npm run build
npx firebase-tools deploy --only hosting --project barmoj-266b8
```

## Run locally

```bash
npm install
npm run dev
```

Production check:

```bash
npm run build
npm run preview
```

## Product principles

- Arabic-first and RTL throughout
- Designed for ages 7–14
- Parents own the account and communication layer
- Minimal child data in V1
- No public child profiles, community, store, public leaderboard or unrestricted child-facing AI chat
- Parent reporting focuses on observable evidence: `يفهم / يمثّل / يتوقّع / يختبر / يفسّر`
- No reward for speed; missions reward reasoning, testing and explanation

## Visual system

- Ink `#151515`
- Paper `#F7F7F2`
- Learn green `#39DD59`
- Explore yellow `#FFC107`
- Challenge red `#FF164D`
- Deep green `#173E2B`
- Tactile geometry, dark outlines, system diagrams and functional color
- Avoid generic SaaS/AI styling, glassmorphism, decorative gradients and stock education art
- Brando Arabic is the preferred brand typeface when a licensed webfont is available; the prototype currently falls back to Noto Kufi Arabic

Figma: https://www.figma.com/design/IUHArEYFbaEqPcX66Q1rRh/barmoj

## Pilot target

Start with 20–30 Moroccan families and evaluate:

1. Can the child complete a mission without adult explanation?
2. Can the child explain the model and predict the result before running it?
3. Can the child identify and test a failure case?
4. Does the parent understand the learning evidence without educational jargon?
5. Do families want to return for another mission?

## V1 boundary

Do not add community, public leaderboards, stores, live classes, native apps, payments or open-ended child-facing AI until the core learning loop is validated.

See `docs/PRODUCT.md` for the product model and curriculum direction.
