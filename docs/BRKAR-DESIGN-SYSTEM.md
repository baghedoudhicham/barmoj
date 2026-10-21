# BRKAR design system

Version: 1.0 · Product UI foundation · Arabic-first · Updated 18 October 2026

This document is the working source of truth for BRKAR's product interface. It covers the current preview, its public and family pages, the four interactive Mission Labs, and the reusable pieces being added to the UI kit. It is intentionally a product system rather than a logo manual: the approved compass mark and current wordmark stay as supplied assets and are not redrawn by this specification.

## 1. Product design premise

BRKAR gives children room to notice, predict, test, explain, and revise an idea. The interface should make that thinking visible while leaving the child in control of pace. Use calm hierarchy, useful diagrams, readable writing areas, clear feedback, and gentle transitions. Do not borrow the urgency, endless-feed patterns, streak pressure, public comparison, or reward loops of social media and games.

The current learning loop is `Notice → Predict → Test → Explain`. A later cycle may make revision explicit in the lesson copy, but screen labels must describe the actual step and must not imply that a step or experiment happened when it did not. A parent view reports observed work in plain language; it does not score intelligence, rank children, or infer traits from thin evidence.

Designed for Muslim families across MENA, the product uses honesty, fairness, care, and respect as practiced decisions in scenarios. Avoid decorative religious quotations or unattributed sacred text. Any future quotation needs a verified primary source, accurate wording and attribution, context, and a clear reason it belongs in the lesson.

## 2. Brand and voice

- Brand: BRKAR / بِركار. Keep the existing compass symbol and approved lockup. Never substitute a generated wordmark or casually reshape Arabic lettering.
- Character: curious, thoughtful, capable, warm, and direct. Speak to a child without baby talk; speak to adults without inflated claims.
- Visual tension: precise geometry and paper-like surfaces, balanced by human pacing and generous space. A diagram must explain a relationship, not merely decorate a card.
- Product copy describes capabilities accurately. Distinguish a live, interactive lab from a curriculum idea, design specimen, or future plan.
- Arabic is the default product language and uses RTL. English and French are full interface locales and use LTR. Language changes must not alter the learning logic.

## 3. Color tokens and use

| Token | Value | Meaning and use |
| --- | --- | --- |
| `--color-ink` / `--ink` | `#151515` | Main text, strong diagram lines, and primary-action text where applicable. |
| `--color-paper` / `--paper` | `#F7F7F2` | Page canvas and quiet working surfaces. |
| `--surface-raised` | `#FFFFFF` | Cards, controls, writing fields, and areas that sit above paper. |
| `--surface-soft` / `--soft` | `#ECEDE6` | Supporting panels and low-emphasis grouping. |
| `--color-deep` / `--deep` | `#173E2B` | Brand green, headings, outlines, selected states, and dark surfaces. |
| `--color-learn` / `--learn` | `#39DD59` | Learning/progress accent and selected positive status. Do not use as small white-on-green text background. |
| `--color-explore` / `--explore` | `#FFC107` | Exploration, current step, or attention marker. Do not use by itself to communicate state. |
| `--color-challenge` / `--challenge` | `#FF164D` | Challenge or error accent. Pair with a label/icon and a dark text color with sufficient contrast. |
| `--color-water` / `--water` | `#72C7E8` | Water context and diagram fill; not a general action color. |
| `--text-muted` | `#62645D` | Secondary copy on light surfaces. Keep body text readable; do not use lighter decorative gray for essential copy. |
| `--border-soft` | `#173E2B24` | Quiet panel and divider edge. Use a stronger border for controls and focus states. |

Keep the established palette. Semantic accents are sparse and contextual; most surfaces remain paper, white, or deep green. Reserve challenge red for an actual challenge, warning, or failure. Never make meaning depend on color alone. Verify contrast for the final text/background pairing, especially in small text and selected/error states; use ink or deep green for text on bright accent fills.

## 4. Typography

The bundled Noto Kufi Arabic WOFF2 subsets are served locally from `public/fonts/` and declared in `src/refinement.css` with language-specific Unicode ranges. Use `Noto Kufi Arabic` for Arabic. Latin copy uses the system UI stack (`system-ui`, `-apple-system`, `Segoe UI`, sans-serif) for familiar, fast rendering. Keep `font-display: swap`; do not add a second broad Arabic `@font-face` declaration that competes with the bundled subsets.

