import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  CircleDot,
  Gauge,
  Lightbulb,
  LockKeyhole,
  MapPinned,
  Play,
  Route as RouteIcon,
  ShieldCheck,
  Sparkles,
  TrafficCone,
  Workflow,
  Wrench,
} from "lucide-react";
import { Artifact, SectionTitle, Shell, SystemRail, TankDiagram } from "./components";
import { addEvidence, evidenceLabels, getEvidence, getProfile, missions, saveProfile } from "./data";

const routeByMission: Record<number, string> = {
  1: "/mission/routing",
  4: "/mission/traffic",
  5: "/mission/water",
  7: "/mission/economy",
};

const missionNameByRoute: Record<string, string> = {
  "/mission/routing": "رتّب التوصيلات",
  "/mission/traffic": "تقاطع آمن",
  "/mission/water": "خزان لا يفيض",
  "/mission/economy": "لعبة لا تنكسر",
};

function CompletionBar({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="completion-bar">
      <span>{label}</span>
      <b>{detail}</b>
    </div>
  );
}

function Reflection({ value, onChange, label, placeholder }: { value: string; onChange: (value: string) => void; label: string; placeholder: string }) {
  return (
    <label className="field-label">
      <span>{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} maxLength={500} />
    </label>
  );
}

function LabNav({ back = "/kid" }: { back?: string }) {
  return <Link className="lab-back" to={back}><ArrowRight size={16} /> العودة إلى المسار</Link>;
}

export function Landing() {
  return (
    <Shell>
      <main>
        <section className="hero wrap hero-logic">
          <div className="hero-copy">
            <p className="kicker">تجربة عائلية بإشراف وليّ الأمر · للأطفال 7–14 · عربي أولًا</p>
            <h1>لا نعلّم الطفل كتابة الكود.<br /><span>نعلّمه بناء نظام.</span></h1>
            <p className="hero-body">يفهم المشكلة، يكتشف ما ينقصها، يرسم العلاقات، يتوقع النتيجة، يكسر الحل عمدًا ثم يحسّنه. الكود والذكاء الاصطناعي أدوات تنفيذ عندما نحتاجها.</p>
            <div className="hero-actions">
              <Link className="button" to="/onboarding">ابدأ تجربة بِرْكار <ArrowLeft size={18} /></Link>
              <a className="button button-ghost" href="#method">شاهد طريقة التعلّم</a>
            </div>
          </div>
          <div className="hero-system logic-board" aria-label="مثال على نموذج نظام">
            <div className="system-caption">مدخل → قاعدة → حالة → مخرج</div>
            <div className="logic-grid">
              <div className="logic-node yellow"><small>01 · راقب</small><b>الحساس</b><span>ما الذي نعرفه؟</span></div>
              <div className="logic-connector">←</div>
              <div className="logic-node green"><small>02 · قرر</small><b>القاعدة</b><span>ماذا يجب أن يحدث؟</span></div>
              <div className="logic-connector">←</div>
              <div className="logic-node red"><small>03 · اكسر</small><b>العطل</b><span>ماذا لو كانت القراءة خاطئة؟</span></div>
            </div>
            <div className="annotation">الطفل يتعامل مع النظام نفسه، لا مع تعريف نظري منفصل عنه.</div>
          </div>
        </section>

        <section className="proof-band">
          <div className="wrap proof-path" aria-label="دورة التعلّم">
            {["راقب", "اسأل", "مثّل", "توقّع", "ابنِ", "اكسر", "أصلح", "حسّن", "اشرح"].map((step, index) => <div className="proof-step" key={step}><span>{String(index + 1).padStart(2, "0")}</span><b>{step}</b></div>)}
          </div>
        </section>

        <section className="wrap section" id="method">
          <SectionTitle eyebrow="منهج بِرْكار" title="التفكير قبل التنفيذ" body="لا نسأل الطفل إن كان يحفظ أمرًا برمجيًا. نسأله إن كان يستطيع فهم النظام، توقعه، اختباره عند الفشل ثم شرح قراره." />
          <div className="artifact-grid">
            <Artifact name="المُرسِل" tone="yellow">يعطي هدفًا ناقصًا عمدًا. على الطفل أن يسأل عن القيود والمعلومات المفقودة.</Artifact>
            <Artifact name="المسار" tone="green">يمثل الخطوات والحالات والعلاقات حتى يصبح التفكير مرئيًا وقابلًا للمراجعة.</Artifact>
            <Artifact name="العطل" tone="red">يدخل حالة فشل أو تناقضًا ويطلب تشخيص السبب بدل إصلاح السطح فقط.</Artifact>
            <Artifact name="المختبر" tone="blue">يشجع تجربة مضبوطة: غيّر عاملًا واحدًا، توقع النتيجة ثم قارنها بما حدث.</Artifact>
          </div>
        </section>

        <section className="wrap section" id="track">
          <SectionTitle eyebrow="فكّر كنظام" title="نفس طريقة التفكير، في أنظمة مختلفة" body="المهام تنتقل من الماء إلى الطرق والإشارات وقواعد الألعاب حتى يتعلم الطفل مبدأً يمكن نقله، لا قالبًا واحدًا يحفظه." />
          <div className="mission-showcase">
            <Link className="mission-poster water" to="/mission/water"><span>06</span><h3>خزان لا يفيض</h3><p>حساس · قاعدة · فشل · حماية</p><strong>مختبر كامل</strong></Link>
            <Link className="mission-poster route" to="/mission/routing"><span>02</span><h3>رتّب التوصيلات</h3><p>قيود · أولوية · إعادة تخطيط</p><strong>تفاعلي</strong></Link>
            <Link className="mission-poster traffic" to="/mission/traffic"><span>05</span><h3>تقاطع آمن</h3><p>حالات · شروط · تعارض</p><strong>تفاعلي</strong></Link>
            <Link className="mission-poster economy" to="/mission/economy"><span>08</span><h3>لعبة لا تنكسر</h3><p>حلقة تغذية · استغلال · موازنة</p><strong>تفاعلي</strong></Link>
          </div>
        </section>

        <section className="wrap section parent-promise">
          <div><p className="eyebrow">للأهل</p><h2>دليل على التفكير، لا لوحة نقاط.</h2><p className="muted-copy">كل تقرير مرتبط بسلوك حدث داخل مهمة فعلية.</p></div>
          <div className="evidence-strip">{evidenceLabels.map(([name, label]) => <div key={name}><b>{name}</b><span>{label}</span></div>)}</div>
          <Link className="button" to="/parent">شاهد لوحة الأهل <ArrowLeft size={18} /></Link>
        </section>
      </main>
    </Shell>
  );
}

