import assert from "node:assert/strict";
import test from "node:test";
import { languageNames, missionWords, outcomeIndex, outcomeLabel, predictionMatches, settingsDescription, sharedCopy, trialDetail } from "../src/lab-copy";
import { initialSettings, labIds, labs, simulate, type LabId, type Trial } from "../src/lab-model";

test("every interactive lab has child-facing copy in Arabic, English and French", () => {
  for (const language of ["ar", "en", "fr"] as const) {
    assert.ok(languageNames[language]);
    assert.ok(sharedCopy[language].chooseLanguage);
    assert.ok(sharedCopy[language].privacy);
    assert.ok(sharedCopy[language].supervisionNote);
    const privacyText = sharedCopy[language].privacy.toLowerCase();
    assert.ok(privacyText.includes(language === "ar" ? "المتصفح" : language === "fr" ? "navigateur" : "browser"));
    assert.ok(privacyText.includes(language === "ar" ? "اسمك الكامل" : language === "fr" ? "nom complet" : "full name"));
    for (const id of labIds) {
      const copy = missionWords[language][id];
      assert.ok(copy.title);
      assert.ok(copy.goal);
      assert.equal(copy.outcomes.length, labs[id].outcomes.length);
      assert.ok(copy.question);
      assert.ok(copy.hint);
      assert.ok(copy.prompt);
      assert.ok(copy.transfer);
      assert.ok(sharedCopy[language].milestoneLabels[id].length > 0);
    }
  }
});

test("translated predictions retain the existing Arabic outcome keys", () => {
  for (const id of labIds) {
    for (let index = 0; index < labs[id].outcomes.length; index++) {
      const canonical = labs[id].outcomes[index];
      for (const language of ["ar", "en", "fr"] as const) {
        const translated = missionWords[language][id].outcomes[index];
        assert.equal(outcomeIndex(id, canonical), index);
        assert.equal(outcomeIndex(id, translated), index);
        assert.equal(outcomeLabel(id, canonical, language), translated);
        assert.equal(predictionMatches(id, translated, canonical), true);
      }
    }
  }
});

test("trial notes and settings summaries follow each locale without changing simulation evidence", () => {
  const cases: Array<{ id: LabId; settings: ReturnType<typeof initialSettings>; expectedEnglish: string; expectedFrench: string }> = [
    { id: "water", settings: { ...initialSettings(), scenario: "failure", safeguard: true }, expectedEnglish: "The sensors disagreed", expectedFrench: "Les capteurs différaient" },
    { id: "routing", settings: { ...initialSettings(), blocked: true }, expectedEnglish: "Road A–B is closed", expectedFrench: "La route A–B est fermée" },
    { id: "traffic", settings: { ...initialSettings(), mode: "both" }, expectedEnglish: "Both lights turned green", expectedFrench: "Les deux feux sont passés au vert" },
    { id: "economy", settings: { ...initialSettings(), reward: 5 }, expectedEnglish: "From 10 to 20 resources", expectedFrench: "De 10 à 20 ressources" },
  ];
  for (const item of cases) {
    const result = simulate(item.id, item.settings);
    const trial: Trial = {
      id: "test",
      at: new Date(0).toISOString(),
      settings: item.settings,
      prediction: labs[item.id].outcomes[0],
      reason: "A reason to test the rule.",
      ...result,
      language: "en",
    };
    assert.ok(trialDetail(item.id, trial, "ar").length > 0);
    assert.ok(trialDetail(item.id, trial, "en").includes(item.expectedEnglish));
    assert.ok(trialDetail(item.id, trial, "fr").includes(item.expectedFrench));
    assert.ok(settingsDescription(item.id, item.settings, "ar"));
    assert.ok(settingsDescription(item.id, item.settings, "en"));
    assert.ok(settingsDescription(item.id, item.settings, "fr"));
    assert.equal(trial.outcome, result.outcome);
    assert.equal(trial.detail, result.detail);
  }
});
