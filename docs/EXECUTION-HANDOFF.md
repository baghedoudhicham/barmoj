# BRKAR execution handoff

Updated 5 October 2026. Start here when continuing with a lower-token model. Execute one bounded task at a time; do not reopen settled brand or audience decisions.

## Release and decisions

- Repository: `baghedoudhicham/barmoj`, `main`. Live: https://barmoj-266b8.web.app/.
- Product release: `8ad3548`; verified release evidence: `9dc79b0`. Check the current Git state before editing; these are reference commits, not instructions to reset the checkout.
- Brand: BRKAR / بِركار. Preserve existing palette, original SVGs, calm finite motion and Arabic-first RTL. English/French use LTR. Do not rename Firebase projects or browser-storage keys.
- Audience: Arabic-speaking Muslim MENA families, with multilingual household support. First usability focus: ages 9–12 with adult support, within the broader 7–14 audience.
- Offer: free, moderated, same-device sessions using four Arabic interactive labs. The twelve-activity curriculum and landing page are trilingual. Eight activities are family plans; they are not implemented interactive labs.
- No child accounts, cloud synchronization, AI, analytics, ads or billing in the current app. Parent evidence is accessible to anyone using the same browser profile. Do not silently upload local answers.
- Site is deployed. Application tests, Firestore deny-access tests and build passed. See [quality evidence](QUALITY-AUDIT-2026-10-05.md).
- An existing uncommitted change to `docs/FIREBASE-ARCHITECTURE.md` was deliberately excluded from the last releases. Inspect and preserve it; do not stage it as part of unrelated work.

## Scope and document order

Use this handoff for execution order, [GTM plan](GTM-LAUNCH-PLAN.md) for launch hypotheses, [pilot boundary](PILOT-RELEASE-CHECKLIST.md) for actual availability, and [launch kit](launch/PILOT-KIT.md) for prepared materials. The curriculum and product roadmap guide later learning work. The backend architecture is a proposal with unresolved decisions, not authorization to choose immutable infrastructure locations.

The first ten families are a moderated usability cohort. Start by observing six sessions; review barriers before scheduling the remaining four. Each session uses one family device/browser and an adult. This reconciles the roadmap's small observed round with the GTM's ten-family first cohort. It does not start the later authenticated remote-family pilot or collect children's records centrally. A voluntary return can be discussed with the adult without cloud tracking.

## Current execution status

| ID | Task | Status | Deliverable / acceptance |
| --- | --- | --- | --- |
| L00 | Prepare launch operations | Done | Parent invitation in three languages, moderator guide, four model-accurate demo scripts and a blank de-identified tracker in `docs/launch/`. No outreach or spending. |
| L01 | Publish operator and adult support information | Needs founder facts | `/support` page, footer link and privacy notice with the supplied operator name, verified adult support contact, pilot limits and local deletion instructions. Arabic first; English/French support copy. No invented contact, registration form or backend. |
| L02 | Produce four demonstrations | Ready for production | Four captioned 9:16 exports from invented preview data using the script sequence below. The videos must show actual tested outputs, calm pacing, readable captions, a clear ending and an adult invitation. Scripts alone are not exported videos. |
| L03 | Prepare the adult invitation package | Draft ready; needs L01 | Replace draft fields, include current URL and support contact, offer a supervised slot, explain local storage and stopping. Send only to destinations explicitly chosen by the founder. No automatic mass outreach. |
| L04 | Complete educator/family and device review | Needs reviewers | Use the moderator checklist and record actionable barriers. Test a screen reader, reduced motion, actual Android/iPhone browsers and reading support. No clinical or efficacy conclusion. |
| L05 | Recruit and observe first cohort | Needs L01/L04 and reachable communities | Ten adult-supervised pairs across at least two reachable MENA markets. Review after six; use private de-identified notes outside this repository. |
| L06 | Fix observed barriers | After L05 | Small changes tied to concrete session evidence, with appropriate QA and a preview before release. |
| L07 | Test organic parent content | After initial barriers addressed | Instagram/Facebook demonstrations and a small TikTok creative test using the GTM plan. Compare completed sessions and moderator time. Do not add child pixels. |
| L08 | Decide whether to expand | After second-cohort review | Report exact counts and denominators. Assess optional return, parent understanding and support effort; then decide next curriculum, account or workshop investment. |