export function Onboarding() {
  const initial = getProfile();
  const [child, setChild] = useState(initial.child);
  const [supervised, setSupervised] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const navigate = useNavigate();
  function submit(event: FormEvent) {
    event.preventDefault();
    if (!supervised) return;
    if (!saveProfile({ child })) {
      setStorageError(true);
      return;
    }
    navigate("/kid");
  }
  return (
    <Shell>
      <main className="wrap narrow section onboarding-wrap">
        <div className="onboarding-index"><span>01</span><b>وليّ الأمر</b><span>02</span><b>لقب اختياري</b><span>03</span><b>ابدأ</b></div>
        <SectionTitle level={1} eyebrow="إعداد الأسرة" title="بداية بسيطة، وبيانات أقل" body="هذه تجربة عائلية بإشراف بالغ. لا نطلب اسم وليّ الأمر أو العمر الدقيق أو البريد الإلكتروني." />
        <form className="form-panel" onSubmit={submit}>
          <label>لقب للطفل (اختياري)<input value={child} onChange={(event) => setChild(event.target.value)} placeholder="مثال: المستكشف" maxLength={24} autoComplete="off" /></label>
          <p className="privacy-hint">استخدم لقبًا بدل الاسم الكامل. لا تكتب معلومات عن المدرسة أو العنوان أو وسيلة التواصل.</p>
          <label className="supervision-check"><input type="checkbox" checked={supervised} onChange={(event) => setSupervised(event.target.checked)} required /> أنا وليّ الأمر أو المرافق البالغ، وسأبقى حاضرًا أثناء تجربة الطفل.</label>
          <p className="pilot-disclosure">التقدم والإجابات محفوظة في هذا المتصفح فقط، ولا تُرسل إلى حساب أو خدمة تحليلات داخل التطبيق. من يستخدم ملف المتصفح نفسه قد يتمكن من رؤية لوحة الأهل. <Link to="/privacy">اقرأ تفاصيل تجربة الأسرة.</Link></p>
          {storageError && <p role="alert" className="storage-alert">تعذّر حفظ اللقب في هذا المتصفح. تحقق من إعدادات التخزين ثم أعد المحاولة.</p>}
          <button className="button" type="submit" disabled={!supervised}>ادخل مساحة التعلّم <ArrowLeft size={18} /></button>
        </form>
      </main>
    </Shell>
  );
}

