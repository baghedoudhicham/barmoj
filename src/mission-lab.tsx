import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Shell } from "./components";
import { LearningVoice, VoiceEvidence } from "./learning-voice";
import type { BrandLanguage } from "./brand";
import { defaultNicknames } from "./languages";
import { addEvidence, getEvidence, getProfile } from "./data";
import {
  canComplete,
  milestones,
  settingsKey,
  simulate,
} from "./lab-model";
import type { LabId, Settings, Trial } from "./lab-model";
import { emptyDraft, MAX_TRIALS, readDraft, removeDraft, saveDraft } from "./lab-storage";
import type { LabDraft } from "./lab-storage";
import {
  languageNames,
  missionWords,
  outcomeIndex,
  outcomeLabel,
  predictionMatches,
  sharedCopy,
  settingsDescription,
  trialDetail,
} from "./lab-copy";

const direction = (language: BrandLanguage) => language === "ar" ? "rtl" : "ltr";
const localizedPath = (path: string, language: BrandLanguage) => `${path}?lang=${language}`;
const labsNumber: Record<LabId, string> = { water: "06", routing: "02", traffic: "05", economy: "08" };

function Field({
  label,
  value,
  onChange,
  placeholder,
  language = "ar",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  language?: BrandLanguage;
}) {
  return (
    <label className="notebook-field">
      <span>{label}</span>
      <textarea
        lang={language}
        dir="auto"
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
  language = "ar",
}: {
  id: LabId;
  settings: Settings;
  trial?: Trial;
  language?: BrandLanguage;
}) {
  const s = settings;
  const copy = sharedCopy[language];
  const result = trial ? outcomeLabel(id, trial.outcome, language) : "";
  const detail = trial ? trialDetail(id, trial, language) : "";
  if (id === "water") {
    const level =
      s.scenario === "normal" ? 45 : s.scenario === "limit" ? 80 : 96;
    return (
      <div className="water-model">
        <svg
          viewBox="0 0 360 220"
          role="img"
          aria-label={language === "ar" ? `مستوى الماء ${level}%، ${result || "المضخة لم تُختبر"}` : language === "fr" ? `Niveau d’eau ${level} %, ${result || "pompe non testée"}` : `Water level ${level}%, ${result || "pump not tested"}`}
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
              : outcomeIndex(id, trial.outcome) === 1
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
            {language === "ar" ? "الماء الحقيقي" : language === "fr" ? "Niveau réel" : "Real water"} <b>{level}%</b>
          </span>
          <span>
            {language === "ar" ? "الحساس" : language === "fr" ? "Capteur" : "Sensor"} <b>{s.scenario === "failure" ? 60 : level}%</b>
          </span>
        </div>
        <p>{trial ? result : language === "ar" ? "اختر القاعدة ثم اختبر المضخة" : language === "fr" ? "Choisis une règle, puis teste la pompe" : "Choose a rule, then test the pump"}</p>
      </div>
    );
  }
  if (id === "routing")
    return (
      <div className="delivery-model">
        <svg
          viewBox="0 0 360 210"
          role="img"
          aria-label={language === "ar" ? "شبكة الطرق: المركز إلى A، ثم B أو C. طريق C إلى B متاح" : language === "fr" ? "Réseau routier : du centre à A, puis à B ou C. La route de C à B est disponible." : "Road network: hub to A, then B or C. The road from C to B is available."}
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
            [language === "ar" ? "مركز" : language === "fr" ? "Centre" : "Hub", 70, 105],
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
          <span>{language === "ar" ? "المركز" : language === "fr" ? "Centre" : "Hub"}</span>
          {s.order.map((v) => (
            <span key={v}>
              {language === "ar" ? "←" : "→"} <bdi>{v}</bdi>
            </span>
          ))}
        </div>
        <p>{language === "ar" ? s.blocked ? "طريق A–B مغلق؛ طريق C–B متاح" : "الطرق مفتوحة" : language === "fr" ? s.blocked ? "Route A–B fermée ; route C–B disponible" : "Routes ouvertes" : s.blocked ? "Road A–B closed; road C–B available" : "Roads are open"}</p>
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
          aria-label={detail || (language === "ar" ? "الإشارات في انتظار الاختبار" : language === "fr" ? "Les feux attendent le test" : "Signals are waiting to be tested")}
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
          <text x="250" y="21" fontSize="11" textAnchor="middle">{copy.directions[0]}</text>
          <text x="94" y="219" fontSize="11" textAnchor="middle">{copy.directions[1]}</text>
        </svg>
        <p>{trial ? result : language === "ar" ? "طلبك لا يصبح مخرجًا حتى تختبره" : language === "fr" ? "Ta demande n’est pas un résultat avant le test" : "A request is not an outcome until you test it"}</p>
      </div>
    );
  }
  return (
    <div className="resource-model">
      <div className="resource-loop">
        <span>
          {language === "ar" ? "رصيد" : language === "fr" ? "Solde" : "Total"}
          <br />
          <b>10</b>
        </span>
        <i>←</i>
        <span>
          {language === "ar" ? "تكلفة" : language === "fr" ? "Coût" : "Cost"}
          <br />
          <b>−3</b>
        </span>
        <i>←</i>
        <span>
          {language === "ar" ? "مكافأة" : language === "fr" ? "Récompense" : "Reward"}
          <br />
          <b>+{s.reward}</b>
        </span>
      </div>
      <div className="resource-return">↶ {language === "ar" ? "الجولة التالية" : language === "fr" ? "Tour suivant" : "Next turn"}</div>
      <p>{language === "ar" ? "الرصيد التالي = الرصيد الحالي − 3 + المكافأة" : language === "fr" ? "Solde suivant = solde actuel − 3 + récompense" : "Next total = current total − 3 + reward"}</p>
      {trial?.values && (
        <div className="resource-bars" aria-label={language === "ar" ? "أرصدة الجولات الخمس" : language === "fr" ? "Soldes des cinq tours" : "Totals for the five turns"}>
          {trial.values.map((v, i) => (
            <div key={i}>
              <b>{v}</b>
              <span
                style={{
                  height: `${Math.max(6, (v / Math.max(1, ...trial.values!)) * 80)}px`,
                }}
              />
              <small>{language === "ar" ? "جولة" : language === "fr" ? "Tour" : "Turn"} {i + 1}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function TrialNotebook({ id, trials, language = "ar" }: { id: LabId; trials: Trial[]; language?: BrandLanguage }) {
  const c = sharedCopy[language];
  return (
    <div className="trial-notebook">
      {trials.map((t, i) => (
        <article key={t.id} className="trial-entry" lang={language} dir={direction(language)}>
          <header>
            <b>{c.attempt} {i + 1}</b>
            <span className={t.safe ? "trial-safe" : "trial-failure"}>
              {t.safe ? c.goalMet : c.goalNotMet}
            </span>
          </header>
          <p className="trial-settings">{settingsDescription(id, t.settings, language)}</p>
          <dl>
            <div>
              <dt>{c.predicted}</dt>
              <dd lang={language} dir={direction(language)}>{outcomeLabel(id, t.prediction, language)}</dd>
            </div>
            <div>
              <dt>{c.reason}</dt>
              <dd lang={t.language || "ar"} dir={direction(t.language || "ar")}>{t.reason}</dd>
            </div>
            <div>
              <dt>{c.happened}</dt>
              <dd lang={language} dir={direction(language)}>{trialDetail(id, t, language)}</dd>
            </div>
          </dl>
          <p className="prediction-compare">
            {predictionMatches(id, t.prediction, t.outcome) ? c.resultMatches : c.resultDiffers}
          </p>
        </article>
      ))}
    </div>
  );
}

function MissionLab({ id }: { id: LabId }) {
  const [params, setParams] = useSearchParams();
  const requestedLanguage = params.get("lang");
  const language: BrandLanguage = requestedLanguage === "en" || requestedLanguage === "fr" ? requestedLanguage : "ar";
  const c = sharedCopy[language];
  const lab = missionWords[language][id];
  const [draft, setDraft] = useState<LabDraft>(
    () => readDraft(id) || emptyDraft(),
  );
  const [activeStep, setActiveStep] = useState<0 | 1 | 2 | 3>(() => {
    const saved = readDraft(id) || emptyDraft();
    if (saved.explanation.trim()) return 3;
    if (saved.trials.length) return 2;
    if (saved.observation.trim().length >= 8) return 1;
    return 0;
  });
  const [storageError, setStorageError] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const outcome = useRef<HTMLDivElement>(null);
  const stepHeading = useRef<HTMLHeadingElement>(null);
  const focusOutcome = useRef(false);
  const focusStep = useRef(false);
  const navigate = useNavigate();
  const s = draft.settings;
  useEffect(() => {
    const changed =
      draft.trials.length ||
      draft.observation ||
      draft.prediction ||
      draft.reason ||
      draft.explanation ||
      draft.question ||
      draft.application ||
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
  useEffect(() => {
    if (!focusOutcome.current) return;
    focusOutcome.current = false;
    outcome.current?.focus();
  }, [latest?.id]);
  useEffect(() => {
    if (!focusStep.current) return;
    focusStep.current = false;
    stepHeading.current?.focus();
  }, [activeStep]);
  const currentTrial = [...draft.trials].reverse().find(t => settingsKey(id, t.settings) === settingsKey(id, s));
  const readyToRun =
    draft.observation.trim().length >= 8 &&
    draft.prediction &&
    draft.reason.trim().length >= 8;
  const checks = milestones(id, draft.trials, s);
  const checksDone = checks.filter((check) => check.done).length;
  const allChecksDone = checks.length > 0 && checksDone === checks.length;
  const recentTrials = draft.trials.slice(-3);
  const earlierTrials = draft.trials.slice(0, -3);
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
      language,
      ...simulate(id, s),
    };
    focusOutcome.current = true;
    update({ trials: [...draft.trials, trial].slice(-MAX_TRIALS), prediction: "", reason: "" });
    setActiveStep(2);
  }
  function goToStep(step: 0 | 1 | 2 | 3) {
    const canOpen = step === 0 || (step === 1 && draft.observation.trim().length >= 8) || ((step === 2 || step === 3) && draft.trials.length > 0);
    if (!canOpen || step === activeStep) return;
    focusStep.current = true;
    setActiveStep(step);
  }
  function finish() {
    if (!complete) return;
    const saved = addEvidence({
      labId: id,
      mission: c.missionNames[id],
      items: ["يفهم", "يمثّل", "يتوقّع", "يختبر", "يفسّر"],
      note: language === "ar"
        ? `سجّل ${draft.trials.length} تجارب، ولاحظ الفشل ثم اختبر التحسين.`
        : language === "fr"
          ? `${draft.trials.length} essais enregistrés : un échec observé, puis une amélioration testée.`
          : `${draft.trials.length} trials recorded: a failure was noticed, then an improvement was tested.`,
      observation: draft.observation.trim(),
      explanation: draft.explanation.trim(),
      observationLanguage: draft.observationLanguage || language,
      explanationLanguage: draft.explanationLanguage || language,
      question: draft.question?.trim(),
      application: draft.application?.trim(),
      questionLanguage: draft.questionLanguage,
      applicationLanguage: draft.applicationLanguage,
      trials: draft.trials,
      language,
      transfer: lab.transfer,
    });
    if (!saved) {
      setSaveError(true);
      return;
    }
    removeDraft(id);
    navigate(localizedPath("/result", language));
  }
  return (
    <Shell language={language}>
      <main className={`wrap notebook-page lab-${id}`} lang={language} dir={direction(language)}>
        <div className="lab-language-bar">
          <Link className="lab-back" to={localizedPath("/missions", language)}>{c.back}</Link>
          <div className="language-tabs" role="group" aria-label={c.chooseLanguage}>
            {(Object.keys(languageNames) as BrandLanguage[]).map((item) => (
              <button
                type="button"
                key={item}
                lang={item}
                className={language === item ? "selected" : ""}
                aria-pressed={language === item}
                onClick={() => setParams({ lang: item }, { replace: true })}
              >
                {languageNames[item]}
              </button>
            ))}
          </div>
        </div>
        <header className="notebook-heading">
          <div>
            <p className="eyebrow">{c.eyebrow.replace("{number}", labsNumber[id])}</p>
            <h1>{lab.title}</h1>
            <p className="lab-heading-goal">{lab.goal}</p>
          </div>
          <span className="lab-number" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="1.5" />
              <path d="m28.5 16-3.8 9.1-9.2 3.8 3.9-9.1 9.1-3.8Z" fill="var(--explore)" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <circle cx="23.9" cy="24.1" r="2" fill="var(--learn)" stroke="currentColor" strokeWidth="1.25" />
            </svg>
            <b>{labsNumber[id]}</b>
          </span>
        </header>
        <p className="privacy-hint">{c.privacyShort}</p>
        <nav className="lab-stepper" aria-label={c.progressLabel}>
          <ol>
            {c.phases.map((phase, i) => {
              const step = i as 0 | 1 | 2 | 3;
              const done = step === 0 ? draft.observation.trim().length >= 8 : step === 1 ? draft.trials.length > 0 : step === 2 ? allChecksDone : complete;
              const unlocked = step === 0 || (step === 1 && draft.observation.trim().length >= 8) || ((step === 2 || step === 3) && draft.trials.length > 0);
              return (
                <li key={phase}>
                  <button
                    type="button"
                    className={activeStep === step ? "is-current" : ""}
                    aria-current={activeStep === step ? "step" : undefined}
                    aria-label={done ? `${phase} · ${c.done}` : phase}
                    disabled={!unlocked}
                    onClick={() => goToStep(step)}
                  >
                    <span className="lab-step-index" aria-hidden="true">{done ? "✓" : String(i + 1).padStart(2, "0")}</span>
                    <span>{phase}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>
        {storageError && (
          <p role="alert" className="storage-alert">
            {c.storageError}
          </p>
        )}
        <section className="lab-stage-grid" aria-labelledby="lab-stage-heading">
          <aside className="notebook-system lab-stage-model" dir={direction(language)}>
            <div className="system-title">
              <span>{c.system}</span>
              <b>
                {currentTrial
                  ? c.lastResult
                  : c.waiting}
              </b>
            </div>
            <LabDiagram id={id} settings={s} trial={currentTrial} language={language} />
            <div className="system-coach">
              <b><span className="lab-guide-mark" aria-hidden="true">✳</span>{c.coach}</b>
              <p>{lab.hint}</p>
              <small>{c.changeOne}</small>
            </div>
          </aside>
          <div className="lab-stage-content" dir={direction(language)}>
            <header className="lab-stage-heading">
              <span className="lab-stage-spark" aria-hidden="true">{["↗", "✳", "↻", "◇"][activeStep]}</span>
              <div>
                <p className="eyebrow">{c.stepLabel.replace("{step}", String(activeStep + 1))}</p>
                <h2 id="lab-stage-heading" ref={stepHeading} tabIndex={-1}>{c.phases[activeStep]}</h2>
                <p>{c.stepPrompts[activeStep]}</p>
              </div>
            </header>

            {activeStep === 0 && (
              <section className="notebook-controls lab-stage-card">
                <p className="lab-focus-label">{c.coachHint}</p>
                <Field
                  label={lab.question}
                  language={draft.observationLanguage || language}
                  value={draft.observation}
                  onChange={(v) => update({ observation: v, observationLanguage: language })}
                  placeholder={c.cluePlaceholder}
                />
                <details className="lab-optional">
                  <summary>{c.optionalQuestion}</summary>
                  <LearningVoice kind="question" language={language} answerLanguage={draft.questionLanguage} value={draft.question || ""} onChange={question => update({ question, questionLanguage: language })} />
                </details>
                <p className="run-hint">{draft.observation.trim().length < 8 ? c.clueHint : c.readyHint}</p>
                <button className="button full lab-primary-action" type="button" disabled={draft.observation.trim().length < 8} onClick={() => goToStep(1)}>
                  {c.nextPredict}
                </button>
              </section>
            )}

            {activeStep === 1 && (
              <section className="notebook-controls lab-stage-card" aria-label={c.understand}>
                <div className="lab-build-heading">
                  <span aria-hidden="true">01</span>
                  <h3>{c.build}</h3>
                </div>
            {id === "water" && (
              <>
                <Options
                  label={c.pumpAtLimit}
                  value={s.stopAtLimit ? "stop" : "continue"}
                  values={[
                    { value: "stop", label: c.stop },
                    { value: "continue", label: c.continue },
                  ]}
                  onChange={(v) => configure({ stopAtLimit: v === "stop" })}
                />
                <Options
                  label={c.testState}
                  value={s.scenario}
                  values={[
                    { value: "normal", label: c.normalWater },
                    { value: "limit", label: c.limitWater },
                    { value: "failure", label: c.faultySensor },
                  ]}
                  onChange={(v) => configure({ scenario: v })}
                />
                <Toggle
                  checked={s.safeguard}
                  onChange={(v) => configure({ safeguard: v })}
                >{c.backupSensor}: {c.backupHelp}</Toggle>
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
                          ? c.destination[0]
                          : stop === "B"
                            ? c.destination[1]
                            : c.destination[2]}
                      </span>
                      <div>
                        {([-1, 1] as const).map((dir) => (
                          <button
                            key={dir}
                            disabled={i + dir < 0 || i + dir > 2}
                            aria-label={`${dir === -1 ? c.moveEarlier : c.moveLater} ${stop}`}
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
                >{c.blockRoad}</Toggle>
              </>
            )}
            {id === "traffic" && (
              <>
                <Options
                  label={c.trafficRequest}
                  value={s.mode}
                  values={[
                    { value: "ns", label: c.directions[0] },
                    { value: "ew", label: c.directions[1] },
                    { value: "both", label: c.directions[2] },
                  ]}
                  onChange={(v) => configure({ mode: v })}
                />
                <Toggle
                  checked={s.interlock}
                  onChange={(v) => configure({ interlock: v })}
                >{c.safetyRule}</Toggle>
              </>
            )}
            {id === "economy" && (
              <label className="reward-control">
                {c.reward}{" "}
                <select
                  value={s.reward}
                  onChange={(e) =>
                    configure({ reward: Number(e.target.value) })
                  }
                >
                  {[2, 3, 4, 5, 6, 7].map((n) => (
                    <option key={n} value={n}>
                      {n} {c.resources}
                    </option>
                  ))}
                </select>
                <small>{c.economyCost}</small>
              </label>
            )}
            <div className="prediction-panel">
              <p className="panel-step">{c.predictionStep}</p>
              <h2>{c.predictionHeading}</h2>
              <Options
                label={c.predict}
                value={draft.prediction}
                values={missionWords.ar[id].outcomes.map((v, i) => ({ value: v, label: lab.outcomes[i] }))}
                onChange={(v) => update({ prediction: v })}
              />
              <Field
                label={c.whyPredict}
                language={language}
                value={draft.reason}
                onChange={(v) => update({ reason: v })}
                placeholder={c.reasonPlaceholder}
              />
              <p className="run-hint" id="run-hint">
                {draft.observation.trim().length < 8
                  ? c.clueHint
                  : !draft.prediction
                    ? c.choosePrediction
                    : draft.reason.trim().length < 8
                      ? c.reasonHint
                      : c.readyHint}
              </p>
              <button
                type="button"
                className="button secondary full"
                disabled={!readyToRun}
                aria-describedby="run-hint"
                onClick={run}
              >
                {c.run}
              </button>
            </div>
              </section>
            )}

            {activeStep === 2 && (
              <section className="notebook-controls lab-stage-card lab-review-stage">
                {latest && (
                  <div className={`current-outcome ${latest.safe ? "safe" : "failed"}`} ref={outcome} tabIndex={-1} key={latest.id} role="status" aria-atomic="true">
                    <b>{outcomeLabel(id, latest.outcome, language)}</b>
                    <p>{trialDetail(id, latest, language)}</p>
                    <span>{predictionMatches(id, latest.prediction, latest.outcome) ? c.predictionCorrect : c.predictionReview}</span>
                  </div>
                )}
                <div className="notebook-section-head lab-review-title">
                  <div>
                    <p className="eyebrow">{c.explainStep}</p>
                    <h3>{c.notebook}</h3>
                  </div>
                  <span>{draft.trials.length} {c.trialsCount}</span>
                </div>
                <p className="lab-count-note">{c.progressCount.replace("{done}", String(checksDone)).replace("{total}", String(checks.length))}</p>
                {recentTrials.length ? <TrialNotebook id={id} trials={recentTrials} language={language} /> : <p className="notebook-empty">{c.notebookEmpty}</p>}
                {earlierTrials.length > 0 && (
                  <details className="lab-optional lab-older-trials">
                    <summary>{c.olderTrials.replace("{count}", String(earlierTrials.length))}</summary>
                    <TrialNotebook id={id} trials={earlierTrials} language={language} />
                  </details>
                )}
                <p className="local-note">{c.localLimit}</p>
                <div className="lab-stage-actions">
                  <button className="button secondary" type="button" onClick={() => goToStep(1)}>{c.tryAnother}</button>
                  <button className="button" type="button" onClick={() => goToStep(3)}>{c.explainNext}</button>
                </div>
              </section>
            )}

            {activeStep === 3 && (
              <section className="notebook-controls lab-stage-card lab-explain-stage">
                <Field
                  label={lab.prompt}
                  language={draft.explanationLanguage || language}
                  value={draft.explanation}
                  onChange={(v) => update({ explanation: v, explanationLanguage: language })}
                  placeholder={c.explanationPlaceholder}
                />
                <p className="reflection-hint">{c.reflectionHint}</p>
                <details className="lab-optional">
                  <summary>{c.optionalApplication}</summary>
                  <LearningVoice kind="application" language={language} answerLanguage={draft.applicationLanguage} value={draft.application || ""} onChange={application => update({ application, applicationLanguage: language })} />
                </details>
                <aside className="lab-evidence-checks">
                  <div className="lab-evidence-heading">
                    <h3>{c.reviewEvidence}</h3>
                    <span>{checksDone}/{checks.length}</span>
                  </div>
                  <ul className="milestone-list">
                    {checks.map((check, i) => (
                      <li key={i}>
                        <span aria-hidden="true">{check.done ? "✓" : "○"}</span>
                        {c.milestoneLabels[id][i]}
                        <small>{check.done ? c.done : c.needed}</small>
                      </li>
                    ))}
                    <li>
                      <span aria-hidden="true">{draft.explanation.trim().length >= 15 ? "✓" : "○"}</span>
                      {c.explainDifference}
                      <small>{draft.explanation.trim().length >= 15 ? c.done : c.needed}</small>
                    </li>
                  </ul>
                  {!allChecksDone && <button className="button secondary full" type="button" onClick={() => goToStep(1)}>{c.completeChecks}</button>}
                  <button className="button full lab-primary-action" type="button" disabled={!complete} onClick={finish}>{c.saveEvidence}</button>
                  {saveError && <p role="alert" className="storage-alert">{c.saveError}</p>}
                </aside>
              </section>
            )}
          </div>
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
  const [params] = useSearchParams();
  const requestedLanguage = params.get("lang");
  const language: BrandLanguage = requestedLanguage === "en" || requestedLanguage === "fr" ? requestedLanguage : "ar";
  const c = sharedCopy[language];
  const latest = getEvidence()[0];
  const profile = getProfile(defaultNicknames[language]);
  return (
    <Shell language={language}>
      <main className="wrap narrow notebook-page" lang={language} dir={direction(language)}>
        <p className="eyebrow">{latest ? c.resultEyebrow : c.startLab}</p>
        <h1>
          {latest
            ? <>{c.resultTitle.split("{name}")[0]}<bdi dir="auto">{profile.child}</bdi>{c.resultTitle.split("{name}")[1]}</>
            : c.noResult}
        </h1>
        {latest && (
          <>
            <h2 lang={latest.language || "ar"} dir={direction(latest.language || "ar")}>{latest.mission}</h2>
            <p lang={latest.language || "ar"} dir={direction(latest.language || "ar")}>{latest.note}</p>
            {latest.explanation && (
              <blockquote className="child-quote" lang={latest.explanationLanguage || latest.language || "ar"} dir={direction(latest.explanationLanguage || latest.language || "ar")}>
                {latest.explanation}
              </blockquote>
            )}
            {latest.labId && (
              <div className="transfer-question" lang={latest.language || "ar"} dir={direction(latest.language || "ar")}>
                <b>{c.transfer}</b>
                <p>{latest.transfer || missionWords[language][latest.labId].transfer}</p>
              </div>
            )}
            <VoiceEvidence {...latest} language={language} audience="child" />
          </>
        )}
        <div className="hero-actions">
          <Link className="button" to={localizedPath("/missions", language)}>
            {c.continueTrack}
          </Link>
          <Link className="button button-ghost" to={localizedPath("/parent", language)}>
            {c.parentEvidence}
          </Link>
        </div>
      </main>
    </Shell>
  );
}
