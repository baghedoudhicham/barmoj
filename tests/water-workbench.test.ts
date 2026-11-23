import assert from "node:assert/strict";
import { test } from "node:test";
import {
  initialSettings, simulate, settingsKey, waterReadings, waterWorkbenchView,
} from "../src/lab-model";
import type { Settings, Trial } from "../src/lab-model";

function snapshot(patch: Partial<Settings> = {}): Trial {
  const settings = { ...initialSettings(), ...patch };
  return {
    id: "water-fixture", at: "2026-11-23T12:00:00Z", settings,
    prediction: "المضخة متوقفة", reason: "سبب التوقع مسجل",
    ...simulate("water", settings),
  };
}
test("scene uses the exact three discrete model readings", () => {
  assert.deepEqual(waterReadings("normal"), { actual: 45, sensor: 45 });
  assert.deepEqual(waterReadings("limit"), { actual: 80, sensor: 80 });
  assert.deepEqual(waterReadings("failure"), { actual: 96, sensor: 60 });
});
test("untested scene cannot claim a pump result or safety outcome", () => {
  const view = waterWorkbenchView(initialSettings());
  assert.equal(view.pump, "untested");
  assert.equal(view.tested, false);
  assert.equal(view.safe, undefined);
});
test("scene only plays saved outcomes for exactly matching settings", () => {
  const broken = snapshot({ scenario: "failure", safeguard: false });
  assert.equal(broken.safe, false);
  assert.equal(waterWorkbenchView(broken.settings, broken).pump, "running");
  const edited = { ...broken.settings, safeguard: true };
  assert.notEqual(settingsKey("water", edited), settingsKey("water", broken.settings));
  assert.equal(waterWorkbenchView(edited, broken).pump, "untested");
  const safeguarded = snapshot({ scenario: "failure", safeguard: true });
  assert.equal(waterWorkbenchView(safeguarded.settings, safeguarded).pump, "stopped");
  assert.equal(waterWorkbenchView(safeguarded.settings, safeguarded).safe, true);
});
test("the stop rule handles the exact 80 percent boundary", () => {
  const stopped = snapshot({ scenario: "limit", stopAtLimit: true });
  assert.equal(stopped.safe, true);
  assert.equal(waterWorkbenchView(stopped.settings, stopped).pump, "stopped");
  const running = snapshot({ scenario: "limit", stopAtLimit: false });
  assert.equal(running.safe, false);
  assert.equal(waterWorkbenchView(running.settings, running).pump, "running");
});