export function KidHome() {
  const profile = getProfile();
  const evidence = getEvidence();
  const completed = new Set(evidence.map((item) => item.mission));
  const recent = evidence.slice(0, 3);
  return (
    <Shell>
      <main className="wrap section">
        <div className="workspace-head"><div><p className="eyebrow">مساحة التعلّم</p><h1>السلام {profile.child}</h1><p>اليوم لا نبحث عن أسرع إجابة. نبحث عن نظام تستطيع شرحه.</p></div><div className="profile-stamp">{profile.child.charAt(0)}</div></div>

        <section className="workspace-split">
          <div className="current-mission">
            <div><p className="kicker">المهمة الحالية · 06 / العطل</p><h2>صمّم نظامًا يمنع خزان الماء من الفيضان</h2><p>اختبر الحالة العادية أولًا، ثم اجعل الحساس يعطي قراءة خاطئة واكتشف إن كان النظام ما يزال آمنًا.</p><Link className="text-link" to="/mission/water">ابدأ المختبر <ArrowLeft size={18}/></Link></div>
            <TankDiagram level={88} />
          </div>
          <aside className="signal-log">
            <p className="eyebrow">سجل التفكير</p>
            <h2>{evidence.length ? "ما أثبتّه حتى الآن" : "ابدأ بأول دليل"}</h2>
            {recent.length ? recent.map((item) => <div className="signal-entry" key={item.mission}><span>{item.items.slice(0,2).join(" · ")}</span><b>{item.mission}</b><p>{item.note}</p></div>) : <div className="empty-state compact">بعد إنهاء مختبر، سيظهر هنا ما فعلته فعليًا: ماذا توقعت، ماذا اختبرت، وكيف فسرت قرارك.</div>}
            <Link className="lab-back" to="/parent">اعرض الأدلة لوليّ الأمر <ArrowLeft size={16}/></Link>
          </aside>
        </section>

        <section className="learning-now"><div><p className="eyebrow">ما يتطور الآن</p><h2>من «هل يعمل؟» إلى «هل يبقى آمنًا عندما يفشل جزء؟»</h2><p>الفرق بين نجاح الحالة العادية وسلامة النظام هو أحد أهم التحولات في هذا المسار.</p></div><div className="skill-rail"><span>يتوقّع</span><span>يختبر</span><span>يفسّر</span></div></section>

        <section className="section-tight" id="missions">
          <div className="section-heading-row"><SectionTitle eyebrow="المسار الأول" title="فكّر كنظام" body="12 مهمة قصيرة. أربع منها مفتوحة الآن كنماذج تجريبية كاملة." /><div className="track-status"><span>مختبرات مفتوحة</span><b>4 / 12</b></div></div>
          <div className="mission-list">{missions.map(([title, desc], index) => {
            const route = routeByMission[index];
            const labName = route ? missionNameByRoute[route] : "";
            const isCompleted = labName ? completed.has(labName) : false;
            const isCurrent = index === 5;
            return <div className={`mission-row ${isCurrent ? "current" : ""} ${isCompleted ? "done" : ""}`} key={title}><span className="mission-index">{isCompleted ? <Check size={16}/> : String(index + 1).padStart(2, "0")}</span><div><b>{title}</b><small>{desc}</small></div>{route ? <Link to={route}>{isCompleted ? "راجع" : "فتح"} <ArrowLeft size={16} /></Link> : <span className="locked"><LockKeyhole size={15} /> لاحقًا</span>}</div>;
          })}</div>
        </section>

        <section className="section-tight">
          <SectionTitle eyebrow="مشاريع لاحقة" title="أنظمة أكبر نبنيها من مهارات صغيرة" body="هذه ليست دروسًا جديدة؛ بل مساحات يستخدم فيها الطفل الأدوات نفسها في مشكلة أطول." />
          <div className="project-rail">
            <div className="project-block green"><Workflow size={24}/><span>مشروع 01</span><b>بيت ذكي بسيط</b><p>حساسات · حالات · تنبيه</p><small>قريبًا</small></div>
            <div className="project-block yellow"><MapPinned size={24}/><span>مشروع 02</span><b>توزيع ماء الحي</b><p>قيود · سعة · أولوية</p><small>قريبًا</small></div>
            <div className="project-block red"><Wrench size={24}/><span>مشروع 03</span><b>اختبر اقتراح AI</b><p>مواصفة · نقد · تحقق</p><small>لاحقًا في المسار</small></div>
          </div>
        </section>
      </main>
    </Shell>
  );
}

