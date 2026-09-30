import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  CircleDot,
  Gauge,
  LockKeyhole,
  MapPinned,
  Route as RouteIcon,
  ShieldCheck,
  Sparkles,
  TrafficCone,
  TriangleAlert,
} from "lucide-react";
import { Shell, TankDiagram } from "./components";
import { evidenceLabels, getEvidence, getProfile, missions } from "./data";
import "./pilot.css";

const availableMissions = [
  {
    number: "02",
    title: "رتّب التوصيلات",
    subtitle: "قيود · أولوية · إعادة تخطيط",
    route: "/mission/routing",
    tone: "learn",
    icon: RouteIcon,
    purpose: "فكّك المشكلة إلى قيود، ثم غيّر المسار عندما يغلق الطريق.",
  },
  {
    number: "05",
    title: "تقاطع آمن",
    subtitle: "حالات · شروط · تعارض",
    route: "/mission/traffic",
    tone: "challenge",
    icon: TrafficCone,
    purpose: "عرّف حالات واضحة ثم اختبر ما إذا كان نظامك يسمح بتعارض خطير.",
  },
  {
    number: "06",
    title: "خزان لا يفيض",
    subtitle: "حساس · قاعدة · فشل · حماية",
    route: "/mission/water",
    tone: "water",
    icon: Gauge,
    purpose: "ابنِ قاعدة، اكسرها بحساس معطّل، ثم حسّن النظام وأعد الاختبار.",
  },
  {
    number: "08",
    title: "لعبة لا تنكسر",
    subtitle: "حلقة تغذية · استغلال · موازنة",
    route: "/mission/economy",
    tone: "explore",
    icon: Sparkles,
    purpose: "توقّع أثر القواعد على عدة أدوار، ثم اكتشف الحلقة التي يمكن استغلالها.",
  },
] as const;

const cycle = ["راقب", "اسأل", "مثّل", "توقّع", "ابنِ", "اكسر", "صحّح", "حسّن", "اشرح"];

function MissionSystemPreview({ tone }: { tone: string }) {
  if (tone === "water") return <TankDiagram level={86} />;

  if (tone === "learn") {
    return (
      <div className="route-preview" aria-label="نموذج مسار توصيل">
        <span className="route-node depot">مركز</span>
        <span className="route-node a">A</span>
        <span className="route-node b">B</span>
        <span className="route-node c">C</span>
        <span className="route-line line-a" />
        <span className="route-line line-b" />
        <span className="route-line line-c blocked" />
        <span className="failure-tag">طريق مغلق</span>
      </div>
    );
  }

  if (tone === "challenge") {
    return (
      <div className="traffic-preview" aria-label="نموذج تقاطع إشارات">
        <div className="road horizontal" />
        <div className="road vertical" />
        <span className="signal north green" />
        <span className="signal west red" />
        <span className="state-tag">حالة آمنة</span>
      </div>
    );
  }

  return (
    <div className="economy-preview" aria-label="نموذج حلقة موارد">
      <span className="economy-node">مورد</span>
      <span className="economy-arrow">←</span>
      <span className="economy-node strong">مكافأة</span>
      <span className="economy-arrow">←</span>
      <span className="economy-node">قرار</span>
      <span className="loop-note">راقب الحلقة بعد 5 أدوار</span>
    </div>
  );
}

export function MissionHub() {
  return (
    <Shell>
      <main className="wrap pilot-page">
        <header className="pilot-hero compact-hero">
          <div>
            <p className="eyebrow">مختبرات برموج</p>
            <h1>نفس طريقة التفكير.<br />أنظمة مختلفة.</h1>
            <p className="pilot-lead">لا نريد أن يتعلم الطفل حل قالب واحد. نريد أن ينقل طريقة التفكير من خزان ماء إلى طريق، وتقاطع، وقواعد لعبة.</p>
          </div>
          <div className="cycle-strip" aria-label="دورة التفكير">
            {cycle.map((item, index) => <span key={item}><b>{String(index + 1).padStart(2, "0")}</b>{item}</span>)}
          </div>
        </header>

        <section className="mission-atlas">
          {availableMissions.map((mission) => {
            const Icon = mission.icon;
            return (
              <Link className={`atlas-card ${mission.tone}`} to={mission.route} key={mission.route}>
                <div className="atlas-meta"><span>{mission.number}</span><Icon size={20} /></div>
                <div className="atlas-visual"><MissionSystemPreview tone={mission.tone} /></div>
                <div className="atlas-copy">
                  <p>{mission.subtitle}</p>
                  <h2>{mission.title}</h2>
                  <span>{mission.purpose}</span>
                  <strong>افتح المختبر <ArrowLeft size={17} /></strong>
                </div>
              </Link>
            );
          })}
        </section>
      </main>
    </Shell>
  );
}

