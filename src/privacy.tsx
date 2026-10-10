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
        <section><h2>{language === "ar" ? "المساعدة والملاحظات" : language === "fr" ? "Aide et remarques" : "Help and concerns"}</h2>
          <p>{language === "ar" ? "بِركار مشروع مستقل يديره مؤسسه. للملاحظات المتعلقة بالتجربة أو الخصوصية أو سلامة الطفل، اطلعوا على صفحة المساعدة والتواصل." : language === "fr" ? "BRKAR est un projet indépendant porté par son fondateur. Pour toute remarque sur l’aperçu, la confidentialité ou la sécurité d’un enfant, consultez la page d’aide et de contact." : "BRKAR is an independent, founder-led project. For preview, privacy or child-safety concerns, see our help and contact page."}</p>
          <Link to={`/support?lang=${language}`}>{language === "ar" ? "المساعدة والتواصل" : language === "fr" ? "Aide et contact" : "Help and contact"}</Link>
        </section>
        <Link className="button button-ghost" to={`/parent?lang=${language}`}>
          {c.back} <RouteArrow size={17} />
        </Link>
      </main>
    </Shell>
  );
}