export function WaterMission() {
  const [stage, setStage] = useState(0);
  const [questions, setQuestions] = useState<string[]>([]);
  const [prediction, setPrediction] = useState("");
  const [rule, setRule] = useState<"safe" | "unsafe">("safe");
  const [scenario, setScenario] = useState<"normal" | "limit" | "failure">("normal");
  const [tested, setTested] = useState<string[]>([]);
  const [safeguard, setSafeguard] = useState(false);
  const [retestedFailure, setRetestedFailure] = useState(false);
  const [explanation, setExplanation] = useState("");
  const navigate = useNavigate();
  const scenarioData = { normal: { level: 45, reading: 45 }, limit: { level: 88, reading: 88 }, failure: { level: 96, reading: 60 } }[scenario];
  const stopped = (rule === "safe" && scenarioData.reading >= 80) || (safeguard && scenario === "failure");
  const run = () => {
    setTested((old) => old.includes(scenario) ? old : [...old, scenario]);
    if (scenario === "failure" && safeguard) setRetestedFailure(true);
  };
  const canNext = stage === 0 ? questions.length >= 2 && prediction.trim().length >= 10 : stage === 1 ? rule === "safe" : stage === 2 ? tested.length === 3 && safeguard && retestedFailure : explanation.trim().length >= 18;
  function next() {
    if (stage < 3) return setStage(stage + 1);
    addEvidence({ mission: "خزان لا يفيض", items: ["يفهم", "يمثّل", "يتوقّع", "يختبر", "يفسّر"], note: "سأل عن القيود، توقع سلوك الخزان، اختبر قراءة حسّاس خاطئة، أضاف حماية احتياطية ثم أعاد اختبار الفشل." });
    navigate("/result");
  }
  const questionOptions = ["متى نعتبر الخزان ممتلئًا؟", "ماذا تفعل المضخة عند الحد؟", "كيف نعرف أن الحساس يعمل؟", "من يحتاج إلى التنبيه؟"];
  return <Shell><main className="wrap section mission-layout"><LabNav/><div className="mission-top"><div><p className="eyebrow">المهمة 06 · اكسر النظام</p><h1>خزان لا يفيض</h1><p>ابنِ قاعدة، توقع سلوكها، ثم ابحث عن الحالة التي تكسرها.</p></div><span className="stage-count">{stage + 1} / 4</span></div><SystemRail active={stage}/>
    <div className="lab-grid"><aside className="lab-canvas"><TankDiagram level={scenarioData.level} faulty={scenario === "failure"} stopped={tested.includes(scenario) && stopped}/><Artifact name={stage === 0 ? "المُرسِل" : stage === 1 ? "المسار" : stage === 2 ? "العطل" : "المختبر"} tone={stage === 2 ? "red" : stage === 0 ? "yellow" : stage === 1 ? "green" : "blue"}>{stage === 0 ? "الهدف واضح، لكن القيود ناقصة. ما الذي يجب أن تعرفه قبل الحل؟" : stage === 1 ? "قراءة الحساس تمر بقاعدة ثم تنتج فعلًا يمكن ملاحظته." : stage === 2 ? "الماء 96%، لكن الحساس يقول 60%. اختبر الفشل ثم أضف حماية." : "التحسين لا يكتمل حتى تعيد اختبار الحالة التي كسرت النظام."}</Artifact></aside>
      <section className="lab-panel">
        {stage === 0 && <><p className="panel-step">01 / افهم</p><h2>اسأل قبل أن تبني</h2><p>اختر سؤالين على الأقل يكشفان قيودًا مهمة، ثم اكتب توقعك قبل تشغيل أي تجربة.</p><div className="question-grid">{questionOptions.map((question) => <button key={question} className={`choice ${questions.includes(question) ? "selected" : ""}`} onClick={() => setQuestions((old) => old.includes(question) ? old.filter((item) => item !== question) : [...old, question])}>{questions.includes(question) ? <Check size={16}/> : <CircleDot size={16}/>} {question}</button>)}</div><Reflection value={prediction} onChange={setPrediction} label="ما الذي تتوقع أن يحدث عند وصول الماء إلى 80%؟" placeholder="أتوقع أن... لأن..."/></>}
        {stage === 1 && <><p className="panel-step">02 / صمّم</p><h2>اختر قاعدة يمكن اختبارها</h2><p>الحساس مدخل. القاعدة تحول القراءة إلى قرار. القرار ينتج مخرجًا يمكن ملاحظته.</p><div className="system-board"><div className="board-node">حساس الماء<small>مدخل</small></div><span>←</span><div className="board-node accent">80%<small>شرط</small></div><span>←</span><div className="board-node">المضخة + التنبيه<small>مخرج</small></div></div><div className="choice-stack"><button className={`choice ${rule === "safe" ? "selected" : ""}`} onClick={() => setRule("safe")}><ShieldCheck size={17}/> عند 80%: أوقف المضخة وأرسل تنبيهًا</button><button className={`choice ${rule === "unsafe" ? "danger-selected" : ""}`} onClick={() => setRule("unsafe")}><AlertTriangle size={17}/> عند 80%: استمر في تشغيل المضخة</button></div></>}
        {stage === 2 && <><p className="panel-step">03 / اختبر</p><h2>لا تختبر النجاح فقط</h2><p>شغّل الحالات الثلاث. بعد ظهور قراءة الحساس الخاطئة، أضف حماية ثم أعد اختبار حالة الفشل.</p><div className="test-grid">{(["normal","limit","failure"] as const).map((id) => <button key={id} className={`test-button ${scenario === id ? "active" : ""}`} onClick={() => setScenario(id)}><span>{id === "normal" ? "45%" : id === "limit" ? "88%" : "96% / يقرأ 60%"}</span><b>{id === "normal" ? "ماء منخفض" : id === "limit" ? "بلغ الحد" : "حساس معطّل"}</b>{tested.includes(id) && <Check size={15}/>}</button>)}</div><button className="button full" onClick={run}><Play size={17}/> شغّل التجربة</button>{tested.includes(scenario) && <div className={`lab-status ${scenario === "failure" && !safeguard ? "failed" : ""}`}>{scenario === "normal" ? "المضخة تعمل لأن المستوى أقل من الحد." : scenario === "limit" ? rule === "safe" ? "القاعدة أوقفت المضخة عند الحد." : "القاعدة غير آمنة: المضخة تواصل العمل." : safeguard ? "الحماية اكتشفت اختلاف القراءات وأوقفت المضخة." : "العطل مرّ دون اكتشاف: القراءة 60% رغم أن الخزان عند 96%."}</div>}{tested.includes("failure") && <label className="safeguard"><input type="checkbox" checked={safeguard} onChange={(event) => {setSafeguard(event.target.checked);setRetestedFailure(false)}}/> أضف قراءة احتياطية. إذا اختلف الحساسان، أوقف المضخة وأرسل تنبيهًا.</label>}<CompletionBar label="حالات مختبرة" detail={`${tested.length} / 3${retestedFailure ? " · أعيد اختبار الفشل" : ""}`}/></>}
        {stage === 3 && <><p className="panel-step">04 / حسّن واشرح</p><h2>لماذا أصبح النظام أكثر أمانًا؟</h2><p>الشرح جزء من الحل. لا يكفي أن تضيف حماية؛ وضح أي فشل تعالج ولماذا.</p><Reflection value={explanation} onChange={setExplanation} label="اشرح قرارك" placeholder="الحساس الأول وحده لا يكفي لأن... والحماية الجديدة..."/><div className="reasoning-note"><Lightbulb size={18}/><p>الاختبار الجيد لا يثبت أن النظام يعمل فقط. يكشف أيضًا متى يتوقف عن العمل.</p></div></>}
        <div className="panel-actions"><button className="button button-ghost" disabled={stage === 0} onClick={() => setStage(Math.max(0, stage - 1))}><ArrowRight size={17}/> رجوع</button><button className="button" disabled={!canNext} onClick={next}>{stage === 3 ? "سجّل الدليل" : "تابع"}<ArrowLeft size={17}/></button></div>
      </section></div></main></Shell>;
}

