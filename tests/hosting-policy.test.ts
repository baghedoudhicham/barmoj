import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

test("local-only preview policy blocks external scripts, frames and answer destinations", () => {
  const config = JSON.parse(readFileSync(new URL("../firebase.json", import.meta.url), "utf8"));
  const headers = config.hosting.headers.filter((entry: { source: string }) => entry.source === "**")
    .flatMap((entry: { headers: { key: string; value: string }[] }) => entry.headers);
  const header = (name: string): string => headers.find((entry: { key: string }) => entry.key === name)?.value || "";
  const directives = new Map(header("Content-Security-Policy").split(";").map(value => {
    const [name, ...sources] = value.trim().split(/\s+/);
    return [name, sources];
  }));
  for (const name of ["script-src", "connect-src", "form-action"]) assert.deepEqual(directives.get(name), ["'self'"]);
  for (const name of ["frame-src", "frame-ancestors", "object-src"]) assert.deepEqual(directives.get(name), ["'none'"]);
  assert.ok(directives.has("upgrade-insecure-requests"));
  assert.equal(header("X-Content-Type-Options"), "nosniff");
  assert.equal(header("Referrer-Policy"), "no-referrer");
  assert.match(header("Strict-Transport-Security"), /max-age=31536000/);
});
