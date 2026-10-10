import { Link, useSearchParams } from "react-router-dom";
import { Shell } from "./components";
import { BrandArrow, BrandMark, type BrandLanguage } from "./brand";

const copy = {
  ar: {
    eyebrow: "للأطفال 7–14 عامًا · مع الأسرة",
    title: ["لكل طفل طريقته.", "ولكل فكرة مساحة."],
    intro: "بِركار مساحة يتعلّم فيها الطفل كيف يفكّر: يسأل، يتوقّع، يجرّب، ثم يشرح ما اكتشفه. خطوة صغيرة، وفهم يبنيه بنفسه.",
    start: "ابدأ التجربة مع طفلك", curriculum: "اكتشف المنهج", scope: "4 مختبرات تفاعلية · المنهج وواجهة الأسرة بثلاث لغات",
    sheet: "سؤال من مختبر الماء", question: "كيف نحافظ على الماء؟", tank: "خزان الماء", limit: "حدّ الإيقاف", steps: [["لاحظ", "الماء يرتفع. ماذا يخبرنا الحساس؟"], ["توقّع", "عند 80%، هل تتوقف المضخة؟"], ["اختبر واشرح", "ماذا لو كانت قراءة الحساس خاطئة؟"]], mapTitle: "من الملاحظة إلى الفكرة", mapPrompt: "ماذا لو أخطأ الحساس؟", mapSteps: ["لاحظ", "توقّع", "اختبر", "اشرح"],
    methodLabel: "طريقة بِركار", methodTitle: "نعطي السؤال وقتًا.", methodBody: "يتدرّب الطفل على بناء تفسيره ومراجعته. يمكنه التوقف والعودة إلى تجربته، دون عدّ تنازلي أو سباق مع الآخرين.",
    method: [["اسأل قبل أن تجيب", "لاحظ ما تعرفه، وحدّد ما ينقصك قبل اختيار الحل."], ["جرّب قبل أن تجزم", "توقّع النتيجة، غيّر عاملًا واحدًا، وقارن بما حدث."], ["اشرح بطريقتك", "قل لماذا عدّلت فكرتك، وأين يمكنك استخدامها مرة أخرى."]],
    labsLabel: "المسار الأول · فكّر كنظام", labsTitle: "أفكار صغيرة. أسئلة تستحق التجربة.", labsBody: "أربع تجارب مفتوحة من مسار يضم 12 مهمة. بقية المهمات متاحة كأنشطة عائلية في المنهج، وتنتظر تطوير مختبراتها.", open: "افتح المختبر", labs: [["خزان لا يفيض", "قراءة واحدة أم حماية إضافية؟"], ["رتّب التوصيلات", "كيف تتغير الخطة إذا أُغلق طريق؟"], ["تقاطع آمن", "كيف نمنع قرارين متعارضين؟"], ["لعبة لا تنكسر", "كيف تغيّر قاعدة صغيرة نتيجة اللعبة؟"]],
    familyLabel: "للأهل", familyTitle: "افتحوا حوارًا، وشاهدوا أثره.", familyBody: "تحتفظ لوحة الأهل بتوقع الطفل، وتجربته، وتفسيره بكلماته. هي بداية لحوار عن طريقة التفكير، وليست حكمًا على ذكائه أو مقارنة بطفل آخر.", parent: "شاهد لوحة الأهل", familyPrompt: "سؤال بعد التجربة", prompt: "ما الذي غيّر رأيك؟ وكيف عرفت؟",
    valuesLabel: "تعلم له معنى", valuesTitle: "تفكير واعٍ، وقيم نعيشها.", valuesBody: "مصمّم لعائلات مسلمة في المنطقة: الأمانة في وصف ما حدث، العدل في القرارات، والإحسان في تحسين ما نبنيه. نناقشها من خلال مواقف وأسئلة، مع احترام دور الأسرة في التوجيه.", values: ["أمانة", "عدل", "إحسان"],
    pilotTitle: "ابدؤوا بمختبر واحد.", pilotBody: "تجربة بإشراف بالغ، بلا حساب أو دفع. تُحفظ الإجابات والتقدم في هذا المتصفح فقط. المختبرات التفاعلية وواجهة الطفل والبداية والخصوصية ولوحة الأهل متاحة بالعربية والإنجليزية والفرنسية.", privacy: "تفاصيل الخصوصية", pronunciation: "بِركار · تُنطق بيركار · أداة ترسم بها دوائر، وتفتح بها احتمالات.", language: "لغة التعريف بالمنصة",
    interestEyebrow: "للأهل · تجربة بِركار الأولى", interestTitle: "هل ترغبون في تجربة المساحة معنا؟", interestBody: "نحضّر لإطلاق محدود مع أسر عربية في المنطقة. عندما تفتح قائمة الاهتمام، سنطلب بريد وليّ الأمر فقط لإرسال تحديث عن التجربة. لا نحتاج اسم الطفل أو مدرسته أو إجاباته.", interestStatus: "قائمة الاهتمام قيد الإعداد", interestEmail: "بريد وليّ الأمر", interestPlaceholder: "name@example.com", interestConsent: "أوافق على تلقي تحديث عن تجربة بِركار", interestButton: "أبلغوني عند فتح التسجيل", interestClosed: "التسجيل لم يُفتح بعد. لن تُرسل أي بيانات من هذه الصفحة؛ سنفعّله بعد تجهيز وجهة خاصة للحفظ وخيارات واضحة للموافقة والحذف.", interestCta: "تابعوا فتح التسجيل", tryLab: "جرّبوا مختبرًا الآن",
  },
  en: {
    eyebrow: "For children aged 7–14 · with family",
    title: ["Every child has a way.", "Every idea needs room."],
    intro: "BRKAR is a space to learn how to think: ask, predict, test, and explain what you discover. Small steps. Understanding children build for themselves.",
    start: "Try it with your child", curriculum: "Explore the curriculum", scope: "4 interactive labs · curriculum and family pages in three languages",
    sheet: "A question from the water lab", question: "How do we protect our water?", tank: "Water tank", limit: "Stop level", steps: [["Observe", "The water rises. What does the sensor tell us?"], ["Predict", "At 80%, will the pump stop?"], ["Test and explain", "What if the sensor reading is wrong?"]], mapTitle: "From observation to an idea", mapPrompt: "What if the sensor is wrong?", mapSteps: ["Notice", "Predict", "Test", "Explain"],
    methodLabel: "The BRKAR approach", methodTitle: "Give a question time.", methodBody: "Children practise building and revising an explanation. They can pause and return to their experiment, without a countdown or a race against others.",
    method: [["Ask before answering", "Notice what you know and what is missing before choosing a solution."], ["Test before concluding", "Predict a result, change one thing, then compare it with what happened."], ["Explain in your own way", "Say why you changed your idea and where you could use it again."]],
    labsLabel: "First track · Think in systems", labsTitle: "Small ideas. Questions worth testing.", labsBody: "Four open experiments in a twelve-mission track. The other missions are available as family activities in the curriculum; their interactive labs are still to come.", open: "Choose a lab language", labs: [["A tank that stays safe", "One reading, or a second safeguard?"], ["Plan the deliveries", "How does a closed road change your plan?"], ["A safe junction", "How do we prevent conflicting decisions?"], ["A balanced game", "How does one small rule change the game?"]],
    familyLabel: "For parents", familyTitle: "Start a conversation. See what it reveals.", familyBody: "The parent dashboard keeps your child's prediction, experiment, and explanation in their own words. It starts a conversation about thinking, without ranking children or judging intelligence.", parent: "View the parent dashboard", familyPrompt: "A question after the experiment", prompt: "What changed your mind? How did you know?",
    valuesLabel: "Learning with meaning", valuesTitle: "Thoughtful choices. Values we practise.", valuesBody: "Designed for Muslim families across MENA: honesty in reporting what happened, fairness in decisions, and care in improving what we build. We explore these through situations and questions, with families guiding the conversation.", values: ["Honesty", "Fairness", "Care"],
    pilotTitle: "Begin with one lab.", pilotBody: "An adult-supervised pilot, with no account or payment. Answers and progress stay in this browser. The interactive labs, child space, setup, privacy page and parent dashboard are available in Arabic, English and French.", privacy: "Privacy details", pronunciation: "BRKAR · pronounced bir-kār · a drawing compass, with room to explore.", language: "Introduction language",
    interestEyebrow: "For parents · First BRKAR pilot", interestTitle: "Would you like to try this space with us?", interestBody: "We’re preparing a small pilot with Arabic-speaking families across the region. When the interest list opens, we’ll ask only for a parent or guardian’s email to send a pilot update. No child name, school, or answers are needed.", interestStatus: "Interest list in preparation", interestEmail: "Parent or guardian email", interestPlaceholder: "name@example.com", interestConsent: "I agree to receive an update about the BRKAR pilot", interestButton: "Notify me when it opens", interestClosed: "Sign-up is not open yet. This page sends no details; we’ll enable it after a private destination and clear consent and deletion choices are in place.", interestCta: "Follow the pilot opening", tryLab: "Try a lab now",
  },
  fr: {
    eyebrow: "Pour les enfants de 7 à 14 ans · en famille",
    title: ["À chaque enfant sa voie.", "À chaque idée son espace."],
    intro: "BRKAR est un espace pour apprendre à penser : questionner, prévoir, expérimenter et expliquer ses découvertes. De petits pas, une compréhension que l’enfant construit lui-même.",
    start: "Essayer avec votre enfant", curriculum: "Découvrir le programme", scope: "4 ateliers interactifs · parcours et pages famille en trois langues",
    sheet: "Une question de l’atelier de l’eau", question: "Comment préserver notre eau ?", tank: "Réservoir d’eau", limit: "Seuil d’arrêt", steps: [["Observer", "L’eau monte. Que nous indique le capteur ?"], ["Prévoir", "À 80 %, la pompe va-t-elle s’arrêter ?"], ["Tester et expliquer", "Et si le capteur se trompait ?"]], mapTitle: "De l’observation à l’idée", mapPrompt: "Et si le capteur se trompait ?", mapSteps: ["Observer", "Prévoir", "Tester", "Expliquer"],
    methodLabel: "L’approche BRKAR", methodTitle: "Prendre le temps de questionner.", methodBody: "L’enfant s’exerce à construire et revoir une explication. Il peut faire une pause puis reprendre son expérience, sans compte à rebours ni course avec les autres.",
    method: [["Questionner avant de répondre", "Observer ce que l’on sait et ce qui manque avant de choisir une solution."], ["Tester avant de conclure", "Prévoir un résultat, modifier un seul élément et comparer avec ce qui s’est passé."], ["Expliquer à sa manière", "Dire pourquoi on a changé d’idée et où on pourrait la réutiliser."]],
    labsLabel: "Premier parcours · Penser en systèmes", labsTitle: "De petites idées. Des questions à explorer.", labsBody: "Quatre expériences ouvertes dans un parcours de douze missions. Les autres sont proposées comme activités familiales dans le programme ; leurs ateliers interactifs restent à développer.", open: "Ouvrir l’atelier dans votre langue", labs: [["Un réservoir sûr", "Une mesure ou une protection supplémentaire ?"], ["Organiser les livraisons", "Comment une route fermée change-t-elle le plan ?"], ["Un carrefour sûr", "Comment éviter deux décisions contradictoires ?"], ["Un jeu équilibré", "Comment une petite règle change-t-elle le jeu ?"]],
    familyLabel: "Pour les parents", familyTitle: "Ouvrir le dialogue. Observer la démarche.", familyBody: "Le tableau des parents conserve la prévision, l’expérience et l’explication de l’enfant avec ses propres mots. Il invite à parler de sa démarche, sans classement ni jugement sur son intelligence.", parent: "Voir le tableau des parents", familyPrompt: "Une question après l’expérience", prompt: "Qu’est-ce qui t’a fait changer d’avis ? Comment l’as-tu su ?",
    valuesLabel: "Apprendre avec du sens", valuesTitle: "Réfléchir avec des valeurs vécues.", valuesBody: "Pensé pour les familles musulmanes de la région MENA : décrire les faits avec honnêteté, décider avec justice et améliorer avec soin. Ces valeurs prennent vie à travers des situations et des questions, guidées par la famille.", values: ["Honnêteté", "Justice", "Soin"],
    pilotTitle: "Commencer par un atelier.", pilotBody: "Un pilote accompagné par un adulte, sans compte ni paiement. Les réponses et la progression restent dans ce navigateur. Les laboratoires interactifs, l’espace enfant, la configuration, la confidentialité et le tableau des parents sont disponibles en arabe, anglais et français.", privacy: "Détails de confidentialité", pronunciation: "BRKAR · se prononce bir-kār · un compas pour tracer, et un espace pour explorer.", language: "Langue de présentation",
    interestEyebrow: "Pour les parents · Premier pilote BRKAR", interestTitle: "Envie d’explorer cet espace avec nous ?", interestBody: "Nous préparons un petit pilote avec des familles arabophones de la région. À l’ouverture de la liste, seul le courriel d’un parent ou tuteur sera demandé pour envoyer des nouvelles du pilote. Aucun nom d’enfant, école ou réponse n’est nécessaire.", interestStatus: "Liste d’intérêt en préparation", interestEmail: "Courriel du parent ou tuteur", interestPlaceholder: "name@example.com", interestConsent: "J’accepte de recevoir une nouvelle au sujet du pilote BRKAR", interestButton: "Me prévenir à l’ouverture", interestClosed: "Les inscriptions ne sont pas encore ouvertes. Cette page n’envoie aucune donnée ; nous activerons la liste après avoir défini un espace privé et des choix clairs de consentement et de suppression.", interestCta: "Suivre l’ouverture du pilote", tryLab: "Essayer un atelier",
  },
};