const stopsSeed = [
  { id: "A", name: "صيدلية", constraint: "يجب أن تصل أولًا" },
  { id: "B", name: "مكتبة", constraint: "الطريق القصير قد يُغلق" },
  { id: "C", name: "منزل", constraint: "لا يوجد قيد زمني" },
];

export function RoutingMission() {
  const [stops, setStops] = useState(stopsSeed);
  const [prediction, setPrediction] = useState("");
  const [blocked, setBlocked] = useState(false);
  const [ran, setRan] = useState(false);
  const [reflection, setReflection] = useState("");
  const navigate = useNavigate();
  const move = (index: number, direction: -1 | 1) => { const target = index + direction; if (target < 0 || target >= stops.length) return; const next = [...stops]; [next[index], next[target]] = [next[target], next[index]]; setStops(next); setRan(false); };
  const safe = stops[0].id === "A" && (!blocked || stops[2].id === "B");
  const complete = blocked && ran && safe && prediction.trim().length >= 10 && reflection.trim().length >= 15;
  function finish() { addEvidence({ mission: "رتّب التوصيلات", items: ["يفهم", "يمثّل", "يتوقّع", "يختبر", "يفسّر"], note: "حدد القيد الزمني، رتب الوجهات، توقع أثر إغلاق الطريق ثم أعاد التخطيط وشرح سبب الترتيب الجديد." }); navigate("/result"); }
  return <Shell><main className="wrap section mission-layout"><LabNav/><div className="mission-top"><div><p className="eyebrow">المهمة 02 · فكّك ورتّب</p><h1>رتّب التوصيلات</h1><p>الخطة الجيدة ليست الأقصر دائمًا. يجب أن تبقى منطقية عندما يظهر قيد جديد.</p></div><RouteIcon size={42}/></div><SystemRail active={3}/>
    <div className="lab-grid"><aside className="lab-canvas route-board"><div className="route-sequence"><span className="route-chip depot">المخزن</span>{stops.map((stop) => <span className={`route-chip ${stop.id.toLowerCase()}`} key={stop.id}>{stop.id}</span>)}</div>{blocked && <div className="road-block"><AlertTriangle size={18}/> الطريق المباشر إلى B مغلق</div>}<Artifact name="المسار" tone="green">المسار ليس قائمة أماكن فقط. هو ترتيب يبرره هدف وقيود يمكن أن تتغير.</Artifact></aside>
      <section className="lab-panel"><p className="panel-step">توقع → رتّب → اكسر → أعد التخطيط</p><h2>أي قيد يجب أن يقود الخطة؟</h2><Reflection value={prediction} onChange={setPrediction} label="قبل أن ترتب: ماذا يجب أن يحدث أولًا ولماذا؟" placeholder="يجب أن تبدأ الخطة بـ... لأن..."/><div className="stop-list">{stops.map((stop,index) => <div className="stop-row" key={stop.id}><span className="stop-code">{index+1}</span><div><b>{stop.id} · {stop.name}</b><small>{stop.constraint}</small></div><div className="reorder"><button onClick={() => move(index,-1)} aria-label="تحريك للأعلى"><ChevronUp size={17}/></button><button onClick={() => move(index,1)} aria-label="تحريك للأسفل"><ChevronDown size={17}/></button></div></div>)}</div><label className="safeguard"><input type="checkbox" checked={blocked} onChange={(event) => {setBlocked(event.target.checked);setRan(false)}}/> أدخل حالة فشل: الطريق المباشر إلى B مغلق.</label><button className="button full" onClick={() => setRan(true)}><Play size={17}/> اختبر الخطة</button>{ran && <div className={`lab-status ${safe ? "" : "failed"}`}>{safe ? blocked ? "الخطة أبقت A أولًا وأجّلت B بعد ظهور القيد الجديد." : "الخطة تحترم أولوية A. الآن أدخل فشلًا واختبر قدرتها على التكيف." : "الخطة لا تحترم جميع القيود. راجع من يجب أن يصل أولًا وأين تضع B بعد الإغلاق."}</div>}{blocked && ran && safe && <Reflection value={reflection} onChange={setReflection} label="اشرح إعادة التخطيط" placeholder="غيّرت الترتيب لأن... ولم أكتفِ بأقصر طريق لأن..."/>}<button className="button full secondary" disabled={!complete} onClick={finish}><Check size={17}/> سجّل دليل التعلّم</button></section></div></main></Shell>;
}

