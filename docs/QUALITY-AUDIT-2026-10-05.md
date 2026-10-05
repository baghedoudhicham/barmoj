# BRKAR quality audit — 5 October 2026

The quality pass is suitable for a supervised family pilot. It is not a release of cloud accounts, private parent authentication, automated assessment or a paid service. The four labs preserve Arabic-first RTL and the existing paper/ink/green/yellow/red palette. The curriculum frame and twelve activity descriptions now support Arabic, English and French; interactive labs and parent screens remain Arabic.

## Journey health

| Step | Experience | Health | Evidence and change |
| --- | --- | --- | --- |
| 1 | Understand the product and start with an adult | Good for a pilot | Clear actual availability, optional nickname, local-storage notice, no payment. Guardian reminder is not identity verification. |
| 2 | Choose and resume a lab | Good | Kid Home resumes browser-local drafts. Catalogue now uses the actual shared lab diagrams with pale surfaces and readable dark copy. |
| 3 | Predict, test, improve and explain | Good | All four labs completed using invented answers. Changed settings restore matching saved outcomes. Running an experiment focuses its result for keyboard users. Explanation and model-specific evidence gates remain required. |
| 4 | Review evidence with a parent | Good within the shared-device pilot | Dashboard displays exact saved reasoning and trial history from all four labs. It describes recorded actions, not intelligence or mastery. It has no authentication; anyone using the same browser profile can view it. |

## Screenshot-led findings and fixes

Baseline screenshots were captured from the current live product before editing. Screenshots below were then captured and visually inspected in the HTTPS release preview. Test data uses the invented nickname “باحث تجريبي”; it is not a real child record.

- [Homepage baseline](qa/2026-10-05/before-home-desktop.jpg) and [final desktop](qa/2026-10-05/after-home-desktop.jpg): original BRKAR identity and authored SVG preserved. No stock imagery or generated raster graphics added.
- [Onboarding baseline](qa/2026-10-05/before-onboarding-desktop.jpg): low-data adult-supervised entry preserved while its code is loaded only when needed.
- [Kid baseline](qa/2026-10-05/before-kid-mobile.jpg) and [final mobile](qa/2026-10-05/after-kid-mobile.jpg): balanced heading sizes, thinner outlines, calmer surfaces and clear next action.
- [Parent baseline](qa/2026-10-05/before-parent-mobile.jpg), [final desktop](qa/2026-10-05/after-parent-desktop.jpg), [tablet](qa/2026-10-05/after-parent-tablet.jpg), [expanded mobile evidence](qa/2026-10-05/after-parent-evidence-mobile.jpg): evidence remains inspectable; oversized headings and heavy surfaces refined.
- [Catalogue desktop](qa/2026-10-05/after-catalogue-desktop.jpg) and [diagram details](qa/2026-10-05/after-catalogue-diagrams-desktop.jpg): shared water, routing, traffic and economy diagrams replace approximate decorative models. Traffic directions are labelled. Small white copy on bright red was replaced with dark copy on pale/white surfaces.
- [French curriculum mobile](qa/2026-10-05/after-curriculum-french-mobile.jpg): page framing, navigation, guide and lessons follow the chosen language and direction. The Arabic-only interactive availability is explicit.
- [English homepage mobile](qa/2026-10-05/after-home-english-mobile.jpg) and [French homepage mobile](qa/2026-10-05/after-home-french-mobile.jpg): heading wrapping, reading rhythm and full-width calls to action were visually checked at 390px.

## Verification

The final local build passes TypeScript and Vite compilation. All 15 automated tests pass, including failed sensors, boundary regression, route closure, traffic conflict interlock, resource balance, evidence requirements, reload persistence, storage failure signals, nickname migration and malformed/bounded browser records. The dependency audit reports zero known vulnerabilities on the installed dependency tree; this does not establish absence of all security defects.

Browser walkthroughs completed:

