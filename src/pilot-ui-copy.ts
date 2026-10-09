import type { BrandLanguage } from "./brand";
import { defaultNicknames } from "./languages";

type SectionCopy = { title: string; body: string };

export const pilotUiCopy: Record<BrandLanguage, {
  languageLabel: string;
  onboarding: {
    eyebrow: string; title: string; body: string; adultStep: string; nicknameStep: string;
    beginStep: string; nicknameLabel: string; nicknamePlaceholder: string; privacyHint: string;
    supervision: string; disclosureBefore: string; privacyLink: string;
    storageError: string; enter: string;
  };
  kid: {
    defaultNickname: string; space: string; greeting: string; intro: string; parent: string; continue: string;
    tryAgain: string; nextLab: string; curriculumTrack: string;
    openLab: string; continueLab: string; contractBefore: string; contractDuring: string; contractAfter: string;
    inputRuleOutput: string; draftsSaved: (count: number) => string; booksComplete: (count: number) => string;
    trialSummary: (count: number) => string;
    evidenceEyebrow: string; evidenceTitle: string; evidenceBody: string; trackEyebrow: string;
    trackTitle: string; openLabs: string; open: string; review: string; later: string;
    recentEyebrow: string; recentHasEvidence: string; recentEmpty: string;
    previousRecord: string; reviewNotebook: string; emptyEvidence: string; localNote: string;
    trackStatus: string;
    missions: Array<[string, string]>; evidence: Array<[string, string]>;
  };
  parent: {
    eyebrow: string; titleLead: string; titleTrail: string; intro: string; curriculum: string; childSpace: string;
    latest: string; noSummary: string; emptySummary: string; fromLab: (mission: string) => string;
    nextObjective: string; emptyObjective: string; afterTest: string; evidenceEyebrow: string; evidenceTitle: string;
    evidenceBody: string; recordedCount: (count: number) => string; notRecorded: string;
    historyEyebrow: string; historyTitle: string; browse: string; trialCount: (count: number) => string;
    olderRecord: string; olderRecordDetail: string; emptyTitle: string; emptyBody: string;
    localNote: string; familyEyebrow: string; familyTitle: string; familyBody: string;
    deleteButton: string; deleteConfirm: string; deleteError: string; dateLocale: string;
    evidence: Array<[string, string]>; constraintLabel: string; explanationLabel: string;
  };
  privacy: {
    eyebrow: string; title: string; intro: string; sections: SectionCopy[];
    launchTitle: string; launchBody: string; law: string; back: string;
  };
}> = {
  ar: {
    languageLabel: "لغة الواجهة",
    onboarding: {
      eyebrow: "إعداد الأسرة", title: "بداية بسيطة، وبيانات أقل",
      body: "هذه تجربة عائلية بإشراف بالغ. لا نطلب اسم وليّ الأمر أو العمر الدقيق أو البريد الإلكتروني.",
      adultStep: "وليّ الأمر", nicknameStep: "لقب اختياري", beginStep: "ابدأ",
      nicknameLabel: "لقب للطفل (اختياري)", nicknamePlaceholder: "مثال: المستكشف",
      privacyHint: "استخدم لقبًا بدل الاسم الكامل. لا تكتب معلومات عن المدرسة أو العنوان أو وسيلة التواصل.",
      supervision: "أنا وليّ الأمر أو المرافق البالغ، وسأبقى حاضرًا أثناء تجربة الطفل.",
      disclosureBefore: "التقدم والإجابات محفوظة في هذا المتصفح فقط، ولا تُرسل إلى حساب أو خدمة تحليلات داخل التطبيق. من يستخدم ملف المتصفح نفسه قد يتمكن من رؤية لوحة الأهل. ",
      privacyLink: "تفاصيل الخصوصية",
      storageError: "تعذّر حفظ اللقب في هذا المتصفح. تحقق من إعدادات التخزين ثم أعد المحاولة.",
      enter: "ادخل مساحة التعلّم",
    },
    kid: {
      defaultNickname: defaultNicknames.ar, space: "مساحة التعلّم", greeting: "السلام ",
      intro: "اليوم لا نبحث عن أسرع إجابة. نريد نظامًا تستطيع شرحه عندما يعمل وعندما يفشل.",
      parent: "عرض الأهل", continue: "أكمل من حيث توقفت", tryAgain: "جرّب تفسيرًا جديدًا",
      nextLab: "المختبر التالي", curriculumTrack: "فكّر كنظام",
      openLab: "افتح المختبر", continueLab: "واصل المختبر", contractBefore: "قبل التجربة",
      contractDuring: "أثناءها", contractAfter: "بعدها", inputRuleOutput: "المدخل ← القاعدة ← المخرج",
      draftsSaved: (count) => `عدد التجارب المحفوظة في هذا المتصفح: ${count}`,
      booksComplete: (count) => `مختبرات لها دفتر تجارب مكتمل: ${count} من 4`,
      trialSummary: (count) => `عدد التجارب: ${count} · بكلماتك`,
      evidenceEyebrow: "ما الذي يتطور؟", evidenceTitle: "دليل على التفكير، لا نقاط فقط.",
      evidenceBody: "كل مختبر يترك أثرًا واضحًا: ماذا فهمت، ومثّلت، وتوقعت، واختبرت، وفسّرت.",
      trackEyebrow: "المسار الأول", trackTitle: "فكّر كنظام", openLabs: "شاهد المختبرات المفتوحة",
      open: "افتح", review: "راجع", later: "لاحقًا",
      recentEyebrow: "آخر ما أثبته تفكيرك", recentHasEvidence: "هذه نتائج حقيقية من مختبراتك.",
      recentEmpty: "ابدأ بمختبر واحد.",
      previousRecord: "سجل من النسخة السابقة", reviewNotebook: "راجع دفتر التجارب ←",
      emptyEvidence: "لن نملأ هذه المساحة بمؤشرات وهمية. عندما تكمل تجربة، سيظهر هنا ما قمت به فعلًا.",
      localNote: "العمل محفوظ في هذا المتصفح فقط. استخدم الجهاز والمتصفح نفسيهما للعودة إلى تجربتك.",
      trackStatus: "أربعة مختبرات تفاعلية متاحة الآن. الأنشطة الثمانية الأخرى جزء من المنهج، وستُطوّر بعد أن نتعلم من تجربة الأسر.",
      missions: [
        ["راقب قبل أن تحل", "الأنماط والقيود"], ["حوّل الفوضى إلى خطوات", "الترتيب والتفكيك"],
        ["ارسم نظامًا", "المدخلات والقواعد والحالة والمخرجات"], ["ابحث عن النمط", "التكرار قبل الصياغة"],
        ["ماذا لو؟", "الشروط والقرارات"], ["اكسر النظام", "الحالات الطرفية والفشل"],
        ["أصلح السبب", "التنقيح والاستدلال"], ["اجعل النظام أبسط", "التجريد وإعادة الاستخدام"],
        ["دع AI يقترح", "التحديد والنقد"], ["اختبر AI", "التحقق والافتراضات"],
        ["ابنِ نظامك", "مشروع من مشكلة حقيقية"], ["اشرح قراراتك", "اعرض التصميم ودافع عنه"],
      ],
      evidence: [["يفهم", "يحدد الهدف والقيود"], ["يمثّل", "يبني نموذجًا للنظام"], ["يتوقّع", "يشرح النتيجة قبل التجربة"], ["يختبر", "يجرب الحالة العادية والفشل"], ["يفسّر", "يشرح لماذا يعمل الحل"]],
    },
    parent: {
      eyebrow: "لوحة الأهل", titleLead: "كيف يفكّر ", titleTrail: "؟",
      intro: "لا نعرض ترتيبًا أو درجة ذكاء. نعرض فقط ما ظهر داخل المهمات وما سنتمرن عليه بعد ذلك.",
      curriculum: "المنهج الكامل", childSpace: "مساحة الطفل", latest: "آخر دليل محفوظ",
      noSummary: "لم نكوّن ملخصًا بعد.",
      emptySummary: "بعد أول مختبر سنعرض هنا جملة واضحة تصف ما فعله الطفل فعلًا، بدل ملء اللوحة بأرقام لا تعني شيئًا.",
      fromLab: (mission) => `من مختبر «\u2068${mission}\u2069»`, nextObjective: "الهدف التالي",
      emptyObjective: "ابدأ بمختبر واحد، واسأل الطفل عن توقعه قبل التشغيل.",
      afterTest: "سؤال للحوار بعد التجربة",
      evidenceEyebrow: "أدلة التعلّم", evidenceTitle: "خمسة أشياء يمكن مراجعتها.",
      evidenceBody: "وجود سجل يعني أن هذا الفعل ظهر في مهمة، وليس حكمًا على إتقان الطفل. الإجابات محفوظة لمراجعتكم؛ لا يصححها النظام تلقائيًا.",
      recordedCount: (count) => `عدد المختبرات التي ظهر فيها: ${count}`,
      notRecorded: "لا يوجد سجل مفصل بعد", historyEyebrow: "من داخل المختبر",
      historyTitle: "ما الذي حدث فعلًا؟", browse: "استعرض المهمات",
      trialCount: (count) => `عدد التجارب: ${count}`, olderRecord: "سجل من نسخة سابقة",
      olderRecordDetail: "هذا سجل من النسخة السابقة؛ لا يحتوي على التوقعات والنتائج التفصيلية. أعد المختبر لإضافة دفتر تجارب.",
      emptyTitle: "لا توجد أدلة بعد.", emptyBody: "ابدأ من مساحة الطفل. بعد إتمام المختبر ستتغير هذه اللوحة تلقائيًا.",
      localNote: "هذه الأدلة محفوظة محليًا في هذا المتصفح. لا يوجد حساب سحابي أو تقييم آلي للإجابات في هذه النسخة. لوحة الأهل لا تتطلب رمزًا؛ استخدمها على جهاز الأسرة مع وجود وليّ الأمر.",
      familyEyebrow: "تحكم الأسرة", familyTitle: "أنت تتحكم في سجل هذا المتصفح.",
      familyBody: "احذف اللقب وكل المسودات والتجارب والأدلة المحفوظة على هذا الموقع في هذا المتصفح. لا يؤثر ذلك على ملفات أو مواقع أخرى.",
      deleteButton: "حذف سجل التجربة من هذا المتصفح",
      deleteConfirm: "سيُحذف اللقب وكل مسودات المختبرات والأدلة المحفوظة لهذا الموقع في هذا المتصفح. لا يمكن التراجع عن الحذف. هل تريد المتابعة؟",
      deleteError: "تعذّر حذف كل البيانات. امسح بيانات هذا الموقع من إعدادات المتصفح.", dateLocale: "ar-MA",
      evidence: [["يفهم", "يحدد الهدف والقيود"], ["يمثّل", "يبني نموذجًا للنظام"], ["يتوقّع", "يشرح النتيجة قبل التجربة"], ["يختبر", "يجرب الحالة العادية والفشل"], ["يفسّر", "يشرح لماذا يعمل الحل"]],
      constraintLabel: "القيد الذي حدده الطفل", explanationLabel: "تفسير الطفل بعد التحسين",
    },
    privacy: {
      eyebrow: "للأهل · نسخة تجربة", title: "الخصوصية في تجربة بِرْكار",
      intro: "صُمّمت هذه النسخة كتجربة عائلية محلية، وليست حسابًا سحابيًا أو خدمة تعليمية تجارية مكتملة.",
      sections: [
        { title: "ما الذي يحفظه التطبيق؟", body: "يحفظ لقب الطفل الاختياري ومسودات المختبرات والتوقعات والتجارب والتفسيرات على هذا الجهاز، داخل تخزين المتصفح لهذا الموقع. لا نطلب اسم وليّ الأمر أو البريد أو العمر الدقيق. يمكنك تغيير اللقب أو حذف السجل من لوحة الأهل. لا يشفّر التطبيق هذه البيانات كخزنة خاصة؛ فقد يتمكن من يستخدم ملف المتصفح نفسه من رؤيتها." },
        { title: "من يستطيع رؤية السجل؟", body: "لا يوجد حساب أو رمز دخول في هذه النسخة. كل من يستخدم ملف المتصفح نفسه قد يفتح مساحة الطفل ولوحة الأهل. استخدموا جهاز الأسرة مع إشراف وليّ الأمر، ولا تكتبوا الاسم الكامل أو المدرسة أو العنوان أو أي معلومة خاصة في حقول الإجابة." },
        { title: "هل ترسل إجابات الطفل إلى خدمة أخرى؟", body: "لا يرسل التطبيق الملف الشخصي أو الإجابات إلى واجهة برمجية أو حساب سحابي، ولا يستخدم إعلانات أو تحليلات أو دردشة ذكاء اصطناعي. الموقع نفسه مستضاف على Firebase Hosting؛ مزود الاستضافة يعالج الطلبات التقنية اللازمة لتقديم صفحات الموقع وفق شروطه وسياساته." },
        { title: "كيف نمسح البيانات؟", body: "من لوحة الأهل استخدموا «حذف سجل التجربة من هذا المتصفح» لمسح اللقب والمسودات والأدلة لهذا الموقع. حذف بيانات الموقع من إعدادات المتصفح يمسحها أيضًا. لا يوجد نسخ احتياطي أو استرجاع بعد الحذف." },
        { title: "حدود النسخة التجريبية", body: "المنهج والمقدمة والمختبرات التفاعلية الأربعة ونتائجها متاحة بالعربية والإنجليزية والفرنسية. مساحة الطفل والبداية والخصوصية ولوحة الأهل متاحة الآن باللغات الثلاث. لا يوجد دفع أو تسجيل دخول أو مزامنة أو علاج أو تشخيص. هذه المعلومات وصف للنسخة التقنية وليست سياسة قانونية نهائية." },
      ],
      launchTitle: "قبل فتح التسجيل العام",
      launchBody: "على مشغّل الخدمة تحديد الجهة المسؤولة ووسيلة تواصل الأسرة، ومراجعة متطلبات حماية البيانات وموافقة أولياء الأمور والاستضافة لدى مزودي الخدمة قبل توسيع التجربة.",
      law: "قانون حماية المعطيات الشخصية المغربي 09-08", back: "العودة إلى لوحة الأهل",
    },
  },
  en: {
    languageLabel: "Interface language",
    onboarding: {
      eyebrow: "Family setup", title: "A simple start, with less data",
      body: "This is a family trial with an adult present. We do not ask for a parent’s name, exact age or email address.",
      adultStep: "Adult", nicknameStep: "Optional nickname", beginStep: "Begin",
      nicknameLabel: "Child’s nickname (optional)", nicknamePlaceholder: "For example: Explorer",
      privacyHint: "Use a nickname instead of a full name. Do not enter a school, address or contact details.",
      supervision: "I am the parent or accompanying adult, and I will stay with the child during this trial.",
      disclosureBefore: "Progress and answers stay in this browser. The app does not send them to an account or analytics service. Anyone using this browser profile may be able to see the parent dashboard. ",
      privacyLink: "Privacy details",
      storageError: "We could not save the nickname in this browser. Check its storage settings and try again.",
      enter: "Enter the learning space",
    },
    kid: {
      defaultNickname: defaultNicknames.en, space: "Learning space", greeting: "Hello, ",
      intro: "Today is not about finding the fastest answer. It is about building a system you can explain when it works and when it fails.",
      parent: "Parent view", continue: "Continue where you left off", tryAgain: "Try a new explanation",
      nextLab: "Next lab", curriculumTrack: "Think in systems",
      openLab: "Open the lab", continueLab: "Continue the lab", contractBefore: "Before the test",
      contractDuring: "During", contractAfter: "After", inputRuleOutput: "Input → rule → output",
      draftsSaved: (count) => `Trials saved in this browser: ${count}`,
      booksComplete: (count) => `Labs with a complete notebook: ${count} of 4`,
      trialSummary: (count) => `${count} trials · in your words`,
      evidenceEyebrow: "What are you practicing?", evidenceTitle: "Evidence of thinking, not just points.",
      evidenceBody: "Each lab leaves a clear trace: what you understood, modeled, predicted, tested and explained.",
      trackEyebrow: "First pathway", trackTitle: "Think in systems", openLabs: "Explore the open labs",
      open: "Open", review: "Review", later: "Planned",
      recentEyebrow: "What your thinking has shown", recentHasEvidence: "These are real results from your labs.",
      recentEmpty: "Start with one lab.",
      previousRecord: "Earlier version record", reviewNotebook: "Review lab notebook →",
      emptyEvidence: "We will not fill this space with made-up measures. After you try a lab, it will show what you actually did.",
      localNote: "Your work stays in this browser. Return using the same device and browser.",
      trackStatus: "Four interactive labs are available now. The other eight activities are in the curriculum and will be developed after we learn from family trials.",
      missions: [
        ["Observe before solving", "Patterns and constraints"], ["Turn a tangle into steps", "Sequencing and breaking it down"],
        ["Draw a system", "Inputs, rules, state and outputs"], ["Look for a pattern", "Repetition before code"],
        ["What if?", "Conditions and choices"], ["Break the system", "Edge cases and failure"],
        ["Fix the cause", "Debugging and reasoning"], ["Make the system simpler", "Abstraction and reuse"],
        ["Ask AI to suggest", "Specifications and critique"], ["Test AI", "Verification and assumptions"],
        ["Build your system", "A project from a real problem"], ["Explain your decisions", "Present and defend your design"],
      ],
      evidence: [["Understands", "Identifies the goal and constraints"], ["Models", "Builds a model of the system"], ["Predicts", "Explains an outcome before testing"], ["Tests", "Tries ordinary and failure cases"], ["Explains", "Describes why a solution works"]],
    },
    parent: {
      eyebrow: "Parent dashboard", titleLead: "How ", titleTrail: " approaches a problem",
      intro: "We do not rank children or assign an intelligence score. We show what appeared in a task and what to notice next.",
      curriculum: "Full curriculum", childSpace: "Child space", latest: "Latest saved evidence",
      noSummary: "There is no summary yet.",
      emptySummary: "After the first lab, this space will describe what the child actually did instead of filling the dashboard with numbers that mean little.",
      fromLab: (mission) => `From the “\u2068${mission}\u2069” lab`, nextObjective: "Next to notice",
      emptyObjective: "Start with one lab and ask the child what they predict before running it.",
      afterTest: "A question to discuss after the trial",
      evidenceEyebrow: "Learning evidence", evidenceTitle: "Five things you can review.",
      evidenceBody: "A record means this action appeared in a task; it is not a judgment of mastery. Answers stay here for your review and are not graded automatically.",
      recordedCount: (count) => `Labs with a recorded example: ${count}`,
      notRecorded: "No detailed record yet", historyEyebrow: "Inside the lab",
      historyTitle: "What actually happened?", browse: "Browse the tasks",
      trialCount: (count) => `Trials: ${count}`, olderRecord: "Earlier version record",
      olderRecordDetail: "This entry is from an earlier version. It does not include detailed predictions and results. Repeat the lab to add a trial notebook.",
      emptyTitle: "No evidence yet.", emptyBody: "Start in the child space. This dashboard updates after a lab is completed.",
      localNote: "This evidence stays in this browser. This version has no cloud account and does not automatically grade answers. The parent dashboard has no passcode; use it on the family device with an adult present.",
      familyEyebrow: "Family controls", familyTitle: "You control this browser’s record.",
      familyBody: "Delete the nickname, drafts, trials and evidence saved for this site in this browser. This does not affect files or other websites.",
      deleteButton: "Delete this browser’s trial record",
      deleteConfirm: "This will delete the nickname, lab drafts and evidence saved for this site in this browser. This cannot be undone. Continue?",
      deleteError: "We could not remove all the data. Clear this site’s data in your browser settings.", dateLocale: "en-MA",
      evidence: [["Understands", "Identifies the goal and constraints"], ["Models", "Builds a model of the system"], ["Predicts", "Explains an outcome before testing"], ["Tests", "Tries ordinary and failure cases"], ["Explains", "Describes why a solution works"]],
      constraintLabel: "The constraint the child chose", explanationLabel: "The child’s explanation after the change",
    },
    privacy: {
      eyebrow: "For parents · trial version", title: "Privacy in the BRKAR trial",
      intro: "This version is designed as a local family trial. It is not a cloud account or a complete commercial education service.",
      sections: [
        { title: "What does the app save?", body: "The optional child nickname, lab drafts, predictions, trials and explanations are saved on this device in this website’s browser storage. We do not ask for a parent’s name, email or exact age. You can change the nickname or delete the record from the parent dashboard. The app does not encrypt this data as a private vault; someone using the same browser profile may be able to see it." },
        { title: "Who can see the record?", body: "This version has no account or sign-in code. Anyone using the same browser profile may open the child space and parent dashboard. Use a family device with an adult present. Do not enter a full name, school, address or private information in answer fields." },
        { title: "Are a child’s answers sent to another service?", body: "The app does not send the profile or answers to an API or cloud account, and it does not use ads, analytics or an AI chat. The website is hosted on Firebase Hosting; the hosting provider processes the technical requests needed to serve its pages under its terms and policies." },
        { title: "How do we delete the data?", body: "In the parent dashboard, use “Delete this browser’s trial record” to remove the nickname, drafts and evidence saved for this site. Clearing this site’s data in browser settings also removes it. There is no backup or recovery after deletion." },
        { title: "Limits of this trial version", body: "The curriculum, introduction, four interactive labs and their results are available in Arabic, English and French. The child space, setup, privacy page and parent dashboard are now available in all three languages. There is no payment, sign-in, sync, treatment or diagnosis. This describes the current technical version; it is not a final legal policy." },
      ],
      launchTitle: "Before opening public registration",
      launchBody: "The service operator must identify the responsible organization and a family contact, and review data protection, guardian consent and hosting requirements before expanding the trial.",
      law: "Morocco’s Personal Data Protection Law 09-08", back: "Return to the parent dashboard",
    },
  },
  fr: {
    languageLabel: "Langue de l’interface",
    onboarding: {
      eyebrow: "Configuration familiale", title: "Un départ simple, avec moins de données",
      body: "Cet essai familial se déroule avec un adulte présent. Nous ne demandons ni nom de parent, ni âge exact, ni adresse e-mail.",
      adultStep: "Adulte", nicknameStep: "Surnom facultatif", beginStep: "Commencer",
      nicknameLabel: "Surnom de l’enfant (facultatif)", nicknamePlaceholder: "Par exemple : Explorateur",
      privacyHint: "Choisissez un surnom plutôt que le nom complet. N’indiquez pas l’école, l’adresse ou des coordonnées.",
      supervision: "Je suis le parent ou l’adulte accompagnant et je resterai présent pendant l’essai.",
      disclosureBefore: "La progression et les réponses restent dans ce navigateur. L’application ne les envoie ni à un compte ni à un service d’analyse. Une personne utilisant ce même profil de navigateur peut voir le tableau de bord des parents. ",
      privacyLink: "Détails de confidentialité",
      storageError: "Impossible d’enregistrer le surnom dans ce navigateur. Vérifiez ses paramètres de stockage et réessayez.",
      enter: "Entrer dans l’espace d’apprentissage",
    },
    kid: {
      defaultNickname: defaultNicknames.fr, space: "Espace d’apprentissage", greeting: "Bonjour, ",
      intro: "Aujourd’hui, le but n’est pas de trouver la réponse la plus rapide. Il s’agit de construire un système que tu peux expliquer quand il fonctionne et quand il échoue.",
      parent: "Espace des parents", continue: "Reprendre là où tu t’es arrêté", tryAgain: "Proposer une nouvelle explication",
      nextLab: "Prochain laboratoire", curriculumTrack: "Penser en systèmes",
      openLab: "Ouvrir le laboratoire", continueLab: "Continuer le laboratoire", contractBefore: "Avant l’essai",
      contractDuring: "Pendant", contractAfter: "Après", inputRuleOutput: "Entrée → règle → résultat",
      draftsSaved: (count) => `Essais enregistrés dans ce navigateur : ${count}`,
      booksComplete: (count) => `Laboratoires avec un carnet terminé : ${count} sur 4`,
      trialSummary: (count) => `${count} essais · avec tes mots`,
      evidenceEyebrow: "Que développes-tu ?", evidenceTitle: "Des traces de réflexion, pas seulement des points.",
      evidenceBody: "Chaque laboratoire laisse une trace claire : ce que tu as compris, modélisé, prédit, testé et expliqué.",
      trackEyebrow: "Premier parcours", trackTitle: "Penser en systèmes", openLabs: "Découvrir les laboratoires ouverts",
      open: "Ouvrir", review: "Revoir", later: "Prévu",
      recentEyebrow: "Ce que ta réflexion a montré", recentHasEvidence: "Voici les résultats réels de tes laboratoires.",
      recentEmpty: "Commence par un laboratoire.",
      previousRecord: "Entrée d’une version précédente", reviewNotebook: "Revoir le carnet →",
      emptyEvidence: "Nous ne remplirons pas cet espace avec des mesures inventées. Après un essai, il montrera ce que tu as réellement fait.",
      localNote: "Ton travail reste dans ce navigateur. Reviens avec le même appareil et le même navigateur.",
      trackStatus: "Quatre laboratoires interactifs sont disponibles. Les huit autres activités font partie du parcours et seront développées après les essais avec les familles.",
      missions: [
        ["Observer avant de résoudre", "Motifs et contraintes"], ["Transformer le désordre en étapes", "Ordre et décomposition"],
        ["Dessiner un système", "Entrées, règles, état et résultats"], ["Chercher un motif", "Répéter avant de coder"],
        ["Et si… ?", "Conditions et choix"], ["Mettre le système à l’épreuve", "Cas limites et défaillances"],
        ["Corriger la cause", "Débogage et raisonnement"], ["Simplifier le système", "Abstraction et réutilisation"],
        ["Demander une proposition à l’IA", "Spécification et esprit critique"], ["Tester l’IA", "Vérification et hypothèses"],
        ["Construire ton système", "Un projet tiré d’un vrai problème"], ["Expliquer tes choix", "Présenter et défendre ta conception"],
      ],
      evidence: [["Comprend", "Repère l’objectif et les contraintes"], ["Modélise", "Construit un modèle du système"], ["Prévoit", "Explique un résultat avant l’essai"], ["Teste", "Essaie les cas courants et les défaillances"], ["Explique", "Décrit pourquoi une solution fonctionne"]],
    },
    parent: {
      eyebrow: "Tableau de bord des parents", titleLead: "Comment ", titleTrail: " aborde un problème",
      intro: "Nous ne classons pas les enfants et ne leur attribuons pas de note d’intelligence. Nous montrons ce qui est apparu dans une activité et ce qu’il sera utile d’observer ensuite.",
      curriculum: "Parcours complet", childSpace: "Espace de l’enfant", latest: "Dernière trace enregistrée",
      noSummary: "Aucun résumé n’est encore disponible.",
      emptySummary: "Après le premier laboratoire, cet espace décrira ce que l’enfant a réellement fait, sans remplir le tableau de chiffres peu utiles.",
      fromLab: (mission) => `Du laboratoire « \u2068${mission}\u2069 »`, nextObjective: "Prochaine piste à observer",
      emptyObjective: "Commencez par un laboratoire et demandez à l’enfant ce qu’il prévoit avant de le lancer.",
      afterTest: "Une question à discuter après l’essai",
      evidenceEyebrow: "Traces d’apprentissage", evidenceTitle: "Cinq éléments à revoir.",
      evidenceBody: "Une trace signifie que cette action est apparue dans une activité ; ce n’est pas un jugement de maîtrise. Les réponses restent ici pour votre lecture et ne sont pas notées automatiquement.",
      recordedCount: (count) => `Laboratoires avec un exemple enregistré : ${count}`,
      notRecorded: "Aucune trace détaillée pour l’instant", historyEyebrow: "Dans le laboratoire",
      historyTitle: "Que s’est-il réellement passé ?", browse: "Parcourir les activités",
      trialCount: (count) => `Essais : ${count}`, olderRecord: "Entrée d’une version précédente",
      olderRecordDetail: "Cette entrée provient d’une version précédente. Elle ne contient pas les prédictions et résultats détaillés. Recommencez le laboratoire pour créer un carnet d’essais.",
      emptyTitle: "Aucune trace pour l’instant.", emptyBody: "Commencez dans l’espace de l’enfant. Ce tableau sera mis à jour après un laboratoire.",
      localNote: "Ces traces restent dans ce navigateur. Cette version ne comporte ni compte cloud ni correction automatique des réponses. Le tableau des parents n’a pas de code d’accès ; utilisez-le sur l’appareil familial en présence d’un adulte.",
      familyEyebrow: "Contrôle familial", familyTitle: "Vous contrôlez les données de ce navigateur.",
      familyBody: "Supprimez le surnom, les brouillons, les essais et les traces enregistrés pour ce site dans ce navigateur. Les fichiers et autres sites ne sont pas concernés.",
      deleteButton: "Supprimer les données de l’essai dans ce navigateur",
      deleteConfirm: "Le surnom, les brouillons et les traces enregistrés pour ce site dans ce navigateur seront supprimés. Cette action est irréversible. Continuer ?",
      deleteError: "Impossible de tout supprimer. Effacez les données de ce site dans les paramètres du navigateur.", dateLocale: "fr-MA",
      evidence: [["Comprend", "Repère l’objectif et les contraintes"], ["Modélise", "Construit un modèle du système"], ["Prévoit", "Explique un résultat avant l’essai"], ["Teste", "Essaie les cas courants et les défaillances"], ["Explique", "Décrit pourquoi une solution fonctionne"]],
      constraintLabel: "La contrainte choisie par l’enfant", explanationLabel: "L’explication de l’enfant après l’amélioration",
    },
    privacy: {
      eyebrow: "Pour les parents · version d’essai", title: "Confidentialité pendant l’essai BRKAR",
      intro: "Cette version est conçue comme un essai familial local. Ce n’est ni un compte cloud ni un service éducatif commercial complet.",
      sections: [
        { title: "Quelles données l’application enregistre-t-elle ?", body: "Le surnom facultatif de l’enfant, les brouillons, prédictions, essais et explications sont enregistrés sur cet appareil, dans le stockage du navigateur pour ce site. Nous ne demandons ni nom de parent, ni e-mail, ni âge exact. Vous pouvez modifier le surnom ou supprimer les données depuis le tableau de bord des parents. L’application ne chiffre pas ces données comme un coffre privé ; une personne utilisant le même profil de navigateur peut les voir." },
        { title: "Qui peut voir ces données ?", body: "Cette version n’a ni compte ni code de connexion. Toute personne utilisant le même profil de navigateur peut ouvrir l’espace enfant et le tableau de bord des parents. Utilisez un appareil familial avec un adulte présent. N’indiquez pas de nom complet, d’école, d’adresse ou d’information privée dans les champs de réponse." },
        { title: "Les réponses de l’enfant sont-elles envoyées à un autre service ?", body: "L’application n’envoie ni le profil ni les réponses à une API ou à un compte cloud. Elle n’utilise ni publicité, ni analytique, ni discussion avec une IA. Le site est hébergé sur Firebase Hosting ; l’hébergeur traite les requêtes techniques nécessaires à l’affichage des pages selon ses conditions et politiques." },
        { title: "Comment supprimer les données ?", body: "Dans le tableau de bord des parents, utilisez « Supprimer les données de l’essai dans ce navigateur » pour effacer le surnom, les brouillons et les traces de ce site. Effacer les données du site dans les paramètres du navigateur les supprime également. Il n’y a ni sauvegarde ni récupération après suppression." },
        { title: "Limites de cette version d’essai", body: "Le parcours, la présentation, les quatre laboratoires interactifs et leurs résultats sont disponibles en arabe, anglais et français. L’espace enfant, la configuration, la page de confidentialité et le tableau de bord des parents sont maintenant disponibles dans ces trois langues. Il n’y a ni paiement, ni connexion, ni synchronisation, ni traitement ni diagnostic. Ce texte décrit la version technique actuelle ; ce n’est pas une politique juridique définitive." },
      ],
      launchTitle: "Avant l’ouverture des inscriptions publiques",
      launchBody: "L’opérateur devra identifier l’organisation responsable et un moyen de contact pour les familles, puis examiner les exigences de protection des données, de consentement parental et d’hébergement avant d’élargir l’essai.",
      law: "Loi marocaine 09-08 sur la protection des données personnelles", back: "Retour au tableau des parents",
    },
  },
};
