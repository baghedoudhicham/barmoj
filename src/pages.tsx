import { FormEvent, useMemo, useState } from "react";
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
  LockKeyhole,
  MapPinned,
  Play,
  RotateCcw,
  Route as RouteIcon,
  ShieldCheck,
  Sparkles,
  TrafficCone,
} from "lucide-react";
import { Artifact, MissionLink, SectionTitle, Shell, SystemRail, TankDiagram } from "./components";
import { addEvidence, evidenceLabels, getEvidence, getProfile, missions, saveProfile } from "./data";

export function Landing() {
  return (
    <Shell>
      <main>
        <section className="hero wrap">
          <div className="hero-copy">
            <p className="kicker">للأطفال 7–14 · عربي أولًا</p>
            <h1>لا نعلّم الطفل كتابة الكود.<br /><span>نعلّمه بناء نظام.</span></h1>
            <p className="hero-body">يفهم المشكلة، يفككها، يرسم العلاقات، يتوقع النتيجة، يختبر الفشل ثم يحسّن الحل. الكود وAI أدوات تنفيذ عندما نحتاجها.</p>
            <div className="hero-actions">
              <Link className="button" to="/onboarding">ابدأ تجربة برموج <ArrowLeft size={18} /></Link>
              <a className="button button-ghost" href="#method">شاهد كيف نتعلّم</a>
            </div>
          </div>
          <div className="hero-system">
            <div className="system-caption">نظام صغير يمكن لمسه</div>
            <TankDiagram level={78} />
            <div className="annotation">الطفل يرى المدخل ← القاعدة ← الحالة ← المخرج، لا تعريفًا مجردًا.</div>
          </div>
        </section>

        <section className="wrap section" id="method">
          <SectionTitle eyebrow="منهج برموج" title="التفكير قبل التنفيذ" body="المهمة الجيدة لا تسأل: هل تعرف الأمر البرمجي؟ بل: هل تستطيع فهم النظام، توقعه، كسره، ثم شرحه؟" />
          <SystemRail active={4} />
          <div className="artifact-grid">
            <Artifact name="المُرسِل" tone="yellow">هدف ناقص عمدًا. على الطفل أن يسأل عن القيود والمعلومات المفقودة.</Artifact>
            <Artifact name="المسار" tone="green">يمثل الخطوات والحالات والعلاقات بدل حفظ قائمة تعليمات.</Artifact>
            <Artifact name="العطل" tone="red">يقدم خللًا أو تناقضًا ويطلب تشخيص السبب، لا مجرد إصلاح السطح.</Artifact>
            <Artifact name="المختبر" tone="blue">تجربة مضبوطة: غيّر عاملًا واحدًا، توقع النتيجة، ثم قارن.</Artifact>
          </div>
        </section>

        <section className="wrap section" id="track">
          <SectionTitle eyebrow="فكّر كنظام" title="أربع مشاكل، أربع طرق للتفكير" body="نفس المنهج ينتقل من أنظمة مائية إلى طرق وإشارات وقواعد ألعاب حتى لا يصبح التعلم تدريبًا على قالب واحد." />
          <div className="mission-showcase">
            <Link className="mission-poster water" to="/mission/water"><span>06</span><h3>خزان لا يفيض</h3><p>حساس · قاعدة · فشل · حماية</p><strong>مختبر كامل</strong></Link>
            <Link className="mission-poster route" to="/mission/routing"><span>02</span><h3>رتّب التوصيلات</h3><p>قيود · أولوية · إعادة تخطيط</p><strong>تفاعلي</strong></Link>
            <Link className="mission-poster traffic" to="/mission/traffic"><span>05</span><h3>تقاطع آمن</h3><p>حالات · شروط · تعارض</p><strong>تفاعلي</strong></Link>
            <Link className="mission-poster economy" to="/mission/economy"><span>08</span><h3>لعبة لا تنكسر</h3><p>حلقة تغذية · استغلال · موازنة</p><strong>تفاعلي</strong></Link>
          </div>
        </section>

        <section className="wrap section parent-promise">
          <div><p className="eyebrow">للأهل</p><h2>لا نعرض نقاطًا فقط. نعرض دليلًا على التفكير.</h2></div>
          <div className="evidence-strip">{evidenceLabels.map(([name, label]) => <div key={name}><b>{name}</b><span>{label}</span></div>)}</div>
          <Link className="button" to="/parent">شاهد لوحة الأهل <ArrowLeft size={18} /></Link>
        </section>
      </main>
    </Shell>
  );
}

