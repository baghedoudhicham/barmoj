import { useId } from "react";
import type { BrandLanguage } from "./brand";
import { waterWorkbenchView } from "./lab-model";
import type { Settings, Trial } from "./lab-model";
import "./water-workbench.css";

const translations = {
  ar: {
    title: "ورشة الخزان", discrete: "لقطات لحالات محددة، وليست محاكاة تدفق مستمر",
    scene: "خزان ماء ومضخة وحساس وقاعدة حماية على لوحة مجسمة",
    actual: "المستوى الحقيقي", sensor: "قراءة الحساس", pump: "المضخة",
    running: "تعمل", stopped: "متوقفة", untested: "لم تُختبر",
    good: "شرط الأمان تحقق", risk: "حالة غير آمنة: راجع القاعدة",
    choose: "اختر حالة الماء", normal: "عادي · 45%", limit: "الحد · 80%", failure: "عطل · 96%",
    parts: "قطع النظام", rule: "أوقف عند 80%", backup: "الحساس الاحتياطي",
    on: "مفعّل", off: "غير مفعّل", tank: "الخزان", sensorPart: "الحساس",
    limitLine: "الحد 80%", before: "اختر الإعدادات، ثم توقّع وشغّل الاختبار",
    hint: "كل قطعة تغيّر متغيرًا واحدًا. زر تشغيل الاختبار في خطوة التوقّع.",
    locked: "عد إلى خطوة التصميم لتعديل القطع.", static: "الوصف النصّي الثابت",
    staticIntro: "مستوى الماء هنا لقطة لإحدى الحالات الثلاث المحددة في النموذج، وليس حسابًا لحركة الماء مع الزمن.",
    difference: "قد تختلف القراءة عن المستوى الحقيقي عندما يتعطل الحساس.",
  },
  en: {
    title: "Tank workbench", discrete: "Discrete scenario snapshots, not a continuous-flow simulation",
    scene: "Isometric tank, pump, sensor and backup safeguard",
    actual: "Actual level", sensor: "Sensor reading", pump: "Pump",
    running: "Running", stopped: "Stopped", untested: "Not tested",
    good: "Safety rule met", risk: "Unsafe: review your rule",
    choose: "Choose a water condition", normal: "Normal · 45%", limit: "Limit · 80%", failure: "Fault · 96%",
    parts: "System parts", rule: "Stop at 80%", backup: "Backup sensor",
    on: "Enabled", off: "Disabled", tank: "Tank", sensorPart: "Sensor",
    limitLine: "80% limit", before: "Set up the system, predict, then run the test",
    hint: "Each part changes one variable. Run the test in the prediction step.",
    locked: "Return to the design step to adjust the parts.", static: "Static text representation",
    staticIntro: "The water level is a snapshot from one of three fixed model cases, not a calculation of water movement over time.",
    difference: "The sensor reading can differ from the actual level when the sensor fails.",
  },
  fr: {
    title: "Atelier du réservoir", discrete: "Trois situations fixes, pas de simulation de débit continu",
    scene: "Réservoir isométrique, pompe, capteur et protection de secours",
    actual: "Niveau réel", sensor: "Mesure du capteur", pump: "Pompe",
    running: "En marche", stopped: "Arrêtée", untested: "Non testée",
    good: "Règle de sécurité respectée", risk: "Danger : revois la règle",
    choose: "Choisis la situation", normal: "Normal · 45 %", limit: "Seuil · 80 %", failure: "Panne · 96 %",
    parts: "Pièces du système", rule: "Arrêt à 80 %", backup: "Capteur de secours",
    on: "Activé", off: "Désactivé", tank: "Réservoir", sensorPart: "Capteur",
    limitLine: "Seuil 80 %", before: "Prépare, prédis, puis lance le test",
    hint: "Chaque pièce change un seul paramètre. Lance le test après ta prédiction.",
    locked: "Retourne à la conception pour changer les pièces.", static: "Description statique",
    staticIntro: "Le niveau affiché est une image d'un des trois cas fixes, pas un calcul de l'évolution du niveau dans le temps.",
    difference: "La mesure peut différer du niveau réel quand le capteur tombe en panne.",
  },
} as const;

