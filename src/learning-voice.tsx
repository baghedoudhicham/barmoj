import type { BrandLanguage } from "./brand";

export const voiceCopy = {
  ar: {
    question: "سؤالي أنا", questionHint: "ماذا تريد أن تكتشف؟ اكتب سؤالًا، أو اتركه الآن وعد إليه بعد التجربة.",
    application: "علم ينفع", applicationHint: "كيف يمكن أن تستخدم ما اكتشفته لتنفع نفسك أو غيرك؟ فكّر في موقف صغير من يومك.",
    optional: "اختياري · بكلماتك أنت", questionSaved: "السؤال الذي اختاره الطفل", applicationSaved: "كيف يريد استخدام ما تعلّمه",
  },
  en: {
    question: "My own question", questionHint: "What would you like to discover? Write a question, or come back to it after experimenting.",
    application: "Knowledge that helps", applicationHint: "How could you use your discovery to help yourself or someone else? Think of a small everyday situation.",
    optional: "Optional · in your own words", questionSaved: "The child's own question", applicationSaved: "How they want to use their learning",
  },
  fr: {
    question: "Ma propre question", questionHint: "Que voudrais-tu découvrir ? Écris une question, ou reviens-y après ton expérience.",
    application: "Un savoir utile", applicationHint: "Comment utiliser ta découverte pour t’aider ou aider quelqu’un ? Pense à une petite situation du quotidien.",
    optional: "Facultatif · avec tes mots", questionSaved: "La question choisie par l’enfant", applicationSaved: "Comment utiliser ce qui a été appris",
  },
};

export function LearningVoice({ kind, language, answerLanguage, value, onChange }: {
  kind: "question" | "application"; language: BrandLanguage; answerLanguage?: BrandLanguage;
  value: string; onChange: (value: string) => void;
}) {
  const c = voiceCopy[language];
  return <section className={`learning-voice learning-voice--${kind}`}>
    <svg className="learning-voice__sketch" viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <path d="M16 62C16 33 62 51 62 21" stroke="currentColor" strokeWidth="2" strokeDasharray="3 5" />
      <circle cx="16" cy="62" r="7" fill="var(--paper)" stroke="currentColor" strokeWidth="2" />
      <path d="m53 21 9-9 9 9-9 9Z" fill={kind === "question" ? "var(--explore)" : "var(--learn)"} stroke="currentColor" strokeWidth="2" />
    </svg>
    <div className="learning-voice__body">
      <p className="eyebrow">{c.optional}</p>
      <label className="notebook-field">
        <span className="learning-voice__title">{c[kind]}</span>
        <span className="learning-voice__hint">{kind === "question" ? c.questionHint : c.applicationHint}</span>
        <textarea rows={3} maxLength={500} dir="auto" lang={answerLanguage || language} value={value} onChange={e => onChange(e.target.value)} />
      </label>
    </div>
  </section>;
}

export function VoiceEvidence({ language, question, application, questionLanguage, applicationLanguage, audience = "parent" }: {
  language: BrandLanguage; question?: string; application?: string;
  questionLanguage?: BrandLanguage; applicationLanguage?: BrandLanguage;
  audience?: "child" | "parent";
}) {
  const c = voiceCopy[language];
  return <>{([
    [question, questionLanguage, audience === "child" ? c.question : c.questionSaved],
    [application, applicationLanguage, audience === "child" ? c.application : c.applicationSaved],
  ] as const).map(([text, written, label]) => text?.trim() ? <div className="voice-evidence" key={label}>
    <p className="legacy-note">{label}</p>
    <blockquote className="child-quote" lang={written || language} dir="auto">{text}</blockquote>
  </div> : null)}</>;
}