export function Onboarding() {
  const initial = getProfile();
  const [parent, setParent] = useState(initial.parent);
  const [child, setChild] = useState(initial.child);
  const [age, setAge] = useState(initial.age);
  const navigate = useNavigate();
  function submit(event: FormEvent) {
    event.preventDefault();
    saveProfile({ parent: parent.trim(), child: child.trim() || "سلمى", age });
    navigate("/kid");
  }
  return (
    <Shell><main className="wrap narrow section"><SectionTitle eyebrow="إعداد الأسرة" title="نبدأ بالطفل، لا بالحساب" body="هذه نسخة تجريبية محلية. لا تُرسل البيانات إلى خادم." />
      <form className="form-panel" onSubmit={submit}>
        <label>اسم وليّ الأمر<input value={parent} onChange={(e) => setParent(e.target.value)} placeholder="مثال: أمينة" /></label>
        <label>اسم الطفل أو لقبه<input value={child} onChange={(e) => setChild(e.target.value)} placeholder="مثال: سلمى" required /></label>
        <label>العمر<select value={age} onChange={(e) => setAge(e.target.value)}><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option><option>13</option><option>14</option></select></label>
        <button className="button" type="submit">ادخل مساحة التعلّم <ArrowLeft size={18} /></button>
      </form>
    </main></Shell>
  );
}

export function KidHome() {
  const profile = getProfile();
  const evidence = getEvidence();
  return (
    <Shell><main className="wrap section">
      <div className="workspace-head"><div><p className="eyebrow">مساحة التعلّم</p><h1>السلام {profile.child}</h1><p>اليوم سنبني نظامًا ثم نحاول كسره.</p></div><div className="profile-stamp">{profile.child.charAt(0)}</div></div>
      <section className="current-mission">
        <div><p className="kicker">المهمة الحالية · 06 / العطل</p><h2>صمّم نظامًا يمنع خزان الماء من الفيضان</h2><p>لن نختبر الحالة الصحيحة فقط. سنجعل الحساس يكذب ونرى هل يبقى النظام آمنًا.</p><MissionLink to="/mission/water" label="ابدأ المختبر">افهم → صمّم → اختبر → حسّن</MissionLink></div>
        <TankDiagram level={88} />
      </section>
      <section className="learning-now"><div><p className="eyebrow">ما يتطور الآن</p><h2>التوقع قبل الضغط على زر التشغيل</h2><p>برموج يعطي قيمة أكبر للتفسير والاختبار من السرعة أو جمع النقاط.</p></div><div className="skill-rail"><span>يتوقّع</span><span>يختبر</span><span>يفسّر</span></div></section>
      <section className="section-tight" id="missions"><SectionTitle eyebrow="المسار الأول" title="فكّر كنظام" />
        <div className="mission-list">{missions.map(([title, desc], index) => {
          const route = index === 1 ? "/mission/routing" : index === 4 ? "/mission/traffic" : index === 5 ? "/mission/water" : index === 7 ? "/mission/economy" : null;
          const available = Boolean(route);
          return <div className={`mission-row ${index === 5 ? "current" : ""}`} key={title}><span className="mission-index">{String(index + 1).padStart(2, "0")}</span><div><b>{title}</b><small>{desc}</small></div>{available ? <Link to={route!}>فتح <ArrowLeft size={16} /></Link> : <span className="locked"><LockKeyhole size={15} /> لاحقًا</span>}</div>;
        })}</div>
      </section>
      <section className="section-tight"><SectionTitle eyebrow="أدلة حديثة" title="ما الذي أثبته تفكيرك؟" />{evidence.length ? <div className="evidence-cards">{evidence.slice(0, 3).map((item) => <div className="evidence-card" key={item.mission}><b>{item.mission}</b><p>{item.note}</p><div>{item.items.map((x) => <span key={x}>{x}</span>)}</div></div>)}</div> : <div className="empty-state">لم تُسجّل أدلة بعد. أكمل مختبرًا وسيظهر هنا ما فهمته واختبرته وفسّرته.</div>}</section>
    </main></Shell>
  );
}