const labIds = ["water", "routing", "traffic", "economy"];

function LabSketch({ index }: { index: number }) {
  return <svg viewBox="0 0 120 90" fill="none" aria-hidden="true" focusable="false">
    {index === 0 && <><path d="M27 18v53h48V18M20 18h62M75 59h16V39h13" /><path className="sketch-fill" d="M28 44h46v26H28z" /><path strokeDasharray="4 4" d="M28 30h47" /><circle cx="99" cy="31" r="8" /></>}
    {index === 1 && <><path strokeDasharray="4 4" d="m21 64 35-41 43 37-43 10z" /><rect x="12" y="55" width="18" height="18" /><circle className="sketch-fill" cx="56" cy="23" r="10" /><circle cx="99" cy="60" r="10" /><circle cx="56" cy="70" r="10" /></>}
    {index === 2 && <><path d="M45 8v23H18v25h27v26h25V56h29V31H70V8" /><circle className="sketch-fill" cx="35" cy="23" r="7" /><circle cx="79" cy="64" r="7" /><path strokeDasharray="4 4" d="M57 8v75M16 43h84" /></>}
    {index === 3 && <><path d="M35 20h47l12 13m0-13v13H81M88 64H41L28 51m0 13V51h13" /><circle className="sketch-fill" cx="25" cy="33" r="14" /><circle cx="96" cy="53" r="14" /><path d="M19 33h12m-6-6v12M90 53h12" /></>}
  </svg>;
}

