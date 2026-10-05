import assert from "node:assert/strict";
import { test } from "node:test";
import { getEvidence } from "../src/data";
import { emptyDraft, MAX_DRAFT_BYTES, MAX_TRIALS, readDraft, validTrial } from "../src/lab-storage";
import { initialSettings, simulate } from "../src/lab-model";

const trial = {
  id: "trial-1", at: new Date().toISOString(), settings: initialSettings(),
  prediction: "الموارد تزيد", reason: "المكافأة تتجاوز تكلفة الجولة",
  ...simulate("economy", initialSettings()),
};
test("saved trials reject invalid dates, oversized answers and non-physical chart values", () => {
  assert.equal(validTrial(trial), true);
  assert.equal(validTrial({ ...trial, at: "invalid" }), false);
  assert.equal(validTrial({ ...trial, reason: "x".repeat(501) }), false);
  assert.equal(validTrial({ ...trial, values: [-1, Infinity] }), false);
  assert.equal(validTrial({ ...trial, values: Array(6).fill(10) }), false);
});

test("bounded storage reads fail safely while keeping valid neighboring evidence", () => {
  const records = new Map<string, string>();
  const previous = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: { getItem: (key: string) => records.get(key) ?? null } });
  try {
    records.set("barmoj-lab-v1-water", " ".repeat(MAX_DRAFT_BYTES + 1));
    assert.equal(readDraft("water"), null);
    records.set("barmoj-lab-v1-water", JSON.stringify({ ...emptyDraft(), trials: Array(MAX_TRIALS + 1).fill(trial) }));
    assert.equal(readDraft("water"), null);
    const evidence = { mission: "لعبة لا تنكسر", date: trial.at, note: "دليل محفوظ", items: ["يختبر"], trials: [trial] };
    records.set("barmoj-evidence", JSON.stringify([{ ...evidence, trials: [{ ...trial, at: "invalid" }] }, evidence]));
    assert.deepEqual(getEvidence(), [evidence]);
  } finally {
    if (previous) Object.defineProperty(globalThis, "localStorage", previous);
    else Reflect.deleteProperty(globalThis, "localStorage");
  }
});
