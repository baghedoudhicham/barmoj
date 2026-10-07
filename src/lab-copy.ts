import type { BrandLanguage } from "./brand";
import { labs, type LabId, type Settings, type Trial } from "./lab-model";

export type LabLanguage = BrandLanguage;

export const languageNames: Record<LabLanguage, string> = {
  ar: "العربية",
  en: "English",
  fr: "Français",
};

type MissionWords = {
  title: string;
  goal: string;
  question: string;
  hint: string;
  prompt: string;
  transfer: string;
  outcomes: string[];
};

export const missionWords: Record<LabLanguage, Record<LabId, MissionWords>> = {
  ar: {
    water: {
      title: "خزان لا يفيض",
      goal: "املأ الخزان، وأوقف المضخة عند 80%. ماذا لو أخطأ الحساس؟",
      question: "أي معلومة تحتاجها كي توقف المضخة في الوقت المناسب؟",
      hint: "قارن مستوى الماء الحقيقي بقراءة الحساس. هل تثق بقراءة واحدة؟",
      prompt: "لماذا لم تكفِ القاعدة الأولى؟ استشهد بتجربة، ثم اشرح دور الحساس الاحتياطي.",
      transfer: "أين نحتاج مصدرًا ثانيًا للمعلومة في البيت؟",
      outcomes: ["المضخة تعمل", "المضخة متوقفة"],
    },
    routing: {
      title: "رتّب التوصيلات",
      goal: "أوصل الدواء إلى A أولًا، ثم زر B وC مرة واحدة. عند إغلاق طريق A–B، تصل إلى B عبر C.",
      question: "أي وجهة لها الأولوية؟ وما الطريق البديل إذا أُغلق A–B؟",
      hint: "عند الإغلاق، الطريق المتاح من A إلى B يمر عبر C. غيّر ترتيب الزيارات.",
      prompt: "قارن ترتيبك قبل الإغلاق وبعده. كيف حافظت على أولوية الدواء؟",
      transfer: "كيف تعيد ترتيب مهام يومك إذا تغيّر أحد القيود؟",
      outcomes: ["الخطة تحترم القيود", "الخطة لا تحترم القيود"],
    },
    traffic: {
      title: "تقاطع آمن",
      goal: "اسمح لاتجاه واحد بالمرور. اختبر طلب اللون الأخضر للاتجاهين في الوقت نفسه.",
      question: "لماذا لا يمكن منح اللون الأخضر للاتجاهين معًا؟",
      hint: "قاعدة الأمان ترفض الطلب المتعارض وتجعل الإشارتين حمراوين.",
      prompt: "ما الفرق بين الطلب الذي أدخلته والإشارات التي سمحت بها قاعدة الأمان؟",
      transfer: "هل تعرف نظامًا آخر يجب أن يرفض أمرين متعارضين؟",
      outcomes: ["اتجاه واحد يمر", "الاتجاهان يمران", "الاتجاهان متوقفان"],
    },
    economy: {
      title: "لعبة لا تنكسر",
      goal: "ابدأ بـ10 موارد. في كل جولة تدفع 3 موارد وتكسب المكافأة. نريد استمرار اللعب دون نمو أو نفاد الموارد.",
      question: "ما العلاقة بين تكلفة الجولة ومكافأتها حتى تستمر اللعبة؟",
      hint: "الرصيد التالي = الرصيد الحالي − 3 + المكافأة. قارن خمس جولات بالقواعد نفسها.",
      prompt: "استشهد برصيد الجولة الخامسة قبل التعديل وبعده. لماذا أصبحت القاعدة متوازنة؟",
      transfer: "أين ترى دخلًا ومصروفًا يحتاجان إلى توازن؟",
      outcomes: ["الموارد تزيد", "الموارد ثابتة", "الموارد تنقص"],
    },
  },
  en: {
    water: {
      title: "A tank that stays safe",
      goal: "Fill the tank and stop the pump at 80%. What if the sensor is wrong?",
      question: "What information would help you stop the pump at the right time?",
      hint: "Compare the real water level with the sensor reading. Would you trust just one reading?",
      prompt: "Why was the first rule not enough? Use a trial as evidence, then explain the backup sensor.",
      transfer: "Where might we need a second source of information at home?",
      outcomes: ["The pump keeps running", "The pump stops"],
    },
    routing: {
      title: "Plan the delivery route",
      goal: "Deliver the medicine to A first, then visit B and C once each. If road A–B closes, reach B by way of C.",
      question: "Which stop comes first? What route can you use if A–B is closed?",
      hint: "When the road closes, the available route from A to B goes through C. Change the order of your visits.",
      prompt: "Compare your route before and after the closure. How did you keep the medicine first?",
      transfer: "How could you reorder your day if one of your plans changed?",
      outcomes: ["The route meets the rules", "The route breaks a rule"],
    },
    traffic: {
      title: "A safer crossing",
      goal: "Let one direction move. Then test what happens when both directions request green at once.",
      question: "Why might both directions not be able to get a green light at the same time?",
      hint: "A safety rule can reject a conflicting request and keep both lights red.",
      prompt: "How was the request you made different from the lights the safety rule allowed?",
      transfer: "Can you think of another system that should reject two conflicting instructions?",
      outcomes: ["One direction can move", "Both directions move", "Both directions stop"],
    },
    economy: {
      title: "A game that stays balanced",
      goal: "Start with 10 resources. Each turn costs 3 and earns a reward. Keep play going without resources growing forever or running out.",
      question: "How should the turn cost and reward relate so the game can continue?",
      hint: "Next total = current total − 3 + reward. Compare five turns using the same rule.",
      prompt: "Use the fifth-turn totals before and after your change as evidence. Why is the new rule balanced?",
      transfer: "Where do you see money or resources coming in and going out?",
      outcomes: ["Resources grow", "Resources stay the same", "Resources run low"],
    },
  },
  fr: {
    water: {
      title: "Un réservoir en sécurité",
      goal: "Remplis le réservoir et arrête la pompe à 80 %. Et si le capteur se trompait ?",
      question: "Quelle information t’aiderait à arrêter la pompe au bon moment ?",
      hint: "Compare le niveau réel de l’eau à la mesure du capteur. Ferais-tu confiance à une seule mesure ?",
      prompt: "Pourquoi la première règle ne suffisait-elle pas ? Appuie-toi sur un essai, puis explique le rôle du capteur de secours.",
      transfer: "À la maison, quand pourrait-on avoir besoin d’une deuxième source d’information ?",
      outcomes: ["La pompe continue", "La pompe s’arrête"],
    },
    routing: {
      title: "Organiser le trajet",
      goal: "Livre d’abord le médicament en A, puis passe une fois en B et en C. Si la route A–B ferme, rejoins B en passant par C.",
      question: "Quelle étape est prioritaire ? Quel trajet reste possible si A–B est fermé ?",
      hint: "Quand la route ferme, le trajet disponible entre A et B passe par C. Modifie l’ordre des visites.",
      prompt: "Compare ton trajet avant et après la fermeture. Comment as-tu gardé le médicament en premier ?",
      transfer: "Comment réorganiserais-tu ta journée si l’un de tes projets changeait ?",
      outcomes: ["Le trajet respecte les règles", "Le trajet enfreint une règle"],
    },
    traffic: {
      title: "Un carrefour plus sûr",
      goal: "Laisse passer une seule direction. Puis teste ce qui se passe si les deux demandent le vert en même temps.",
      question: "Pourquoi les deux directions ne pourraient-elles pas avoir le feu vert en même temps ?",
      hint: "Une règle de sécurité peut refuser des demandes incompatibles et garder les deux feux au rouge.",
      prompt: "Quelle différence y a-t-il entre ta demande et les feux autorisés par la règle de sécurité ?",
      transfer: "Connais-tu un autre système qui devrait refuser deux instructions incompatibles ?",
      outcomes: ["Une direction passe", "Les deux directions passent", "Les deux directions s’arrêtent"],
    },
    economy: {
      title: "Un jeu bien équilibré",
      goal: "Commence avec 10 ressources. Chaque tour en coûte 3 et rapporte une récompense. Fais durer le jeu sans que les ressources augmentent sans fin ni s’épuisent.",
      question: "Quel rapport faut-il entre le coût d’un tour et sa récompense pour continuer à jouer ?",
      hint: "Total suivant = total actuel − 3 + récompense. Compare cinq tours avec la même règle.",
      prompt: "Appuie-toi sur les totaux du cinquième tour avant et après ta modification. Pourquoi la nouvelle règle est-elle équilibrée ?",
      transfer: "Où vois-tu des ressources qui entrent et qui sortent ?",
      outcomes: ["Les ressources augmentent", "Les ressources restent stables", "Les ressources diminuent"],
    },
  },
};

