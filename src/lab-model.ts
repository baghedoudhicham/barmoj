export type LabId = "water" | "routing" | "traffic" | "economy";
export type Settings = {
  scenario: "normal" | "limit" | "failure";
  stopAtLimit: boolean;
  safeguard: boolean;
  order: string[];
  blocked: boolean;
  mode: "ns" | "ew" | "both";
  interlock: boolean;
  reward: number;
};
export type Trial = {
  id: string;
  at: string;
  settings: Settings;
  prediction: string;
  reason: string;
  outcome: string;
  detail: string;
  safe: boolean;
  values?: number[];
};
export const labIds: LabId[] = ["water", "routing", "traffic", "economy"];
export const labs = {
  water: {
    number: "06",
    title: "خزان لا يفيض",
    goal: "املأ الخزان، وأوقف المضخة عند 80%. ماذا لو أخطأ الحساس؟",
    question: "أي معلومة تحتاجها كي توقف المضخة في الوقت المناسب؟",
    hint: "قارن مستوى الماء الحقيقي بقراءة الحساس. هل تثق بقراءة واحدة؟",
    prompt:
      "لماذا لم تكفِ القاعدة الأولى؟ استشهد بتجربة، ثم اشرح دور الحساس الاحتياطي.",
    transfer: "أين نحتاج مصدرًا ثانيًا للمعلومة في البيت؟",
    outcomes: ["المضخة تعمل", "المضخة متوقفة"],
  },
  routing: {
    number: "02",
    title: "رتّب التوصيلات",
    goal: "أوصل الدواء إلى A أولًا، ثم زر B وC مرة واحدة. عند إغلاق طريق A–B، تصل إلى B عبر C.",
    question: "أي وجهة لها الأولوية؟ وما الطريق البديل إذا أُغلق A–B؟",
    hint: "عند الإغلاق، الطريق المتاح من A إلى B يمر عبر C. غيّر ترتيب الزيارات.",
    prompt: "قارن ترتيبك قبل الإغلاق وبعده. كيف حافظت على أولوية الدواء؟",
    transfer: "كيف تعيد ترتيب مهام يومك إذا تغيّر أحد القيود؟",
    outcomes: ["الخطة تحترم القيود", "الخطة لا تحترم القيود"],
  },
  traffic: {
    number: "05",
    title: "تقاطع آمن",
    goal: "اسمح لاتجاه واحد بالمرور. اختبر طلب اللون الأخضر للاتجاهين في الوقت نفسه.",
    question: "لماذا لا يمكن منح اللون الأخضر للاتجاهين معًا؟",
    hint: "قاعدة الأمان ترفض الطلب المتعارض وتجعل الإشارتين حمراوين.",
    prompt:
      "ما الفرق بين الطلب الذي أدخلته والإشارات التي سمحت بها قاعدة الأمان؟",
    transfer: "هل تعرف نظامًا آخر يجب أن يرفض أمرين متعارضين؟",
    outcomes: ["اتجاه واحد يمر", "الاتجاهان يمران", "الاتجاهان متوقفان"],
  },
  economy: {
    number: "08",
    title: "لعبة لا تنكسر",
    goal: "ابدأ بـ10 موارد. في كل جولة تدفع 3 موارد وتكسب المكافأة. نريد استمرار اللعب دون نمو أو نفاد الموارد.",
    question: "ما العلاقة بين تكلفة الجولة ومكافأتها حتى تستمر اللعبة؟",
    hint: "الرصيد التالي = الرصيد الحالي − 3 + المكافأة. قارن خمس جولات بالقواعد نفسها.",
    prompt:
      "استشهد برصيد الجولة الخامسة قبل التعديل وبعده. لماذا أصبحت القاعدة متوازنة؟",
    transfer: "أين ترى دخلًا ومصروفًا يحتاجان إلى توازن؟",
    outcomes: ["الموارد تزيد", "الموارد ثابتة", "الموارد تنقص"],
  },
} as const;
export function initialSettings(): Settings {
  return {
    scenario: "normal",
    stopAtLimit: true,
    safeguard: false,
    order: ["A", "B", "C"],
    blocked: false,
    mode: "ns",
    interlock: false,
    reward: 5,
  };
}
export function simulate(
  id: LabId,
  s: Settings,
): Pick<Trial, "outcome" | "detail" | "safe" | "values"> {
  if (id === "water") {
    const [level, reading] =
      s.scenario === "normal"
        ? [45, 45]
        : s.scenario === "limit"
          ? [80, 80]
          : [96, 60];
    const stopped =
      (s.stopAtLimit && reading >= 80) || (s.safeguard && level !== reading);
    return {
      outcome: stopped ? "المضخة متوقفة" : "المضخة تعمل",
      safe: level < 80 ? !stopped : stopped,
      detail: `الماء الحقيقي ${level}%، قراءة الحساس ${reading}%. ${stopped ? (s.safeguard && level !== reading ? "اختلف الحساسان؛ أوقفت الحماية المضخة." : "بلغت القراءة الحد؛ أوقفت القاعدة المضخة.") : level >= 80 ? "الماء بلغ الحد لكن المضخة ما زالت تعمل." : "الماء دون الحد؛ التعبئة مستمرة."}`,
    };
  }
  if (id === "routing") {
    const safe =
      s.order[0] === "A" && (!s.blocked || s.order.join("") === "ACB");
    return {
      safe,
      outcome: safe ? "الخطة تحترم القيود" : "الخطة لا تحترم القيود",
      detail: `المسار: ${s.order.join(" ← ")}. ${s.order[0] !== "A" ? "الدواء لم يصل أولًا." : s.blocked && !safe ? "طريق A–B مغلق؛ يجب المرور عبر C قبل B." : s.blocked ? "وصل الدواء أولًا، ثم وصلت إلى B عبر C." : "وصل الدواء أولًا وزرت الوجهات الثلاث."}`,
    };
  }
  if (id === "traffic") {
    const conflict = s.mode === "both";
    return {
      safe: !conflict || s.interlock,
      outcome: conflict
        ? s.interlock
          ? "الاتجاهان متوقفان"
          : "الاتجاهان يمران"
        : "اتجاه واحد يمر",
      detail: conflict
        ? s.interlock
          ? "طُلب الأخضر للاتجاهين. رُفض الطلب وأصبحت الإشارتان حمراوين."
          : "أصبحت الإشارتان خضراوين؛ مسارا المرور يتقاطعان."
        : s.mode === "ns"
          ? "شمال / جنوب أخضر، شرق / غرب أحمر."
          : "شرق / غرب أخضر، شمال / جنوب أحمر.",
    };
  }
  const values = Array.from(
    { length: 5 },
    (_, i) => 10 + (i + 1) * (s.reward - 3),
  );
  return {
    safe: s.reward === 3,
    values,
    outcome:
      s.reward > 3
        ? "الموارد تزيد"
        : s.reward === 3
          ? "الموارد ثابتة"
          : "الموارد تنقص",
    detail: `من 10 إلى ${values[4]} موارد خلال خمس جولات. ${s.reward > 3 ? "المكافأة أكبر من التكلفة؛ التكرار وحده يزيد الموارد." : s.reward === 3 ? "المكافأة تساوي التكلفة؛ لا نمو ولا نفاد." : "المكافأة أقل من التكلفة؛ الاستمرار يستنزف الموارد."}`,
  };
}
export function settingsKey(id: LabId, s: Settings) {
  return JSON.stringify(
    id === "water"
      ? [s.scenario, s.stopAtLimit, s.safeguard]
      : id === "routing"
        ? [s.order, s.blocked]
        : id === "traffic"
          ? [s.mode, s.interlock]
          : [s.reward],
  );
}
export function milestones(id: LabId, trials: Trial[], settings: Settings) {
  const normal = trials.some((t) =>
    id === "economy"
      ? t.settings.reward > 3
      : t.safe &&
        (id === "water"
          ? t.settings.scenario === "normal" &&
            t.settings.stopAtLimit === settings.stopAtLimit &&
            t.settings.safeguard === settings.safeguard
          : id === "routing"
            ? !t.settings.blocked
            : t.settings.mode !== "both" &&
              t.settings.interlock === settings.interlock),
  );
  const failureIndex = trials.findIndex(
    (t) =>
      !t.safe &&
      (id === "water"
        ? t.settings.scenario === "failure" && !t.settings.safeguard
        : id === "routing"
          ? t.settings.blocked
          : id === "traffic"
            ? t.settings.mode === "both" && !t.settings.interlock
            : t.settings.reward > 3),
  );
  const retested =
    failureIndex >= 0 &&
    trials.some(
      (t, i) =>
        i > failureIndex &&
        t.safe &&
        settingsKey(id, t.settings) === settingsKey(id, settings) &&
        (id === "water"
          ? t.settings.scenario === "failure" && t.settings.safeguard
          : id === "routing"
            ? t.settings.blocked
            : id === "traffic"
              ? t.settings.mode === "both" && t.settings.interlock
              : t.settings.reward === 3),
    );
  const boundary =
    id !== "water" ||
    trials.some(
      (t) =>
        t.safe &&
        t.settings.scenario === "limit" &&
        t.settings.stopAtLimit === settings.stopAtLimit &&
        t.settings.safeguard === settings.safeguard,
    );
  return [
    {
      label:
        id === "economy"
          ? "اختبر نمو الموارد"
          : id === "routing"
            ? "اختبر الطرق المفتوحة"
            : "اختبر الحالة العادية بالقاعدة الحالية",
      done: normal,
    },
    ...(id === "water"
      ? [{ label: "اختبر الحد 80% بالقاعدة الحالية", done: boundary }]
      : []),
    { label: "لاحظ الفشل قبل إصلاحه", done: failureIndex >= 0 },
    { label: "أصلح الفشل واختبر إعدادك الحالي", done: retested },
  ];
}
export function canComplete(
  id: LabId,
  trials: Trial[],
  settings: Settings,
  observation: string,
  explanation: string,
) {
  return (
    observation.trim().length >= 8 &&
    explanation.trim().length >= 15 &&
    milestones(id, trials, settings).every((m) => m.done)
  );
}
export function describeSettings(id: LabId, s: Settings) {
  if (id === "water")
    return `${s.scenario === "normal" ? "ماء 45%" : s.scenario === "limit" ? "الحد 80%" : "ماء 96% / قراءة 60%"} · ${s.stopAtLimit ? "توقف عند الحد" : "استمرار عند الحد"} · ${s.safeguard ? "حساس احتياطي" : "حساس واحد"}`;
  if (id === "routing")
    return `${s.order.join(" ← ")} · ${s.blocked ? "A–B مغلق" : "الطرق مفتوحة"}`;
  if (id === "traffic")
    return `${s.mode === "both" ? "طلب الاتجاهين" : s.mode === "ns" ? "شمال / جنوب" : "شرق / غرب"} · ${s.interlock ? "حماية مفعّلة" : "دون حماية"}`;
  return `مكافأة ${s.reward} · تكلفة 3 · البداية 10`;
}
