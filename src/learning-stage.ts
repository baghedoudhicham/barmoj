import { canComplete, milestones, type LabId } from "./lab-model";
import type { LabDraft } from "./lab-storage";

// Describes the task's saved state, never a child's ability or preferred learning style.
export function learningStage(id: LabId, draft: LabDraft | null | undefined) {
  if (!draft || draft.observation.trim().length < 8) return { index: 0, ready: false };
  if (!draft.trials.length) return { index: 1, ready: false };
  if (!milestones(id, draft.trials, draft.settings).every(step => step.done)) return { index: 2, ready: false };
  return { index: 3, ready: canComplete(id, draft.trials, draft.settings, draft.observation, draft.explanation) };
}