type SharedCopy = {
  chooseLanguage: string;
  back: string;
  eyebrow: string;
  phases: [string, string, string, string];
  privacy: string;
  supervisionNote: string;
  storageError: string;
  system: string;
  lastResult: string;
  waiting: string;
  coach: string;
  coachHint: string;
  changeOne: string;
  build: string;
  understand: string;
  pumpAtLimit: string;
  stop: string;
  continue: string;
  testState: string;
  normalWater: string;
  limitWater: string;
  faultySensor: string;
  backupSensor: string;
  backupHelp: string;
  destination: [string, string, string];
  moveEarlier: string;
  moveLater: string;
  blockRoad: string;
  trafficRequest: string;
  directions: [string, string, string];
  safetyRule: string;
  reward: string;
  resources: string;
  economyCost: string;
  predictionStep: string;
  predictionHeading: string;
  predict: string;
  whyPredict: string;
  reasonPlaceholder: string;
  cluePlaceholder: string;
  clueHint: string;
  choosePrediction: string;
  reasonHint: string;
  readyHint: string;
  run: string;
  predictionCorrect: string;
  predictionReview: string;
  notebook: string;
  localLimit: string;
  trialsCount: string;
  notebookEmpty: string;
  explainStep: string;
  reflectionHeading: string;
  explanationPlaceholder: string;
  reflectionHint: string;
  beforeSave: string;
  done: string;
  needed: string;
  explainDifference: string;
  saveEvidence: string;
  saveError: string;
  attempt: string;
  goalMet: string;
  goalNotMet: string;
  predicted: string;
  reason: string;
  happened: string;
  resultMatches: string;
  resultDiffers: string;
  resultEyebrow: string;
  resultTitle: string;
  noResult: string;
  transfer: string;
  continueTrack: string;
  parentEvidence: string;
  missionNames: Record<LabId, string>;
  missionSummary: Record<LabId, string>;
  milestoneLabels: Record<LabId, string[]>;
  hubEyebrow: string;
  hubTitle: [string, string];
  hubBody: string;
  hubCycle: string[];
  hubOpen: string;
  startLab: string;
  reviewEvidence: string;
};

