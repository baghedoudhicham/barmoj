import type { LabId, Settings, Trial } from "./lab-model";
import { initialSettings, labIds } from "./lab-model";

export const MAX_TRIALS = 100;
export const MAX_DRAFT_BYTES = 262_144;
export function boundedText(value: unknown, limit = 500): value is string {
  return typeof value === "string" && value.length <= limit;
}

export type LabDraft = {
  version: 1;
  updatedAt: string;
  settings: Settings;
  observation: string;
  prediction: string;
  reason: string;
  explanation: string;
  observationLanguage?: "ar" | "en" | "fr";
  explanationLanguage?: "ar" | "en" | "fr";
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
    boundedText(v.id, 100) && boundedText(v.at, 100) &&
    Number.isFinite(Date.parse(v.at)) &&
    boundedText(v.prediction) && boundedText(v.reason) &&
    boundedText(v.outcome) && boundedText(v.detail, 1000) &&
    (v.language === undefined || ["ar", "en", "fr"].includes(v.language)) &&
    typeof v.safe === "boolean" &&
    (v.values === undefined ||
      (Array.isArray(v.values) && v.values.length <= 5 && v.values.every(n => Number.isFinite(n) && n >= 0 && n <= 100)))
  );
}
export function readDraft(id: LabId): LabDraft | null {
  try {
    const raw = localStorage.getItem(`barmoj-lab-v1-${id}`) || "null";
    if (raw.length > MAX_DRAFT_BYTES) return null;
    const d = JSON.parse(raw);
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
      ].every((k) => boundedText(d[k])) ||
      !["observationLanguage", "explanationLanguage"].every(
        (k) => d[k] === undefined || ["ar", "en", "fr"].includes(d[k]),
      ) ||
      !Number.isFinite(Date.parse(d.updatedAt)) ||
      !Array.isArray(d.trials) ||
      d.trials.length > MAX_TRIALS ||
      !d.trials.every(validTrial)
    )
      return null;
    return {
      ...d,
      ...(d.observation && !d.observationLanguage ? { observationLanguage: "ar" } : {}),
      ...(d.explanation && !d.explanationLanguage ? { explanationLanguage: "ar" } : {}),
    };
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
