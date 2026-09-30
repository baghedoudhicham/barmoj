export type PilotEvent = {
  id: string;
  name: string;
  at: string;
  path?: string;
  meta?: Record<string, string | number | boolean | string[]>;
};

const EVENTS_KEY = "barmoj-pilot-events-v1";
const SESSION_KEY = "barmoj-pilot-session-v1";
const MAX_EVENTS = 300;

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function makeId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return `${prefix}-${crypto.randomUUID()}`;
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function getPilotSessionId() {
  if (!canUseStorage()) return "server";
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = makeId("session");
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function getPilotEvents(): PilotEvent[] {
  if (!canUseStorage()) return [];
  try {
    const value = localStorage.getItem(EVENTS_KEY);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

export function trackPilotEvent(
  name: string,
  meta?: Record<string, string | number | boolean | string[]>,
  path = typeof window !== "undefined" ? window.location.pathname : undefined,
) {
  if (!canUseStorage()) return;
  const event: PilotEvent = {
    id: makeId("evt"),
    name,
    at: new Date().toISOString(),
    path,
    meta,
  };
  const next = [...getPilotEvents(), event].slice(-MAX_EVENTS);
  localStorage.setItem(EVENTS_KEY, JSON.stringify(next));
}

export function clearPilotEvents() {
  if (!canUseStorage()) return;
  localStorage.removeItem(EVENTS_KEY);
  localStorage.removeItem(SESSION_KEY);
}

export function buildPilotExport(evidence: unknown) {
  const events = getPilotEvents();
  return {
    schema: "barmoj-pilot-v1",
    generatedAt: new Date().toISOString(),
    sessionId: getPilotSessionId(),
    privacy: "No parent or child names are included in this export.",
    evidence,
    events,
  };
}