| Role | Desktop guidance | Small-screen guidance | Treatment |
| --- | --- | --- | --- |
| Display / page title | `clamp(2.25rem, 5vw, 4rem)` | `clamp(1.85rem, 8vw, 2.6rem)` | Strong weight, line-height 1.35–1.55 for Arabic; avoid tight Latin tracking on Arabic. |
| Section title | `clamp(1.45rem, 2.8vw, 2.35rem)` | `1.35–1.8rem` | Clear section hierarchy; line-height about 1.5 Arabic, 1.2–1.4 Latin. |
| Body | `1rem` | `1rem` | Comfortable line-height 1.75–2.0, especially for Arabic learning copy. |
| Supporting / label | `0.75–0.875rem` | `0.75–0.875rem` | Use for metadata and hints only; avoid dense paragraphs below 14px. |
| Numeric / technical | system UI or tabular numerals | same | Use `dir="ltr"` on percentages, IDs, measurements, dates, and code-like tokens. |

Use sentence case, short headings, and visible paragraph breaks. Arabic letter spacing stays at zero. For mixed-direction strings, set `dir="auto"` on child-authored text and isolate numeric or Latin values with `dir="ltr"` where needed.

## 5. Layout, spacing, shape, and depth

- Base spacing unit: 4px. Supported steps: 4, 8, 12, 16, 24, 32, 48px. Use larger section spacing of 56–88px on wide screens and 32–56px on compact screens.
- Content width: 1180px maximum. Reading width: 760px maximum. Keep 20px outer gutters on desktop and 14px at narrow mobile widths.
- Build hierarchy through alignment, spacing, and surface grouping. Avoid nesting multiple outlined cards inside one another.
- Corners: `--radius-control: 8px`, `--radius-card: 14px`, `--radius-feature: 22px`, `--radius-pill: 999px`. Small utility tags may be pills; primary content surfaces use the other radii consistently.
- Borders: quiet separators use `--border-soft`; controls use a visible 1px border; focus uses a 3px outline with offset. Avoid repeated heavy black outlines and offset hard shadows from earlier prototypes.
- Depth: `--shadow-card: 0 10px 28px #173E2B12`; `--shadow-soft: 0 8px 24px #173E2B0D`. Use only to lift a primary surface from the page, not on every row.
- Use logical CSS properties (`margin-inline`, `padding-block`, `inset-inline-start`) so mirrored layout works in Arabic and Latin languages.

## 6. Direction and localization

Set `lang` and `dir` on each page root using the selected locale. Arabic pages use `dir="rtl"`; English and French use `dir="ltr"`. Mirror directional navigation icons in LTR where the icon represents back/forward. Do not mirror diagrams, mathematical relationships, maps, or physical systems unless their meaning is directional. Keep diagrams explicitly `dir="ltr"` when their coordinates or labels need a stable technical orientation, then localize their surrounding copy.

Use CSS logical properties rather than left/right for layout. Use `text-align: start` instead of hard-coded left alignment for prose. Test long French labels and Arabic wrapping, mixed numerals, and form placeholders. Keep language controls keyboard accessible, expose the active locale with `aria-pressed` or the appropriate current state, and make the chosen language visible without color alone.

## 7. Responsive behavior

The implementation uses these practical layout bands; use content-driven exceptions rather than device detection:

| Range | Behavior |
| --- | --- |
| `> 900px` | Two-column landing and lab workbench layouts, four-column lab previews, full navigation, and multi-column evidence where content supports it. |
| `761–900px` | Collapse dense product/dashboard grids, keep comfortable page gutters, and let controls wrap before they become narrow. |
| `421–760px` | Single-column public and curriculum layouts; compact navigation; stack lab workbench; show evidence rows vertically; use two-column step markers where labels fit. |
| `≤ 420px` | Single-column lab previews, compact title-plus-number headers, full-width form controls where useful, and no horizontal overflow. |