export function TrafficMission() {
  const [mode, setMode] = useState<"ns" | "ew" | "both">("ns");
  const [interlock, setInterlock] = useState(false);
  const [ran, setRan] = useState(false);
  const [sawConflict, setSawConflict] = useState(false);
  const [safeRetest, setSafeRetest] = useState(false);
  const [explanation, setExplanation] = useState("");
  const navigate = useNavigate();
  const conflict = mode === "both" && !interlock;
  function run() { setRan(true); if (mode === "both" && !interlock) setSawConflict(true); if (mode === "both" && interlock) setSafeRetest(true); }
  const complete = sawConflict && safeRetest && explanation.trim().length >= 15;
  function finish() { addEvidence({ mission: "تقاطع آمن", items: ["يمثّل", "يتوقّع", "يختبر", "يفسّر"], note: "أنشأ حالة تعارض عمدًا، لاحظ فشل النظام، أضاف قاعدة أمان ثم أعاد اختبار الحالة نفسها وفسر سبب رفضها." }); navigate("/result"); }
  return <Shell><main className="wrap section mission-layout"><LabNav/><div className="mission-top"><div><p className="eyebrow">المهمة 05 · ماذا لو؟</p><h1>تقاطع آمن</h1><p>عرّف الحالات، ثم حاول إنشاء حالة غير آمنة لترى هل يستطيع النظام رفضها.</p></div><TrafficCone size={42}/></div><SystemRail active={3}/>
    <div className="lab-grid"><aside className="lab-canvas traffic-board2"><div className="traffic-cross"><div className="traffic-road vertical"/><div className="traffic-road horizontal"/><div className={`traffic-light north ${mode !== "ew" ? "go" : "stop"}`}/><div className={`traffic-light east ${mode !== "ns" ? "go" : "stop"}`}/><span className="traffic-core">حالة</span></div><Artifact name="العطل" tone="red">اختبر الحالة التي لا تريد للنظام أن يسمح بها. الأمان يظهر عندما يرفض النظام التناقض.</Artifact></aside>
      <section className="lab-panel"><p className="panel-step">حالة → تعارض → قاعدة أمان → إعادة اختبار</p><h2>من يملك اللون الأخضر؟</h2><div className="scenario-tabs"><button className={mode === "ns" ? "active" : ""} onClick={() => {setMode("ns");setRan(false)}}>شمال / جنوب</button><button className={mode === "ew" ? "active" : ""} onClick={() => {setMode("ew");setRan(false)}}>شرق / غرب</button><button className={mode === "both" ? "active" : ""} onClick={() => {setMode("both");setRan(false)}}>كلاهما</button></div><button className="button full" onClick={run}><Play size={17}/> اختبر الحالة</button>{ran && <div className={`lab-status ${conflict ? "failed" : ""}`}>{conflict ? "فشل متعمد: الاتجاهان أخضران في الوقت نفسه." : mode === "both" && interlock ? "قاعدة الأمان رفضت التعارض وحولت الحالة إلى توقف آمن." : "هذه حالة عادية. جرّب «كلاهما» لتبحث عن التعارض."}</div>}{sawConflict && <label className="safeguard"><input type="checkbox" checked={interlock} onChange={(event) => {setInterlock(event.target.checked);setRan(false);setSafeRetest(false)}}/> أضف قاعدة أمان: إذا طُلب الأخضر للاتجاهين، ارفض الطلب واجعل الاتجاهين أحمر.</label>}{safeRetest && <Reflection value={explanation} onChange={setExplanation} label="لماذا رفض الحالة أفضل من محاولة تنفيذها؟" placeholder="لأن النظام يجب أن... وعندما يظهر تعارض..."/>}<CompletionBar label="اختبار الفشل" detail={`${sawConflict ? "شوهد" : "لم يُختبر"} · إعادة الاختبار ${safeRetest ? "تمت" : "مطلوبة"}`}/><button className="button full secondary" disabled={!complete} onClick={finish}><Check size={17}/> سجّل دليل التعلّم</button></section></div></main></Shell>;
}

