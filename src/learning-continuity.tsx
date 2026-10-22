import type { BrandLanguage } from "./brand";
import type { LabId } from "./lab-model";
import { continuityCopy } from "./continuity-copy";

export function PaperFollowUp({ language, id, application, writtenLanguage }: {
  language: BrandLanguage; id: LabId; application?: string; writtenLanguage?: BrandLanguage;
}) {
  const c = continuityCopy[language];
  return <section className="paper-follow-up" aria-labelledby="paper-follow-up-title">
    <div className="paper-follow-up__intro">
      <svg viewBox="0 0 96 96" className="paper-follow-up__drawing" fill="none" aria-hidden="true">
        <path d="M21 16h43l13 13v48H21Z" fill="var(--surface-raised)" stroke="currentColor" strokeWidth="2" />
        <path d="M64 16v13h13M32 43h29M32 54h19M32 65h10" stroke="currentColor" strokeWidth="2" />
        <path d="m59 68 17-17 7 7-17 17-10 3Z" fill="var(--explore)" stroke="currentColor" strokeWidth="2" />
      </svg>
      <p className="eyebrow">{c.eyebrow}</p>
      <h2 id="paper-follow-up-title">{c.title}</h2>
      <p>{c.intro}</p>
      {application?.trim() && <div className="voice-evidence"><p>{c.own}</p><blockquote lang={writtenLanguage || language} dir="auto">{application}</blockquote></div>}
    </div>
    <div className="paper-follow-up__activity">
      <ol>{c.activities[id].map(step => <li key={step}>{step}</li>)}</ol>
      <p className="paper-follow-up__question">{c.discuss}</p>
      <small>{c.safety}</small>
    </div>
  </section>;
}