function ReasoningCompass({ language, c }: { language: BrandLanguage; c: typeof copy.ar }) {
  return <figure className="reasoning-board" aria-labelledby="reasoning-board-title">
    <div className="reasoning-board-heading"><span id="reasoning-board-title">{c.mapTitle}</span><span dir="ltr">01 — 04</span></div>
    <div className="reasoning-orbit" lang={language} dir={language === "ar" ? "rtl" : "ltr"}>
      <svg className="orbit-drawing" viewBox="0 0 460 360" fill="none" aria-hidden="true" focusable="false">
        <circle cx="230" cy="180" r="104" />
        <circle cx="230" cy="180" r="145" strokeDasharray="2 8" />
        <path d="M230 30v47m0 206v47M80 180h47m206 0h47M124 74l34 34m144 144 34 34m0-212-34 34M158 252l-34 34" />
        <path className="orbit-route" d="M230 42a138 138 0 0 1 127 86M368 180a138 138 0 0 1-86 127M230 318a138 138 0 0 1-127-86M92 180a138 138 0 0 1 86-127" />
        <path className="orbit-needle" d="m230 113 18 67-18 67-18-67 18-67Z" />
        <circle className="orbit-point" cx="230" cy="180" r="6" />
      </svg>
      <div className="orbit-step orbit-step-0"><span>01</span><b>{c.mapSteps[0]}</b></div>
      <div className="orbit-step orbit-step-1"><span>02</span><b>{c.mapSteps[1]}</b></div>
      <div className="orbit-step orbit-step-2"><span>03</span><b>{c.mapSteps[2]}</b></div>
      <div className="orbit-step orbit-step-3"><span>04</span><b>{c.mapSteps[3]}</b></div>
      <div className="orbit-center">
        <div className="orbit-tank"><LabSketch index={0}/><span dir="ltr">80%</span></div>
        <strong>{c.mapPrompt}</strong>
      </div>
    </div>
    <figcaption>{language === "ar" ? "لا توجد إجابة سريعة هنا؛ هناك فكرة نختبرها."
      : language === "fr" ? "Pas de réponse à toute vitesse : une idée à mettre à l’épreuve."
      : "No rush to answer. There’s an idea to test."}</figcaption>
  </figure>;
}

