import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { addEvidence, clearFamilyData, getEvidence, getProfile, saveProfile } from "../src/data";
import { canComplete, initialSettings, labIds, simulate, type LabId, type Settings, type Trial } from "../src/lab-model";
import { emptyDraft, readDraft, removeDraft, saveDraft, type LabDraft } from "../src/lab-storage";
import { missionWords, sharedCopy } from "../src/lab-copy";
import type { BrandLanguage } from "../src/brand";
import { ParentDashboardV2 } from "../src/pilot";
import { pilotUiCopy } from "../src/pilot-ui-copy";
import { Result } from "../src/mission-lab";
import { voiceCopy } from "../src/learning-voice";

const languages: BrandLanguage[] = ["ar", "en", "fr"];
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;" }[c]!));

function steps(id: LabId): Settings[] {
  const base = initialSettings();
  if (id === "water") return [
    { ...base, scenario: "failure" },
    { ...base, safeguard: true },
    { ...base, scenario: "limit", safeguard: true },
    { ...base, scenario: "failure", safeguard: true },
  ];
  if (id === "routing") return [base, { ...base, blocked: true }, { ...base, blocked: true, order: ["A", "C", "B"] }];
  if (id === "traffic") return [
    { ...base, mode: "both" },
    { ...base, interlock: true },
    { ...base, mode: "both", interlock: true },
  ];
  return [base, { ...base, reward: 3 }];
}

function parentPage(language: BrandLanguage) {
  return renderToStaticMarkup(createElement(MemoryRouter, { initialEntries: [`/parent?lang=${language}`] }, createElement(ParentDashboardV2)));
}

for (const viewer of languages) for (const id of labIds) {
  test(`${id}: saved family work survives resume, parent language changes and local deletion (${viewer})`, () => {
    const records = new Map<string, string>([["another-app-setting", "keep"]]);
    const previous = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
    Object.defineProperty(globalThis, "localStorage", { configurable: true, value: {
      get length() { return records.size; },
      key: (index: number) => [...records.keys()][index] ?? null,
      getItem: (key: string) => records.get(key) ?? null,
      setItem: (key: string, value: string) => { records.set(key, value); },
      removeItem: (key: string) => { records.delete(key); },
    } });
    try {
      // A multilingual family changes the interface without translating the child's own words.
      const written = languages[(languages.indexOf(viewer) + 1) % languages.length];
      const observation = "ملاحظة تجريبية: <b>قراءة ثانية</b> & قياس أول";
      const explanation = "I changed one rule and checked the result again: <script>sample</script>.";
      assert.equal(saveProfile({ child: "Preview <explorer>" }), true);
      assert.deepEqual(getProfile(), { child: "Preview <explorer>" });
      let draft: LabDraft = { ...emptyDraft(), observation, observationLanguage: "ar" };
      const trials: Trial[] = steps(id).map((settings, index) => ({
        id: `preview-${id}-${index}`, at: new Date().toISOString(), settings,
        prediction: missionWords[written][id].outcomes[0], reason: "A & B: this is my original reason.", language: written,
        ...simulate(id, settings),
      }));
      assert.equal(canComplete(id, trials.slice(0, 1), trials[0].settings, observation, explanation), false);
      const question = "كيف أتحقق من فكرتي؟ <b>سؤالي</b>";
      const application = "I could compare two sources before helping someone decide.";
      draft = { ...draft, settings: trials.at(-1)!.settings, trials, explanation, explanationLanguage: "en", question, application, questionLanguage: "ar", applicationLanguage: "en" };
      assert.equal(saveDraft(id, draft), true);
      const resumed = readDraft(id)!;
      assert.deepEqual(resumed, draft);
      assert.equal(canComplete(id, resumed.trials, resumed.settings, resumed.observation, resumed.explanation), true);
      assert.equal(addEvidence({
        labId: id, mission: sharedCopy[written].missionNames[id], language: written,
        items: ["يفهم", "يمثّل", "يتوقّع", "يختبر", "يفسّر"], note: "Preview evidence.",
        observation: resumed.observation, observationLanguage: resumed.observationLanguage,
        explanation: resumed.explanation, explanationLanguage: resumed.explanationLanguage,
        question: resumed.question, application: resumed.application,
        questionLanguage: resumed.questionLanguage, applicationLanguage: resumed.applicationLanguage,
        trials: resumed.trials, transfer: missionWords[written][id].transfer,
      }), true);
      removeDraft(id);
      assert.equal(readDraft(id), null);
      assert.deepEqual(getEvidence()[0].trials, trials);

      const before = records.get("barmoj-evidence");
      const html = parentPage(viewer);
      const dir = viewer === "ar" ? "rtl" : "ltr";
      assert.ok(html.includes(`<article class="trial-entry" lang="${viewer}" dir="${dir}">`), "trial notebook follows the selected parent language");
      assert.ok(html.includes(escapeHtml(sharedCopy[viewer].predicted)), "prediction label is localized");
      assert.ok(html.includes(escapeHtml(pilotUiCopy[viewer].parent.fromLab(missionWords[viewer][id].title))), "latest lab heading follows parent language");
      assert.ok(html.includes(`<blockquote class="child-quote" lang="ar" dir="rtl">${escapeHtml(observation)}</blockquote>`));
      assert.ok(html.includes(`<blockquote class="child-quote" lang="en" dir="ltr">${escapeHtml(explanation)}</blockquote>`));
      assert.ok(html.includes(`<blockquote class="child-quote" lang="ar" dir="auto">${escapeHtml(question)}</blockquote>`));
      assert.ok(html.includes(`<blockquote class="child-quote" lang="en" dir="auto">${escapeHtml(application)}</blockquote>`));
      assert.ok(html.includes(`lang="${written}" dir="${written === "ar" ? "rtl" : "ltr"}">${escapeHtml(trials[0].reason)}</dd>`));
      assert.equal(html.includes("<script>sample</script>"), false);
      assert.equal(records.get("barmoj-evidence"), before, "viewing another language never rewrites saved answers");
      const result = renderToStaticMarkup(createElement(MemoryRouter, { initialEntries: [`/result?lang=${viewer}`] }, createElement(Result)));
      assert.ok(result.includes(`<p class="legacy-note">${escapeHtml(voiceCopy[viewer].question)}</p>`));
      assert.ok(result.includes(escapeHtml(application)));
      assert.equal(result.includes(escapeHtml(voiceCopy[viewer].questionSaved)), false, "child result speaks directly to the child");

      assert.equal(clearFamilyData(), true);
      assert.deepEqual(getEvidence(), []);
      assert.equal(readDraft(id), null);
      assert.equal(records.get("another-app-setting"), "keep");
      assert.equal(records.has("barmoj-profile"), false);
      const empty = parentPage(viewer);
      assert.equal(empty.includes('class="trial-entry"'), false);
      assert.ok(empty.includes(`<p lang="${viewer}" dir="${dir}">${escapeHtml(pilotUiCopy[viewer].parent.emptySummary)}</p>`), "empty state follows the current reading direction");
    } finally {
      if (previous) Object.defineProperty(globalThis, "localStorage", previous);
      else Reflect.deleteProperty(globalThis, "localStorage");
    }
  });
}
