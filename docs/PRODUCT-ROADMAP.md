# Barmoj product roadmap — validate learning before adding surface

**Decision status:** recommended sequence, October 2026
**Product hypothesis:** Barmoj helps children notice, model, test and explain systems, then transfer that way of thinking to problems they care about. It supports varied ways of learning without ranking children.

## What to build first

The current app is an Arabic-first local-storage prototype with four interactive labs. Use those as a small, guided pilot; do not make the first release a large content platform or a social feed.

### Stage 0 — small, observed usability round

- Invite 6–8 parent-child pairs across the age range, with clear parent consent and an easy way to stop.
- Use the four existing labs and watch whether children can start, make a prediction, run a test and explain what they saw.
- Ask what they would change and what support they chose; do not frame a long session as a success.
- Do not collect recordings or child names for product analysis. Keep notes de-identified.
- Fix confusing language, controls, reading load and broken assumptions before a broader trial.

The prototype saves drafts and evidence in one browser only. This is suitable for a moderated demonstration on one device, not for remote family accounts or cross-device research.

### Stage 1 — four-lab learning pilot

After the observed round, prepare the remote pilot’s parent-owned account and secure data storage, with explicit consent, age-appropriate privacy review, deletion controls and a clear retention window. Keep child profiles to a nickname, age band, language and chosen learning preferences. Do not collect voice, photos, precise location, contacts or behavioral advertising identifiers.

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
2. Add English through a real locale layer: shared navigation, onboarding, child labs, parent evidence, accessibility text and formatting all switch together.
3. French is feasible for the curriculum content at low additional content cost once the source is stable. A French-ready product interface still needs translation review, a language switch, LTR layout checks, text expansion, number/date handling and a full screen QA pass; it is not just a quick extra field.
4. Test whether Moroccan families want Darija explanations or audio alongside MSA. Treat that as a separate, opt-in voice layer rather than mixing dialect inconsistently into written lesson text.

Do not infer a preferred language from a child’s name or location. Let the parent set the default and let the child ask to switch.

## Testing and pricing sequence

Keep the first pilot free and do not add billing until families have completed the core learning loop and some return by choice. Once value is clearer:

- test a parent-paid household subscription for the full curriculum and useful family resources;
- compare it with school, club and nonprofit cohort licences for facilitated groups;
- consider a free starter track or sponsored access so price does not determine whether a child can begin;
- test willingness-to-pay with parents in the launch market before publishing a number;
- keep payments and account management in the parent area, with clear cancellation and no child-facing purchase prompts.

Avoid ads, sale of child data, pay-to-win rewards, artificial urgency and locking a child’s completed work behind a payment screen. Do not set a price until the market, support cost, payment rails and actual repeat value are understood.

## Name decision

**Recommendation: treat Barmoj as a working name and explore alternatives before a public launch.** The product has moved beyond teaching code, while “Barmoj” sounds and looks close to “Barmej,” an established Arabic programming-education brand. That creates a plausible confusion and search-discovery problem in the same broad category. This is a brand-risk signal, not a legal conclusion; check names and marks in target markets with qualified help before committing.

The next name should be:

- broad enough for thinking, learning and making, not only programming;
- easy to say and spell in Arabic, English and French;
- distinctive in search and visually ownable;
- culturally natural in Morocco and understandable across the intended region.

Keep the current repo, domain and palette while testing the product. Do naming interviews and basic domain/trademark clearance before renaming assets. [Barmej’s own site](https://www.barmej.com/) describes an Arabic learning platform and its programming-education origins.
