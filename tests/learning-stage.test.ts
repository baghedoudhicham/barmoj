import assert from "node:assert/strict";
import test from "node:test";
import { initialSettings, simulate, type Settings, type Trial } from "../src/lab-model";
import { learningStage } from "../src/learning-stage";
import { emptyDraft, type LabDraft } from "../src/lab-storage";

function waterTrials(): Trial[] {
  const base = initialSettings();
  const settings: Settings[] = [
    { ...base, scenario: "failure" },
    { ...base, safeguard: true },
    { ...base, scenario: "limit", safeguard: true },
    { ...base, scenario: "failure", safeguard: true },
  ];
  return settings.map((configuration, index) => ({
    id: `stage-${index}`,
    at: new Date(0).toISOString(),
    settings: configuration,
    prediction: "water should stop",
    reason: "I checked the second reading.",
    ...simulate("water", configuration),
  }));
}

test("Kid Home stage follows saved work and never reads as a child's ability score", () => {
  const trials = waterTrials();
  const observed: LabDraft = { ...emptyDraft(), observation: "The first reading failed." };
  const tested: LabDraft = { ...observed, settings: trials[0].settings, trials: trials.slice(0, 1) };
  const repaired: LabDraft = {
    ...observed,
    settings: trials.at(-1)!.settings,
    trials,
    explanation: "I changed the rule and checked the sensor again.",
  };
  assert.deepEqual(learningStage("water", null), { index: 0, ready: false });
  assert.deepEqual(learningStage("water", observed), { index: 1, ready: false });
  assert.deepEqual(learningStage("water", tested), { index: 2, ready: false });
  assert.deepEqual(learningStage("water", repaired), { index: 3, ready: true });
  assert.deepEqual(learningStage("water", { ...repaired, explanation: "short" }), { index: 3, ready: false });
});

test("changing the active setting returns focus to testing until its evidence is retested", () => {
  const trials = waterTrials();
  const repaired: LabDraft = {
    ...emptyDraft(),
    observation: "The first reading failed.",
    explanation: "I changed the rule and checked the sensor again.",
    settings: trials.at(-1)!.settings,
    trials,
  };
  assert.deepEqual(learningStage("water", repaired), { index: 3, ready: true });
  assert.deepEqual(learningStage("water", { ...repaired, settings: initialSettings() }), { index: 2, ready: false });
});
