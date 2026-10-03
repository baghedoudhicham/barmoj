import { useState } from "react";
import { ArrowLeft, BookOpenCheck, CircleHelp } from "lucide-react";
import { Link } from "react-router-dom";
import { Shell } from "./components";

type Language = "ar" | "en" | "fr";
type Copy = { title: string; challenge: string; transfer: string };
type Mission = {
  number: string;
  lab?: string;
  ar: Copy;
  en: Copy;
  fr: Copy;
};

const languageNames: Record<Language, string> = {
  ar: "العربية",
  en: "English",
  fr: "Français",
};

const focusLabels: Record<Language, string> = {
  ar: "ما نمارسه",
  en: "Skill we practice",
  fr: "Capacité exercée",
};

const cardLabels: Record<
  Language,
  { challenge: string; transfer: string; available: string; planned: string; open: string }
> = {
  ar: {
    challenge: "التحدي",
    transfer: "انقل الفكرة إلى الحياة اليومية",
    available: "مختبر تفاعلي",
    planned: "خطة منهجية",
    open: "افتح المختبر",
  },
  en: {
    challenge: "Challenge",
    transfer: "Transfer to everyday life",
    available: "Interactive lab",
    planned: "Curriculum plan",
    open: "Open the lab",
  },
  fr: {
    challenge: "Défi",
    transfer: "Transfert au quotidien",
    available: "Laboratoire interactif",
    planned: "Étape du parcours",
    open: "Ouvrir le labo",
  },
};

const familyValues: Record<
  Language,
  { title: string; intro: string; items: { name: string; practice: string }[] }
> = {
  ar: {
    title: "قيم نمارسها معًا",
    intro: "دعوة عائلية للتأمل، لا نقاطًا تُجمع ولا اختبارًا لقيمة الطفل.",
    items: [
      { name: "الصدق · Ṣidq", practice: "صف ما لاحظته، وافصل الدليل عن التخمين." },
      { name: "الأمانة · Amānah", practice: "احمِ معلومات الآخرين، ولا تشارك بياناتك الخاصة مع أداة لا تعرفها." },
      { name: "الصبر · Ṣabr", practice: "خذ وقتك؛ قد يقترح الخطأ اختبارًا جديدًا، ولا يحدد قيمتك." },
      { name: "الشورى · Shūrā", practice: "استمع إلى رأي آخر، وناقش الفكرة مع الأسرة." },
      { name: "الإحسان · Iḥsān", practice: "حسّن الحل بعناية، وفكّر بمن قد يتأثر به." },
    ],
  },
  en: {
    title: "Values we practice together",
    intro: "A family reflection, not points to earn or a test of a child’s worth.",
    items: [
      { name: "Truthfulness · Ṣidq", practice: "Describe what you observed; separate evidence from guesses." },
      { name: "Trust · Amānah", practice: "Protect others’ information; don’t share personal details with unfamiliar tools." },
      { name: "Patience · Ṣabr", practice: "Take your time. A mistake can suggest a new test and does not define you." },
      { name: "Consultation · Shūrā", practice: "Listen to another perspective and discuss the idea together." },
      { name: "Careful excellence · Iḥsān", practice: "Improve the solution with care and think about who may be affected." },
    ],
  },
  fr: {
    title: "Des valeurs à pratiquer ensemble",
    intro: "Une invitation à réfléchir en famille, pas des points à gagner ni une mesure de l’enfant.",
    items: [
      { name: "Vérité · ṣidq", practice: "Décris ce que tu as observé; distingue les faits des suppositions." },
      { name: "Responsabilité · amānah", practice: "Protège les informations d’autrui et ne partage pas de données personnelles avec un outil inconnu." },
      { name: "Patience · ṣabr", practice: "Prends ton temps. Une erreur peut suggérer un nouveau test et ne te définit pas." },
      { name: "Consultation · shūrā", practice: "Écoute un autre point de vue et discute de l’idée avec ta famille." },
      { name: "Bien agir · iḥsān", practice: "Améliore la solution avec soin et pense aux personnes concernées." },
    ],
  },
};

