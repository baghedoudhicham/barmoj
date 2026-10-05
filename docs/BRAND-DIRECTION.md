# BRKAR brand direction

## Name and pronunciation

- Latin wordmark: **BRKAR**
- Arabic wordmark: **بِركار**
- Spoken cue: **Birkar** (two syllables: bir-kār)
- Meaning: a geometry compass/divider used to draw circles and arcs

Use the Arabic name as the primary verbal identity in the Arabic-first interface. Pair it with **BRKAR**. Keep “pronounced bir-kār” in explanatory copy rather than adding a second spelling to the wordmark. The instrument is a drawing compass, not a magnetic navigation compass.

## Brand idea

A drawing compass gives a learner a center and room to explore. BRKAR helps each child observe, model, test and explain systems while building from their own interests and strengths. The product should feel thoughtful and capable, not like a social feed or a timed school test.

## The promise and voice

- Arabic: **مساحة لينمو التفكير.**
- English: **Room for growing minds.**
- French: **Un espace pour apprendre à penser.**

Lead with possibility and the child's own reasoning. Speak simply, warmly and precisely. Describe observable work: “you predicted, tested and explained.” Avoid labels about intelligence, comparison with other children, guaranteed cognitive or attention benefits, fear of social media, and claims of personalised AI that is not built.

The homepage invitation is “لكل طفل طريقته. ولكل فكرة مساحة.” It communicates respect for different ways of thinking; it is not a claim that an adaptive personalisation system currently exists.

## Family values

Design for Muslim MENA families without treating a child's faith as a score. Connect honesty to describing evidence, fairness to decisions, and ihsan to careful improvement. Let parents guide the conversation. Use original prompts; scripture quotations require separate source and translation review. Do not gamify worship or religious practice.

## Audience and values

The first audience is Muslim families across MENA, with learning content in Arabic, English and French. The brand name can remain welcoming and broadly usable; family values belong in reviewed curriculum, adult guidance and product decisions. Do not infer a child's faith, personality or ability from their activity.

## Visual continuity

Keep the existing palette: ink `#151515`, paper `#F7F7F2`, learn green `#39DD59`, explore yellow `#FFC107`, challenge red `#FF164D`, deep green `#173E2B`, and water blue `#72C7E8`. Use paper and ink for reading; green for the main invitation; yellow and red selectively where their meaning helps. Pale supporting surfaces derive from this palette rather than adding another brand colour family.

The custom mark has a joint, two compass legs, a brace, and an arc. Its green tile has a modest rounded corner. Use a minimum 24 px mark size; the normal app mark is 44 px. Leave at least one joint diameter of clear space. Do not rotate, stretch, decorate, or animate the mark. Mono and reversed source assets live in `public/brand/`.

Use self-hosted Noto Kufi Arabic for Arabic and the system sans-serif for Latin reading. Keep Arabic line-height generous; use logical CSS properties for direction. The shared header/footer carries the identity into every lab, Kid Home, Parent Dashboard and the curriculum. Custom vector lab sketches explain the four real systems; do not add generic icon packs to marketing pages.

## Language and product truth

The introduction is available in Arabic, English and French through `?lang=ar`, `?lang=en`, and `?lang=fr`. The curriculum link carries the selected language. Interactive labs, onboarding and the parent dashboard remain Arabic in this release; the introduction makes that explicit before a family starts. No account, payment, cloud sync, child-facing AI, infinite feed or public ranking is offered.

## Release materials

- `public/brand-mark.svg`: green app tile and favicon.
- `public/brand/mark-ink.svg`: transparent one-colour mark.
- `public/brand/mark-paper.svg`: transparent reversed mark for dark surfaces.
- `src/brand.tsx`: shared editable React mark, arrow and navigation wording.
- `src/brand-home.tsx`: reviewed three-language introduction and finite four-lab overview.
- `src/brand.css`: responsive identity and homepage system.

## Launch checks

The chosen brand is implemented in the prototype, but this document does not establish legal clearance or domain ownership. Before a wider launch, check BRKAR and بِرْكار spellings, pronunciation with families in the target languages, domain and social handles, and trademarks in intended markets. The current Firebase project, host, repository name and local-storage key prefix retain Barmoj as technical history.
