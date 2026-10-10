import assert from "node:assert/strict";
import { test } from "node:test";

const projectId = "demo-brkar-rules";
const documentsUrl = `http://127.0.0.1:8080/v1/projects/${projectId}/databases/(default)/documents`;

test("Firestore denies anonymous reads and writes on family and interest-list paths", async () => {
  for (const path of [
    "parents/parent-a",
    "parents/parent-a/children/child-a",
    "parents/parent-a/children/child-a/evidence/evidence-a",
    "pilotInterests/anonymous-probe",
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

  const interestList = await fetch(`${documentsUrl}/pilotInterests`);
  assert.equal(interestList.status, 403, "interest-list collection listing unexpectedly allowed");
});
