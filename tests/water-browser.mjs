// Browser-level acceptance for the opt-in BRKAR water scene.
// Run in an isolated family-browser context; no remote credentials or cloud data.
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const base = process.env.BRKAR_TEST_BASE || "http://127.0.0.1:5173";
await mkdir("artifacts/water-workbench", { recursive: true });
const browser = await chromium.launch({ headless: true });
try {
  for (const size of [1440, 834, 390, 320]) {
    const context = await browser.newContext({
      viewport: { width: size, height: size === 1440 ? 900 : 800 },
      reducedMotion: size === 390 ? "reduce" : "no-preference",
      hasTouch: size <= 834,
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", err => errors.push(err.message));
    await page.goto(base + "/mission/water?lang=ar&workbench=iso", { waitUntil: "networkidle" });
    await page.locator(".wb-root").waitFor({ state: "visible" });
    assert.equal(await page.locator(".wb-preview-switch").getAttribute("aria-pressed"), "true");
    assert.equal(await page.locator("main").getAttribute("dir"), "rtl");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    assert.ok(overflow <= 1, "horizontal overflow at " + size + "px: " + overflow);
    assert.match(await page.locator(".wb-readings").innerText(), /45%/);

    // The scenario controls are deliberately locked until the child states a constraint.
    assert.equal(await page.locator(".wb-scenario-buttons button").first().isDisabled(), true);
    await page.locator(".lab-stage-card .notebook-field textarea").first().fill("أحتاج مستوى الماء الحقيقي وقراءة الحساس قبل تشغيل المضخة.");
    await page.locator(".lab-stage-card .lab-primary-action").click();
    await page.locator(".wb-scenario-buttons button").nth(2).waitFor({ state: "visible" });

    // Keyboard operation changes exactly the scenario and updates both evidence readings.
    const fault = page.locator(".wb-scenario-buttons button").nth(2);
    await fault.focus();
    await fault.press("Enter");
    assert.equal(await fault.getAttribute("aria-pressed"), "true");
    const readings = await page.locator(".wb-readings").innerText();
    assert.match(readings, /96%/);
    assert.match(readings, /60%/);
    assert.equal(await page.locator(".wb-feedback").innerText().then(s=>s.includes("جرّب")), false);
    await page.locator(".wb-static summary").click();
    assert.equal(await page.locator(".wb-static").evaluate(el => el.open), true);

    // A first Run requires a prediction and reason. It must not mark the mission finished.
    const run = page.locator(".prediction-panel .button").last();
    assert.equal(await run.isDisabled(), true);
    await page.locator(".prediction-panel .lab-options button").first().click();
    await page.locator(".prediction-panel textarea").fill("لأن قراءة الحساس أقل من الحد رغم ارتفاع الماء الحقيقي.");
    assert.equal(await run.isDisabled(), false);
    await run.click();
    await page.locator(".current-outcome").waitFor({ state: "visible" });
    assert.match(await page.locator(".wb-readings").innerText(), /96%/);
    assert.equal(await page.locator(".wb-scenario-buttons button").nth(0).isDisabled(), true);
    assert.match(page.url(), /mission\/water/);
    await page.reload({ waitUntil: "networkidle" });
    await page.locator(".current-outcome").waitFor({ state: "visible" });
    assert.match(await page.locator(".current-outcome").innerText(), /المضخة/);

    await page.screenshot({ path: "artifacts/water-workbench/isometric-ar-" + size + ".png", fullPage: true });
    if (size === 390) {
      const transition = await page.locator(".wb-water-fill").evaluate(el => getComputedStyle(el).transitionDuration);
      assert.ok(Number.parseFloat(transition) <= 0.0001, "reduced motion must effectively disable fill tween: " + transition);
    }

    // Language switching must keep preview selection and show localized copy.
    await page.locator('.language-tabs button[lang="fr"]').click();
    assert.match(page.url(), /lang=fr/);
    assert.match(page.url(), /workbench=iso/);
    await page.locator('main[dir="ltr"]').waitFor({ state: "visible" });
    assert.match(await page.locator(".wb-header").innerText(), /réservoir/i);
    await page.locator('.language-tabs button[lang="en"]').click();
    assert.match(page.url(), /lang=en/);
    await page.locator(".wb-header").getByText("Tank workbench").waitFor();
    await page.screenshot({ path: "artifacts/water-workbench/isometric-" + size + ".png", fullPage: true });

    // The original view remains available and preserving the same local trial.
    await page.locator(".wb-preview-switch").click();
    await page.locator(".wb-root").waitFor({ state: "detached" });
    await page.locator(".water-model").waitFor({ state: "visible" });
    assert.equal(await page.locator(".current-outcome").count(), 1);
    assert.equal(errors.length, 0, "browser errors: " + errors.join("; "));
    await page.screenshot({ path: "artifacts/water-workbench/classic-" + size + ".png", fullPage: true });
    await context.close();
    console.log("PASS BRKAR water scene " + size + "px: RTL, keyboard, trial, persistence, locales, classic fallback");
  }

  // One full child journey on a small touch viewport. This cannot be completed
  // by pressing Run once. Every scenario is a real saved deterministic trial.
  const journey = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
  const page = await journey.newPage();
  await page.goto(base + "/mission/water?lang=ar&workbench=iso", { waitUntil: "networkidle" });
  await page.locator(".wb-root").waitFor({ state: "visible" });
  await page.locator(".lab-stage-card .notebook-field textarea").first()
    .fill("لمنع فيضان الخزان أحتاج إلى معرفة المستوى الحقيقي ومتى أوقف المضخة.");
  await page.locator(".lab-stage-card .lab-primary-action").click();
  async function testScenario(index, backup, predictionIndex) {
    await page.locator(".wb-scenario-buttons button").nth(index).click();
    const backupButton = page.locator(".wb-module-buttons button").nth(1);
    if ((await backupButton.getAttribute("aria-pressed")) !== String(backup)) {
      await backupButton.click();
    }
    await page.locator(".prediction-panel .lab-options button").nth(predictionIndex).click();
    await page.locator(".prediction-panel textarea")
      .fill("التوقع مبني على مقارنة مستوى الماء بقراءة الحساس وقاعدة التوقف.");
    await page.locator(".prediction-panel .button").last().click();
    await page.locator(".current-outcome").waitFor({ state: "visible" });
    assert.match(page.url(), /mission\/water/);
  }
  await testScenario(2, false, 0); // Observe unsafe 96% / 60% false-reading case.
  await page.locator(".lab-stage-actions button").first().click();
  await page.locator(".wb-module-buttons button").nth(1).waitFor({ state: "visible" });
  await testScenario(0, true, 0); // Normal with revised safeguard.
  await page.locator(".lab-stage-actions button").first().click();
  await testScenario(1, true, 1); // Exact 80% boundary.
  await page.locator(".lab-stage-actions button").first().click();
  await testScenario(2, true, 1); // Re-test failure after safeguard.
  await page.locator(".lab-stage-actions button").nth(1).click();
  const save = page.locator(".lab-evidence-checks .lab-primary-action");
  await save.waitFor({ state: "visible" });
  assert.equal(await save.isDisabled(), true, "explanation gate must remain locked");
  await page.locator(".lab-explain-stage textarea").first()
    .fill("أظهرت التجربة الأولى أن الحساس أعطى قراءة منخفضة رغم ارتفاع الماء. بعد إضافة الحساس الاحتياطي توقفت المضخة عند اختلاف القراءتين، كما اختبرت الحد 80% والحالة العادية.");
  await save.click();
  await page.waitForURL(/\/result/);
  await page.screenshot({ path: "artifacts/water-workbench/completed-ar-390.png", fullPage: true });
  console.log("PASS BRKAR four-trial water journey: failure → normal → 80% limit → safeguarded fault → explanation → saved result");
  await journey.close();
} finally {
  await browser.close();
}