export function WaterMission() {
  const [stage, setStage] = useState(0);
  const [prediction, setPrediction] = useState("");
  const [rule, setRule] = useState<"safe" | "unsafe">("safe");
  const [scenario, setScenario] = useState<"normal" | "limit" | "failure">("normal");
  const [tested, setTested] = useState<string[]>([]);
  const [safeguard, setSafeguard] = useState(false);
  const [explanation, setExplanation] = useState("");
  const navigate = useNavigate();
  const scenarioData = { normal: { level: 45, reading: 45 }, limit: { level: 88, reading: 88 }, failure: { level: 96, reading: 60 } }[scenario];
  const stopped = rule === "safe" && scenarioData.reading >= 80 || safeguard && scenario === "failure";
  const run = () => setTested((old) => old.includes(scenario) ? old : [...old, scenario]);
  const canNext = stage === 0 ? prediction.trim().length >= 8 : stage === 1 ? true : stage === 2 ? tested.length === 3 && safeguard : explanation.trim().length >= 15;
  function next() {
    if (stage < 3) return setStage(stage + 1);
    addEvidence({ mission: "خزان لا يفيض", items: ["يفهم", "يمثّل", "يتوقّع", "يختبر", "يفسّر"], note: "اختبر قراءة حسّاس خاطئة وأضاف حماية احتياطية قبل تفسير سبب التحسين." });
    navigate("/result");
  }
  return <Shell><main className="wrap section mission-layout">
    <div className="mission-top"><div><p className="eyebrow">المهمة 06 · اكسر النظام</p><h1>خزان لا يفيض</h1><p>ابنِ قاعدة، توقّع سلوكها، ثم ابحث عن الحالة التي تكسرها.</p></div><span className="stage-count">{stage + 1} / 4</span></div>
    <SystemRail active={stage} />
    <div className="lab-grid">
      <aside className="lab-canvas"><TankDiagram level={scenarioData.level} faulty={scenario === "failure"} stopped={tested.includes(scenario) && stopped} /><Artifact name={stage === 0 ? "المُرسِل" : stage === 1 ? "المسار" : stage === 2 ? "العطل" : "المختبر"} tone={stage === 2 ? "red" : stage === 0 ? "yellow" : stage === 1 ? "green" : "blue"}>{stage === 0 ? "الهدف واضح، لكن القيود ناقصة. ما الذي يجب أن تعرفه قبل الحل؟" : stage === 1 ? "قراءة الحساس تمر بقاعدة ثم تنتج فعلًا يمكن ملاحظته." : stage === 2 ? "الماء 96%، لكن الحساس يقول 60%. هل ما زالت القاعدة آمنة؟" : "الحل الأفضل هو الذي يبقى مفهومًا حتى عندما نفشل عمدًا."}</Artifact></aside>
      <section className="lab-panel">
        {stage === 0 && <><p className="panel-step">01 / افهم</p><h2>توقّع قبل أن تنفّذ</h2><p>عندما يصل الماء إلى 80%، ماذا يجب أن يحدث؟ ولماذا؟</p><textarea value={prediction} onChange={(e) => setPrediction(e.target.value)} placeholder="أتوقع أن... لأن..." /><div className="prompt-strip"><span>ما الحد الأعلى؟</span><span>من يرسل القراءة؟</span><span>كيف نعرف أن القراءة صحيحة؟</span></div></>}
        {stage === 1 && <><p className="panel-step">02 / صمّم</p><h2>اختر قاعدة القرار</h2><div className="rule-map"><div>حساس الماء</div><span>←</span><div>الحد 80%</div><span>←</span><div>المضخة</div></div><button className={`choice ${rule === "safe" ? "selected" : ""}`} onClick={() => setRule("safe")}>عند 80%: أوقف المضخة وشغّل التنبيه</button><button className={`choice danger ${rule === "unsafe" ? "selected" : ""}`} onClick={() => setRule("unsafe")}>عند 80%: واصل تشغيل المضخة</button></>}
        {stage === 2 && <><p className="panel-step">03 / اختبر</p><h2>ثلاث حالات، قاعدة واحدة</h2><div className="scenario-tabs"><button onClick={() => setScenario("normal")} className={scenario === "normal" ? "active" : ""}>45% عادي</button><button onClick={() => setScenario("limit")} className={scenario === "limit" ? "active" : ""}>88% الحد</button><button onClick={() => setScenario("failure")} className={scenario === "failure" ? "active" : ""}>عطل الحساس</button></div><div className="reading-board"><div>المستوى الحقيقي<b>{scenarioData.level}%</b></div><div>قراءة الحساس<b className={scenario === "failure" ? "red-text" : ""}>{scenarioData.reading}%</b></div></div><button className="button full" onClick={run}><Play size={17} /> شغّل التجربة</button>{tested.includes(scenario) && <div className={`test-result ${scenario === "failure" && !safeguard ? "failed" : ""}`}>{scenario === "failure" ? safeguard ? "الحماية قارنت القراءات وأوقفت المضخة." : "فشل النظام: الحساس قال 60% فاستمرت المضخة رغم وصول الماء إلى 96%." : stopped ? "توقفت المضخة عند الحد. نجحت القاعدة في هذه الحالة." : "المضخة ما زالت تعمل."}</div>}{tested.includes("failure") && <label className="safeguard"><input type="checkbox" checked={safeguard} onChange={(e) => setSafeguard(e.target.checked)} /> أضف تحققًا احتياطيًا: إذا اختلفت القراءتان، أوقف المضخة وأرسل تنبيهًا.</label>}<p className="micro">التجارب المنفذة: {tested.length} / 3</p></>}
        {stage === 3 && <><p className="panel-step">04 / حسّن</p><h2>فسّر قرارك</h2><p>لماذا أصبح النظام أكثر أمانًا بعد إضافة التحقق الاحتياطي؟</p><textarea value={explanation} onChange={(e) => setExplanation(e.target.value)} placeholder="الحساس الأول وحده لا يكفي لأن..." /><div className="note-box">لا توجد مكافأة على السرعة. ما يهم هو أن تستطيع الدفاع عن قرارك.</div></>}
        <div className="panel-actions"><button className="button button-ghost" disabled={stage === 0} onClick={() => setStage(Math.max(0, stage - 1))}><ArrowRight size={17} /> رجوع</button><button className="button" disabled={!canNext} onClick={next}>{stage === 3 ? "أنهِ المهمة" : "تابع"}<ArrowLeft size={17} /></button></div>
      </section>
    </div>
  </main></Shell>;
}