Interactive targets should be at least 44px high. Keep action groups wrapping in a readable order. On small screens, put instructions before the diagram they describe, keep persistent diagrams from obscuring the task, and avoid sticky workbench panels. Verify at 320px, 375px, 768px, and 1280px widths when a browser/QA environment permits.

## 8. Motion

Motion clarifies a state change or supports continuity. It never adds urgency or competes with the child’s reading.

- Fast feedback: 140ms. Standard transition: 200ms. Prefer ease-out for entrances and ease-in-out for reversible state changes.
- Use a small 1–2px hover lift only on pointer-capable devices. Pressed controls settle immediately. Never make essential content appear only through animation.
- Page arrival may use a brief opacity change with at most 3px vertical travel. Avoid scroll-jacking, looping decorative motion, parallax, countdowns, confetti, streaks, or sound by default.
- Respect `prefers-reduced-motion: reduce`: remove nonessential animation and transitions, disable smooth scrolling, and keep all information/state changes immediate.

## 9. Components

Reusable React primitives live in `src/ui-kit.tsx`; visual rules and semantic tokens live in `src/design-system.css`. Existing screen controls continue to use their established APIs while they migrate to the primitives.

### Actions

`ActionLink` and `ActionButton` support `primary`, `secondary`, `quiet`, and `danger` variants and `regular` or `compact` sizes. The existing `.button` family is styled to the same 48px baseline, 8px corners, and restrained shadow so the older product routes remain visually coherent. Primary actions advance a meaningful task; secondary actions offer a safe alternative; quiet actions navigate or reveal detail; danger actions are reserved for destructive actions and require clear copy. Use native `disabled` for unavailable actions and do not rely on opacity alone to explain why.

### Choice card

`ChoiceCard` is a native button with `aria-pressed`, selected/unselected styling, optional supporting copy, and native disabled behavior. Keep the complete card tappable. The selected state uses a stronger border, subtle fill, and a visible indicator. Do not use it for multi-select unless its semantics and accessible name are changed accordingly.

### Learning steps

`LearningSteps` renders an ordered list for three or four learning stages. Each step is `done`, `current`, or `upcoming`; the caller provides localized text and an accessible list label. Use order in the DOM that matches the cognitive sequence. In RTL the list reads from the inline start without changing the underlying stage order.

### Status tags

`StatusTag` supports `neutral`, `learn`, `explore`, and `challenge` tones. A tag supplements nearby text; it never replaces an explanation or communicates a critical state by hue alone.

### Forms and reflection

Use visible labels, helpful placeholder examples, `dir="auto"` for child-authored writing, native constraints, and a practical writing area (usually at least 96px tall). Do not use a placeholder as the only label. Explain save behavior and location near the field; only report success after a real local or remote save. Never collect a child’s full name or unnecessary profile data in the pilot.

### Navigation and language selector

Keep site navigation compact, mark the current route accessibly, and keep the active language state visible. Mobile navigation has a 44px target and must announce its expanded state. Maintain a visible skip link and a logical keyboard order.

## 10. Screen patterns and route coverage

All current routes use the shared tokens and visual language. Screen content and task behavior remain the source of truth; the design gallery is not a second app flow.

| Route | Design pattern |
| --- | --- |
| `/` | Founder/product introduction, one reasoning example, method, four lab previews, family evidence explanation, values, pilot status, and clearly closed interest capture. |
| `/onboarding` | Minimal family setup, adult-supervision context, privacy/storage explanation, accessible fields, and a single clear next action. |
| `/kid` | Child workspace with current objective, visible reasoning cycle, one next action, track path, and real locally stored evidence. Avoid invented progress. |
| `/missions` | Four distinct Mission Lab cards with consistent information hierarchy and context-specific diagram colors. |
| `/mission/water`, `/mission/routing`, `/mission/traffic`, `/mission/economy` | Notebook workbench: task prompt, actual system diagram, predict/test controls, reflection, result feedback, and history. Keep failure cases understandable and explainable. |
| `/result` | Plain confirmation of the completed task and the evidence actually recorded, with child and parent next actions. |
| `/parent` | Evidence in the child’s words, observed actions and a gentle next question. No score, ranking, diagnosis, or fabricated metric. Keep local-storage limits and deletion controls clear. |
| `/curriculum` | Readable curriculum cards distinguish available interactive labs from planned/family activities. Do not make planned work look playable. |
| `/privacy`, `/support` | Narrow reading measure, clear headings, contact and data-storage facts, translated consistently and accessible from the shared footer. |
| `/_design-system?lang=ar|en|fr` | Development-only component gallery. It must remain gated by `import.meta.env.DEV` and is not a public product route. |