const skillFocus: Record<Language, string[]> = {
  ar: [
    "انتقاء الأدلة وتجاهل المشتتات",
    "التسلسل والتخطيط وتذكّر الهدف",
    "تمثيل العلاقات بين المدخلات والقواعد والنتائج",
    "تمييز الأنماط واختبار القاعدة",
    "التفكير الشرطي وملاحظة التعارض",
    "اختبار الحالات الطرفية والمعلومات غير الموثوقة",
    "الاستدلال السببي والتنقيح وإعادة التخطيط",
    "التجريد ورصد الآثار غير المقصودة",
    "صياغة هدف وقيود واضحة عند استخدام أدوات AI",
    "التحقق والأمثلة المضادة والتعبير عن عدم اليقين",
    "الإبداع والاختيار لمشكلة ذات معنى",
    "التأمل في طريقة التعلّم ونقل الفكرة",
  ],
  en: [
    "Selecting useful clues and ignoring distraction",
    "Sequencing, planning and keeping a goal in mind",
    "Representing relations between inputs, rules and outcomes",
    "Recognizing patterns and testing a rule",
    "Conditional reasoning and noticing conflicts",
    "Testing edge cases and unreliable information",
    "Cause-and-effect reasoning, debugging and replanning",
    "Abstraction and noticing unintended effects",
    "Stating clear goals and constraints when using AI tools",
    "Verification, counterexamples and expressing uncertainty",
    "Creativity and choosing a meaningful problem",
    "Reflecting on learning and transferring an idea",
  ],
  fr: [
    "Sélectionner les indices utiles et ignorer les distractions",
    "Ordonner, planifier et garder un objectif en tête",
    "Représenter les relations entre entrées, règles et résultats",
    "Reconnaître des motifs et tester une règle",
    "Raisonner avec des conditions et repérer les conflits",
    "Tester les cas limites et les informations peu fiables",
    "Raisonner sur les causes, déboguer et refaire un plan",
    "Abstraire et repérer les effets inattendus",
    "Formuler des objectifs et contraintes clairs avec l’IA",
    "Vérifier, chercher des contre-exemples et exprimer l’incertitude",
    "Créer et choisir un problème qui a du sens",
    "Réfléchir à son apprentissage et transférer une idée",
  ],
};