const stopsSeed = [
  { id: "A", name: "صيدلية", constraint: "أولوية قبل 10:00" },
  { id: "B", name: "مكتبة", constraint: "الطريق الأقصر يمر من شارع قابل للإغلاق" },
  { id: "C", name: "منزل", constraint: "قريب من الصيدلية" },
];

export function RoutingMission() {
  const [stops, setStops] = useState(stopsSeed);
  const [blocked, setBlocked] = useState(false);
  const [ran, setRan] = useState(false);
  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= stops.length) return;
    const next = [...stops];
    [next[index], next[target]] = [next[target], next[index]];
    setStops(next); setRan(false);
  };
  const safe = stops[0].id === "A" && (!blocked || stops[2].id === "B");
  const complete = ran && safe && blocked;
  return <Shell><main className="wrap section mission-layout"><div className="mission-top"><div><p className="eyebrow">المهمة 02 · فكّك ورتّب</p><h1>رتّب التوصيلات</h1><p>رتّب ثلاث وجهات تحت قيود مختلفة. ثم أغلق طريقًا وأعد التخطيط.</p></div><RouteIcon size={42} /></div><SystemRail active={2} />
    <div className="lab-grid"><aside className="lab-canvas route-canvas"><div className="map-node depot">المخزن</div><div className="map-line l1"/><div className="map-line l2"/><div className="map-line l3"/><div className="map-node a">A</div><div className="map-node b">B</div><div className="map-node c">C</div>{blocked && <div className="road-block"><AlertTriangle size={18}/> طريق مغلق</div>}<Artifact name="المسار" tone="green">ليس المطلوب أقصر طريق فقط؛ بل خطة تحترم القيود عندما يتغير الواقع.</Artifact></aside>
      <section className="lab-panel"><p className="panel-step">خطط → اختبر → أعد التخطيط</p><h2>ما الترتيب الذي تبرره؟</h2><div className="stop-list">{stops.map((stop, index) => <div className="stop-row" key={stop.id}><span className="stop-code">{index + 1}</span><div><b>{stop.id} · {stop.name}</b><small>{stop.constraint}</small></div><div className="reorder"><button onClick={() => move(index, -1)} aria-label="تحريك للأعلى"><ChevronUp size={17}/></button><button onClick={() => move(index, 1)} aria-label="تحريك للأسفل"><ChevronDown size={17}/></button></div></div>)}</div><label className="safeguard"><input type="checkbox" checked={blocked} onChange={(e) => { setBlocked(e.target.checked); setRan(false); }} /> اختبر حالة فشل: الشارع المؤدي إلى B مغلق.</label><button className="button full" onClick={() => setRan(true)}><Play size={17}/> شغّل الخطة</button>{ran && <div className={`test-result ${safe ? "" : "failed"}`}>{safe ? blocked ? "الخطة احترمت أولوية A وأجّلت B بعد إغلاق الطريق." : "الخطة تحترم أولوية A. الآن اختبر تغيرًا في الطريق." : blocked ? "هناك تعارض: إمّا ضاعت أولوية A أو بقيت B في مسار غير متاح. أعد الترتيب." : "ابدأ بالوجهة ذات القيد الزمني، ثم برر البقية."}</div>}{complete && <button className="button full secondary" onClick={() => addEvidence({ mission: "رتّب التوصيلات", items: ["يفهم", "يمثّل", "يتوقّع", "يختبر"], note: "رتّب الوجهات وفق قيود زمنية ثم أعاد التخطيط بعد إغلاق طريق." })}><Check size={17}/> سجّل دليل التعلّم</button>}</section>
    </div></main></Shell>;
}