The system applies shared surface and action styling to public marketing pages, onboarding, curriculum, lab workbench, privacy/support, results, child and parent views. Keep screen-specific CSS when it expresses a real task distinction; do not force every surface into an identical card grid.

## 11. Illustration and asset rules

- Product mark and brand lockup: use the existing supplied asset through the shared brand component. Preserve proportions, clear space, and Arabic wordmark details. The production mark is a 256px lossless WebP (11,270 bytes), with a separate 64px PNG favicon. The original PNG and historical SVG concepts are preserved outside the public directory; see [asset inventory](brand/ASSETS.md).
- Mission diagrams: prefer authored, accessible SVGs or simple CSS diagrams tied to real lab state. Use stable coordinates, clear labels, sufficient line weight, and no misleading decorative values. Hide decorative SVGs from assistive technology; give informative diagrams a caption or accessible description.
- `src/assets/brkar-paper-workshop.png` is an original transparent concept asset for the local development gallery. It illustrates paper models without embedded text. The gallery labels it as a design specimen. It has not been tested as a real lesson prop and is not evidence of an experiment result. The asset and gallery are excluded from production output.
- Keep text out of generated images so each language can render sharp, translated UI copy. Use original, rights-cleared visuals; record origin and intended use. Optimize raster assets, preserve transparency where required, and provide meaningful alt text for informative images and empty alt text for decorative ones.
- Avoid generic stock-photo hero art, synthetic UI screenshots, fabricated product screens, and visual motifs that imply a feature or outcome the app does not support.

## 12. Accessibility and child-centered interaction

- Use semantic headings, landmarks, lists, labels, buttons, and links. Keep focus visible and keyboard operation complete.
- Minimum action target: 44×44px. Ensure focus is not hidden under the sticky header and maintain contrast for text, controls, borders, and focus rings.
- Do not convey selected, disabled, success, warning, or failure through color alone. Pair visual state with label, shape, icon, and/or accessible state.
- Do not impose a countdown or race, demand instant response, create public profiles or social comparison, or use notifications to bring children back.
- Give children permission to pause and revise. Present errors as evidence about a rule or model, never as a judgment about the child.
- Parent-facing evidence must stay descriptive and bounded to what was observed. Do not infer personality, attention span, intelligence, or future ability from one activity.

## 13. Implementation and change rules

- Canonical source: `src/design-system.css` for design tokens and final cross-route layer; `src/ui-kit.tsx` for reusable primitives; this file for specification and rationale.
- Existing route and locale copy remains in its current page/copy modules. Do not put translated strings into CSS or bake words into illustration assets.
- Add a token or variant only for a recurring, semantic need. Prefer existing token aliases and shared components over another one-off style.
- When changing the palette, typography, breakpoints, interaction states, or shared components, update this document and the gallery in the same change.
- Preserve data handling, route behavior, adult-supervision context, and the distinction between available and planned curriculum while styling.
- Gallery entry: `http://localhost:5173/_design-system?lang=ar` during the Vite dev session; use `?lang=en` or `?lang=fr` for locale review. Production builds exclude this route.

## 14. Verification record

This design pass applies shared styling to the current route layer and includes a development-only component gallery. The production build and browser review were completed on 18 October 2026: the Arabic landing, Arabic onboarding, French curriculum, Arabic parent dashboard, English support page, Arabic water lab, and Arabic design gallery were inspected at a compact browser width of about 805px. The Arabic child home and Mission Hub were reviewed at about 1250px. Core route labels and localized states were present in the accessibility trees. A dedicated 320–420px device-width visual capture remains outstanding. A successful local production build confirms compilation only; it does not establish deployment, authenticated-service security, or production readiness.
