import assert from "node:assert/strict";
import { test } from "node:test";
import {
  clearFamilyData,
  getProfile,
  prepareFamilyStorage,
  saveProfile,
} from "../src/data";

function installStorage(initial: Record<string, string> = {}) {
  const values = new Map(Object.entries(initial));
  const storage = {
    get length() {
      return values.size;
    },
    key(index: number) {
      return [...values.keys()][index] ?? null;
    },
    getItem(key: string) {
      return values.get(key) ?? null;
    },
    setItem(key: string, value: string) {
      values.set(key, String(value));
    },
    removeItem(key: string) {
      values.delete(key);
    },
  };
  const previous = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: storage,
  });
  return {
    storage,
    values,
    restore() {
      if (previous) Object.defineProperty(globalThis, "localStorage", previous);
      else Reflect.deleteProperty(globalThis, "localStorage");
    },
  };
}

test("legacy profiles migrate to a bounded child nickname and drop parent name and exact age", () => {
  const state = installStorage({
    "barmoj-profile": JSON.stringify({
      parent: "Amina",
      child: "سلمى",
      age: "10",
    }),
  });
  try {
    assert.deepEqual(getProfile(), { child: "سلمى" });
    assert.deepEqual(JSON.parse(state.values.get("barmoj-profile")!), {
      child: "سلمى",
    });
  } finally {
    state.restore();
  }
});

test("profiles default to a non-identifying nickname and bound saved nicknames", () => {
  const state = installStorage();
  try {
    assert.deepEqual(getProfile(), { child: "المستكشف" });
    assert.deepEqual(getProfile("Explorer"), { child: "Explorer" });
    assert.equal(saveProfile({ child: "  باحث فضولي  " }), true);
    assert.deepEqual(getProfile(), { child: "باحث فضولي" });
    assert.equal(saveProfile({ child: "أ".repeat(40) }), true);
    assert.equal(Array.from(getProfile().child).length, 24);
  } finally {
    state.restore();
  }
});

test("startup migrates old profile fields and removes obsolete local event logs", () => {
  const state = installStorage({
    "barmoj-profile": JSON.stringify({
      parent: "Amina",
      child: "سلمى",
      age: "10",
    }),
    "barmoj-pilot-events-v1": '[{"name":"page_view"}]',
    "barmoj-pilot-session-v1": "session-123",
  });
  try {
    prepareFamilyStorage();
    assert.deepEqual(JSON.parse(state.values.get("barmoj-profile")!), {
      child: "سلمى",
    });
    assert.equal(state.values.has("barmoj-pilot-events-v1"), false);
    assert.equal(state.values.has("barmoj-pilot-session-v1"), false);
  } finally {
    state.restore();
  }
});

test("family data cleanup removes only Barmoj records from the current browser origin", () => {
  const state = installStorage({
    "barmoj-profile": '{"child":"المستكشف"}',
    "barmoj-evidence": "[]",
    "barmoj-lab-v1-water": "{}",
    "another-app-setting": "keep",
  });
  try {
    assert.equal(clearFamilyData(), true);
    assert.equal(state.values.has("barmoj-profile"), false);
    assert.equal(state.values.has("barmoj-evidence"), false);
    assert.equal(state.values.has("barmoj-lab-v1-water"), false);
    assert.equal(state.values.get("another-app-setting"), "keep");
  } finally {
    state.restore();
  }
});
