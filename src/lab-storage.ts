import type { LabId, Settings, Trial } from "./lab-model";
import { initialSettings, labIds } from "./lab-model";

export type LabDraft = {
  version: 1;
  updatedAt: string;
  settings: Settings;
  observation: string;
  prediction: string;
  reason: string;
  explanation: string;
  trials: Trial[];
};
export function emptyDraft(): LabDraft {
  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    settings: initialSettings(),
    observation: "",
    prediction: "",
    reason: "",
    explanation: "",
    trials: [],
  };
}
export function validSettings(s: unknown): s is Settings {
  if (!s || typeof s !== "object") return false;
  const v = s as Settings;
  return (
    ["normal", "limit", "failure"].includes(v.scenario) &&
    ["ns", "ew", "both"].includes(v.mode) &&
    ["stopAtLimit", "safeguard", "blocked", "interlock"].every(
      (k) => typeof v[k as keyof Settings] === "boolean",
    ) &&
    Array.isArray(v.order) &&
    v.order.length === 3 &&
    v.order.every(
      (id) => typeof id === "string" && ["A", "B", "C"].includes(id),
    ) &&
    [...v.order].sort().join("") === "ABC" &&
    Number.isInteger(v.reward) &&
    v.reward >= 2 &&
    v.reward <= 7
  );
}
export function validTrial(t: unknown): t is Trial {
  if (!t || typeof t !== "object") return false;
  const v = t as Trial;
  return (
    validSettings(v.settings) &&
    ["id", "at", "prediction", "reason", "outcome", "detail"].every(
      (k) => typeof v[k as keyof Trial] === "string",
    ) &&
    typeof v.safe === "boolean" &&
    (v.values === undefined ||
      (Array.isArray(v.values) && v.values.every(Number.isFinite)))
  );
}
export function readDraft(id: LabId): LabDraft | null {
  try {
    const d = JSON.parse(localStorage.getItem(`barmoj-lab-v1-${id}`) || "null");
    if (
      !d ||
      d.version !== 1 ||
      !validSettings(d.settings) ||
      ![
        "updatedAt",
        "observation",
        "prediction",
        "reason",
        "explanation",
      ].every((k) => typeof d[k] === "string") ||
      !Number.isFinite(Date.parse(d.updatedAt)) ||
      !Array.isArray(d.trials) ||
      !d.trials.every(validTrial)
    )
      return null;
    return d;
  } catch {
    return null;
  }
}
export function saveDraft(id: LabId, draft: LabDraft) {
  try {
    localStorage.setItem(`barmoj-lab-v1-${id}`, JSON.stringify(draft));
    return true;
  } catch {
    return false;
  }
}
export function removeDraft(id: LabId) {
  try {
    localStorage.removeItem(`barmoj-lab-v1-${id}`);
  } catch {
    /* Saved evidence remains available if cleanup fails. */
  }
}
export function latestDraft() {
  return labIds
    .map((id) => ({ id, draft: readDraft(id) }))
    .filter((v): v is { id: LabId; draft: LabDraft } => !!v.draft)
    .sort((a, b) => b.draft.updatedAt.localeCompare(a.draft.updatedAt))[0];
}