export const sharedCopy: Record<LabLanguage, SharedCopy> = {
  ar: {
    chooseLanguage: "لغة المختبر",
    back: "→ العودة إلى المختبرات",
    eyebrow: "مختبر {number} / فكّر كنظام",
    phases: ["افهم القيد", "صمّم وتوقّع", "اختبر وحسّن", "اشرح بالدليل"],
    privacy: "جرّب مع وليّ أمرك أو شخص بالغ موثوق. تحفظ الإجابات في هذا المتصفح وقد يراها من يستخدم ملفه؛ اكتب عن المهمة فقط، ولا تضف اسمك الكامل أو المدرسة أو العنوان أو معلومات تواصل.",
    supervisionNote: "جرّب مع وليّ أمرك أو شخص بالغ موثوق. تحفظ الإجابات في هذا المتصفح وقد يراها من يستخدم ملفه؛ لا تكتبوا معلومات شخصية.",
    storageError: "تعذّر حفظ العمل في هذا المتصفح. أبقِ الصفحة مفتوحة حتى تنتهي.",
    system: "نموذج النظام",
    lastResult: "آخر نتيجة لهذه الإعدادات",
    waiting: "إعداد ينتظر الاختبار",
    coach: "المُرسِل ◉",
    coachHint: "01 / افهم",
    changeOne: "غيّر عاملًا واحدًا، ثم قارن تجربتين.",
    build: "ابنِ القاعدة",
    understand: "ابنِ التجربة",
    pumpAtLimit: "ماذا تفعل المضخة عند 80%؟",
    stop: "تتوقف",
    continue: "تستمر",
    testState: "حالة الاختبار",
    normalWater: "ماء 45%",
    limitWater: "الحد 80%",
    faultySensor: "حساس معطّل",
    backupSensor: "حساس احتياطي",
    backupHelp: "إذا اختلفت القراءتان، أوقف المضخة.",
    destination: ["صيدلية / الدواء أولًا", "مكتبة", "منزل"],
    moveEarlier: "تقديم",
    moveLater: "تأخير",
    blockRoad: "أغلق طريق A–B. الطريق البديل يمر عبر C.",
    trafficRequest: "طلب المرور",
    directions: ["شمال / جنوب", "شرق / غرب", "كلاهما"],
    safetyRule: "قاعدة أمان: ارفض طلب الاتجاهين واجعل الإشارتين حمراوين.",
    reward: "المكافأة لكل جولة",
    resources: "موارد",
    economyCost: "التكلفة ثابتة: 3 موارد / البداية: 10 موارد",
    predictionStep: "02 / قبل الاختبار",
    predictionHeading: "ماذا تتوقع؟",
    predict: "أتوقع أن…",
    whyPredict: "لماذا تتوقع ذلك؟",
    reasonPlaceholder: "لأن القاعدة...",
    cluePlaceholder: "أحتاج أن أعرف... لأن...",
    clueHint: "ابدأ بتحديد المعلومة أو القيد أعلاه (8 أحرف على الأقل).",
    choosePrediction: "اختر توقعًا. يمكن أن يختلف عن النتيجة.",
    reasonHint: "اكتب سببًا قصيرًا لتوقعك (8 أحرف على الأقل).",
    readyHint: "توقعك جاهز. شغّل التجربة.",
    run: "شغّل الاختبار ←",
    predictionCorrect: "توقعك وافق النتيجة.",
    predictionReview: "نتيجة مختلفة عن توقعك. راجع القاعدة قبل التجربة التالية.",
    notebook: "دفتر التجارب",
    localLimit: "يحتفظ هذا المتصفح بآخر 100 تجربة لكل مختبر.",
    trialsCount: "تجارب مسجلة",
    notebookEmpty: "أول تجربة ستحتفظ بتوقعك وسببك والنتيجة. يمكنك العودة إليها عندما تغيّر القاعدة.",
    explainStep: "03 / اختبر وحسّن",
    reflectionHeading: "ما الذي تغيّر؟",
    explanationPlaceholder: "في تجربة... حدث... وبعد تغيير...",
    reflectionHint: "اكتب تفسيرًا من 15 حرفًا على الأقل. نحتفظ بكلماتك ليراجعها وليّ الأمر.",
    beforeSave: "04 / اشرح بالدليل",
    done: "تم",
    needed: "مطلوب",
    explainDifference: "اشرح الفرق بكلماتك",
    saveEvidence: "سجّل دليل التعلّم ←",
    saveError: "تعذّر حفظ الدليل. عملك ما زال هنا؛ أعد المحاولة بعد إتاحة تخزين المتصفح.",
    attempt: "تجربة",
    goalMet: "الهدف تحقق",
    goalNotMet: "الهدف لم يتحقق",
    predicted: "توقعت",
    reason: "السبب",
    happened: "حدث",
    resultMatches: "وافق الاختبار توقعك.",
    resultDiffers: "اختلف الاختبار عن توقعك. هذه فرصة لمراجعة السبب.",
    resultEyebrow: "دليل التعلّم",
    resultTitle: "سجّلت تفكيرك يا {name}",
    noResult: "لا يوجد دليل مسجل بعد",
    transfer: "خذ الفكرة إلى نظام آخر",
    continueTrack: "تابع المسار ←",
    parentEvidence: "اعرض الدليل لوليّ الأمر",
    missionNames: { water: "مختبر الخزان", routing: "مختبر التوصيل", traffic: "مختبر التقاطع", economy: "مختبر الموارد" },
    missionSummary: { water: "حساس · قاعدة · فشل · حماية", routing: "قيود · أولوية · إعادة تخطيط", traffic: "حالات · شروط · تعارض", economy: "حلقة تغذية · استغلال · موازنة" },
    milestoneLabels: {
      water: ["اختبر الحالة العادية بالقاعدة الحالية", "اختبر الحد 80% بالقاعدة الحالية", "لاحظ الفشل قبل إصلاحه", "أصلح الفشل واختبر إعدادك الحالي"],
      routing: ["اختبر الطرق المفتوحة", "لاحظ الفشل قبل إصلاحه", "أصلح الفشل واختبر إعدادك الحالي"],
      traffic: ["اختبر الحالة العادية بالقاعدة الحالية", "لاحظ الفشل قبل إصلاحه", "أصلح الفشل واختبر إعدادك الحالي"],
      economy: ["اختبر نمو الموارد", "لاحظ الفشل قبل إصلاحه", "أصلح الفشل واختبر إعدادك الحالي"],
    },
    hubEyebrow: "مختبرات بِرْكار",
    hubTitle: ["طريقة تفكير واحدة.", "أنظمة مختلفة."],
    hubBody: "لا نريد أن يتعلم الطفل حل قالب واحد. ننقل طريقة التفكير من خزان ماء إلى طريق وتقاطع وقواعد لعبة.",
    hubCycle: ["راقب", "اسأل", "مثّل", "توقّع", "ابنِ", "اكسر", "صحّح", "حسّن", "اشرح"],
    hubOpen: "افتح المختبر",
    startLab: "ابدأ بمختبر",
    reviewEvidence: "قبل تسجيل الدليل",
  },
  en: {
    chooseLanguage: "Lab language",
    back: "← Back to all labs",
    eyebrow: "Lab {number} / Think in systems",
    phases: ["Understand the constraint", "Design and predict", "Test and improve", "Explain with evidence"],
    privacy: "Try this with a parent or trusted adult. Answers stay in this browser and may be visible to others who use its profile. Write only about the activity; do not include your full name, school, address or contact details.",
    supervisionNote: "Please try these labs with a parent or trusted adult. Answers are saved in this browser and may be visible to others who use its profile; do not enter personal details.",
    storageError: "This browser could not save your work. Keep this page open until you finish.",
    system: "System model",
    lastResult: "Latest result for these settings",
    waiting: "Settings ready to test",
    coach: "The guide ◉",
    coachHint: "01 / Understand",
    changeOne: "Change one factor, then compare two trials.",
    build: "Build the rule",
    understand: "01 / Understand",
    pumpAtLimit: "What should the pump do at 80%?",
    stop: "Stop",
    continue: "Keep running",
    testState: "Test condition",
    normalWater: "Water at 45%",
    limitWater: "At the 80% limit",
    faultySensor: "Faulty sensor",
    backupSensor: "Backup sensor",
    backupHelp: "If the readings disagree, stop the pump.",
    destination: ["Pharmacy / medicine first", "Library", "Home"],
    moveEarlier: "Move earlier",
    moveLater: "Move later",
    blockRoad: "Close road A–B. The alternative route goes through C.",
    trafficRequest: "Traffic request",
    directions: ["North / south", "East / west", "Both"],
    safetyRule: "Safety rule: reject a request from both directions and keep both lights red.",
    reward: "Reward per turn",
    resources: "resources",
    economyCost: "Fixed cost: 3 resources / Starting amount: 10",
    predictionStep: "02 / Before the test",
    predictionHeading: "What do you predict?",
    predict: "I predict…",
    whyPredict: "Why do you predict that?",
    reasonPlaceholder: "Because the rule...",
    cluePlaceholder: "I need to know... because...",
    clueHint: "Start by naming a clue or constraint above (at least 8 characters).",
    choosePrediction: "Choose a prediction. It does not have to be correct.",
    reasonHint: "Add a short reason for your prediction (at least 8 characters).",
    readyHint: "Your prediction is ready. Run the test.",
    run: "Run the test →",
    predictionCorrect: "Your prediction matched the result.",
    predictionReview: "The result differed from your prediction. Review the rule before the next test.",
    notebook: "Trial notebook",
    localLimit: "This browser keeps up to 100 trials for each lab.",
    trialsCount: "trials recorded",
    notebookEmpty: "Your first trial will keep your prediction, reason and result. Come back to it when you change the rule.",
    explainStep: "03 / Test and improve",
    reflectionHeading: "What changed?",
    explanationPlaceholder: "In the trial... happened... After I changed...",
    reflectionHint: "Write at least 15 characters to explain your thinking. Your words stay here for a parent to review.",
    beforeSave: "04 / Explain with evidence",
    done: "Done",
    needed: "To do",
    explainDifference: "Explain the difference in your own words",
    saveEvidence: "Save learning evidence →",
    saveError: "We could not save this evidence. Your work is still here; try again when browser storage is available.",
    attempt: "Trial",
    goalMet: "Goal met",
    goalNotMet: "Goal not met",
    predicted: "Predicted",
    reason: "Reason",
    happened: "What happened",
    resultMatches: "The test matched your prediction.",
    resultDiffers: "The test differed from your prediction. Use this chance to review your reason.",
    resultEyebrow: "Learning evidence",
    resultTitle: "You recorded your thinking, {name}",
    noResult: "No evidence has been saved yet",
    transfer: "Take the idea to another system",
    continueTrack: "Continue your path →",
    parentEvidence: "Show the evidence to a parent",
    missionNames: { water: "Tank lab", routing: "Delivery lab", traffic: "Crossing lab", economy: "Resources lab" },
    missionSummary: { water: "Sensors · rules · failure · safeguards", routing: "Constraints · priorities · replanning", traffic: "States · conditions · conflicts", economy: "Feedback loops · exploits · balance" },
    milestoneLabels: {
      water: ["Test the normal case with this rule", "Test the 80% limit with this rule", "Notice a failure before fixing it", "Fix the failure and test this setup"],
      routing: ["Test the open roads", "Notice a failure before fixing it", "Fix the failure and test this setup"],
      traffic: ["Test the normal case with this rule", "Notice a failure before fixing it", "Fix the failure and test this setup"],
      economy: ["Test resource growth", "Notice a failure before fixing it", "Fix the failure and test this setup"],
    },
    hubEyebrow: "BRKAR labs",
    hubTitle: ["One way of thinking.", "Different systems."],
    hubBody: "Practise the same way of thinking with different systems: a water tank, a delivery route, a crossing and game rules.",
    hubCycle: ["Observe", "Ask", "Model", "Predict", "Build", "Challenge", "Debug", "Improve", "Explain"],
    hubOpen: "Open the lab",
    startLab: "Start with a lab",
    reviewEvidence: "Review before saving",
  },
  fr: {
    chooseLanguage: "Langue de l’atelier",
    back: "← Retour aux ateliers",
    eyebrow: "Atelier {number} / Penser en systèmes",
    phases: ["Comprendre la contrainte", "Concevoir et prévoir", "Tester et améliorer", "Expliquer avec des preuves"],
    privacy: "Essaie avec un parent ou un adulte de confiance. Les réponses restent dans ce navigateur et peuvent être vues par d’autres personnes qui utilisent ce profil. Parle seulement de l’activité ; n’indique ni ton nom complet, ni ton école, ton adresse ou tes coordonnées.",
    supervisionNote: "Essaie ces ateliers avec un parent ou un adulte de confiance. Les réponses sont enregistrées dans ce navigateur et peuvent être vues par d’autres personnes qui utilisent ce profil ; n’ajoute aucune information personnelle.",
    storageError: "Ce navigateur n’a pas pu enregistrer ton travail. Garde cette page ouverte jusqu’à la fin.",
    system: "Modèle du système",
    lastResult: "Dernier résultat avec ces réglages",
    waiting: "Réglages prêts à tester",
    coach: "Le guide ◉",
    coachHint: "01 / Comprendre",
    changeOne: "Modifie un seul facteur, puis compare deux essais.",
    build: "Construire la règle",
    understand: "01 / Comprendre",
    pumpAtLimit: "Que doit faire la pompe à 80 % ?",
    stop: "S’arrêter",
    continue: "Continuer",
    testState: "Situation de test",
    normalWater: "Eau à 45 %",
    limitWater: "À la limite de 80 %",
    faultySensor: "Capteur défectueux",
    backupSensor: "Capteur de secours",
    backupHelp: "Si les mesures diffèrent, arrête la pompe.",
    destination: ["Pharmacie / médicament d’abord", "Bibliothèque", "Maison"],
    moveEarlier: "Avancer",
    moveLater: "Reculer",
    blockRoad: "Ferme la route A–B. L’itinéraire alternatif passe par C.",
    trafficRequest: "Demande de passage",
    directions: ["Nord / sud", "Est / ouest", "Les deux"],
    safetyRule: "Règle de sécurité : refuser les deux demandes et garder les deux feux rouges.",
    reward: "Récompense par tour",
    resources: "ressources",
    economyCost: "Coût fixe : 3 ressources / Départ : 10 ressources",
    predictionStep: "02 / Avant le test",
    predictionHeading: "Que prévois-tu ?",
    predict: "Je prévois…",
    whyPredict: "Pourquoi le prévois-tu ?",
    reasonPlaceholder: "Parce que la règle...",
    cluePlaceholder: "Je dois savoir... parce que...",
    clueHint: "Commence par nommer un indice ou une contrainte ci-dessus (8 caractères minimum).",
    choosePrediction: "Choisis une prévision. Elle peut être différente du résultat.",
    reasonHint: "Ajoute une courte raison à ta prévision (8 caractères minimum).",
    readyHint: "Ta prévision est prête. Lance le test.",
    run: "Lancer le test →",
    predictionCorrect: "Le résultat confirme ta prévision.",
    predictionReview: "Le résultat diffère de ta prévision. Revois la règle avant le prochain test.",
    notebook: "Carnet d’essais",
    localLimit: "Ce navigateur conserve jusqu’à 100 essais par atelier.",
    trialsCount: "essais enregistrés",
    notebookEmpty: "Ton premier essai gardera ta prévision, ta raison et le résultat. Tu pourras y revenir après avoir changé la règle.",
    explainStep: "03 / Tester et améliorer",
    reflectionHeading: "Qu’est-ce qui a changé ?",
    explanationPlaceholder: "Lors de l’essai... Après ma modification...",
    reflectionHint: "Écris au moins 15 caractères pour expliquer ta réflexion. Un parent pourra la relire ici.",
    beforeSave: "04 / Expliquer avec des preuves",
    done: "Fait",
    needed: "À faire",
    explainDifference: "Explique la différence avec tes mots",
    saveEvidence: "Enregistrer la preuve d’apprentissage →",
    saveError: "La preuve n’a pas pu être enregistrée. Ton travail est toujours là ; réessaie quand le stockage du navigateur sera disponible.",
    attempt: "Essai",
    goalMet: "Objectif atteint",
    goalNotMet: "Objectif non atteint",
    predicted: "Prévision",
    reason: "Raison",
    happened: "Résultat",
    resultMatches: "Le test confirme ta prévision.",
    resultDiffers: "Le test diffère de ta prévision. Profites-en pour revoir ta raison.",
    resultEyebrow: "Preuve d’apprentissage",
    resultTitle: "Tu as noté ta réflexion, {name}",
    noResult: "Aucune preuve n’a encore été enregistrée",
    transfer: "Réutilise cette idée dans un autre système",
    continueTrack: "Continuer le parcours →",
    parentEvidence: "Montrer la preuve à un parent",
    missionNames: { water: "Atelier du réservoir", routing: "Atelier de livraison", traffic: "Atelier du carrefour", economy: "Atelier des ressources" },
    missionSummary: { water: "Capteurs · règles · échecs · protections", routing: "Contraintes · priorités · nouvel itinéraire", traffic: "États · conditions · conflits", economy: "Boucles · exploits · équilibre" },
    milestoneLabels: {
      water: ["Tester le cas normal avec cette règle", "Tester la limite de 80 % avec cette règle", "Repérer un échec avant de le corriger", "Corriger l’échec et tester ces réglages"],
      routing: ["Tester les routes ouvertes", "Repérer un échec avant de le corriger", "Corriger l’échec et tester ces réglages"],
      traffic: ["Tester le cas normal avec cette règle", "Repérer un échec avant de le corriger", "Corriger l’échec et tester ces réglages"],
      economy: ["Tester l’augmentation des ressources", "Repérer un échec avant de le corriger", "Corriger l’échec et tester ces réglages"],
    },
    hubEyebrow: "Ateliers BRKAR",
    hubTitle: ["Une façon de réfléchir.", "Des systèmes différents."],
    hubBody: "Exerce-toi à réfléchir de la même façon sur plusieurs systèmes : un réservoir, un trajet, un carrefour et les règles d’un jeu.",
    hubCycle: ["Observer", "Questionner", "Modéliser", "Prévoir", "Construire", "Mettre à l’épreuve", "Corriger", "Améliorer", "Expliquer"],
    hubOpen: "Ouvrir l’atelier",
    startLab: "Commencer par un atelier",
    reviewEvidence: "Relire avant d’enregistrer",
  },
};

