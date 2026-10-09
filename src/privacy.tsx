import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Shell } from "./components";
import type { BrandLanguage } from "./brand";
import { pilotUiCopy } from "./pilot-ui-copy";
import { LanguagePicker } from "./language-picker";

export function PrivacyPage() {
  const [params] = useSearchParams();
  const requested = params.get("lang");
  const language: BrandLanguage = requested === "en" || requested === "fr" ? requested : "ar";
  const c = pilotUiCopy[language].privacy;
  const RouteArrow = language === "ar" ? ArrowLeft : ArrowRight;
  return (
    <Shell language={language}>
      <main className="wrap narrow privacy-page" lang={language} dir={language === "ar" ? "rtl" : "ltr"}>
        <LanguagePicker language={language} label={pilotUiCopy[language].languageLabel} />
        <p className="eyebrow">{c.eyebrow}</p>
        <h1>{c.title}</h1>
        <p className="privacy-intro">{c.intro}</p>
        {c.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </section>
        ))}
        <section className="privacy-launch-note">
          <h2>{c.launchTitle}</h2>
          <p>{c.launchBody}</p>
          <a href="https://www.cndp.ma/images/lois/Loi-09-08-Fr.pdf" target="_blank" rel="noreferrer">
            {c.law}
          </a>
        </section>
        <Link className="button button-ghost" to={`/parent?lang=${language}`}>
          {c.back} <RouteArrow size={17} />
        </Link>
      </main>
    </Shell>
  );
}