export function WaterWorkbench({
  settings,
  trial,
  language,
  editable,
  onConfigure,
}: {
  settings: Settings;
  trial?: Trial;
  language: BrandLanguage;
  editable: boolean;
  onConfigure: (patch: Partial<Settings>) => void;
}) {
  const copy = translations[language];
  const view = waterWorkbenchView(settings, trial);
  const clipId = useId().replace(/:/g, "");
  const levelY = 338 - view.actual * 1.78;
  const readingY = 338 - view.sensor * 1.78;
  const flowing = view.tested && view.pump === "running";
  const status = !view.tested ? copy.untested : view.pump === "running" ? copy.running : copy.stopped;
  const cases: { key: Settings["scenario"]; label: string }[] = [
    { key: "normal", label: copy.normal },
    { key: "limit", label: copy.limit },
    { key: "failure", label: copy.failure },
  ];

  return (
    <section className="wb-root" lang={language} dir={language === "ar" ? "rtl" : "ltr"}>
      <header className="wb-header">
        <strong>{copy.title}</strong>
        <span>{copy.discrete}</span>
      </header>
      <figure className="wb-scene">
        <svg viewBox="0 0 720 430" role="img" aria-label={copy.scene} focusable="false">
          <title>{copy.scene}</title>
          <defs>
            <clipPath id={clipId}>
              <path d="M252 125 C252 98 454 98 454 125 V338 C454 370 252 370 252 338Z" />
            </clipPath>
          </defs>
          <path d="M48 322 345 184 669 327 383 422Z" fill="#D9DDD1" stroke="#151515" strokeWidth="3" />
          <path d="M48 322 383 422 383 429 48 332Z" fill="#ACB8A7" stroke="#151515" strokeWidth="2" />
          <path d="M383 422 669 327 669 339 383 429Z" fill="#A1AD9B" stroke="#151515" strokeWidth="2" />
          <path d="M96 320 348 204 630 330 383 402Z" fill="#F7F7F2" stroke="#ABB7A9" strokeWidth="2" strokeDasharray="8 8" />
          <path d="M454 278 539 317 592 291 639 308" fill="none" stroke="#151515" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M454 278 539 317 592 291 639 308" fill="none" stroke="#7EC9E4" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
          {flowing && <path className="wb-flow" d="M454 278 539 317 592 291 639 308" stroke="#FFFFFF" fill="none" strokeWidth="4" strokeDasharray="8 13" strokeLinecap="round" />}
          <path d="M541 274 566 261 610 282 583 297Z" fill="#FFC107" stroke="#151515" strokeWidth="3" />
          <path d="M541 274 541 319 583 340 583 297Z" fill="#E4AC16" stroke="#151515" strokeWidth="3" />
          <path d="M583 297 610 282 610 323 583 340Z" fill="#BE900C" stroke="#151515" strokeWidth="3" />
          <circle cx="577" cy="299" r="13" fill={flowing ? "#39DD59" : view.tested ? "#FF164D" : "#FFFFFF"} stroke="#151515" strokeWidth="3" />
          <path d="m574 291 11 8-11 7Z" fill="#151515" />
          <path d="M252 125 C252 98 454 98 454 125 V338 C454 370 252 370 252 338Z" fill="#EAF1EC" stroke="#151515" strokeWidth="4" />
          <g clipPath={"url(#" + clipId + ")"}>
            <rect className="wb-water-fill" x="252" y={levelY} width="202" height={365 - levelY} fill="#83CFE9" />
            <ellipse cx="353" cy={levelY} rx="101" ry="29" fill="#BAE9F5" />
            <path d="M281 140 V347" stroke="#FFFFFF" strokeOpacity=".45" strokeWidth="12" />
          </g>
          <path d="M253 125 C253 97 454 97 454 125" fill="none" stroke="#151515" strokeWidth="4" />
          <path d="M252 339 C252 369 454 369 454 339" fill="none" stroke="#151515" strokeWidth="3" />
          <path d="M254 196 H452" stroke="#FF164D" strokeWidth="3" strokeDasharray="10 7" />
          <path d={"M455 " + readingY + " L500 " + (readingY - 19)} stroke="#151515" strokeWidth="2" fill="none" strokeDasharray="5 4" />
          <path d={"M499 " + (readingY - 32) + " l14 7 -14 7 -14 -7Z"} fill={settings.scenario === "failure" ? "#FF164D" : "#FFC107"} stroke="#151515" strokeWidth="3" />
          <path d="M500 90V53H585" stroke="#173E2B" strokeWidth="3" fill="none" />
          <rect x="479" y="75" width="43" height="43" rx="8" fill={settings.safeguard ? "#39DD59" : "#E1E9E0"} stroke="#151515" strokeWidth="3" />
          {settings.safeguard ? <path d="m489 96 9 8 15-19" fill="none" stroke="#151515" strokeWidth="3" /> : <path d="M488 96H513" stroke="#151515" strokeWidth="3" />}
          <path d="M353 82V43H212" stroke="#173E2B" strokeWidth="3" fill="none" />
          <circle cx="353" cy="124" r="10" fill="#F7F7F2" stroke="#151515" strokeWidth="3" />
          <text x="208" y="35" fontSize="16" fontWeight="800" textAnchor="end" fill="#173E2B">{copy.tank}</text>
          <text x="585" y="46" fontSize="15" fontWeight="800" fill="#173E2B">{copy.sensorPart}</text>
          <text x="574" y="365" fontSize="15" fontWeight="800" fill="#151515">{copy.pump}</text>
          <text x="188" y="201" fontSize="14" fontWeight="800" fill="#C02045">{copy.limitLine}</text>
          <path d="M193 195H248" stroke="#FF164D" strokeWidth="2" strokeDasharray="5 4" />
        </svg>
        <figcaption>{copy.discrete}</figcaption>
      </figure>
      <div className="wb-readings" aria-live={view.tested ? "polite" : "off"}>
        <div><span>{copy.actual}</span><strong>{view.actual}%</strong></div>
        <div className={settings.scenario === "failure" ? "wb-fault" : ""}>
          <span>{copy.sensor}</span><strong>{view.sensor}%</strong>
        </div>
        <div className={view.tested && !view.safe ? "wb-fault" : ""}>
          <span>{copy.pump}</span><strong>{status}</strong>
        </div>
      </div>
      {view.tested ? (
        <p className={view.safe ? "wb-feedback wb-safe" : "wb-feedback wb-risk"} role="status">
          {view.safe ? copy.good : copy.risk}
        </p>
      ) : <p className="wb-feedback wb-pending">{copy.before}</p>}

      <div className="wb-controls">
        <fieldset className="wb-scenarios">
          <legend>{copy.choose}</legend>
          <div className="wb-scenario-buttons">
            {cases.map(item => (
              <button type="button" key={item.key} aria-pressed={settings.scenario === item.key}
                disabled={!editable} onClick={() => onConfigure({ scenario: item.key })}>{item.label}</button>
            ))}
          </div>
        </fieldset>
        <p className="wb-controls-label">{copy.parts}</p>
        <div className="wb-module-buttons">
          <button type="button" aria-pressed={settings.stopAtLimit} disabled={!editable}
            onClick={() => onConfigure({ stopAtLimit: !settings.stopAtLimit })}>
            <span className="wb-icon" aria-hidden="true">80</span>
            <span><strong>{copy.rule}</strong><small>{settings.stopAtLimit ? copy.on : copy.off}</small></span>
          </button>
          <button type="button" aria-pressed={settings.safeguard} disabled={!editable}
            onClick={() => onConfigure({ safeguard: !settings.safeguard })}>
            <span className="wb-icon wb-backup" aria-hidden="true">◉</span>
            <span><strong>{copy.backup}</strong><small>{settings.safeguard ? copy.on : copy.off}</small></span>
          </button>
        </div>
        <p className="wb-hint">{editable ? copy.hint : copy.locked}</p>
      </div>
      <details className="wb-static">
        <summary>{copy.static}</summary>
        <p>{copy.staticIntro} {copy.difference}</p>
        <p>{copy.actual}: {view.actual}%. {copy.sensor}: {view.sensor}%.</p>
        <p>{copy.rule}: {settings.stopAtLimit ? copy.on : copy.off}. {copy.backup}: {settings.safeguard ? copy.on : copy.off}.</p>
        <p>{copy.pump}: {status}.</p>
      </details>
    </section>
  );
}