export function KidHomeV2() {
  const profile = getProfile();
  const evidence = getEvidence();
  const completedNames = new Set(evidence.map((item) => item.mission));

  return (
    <Shell>
      <main className="wrap pilot-page">
        <header className="workspace-v2-head">
          <div>
            <p className="eyebrow">مساحة التعلّم</p>
            <h1>السلام {profile.child}</h1>
            <p>اليوم لا نبحث عن أسرع إجابة. نريد نظامًا تستطيع شرحه عندما يعمل وعندما يفشل.</p>
          </div>
          <Link className="workspace-switch" to="/parent">عرض الأهل <ArrowLeft size={17} /></Link>
        </header>

        <section className="focus-board">
          <div className="focus-copy">
            <div className="focus-label"><span>المهمة الحالية</span><b>06 / العطل</b></div>
            <h2>خزان لا يفيض</h2>
            <p>صمّم قاعدة للمضخة. بعدها سنعطي الحساس قراءة خاطئة ونرى هل يبقى النظام آمنًا.</p>
            <div className="reasoning-contract">
              <span><b>قبل التجربة</b> أتوقع</span>
              <span><b>أثناءها</b> ألاحظ</span>
              <span><b>بعدها</b> أفسّر</span>
            </div>
            <Link className="button secondary" to="/mission/water">ابدأ المختبر <ArrowLeft size={18} /></Link>
          </div>
          <div className="focus-system"><TankDiagram level={88} /><div className="focus-annotation">المدخل ← القاعدة ← الحالة ← المخرج</div></div>
        </section>

        <section className="evidence-rail-section">
          <div className="evidence-intro">
            <p className="eyebrow">ما الذي يتطور؟</p>
            <h2>دليل على التفكير، لا نقاط فقط.</h2>
            <p>كل مختبر يترك أثرًا واضحًا: ماذا فهمت، مثّلت، توقعت، اختبرت وفسّرت.</p>
          </div>
          <div className="evidence-rail-v2">
            {evidenceLabels.map(([name, label]) => {
              const active = evidence.some((entry) => entry.items.includes(name));
              return <div className={active ? "active" : ""} key={name}><span>{active ? <Check size={16} /> : <CircleDot size={15} />}</span><b>{name}</b><small>{label}</small></div>;
            })}
          </div>
        </section>

        <section className="track-board" id="missions">
          <div className="track-board-head">
            <div><p className="eyebrow">المسار الأول</p><h2>فكّر كنظام</h2></div>
            <Link to="/missions">شاهد المختبرات المفتوحة <ArrowLeft size={17} /></Link>
          </div>
          <div className="track-path">
            {missions.map(([title, desc], index) => {
              const route = index === 1 ? "/mission/routing" : index === 4 ? "/mission/traffic" : index === 5 ? "/mission/water" : index === 7 ? "/mission/economy" : null;
              const knownTitle = index === 1 ? "رتّب التوصيلات" : index === 4 ? "تقاطع آمن" : index === 5 ? "خزان لا يفيض" : index === 7 ? "لعبة لا تنكسر" : title;
              const done = completedNames.has(knownTitle);
              const current = index === 5 && !done;
              return (
                <div className={`path-stop ${done ? "done" : ""} ${current ? "current" : ""}`} key={title}>
                  <span className="path-index">{done ? <Check size={15} /> : String(index + 1).padStart(2, "0")}</span>
                  <div><b>{title}</b><small>{desc}</small></div>
                  {route ? <Link to={route}>{done ? "راجع" : "افتح"} <ArrowLeft size={15} /></Link> : <span className="path-lock"><LockKeyhole size={14} /> لاحقًا</span>}
                </div>
              );
            })}
          </div>
        </section>

        <section className="recent-proof">
          <div><p className="eyebrow">آخر ما أثبته تفكيرك</p><h2>{evidence.length ? "هذه نتائج حقيقية من مختبراتك." : "ابدأ بمختبر واحد."}</h2></div>
          {evidence.length ? (
            <div className="proof-list">{evidence.slice(0, 3).map((entry) => <article key={entry.mission}><b>{entry.mission}</b><p>{entry.note}</p><div>{entry.items.map((item) => <span key={item}>{item}</span>)}</div></article>)}</div>
          ) : (
            <div className="proof-empty"><TriangleAlert size={22} /><p>لن نملأ هذه المساحة بمؤشرات وهمية. عندما تكمل تجربة، سيظهر هنا ما قمت به فعلًا.</p></div>
          )}
        </section>
      </main>
    </Shell>
  );
}

