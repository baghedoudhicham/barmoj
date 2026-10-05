export type BrandLanguage = "ar" | "en" | "fr";

// A drawing compass: fixed center, two legs, and an arc made by the learner.
export function BrandMark() {
  return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false">
    <circle cx="24" cy="11" r="4" />
    <path d="m22 15-10 23m14-23 10 23M16 29h16M9 39c8-8 22-8 30 0" />
  </svg>;
}

export function BrandArrow() {
  return <svg className="brand-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M20 12H4m6-6-6 6 6 6" /></svg>;
}

export const shellCopy = {
  ar: { skip: "انتقل إلى المحتوى", nav: "التنقل الرئيسي", method: "كيف نتعلّم؟", track: "المختبرات", curriculum: "المنهج", parents: "للأهل", start: "ابدأ التجربة", space: "مساحتي", menu: "القائمة", privacy: "الخصوصية", pilot: "تجربة عائلية بإشراف وليّ الأمر", tagline: "مساحة لينمو التفكير.", home: "بِركار، الصفحة الرئيسية" },
  en: { skip: "Skip to content", nav: "Main navigation", method: "Our approach", track: "The labs", curriculum: "Curriculum", parents: "For parents", start: "Try the Arabic pilot", space: "My space", menu: "Menu", privacy: "Privacy (Arabic)", pilot: "A parent-supervised family pilot", tagline: "Room for growing minds.", home: "BRKAR, home" },
  fr: { skip: "Aller au contenu", nav: "Navigation principale", method: "Notre approche", track: "Les ateliers", curriculum: "Programme", parents: "Pour les parents", start: "Essayer le pilote arabe", space: "Mon espace", menu: "Menu", privacy: "Confidentialité (arabe)", pilot: "Un pilote en famille, accompagné par un adulte", tagline: "Un espace pour apprendre à penser.", home: "BRKAR, accueil" },
} satisfies Record<BrandLanguage, Record<string, string>>;
