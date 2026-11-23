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

    if (size === 390) {
      const transition = await page.locator(".wb-water-fill").evaluate(el => getComputedStyle(el).transitionDuration);
      assert.equal(transition, "0s", "reduced motion must remove fill tween");
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
    assert.equal(await page.locator(".wb-root").count(), 0);
    assert.equal(await page.locator(".water-model").count(), 1);
    assert.equal(await page.locator(".current-outcome").count(), 1);
    assert.equal(errors.length, 0, "browser errors: " + errors.join("; "));
    await page.screenshot({ path: "artifacts/water-workbench/classic-" + size + ".png", fullPage: true });
    await context.close();
    console.log("PASS BRKAR water scene " + size + "px: RTL, keyboard, trial, persistence, locales, classic fallback");
  }
} finally {
  await browser.close();
}
