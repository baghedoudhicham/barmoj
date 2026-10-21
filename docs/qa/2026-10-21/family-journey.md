# Family journey verification — 21 October 2026

## Scope and findings

The automated journey crosses the real profile, draft, simulation, evidence, parent-rendering and deletion functions. Twelve cases cover four labs and all three parent-interface languages. Synthetic answers deliberately use a different language from the parent interface and contain HTML-like text to check preservation and escaping.

This found and fixed three Parent Dashboard issues:

- Expanded trial notebooks defaulted to Arabic on English and French pages.
- The latest-lab heading used the stored interface language instead of the current parent interface language. Known lab titles now use the current translation; saved child answers remain untouched.
- The empty summary used RTL direction on English and French pages.

## Automated evidence

`npm run build`: TypeScript and the production build passed. `npm test`: 34 tests passed, including 12 cases in `tests/family-journey.test.ts`. Each added case verifies:

1. An optional nickname is stored and read back.
2. Incomplete lab evidence does not satisfy the completion rules.
3. A draft with an observed failure and corrected retest survives serialization and reload. Water also includes normal and boundary regression trials under the improved rule.
4. Completed evidence retains exact observations, explanations, trial settings and reasoning; clearing the draft does not remove completed evidence.
5. Parent labels and trial outcomes follow the current interface language. Child-authored quotations and reasoning retain their original text, language and direction, with HTML-like text escaped.
6. Viewing another language does not rewrite the saved evidence.
7. Family deletion removes the profile, draft and evidence, retains an unrelated storage key, and returns the parent view to its localized empty state.

These are model/storage integration and server-rendering checks. They do not click through the browser, activate the adult checkbox, verify focus behavior, exercise the browser confirmation dialog, or establish screen-reader/mobile usability. No real family data or production browser storage was accessed.

## Remaining human/browser checks

The in-app browser connection returned `transport closed before response` during this pass. Fresh visual and keyboard walkthroughs remain outstanding for this change. Before expanding recruitment, use the existing moderator guide with actual families and an educator, and check Android/iPhone browsers, reading load and assistive technology. The current release remains a free, same-device, adult-supervised preview; public email signup is closed.