export function ParentDashboardV2() {
  const profile = getProfile();
  const evidence = getEvidence();
  const latest = evidence[0];
  const observed = new Set(evidence.flatMap((entry) => entry.items));

  return (
    <Shell>
      <main className="wrap pilot-page">
        <header className="parent-v2-head">
          <div><p className="eyebrow">لوحة الأهل</p><h1>كيف يفكّر {profile.child}؟</h1><p>لا نعرض ترتيبًا أو درجة ذكاء. نعرض فقط ما ظهر داخل المهمات وما سنتمرن عليه بعد ذلك.</p></div>
          <Link className="workspace-switch" to="/kid">مساحة {profile.child} <ArrowLeft size={17} /></Link>
        </header>

        <section className="parent-story">
          <div className="story-main">
            <p className="story-label">ملخص هذا الأسبوع</p>
            <h2>{latest ? `في «${latest.mission}» انتقل ${profile.child} من التوقع إلى الاختبار.` : `لم نكوّن ملخصًا بعد لـ ${profile.child}.`}</h2>
            <p>{latest ? latest.note : "بعد أول مختبر سنعرض هنا جملة واضحة تصف ما فعله الطفل فعلًا، بدل ملء اللوحة بأرقام لا تعني شيئًا."}</p>
          </div>
          <div className="next-objective">
            <span>الهدف التالي</span>
            <b>اشرح لماذا فشل النظام، لا أين فشل فقط.</b>
            <small>التركيز: السبب ← الدليل ← التحسين</small>
          </div>
        </section>

        <section className="evidence-matrix-section">
          <div className="matrix-copy"><p className="eyebrow">أدلة التعلّم</p><h2>خمسة أشياء يمكن ملاحظتها.</h2><p>هذه ليست درجات نهائية. العلامة تعني أننا شاهدنا هذا السلوك في مهمة واحدة على الأقل.</p></div>
          <div className="evidence-matrix">
            {evidenceLabels.map(([name, label]) => {
              const seen = observed.has(name);
              return <div className={seen ? "seen" : ""} key={name}><span>{seen ? <Check size={17} /> : <CircleDot size={16} />}</span><b>{name}</b><p>{label}</p><small>{seen ? "ظهر في مهمة" : "لم يظهر بعد"}</small></div>;
            })}
          </div>
        </section>

        <section className="parent-lab-history">
          <div className="history-head"><div><p className="eyebrow">من داخل المختبر</p><h2>ما الذي حدث فعلًا؟</h2></div><Link to="/missions">استعرض المهمات <ArrowLeft size={17} /></Link></div>
          {evidence.length ? (
            <div className="history-list">{evidence.map((entry) => <article key={`${entry.mission}-${entry.date}`}><div className="history-icon"><ShieldCheck size={20} /></div><div><b>{entry.mission}</b><p>{entry.note}</p><small>{entry.items.join(" · ")}</small></div></article>)}</div>
          ) : (
            <div className="parent-empty"><MapPinned size={24} /><div><b>لا توجد أدلة بعد.</b><p>ابدأ من مساحة الطفل. بعد إتمام المختبر ستتغير هذه اللوحة تلقائيًا.</p></div></div>
          )}
        </section>
      </main>
    </Shell>
  );
}