const unit = (value: number, language: LabLanguage) =>
  new Intl.NumberFormat(language === "ar" ? "ar-MA" : language === "fr" ? "fr-FR" : "en-US").format(value);

export function outcomeIndex(id: LabId, value: string) {
  const canonical = labs[id].outcomes as readonly string[];
  const direct = canonical.indexOf(value);
  if (direct >= 0) return direct;
  return (Object.keys(missionWords) as LabLanguage[]).flatMap((language) =>
    missionWords[language][id].outcomes.map((label, index) => ({ label, index })),
  ).find((entry) => entry.label === value)?.index ?? -1;
}

export function outcomeLabel(id: LabId, value: string, language: LabLanguage) {
  const index = outcomeIndex(id, value);
  return index < 0 ? value : missionWords[language][id].outcomes[index];
}

export function settingsDescription(id: LabId, s: Settings, language: LabLanguage) {
  if (id === "water") {
    const scenario = language === "ar"
      ? s.scenario === "normal" ? "ماء 45%" : s.scenario === "limit" ? "الحد 80%" : "ماء 96% / قراءة 60%"
      : language === "fr"
        ? s.scenario === "normal" ? "Eau 45 %" : s.scenario === "limit" ? "Limite 80 %" : "Eau 96 % / mesure 60 %"
        : s.scenario === "normal" ? "Water 45%" : s.scenario === "limit" ? "80% limit" : "Water 96% / reading 60%";
    const rule = language === "ar" ? (s.stopAtLimit ? "توقف عند الحد" : "استمرار عند الحد") : language === "fr" ? (s.stopAtLimit ? "Arrêt à la limite" : "Continuer à la limite") : (s.stopAtLimit ? "Stop at the limit" : "Continue at the limit");
    const safeguard = language === "ar" ? (s.safeguard ? "حساس احتياطي" : "حساس واحد") : language === "fr" ? (s.safeguard ? "Capteur de secours" : "Un seul capteur") : (s.safeguard ? "Backup sensor" : "One sensor");
    return `${scenario} · ${rule} · ${safeguard}`;
  }
  if (id === "routing") {
    const path = s.order.join(language === "ar" ? " ← " : " → ");
    return language === "ar"
      ? `${path} · ${s.blocked ? "A–B مغلق" : "الطرق مفتوحة"}`
      : language === "fr"
        ? `${path} · ${s.blocked ? "A–B fermé" : "Routes ouvertes"}`
        : `${path} · ${s.blocked ? "A–B closed" : "Roads open"}`;
  }
  if (id === "traffic") {
    const mode = language === "ar" ? (s.mode === "both" ? "طلب الاتجاهين" : s.mode === "ns" ? "شمال / جنوب" : "شرق / غرب") : language === "fr" ? (s.mode === "both" ? "Demande des deux côtés" : s.mode === "ns" ? "Nord / sud" : "Est / ouest") : (s.mode === "both" ? "Both directions requested" : s.mode === "ns" ? "North / south" : "East / west");
    const safety = language === "ar" ? (s.interlock ? "حماية مفعّلة" : "دون حماية") : language === "fr" ? (s.interlock ? "Protection active" : "Sans protection") : (s.interlock ? "Safety rule on" : "No safety rule");
    return `${mode} · ${safety}`;
  }
  return language === "ar"
    ? `مكافأة ${s.reward} · تكلفة 3 · البداية 10`
    : language === "fr"
      ? `Récompense ${s.reward} · coût 3 · départ 10`
      : `Reward ${s.reward} · cost 3 · start 10`;
}

