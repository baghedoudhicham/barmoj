import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Shell } from "./components";
import type { BrandLanguage } from "./brand";
import { ActionButton, ActionLink, ChoiceCard, LearningSteps, StatusTag } from "./ui-kit";

type GalleryCopy = {
  title: string; subtitle: string; intro: string; colors: string; type: string;
  controls: string; choice: string; sequence: string; fields: string; visual: string;
  normal: string; secondary: string; quiet: string; danger: string; disabled: string;
  selected: string; unselected: string; description: string; field: string;
  placeholder: string; tokenNames: string[]; steps: string[]; lang: string; units: string[];
};

const names: Record<BrandLanguage, GalleryCopy> = {
  ar: { title: "مساحة التصميم", subtitle: "لغة واجهة بركار", intro: "نظام هادئ يساعد الطفل على التوقّع والتجربة والتفسير، ويمنح وليّ الأمر دليلًا واضحًا على ما حدث.", colors: "الألوان", type: "الخطوط والمسافات", controls: "الأزرار والحالات", choice: "بطاقات الاختيار", sequence: "خطوات التعلّم", fields: "حقول الكتابة", visual: "المعالجة البصرية", normal: "افتح المختبر", secondary: "تابع التعلّم", quiet: "عرض التفاصيل", danger: "إعادة المحاولة", disabled: "غير متاح الآن", selected: "جسر مثلث", unselected: "جسر بسيط", description: "اختر فكرة قبل بدء التجربة", field: "توقّعي", placeholder: "أظن أن... لأن...", tokenNames: ["الحبر", "الورق", "التعلّم", "الاستكشاف", "التحدّي", "الأخضر العميق"], steps: ["توقّع", "جرّب", "اشرح"], lang: "العربية", units: ["ألوان وظيفية، لا زينة", "4 / 8 / 12 / 16 / 24 / 32 / 48", "حدود خفيفة، مساحات مريحة"] },
  en: { title: "Design space", subtitle: "BRKAR interface language", intro: "A calm interface that helps a child predict, test and explain, while giving a parent clear evidence of what happened.", colors: "Color", type: "Type and spacing", controls: "Buttons and states", choice: "Choice cards", sequence: "Learning steps", fields: "Writing fields", visual: "Visual treatment", normal: "Open the lab", secondary: "Keep learning", quiet: "View details", danger: "Try again", disabled: "Unavailable now", selected: "Triangular bridge", unselected: "Simple bridge", description: "Choose an idea before you test", field: "My prediction", placeholder: "I think... because...", tokenNames: ["Ink", "Paper", "Learning", "Exploration", "Challenge", "Deep green"], steps: ["Predict", "Test", "Explain"], lang: "English", units: ["Functional colors, used with intent", "4 / 8 / 12 / 16 / 24 / 32 / 48", "Light borders, generous space"] },
  fr: { title: "Espace design", subtitle: "Langage d’interface BRKAR", intro: "Une interface calme qui invite l’enfant à prévoir, tester et expliquer, avec des repères clairs pour les parents.", colors: "Couleurs", type: "Typographie et espacements", controls: "Boutons et états", choice: "Cartes de choix", sequence: "Étapes d’apprentissage", fields: "Champs de rédaction", visual: "Traitement visuel", normal: "Ouvrir l’atelier", secondary: "Continuer", quiet: "Voir les détails", danger: "Réessayer", disabled: "Indisponible", selected: "Pont triangulé", unselected: "Pont simple", description: "Choisis une idée avant l’essai", field: "Ma prédiction", placeholder: "Je pense que… parce que…", tokenNames: ["Encre", "Papier", "Apprentissage", "Exploration", "Défi", "Vert profond"], steps: ["Prévoir", "Tester", "Expliquer"], lang: "Français", units: ["Couleurs fonctionnelles et mesurées", "4 / 8 / 12 / 16 / 24 / 32 / 48", "Contours légers, espace généreux"] },
};

const swatches = [
  ["--ink", "#151515"], ["--paper", "#F7F7F2"], ["--learn", "#39DD59"],
  ["--explore", "#FFC107"], ["--challenge", "#FF164D"], ["--deep", "#173E2B"],
] as const;