export function TrafficMission() {
  const [mode, setMode] = useState<"ns" | "ew" | "both">("ns");
  const [interlock, setInterlock] = useState(false);
  const [ran, setRan] = useState(false);
  const conflict = mode === "both" && !interlock;
  return <Shell><main className="wrap section mission-layout"><div className="mission-top"><div><p className="eyebrow">المهمة 05 · ماذا لو؟</p><h1>تقاطع آمن</h1><p>عرّف الحالات، ثم حاول إنشاء تعارض متعمد لترى هل تمنعه قاعدة الأمان.</p></div><TrafficCone size={42}/></div><SystemRail active={3}/><div className="lab-grid"><aside className="lab-canvas intersection"><div className="road vertical"/><div className="road horizontal"/><div className={`light north ${mode !== "ew" ? "go" : ""}`}/><div className={`light east ${mode !== "ns" ? "go" : ""}`}/><div className="intersection-core">تقاطع</div><Artifact name="العطل" tone="red">أسوأ اختبار ليس عندما تسير الحالة العادية، بل عندما تطلب حالتين متعارضتين في الوقت نفسه.</Artifact></aside><section className="lab-panel"><p className="panel-step">الحالة + شرط الأمان</p><h2>من يملك اللون الأخضر؟</h2><div className="scenario-tabs"><button className={mode === "ns" ? "active" : ""} onClick={() => {setMode("ns");setRan(false)}}>شمال/جنوب</button><button className={mode === "ew" ? "active" : ""} onClick={() => {setMode("ew");setRan(false)}}>شرق/غرب</button><button className={mode === "both" ? "active" : ""} onClick={() => {setMode("both");setRan(false)}}>كلاهما</button></div><label className="safeguard"><input type="checkbox" checked={interlock} onChange={(e) => {setInterlock(e.target.checked);setRan(false)}}/> أضف قاعدة أمان: إذا طُلب الأخضر للاتجاهين، ارفض الحالة وانتقل إلى الأحمر للجميع.</label><button className="button full" onClick={() => setRan(true)}><Play size={17}/> اختبر الحالة</button>{ran && <div className={`test-result ${conflict ? "failed" : ""}`}>{conflict ? "تعارض: الاتجاهان أخضران. النظام يسمح بحالة غير آمنة." : mode === "both" && interlock ? "تم رفض التعارض وتحويل التقاطع إلى حالة آمنة." : "لا يوجد تعارض في هذه الحالة. جرّب «كلاهما» لاختبار القاعدة."}</div>}</section></div></main></Shell>;
}