- Water: seven trials covering normal operation, the exact 80% boundary, a false sensor reading, protection and regression tests. Restoring a tested configuration displays its earlier result. Keyboard focus moved to the new result. Saved explanation was visible in the parent view.
- Routing: three trials covering normal route, blocked road and a revised valid route with the priority stop first.
- Traffic: three trials covering conflicting green requests, the red interlock and ordinary one-direction flow.
- Economy: two trials comparing accumulating resources against a balanced rule; reload preserved draft reasoning and history.
- Parent: all four records and their actual trial counts are visible, with exact saved answers accessible in the disclosures.
- Mobile menu: Escape closes the panel and returns focus to its trigger. The homepage method anchor receives focus and sits below the sticky header (section top about 90px; header bottom about 70px).
- At 320px, home, onboarding, kid, catalogue, parent, all four labs, privacy and all three curriculum languages had equal document/client widths: no horizontal overflow. See [measured route checks](qa/2026-10-05/narrow-layout-checks.json). Mobile 390px, tablet 820px and desktop 1280px screenshots were also inspected.
- No warning/error entries were returned by the preview console during the final journey check.

## Performance, motion and hardening

The initial JavaScript entry fell from approximately 357.5 kB / 113 kB gzip to 296.7 kB / 95.1 kB gzip (about 16% less compressed JavaScript). Secondary routes load separately. A loading status and retry screen handle pending/failed route loads. No Lighthouse score or field Core Web Vitals result was measured.

Page entry uses a short opacity transition; panels/results use a small 3px movement. Animations are finite, with no flashing, countdown or autoplay rewards. The final reduced-motion CSS disables animation, transitions and smooth scrolling. Its source was reviewed; OS-level reduced-motion and screen-reader behavior still need real-device validation.

Browser records are bounded before rendering: strings, dates, settings, trial counts and chart values are validated; oversized/corrupt records are ignored. Histories retain the last 100 trials per lab. React renders free text without unsafe HTML. This is robustness, not encryption or a private parent account.

Hosting retains a same-origin CSP, denied framing, no-referrer, MIME protection and disabled camera/microphone/geolocation/payment permissions. HTML routes request revalidation while fingerprinted assets/fonts are immutable. Firestore and Storage source rules deny client access. Local rules-emulator execution is unavailable with this computer's Java 11; the repository CI uses Java 21 to run the rule tests before Hosting deployment. Release evidence is recorded separately after that workflow finishes.

## Remaining launch work

Before recruiting a public cohort, add operator identity, a real adult support contact and responsibility for concerns. Verify domain/brand ownership before claiming brkar.com. Run educator and Muslim-family content review, test reading support and devices with real families, and establish an adult-only consent/contact/deletion process for recruitment. Do not present this pilot as a cognitive treatment or a proven attention intervention.

Cloud guardian authentication, enforced authorization, private synchronization and billing are separate future releases. Eight curriculum activities are family plans awaiting interactive implementation. No current Figma source was available for direct visual comparison. Cross-browser/device, screen-reader and reduced-motion checks remain part of the pilot release checklist.

The [GTM launch plan](GTM-LAUNCH-PLAN.md) follows the founder's chosen Arabic-speaking MENA audience, with multilingual household support, a six-week pilot, channel experiments, later pricing research and sourced institutional candidates. It initiates no outreach or ad spend.

## Verified production release

Implementation commit: [8ad3548](https://github.com/baghedoudhicham/barmoj/commit/8ad35485560406d9dec40a9b3c78b027df28329f). Live: [BRKAR on Firebase](https://barmoj-266b8.web.app/).

The [GitHub workflow](https://github.com/baghedoudhicham/barmoj/actions/runs/37375065274) completed successfully: application tests, Firestore deny-access emulator test, production build and Hosting deployment all passed. See [recorded step results](qa/2026-10-05/release-workflow-checks.json). A direct Hosting deployment also succeeded while the GitHub publishing runner was queued; both publish the same implementation. No additional manual Firebase deployment step is needed for this release. No database rules, authentication settings or billing settings were changed in this pass.

Final [live HTTP checks](qa/2026-10-05/live-release-checks.json) verify home, kid, parent and French-curriculum routes return HTTP 200, the same HTML build, no-cache and the restrictive CSP. SHA-256 checks confirm the entry JavaScript, CSS and Arabic font bytes exactly match the tested files; all use immutable asset caching. This is a focused deployment check, not a penetration test or exhaustive cross-browser test.

The live Arabic homepage and newly translated French curriculum were also rendered and inspected in the browser: [live homepage](qa/2026-10-05/live-home.jpg), [live French curriculum](qa/2026-10-05/live-curriculum-french.jpg). The public tab was left on the Arabic homepage; browser viewport overrides were reset. Production family data was not modified by the test walkthrough.