export default function DesignSystemGallery() {
  const [params, setParams] = useSearchParams();
  const requested = params.get("lang");
  const language: BrandLanguage = requested === "en" || requested === "fr" ? requested : "ar";
  const dir = language === "ar" ? "rtl" : "ltr";
  const copy = names[language];
  const [selected, setSelected] = useState("truss");
  const [sampleChoice, setSampleChoice] = useState("");
  const [sampleSaved, setSampleSaved] = useState(false);
  const [saved, setSaved] = useState(false);
  const text = (value: string | string[]) => Array.isArray(value) ? value.join(" ") : value;

  return (
    <Shell language={language}>
      <main className="wrap ds-page" lang={language} dir={dir}>
        <header className="ds-hero">
          <div>
            <p className="eyebrow">{text(copy.subtitle)}</p>
            <h1>{text(copy.title)}</h1>
            <p>{text(copy.intro)}</p>
          </div>
        <div className="ds-language" role="group" aria-label={language === "ar" ? "اختيار اللغة" : language === "fr" ? "Choisir la langue" : "Choose language"}>
            {(["ar", "en", "fr"] as BrandLanguage[]).map((item) => (
              <button key={item} type="button" lang={item} aria-pressed={language === item} onClick={() => setParams({ lang: item }, { replace: true })}>
                {names[item].lang}
              </button>
            ))}
          </div>
        </header>

        <section className="ds-activity" aria-labelledby="ds-activity-title">
          <header className="ds-activity-head">
            <div><StatusTag tone="explore">{language === "ar" ? "عينة تصميمية" : language === "fr" ? "Exemple de design" : "Design specimen"}</StatusTag><span>{language === "ar" ? "المحطة ١ من ٤" : language === "fr" ? "Étape 1 sur 4" : "Station 1 of 4"}</span></div>
            <ol aria-hidden="true"><li className="current"/><li/><li/><li/></ol>
          </header>
          <div className="ds-activity-main">
            <div className="ds-activity-art"><img src="/assets/brkar-paper-workshop.png" alt={language === "ar" ? "تجربة جسرين من الورق فوق مجرى ماء" : language === "fr" ? "Deux ponts en papier au-dessus d’un cours d’eau" : "Two paper bridges over a paper stream"} /></div>
            <div className="ds-activity-copy">
              <p className="ds-activity-kicker">{language === "ar" ? "تحدّي هندسي" : language === "fr" ? "Défi d’ingénierie" : "Engineering prompt"}</p>
              <h2 id="ds-activity-title">{language === "ar" ? "أي جسر يحمل أكثر؟" : language === "fr" ? "Quel pont porte le plus ?" : "Which bridge holds more?"}</h2>
              <p>{language === "ar" ? "لاحظ شكل الجسرين، واختر توقعك قبل أن تبدأ تجربة ورقية بسيطة مع شخص بالغ." : language === "fr" ? "Observe les deux formes et choisis une prédiction avant un petit essai avec un adulte." : "Look closely at both bridges. Choose a prediction before a simple paper test with an adult."}</p>
              <div className="ds-activity-choices" role="group" aria-label={language === "ar" ? "اختر توقعك" : language === "fr" ? "Choisis ta prédiction" : "Choose your prediction"}>
                <ChoiceCard title={language === "ar" ? "الجسر المسطّح" : language === "fr" ? "Le pont plat" : "Flat bridge"} selected={sampleChoice === "flat"} onClick={() => { setSampleChoice("flat"); setSampleSaved(false); }} />
                <ChoiceCard title={language === "ar" ? "الجسر المثلّث" : language === "fr" ? "Le pont triangulé" : "Triangular bridge"} selected={sampleChoice === "truss"} onClick={() => { setSampleChoice("truss"); setSampleSaved(false); }} />
              </div>
              <div className="ds-weight-row" aria-label={language === "ar" ? "أثقال التجربة" : language === "fr" ? "Poids d’essai" : "Test weights"}>
                <span>{language === "ar" ? "أثقال ورقية" : language === "fr" ? "Poids en papier" : "Paper weights"}</span>
                {[1, 2, 3].map((weight) => <b dir="ltr" key={weight}>{language === "ar" ? ["١", "٢", "٣"][weight - 1] : weight}</b>)}
              </div>
              <ActionButton variant="primary" disabled={!sampleChoice} onClick={() => setSampleSaved(true)}>{language === "ar" ? "سجّل توقّعك" : language === "fr" ? "Enregistrer ma prédiction" : "Save my prediction"}</ActionButton>
              {sampleSaved && <p className="ds-activity-feedback" role="status">{language === "ar" ? "حُفظ التوقع في هذه المعاينة. لم يبدأ اختبار النتيجة." : language === "fr" ? "Prédiction notée dans cet aperçu. Le test n’a pas encore commencé." : "Prediction noted in this preview. No test result has been simulated."}</p>}
            </div>
          </div>
          <div className="ds-activity-steps">
            <LearningSteps label={language === "ar" ? "تسلسل التعلّم" : language === "fr" ? "Étapes d’apprentissage" : "Learning sequence"} steps={[
              { title: language === "ar" ? "لاحظ" : language === "fr" ? "Observer" : "Notice" },
              { title: language === "ar" ? "توقّع" : language === "fr" ? "Prévoir" : "Predict" },
              { title: language === "ar" ? "جرّب" : language === "fr" ? "Tester" : "Test" },
              { title: language === "ar" ? "اشرح" : language === "fr" ? "Expliquer" : "Explain" },
            ]} />
          </div>
        </section>

        <section className="ds-section" aria-labelledby="ds-colors">
          <div className="ds-section-heading"><span>01</span><h2 id="ds-colors">{text(copy.colors)}</h2><p>{text(copy.units[0])}</p></div>
          <div className="ds-swatches">
            {swatches.map(([token, value], index) => <div className="ds-swatch" key={token}>
              <span className="ds-swatch__color" style={{ backgroundColor: `var(${token})` }} />
              <b>{copy.tokenNames[index]}</b><code dir="ltr">{value}</code>
            </div>)}
          </div>
        </section>

        <section className="ds-section ds-two-column" aria-labelledby="ds-type">
          <div>
            <div className="ds-section-heading"><span>02</span><h2 id="ds-type">{text(copy.type)}</h2><p>{text(copy.units[1])}</p></div>
            <div className="ds-type-sample"><span>Display / 40</span><h2>{language === "ar" ? "كل فكرة تستحق تجربة" : language === "fr" ? "Chaque idée mérite un essai" : "Every idea deserves a try"}</h2></div>
            <div className="ds-type-sample"><span>Body / 16</span><p>{text(copy.intro)}</p></div>
          </div>
          <div className="ds-paper-asset">
            <img src="/assets/brkar-paper-workshop.png" alt="" />
            <div><b>{text(copy.visual)}</b><small>{language === "ar" ? "ورق ملموس، هندسة واضحة، بلا كتابة داخل الصورة." : language === "fr" ? "Papier tactile, géométrie claire, sans texte intégré." : "Tactile paper, clear geometry, no baked-in text."}</small></div>
          </div>
        </section>

        <section className="ds-section" aria-labelledby="ds-controls">
          <div className="ds-section-heading"><span>03</span><h2 id="ds-controls">{text(copy.controls)}</h2><p>{text(copy.units[2])}</p></div>
          <div className="ds-control-row">
            <ActionLink to={`/missions?lang=${language}`}>{text(copy.normal)}</ActionLink>
            <ActionButton variant="secondary" onClick={() => setSelected("truss")}>{text(copy.secondary)}</ActionButton>
            <ActionButton variant="quiet" onClick={() => setSelected("flat")}>{text(copy.quiet)}</ActionButton>
            <ActionButton variant="danger" onClick={() => setSelected("")}>{text(copy.danger)}</ActionButton>
            <ActionButton disabled variant="secondary">{text(copy.disabled)}</ActionButton>
          </div>
        </section>

        <section className="ds-section ds-two-column" aria-labelledby="ds-choice">
          <div>
            <div className="ds-section-heading"><span>04</span><h2 id="ds-choice">{text(copy.choice)}</h2><p>{text(copy.description)}</p></div>
            <div className="ds-choice-list" role="group" aria-label={text(copy.choice)}>
              <ChoiceCard title={text(copy.unselected)} description={text(copy.description)} selected={selected === "flat"} onClick={() => setSelected("flat")} />
              <ChoiceCard title={text(copy.selected)} description={text(copy.description)} selected={selected === "truss"} onClick={() => setSelected("truss")} />
              <ChoiceCard title={text(copy.disabled)} selected={false} disabled />
            </div>
          </div>
          <div>
            <div className="ds-section-heading"><span>05</span><h2>{text(copy.sequence)}</h2><p>{language === "ar" ? "اتجاه القراءة يتبع اللغة تلقائيًا." : language === "fr" ? "Le sens de lecture suit la langue." : "Reading direction follows the language."}</p></div>
            <LearningSteps label={text(copy.sequence)} steps={copy.steps.map((title, index) => ({ title, state: index === 0 ? "done" : index === 1 ? "current" : "upcoming" }))} />
          </div>
        </section>

        <section className="ds-section ds-form-showcase" aria-labelledby="ds-fields">
          <div className="ds-section-heading"><span>06</span><h2 id="ds-fields">{text(copy.fields)}</h2><p>{language === "ar" ? "مساحة كافية لصوت الطفل، مع تلميح يساعده على البدء." : language === "fr" ? "De la place pour la voix de l’enfant, avec une amorce utile." : "Room for a child’s own words, with a gentle prompt."}</p></div>
          <label className="ds-field"><span>{text(copy.field)}</span><textarea placeholder={text(copy.placeholder)} rows={3} /></label>
          <div className="ds-form-footer"><StatusTag tone={saved ? "learn" : "neutral"}>{saved ? (language === "ar" ? "حُفظت الفكرة تجريبيًا" : language === "fr" ? "Idée enregistrée (aperçu)" : "Saved in preview") : (language === "ar" ? "حفظ محلي تجريبي" : language === "fr" ? "Aperçu de sauvegarde locale" : "Local-save preview")}</StatusTag><ActionButton variant="primary" onClick={() => setSaved(true)}>{saved ? (language === "ar" ? "تم الحفظ" : language === "fr" ? "Enregistré" : "Saved") : (language === "ar" ? "احفظ الفكرة" : language === "fr" ? "Enregistrer l’idée" : "Save the idea")}</ActionButton></div>
        </section>
      </main>
    </Shell>
  );
}
