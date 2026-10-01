import assert from "node:assert/strict";
import { test } from "node:test";
import {
  canComplete,
  initialSettings,
  milestones,
  simulate,
} from "../src/lab-model";
import type { LabId, Settings, Trial } from "../src/lab-model";
import {
  emptyDraft,
  latestDraft,
  readDraft,
  saveDraft,
} from "../src/lab-storage";
import { addEvidence, getEvidence, getProfile } from "../src/data";

const observation = "أحدد الهدف والقيد قبل أن أبني النظام";
const explanation = "غيّرت القاعدة لأن التجربة الأولى كشفت سبب الفشل";
function trial(id: LabId, patch: Partial<Settings> = {}): Trial {
  const settings = { ...initialSettings(), ...patch };
  return {
    id: crypto.randomUUID(),
    at: new Date().toISOString(),
    settings,
    prediction: "توقع تجريبي",
    reason: "سبب التوقع محفوظ",
    ...simulate(id, settings),
  };
}
test("water stops at the exact boundary and rejects a false sensor reading until protected", () => {
  assert.equal(
    simulate("water", { ...initialSettings(), scenario: "limit" }).outcome,
    "المضخة متوقفة",
  );
  assert.equal(
    simulate("water", { ...initialSettings(), scenario: "failure" }).safe,
    false,
  );
  assert.equal(
    simulate("water", {
      ...initialSettings(),
      scenario: "failure",
      safeguard: true,
    }).safe,
    true,
  );
});
test("water completion requires normal and boundary regression tests under the improved rule", () => {
  const settings = {
    ...initialSettings(),
    scenario: "failure" as const,
    safeguard: true,
  };
  const trials = [
    trial("water"),
    trial("water", { scenario: "limit" }),
    trial("water", { scenario: "failure" }),
    trial("water", { scenario: "failure", safeguard: true }),
  ];
  assert.equal(
    canComplete("water", trials, settings, observation, explanation),
    false,
  );
  trials.push(
    trial("water", { safeguard: true }),
    trial("water", { scenario: "limit", safeguard: true }),
  );
  assert.equal(
    canComplete("water", trials, settings, observation, explanation),
    true,
  );
  assert.equal(
    canComplete(
      "water",
      trials,
      { ...settings, safeguard: false },
      observation,
      explanation,
    ),
    false,
  );
  assert.equal(
    canComplete(
      "water",
      trials,
      { ...settings, stopAtLimit: false },
      observation,
      explanation,
    ),
    false,
  );
});
test("a protected first attempt cannot substitute for observing failure", () => {
  for (const id of ["water", "traffic"] as LabId[]) {
    const settings = {
      ...initialSettings(),
      scenario: "failure" as const,
      safeguard: true,
      mode: "both" as const,
      interlock: true,
    };
    assert.equal(
      milestones(id, [trial(id, settings)], settings).at(-1)?.done,
      false,
    );
  }
});
test("routing honors priority and the actual detour after road closure", () => {
  assert.equal(
    simulate("routing", { ...initialSettings(), order: ["B", "A", "C"] }).safe,
    false,
  );
  assert.equal(
    simulate("routing", { ...initialSettings(), blocked: true }).safe,
    false,
  );
  assert.equal(
    simulate("routing", {
      ...initialSettings(),
      blocked: true,
      order: ["A", "C", "B"],
    }).safe,
    true,
  );
  const s = { ...initialSettings(), blocked: true, order: ["A", "C", "B"] };
  const trials = [
    trial("routing"),
    trial("routing", { blocked: true }),
    trial("routing", s),
  ];
  assert.equal(
    canComplete("routing", trials, s, observation, explanation),
    true,
  );
  assert.equal(
    canComplete(
      "routing",
      trials,
      { ...s, order: ["A", "B", "C"] },
      observation,
      explanation,
    ),
    false,
  );
});
test("traffic interlock changes both physical outputs to red", () => {
  assert.equal(
    simulate("traffic", { ...initialSettings(), mode: "both" }).outcome,
    "الاتجاهان يمران",
  );
  assert.equal(
    simulate("traffic", { ...initialSettings(), mode: "both", interlock: true })
      .outcome,
    "الاتجاهان متوقفان",
  );
  const s = { ...initialSettings(), mode: "both" as const, interlock: true };
  const trials = [
    trial("traffic", { mode: "both" }),
    trial("traffic", s),
    trial("traffic", { interlock: true }),
  ];
  assert.equal(
    canComplete("traffic", trials, s, observation, explanation),
    true,
  );
  assert.equal(
    canComplete(
      "traffic",
      trials,
      { ...s, interlock: false },
      observation,
      explanation,
    ),
    false,
  );
});
test("economy exposes growth, depletion and actual balance with a clear recurrence", () => {
  assert.deepEqual(
    simulate("economy", { ...initialSettings(), reward: 5 }).values,
    [12, 14, 16, 18, 20],
  );
  assert.deepEqual(
    simulate("economy", { ...initialSettings(), reward: 2 }).values,
    [9, 8, 7, 6, 5],
  );
  assert.deepEqual(
    simulate("economy", { ...initialSettings(), reward: 3 }).values,
    [10, 10, 10, 10, 10],
  );
  const s = { ...initialSettings(), reward: 3 };
  const trials = [trial("economy"), trial("economy", s)];
  assert.equal(
    canComplete("economy", trials, s, observation, explanation),
    true,
  );
  assert.equal(
    canComplete(
      "economy",
      trials,
      { ...s, reward: 5 },
      observation,
      explanation,
    ),
    false,
  );
  assert.equal(
    canComplete(
      "economy",
      trials,
      { ...s, reward: 2 },
      observation,
      explanation,
    ),
    false,
  );
});
test("the corrected retest must follow the failure, and explanation must be present", () => {
  const s = { ...initialSettings(), reward: 3 };
  assert.equal(
    canComplete(
      "economy",
      [trial("economy", s), trial("economy")],
      s,
      observation,
      explanation,
    ),
    false,
  );
  assert.equal(
    canComplete(
      "economy",
      [trial("economy"), trial("economy", s)],
      s,
      observation,
      "",
    ),
    false,
  );
  assert.equal(
    canComplete(
      "economy",
      [trial("economy"), trial("economy", s)],
      s,
      "",
      explanation,
    ),
    false,
  );
});