const missions: Mission[] = [
  {
    number: "01",
    ar: { title: "راقب قبل أن تحل", challenge: "ضاع روبوت توصيل في محطة. أمامك خريطة فيها إشارات كثيرة. أيّ ثلاثة أدلّة يحتاجها ليصل إلى الصندوق، وما التفصيل الذي يمكنه تجاهله؟", transfer: "ما الإشارات التي تساعدك على إيجاد كتاب في مكان مزدحم؟" },
    en: { title: "Observe before solving", challenge: "A delivery robot is lost in a station. The map has many signals. Which three clues does it need to reach the package, and which detail can it ignore?", transfer: "Which clues help you find a book in a busy place?" },
    fr: { title: "Observer avant de résoudre", challenge: "Un robot-livreur s’est perdu dans une gare. La carte contient beaucoup d’indices. Quels trois indices lui faut-il pour atteindre le colis, et quel détail peut-il ignorer ?", transfer: "Quels indices t’aident à trouver un livre dans un endroit encombré ?" },
  },
  {
    number: "02",
    lab: "/mission/routing",
    ar: { title: "حوّل الفوضى إلى خطوات", challenge: "رتّب ثلاث زيارات لتصل الشحنة العاجلة إلى A أولًا، ثم تزور B وC. ارسم خطتك قبل تشغيلها.", transfer: "كيف ترتّب حقيبتك إذا كان عليك أخذ ثلاثة أشياء قبل الخروج؟" },
    en: { title: "Turn a tangle into steps", challenge: "Order three stops so the urgent package reaches A first, then visit B and C. Draw your plan before you run it.", transfer: "How would you pack your bag if you had to remember three things before leaving?" },
    fr: { title: "Transformer le désordre en étapes", challenge: "Organise trois étapes pour que le colis urgent arrive d’abord en A, puis visite B et C. Dessine ton plan avant de le lancer.", transfer: "Comment préparerais-tu ton sac si tu devais penser à trois choses avant de partir ?" },
  },
  {
    number: "03",
    ar: { title: "ارسم نظامًا", challenge: "ارسم نظام خزان ماء: ما الذي يدخل إليه؟ ما القاعدة التي يتبعها؟ ما الحالة التي تتغير؟ وما النتيجة التي نراها؟", transfer: "مثّل مصباحًا يضيء عندما يدخل أحد الغرفة." },
    en: { title: "Draw a system", challenge: "Draw a water-tank system: what goes in, what rule does it follow, what state changes, and what result can we see?", transfer: "Model a light that turns on when someone enters a room." },
    fr: { title: "Dessiner un système", challenge: "Dessine un système de réservoir : qu’est-ce qui y entre, quelle règle suit-il, quel état change et quel résultat peut-on observer ?", transfer: "Représente une lampe qui s’allume quand quelqu’un entre dans une pièce." },
  },
  {
    number: "04",
    ar: { title: "ابحث عن النمط", challenge: "تتكرر مكافآت لعبة وفق قاعدة غير مكتوبة. راقب خمس جولات، ثم اقترح القاعدة وتوقّع الجولة التالية.", transfer: "أين ترى نمطًا يتكرر خلال يومك؟ ما الذي قد يغيّره؟" },
    en: { title: "Find the pattern", challenge: "A game’s rewards follow an unwritten rule. Watch five turns, suggest the rule, then predict the next turn.", transfer: "Where do you notice a pattern in your day? What might change it?" },
    fr: { title: "Trouver le motif", challenge: "Les récompenses d’un jeu suivent une règle non écrite. Observe cinq tours, propose la règle, puis prédis le suivant.", transfer: "Quel motif remarques-tu dans ta journée ? Qu’est-ce qui pourrait le changer ?" },
  },
  {
    number: "05",
    lab: "/mission/traffic",
    ar: { title: "ماذا لو؟", challenge: "اختر قاعدة لإشارة المرور: إذا كان اتجاه واحد أخضر، فما لون الاتجاه المتقاطع؟ ماذا يجب أن يحدث إذا طُلب الأخضر للاتجاهين؟", transfer: "اذكر قرارًا يوميًا يتغير إذا تغيّر الطقس." },
    en: { title: "What if?", challenge: "Choose a traffic-light rule: if one direction is green, what should the crossing direction show? What should happen if both directions request green?", transfer: "Name an everyday decision that changes when the weather changes." },
    fr: { title: "Et si… ?", challenge: "Choisis une règle pour les feux : si une direction est verte, quelle couleur doit avoir la direction qui la croise ? Que faire si les deux demandent le vert ?", transfer: "Cite une décision du quotidien qui change avec la météo." },
  },
  {
    number: "06",
    lab: "/mission/water",
    ar: { title: "اكسر النظام بأمان", challenge: "أوقف المضخة عند 80%. جرّب النظام بحساس عادي ثم بحساس يعطي قراءة خاطئة. ماذا يحدث، وما المعلومة التي تثق بها؟", transfer: "كيف تتحقق من معلومة إذا كان المصدر قد يخطئ؟" },
    en: { title: "Break the system safely", challenge: "Stop the pump at 80%. Test the system with a normal sensor and one that reports the wrong level. What happens, and which information can you trust?", transfer: "How could you check information when its source might be wrong?" },
    fr: { title: "Mettre le système à l’épreuve", challenge: "Arrête la pompe à 80 %. Teste le système avec un capteur normal, puis avec un capteur qui indique un niveau erroné. Que se passe-t-il et quelle information peux-tu croire ?", transfer: "Comment vérifier une information si sa source peut se tromper ?" },
  },
  {
    number: "07",
    ar: { title: "أصلح السبب", challenge: "أُغلق الطريق بين A وB. غيّر خطتك لتصل الشحنة العاجلة إلى A أولًا، ثم إلى B عبر C. ما الدليل أن خطتك الجديدة تعمل؟", transfer: "عندما يتغيّر موعد أو طريق، كيف تختار ما يجب تغييره أولًا؟" },
    en: { title: "Fix the cause", challenge: "The road between A and B is closed. Change your plan so the urgent package reaches A first and then B through C. What evidence shows your new plan works?", transfer: "When a time or route changes, how do you decide what to change first?" },
    fr: { title: "Corriger la cause", challenge: "La route entre A et B est fermée. Modifie ton plan pour que le colis urgent arrive d’abord en A, puis atteigne B en passant par C. Quelle preuve montre que ton nouveau plan fonctionne ?", transfer: "Quand un horaire ou un trajet change, comment décides-tu quoi modifier en premier ?" },
  },
  {
    number: "08",
    lab: "/mission/economy",
    ar: { title: "اجعل النظام أبسط", challenge: "تبدأ اللعبة بعشرة موارد. تدفع ثلاثة في كل جولة وتكسب مكافأة. اختر قاعدة تكافئ اللعب دون أن تجعل الموارد تزيد بلا حد أو تنفد.", transfer: "كيف تساعدك قاعدة بسيطة على تنظيم شيء تفعله كل يوم؟" },
    en: { title: "Make the system simpler", challenge: "A game starts with ten resources. Each turn costs three and earns a reward. Choose a rule that keeps play going without making resources grow forever or run out.", transfer: "How could a simple rule help you organize something you do every day?" },
    fr: { title: "Simplifier le système", challenge: "Un jeu commence avec dix ressources. Chaque tour en coûte trois et rapporte une récompense. Choisis une règle qui permet de continuer sans faire croître les ressources sans fin ni les épuiser.", transfer: "Comment une règle simple pourrait-elle t’aider à organiser une activité quotidienne ?" },
  },
  {
    number: "09",
    ar: { title: "دع الذكاء الاصطناعي يقترح", challenge: "تخيّل أنك طلبت من مساعد ذكي اقتراح حل. حدّد له هدفك وقيدين مهمين. ما الذي يجب أن توضحه قبل أن تقيّم اقتراحه؟", transfer: "ما الذي لا ينبغي أن تشاركه مع أداة لا تعرفها؟" },
    en: { title: "Ask AI to suggest", challenge: "Imagine you asked an AI helper for an idea. Give it your goal and two important constraints. What does it need to know before you can judge its suggestion?", transfer: "What should you avoid sharing with a tool you do not know?" },
    fr: { title: "Demander une proposition à l’IA", challenge: "Imagine que tu demandes une idée à un assistant d’IA. Donne-lui ton objectif et deux contraintes importantes. Que doit-il savoir avant que tu puisses évaluer sa proposition ?", transfer: "Qu’est-ce qu’il vaut mieux ne pas partager avec un outil que tu ne connais pas ?" },
  },
  {
    number: "10",
    ar: { title: "اختبر اقتراح الذكاء الاصطناعي", challenge: "يقول اقتراح جاهز: «المضخة تتوقف دائمًا عند الحد». صمّم اختبارًا قد يبيّن أن كلمة «دائمًا» غير صحيحة. ما الدليل الذي تحتاجه؟", transfer: "عندما تسمع ادعاءً جديدًا، ما السؤال الذي يساعدك على التحقق منه؟" },
    en: { title: "Test an AI suggestion", challenge: "A prepared suggestion says, “The pump always stops at the limit.” Design a test that could show whether “always” is wrong. What evidence do you need?", transfer: "When you hear a new claim, what question could help you check it?" },
    fr: { title: "Vérifier une proposition de l’IA", challenge: "Une proposition préparée affirme : « La pompe s’arrête toujours à la limite. » Imagine un test qui pourrait montrer que « toujours » est faux. De quelles preuves as-tu besoin ?", transfer: "Quand tu entends une nouvelle affirmation, quelle question peut t’aider à la vérifier ?" },
  },
  {
    number: "11",
    ar: { title: "ابنِ نظامك", challenge: "اختر شيئًا يهمك — لعبة أو نباتًا أو طريقًا أو فكرة أخرى. صمّم نظامًا صغيرًا له هدف وقاعدة واختبار واحد.", transfer: "ما الفكرة التي تحب أن تحوّلها إلى مشروع في المرة القادمة؟" },
    en: { title: "Build a system of your own", challenge: "Choose something you care about—a game, a plant, a route or another idea. Design a small system with one goal, one rule and one test.", transfer: "What idea would you like to turn into a project next time?" },
    fr: { title: "Construire ton propre système", challenge: "Choisis un sujet qui te tient à cœur — un jeu, une plante, un trajet ou une autre idée. Imagine un petit système avec un objectif, une règle et un test.", transfer: "Quelle idée aimerais-tu transformer en projet la prochaine fois ?" },
  },
  {
    number: "12",
    ar: { title: "اشرح قراراتك", challenge: "اختر تجربة من مسارك. اشرح هدفك وتوقعك وما الذي غيّرته والدليل الذي أقنعك. ثم فكّر: ما الذي سيتغير في حالة جديدة؟", transfer: "ما السؤال الذي ستطرحه على نفسك قبل حل مشكلة جديدة؟" },
    en: { title: "Explain your decisions", challenge: "Choose an experiment from your path. Explain your goal, prediction, what you changed and what evidence convinced you. Then ask: what would change in a new situation?", transfer: "What question will you ask yourself before solving a new problem?" },
    fr: { title: "Expliquer tes choix", challenge: "Choisis une expérience de ton parcours. Explique ton objectif, ta prédiction, ce que tu as changé et la preuve qui t’a convaincu. Puis demande-toi : que faudrait-il modifier dans une nouvelle situation ?", transfer: "Quelle question te poseras-tu avant de résoudre un nouveau problème ?" },
  },
];

