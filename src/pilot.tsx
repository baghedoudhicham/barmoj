import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
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
import type { BrandLanguage } from "./brand";
import { languageNames, missionWords, sharedCopy } from "./lab-copy";
import { pilotUiCopy } from "./pilot-ui-copy";
import { LanguagePicker } from "./language-picker";
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

function MissionSystemPreview({ tone, language }: { tone: string; language: BrandLanguage }) {
  const id: LabId = tone === "water" ? "water" : tone === "learn" ? "routing" : tone === "challenge" ? "traffic" : "economy";
  return <LabDiagram id={id} settings={initialSettings()} language={language} />;
}
export function MissionHub() {
  const [params, setParams] = useSearchParams();
  const requested = params.get("lang");
  const language: BrandLanguage = requested === "en" || requested === "fr" ? requested : "ar";
  const c = sharedCopy[language];
  const RouteArrow = language === "ar" ? ArrowLeft : ArrowRight;
  return (
    <Shell language={language}>
      <main className="wrap pilot-page" lang={language} dir={language === "ar" ? "rtl" : "ltr"}>
        <header className="pilot-hero compact-hero">
          <div>
            <p className="eyebrow">{c.hubEyebrow}</p>
            <h1>
              {c.hubTitle[0]}
              <br />
              {c.hubTitle[1]}
            </h1>
            <p className="pilot-lead">{c.hubBody}</p>
          </div>
          <div className="cycle-strip" aria-label={language === "ar" ? "دورة التفكير" : language === "fr" ? "Cycle de réflexion" : "Thinking cycle"}>
            {c.hubCycle.map((item, index) => (
              <span key={item}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                {item}
              </span>
            ))}
          </div>
          <div className="language-tabs" role="group" aria-label={c.chooseLanguage}>
            {(Object.keys(languageNames) as BrandLanguage[]).map((item) => (
              <button type="button" key={item} lang={item} className={language === item ? "selected" : ""} aria-pressed={language === item} onClick={() => setParams({ lang: item }, { replace: true })}>{languageNames[item]}</button>
            ))}
          </div>
        </header>

        <p className="privacy-hint">{c.supervisionNote}</p>

        <section className="mission-atlas">
          {availableMissions.map((mission) => {
            const Icon = mission.icon;
            return (
              <Link
                className={`atlas-card ${mission.tone}`}
                to={`${mission.route}?lang=${language}`}
                key={mission.route}
              >
                <div className="atlas-meta">
                  <span>{mission.number}</span>
                  <Icon size={20} />
                </div>
                <div className="atlas-visual">
                  <MissionSystemPreview tone={mission.tone} language={language} />
                </div>
                <div className="atlas-copy">
                  {(() => { const id = mission.route.split("/").at(-1) as LabId; const copy = missionWords[language][id]; return <><p>{c.missionSummary[id]}</p><h2>{copy.title}</h2><span>{copy.goal}</span></>; })()}
                  <strong>
                    {c.hubOpen} <RouteArrow size={17} />
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
  const [params] = useSearchParams();
  const requested = params.get("lang");
  const language: BrandLanguage = requested === "en" || requested === "fr" ? requested : "ar";
  const c = pilotUiCopy[language].kid;
  const RouteArrow = language === "ar" ? ArrowLeft : ArrowRight;
  const profile = getProfile(c.defaultNickname);
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
  const focusCopy = missionWords[language][nextId];

  return (
    <Shell language={language}>
      <main className="wrap pilot-page" lang={language} dir={language === "ar" ? "rtl" : "ltr"}>
        <LanguagePicker language={language} label={pilotUiCopy[language].languageLabel} />
        <header className="workspace-v2-head">
          <div>
            <p className="eyebrow">{c.space}</p>
            <h1>{c.greeting}<bdi>{profile.child}</bdi></h1>
            <p>{c.intro}</p>
          </div>
          <Link className="workspace-switch" to={`/parent?lang=${language}`}>
            {c.parent} <RouteArrow size={17} />
          </Link>
        </header>

        <section className="focus-board">
          <div className="focus-copy">
            <div className="focus-label">
              <span>
                {unfinished
                  ? c.continue
                  : verified.length === 4
                    ? c.tryAgain
                    : c.nextLab}
              </span>
              <b>{focus.number} / {c.curriculumTrack}</b>
            </div>
            <h2>{focusCopy.title}</h2>
            <p>{focusCopy.goal}</p>
            <div className="reasoning-contract">
              <span><b>{c.contractBefore}</b>{language === "ar" ? " أتوقع" : language === "fr" ? " : je prédis" : "I predict"}</span>
              <span><b>{c.contractDuring}</b>{language === "ar" ? " ألاحظ" : language === "fr" ? " : j’observe" : "I notice"}</span>
              <span><b>{c.contractAfter}</b>{language === "ar" ? " أفسّر" : language === "fr" ? " : j’explique" : "I explain"}</span>
            </div>
            <Link className="button secondary" to={`/mission/${nextId}?lang=${language}`}>
              {unfinished ? c.continueLab : c.openLab}{" "}
              <RouteArrow size={18} />
            </Link>
            <p className="focus-proof-status">
              {unfinished
                ? c.draftsSaved(unfinished.draft.trials.length)
                : c.booksComplete(verified.length)}
            </p>
          </div>
          <div className="focus-system">
            <LabDiagram
              id={nextId}
              settings={unfinished?.draft.settings || initialSettings()}
              trial={focusTrial}
              language={language}
            />
            <div className="focus-annotation">{c.inputRuleOutput}</div>
          </div>
        </section>

        <section className="evidence-rail-section">
          <div className="evidence-intro">
            <p className="eyebrow">{c.evidenceEyebrow}</p>
            <h2>{c.evidenceTitle}</h2>
            <p>{c.evidenceBody}</p>
          </div>
          <div className="evidence-rail-v2">
            {c.evidence.map(([name, label], index) => {
              const sourceName = evidenceLabels[index][0];
              const active = verified.some((entry) =>
                entry.items.includes(sourceName),
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
              <p className="eyebrow">{c.trackEyebrow}</p>
              <h2>{c.trackTitle}</h2>
            </div>
            <Link to={`/missions?lang=${language}`}>
              {c.openLabs} <RouteArrow size={17} />
            </Link>
          </div>
          <div className="track-path">
            {missions.map(([sourceTitle], index) => {
              const [title, desc] = c.missions[index];
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
              const labId = route?.split("/").at(-1) as LabId | undefined;
              const done = labId
                ? verified.some((entry) => entry.labId === labId)
                : completedNames.has(sourceTitle);
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
                      {done ? c.review : c.open} <RouteArrow size={15} />
                    </Link>
                  ) : (
                    <span className="path-lock" title={c.later}>
                      <LockKeyhole size={14} /> {c.later}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <p className="local-note">{c.trackStatus}</p>
        </section>

        <section className="recent-proof">
          <div>
            <p className="eyebrow">{c.recentEyebrow}</p>
            <h2>
              {evidence.length
                ? c.recentHasEvidence
                : c.recentEmpty}
            </h2>
          </div>
          {evidence.length ? (
            <div className="proof-list">
              {evidence.slice(0, 3).map((entry) => (
                <article key={entry.mission}>
                  <b lang={entry.language || "ar"} dir={entry.language === "en" || entry.language === "fr" ? "ltr" : "rtl"}>{entry.mission}</b>
                  <p lang={entry.explanationLanguage || entry.language || "ar"} dir={entry.explanationLanguage === "en" || entry.explanationLanguage === "fr" || (!entry.explanationLanguage && (entry.language === "en" || entry.language === "fr")) ? "ltr" : "rtl"}>{entry.explanation || entry.note}</p>
                  <small>
                    {entry.trials?.length
                      ? c.trialSummary(entry.trials.length)
                      : c.previousRecord}
                  </small>
                  <Link className="text-link" to={`/parent?lang=${language}`}>
                    {c.reviewNotebook}
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="proof-empty">
              <TriangleAlert size={22} />
              <p>
                {c.emptyEvidence}
              </p>
            </div>
          )}
        </section>
        <p className="local-note">
          {c.localNote}
        </p>
      </main>
    </Shell>
  );
}

export function ParentDashboardV2() {
  const [params] = useSearchParams();
  const requested = params.get("lang");
  const language: BrandLanguage = requested === "en" || requested === "fr" ? requested : "ar";
  const c = pilotUiCopy[language].parent;
  const RouteArrow = language === "ar" ? ArrowLeft : ArrowRight;
  const profile = getProfile(pilotUiCopy[language].kid.defaultNickname);
  const evidence = getEvidence();
  const navigate = useNavigate();
  const [deleteError, setDeleteError] = useState(false);
  const latest = evidence[0];
  const verified = evidence.filter(
    (entry) => entry.labId && entry.trials?.length,
  );
  const observed = new Set(verified.flatMap((entry) => entry.items));
  const objectiveLanguage: BrandLanguage = latest?.transfer ? latest.language || "ar" : language;

  return (
    <Shell language={language}>
      <main className="wrap pilot-page" lang={language} dir={language === "ar" ? "rtl" : "ltr"}>
        <LanguagePicker language={language} label={pilotUiCopy[language].languageLabel} />
        <header className="parent-v2-head">
          <div>
            <p className="eyebrow">{c.eyebrow}</p>
            <h1>{c.titleLead}<bdi>{profile.child}</bdi>{c.titleTrail}</h1>
            <p>{c.intro}</p>
          </div>
          <div className="parent-actions">
            <Link className="workspace-switch" to={`/support?lang=${language}`}>
              {language === "ar" ? "المساعدة والتواصل" : language === "fr" ? "Aide et contact" : "Help and contact"} <RouteArrow size={17} />
            </Link>
            <Link className="workspace-switch" to={`/curriculum?lang=${language}`}>
              {c.curriculum} <RouteArrow size={17} />
            </Link>
            <Link className="workspace-switch" to={`/kid?lang=${language}`}>
              {c.childSpace}: <bdi>{profile.child}</bdi> <RouteArrow size={17} />
            </Link>
          </div>
        </header>

        <section className="parent-story">
          <div className="story-main">
            <p className="story-label">{c.latest}</p>
            <h2 lang={language} dir={language === "ar" ? "rtl" : "ltr"}>
              {latest
                ? c.fromLab(latest.mission)
                : c.noSummary}
            </h2>
            <p lang={latest?.language || language} dir={latest?.language === "en" || latest?.language === "fr" ? "ltr" : "rtl"}>
              {latest
                ? latest.note
                : c.emptySummary}
            </p>
          </div>
          <div className="next-objective">
            <span>{c.nextObjective}</span>
            <b lang={objectiveLanguage} dir={objectiveLanguage === "ar" ? "rtl" : "ltr"}>
              {latest?.labId
                ? latest.transfer || missionWords[language][latest.labId].transfer
                : c.emptyObjective}
            </b>
            <small>{c.afterTest}</small>
          </div>
        </section>

        <section className="evidence-matrix-section">
          <div className="matrix-copy">
            <p className="eyebrow">{c.evidenceEyebrow}</p>
            <h2>{c.evidenceTitle}</h2>
            <p>{c.evidenceBody}</p>
          </div>
          <div className="evidence-matrix">
            {c.evidence.map(([name, label], index) => {
              const sourceName = evidenceLabels[index][0];
              const seen = observed.has(sourceName);
              const count = verified.filter((entry) =>
                entry.items.includes(sourceName),
              ).length;
              return (
                <div className={seen ? "seen" : ""} key={name}>
                  <span>
                    {seen ? <Check size={17} /> : <CircleDot size={16} />}
                  </span>
                  <b>{name}</b>
                  <p>{label}</p>
                  <small>
                    {seen ? c.recordedCount(count) : c.notRecorded}
                  </small>
                </div>
              );
            })}
          </div>
        </section>

        <section className="parent-lab-history">
          <div className="history-head">
            <div>
              <p className="eyebrow">{c.historyEyebrow}</p>
              <h2>{c.historyTitle}</h2>
            </div>
            <Link to={`/missions?lang=${language}`}>
              {c.browse} <RouteArrow size={17} />
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
                      <span lang={entry.language || language} dir={entry.language === "en" || entry.language === "fr" || (!entry.language && language !== "ar") ? "ltr" : "rtl"}>{entry.mission}</span> ·{" "}
                      {entry.trials?.length
                        ? c.trialCount(entry.trials.length)
                        : c.olderRecord}
                    </summary>
                    <time dateTime={entry.date}>
                      {new Intl.DateTimeFormat(c.dateLocale, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }).format(new Date(entry.date))}
                    </time>
                    {entry.labId && entry.trials?.length ? (
                      <>
                        <p className="legacy-note">{c.constraintLabel}</p>
                        <blockquote className="child-quote" lang={entry.observationLanguage || entry.language || "ar"} dir={entry.observationLanguage === "en" || entry.observationLanguage === "fr" || (!entry.observationLanguage && (entry.language === "en" || entry.language === "fr")) ? "ltr" : "rtl"}>
                          {entry.observation}
                        </blockquote>
                        <TrialNotebook id={entry.labId} trials={entry.trials} />
                        <p className="legacy-note">{c.explanationLabel}</p>
                        <blockquote className="child-quote" lang={entry.explanationLanguage || entry.language || "ar"} dir={entry.explanationLanguage === "en" || entry.explanationLanguage === "fr" || (!entry.explanationLanguage && (entry.language === "en" || entry.language === "fr")) ? "ltr" : "rtl"}>
                          {entry.explanation}
                        </blockquote>
                      </>
                    ) : (
                      <>
                      <p className="legacy-note" lang={entry.language || "ar"} dir={entry.language === "en" || entry.language === "fr" ? "ltr" : "rtl"}>{entry.note}</p>
                      <p className="legacy-note">{c.olderRecordDetail}</p>
                      </>
                    )}
                  </details>
                </article>
              ))}
            </div>
          ) : (
            <div className="parent-empty">
              <MapPinned size={24} />
              <div>
                <b>{c.emptyTitle}</b>
                <p>{c.emptyBody}</p>
              </div>
            </div>
          )}
        </section>
        <p className="local-note">
          {c.localNote}
        </p>
        <section className="family-controls" aria-labelledby="family-data-title">
          <div>
            <p className="eyebrow">{c.familyEyebrow}</p>
            <h2 id="family-data-title">{c.familyTitle}</h2>
            <p>{c.familyBody}</p>
          </div>
          <button
            className="button button-ghost family-delete"
            onClick={() => {
              const confirmed = window.confirm(
                c.deleteConfirm,
              );
              if (!confirmed) return;
              if (clearFamilyData()) navigate(`/?lang=${language}`);
              else setDeleteError(true);
            }}
          >
            {c.deleteButton}
          </button>
          {deleteError && (
            <p className="storage-alert" role="alert">
              {c.deleteError}
            </p>
          )}
        </section>
      </main>
    </Shell>
  );
}