export function EconomyMission() {
  const [reward, setReward] = useState(4);
  const [tested, setTested] = useState(false);
  const turns = useMemo(() => Array.from({ length: 5 }, (_, i) => Math.round(10 * Math.pow(reward / 3.2, i))), [reward]);
  const runaway = reward >= 5;
  return <Shell><main className="wrap section mission-layout"><div className="mission-top"><div><p className="eyebrow">المهمة 08 · اجعل النظام أبسط</p><h1>لعبة لا تنكسر</h1><p>غيّر قاعدة مكافأة واحدة، ثم راقب كيف يتغير النظام عبر خمس جولات.</p></div><Sparkles size={42}/></div><SystemRail active={4}/><div className="lab-grid"><aside className="lab-canvas economy-canvas"><div className="loop-node">يلعب</div><div className="loop-arrow">←</div><div className="loop-node reward">يكسب {reward}</div><div className="loop-arrow">←</div><div className="loop-node">يطوّر</div><Artifact name="المختبر" tone="blue">قواعد صغيرة قد تصنع نتائج كبيرة بعد عدة جولات. اختبر الزمن، لا اللحظة فقط.</Artifact></aside><section className="lab-panel"><p className="panel-step">حلقة تغذية راجعة</p><h2>كم نقطة نعطي في كل جولة؟</h2><div className="counter"><button onClick={() => {setReward(Math.max(2,reward-1));setTested(false)}}>−</button><b>{reward}</b><button onClick={() => {setReward(Math.min(7,reward+1));setTested(false)}}>+</button></div><button className="button full" onClick={() => setTested(true)}><Play size={17}/> شغّل خمس جولات</button>{tested && <><div className="turns">{turns.map((value, index) => <div key={index}><span>جولة {index+1}</span><b>{value}</b></div>)}</div><div className={`test-result ${runaway ? "failed" : ""}`}>{runaway ? "المكافأة تتضخم بسرعة. اللاعب يستطيع استغلال الحلقة بدل اتخاذ قرارات جيدة." : "النمو أبطأ ويمكن ملاحظته. الآن قارن: هل النظام ممتع أم بطيء أكثر من اللازم؟"}</div></>}</section></div></main></Shell>;
}

export function Result() {
  const profile = getProfile();
  return <Shell><main className="wrap narrow section"><div className="result-mark"><ShieldCheck size={42}/></div><p className="eyebrow">اكتملت المهمة</p><h1>أحسنت التفكير يا {profile.child}</h1><p className="result-lead">لم تكن النتيجة «قاعدة صحيحة» فقط. أثبتَّ أنك تستطيع توقع السلوك، كشف الفشل، إضافة حماية ثم شرح قرارك.</p><div className="evidence-strip vertical">{evidenceLabels.map(([name,label]) => <div key={name}><b>{name}</b><span>{label}</span><Check size={16}/></div>)}</div><div className="hero-actions"><Link className="button" to="/kid">ارجع لمساحتك</Link><Link className="button button-ghost" to="/parent">اعرضها لوليّ الأمر</Link></div></main></Shell>;
}

export function ParentDashboard() {
  const profile = getProfile();
  const evidence = getEvidence();
  const latest = evidence[0];
  return <Shell><main className="wrap section"><div className="parent-head"><div><p className="eyebrow">لوحة الأهل</p><h1>كيف يفكّر {profile.child}؟</h1><p>هذه اللوحة لا تقارن الطفل بغيره. تعرض أفعالًا حدثت داخل المهمات وما الذي نريد ملاحظته لاحقًا.</p></div><Link className="button button-ghost" to="/kid">مساحة الطفل</Link></div>
    <section className="parent-narrative"><div><p className="kicker">الملخص الأخير</p><h2>{latest ? latest.mission : "ابدأ بمهمة واحدة لنكوّن دليلًا حقيقيًا"}</h2><p>{latest ? latest.note : "بعد أول مختبر سنعرض هنا ما فهمه الطفل، ماذا توقع، ما الذي اختبره، وكيف فسّر قراره."}</p></div><div className="next-objective"><span>الهدف التالي</span><b>أن يفرّق بين نجاح الحالة العادية وسلامة النظام عند الفشل.</b></div></section>
    <section className="section-tight"><SectionTitle eyebrow="أدلة التعلّم" title="خمسة أفعال يمكن ملاحظتها" /><div className="evidence-matrix">{evidenceLabels.map(([name,label]) => { const hit = evidence.some((entry) => entry.items.includes(name)); return <div className={hit ? "observed" : ""} key={name}><span>{hit ? <Check size={17}/> : <CircleDot size={17}/>}</span><b>{name}</b><p>{label}</p><small>{hit ? "شوهد في مهمة" : "لم يظهر بعد"}</small></div>; })}</div></section>
    <section className="section-tight"><SectionTitle eyebrow="السجل" title="أمثلة من سلوك الطفل" />{evidence.length ? <div className="timeline">{evidence.map((item) => <div key={item.mission}><span/><div><b>{item.mission}</b><p>{item.note}</p><small>{item.items.join(" · ")}</small></div></div>)}</div> : <div className="empty-state">لا توجد بيانات حقيقية بعد. لا نملأ هذه المساحة بمقاييس افتراضية أو درجات وهمية.</div>}</section>
  </main></Shell>;
}
