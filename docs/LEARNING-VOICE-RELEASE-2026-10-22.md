# Child voice and useful knowledge — 22 October 2026

## Product intent

Each of the four labs now gives the child an optional place to name a question before experimenting, and an optional place to connect the discovery to helping themselves or someone else after explaining the result. This extends the finite observe → predict → test → revise → explain journey with child-owned inquiry and useful application. The child may skip either field without losing access or completion eligibility. There are no personality labels, attention scores, rewards for religious behavior, or automatic judgments of the quality of a question.

The useful-knowledge framing is consistent with the supplication seeking refuge from knowledge that does not benefit, documented in [Sahih Muslim 2722](https://sunnah.com/muslim:2722). The UI uses original reflection copy rather than presenting a translation as a prophetic quotation. Exact religious quotations and any expanded values curriculum still need qualified editorial review. Learning benefit is a design objective to evaluate with families, not an efficacy result established by this release.

## Implementation and privacy

- `src/learning-voice.tsx`: shared, localized journal and evidence components; an original code-native SVG joins a starting point to a discovery diamond. Decorative artwork contains no baked-in text.
- `src/learning-voice.css`: existing semantic tokens, logical spacing, responsive layout and static artwork. No dependency or animation library was added.
- Optional `question`, `application` and their language tags are added to drafts and evidence. Existing records remain readable. Text is bounded to 500 characters, rendered through React text nodes, saved in the current browser and deleted by the existing family-data control.
- Questions and application answers survive draft reloads and appear in results and expanded parent evidence only when supplied. Changing the UI language does not translate or rewrite the child's words.
- Kid Home repeats the child's saved question when resuming. Its four localized steps reflect the persisted observation, current settings, recorded trials and explanation requirement; changing active settings returns the indicator to testing. It reports task progress only.
- Once a lab has evidence, Kid Home offers one optional paper-only follow-up in the selected language. The family can discuss the child's saved useful-knowledge idea and connect the lab to everyday reasoning. The extension stores no new response and includes a no-real-equipment/no-real-roads safety note.
- No child account, remote answer collection, AI processing, analytics, uploads, email capture or payment was introduced.

## Security and rate-limit boundary

The current product has no application submission API. Its learning writes are browser-local; a client timer or the 100-trial history bound would not be server-side abuse protection. No server-side rate limiter is claimed or deployed in this release.

The Hosting CSP now permits scripts, connections and form targets only from the same origin, blocks frames and objects, and upgrades insecure requests. Unused reCAPTCHA/App Check allowances were removed from this frontend; Firebase project/API configuration was not changed. HSTS requests HTTPS for subsequent visits. Inline styles remain allowed because existing diagrams use dynamic style values. Source Firestore and Storage rules remain deny-all; this Hosting-only workflow does not change deployed database rules. The npm production-dependency audit returned zero known vulnerabilities during this pass. This is a focused hardening check, not a penetration test or a compliance certification.

Before any remote signup, account sync or AI endpoint goes live, implement and test these requirements at its actual server boundary:

1. Authentication/ownership checks where applicable, request schema and byte bounds, and App Check validation as an additional abuse signal. [Firebase describes App Check and Authentication as complementary](https://firebase.google.com/docs/app-check).
2. A shared atomic rate limiter across instances, with separate limits for unauthenticated signup and authenticated adult writes. Define initial limits against expected pilot traffic; test concurrent requests, bypass attempts, NAT/shared-household behavior and exhaustion. Return 429 with a meaningful retry interval. Do not use frontend debouncing as the enforcement boundary.
3. Request idempotency, bounded work/timeouts and fail-closed behavior when authorization or the limiter cannot be evaluated. Logs must exclude child answers, raw email addresses and tokens.
4. Cost monitoring, bounded instance/concurrency settings and an incident procedure. A billing budget alert is not a hard spending cap. Do not provision a paid edge service merely to claim rate limiting; [Cloud Armor's rate-based rules apply to associated backends](https://docs.cloud.google.com/armor/docs/rate-limiting-overview), not automatically to this existing Firebase Hosting deployment.
5. Explicit adult notices, retention/deletion/export behavior and cross-family denial tests before transmitting existing local records. Revisit the restrictive CSP only for the specific, approved endpoints required by that release.

## Verification

All 37 local tests pass. The 12 family-journey cases verify that Kid Home resumes the saved lab at the current task step, retains the child's question and presents the lab-specific paper activity in all three interface languages. Separate state checks cover an empty task, a new observation, an incomplete test, a changed active rule, a ready explanation and a too-short explanation. Storage-boundary cases reject oversized text, wrong types and unsupported language tags. A Hosting-policy regression check protects the current no-external-submission boundary.

Local browser checks used synthetic content on a separate localhost origin. At 390px, Arabic Kid Home showed the saved question, active task step and two-column progress without horizontal overflow; the paper activity fit the viewport and retained its safety note. At 1280px, the Kid Home fit without horizontal overflow. The Arabic journal fields retain their values after reload and keep Arabic text/language when the interface switches to French. An English economy walkthrough completed a prediction, observed resource growth, changed the reward, retested, explained the difference, and saved both optional answers. The result and expanded Parent Dashboard contained the original answers and both trials. Browser viewport overrides were reset. This is not an exhaustive assistive-technology or real-device review.

Screenshots: `docs/qa/2026-10-22/journal-mobile-ar.png`, `learning-result-en.png`, `home-continuity-ar-desktop.png`, `home-kid-ar-mobile.png` and `home-follow-up-ar-mobile.png`. They contain synthetic preview content. Educator review, family sessions, reading-load checks and supported physical-device verification remain necessary before broader recruitment.