export function BrandHome() {
  const [params, setParams] = useSearchParams();
  const initial = params.get("lang");
  const language: BrandLanguage = initial === "en" || initial === "fr" ? initial : "ar";
  const c = copy[language];
  return <Shell language={language}>
    <main className="brand-home">
      <div className="wrap brand-language" role="group" aria-label={c.language}>
        {(["ar", "en", "fr"] as const).map((lang) => <button key={lang} lang={lang} aria-pressed={language === lang} onClick={() => setParams(lang === "ar" ? {} : {lang}, {replace: true})}>{ {ar:"العربية", en:"English", fr:"Français"}[lang] }</button>)}
      </div>
      <section className="wrap brand-hero">
        <div className="brand-hero-copy">
          <p className="brand-eyebrow">{c.eyebrow}</p>
          <h1>{c.title[0]}<br/> <span>{c.title[1]}</span></h1>
          <p className="brand-intro">{c.intro}</p>
          <div className="brand-actions"><Link className="button secondary" to={`/onboarding?lang=${language}`}>{c.tryLab}<BrandArrow/></Link><a className="brand-text-link" href="#interest">{c.interestCta}<BrandArrow/></a></div>
          <p className="brand-scope">{c.scope}</p>
        </div>
        <ReasoningCompass language={language} c={c}/>
      </section>
      <section className="brand-method wrap" id="method">
        <div className="brand-section-intro"><p className="brand-eyebrow">{c.methodLabel}</p><h2>{c.methodTitle}</h2><p>{c.methodBody}</p></div>
        <ol className="brand-method-list">{c.method.map(([title, body],i) => <li key={title}><span>0{i+1}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol>
      </section>
      <section className="brand-labs wrap" id="track">
        <div className="brand-section-intro"><p className="brand-eyebrow">{c.labsLabel}</p><h2>{c.labsTitle}</h2><p>{c.labsBody}</p></div>
        <div className="brand-lab-grid">{c.labs.map(([title,body],i) => <Link key={title} to={`/mission/${labIds[i]}?lang=${language}`} className={`brand-lab brand-lab-${i}`}><div className="brand-lab-sketch"><LabSketch index={i}/><span aria-hidden="true">0{i+1}</span></div><div className="brand-lab-copy"><h3>{title}</h3><p>{body}</p><span>{c.open}<BrandArrow/></span></div></Link>)}</div>
      </section>
      <section className="brand-family wrap" id="families">
        <div className="brand-section-intro"><p className="brand-eyebrow">{c.familyLabel}</p><h2>{c.familyTitle}</h2><p>{c.familyBody}</p><Link className="brand-text-link" to={`/parent?lang=${language}`}>{c.parent}<BrandArrow/></Link></div>
        <aside className="family-question"><span>{c.familyPrompt}</span><p>{c.prompt}</p><BrandMark/></aside>
      </section>
      <section className="brand-values wrap"><p className="brand-eyebrow">{c.valuesLabel}</p><h2>{c.valuesTitle}</h2><p>{c.valuesBody}</p><div>{c.values.map(v=><span key={v}>{v}</span>)}</div></section>
      <section className="brand-pilot wrap"><div><h2>{c.pilotTitle}</h2><p>{c.pilotBody}</p><Link className="brand-text-link" to={`/privacy?lang=${language}`}>{c.privacy}<BrandArrow/></Link></div><Link className="button secondary" to={`/onboarding?lang=${language}`}>{c.tryLab}<BrandArrow/></Link></section>
      <section className="brand-interest wrap" id="interest" aria-labelledby="interest-title">
        <div className="brand-interest-copy"><p className="brand-eyebrow">{c.interestEyebrow}</p><h2 id="interest-title">{c.interestTitle}</h2><p>{c.interestBody}</p><Link className="brand-text-link" to={`/privacy?lang=${language}`}>{c.privacy}<BrandArrow/></Link></div>
        <div className="interest-preview" aria-describedby="interest-closed">
          <div className="interest-preview-head"><span className="interest-status-dot" aria-hidden="true"/><span>{c.interestStatus}</span></div>
          <fieldset disabled>
            <label>{c.interestEmail}<input type="email" autoComplete="email" placeholder={c.interestPlaceholder} /></label>
            <label className="interest-consent"><input type="checkbox" />{c.interestConsent}</label>
            <button type="button" className="button secondary">{c.interestButton}<BrandArrow/></button>
          </fieldset>
          <p className="interest-closed" id="interest-closed">{c.interestClosed}</p>
        </div>
      </section>
      <p className="brand-pronunciation wrap">{c.pronunciation}</p>
    </main>
  </Shell>;
}
