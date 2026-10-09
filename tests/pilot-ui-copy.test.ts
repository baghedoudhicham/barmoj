import assert from "node:assert/strict";
import test from "node:test";
import { languageNames } from "../src/languages";
import { pilotUiCopy } from "../src/pilot-ui-copy";

test("family-facing trial surfaces have complete Arabic, English and French copy", () => {
  for (const language of ["ar", "en", "fr"] as const) {
    const copy = pilotUiCopy[language];
    assert.ok(languageNames[language]);
    assert.ok(copy.onboarding.supervision.length > 30);
    assert.ok(copy.onboarding.disclosureBefore.length > 50);
    assert.equal(copy.kid.missions.length, 12);
    assert.equal(copy.kid.evidence.length, 5);
    assert.ok(copy.kid.trackStatus.length > 40);
    assert.equal(copy.parent.evidence.length, 5);
    assert.ok(copy.parent.deleteConfirm.length > 50);
    assert.equal(copy.privacy.sections.length, 5);
    assert.ok(copy.privacy.sections.every((section) => section.title && section.body));
  }
});

test("localized family copy describes the local-only, adult-supervised pilot without scoring children", () => {
  assert.match(pilotUiCopy.ar.parent.intro, /لا نعرض ترتيبًا أو درجة ذكاء/);
  assert.match(pilotUiCopy.en.parent.intro, /do not rank children|do not assign an intelligence score/i);
  assert.match(pilotUiCopy.fr.parent.intro, /ne classons pas les enfants/i);
  assert.match(pilotUiCopy.en.privacy.sections[0].body, /same browser profile/i);
  assert.match(pilotUiCopy.fr.privacy.sections[0].body, /même profil de navigateur/i);
});
