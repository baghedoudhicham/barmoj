import assert from "node:assert/strict";
import { test } from "node:test";

const projectId = "demo-brkar-rules";
const documentsUrl = `http://127.0.0.1:8080/v1/projects/${projectId}/databases/(default)/documents`;

test("Firestore denies reads and writes on representative family data paths", async () => {
  for (const path of [
    "parents/parent-a",
    "parents/parent-a/children/child-a",
    "parents/parent-a/children/child-a/evidence/evidence-a",
  ]) {
    const read = await fetch(`${documentsUrl}/${path}`);
    assert.equal(read.status, 403, `read unexpectedly allowed for ${path}`);

    const write = await fetch(`${documentsUrl}/${path}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields: { probe: { booleanValue: true } } }),
    });
    assert.equal(write.status, 403, `write unexpectedly allowed for ${path}`);
  }

  const list = await fetch(`${documentsUrl}/parents`);
  assert.equal(list.status, 403, "collection listing unexpectedly allowed");
});
