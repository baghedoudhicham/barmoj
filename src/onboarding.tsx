import type { FormEvent } from "react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Shell } from "./components";
import { getProfile, saveProfile } from "./data";
import type { BrandLanguage } from "./brand";
import { pilotUiCopy } from "./pilot-ui-copy";
import { LanguagePicker } from "./language-picker";
export default function Onboarding() {
  const [params] = useSearchParams();
  const requested = params.get("lang");
  const language: BrandLanguage = requested === "en" || requested === "fr" ? requested : "ar";
  const c = pilotUiCopy[language].onboarding;
  const RouteArrow = language === "ar" ? ArrowLeft : ArrowRight;
  const initial = getProfile(pilotUiCopy[language].kid.defaultNickname);
  const [child, setChild] = useState(initial.child);
  const [supervised, setSupervised] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const navigate = useNavigate();
  function submit(event: FormEvent) {
    event.preventDefault();
    if (!supervised) return;
    if (!saveProfile({ child: child.trim() || pilotUiCopy[language].kid.defaultNickname })) {
      setStorageError(true);
      return;
    }
    navigate(`/kid?lang=${language}`);
  }
  return (
    <Shell language={language}>
      <main className="wrap narrow section onboarding-wrap" lang={language} dir={language === "ar" ? "rtl" : "ltr"}>
        <LanguagePicker language={language} label={pilotUiCopy[language].languageLabel} />
        <div className="onboarding-index"><span>01</span><b>{c.adultStep}</b><span>02</span><b>{c.nicknameStep}</b><span>03</span><b>{c.beginStep}</b></div>
        <div className="section-title"><p className="eyebrow">{c.eyebrow}</p><h1>{c.title}</h1><p>{c.body}</p></div>
        <form className="form-panel" onSubmit={submit}>
          <label>{c.nicknameLabel}<input value={child} onChange={(event) => setChild(event.target.value)} placeholder={c.nicknamePlaceholder} maxLength={24} autoComplete="off" /></label>
          <p className="privacy-hint">{c.privacyHint}</p>
          <label className="supervision-check"><input type="checkbox" checked={supervised} onChange={(event) => setSupervised(event.target.checked)} required /> {c.supervision}</label>
          <p className="pilot-disclosure">{c.disclosureBefore}<Link to={`/privacy?lang=${language}`}>{c.privacyLink}</Link></p>
          {storageError && <p role="alert" className="storage-alert">{c.storageError}</p>}
          <button className="button" type="submit" disabled={!supervised}>{c.enter} <RouteArrow size={18} /></button>
        </form>
      </main>
    </Shell>
  );
}
