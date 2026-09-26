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
};

export type Profile = { parent: string; child: string; age: string };

const PROFILE_KEY = "barmoj-profile";
const EVIDENCE_KEY = "barmoj-evidence";

export function getProfile(): Profile {
  try {
    const value = localStorage.getItem(PROFILE_KEY);
    return value ? JSON.parse(value) : { parent: "", child: "سلمى", age: "10" };
  } catch {
    return { parent: "", child: "سلمى", age: "10" };
  }
}

export function saveProfile(profile: Profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function getEvidence(): LearningEvidence[] {
  try {
    const value = localStorage.getItem(EVIDENCE_KEY);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

export function addEvidence(entry: Omit<LearningEvidence, "date">) {
  const current = getEvidence();
  const next: LearningEvidence[] = [
    { ...entry, date: new Date().toISOString() },
    ...current.filter((item) => item.mission !== entry.mission),
  ].slice(0, 8);
  localStorage.setItem(EVIDENCE_KEY, JSON.stringify(next));
}