export function trialDetail(id: LabId, trial: Trial, language: LabLanguage) {
  const s = trial.settings;
  const index = outcomeIndex(id, trial.outcome);
  if (id === "water") {
    const level = s.scenario === "normal" ? 45 : s.scenario === "limit" ? 80 : 96;
    const reading = s.scenario === "failure" ? 60 : level;
    const stopped = index === 1;
    if (language === "ar") {
      const ending = stopped
        ? s.safeguard && level !== reading ? "اختلف الحساسان؛ أوقفت الحماية المضخة." : "بلغت القراءة الحد؛ أوقفت القاعدة المضخة."
        : level >= 80 ? "الماء بلغ الحد لكن المضخة ما زالت تعمل." : "الماء دون الحد؛ التعبئة مستمرة.";
      return `الماء الحقيقي ${level}%، قراءة الحساس ${reading}%. ${ending}`;
    }
    if (language === "fr") {
      const ending = stopped
        ? s.safeguard && level !== reading ? "Les capteurs différaient ; la protection a arrêté la pompe." : "La mesure a atteint la limite ; la règle a arrêté la pompe."
        : level >= 80 ? "L’eau a atteint la limite, mais la pompe continue." : "L’eau reste sous la limite ; le remplissage continue.";
      return `Niveau réel ${level} %, mesure du capteur ${reading} %. ${ending}`;
    }
    const ending = stopped
      ? s.safeguard && level !== reading ? "The sensors disagreed, so the safeguard stopped the pump." : "The reading reached the limit, so the rule stopped the pump."
      : level >= 80 ? "The water reached the limit, but the pump is still running." : "The water is below the limit, so filling continues.";
    return `Real water level: ${level}%; sensor reading: ${reading}%. ${ending}`;
  }
  if (id === "routing") {
    const path = s.order.join(language === "ar" ? " ← " : " → ");
    if (language === "ar") return `المسار: ${path}. ${s.order[0] !== "A" ? "الدواء لم يصل أولًا." : s.blocked && index !== 0 ? "طريق A–B مغلق؛ يجب المرور عبر C قبل B." : s.blocked ? "وصل الدواء أولًا، ثم وصلت إلى B عبر C." : "وصل الدواء أولًا وزرت الوجهات الثلاث."}`;
    if (language === "fr") return `Trajet : ${path}. ${s.order[0] !== "A" ? "Le médicament n’est pas arrivé en premier." : s.blocked && index !== 0 ? "La route A–B est fermée ; il faut passer par C avant B." : s.blocked ? "Le médicament est arrivé d’abord, puis B a été rejoint en passant par C." : "Le médicament est arrivé d’abord et les trois étapes ont été visitées."}`;
    return `Route: ${path}. ${s.order[0] !== "A" ? "The medicine was not delivered first." : s.blocked && index !== 0 ? "Road A–B is closed; go through C before B." : s.blocked ? "The medicine arrived first, then B was reached through C." : "The medicine arrived first and all three stops were visited."}`;
  }
  if (id === "traffic") {
    if (index !== 0) {
      if (language === "ar") return index === 1 ? "أصبحت الإشارتان خضراوين؛ مسارا المرور يتقاطعان." : "طُلب الأخضر للاتجاهين. رُفض الطلب وأصبحت الإشارتان حمراوين.";
      if (language === "fr") return index === 1 ? "Les deux feux sont passés au vert ; les trajectoires se croisent." : "Le vert a été demandé des deux côtés. La demande a été refusée et les deux feux sont restés rouges.";
      return index === 1 ? "Both lights turned green, crossing the paths." : "Both directions requested green. The request was rejected and both lights stayed red.";
    }
    if (language === "ar") return s.mode === "ns" ? "شمال / جنوب أخضر، شرق / غرب أحمر." : "شرق / غرب أخضر، شمال / جنوب أحمر.";
    if (language === "fr") return s.mode === "ns" ? "Feu vert au nord et au sud ; feu rouge à l’est et à l’ouest." : "Feu vert à l’est et à l’ouest ; feu rouge au nord et au sud.";
    return s.mode === "ns" ? "North / south green; east / west red." : "East / west green; north / south red.";
  }
  const values = trial.values ?? [];
  const final = values.length ? values[values.length - 1] : 10 + 5 * (s.reward - 3);
  if (language === "ar") return `من 10 إلى ${final} موارد خلال خمس جولات. ${s.reward > 3 ? "المكافأة أكبر من التكلفة؛ التكرار وحده يزيد الموارد." : s.reward === 3 ? "المكافأة تساوي التكلفة؛ لا نمو ولا نفاد." : "المكافأة أقل من التكلفة؛ الاستمرار يستنزف الموارد."}`;
  if (language === "fr") return `De 10 à ${unit(final, language)} ressources en cinq tours. ${s.reward > 3 ? "La récompense dépasse le coût ; la répétition suffit à faire croître les ressources." : s.reward === 3 ? "La récompense égale le coût ; le total reste stable." : "La récompense est inférieure au coût ; continuer épuise les ressources."}`;
  return `From 10 to ${unit(final, language)} resources over five turns. ${s.reward > 3 ? "The reward is greater than the cost, so repeating the turn grows the total." : s.reward === 3 ? "The reward equals the cost, so the total stays steady." : "The reward is lower than the cost, so continuing uses up the resources."}`;
}

export function predictionMatches(id: LabId, prediction: string, outcome: string) {
  return outcomeIndex(id, prediction) >= 0 && outcomeIndex(id, prediction) === outcomeIndex(id, outcome);
}
