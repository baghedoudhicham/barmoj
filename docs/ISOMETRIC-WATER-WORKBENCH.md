# BRKAR — Opt-in isometric water workbench

**Status:** first playable preview; it is not a calibrated fluid or sensor simulation.

## Source and fallback

- GitHub main remains the source of truth. Firebase barmoj-266b8 is live/staging.
- Normal route: `/mission/water?lang=ar` keeps the original water diagram.
- Preview: `/mission/water?lang=ar&workbench=iso`. In-page switch returns to the classic view without losing the family-controlled draft.
- Arabic, English and French switch without dropping the preview flag.
- The isometric module and stylesheet are lazy-loaded; the original `LabDiagram` is the Suspense fallback.
- A permanently available static, textual system description supplements the SVG. No canvas/WebGL dependency.

## Pedagogical contract

The existing four-stage mission remains intact: understand a constraint → design and predict → test/compare/revise → explain/save evidence.

1. A child identifies the relevant information and constraint, rather than immediately running the simulation.
2. In the workbench, they select **one scenario** at a time (normal, 80% threshold, faulty sensor), change the 80% pump rule or add a backup sensor using accessible buttons. Each control updates exactly one field in `Settings`.
3. They commit to a pump outcome and give a written reason before the single Run action activates.
4. Run records an immutable model-backed snapshot; the diagram reflects the matching trial only. The view exposes actual water vs sensor readings and the pump's outcome, including failure.
5. They encounter unsafe behavior, add a safeguard, retest relevant scenarios and explain using trial evidence.
6. Completion is still gated by the deterministic `milestones` and `canComplete` functions, not a single successful run.

## Model truth

Use the existing `simulate("water", settings)`; the shared `waterReadings` helper supplies the same three fixed fixtures:

| Case | Actual | Sensor |
|---|---:|---:|
| normal | 45% | 45% |
| limit | 80% | 80% |
| failure | 96% | 60% |

The selected water level is a *scene snapshot*, not continuous rising water. Pump-flow movement is shown **only** when the matching saved trial reports `المضخة تعمل`. Changing the model invalidates the visible trial result until the new settings have been tested.

## Experience and accessibility

- Responsive schematic isometric platform with tank, threshold, sensor, backup module and pump/pipes.
- Functional colors derive from BRKAR's established green, yellow, red, deep green and paper palette.
- Scene has an accessible SVG name. All controls are native, touch-sized buttons with `aria-pressed`, disabled states, and visible keyboard focus.
- Phone: scene before task and controls, stacked layout. Desktop: larger scene beside the current question.
- Respect `prefers-reduced-motion`: disable pump-flow and water-snapshot transitions.
- No added account, backend, AI, child profile, telemetry, cloud data or personal information.

## Sources and evidence boundary

Buthoor Tech's single-scene, labeled-parts, one-Run interaction was reviewed as a reference **only**; don't copy its art and don't auto-complete on first Run.

Google Applied Digital Skills informs short guided steps culminating in a practical learner-created outcome; it is not a job-training or Google Workspace requirement for BRKAR:
https://grow.google/applied-digital-skills/

UNICEF AI and Children guidance informs privacy, child agency and adult supervision, not a claim of BRKAR learning effectiveness:
https://www.unicef.org/innocenti/media/11991/file/UNICEF-Innocenti-Guidance-on-AI-and-Children-3-2025.pdf

Learning design will be checked in supervised family/educator sessions before claiming educational effectiveness. No religious quotation is introduced.

## QA and release gate

1. `npm ci`, `npm test`, `npm run test:rules`, `npm run build`.
2. Verify Arabic RTL and English/French, flag preservation, narrow phone and desktop rendering, keyboard/touch, reduced-motion, static fallback and saved-trial reload.
3. Verify normal / exact limit / fault / backup cases, including trial/prediction/explanation requirements.
4. Keep four unrelated user-edited launch documents untouched.
5. Merge to main, then deploy through the established GitHub Actions workflow **only after** checks pass. Confirm deployment result and live URL before claiming the slice is live.

This feature branch intentionally does not alter Firebase configuration or the privacy boundary.
