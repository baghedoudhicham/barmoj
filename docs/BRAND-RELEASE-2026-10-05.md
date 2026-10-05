# BRKAR brand release — 5 October 2026

## Result

The product identity is بِركار / BRKAR, with a custom drawing-compass mark and the promise “مساحة لينمو التفكير.” The homepage presents thinking through questions, predictions, experiments and explanations, with original vector sketches of the four working labs. Muslim family values appear as practical discussion prompts about honesty, fairness and care.

The introduction is available in Arabic, English and French. Its language is reflected in the URL and document direction. Curriculum links carry the language selection; the twelve curriculum entries already have content in all three languages. The app makes clear that its four interactive labs, onboarding and parent dashboard currently use Arabic.

## Verification

- Production type check and Vite build passed.
- All 13 existing learning-model and local-storage/privacy tests passed.
- Desktop Arabic homepage was inspected at the default browser width (approximately 1265 px).
- Arabic, English and French homepage layouts were inspected at 390 px. The language controls are 44 px high; the page has no horizontal overflow.
- Arabic mobile navigation opens and closes, with correct expanded state. Escape closes it and returns keyboard focus to the menu button.
- Arabic homepage was also visually inspected at 820 px; the two-column composition and illustration remain legible. The onboarding page has a primary heading with a suitable reading size.
- French `?lang=fr` curriculum route selects French and renders all twelve missions within the Arabic interface.
- At 820 px, Parent Dashboard was visually inspected. Kid Home, onboarding and all four lab routes render with the shared BRKAR identity, RTL direction, and no horizontal overflow.
- The mobile lab overview was inspected after scrolling; at narrow widths, illustrations sit beside readable mission descriptions rather than stacking large posters.
- No dependency or Firebase security-policy changes were needed for this branding release.

## Release boundary

This release is a supervised family pilot with browser-local progress and answers. It does not add cloud accounts, automatic cognitive assessment, payments, personalised AI or public child profiles. The remaining eight interactive labs are not complete; the website describes their current curriculum/activity status.

The existing Firebase Hosting target remains `barmoj-266b8`. No domain ownership or trademark clearance is implied by publishing the chosen name. The existing infrastructure working notes were preserved separately from the branding commit.
