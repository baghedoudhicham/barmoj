import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shell } from "./components";
import { addEvidence, getEvidence, getProfile } from "./data";
import {
  canComplete,
  describeSettings,
  labs,
  milestones,
  settingsKey,
  simulate,
} from "./lab-model";
import type { LabId, Settings, Trial } from "./lab-model";
import { emptyDraft, readDraft, removeDraft, saveDraft } from "./lab-storage";
import type { LabDraft } from "./lab-storage";

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="notebook-field">
      <span>{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={500}
        rows={3}
      />
    </label>
  );
}
function Options<T extends string>({
  label,
  values,
  value,
  onChange,
}: {
  label: string;
  values: readonly { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <fieldset className="lab-options">
      <legend>{label}</legend>
      <div>
        {values.map((v) => (
          <button
            type="button"
            key={v.value}
            aria-pressed={value === v.value}
            onClick={() => onChange(v.value)}
          >
            {v.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
function Toggle({
  children,
  checked,
  onChange,
}: {
  children: ReactNode;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="lab-toggle">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{children}</span>
    </label>
  );
}

export function LabDiagram({
  id,
  settings,
  trial,
}: {
  id: LabId;
  settings: Settings;
  trial?: Trial;
}) {
  const s = settings;
  if (id === "water") {
    const level =
      s.scenario === "normal" ? 45 : s.scenario === "limit" ? 80 : 96;
    return (
      <div className="water-model">
        <svg
          viewBox="0 0 360 220"
          role="img"
          aria-label={`مستوى الماء ${level}%، ${trial ? trial.outcome : "المضخة لم تُختبر"}`}
        >
          <path
            d="M70 34V186H215V34"
            fill="white"
            stroke="currentColor"
            strokeWidth="5"
          />
          <rect
            x="73"
            y={186 - level * 1.5}
            width="139"
            height={level * 1.5}
            fill="var(--water)"
          />
          <path
            d="M62 66H223"
            stroke="var(--challenge)"
            strokeWidth="2"
            strokeDasharray="6 5"
          />
          <text x="36" y="70" fontSize="13">
            80%
          </text>
          <path
            d="M248 108H224M248 106V28H139V34"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <circle
            cx="271"
            cy="108"
            r="25"
            stroke="currentColor"
            strokeWidth="4"
            fill={
              !trial
                ? "var(--soft)"
                : trial.outcome === "المضخة متوقفة"
                  ? "var(--challenge)"
                  : "var(--learn)"
            }
          />
          <path d="M263 98L282 108L263 118Z" fill="currentColor" />
          <circle
            cx="208"
            cy="45"
            r="8"
            fill={
              s.scenario === "failure" ? "var(--challenge)" : "var(--explore)"
            }
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        <div className="model-readings">
          <span>
            الماء الحقيقي <b>{level}%</b>
          </span>
          <span>
            الحساس <b>{s.scenario === "failure" ? 60 : level}%</b>
          </span>
        </div>
        <p>{trial ? trial.outcome : "اختر القاعدة ثم اختبر المضخة"}</p>
      </div>
    );
  }
  if (id === "routing")
    return (
      <div className="delivery-model">
        <svg
          viewBox="0 0 360 210"
          role="img"
          aria-label="شبكة الطرق: المركز إلى A، ثم B أو C. طريق C إلى B متاح"
        >
          <path
            d="M70 105L180 42L290 105L180 173L70 105M180 42V173"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            d="M180 42L290 105"
            stroke={s.blocked ? "var(--challenge)" : "currentColor"}
            strokeWidth="5"
            strokeDasharray={s.blocked ? "8 8" : undefined}
          />
          {[
            ["مركز", 70, 105],
            ["A", 180, 42],
            ["B", 290, 105],
            ["C", 180, 173],
          ].map(([label, x, y]) => (
            <g key={label}>
              <circle
                cx={x}
                cy={y}
                r="25"
                fill="var(--paper)"
                stroke="currentColor"
                strokeWidth="3"
              />
              <text
                x={x}
                y={Number(y) + 5}
                textAnchor="middle"
                fontSize="14"
                fontWeight="bold"
              >
                {label}
              </text>
            </g>
          ))}
        </svg>
        <div className="route-output">
          <span>المركز</span>
          {s.order.map((v) => (
            <span key={v}>
              ← <bdi>{v}</bdi>
            </span>
          ))}
        </div>
        <p>{s.blocked ? "طريق A–B مغلق؛ طريق C–B متاح" : "الطرق مفتوحة"}</p>
      </div>
    );
  if (id === "traffic") {
    const display = trial?.settings;
    const bothStopped = display?.mode === "both" && display.interlock;
    return (
      <div className="intersection-model">
        <svg
          viewBox="0 0 360 230"
          role="img"
          aria-label={trial ? trial.detail : "الإشارات في انتظار الاختبار"}
        >
          <path d="M155 0H215V230H155ZM0 85H360V145H0Z" fill="var(--ink)" />
          <path
            d="M185 0V77M185 155V230M0 115H145M225 115H360"
            stroke="var(--paper)"
            strokeWidth="2"
            strokeDasharray="10 8"
          />
          <rect
            x="230"
            y="28"
            width="39"
            height="43"
            rx="8"
            fill="var(--ink)"
          />
          <circle
            cx="250"
            cy="49"
            r="12"
            fill={
              !display
                ? "var(--soft)"
                : !bothStopped && display.mode !== "ew"
                  ? "var(--learn)"
                  : "var(--challenge)"
            }
          />
          <rect
            x="74"
            y="156"
            width="39"
            height="43"
            rx="8"
            fill="var(--ink)"
          />
          <circle
            cx="94"
            cy="177"
            r="12"
            fill={
              !display
                ? "var(--soft)"
                : !bothStopped && display.mode !== "ns"
                  ? "var(--learn)"
                  : "var(--challenge)"
            }
          />
        </svg>
        <p>{trial ? trial.outcome : "طلبك لا يصبح مخرجًا حتى تختبره"}</p>
      </div>
    );
  }
  return (
    <div className="resource-model">
      <div className="resource-loop">
        <span>
          رصيد
          <br />
          <b>10</b>
        </span>
        <i>←</i>
        <span>
          تكلفة
          <br />
          <b>−3</b>
        </span>
        <i>←</i>
        <span>
          مكافأة
          <br />
          <b>+{s.reward}</b>
        </span>
      </div>
      <div className="resource-return">↶ الجولة التالية</div>
      <p>الرصيد التالي = الرصيد الحالي − 3 + المكافأة</p>
      {trial?.values && (
        <div className="resource-bars" aria-label="أرصدة الجولات الخمس">
          {trial.values.map((v, i) => (
            <div key={i}>
              <b>{v}</b>
              <span
                style={{
                  height: `${Math.max(6, (v / Math.max(...trial.values!)) * 80)}px`,
                }}
              />
              <small>جولة {i + 1}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function TrialNotebook({ id, trials }: { id: LabId; trials: Trial[] }) {
  return (
    <div className="trial-notebook">
      {trials.map((t, i) => (
        <article key={t.id}>
          <header>
            <b>تجربة {i + 1}</b>
            <span className={t.safe ? "trial-safe" : "trial-failure"}>
              {t.safe ? "الهدف تحقق" : "الهدف لم يتحقق"}
            </span>
          </header>
          <p className="trial-settings">{describeSettings(id, t.settings)}</p>
          <dl>
            <div>
              <dt>توقعت</dt>
              <dd>{t.prediction}</dd>
            </div>
            <div>
              <dt>السبب</dt>
              <dd>{t.reason}</dd>
            </div>
            <div>
              <dt>حدث</dt>
              <dd>{t.detail}</dd>
            </div>
          </dl>
          <p className="prediction-compare">
            {t.prediction === t.outcome
              ? "وافق الاختبار توقعك."
              : "اختلف الاختبار عن توقعك. هذه فرصة لمراجعة السبب."}
          </p>
        </article>
      ))}
    </div>
  );
}

function MissionLab({ id }: { id: LabId }) {
  const lab = labs[id];
  const [draft, setDraft] = useState<LabDraft>(
    () => readDraft(id) || emptyDraft(),
  );
  const [storageError, setStorageError] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const navigate = useNavigate();
  const s = draft.settings;
  useEffect(() => {
    const changed =
      draft.trials.length ||
      draft.observation ||
      draft.prediction ||
      draft.reason ||
      draft.explanation ||
      settingsKey(id, s) !== settingsKey(id, emptyDraft().settings);
    if (changed) setStorageError(!saveDraft(id, draft));
  }, [id, draft, s]);
  function update(patch: Partial<LabDraft>) {
    setDraft((d) => ({ ...d, ...patch, updatedAt: new Date().toISOString() }));
  }
  function configure(patch: Partial<Settings>) {
    setDraft((d) => ({
      ...d,
      settings: { ...d.settings, ...patch },
      prediction: "",
      reason: "",
      updatedAt: new Date().toISOString(),
    }));
  }
  const latest = draft.trials.at(-1);
  const currentTrial =
    latest && settingsKey(id, latest.settings) === settingsKey(id, s)
      ? latest
      : undefined;
  const readyToRun =
    draft.observation.trim().length >= 8 &&
    draft.prediction &&
    draft.reason.trim().length >= 8;
  const checks = milestones(id, draft.trials, s);
  const complete = canComplete(
    id,
    draft.trials,
    s,
    draft.observation,
    draft.explanation,
  );
  function run() {
    if (!readyToRun) return;
    const trial: Trial = {
      id: crypto.randomUUID(),
      at: new Date().toISOString(),
      settings: structuredClone(s),
      prediction: draft.prediction,
      reason: draft.reason.trim(),
      ...simulate(id, s),
    };
    update({ trials: [...draft.trials, trial], prediction: "", reason: "" });
  }
  function finish() {
    if (!complete) return;
    const saved = addEvidence({
      labId: id,
      mission: lab.title,
      items: ["يفهم", "يمثّل", "يتوقّع", "يختبر", "يفسّر"],
      note: `سجّل ${draft.trials.length} تجارب، لاحظ الفشل ثم اختبر التحسين.`,
      observation: draft.observation.trim(),
      explanation: draft.explanation.trim(),
      trials: draft.trials,
    });
    if (!saved) {
      setSaveError(true);
      return;
    }
    removeDraft(id);
    navigate("/result");
  }
  return (
    <Shell>
      <main className={`wrap notebook-page lab-${id}`}>
        <Link className="lab-back" to="/kid">
          → العودة إلى مساحتي
        </Link>
        <header className="notebook-heading">
          <div>
            <p className="eyebrow">مختبر {lab.number} / فكّر كنظام</p>
            <h1>{lab.title}</h1>
            <p>{lab.goal}</p>
          </div>
          <span className="lab-number" aria-hidden="true">
            {lab.number}
          </span>
        </header>
        <ol className="notebook-cycle">
          <li>
            <b>01</b> افهم القيد
          </li>
          <li>
            <b>02</b> صمّم وتوقّع
          </li>
          <li>
            <b>03</b> اختبر وحسّن
          </li>
          <li>
            <b>04</b> اشرح بالدليل
          </li>
        </ol>
        <p className="privacy-hint">
          اكتب أفكارك عن المهمة فقط. لا تضف اسمك الكامل أو المدرسة أو العنوان
          أو معلومات تواصل.
        </p>
        {storageError && (
          <p role="alert" className="storage-alert">
            تعذّر حفظ العمل في هذا المتصفح. أبقِ الصفحة مفتوحة حتى تنتهي.
          </p>
        )}
        <div className="notebook-workbench">
          <aside className="notebook-system">
            <div className="system-title">
              <span>نموذج النظام</span>
              <b>
                {currentTrial
                  ? "آخر نتيجة لهذه الإعدادات"
                  : "إعداد ينتظر الاختبار"}
              </b>
            </div>
            <LabDiagram id={id} settings={s} trial={currentTrial} />
            <div className="system-coach">
              <b>المُرسِل ◉</b>
              <p>{lab.hint}</p>
              <small>غيّر عاملًا واحدًا، ثم قارن تجربتين.</small>
            </div>
          </aside>
          <section className="notebook-controls" aria-label="بناء التجربة">
            <p className="eyebrow">01 / افهم</p>
            <Field
              label={lab.question}
              value={draft.observation}
              onChange={(v) => update({ observation: v })}
              placeholder="أحتاج أن أعرف... لأن..."
            />
            <h2>ابنِ القاعدة</h2>
            {id === "water" && (
              <>
                <Options
                  label="ماذا تفعل المضخة عند 80%؟"
                  value={s.stopAtLimit ? "stop" : "continue"}
                  values={[
                    { value: "stop", label: "تتوقف" },
                    { value: "continue", label: "تستمر" },
                  ]}
                  onChange={(v) => configure({ stopAtLimit: v === "stop" })}
                />
                <Options
                  label="حالة الاختبار"
                  value={s.scenario}
                  values={[
                    { value: "normal", label: "ماء 45%" },
                    { value: "limit", label: "الحد 80%" },
                    { value: "failure", label: "حساس معطّل" },
                  ]}
                  onChange={(v) => configure({ scenario: v })}
                />
                <Toggle
                  checked={s.safeguard}
                  onChange={(v) => configure({ safeguard: v })}
                >
                  حساس احتياطي: إذا اختلفت القراءتان، أوقف المضخة.
                </Toggle>
              </>
            )}
            {id === "routing" && (
              <>
                <ol className="delivery-stops">
                  {s.order.map((stop, i) => (
                    <li key={stop}>
                      <span>
                        <bdi>{stop}</bdi> ·{" "}
                        {stop === "A"
                          ? "صيدلية / الدواء أولًا"
                          : stop === "B"
                            ? "مكتبة"
                            : "منزل"}
                      </span>
                      <div>
                        {([-1, 1] as const).map((dir) => (
                          <button
                            key={dir}
                            disabled={i + dir < 0 || i + dir > 2}
                            aria-label={`${dir === -1 ? "تقديم" : "تأخير"} ${stop}`}
                            onClick={() => {
                              const order = [...s.order];
                              [order[i], order[i + dir]] = [
                                order[i + dir],
                                order[i],
                              ];
                              configure({ order });
                            }}
                          >
                            {dir === -1 ? "↑" : "↓"}
                          </button>
                        ))}
                      </div>
                    </li>
                  ))}
                </ol>
                <Toggle
                  checked={s.blocked}
                  onChange={(v) => configure({ blocked: v })}
                >
                  أغلق طريق A–B. الطريق البديل يمر عبر C.
                </Toggle>
              </>
            )}
            {id === "traffic" && (
              <>
                <Options
                  label="طلب المرور"
                  value={s.mode}
                  values={[
                    { value: "ns", label: "شمال / جنوب" },
                    { value: "ew", label: "شرق / غرب" },
                    { value: "both", label: "كلاهما" },
                  ]}
                  onChange={(v) => configure({ mode: v })}
                />
                <Toggle
                  checked={s.interlock}
                  onChange={(v) => configure({ interlock: v })}
                >
                  قاعدة أمان: ارفض طلب الاتجاهين واجعل الإشارتين حمراوين.
                </Toggle>
              </>
            )}
            {id === "economy" && (
              <label className="reward-control">
                المكافأة لكل جولة{" "}
                <select
                  value={s.reward}
                  onChange={(e) =>
                    configure({ reward: Number(e.target.value) })
                  }
                >
                  {[2, 3, 4, 5, 6, 7].map((n) => (
                    <option key={n} value={n}>
                      {n} موارد
                    </option>
                  ))}
                </select>
                <small>التكلفة ثابتة: 3 موارد / البداية: 10 موارد</small>
              </label>
            )}
            <div className="prediction-panel">
              <p className="panel-step">02 / قبل الاختبار</p>
              <h2>ماذا تتوقع؟</h2>
              <Options
                label="أتوقع أن…"
                value={draft.prediction}
                values={lab.outcomes.map((v) => ({ value: v, label: v }))}
                onChange={(v) => update({ prediction: v })}
              />
              <Field
                label="لماذا تتوقع ذلك؟"
                value={draft.reason}
                onChange={(v) => update({ reason: v })}
                placeholder="لأن القاعدة..."
              />
              <p className="run-hint">
                {draft.observation.trim().length < 8
                  ? "ابدأ بتحديد المعلومة أو القيد أعلاه (8 أحرف على الأقل)."
                  : !draft.prediction
                    ? "اختر توقعًا. يمكن أن يختلف عن النتيجة."
                    : draft.reason.trim().length < 8
                      ? "اكتب سببًا قصيرًا لتوقعك (8 أحرف على الأقل)."
                      : "توقعك جاهز. شغّل التجربة."}
              </p>
              <button
                className="button secondary full"
                disabled={!readyToRun}
                onClick={run}
              >
                شغّل الاختبار ←
              </button>
            </div>
            {currentTrial && (
              <div
                className={`current-outcome ${currentTrial.safe ? "safe" : "failed"}`}
                role="status"
              >
                <b>{currentTrial.outcome}</b>
                <p>{currentTrial.detail}</p>
                <span>
                  {currentTrial.prediction === currentTrial.outcome
                    ? "توقعك وافق النتيجة."
                    : "نتيجة مختلفة عن توقعك. راجع القاعدة قبل التجربة التالية."}
                </span>
              </div>
            )}
          </section>
        </div>
        <section className="notebook-history">
          <div className="notebook-section-head">
            <div>
              <p className="eyebrow">03 / اختبر وحسّن</p>
              <h2>دفتر التجارب</h2>
            </div>
            <span>{draft.trials.length} تجارب مسجلة</span>
          </div>
          {draft.trials.length ? (
            <TrialNotebook id={id} trials={draft.trials} />
          ) : (
            <p className="notebook-empty">
              أول تجربة ستحتفظ بتوقعك وسببك والنتيجة. يمكنك العودة إليها عندما
              تغيّر القاعدة.
            </p>
          )}
        </section>
        <section className="notebook-finish">
          <div>
            <p className="eyebrow">04 / اشرح بالدليل</p>
            <h2>ما الذي تغيّر؟</h2>
            <Field
              label={lab.prompt}
              value={draft.explanation}
              onChange={(v) => update({ explanation: v })}
              placeholder="في تجربة... حدث... وبعد تغيير..."
            />
            <p className="reflection-hint">
              اكتب تفسيرًا من 15 حرفًا على الأقل. نحتفظ بكلماتك ليراجعها وليّ
              الأمر.
            </p>
          </div>
          <aside>
            <h3>قبل تسجيل الدليل</h3>
            <ul className="milestone-list">
              {checks.map((c) => (
                <li key={c.label}>
                  <span aria-hidden="true">{c.done ? "✓" : "○"}</span>
                  {c.label}
                  <small>{c.done ? "تم" : "مطلوب"}</small>
                </li>
              ))}
              <li>
                <span aria-hidden="true">
                  {draft.explanation.trim().length >= 15 ? "✓" : "○"}
                </span>
                اشرح الفرق بكلماتك
              </li>
            </ul>
            <button
              className="button full"
              disabled={!complete}
              onClick={finish}
            >
              سجّل دليل التعلّم ←
            </button>
            {saveError && (
              <p role="alert" className="storage-alert">
                تعذّر حفظ الدليل. عملك ما زال هنا؛ أعد المحاولة بعد إتاحة تخزين
                المتصفح.
              </p>
            )}
          </aside>
        </section>
      </main>
    </Shell>
  );
}

export function WaterMission() {
  return <MissionLab id="water" />;
}
export function RoutingMission() {
  return <MissionLab id="routing" />;
}
export function TrafficMission() {
  return <MissionLab id="traffic" />;
}
export function EconomyMission() {
  return <MissionLab id="economy" />;
}

export function Result() {
  const latest = getEvidence()[0];
  const profile = getProfile();
  return (
    <Shell>
      <main className="wrap narrow notebook-page">
        <p className="eyebrow">{latest ? "دليل التعلّم" : "ابدأ بمختبر"}</p>
        <h1>
          {latest
            ? `سجّلت تفكيرك يا ${profile.child}`
            : "لا يوجد دليل مسجل بعد"}
        </h1>
        {latest && (
          <>
            <h2>{latest.mission}</h2>
            <p>{latest.note}</p>
            {latest.explanation && (
              <blockquote className="child-quote">
                {latest.explanation}
              </blockquote>
            )}
            {latest.labId && (
              <div className="transfer-question">
                <b>خذ الفكرة إلى نظام آخر</b>
                <p>{labs[latest.labId].transfer}</p>
              </div>
            )}
          </>
        )}
        <div className="hero-actions">
          <Link className="button" to="/kid">
            تابع المسار ←
          </Link>
          <Link className="button button-ghost" to="/parent">
            اعرض الدليل لوليّ الأمر
          </Link>
        </div>
      </main>
    </Shell>
  );
}