export function EconomyMission() {
  const [reward, setReward] = useState(5);
  const [tested, setTested] = useState(false);
  const [sawRunaway, setSawRunaway] = useState(false);
  const [balancedTest, setBalancedTest] = useState(false);
  const [explanation, setExplanation] = useState("");
  const navigate = useNavigate();
  const turns = useMemo(() => Array.from({ length: 5 }, (_, index) => Math.round(10 * Math.pow(reward / 3.2, index))), [reward]);
  const runaway = reward >= 5;
  function run() { setTested(true); if (runaway) setSawRunaway(true); if (!runaway && sawRunaway) setBalancedTest(true); }
  const complete = sawRunaway && balancedTest && explanation.trim().length >= 15;
  function finish() { addEvidence({ mission: "لعبة لا تنكسر", items: ["يتوقّع", "يختبر", "يفسّر"], note: "راقب تضخم المكافأة عبر عدة جولات، عدّل قاعدة واحدة ثم قارن السلوك الجديد وشرح أثر حلقة التغذية الراجعة." }); navigate("/result"); }
  return <Shell><main className="wrap section mission-layout"><LabNav/><div className="mission-top"><div><p className="eyebrow">المهمة 08 · اجعل النظام أبسط</p><h1>لعبة لا تنكسر</h1><p>قاعدة صغيرة قد تغيّر النظام كله بعد عدة جولات. اختبر الزمن، لا اللحظة فقط.</p></div><Sparkles size={42}/></div><SystemRail active={4}/>
    <div className="lab-grid"><aside className="lab-canvas economy-board2"><div className="feedback-loop"><div className="loop-node">يلعب</div><span>←</span><div className="loop-node reward">يكسب {reward}</div><span>←</span><div className="loop-node">يطوّر</div><span className="loop-return">↺</span></div><Artifact name="المختبر" tone="blue">حلقة التغذية الراجعة لا تظهر من جولة واحدة. راقب كيف تتراكم النتيجة مع الوقت.</Artifact></aside>
      <section className="lab-panel"><p className="panel-step">قاعدة → عدة جولات → أثر غير مقصود → تعديل</p><h2>ما مقدار المكافأة في كل جولة؟</h2><div className="counter"><button onClick={() => {setReward(Math.max(2,reward-1));setTested(false)}}>−</button><b>{reward}</b><button onClick={() => {setReward(Math.min(7,reward+1));setTested(false)}}>+</button></div><button className="button full" onClick={run}><Play size={17}/> شغّل خمس جولات</button>{tested && <><div className="turns">{turns.map((value,index) => <div key={index}><span>جولة {index+1}</span><b>{value}</b></div>)}</div><div className={`lab-status ${runaway ? "failed" : ""}`}>{runaway ? "القيمة تتضخم بسرعة. اللاعب قد يستغل الحلقة بدل اتخاذ قرارات جيدة." : sawRunaway ? "النمو أصبح أبطأ بعد تعديل القاعدة. قارن السلوكين واشرح لماذا تغير النظام." : "النمو معتدل. ارفع المكافأة أولًا حتى ترى كيف يمكن أن تنهار الحلقة."}</div></>}{sawRunaway && <div className="reasoning-note"><AlertTriangle size={18}/><p>الآن غيّر القاعدة إلى قيمة أقل من 5 وشغّل الجولات نفسها. يجب أن تقارن نفس النظام قبل وبعد تعديل واحد.</p></div>}{balancedTest && <Reflection value={explanation} onChange={setExplanation} label="ما الذي تغيّر عندما عدلت قاعدة واحدة؟" placeholder="عندما كانت المكافأة... حدث... وبعد تقليلها..."/>}<CompletionBar label="المقارنة" detail={`${sawRunaway ? "رأيت الحلقة المنفلتة" : "لم ترها بعد"} · ${balancedTest ? "اختبرت التعديل" : "التعديل غير مختبر"}`}/><button className="button full secondary" disabled={!complete} onClick={finish}><Check size={17}/> سجّل دليل التعلّم</button></section></div></main></Shell>;
}