test("drafts survive reload, corrupt records are ignored, and completed evidence preserves exact answers", () => {
  const records = new Map<string, string>();
  const storage = {
    getItem: (k: string) => records.get(k) ?? null,
    setItem: (k: string, v: string) => {
      records.set(k, v);
    },
    removeItem: (k: string) => {
      records.delete(k);
    },
  };
  Object.defineProperty(globalThis, "localStorage", {
    value: storage,
    configurable: true,
  });
  const draft = {
    ...emptyDraft(),
    observation,
    explanation,
    trials: [trial("economy")],
  };
  assert.equal(saveDraft("economy", draft), true);
  assert.deepEqual(readDraft("economy"), draft);
  assert.equal(latestDraft()?.id, "economy");
  storage.setItem("barmoj-lab-v1-water", '{"version":1,"settings":{}}');
  assert.equal(readDraft("water"), null);
  storage.setItem("barmoj-profile", '{"child":4}');
  assert.equal(typeof getProfile().child, "string");
  storage.setItem("barmoj-evidence", '{"unexpected":true}');
  assert.deepEqual(getEvidence(), []);
  storage.setItem(
    "barmoj-evidence",
    JSON.stringify([
      {
        mission: "قديم",
        date: new Date().toISOString(),
        items: ["يختبر"],
        note: "سجل سابق",
      },
    ]),
  );
  assert.equal(getEvidence().length, 1);
  const evidence = {
    mission: "لعبة لا تنكسر",
    labId: "economy" as const,
    items: ["يتوقّع" as const],
    note: "تجربة",
    observation,
    explanation,
    trials: draft.trials,
  };
  assert.equal(addEvidence(evidence), true);
  assert.deepEqual(getEvidence()[0].trials, draft.trials);
  assert.equal(getEvidence()[0].explanation, explanation);
  assert.equal(getEvidence().length, 2);
});
test("storage failures return a visible failure signal instead of reporting a saved result", () => {
  Object.defineProperty(globalThis, "localStorage", {
    value: {
      getItem: () => null,
      setItem: () => {
        throw new Error("quota");
      },
    },
    configurable: true,
  });
  assert.equal(saveDraft("water", emptyDraft()), false);
  assert.equal(
    addEvidence({ mission: "خزان", items: ["يختبر"], note: "دليل" }),
    false,
  );
});