export function CurriculumPage() {
  const [language, setLanguage] = useState<Language>("ar");
  return (
    <Shell>
      <main className="wrap curriculum-page">
        <header className="curriculum-hero">
          <div>
            <p className="eyebrow">المسار الأول · فكّر كنظام</p>
            <h1>منهج كامل، بخطوات يمكن نقلها.</h1>
            <p>اثنتا عشرة مهمة لتدريب الملاحظة والتخطيط والتنبؤ والاختبار والتفسير. التجربة قصيرة ويمكن التوقف والعودة إليها في أي وقت.</p>
          </div>
          <div className="curriculum-count">
            <BookOpenCheck size={28} aria-hidden="true" />
            <b>12</b>
            <span>مهمة في المسار</span>
          </div>
        </header>

        <section className="curriculum-language" aria-label="لغة محتوى المنهج">
          <div>
            <b>اختر لغة التحديات</b>
            <span>تتغير لغة محتوى المهمات؛ تبقى واجهة التجربة الحالية بالعربية.</span>
          </div>
          <div className="language-tabs" role="group" aria-label="لغة المنهج">
            {(Object.keys(languageNames) as Language[]).map((item) => (
              <button
                type="button"
                className={language === item ? "selected" : ""}
                aria-pressed={language === item}
                key={item}
                onClick={() => setLanguage(item)}
              >
                {languageNames[item]}
              </button>
            ))}
          </div>
        </section>

        <p className="curriculum-release-note">أربع مهمات لها مختبرات تفاعلية الآن. بقية المهمات موضحة هنا كمنهج وخطوات عائلية، وستُبنى وتُختبر على مراحل.</p>

        <section
          className="curriculum-grid"
          lang={language}
          dir={language === "ar" ? "rtl" : "ltr"}
          aria-label={languageNames[language]}
        >
          {missions.map((mission) => {
            const copy = mission[language];
            const focus = skillFocus[language][Number(mission.number) - 1];
            const labels = cardLabels[language];
            return (
              <article className={mission.lab ? "curriculum-card has-lab" : "curriculum-card"} key={mission.number}>
                <header>
                  <span className="curriculum-number">{mission.number}</span>
                  <span className={mission.lab ? "lab-available" : "curriculum-plan"}>{mission.lab ? labels.available : labels.planned}</span>
                </header>
                <h2>{copy.title}</h2>
                <p className="curriculum-focus"><b>{focusLabels[language]}:</b> {focus}</p>
                <div className="curriculum-prompt">
                  <b>{labels.challenge}</b>
                  <p>{copy.challenge}</p>
                </div>
                <div className="curriculum-transfer">
                  <b>{labels.transfer}</b>
                  <p>{copy.transfer}</p>
                </div>
                {mission.lab && <Link className="curriculum-lab-link" to={mission.lab}>{labels.open} <ArrowLeft size={16} aria-hidden="true" /></Link>}
              </article>
            );
          })}
        </section>

        <section className="family-guide">
          <div>
            <p className="eyebrow">دليل الأسرة</p>
            <h2>ساعده على التفكير، لا على تخمين الإجابة التي تريدها.</h2>
          </div>
          <div className="family-guide-prompt">
            <CircleHelp size={23} aria-hidden="true" />
            <div>
              <b>جرّب سؤالًا مفتوحًا</b>
              <p>ماذا توقعت؟ ما الذي غيّر رأيك؟ ما الاختبار التالي؟</p>
            </div>
          </div>
          <p>لا يوجد مؤقت أو ترتيب أو عقوبة على التوقف. يمكن للطفل أن يرسم أو يشير أو يشرح شفهيًا بدل الكتابة. الأدلة تصف ما ظهر في نشاط محدد؛ لا تقيس الذكاء ولا تشخّص الانتباه.</p>
          <Link to="/privacy">كيف تُحفظ بيانات التجربة؟</Link>
          <details
            className="family-values"
            lang={language}
            dir={language === "ar" ? "rtl" : "ltr"}
          >
            <summary>{familyValues[language].title}</summary>
            <div className="family-values-content">
              <p>{familyValues[language].intro}</p>
              <ul>
                {familyValues[language].items.map((item) => (
                  <li key={item.name}>
                    <b>{item.name}</b>
                    <span>{item.practice}</span>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </section>
      </main>
    </Shell>
  );
}