export function Result() {
  const profile = getProfile();
  const evidence = getEvidence();
  const latest = evidence[0];
  return <Shell><main className="wrap narrow section result-page"><div className="result-mark"><ShieldCheck size={42}/></div><p className="eyebrow">تم تسجيل دليل جديد</p><h1>أحسنت التفكير يا {profile.child}</h1><p className="result-lead">{latest ? latest.note : "أنهيت المهمة وسجلت طريقة تفكيرك."}</p>{latest && <div className="result-evidence"><span>المهمة</span><b>{latest.mission}</b><div>{latest.items.map((item) => <em key={item}>{item}</em>)}</div></div>}<div className="hero-actions"><Link className="button" to="/kid">تابع المسار</Link><Link className="button button-ghost" to="/parent">اعرض الدليل لوليّ الأمر</Link></div></main></Shell>;
}

export function ParentDashboard() {
  const profile = getProfile();
  const evidence = getEvidence();
  const latest = evidence[0];
  const coverage = evidenceLabels.map(([name,label]) => ({ name, label, count: evidence.filter((entry) => entry.items.includes(name)).length }));
  return <Shell><main className="wrap section"><div className="parent-head"><div><p className="eyebrow">لوحة الأهل</p><h1>كيف يفكّر {profile.child}؟</h1><p>لا نقارن الطفل بغيره ولا نحول التفكير إلى درجة. نعرض أفعالًا حدثت داخل مهمات محددة، ثم نحدد ما نريد ملاحظته لاحقًا.</p></div><Link className="button button-ghost" to="/kid">مساحة الطفل</Link></div>
    <section className="parent-grid"><div className="parent-narrative"><div><p className="kicker">آخر دليل</p><h2>{latest ? latest.mission : "لم تبدأ مهمة بعد"}</h2><p>{latest ? latest.note : "بعد أول مختبر سنعرض هنا ماذا فهم الطفل، ماذا توقع، ما الذي اختبره وكيف فسر قراره."}</p></div></div><div className="next-step-panel"><span>ما نبحث عنه بعد ذلك</span><b>{latest ? "هل ينقل الطفل طريقة التفكير نفسها إلى نظام مختلف؟" : "إكمال مختبر واحد وبناء أول دليل قابل للملاحظة."}</b><p>الهدف هو انتقال المهارة من مثال إلى آخر، لا جمع عدد أكبر من الإجابات.</p></div></section>
    <section className="section-tight"><SectionTitle eyebrow="أدلة التعلّم" title="خمسة أفعال يمكن ملاحظتها" body="العدد هنا يعني عدد المهمات التي ظهر فيها السلوك، وليس درجة أو ترتيبًا."/><div className="evidence-detail-grid">{coverage.map((item) => <div className={`evidence-detail ${item.count ? "observed" : ""}`} key={item.name}><div><span>{item.count ? <Check size={17}/> : <CircleDot size={17}/>}</span><b>{item.name}</b></div><p>{item.label}</p><small>{item.count ? `ظهر في ${item.count} ${item.count === 1 ? "مهمة" : "مهمات"}` : "لم يظهر بعد"}</small></div>)}</div></section>
    <section className="section-tight"><SectionTitle eyebrow="السجل" title="أمثلة من سلوك الطفل" />{evidence.length ? <div className="timeline">{evidence.map((item) => <div key={item.mission}><span/><div><b>{item.mission}</b><p>{item.note}</p><small>{item.items.join(" · ")}</small></div></div>)}</div> : <div className="empty-state">لا توجد بيانات بعد. نترك هذه المساحة فارغة بدل ملئها بمقاييس افتراضية.</div>}</section>
  </main></Shell>;
}
