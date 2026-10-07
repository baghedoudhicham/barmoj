# BRKAR | بِرْكار

Arabic-first learning product for children in Morocco and MENA, focused on **systems thinking, problem solving, modeling, testing, debugging and explaining decisions**. The Latin brand is **BRKAR**; it is spoken **Birkar** and written **بِرْكار** in Arabic.

> نتعلّم كيف نفكّر، ثم كيف نبرمج.
>
> لا نعلّم الطفل كتابة الكود. نعلّمه بناء نظام.

Brand details and the pronunciation cue are in [docs/BRAND-DIRECTION.md](docs/BRAND-DIRECTION.md).

## Current prototype

The repository contains a runnable Vite + React + TypeScript family-supervised BRKAR pilot.

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

The site includes the complete 12-mission curriculum in Arabic, English and French at /curriculum. The four Mission Labs, lab catalogue and child result screen also support Arabic, English and French with RTL/LTR direction. Kid Home, onboarding, privacy and the Parent Dashboard remain Arabic; this narrower scope is stated before families start.

The family guide also offers an optional, non-scored values reflection in all three curriculum languages, connecting careful reasoning with truthfulness, responsibility, patience, consultation and care. The pilot contains no scripture quotations; direct Qur'an or hadith text requires source, translation and context review before it is added.

Four missions have interactive labs today, available in Arabic, English and French. The other eight are curriculum activities with child prompts and screen-free transfer questions; they are not represented as built software lessons.

## Firebase Hosting

Live BRKAR pilot: https://barmoj-266b8.web.app/

Firebase project: `barmoj-266b8`

The repository includes `firebase.json` and `.firebaserc`. The current Firebase project and URL retain the earlier Barmoj infrastructure identifiers; the customer-facing product brand is BRKAR. Hosting serves the Vite `dist` directory and rewrites SPA routes such as `/kid`, `/mission/water`, and `/parent` to `index.html`, so direct links work after deployment. A BRKAR custom domain is not configured here.

The current release is still a local-only pilot: it has no parent sign-in flow or cloud sync. The repository defines default-deny Firestore and Storage rules and tests the Firestore rules in the emulator; the current workflow does not deploy those rules. See [docs/FIREBASE-ARCHITECTURE.md](docs/FIREBASE-ARCHITECTURE.md) before connecting live backend services.

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

The workbench follows the Figma Mission Lab direction (`2433:15`): paper work surface, system pieces, deep-green prediction/coaching panels, and the existing green/yellow/red palette. Noto Kufi Arabic is self-hosted under its included SIL Open Font License, and the app makes no Google Fonts request. Brando Arabic remains a future option if a licensed webfont is obtained.

## Release

The existing `.github/workflows/ci.yml` deploys **pushes to main** to Firebase project `barmoj-266b8`. Feature branches and pull requests run the tests and build without deploying. Dependencies are locked in `package-lock.json` and CI uses `npm ci`.

After reviewing and merging the feature branch, verify the build and deployment jobs. The deployment job expects the existing repository secret `FIREBASE_SERVICE_ACCOUNT_BARMOJ_266B8`. If it is missing or invalid, a project administrator must configure it; do not commit credentials.

The configured live URL is https://barmoj-266b8.web.app/. The separate URL https://barmoj.web.app/ returned Firebase's **Site Not Found** during inspection. This repository does not establish a hosting target for that short URL; resolve its hosting-site ownership and target separately before deploying there.

See `docs/QA-2026-10.md` for the checks performed on this pass.

## Child and family pilot safeguards

- Onboarding asks only for an optional nickname and requires an adult to confirm they will supervise. This is a reminder, not identity or age verification.
- Startup removes parent-name and exact-age fields from legacy local profiles and deletes old prototype event logs.
- Profile, drafts and learning evidence stay in this browser's local storage. There is no account, cloud sync, analytics, advertising, payment, public sharing or child-facing AI.
- The app does not store passwords or authentication credentials. Local browser storage is not an encrypted vault; use only a family-controlled device and a non-identifying nickname. Firebase deployment credentials belong in the repository's protected Actions secret, never in source, screenshots or public launch materials.
- Anyone using the same browser profile can open the parent dashboard. Do not use a shared or public computer without the parent present; do not enter full names, school, address or contact details.
- The Parent Dashboard can remove all locally stored pilot data for this site. Existing browser-storage keys keep their earlier internal prefix so pilot records survive the brand change.
- Hosting still serves the site through Firebase. Its provider processes the technical requests needed to deliver pages; this product code does not send the child's profile or answers to an application backend.
- This is a moderated, family-supervised pilot, not an unrestricted public release or a legal compliance claim. Before opening public registration, identify the service operator and family contact, then review applicable Moroccan data-protection and guardian-consent requirements.

See [docs/PILOT-RELEASE-CHECKLIST.md](docs/PILOT-RELEASE-CHECKLIST.md) for the launch boundary and remaining gates. The chosen brand is not a substitute for a market-specific name, domain and trademark clearance before public launch.

## Product principles

- Arabic-first and RTL interface; the curriculum challenge content also supports English and French
- Designed for ages 7–14
- A parent or trusted adult supervises the pilot
- The current pilot stores only an optional nickname and local learning records
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
- Noto Kufi Arabic is self-hosted; Brando Arabic remains a future option if a licensed webfont is obtained

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

The proposed Arabic, English and French 12-mission curriculum is in [docs/CURRICULUM-1.0.md](docs/CURRICULUM-1.0.md). The testing sequence, future Resources shelf, finite story format, AI boundaries, language plan and monetization sequence are in [docs/PRODUCT-ROADMAP.md](docs/PRODUCT-ROADMAP.md).

See `docs/PRODUCT.md` for the product model and curriculum direction.
