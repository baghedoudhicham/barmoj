import type { LabId, Trial } from "./lab-model";
import type { BrandLanguage } from "./brand";
import { labIds } from "./lab-model";
import { boundedText, MAX_TRIALS, validTrial } from "./lab-storage";

export type EvidenceKey = "يفهم" | "يمثّل" | "يتوقّع" | "يختبر" | "يفسّر";

export const missions = [
  ["راقب قبل أن تحل", "الأنماط والقيود"],
  ["حوّل الفوضى إلى خطوات", "الترتيب والتفكيك"],
  ["ارسم نظامًا", "المدخلات والقواعد والحالة والمخرجات"],
  ["ابحث عن النمط", "التكرار قبل الصياغة"],
  ["ماذا لو؟", "الشروط والقرارات"],
  ["اكسر النظام", "الحالات الطرفية والفشل"],
  ["أصلح السبب", "التنقيح والاستدلال"],
  ["اجعل النظام أبسط", "التجريد وإعادة الاستخدام"],
  ["دع AI يقترح", "التحديد والنقد"],
  ["اختبر AI", "التحقق والافتراضات"],
  ["ابنِ نظامك", "مشروع من مشكلة حقيقية"],
  ["اشرح قراراتك", "اعرض التصميم ودافع عنه"],
] as const;

export const evidenceLabels: Array<[EvidenceKey, string]> = [
  ["يفهم", "يحدد الهدف والقيود"],
  ["يمثّل", "يبني نموذجًا للنظام"],
  ["يتوقّع", "يشرح النتيجة قبل التجربة"],
  ["يختبر", "يجرب الحالة العادية والفشل"],
  ["يفسّر", "يشرح لماذا يعمل الحل"],
];

export type LearningEvidence = {
  mission: string;
  date: string;
  items: EvidenceKey[];
  note: string;
  labId?: LabId;
  observation?: string;
  explanation?: string;
  trials?: Trial[];
  language?: BrandLanguage;
  transfer?: string;
  observationLanguage?: BrandLanguage;
  explanationLanguage?: BrandLanguage;
};

export type Profile = { child: string };

const PROFILE_KEY = "barmoj-profile";
const EVIDENCE_KEY = "barmoj-evidence";
const DEFAULT_PROFILE: Profile = { child: "المستكشف" };

function safeNickname(value: unknown) {
  if (typeof value !== "string") return DEFAULT_PROFILE.child;
  return Array.from(value.trim()).slice(0, 24).join("") || DEFAULT_PROFILE.child;
}

export function getProfile(): Profile {
  try {
    const value = localStorage.getItem(PROFILE_KEY);
    if (!value) return DEFAULT_PROFILE;
    const stored = JSON.parse(value);
    const profile = { child: safeNickname(stored?.child) };
    // Migrate older profiles by dropping parent names and exact ages.
    if (JSON.stringify(stored) !== JSON.stringify(profile)) {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    }
    return profile;
  } catch {
    try {
      localStorage.removeItem(PROFILE_KEY);
    } catch {
      // The app can still be used without a saved profile.
    }
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(profile: Profile) {
  try {
    localStorage.setItem(
      PROFILE_KEY,
      JSON.stringify({ child: safeNickname(profile.child) }),
    );
    return true;
  } catch {
    return false;
  }
}

export function prepareFamilyStorage() {
  getProfile();
  try {
    localStorage.removeItem("barmoj-pilot-events-v1");
    localStorage.removeItem("barmoj-pilot-session-v1");
  } catch {
    // Continue without local storage; the app will show save failures as needed.
  }
}

export function clearFamilyData() {
  try {
    const keys = Array.from({ length: localStorage.length }, (_, index) =>
      localStorage.key(index),
    ).filter((key): key is string => !!key && key.startsWith("barmoj-"));
    keys.forEach((key) => localStorage.removeItem(key));
    return true;
  } catch {
    return false;
  }
}

export function getEvidence(): LearningEvidence[] {
  try {
    const value = localStorage.getItem(EVIDENCE_KEY);
    if (value && value.length > 2_097_152) return [];
    const entries = value ? JSON.parse(value) : [];
    if (!Array.isArray(entries)) return [];
    return entries.filter(
      (e): e is LearningEvidence =>
        e &&
        boundedText(e.mission) &&
        boundedText(e.date, 100) &&
        Number.isFinite(Date.parse(e.date)) &&
        boundedText(e.note, 1000) &&
        Array.isArray(e.items) &&
        e.items.length <= evidenceLabels.length &&
        e.items.every((k: unknown) =>
          evidenceLabels.some(([name]) => name === k),
        ) &&
        (e.labId === undefined || labIds.includes(e.labId)) &&
        (e.trials === undefined ||
          (Array.isArray(e.trials) && e.trials.length <= MAX_TRIALS && e.trials.every(validTrial))) &&
        (e.observation === undefined || boundedText(e.observation)) &&
        (e.explanation === undefined || boundedText(e.explanation)) &&
        (e.language === undefined || ["ar", "en", "fr"].includes(e.language)) &&
        (e.observationLanguage === undefined || ["ar", "en", "fr"].includes(e.observationLanguage)) &&
        (e.explanationLanguage === undefined || ["ar", "en", "fr"].includes(e.explanationLanguage)) &&
        (e.transfer === undefined || boundedText(e.transfer)),
    ).slice(0, 8);
  } catch {
    return [];
  }
}

export function addEvidence(entry: Omit<LearningEvidence, "date">) {
  const current = getEvidence();
  const next: LearningEvidence[] = [
    { ...entry, date: new Date().toISOString() },
    ...current.filter((item) => entry.labId ? item.labId !== entry.labId : item.mission !== entry.mission),
  ].slice(0, 8);
  try {
    localStorage.setItem(EVIDENCE_KEY, JSON.stringify(next));
    return true;
  } catch {
    return false;
  }
}