## L01 implementation brief

Inputs still needed: operator/public trading name, adult support email or approved support destination, person responsible for concerns, and first reachable MENA communities. A question for these was sent to the founder; do independent preparation while waiting. Do not infer answers from Git commit email addresses, local computer paths or Firebase ownership.

Reuse `Shell` and current brand typography, spacing and buttons. Make the support page reachable from home, parent view and footer. A plain adult email link is sufficient if the supplied email is confirmed; do not transmit a form by default. Explain how to open Parent Dashboard's local-data deletion control, shared-browser visibility, lack of accounts/backups, Arabic lab availability, and how to report a problem without including child identifiers or answer text. Do not promise a response time until one is supplied.

Acceptance: actual supplied identity/contact; all three support-copy variants; correct RTL/LTR; no horizontal overflow at 320/390px; keyboard-accessible links; readable desktop; no new network collection, credentials or Firebase Rules changes. Run build and inspect screenshots. Pure copy/links do not require tests that mirror the implementation. A changed account or data boundary requires its own tests and review.

## How to execute economically

1. Read this file, the relevant task subsection and only the affected source files. Check status and preserve unrelated edits.
2. Implement one task with the existing components. Avoid dependency, framework and design-system replacement.
3. Use deterministic source tests for learning/data behavior; inspect actual browser screenshots for layout and interactions. Do not declare a flow complete because it compiles.
4. For code releases: app tests and build, preview QA, then CI's Java 21 rule check and Hosting deployment. Local Java 11 cannot run the current Firebase emulator. Do not bypass the CI rules check.
5. Commit only the task's files. Documentation-only commits may use `[skip ci]`; never use it to bypass checks for application or infrastructure changes. Record actual verification and limitations.
6. Update this task's status and give the founder the result. Escalate genuinely unresolved product/security decisions; do not redesign settled work.

## Decisions reserved for later phases

These phases are planned, but their full implementation specifications are not frozen:

| Phase | Decisions before implementation | Minimum acceptance evidence |
| --- | --- | --- |
| Parent accounts / synchronization | Sign-in method, registered Firebase app, separate environments, approved data region, guardian notice, cloud text policy, retention, deletion and recovery | Owner-only authorization, cross-family denial, signed-out denial, malformed-write denial, session clearing, explicit local migration, export and recursive deletion; no public cloud pilot before these work |
| Remaining eight interactive labs | Usability findings, scaffolding and reviewed rubric for each mission | A specific simulation/state model, predictions, failure/counterexample, corrected retest, explanation and transfer; reviewed AR/EN/FR content and accessible controls |
| Full interactive localization | Shared locale state, reviewed translations, date/number formats and language persistence | Entire onboarding/lab/evidence journey in each language, including accessible text, saved records and RTL/LTR QA |
| Resources shelf | Reviewed first items and educator ownership | Finite printable/off-screen activities with source, review date, accessible reading and language variants |
| Payments | Repeated family value, parent price interviews, provider/market support, support costs and renewal/refund terms | Hosted adult checkout, verified idempotent webhooks, cancellation/refunds and correct entitlements; no child purchase pressure |
| AI / stories | Proven need, adult controls, reviewed content and bounded data use | Optional finite experience, independent child reasoning, evaluated safeguards; no infinite feed or unrestricted child companion |

A lower-token model can execute bounded implementation and content tasks now. Use a focused design/security review when the account/data boundary changes, rather than treating the entire long-term roadmap as already specified.

## Resume prompt

Read `docs/EXECUTION-HANDOFF.md`. Execute the next ready launch task using the settled BRKAR brand, Arabic-first MENA audience and current pilot boundary. Preserve unrelated work. Do not repeat planning. If L01's operator/support facts have arrived, implement L01 and deliver a tested preview and commit; otherwise prepare L02 from `docs/launch/PILOT-KIT.md` and identify the exact production output still needed. Do not claim drafted scripts are finished videos, send outreach without named destinations, or add cloud accounts, payments or AI as part of this launch task.
