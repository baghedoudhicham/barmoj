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
npm ci
npm test
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
npm test
npm run build
npm run preview
```

## Mission notebook pass — October 2026

All four labs now collect a constraint, a prediction and a reason **before each test**. Each saved experiment contains an immutable copy of its settings and actual result. An incorrect prediction remains visible for reflection; it does not block learning.

- Water tests the exact 80% boundary, false sensor readings, and a backup sensor. After the rule changes, normal and boundary tests must be repeated under the improved rule.
- Delivery uses a visible road network. A comes first; when A–B closes, the alternate route reaches B through C.
- Traffic separates the requested state from the actual signals. The interlock rejects simultaneous green requests and renders both signals red.
- Game resources follow an explicit recurrence: `next balance = current balance - 3 + reward`, starting at 10. Five turns expose growth, depletion, or balance; reward 3 balances cost 3.

Completion requires observing a failure, testing the correction, and writing an explanation. Changing the current rule invalidates an incompatible corrected test. Text-length checks ensure an answer is present; **they do not evaluate whether the reasoning is correct**.

Kid Home resumes the most recent unfinished lab and suggests another lab after completion. The Parent Dashboard retains the child's actual constraint, prediction, reason, test settings, result and final explanation. Older completion records are preserved and marked as legacy summaries, without counting them as detailed evidence.

Drafts and evidence remain in this browser's local storage. No Firebase database, child account, cloud synchronization or automatic grading is introduced. Storage failures are shown to the child instead of reporting a successful save.

The workbench follows the Figma Mission Lab direction (`2433:15`): paper work surface, system pieces, deep-green prediction/coaching panels, and the existing green/yellow/red palette. The existing Noto Kufi Arabic fallback remains; Brando Arabic requires a licensed webfont.

## Release

The existing `.github/workflows/ci.yml` deploys **pushes to main** to Firebase project `barmoj-266b8`. Feature branches and pull requests run the tests and build without deploying. Dependencies are locked in `package-lock.json` and CI uses `npm ci`.

After reviewing and merging the feature branch, verify the build and deployment jobs. The deployment job expects the existing repository secret `FIREBASE_SERVICE_ACCOUNT_BARMOJ_266B8`. If it is missing or invalid, a project administrator must configure it; do not commit credentials.

The configured live URL is https://barmoj-266b8.web.app/. The separate URL https://barmoj.web.app/ returned Firebase's **Site Not Found** during inspection. This repository does not establish a hosting target for that short URL; resolve its hosting-site ownership and target separately before deploying there.

See `docs/QA-2026-10.md` for the checks performed on this pass.

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
