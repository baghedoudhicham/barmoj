# BRKAR product roadmap — validate learning before adding surface

**Decision status:** recommended sequence, October 2026
**Product hypothesis:** BRKAR helps children notice, model, test and explain systems, then transfer that way of thinking to problems they care about. It supports varied ways of learning without ranking children.

For the next bounded tasks, use [Execution handoff](EXECUTION-HANDOFF.md) and the prepared [pilot kit](launch/PILOT-KIT.md). The first MENA cohort is moderated usability testing; the remote account-based phase below remains gated on its own data/access design.

## What to build first

The current app is an Arabic-first, local-storage pilot with four interactive labs in Arabic, English and French. Kid Home, onboarding, privacy and Parent Dashboard remain Arabic. Use the existing optional local nickname and learning flow for supervised trials; add no new profile fields, avatar uploads or community features until family feedback shows a clear need and their privacy and safety design is ready.

### Stage 0 — small, observed usability round

- Invite 6–8 parent-child pairs across the age range, with clear parent consent and an easy way to stop.
- Use the four existing labs and watch whether children can start, make a prediction, run a test and explain what they saw.
- Ask what they would change and what support they chose; do not frame a long session as a success.
- Do not collect recordings or child names for product analysis. Keep notes de-identified.
- Fix confusing language, controls, reading load and broken assumptions before a broader trial.

The prototype saves drafts and evidence in one browser only, without app-level encryption. This is suitable only for a moderated demonstration on a family device with an adult present, not for remote family accounts or cross-device research. Never enter credentials or secrets into child fields, local storage, public documentation, screenshots or demo data. Keep the Firebase deploy identity in the existing restricted GitHub Actions secret; do not print, download, or commit it. Use least privilege and rotate it if exposed.

### Stage 1 — four-lab learning pilot

After the observed rounds and family feedback, first decide whether remote accounts are needed at all. If there is a demonstrated need, design a parent-owned sign-in and secure data service with explicit guardian consent, least-privilege access, encryption in transit and at rest, deletion/export controls and a clear retention window before collecting anything. Keep any future child profile to the minimum fields needed for an agreed feature; do not collect voice, photos, precise location, contacts or behavioral advertising identifiers. Do not add avatar uploads by default.

Do not launch a community feed or social layer as a visual extra. Reconsider one only if families and educators identify a concrete learning need and BRKAR can support guardian controls, moderation, abuse response, data minimization and deletion from the start.

Once those controls are ready, test with roughly 20–30 families over four weeks, one core lab each week and an optional off-screen activity. Keep the core session short and let families choose when to do it. Treat the four labs as a first test of the learning loop, not as evidence for all 12 curriculum missions. Until then, keep testing moderated on one device because the current prototype saves evidence in one browser only.

**Pilot questions**

1. Can children understand and operate each lab without an adult solving it for them?
2. Do their predictions become more specific when they get useful feedback?
3. Can they use evidence to revise a rule and explain the result?
4. Can they transfer an idea to a new problem after a delay?
5. Can parents understand the saved examples without a score or education jargon?
6. Do families choose to return, and what cadence feels comfortable to them?

Record completion and return as usability signals, not learning outcomes. The old idea of requiring three missions in seven days should not be a gate: it rewards frequency and would work against a calm, self-paced product.

### Stage 2 — complete the first curriculum and add a Resources shelf

Build the remaining eight missions from [Curriculum 1.0](CURRICULUM-1.0.md) after the pilot reveals where children need more examples, scaffolding or context. Add a parent/educator Resources shelf with a small set of reviewed items:

- printable, screen-free challenge cards paired with a mission;
- a one-page guide explaining what evidence to notice and what questions to ask;
- short accessibility and language options for adapting the activity;
- source links and an editorial review date.

Start with a dozen excellent, reviewed items rather than an unmoderated upload library. Prefer resources that let families continue thinking away from the device.

### Stage 3 — finite “Curiosity Stories”

If children want more visual entry points, test a finite story format that borrows the clarity of a vertical card, not the engagement mechanics of a social feed. A story is complete after a few purposeful scenes:

1. A short, quiet setup shows a real system and one question.
2. The story pauses for the child to predict or choose what to inspect.
3. A simulation responds to the child’s choice and makes the result visible.
4. The child explains the evidence and can open a longer Mission Lab or try a screen-free version.

Every story has a visible ending, a pause/exit control, no autoplay and no infinite swipe. Do not use engagement ranking, child-to-child likes, streak pressure, public comments, follower counts or personalized feeds. Measure whether the story helps the child ask a better question or transfer the idea, not watch another story.

### Stage 4 — bounded AI support

Only after the curriculum and adult safeguards work without AI, test specific, parent-visible roles: offer a hint, ask for a missing constraint, propose a counterexample, or help a child compare their prediction with what happened. The child remains the author of the decision. No open-ended companion, emotional profiling, automatic diagnosis, unreviewed lesson generation or unbounded child chat in the initial product.

Keep AI support optional, explain when it is being used, and evaluate whether it increases independent reasoning or merely supplies answers. Build content with human review and use only the minimum data needed for the chosen support.

## Language sequence

1. Keep Modern Standard Arabic as the default written experience and preserve full RTL behavior.
2. The landing page, curriculum, four interactive labs, lab catalogue and child result page now support Arabic, English and French. Kid Home, onboarding, privacy and Parent Dashboard remain Arabic; translate these surfaces when research shows the need and after review by fluent speakers.
3. Verify saved-answer language, accessible names, number/date handling and full-screen RTL/LTR behavior on supported devices before claiming the entire journey is localized.
4. Test whether Moroccan families want Darija explanations or audio alongside MSA. Treat that as a separate, opt-in voice layer rather than mixing dialect inconsistently into written lesson text.

Do not infer a preferred language from a child’s name or location. Let the parent set the default and let the child ask to switch.

## Muslim family values and religious references

Treat faith as part of the family context, not a child score or engagement mechanic. The curriculum can invite families to connect learning habits with values such as **sidq** (truthfulness with evidence), **amanah** (care with entrusted information), **sabr** (patience through iteration), **shura** (listening and consultation) and **ihsan** (careful work that considers its effects). Keep these reflections optional, practical and open to family interpretation; never infer a child's belief, character or piety from activity data.

The current family reflection uses these value words in Arabic, English and French and contains no scripture quotations. Before adding Qur'an or hadith text, require a Muslim educator or qualified reviewer to verify the exact Arabic source and context. For hadith, verify the source and grading; for translations, name the translator or use a reviewed translation. Keep references optional and respectful: never attach sacred text to points, streaks, badges, speed rewards or completion animations. Invite families to propose corrections to language and framing before public release.

## Testing and pricing sequence

Keep the first pilot free and do not add billing until families have completed the core learning loop and some return by choice. Once value is clearer:

- test a parent-paid household subscription for the full curriculum and useful family resources;
- compare it with school, club and nonprofit cohort licences for facilitated groups;
- consider a free starter track or sponsored access so price does not determine whether a child can begin;
- test willingness-to-pay with parents in the launch market before publishing a number;
- keep payments and account management in the parent area, with clear cancellation and no child-facing purchase prompts.

Avoid ads, sale of child data, pay-to-win rewards, artificial urgency and locking a child’s completed work behind a payment screen. Do not set a price until the market, support cost, payment rails and actual repeat value are understood.

## Brand decision

The selected product brand is **BRKAR | بِرْكار**, spoken **Birkar**. بِرْكار is a geometry compass/divider used to draw circles and arcs; the product uses it as a metaphor for giving each child tools to explore from their own starting point and at their own pace. Keep this meaning as a brand story, not a claim that every family already knows the technical word.

The interface remains Arabic-first and RTL, with Arabic, English and French curriculum content. BRKAR should feel calm, curious and capable without relying on religious labeling, child rankings or social-feed mechanics. Family values live in reviewed learning experiences and adult guidance.

Before a wider launch, complete market-specific checks for the BRKAR and بِرْكار spellings, domain, social handles and trademarks. The current Firebase host/project, GitHub repository name and local-storage keys retain Barmoj as infrastructure/history; the public product identity is BRKAR. This brand decision is not legal clearance.
