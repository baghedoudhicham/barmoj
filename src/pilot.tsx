import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  CircleDot,
  Gauge,
  LockKeyhole,
  MapPinned,
  Route as RouteIcon,
  Sparkles,
  TrafficCone,
  TriangleAlert,
} from "lucide-react";
import { Shell } from "./components";
import {
  clearFamilyData,
  evidenceLabels,
  getEvidence,
  getProfile,
  missions,
} from "./data";
import { labs, settingsKey } from "./lab-model";
import type { LabId } from "./lab-model";
import { initialSettings } from "./lab-model";
import { latestDraft } from "./lab-storage";
import { LabDiagram, TrialNotebook } from "./mission-lab";

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
    purpose:
      "توقّع أثر القواعد على عدة أدوار، ثم اكتشف الحلقة التي يمكن استغلالها.",
  },
] as const;

const cycle = [
  "راقب",
  "اسأل",
  "مثّل",
  "توقّع",
  "ابنِ",
  "اكسر",
  "صحّح",
  "حسّن",
  "اشرح",
];

function MissionSystemPreview({ tone }: { tone: string }) {
  const id: LabId = tone === "water" ? "water" : tone === "learn" ? "routing" : tone === "challenge" ? "traffic" : "economy";
  return <LabDiagram id={id} settings={initialSettings()} />;
}
export function MissionHub() {
  return (
    <Shell>
      <main className="wrap pilot-page">
        <header className="pilot-hero compact-hero">
          <div>
            <p className="eyebrow">مختبرات بِرْكار</p>
            <h1>
              نفس طريقة التفكير.
              <br />
              أنظمة مختلفة.
            </h1>
            <p className="pilot-lead">
              لا نريد أن يتعلم الطفل حل قالب واحد. نريد أن ينقل طريقة التفكير من
              خزان ماء إلى طريق، وتقاطع، وقواعد لعبة.
            </p>
          </div>
          <div className="cycle-strip" aria-label="دورة التفكير">
            {cycle.map((item, index) => (
              <span key={item}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                {item}
              </span>
            ))}
          </div>
        </header>

        <section className="mission-atlas">
          {availableMissions.map((mission) => {
            const Icon = mission.icon;
            return (
              <Link
                className={`atlas-card ${mission.tone}`}
                to={mission.route}
                key={mission.route}
              >
                <div className="atlas-meta">
                  <span>{mission.number}</span>
                  <Icon size={20} />
                </div>
                <div className="atlas-visual">
                  <MissionSystemPreview tone={mission.tone} />
                </div>
                <div className="atlas-copy">
                  <p>{mission.subtitle}</p>
                  <h2>{mission.title}</h2>
                  <span>{mission.purpose}</span>
                  <strong>
                    افتح المختبر <ArrowLeft size={17} />
                  </strong>
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
  const verified = evidence.filter(
    (entry) => entry.labId && entry.trials?.length,
  );
  const unfinished = latestDraft();
  const nextId: LabId =
    unfinished?.id ||
    (["water", "routing", "traffic", "economy"] as LabId[]).find(
      (id) => !verified.some((e) => e.labId === id),
    ) ||
    "water";
  const focus = labs[nextId];
  const focusTrial = unfinished && [...unfinished.draft.trials].reverse().find(t =>
    settingsKey(nextId, unfinished.draft.settings) === settingsKey(nextId, t.settings),
  );

  return (
    <Shell>
      <main className="wrap pilot-page">
        <header className="workspace-v2-head">
          <div>
            <p className="eyebrow">مساحة التعلّم</p>
            <h1>السلام {profile.child}</h1>
            <p>
              اليوم لا نبحث عن أسرع إجابة. نريد نظامًا تستطيع شرحه عندما يعمل
              وعندما يفشل.
            </p>
          </div>
          <Link className="workspace-switch" to="/parent">
            عرض الأهل <ArrowLeft size={17} />
          </Link>
        </header>

        <section className="focus-board">
          <div className="focus-copy">
            <div className="focus-label">
              <span>
                {unfinished
                  ? "أكمل من حيث توقفت"
                  : verified.length === 4
                    ? "جرّب تفسيرًا جديدًا"
                    : "المختبر التالي"}
              </span>
              <b>{focus.number} / فكّر كنظام</b>
            </div>
            <h2>{focus.title}</h2>
            <p>{focus.goal}</p>
            <div className="reasoning-contract">
              <span>
                <b>قبل التجربة</b> أتوقع
              </span>
              <span>
                <b>أثناءها</b> ألاحظ
              </span>
              <span>
                <b>بعدها</b> أفسّر
              </span>
            </div>
            <Link className="button secondary" to={`/mission/${nextId}`}>
              {unfinished ? "واصل المختبر" : "افتح المختبر"}{" "}
              <ArrowLeft size={18} />
            </Link>
            <p className="focus-proof-status">
              {unfinished
                ? `${unfinished.draft.trials.length} تجارب محفوظة في هذا المتصفح`
                : `${verified.length} من 4 مختبرات لها دفتر تجارب مكتمل`}
            </p>
          </div>
          <div className="focus-system">
            <LabDiagram
              id={nextId}
              settings={unfinished?.draft.settings || initialSettings()}
              trial={focusTrial}
            />
            <div className="focus-annotation">المدخل ← القاعدة ← المخرج</div>
          </div>
        </section>

        <section className="evidence-rail-section">
          <div className="evidence-intro">
            <p className="eyebrow">ما الذي يتطور؟</p>
            <h2>دليل على التفكير، لا نقاط فقط.</h2>
            <p>
              كل مختبر يترك أثرًا واضحًا: ماذا فهمت، مثّلت، توقعت، اختبرت
              وفسّرت.
            </p>
          </div>
          <div className="evidence-rail-v2">
            {evidenceLabels.map(([name, label]) => {
              const active = verified.some((entry) =>
                entry.items.includes(name),
              );
              return (
                <div className={active ? "active" : ""} key={name}>
                  <span>
                    {active ? <Check size={16} /> : <CircleDot size={15} />}
                  </span>
                  <b>{name}</b>
                  <small>{label}</small>
                </div>
              );
            })}
          </div>
        </section>

        <section className="track-board" id="missions">
          <div className="track-board-head">
            <div>
              <p className="eyebrow">المسار الأول</p>
              <h2>فكّر كنظام</h2>
            </div>
            <Link to="/missions">
              شاهد المختبرات المفتوحة <ArrowLeft size={17} />
            </Link>
          </div>
          <div className="track-path">
            {missions.map(([title, desc], index) => {
              const route =
                index === 1
                  ? "/mission/routing"
                  : index === 4
                    ? "/mission/traffic"
                    : index === 5
                      ? "/mission/water"
                      : index === 7
                        ? "/mission/economy"
                        : null;
              const knownTitle =
                index === 1
                  ? "رتّب التوصيلات"
                  : index === 4
                    ? "تقاطع آمن"
                    : index === 5
                      ? "خزان لا يفيض"
                      : index === 7
                        ? "لعبة لا تنكسر"
                        : title;
              const done = completedNames.has(knownTitle);
              const current = route === `/mission/${nextId}` && !done;
              return (
                <div
                  className={`path-stop ${done ? "done" : ""} ${current ? "current" : ""}`}
                  key={title}
                >
                  <span className="path-index">
                    {done ? (
                      <Check size={15} />
                    ) : (
                      String(index + 1).padStart(2, "0")
                    )}
                  </span>
                  <div>
                    <b>{title}</b>
                    <small>{desc}</small>
                  </div>
                  {route ? (
                    <Link to={route}>
                      {done ? "راجع" : "افتح"} <ArrowLeft size={15} />
                    </Link>
                  ) : (
                    <span className="path-lock">
                      <LockKeyhole size={14} /> لاحقًا
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="recent-proof">
          <div>
            <p className="eyebrow">آخر ما أثبته تفكيرك</p>
            <h2>
              {evidence.length
                ? "هذه نتائج حقيقية من مختبراتك."
                : "ابدأ بمختبر واحد."}
            </h2>
          </div>
          {evidence.length ? (
            <div className="proof-list">
              {evidence.slice(0, 3).map((entry) => (
                <article key={entry.mission}>
                  <b>{entry.mission}</b>
                  <p>{entry.explanation || entry.note}</p>
                  <small>
                    {entry.trials?.length
                      ? `${entry.trials.length} تجارب · بكلماتك`
                      : "سجل من النسخة السابقة"}
                  </small>
                  <Link className="text-link" to="/parent">
                    راجع دفتر التجارب ←
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="proof-empty">
              <TriangleAlert size={22} />
              <p>
                لن نملأ هذه المساحة بمؤشرات وهمية. عندما تكمل تجربة، سيظهر هنا
                ما قمت به فعلًا.
              </p>
            </div>
          )}
        </section>
        <p className="local-note">
          العمل محفوظ في هذا المتصفح فقط. استخدم الجهاز والمتصفح نفسيهما للعودة
          إلى تجربتك.
        </p>
      </main>
    </Shell>
  );
}

export function ParentDashboardV2() {
  const profile = getProfile();
  const evidence = getEvidence();
  const navigate = useNavigate();
  const [deleteError, setDeleteError] = useState(false);
  const latest = evidence[0];
  const verified = evidence.filter(
    (entry) => entry.labId && entry.trials?.length,
  );
  const observed = new Set(verified.flatMap((entry) => entry.items));

  return (
    <Shell>
      <main className="wrap pilot-page">
        <header className="parent-v2-head">
          <div>
            <p className="eyebrow">لوحة الأهل</p>
            <h1>كيف يفكّر {profile.child}؟</h1>
            <p>
              لا نعرض ترتيبًا أو درجة ذكاء. نعرض فقط ما ظهر داخل المهمات وما
              سنتمرن عليه بعد ذلك.
            </p>
          </div>
          <div className="parent-actions">
            <Link className="workspace-switch" to="/curriculum">
              المنهج الكامل <ArrowLeft size={17} />
            </Link>
            <Link className="workspace-switch" to="/kid">
              مساحة {profile.child} <ArrowLeft size={17} />
            </Link>
          </div>
        </header>

        <section className="parent-story">
          <div className="story-main">
            <p className="story-label">آخر دليل محفوظ</p>
            <h2>
              {latest
                ? `من مختبر «${latest.mission}»`
                : `لم نكوّن ملخصًا بعد لـ ${profile.child}.`}
            </h2>
            <p>
              {latest
                ? latest.note
                : "بعد أول مختبر سنعرض هنا جملة واضحة تصف ما فعله الطفل فعلًا، بدل ملء اللوحة بأرقام لا تعني شيئًا."}
            </p>
          </div>
          <div className="next-objective">
            <span>الهدف التالي</span>
            <b>
              {latest?.labId
                ? labs[latest.labId].transfer
                : "ابدأ بمختبر واحد، واسأل الطفل عن توقعه قبل التشغيل."}
            </b>
            <small>سؤال للحوار بعد التجربة</small>
          </div>
        </section>

        <section className="evidence-matrix-section">
          <div className="matrix-copy">
            <p className="eyebrow">أدلة التعلّم</p>
            <h2>خمسة أشياء يمكن مراجعتها.</h2>
            <p>
              العلامة تعني وجود سجل للفعل، وليست حكمًا على إتقان الطفل. الإجابات
              محفوظة لمراجعتكم؛ لا يصحّحها النظام تلقائيًا.
            </p>
          </div>
          <div className="evidence-matrix">
            {evidenceLabels.map(([name, label]) => {
              const seen = observed.has(name);
              const count = verified.filter((entry) =>
                entry.items.includes(name),
              ).length;
              return (
                <div className={seen ? "seen" : ""} key={name}>
                  <span>
                    {seen ? <Check size={17} /> : <CircleDot size={16} />}
                  </span>
                  <b>{name}</b>
                  <p>{label}</p>
                  <small>
                    {seen
                      ? count === 1
                        ? "مسجل في مختبر واحد"
                        : `مسجل في ${count} مختبرات`
                      : "لا يوجد سجل مفصل بعد"}
                  </small>
                </div>
              );
            })}
          </div>
        </section>

        <section className="parent-lab-history">
          <div className="history-head">
            <div>
              <p className="eyebrow">من داخل المختبر</p>
              <h2>ما الذي حدث فعلًا؟</h2>
            </div>
            <Link to="/missions">
              استعرض المهمات <ArrowLeft size={17} />
            </Link>
          </div>
          {evidence.length ? (
            <div className="history-list">
              {evidence.map((entry) => (
                <article
                  className="history-proof"
                  key={`${entry.mission}-${entry.date}`}
                >
                  <details>
                    <summary>
                      {entry.mission} ·{" "}
                      {entry.trials?.length
                        ? `${entry.trials.length} تجارب`
                        : "سجل سابق"}
                    </summary>
                    <time dateTime={entry.date}>
                      {new Intl.DateTimeFormat("ar-MA", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }).format(new Date(entry.date))}
                    </time>
                    {entry.labId && entry.trials?.length ? (
                      <>
                        <p className="legacy-note">القيد الذي حدده الطفل</p>
                        <blockquote className="child-quote">
                          {entry.observation}
                        </blockquote>
                        <TrialNotebook id={entry.labId} trials={entry.trials} />
                        <p className="legacy-note">تفسير الطفل بعد التحسين</p>
                        <blockquote className="child-quote">
                          {entry.explanation}
                        </blockquote>
                      </>
                    ) : (
                      <p className="legacy-note">
                        {entry.note}
                        <br />
                        هذا سجل من النسخة السابقة؛ لا يحتوي على التوقعات
                        والنتائج التفصيلية. أعد المختبر لإضافة دفتر تجارب.
                      </p>
                    )}
                  </details>
                </article>
              ))}
            </div>
          ) : (
            <div className="parent-empty">
              <MapPinned size={24} />
              <div>
                <b>لا توجد أدلة بعد.</b>
                <p>
                  ابدأ من مساحة الطفل. بعد إتمام المختبر ستتغير هذه اللوحة
                  تلقائيًا.
                </p>
              </div>
            </div>
          )}
        </section>
        <p className="local-note">
          هذه الأدلة محفوظة محليًا في هذا المتصفح. لا يوجد حساب سحابي أو تقييم
          آلي للإجابات في هذه النسخة. لوحة الأهل لا تتطلب رمزًا؛ استخدمها على
          جهاز الأسرة مع وجود وليّ الأمر.
        </p>
        <section className="family-controls" aria-labelledby="family-data-title">
          <div>
            <p className="eyebrow">تحكم الأسرة</p>
            <h2 id="family-data-title">أنت تتحكم في سجل هذا المتصفح.</h2>
            <p>
              احذف اللقب وكل المسودات والتجارب والأدلة المحفوظة على هذا الموقع
              في هذا المتصفح. لا يؤثر ذلك على ملفات أو مواقع أخرى.
            </p>
          </div>
          <button
            className="button button-ghost family-delete"
            onClick={() => {
              const confirmed = window.confirm(
                "سيُحذف اللقب وكل مسودات المختبرات والأدلة المحفوظة لهذا الموقع في هذا المتصفح. لا يمكن التراجع عن الحذف. هل تريد المتابعة؟",
              );
              if (!confirmed) return;
              if (clearFamilyData()) navigate("/");
              else setDeleteError(true);
            }}
          >
            حذف سجل التجربة من هذا المتصفح
          </button>
          {deleteError && (
            <p className="storage-alert" role="alert">
              تعذّر حذف كل البيانات. امسح بيانات هذا الموقع من إعدادات
              المتصفح.
            </p>
          )}
        </section>
      </main>
    </Shell>
  );
}
