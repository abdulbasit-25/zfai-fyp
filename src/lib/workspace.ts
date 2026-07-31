import { useRef, useSyncExternalStore } from "react";
import { getProject, type Project } from "@/data/projects";

export type KanbanCard = { id: string; text: string; note?: string };
export type ColumnId = "todo" | "doing" | "blocked" | "done";
export const COLUMNS: { id: ColumnId; title: string }[] = [
  { id: "todo", title: "To Do" },
  { id: "doing", title: "In Progress" },
  { id: "blocked", title: "Blocked" },
  { id: "done", title: "Done" },
];

export type Note = { id: string; ts: number; text: string };
export type RiskStatus = "open" | "mitigated" | "resolved";
export type RiskEntry = { status: RiskStatus; note: string };
export type Todo = { id: string; text: string; done: boolean; phase?: string };

export type ProjectWorkspace = {
  projectId: string;
  startedAt: number;
  kanban: Record<ColumnId, KanbanCard[]>;
  todos: Todo[];
  roadmapChecks: Record<string, boolean>;
  stackChecks: Record<string, boolean>;
  notes: Note[];
  risks: Record<string, RiskEntry>;
};

export type StoreState = {
  active: string | null;
  compare: string[];
  theme: "dark" | "light";
  byProject: Record<string, ProjectWorkspace>;
};

const KEY = "fyp-catalog-2026.v1";

const initial: StoreState = { active: null, compare: [], theme: "dark", byProject: {} };

let state: StoreState = initial;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) state = { ...initial, ...JSON.parse(raw) };
  } catch {
    /* ignore corrupt storage */
  }
}

function persist() {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* quota */
  }
}

function set(updater: (s: StoreState) => StoreState) {
  state = updater(state);
  persist();
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  load();
  listeners.add(cb);
  return () => listeners.delete(cb);
}

/**
 * FIX: useSyncExternalStore requires getSnapshot() to return a *stable
 * reference* until the underlying store actually changes. Selectors like
 * `s => s.byProject[id]?.todos ?? []` or `s => ({ active, theme })` build a
 * brand-new object/array on every call, which makes React think the store
 * changed on every render -> infinite render loop.
 *
 * We fix this generically (without touching every call site) by caching the
 * selector's result per-hook-instance, keyed off the *global state
 * reference*. Since `state` is only ever replaced (immutably) inside set(),
 * its reference stays identical across renders until a real update happens.
 * So: same `state` reference -> return the cached value; different `state`
 * reference -> recompute and re-cache.
 */
export function useStore<T>(selector: (s: StoreState) => T): T {
  const cache = useRef<{ state: StoreState; value: T } | null>(null);

  const getSnapshot = () => {
    load();
    if (cache.current !== null && cache.current.state === state) {
      return cache.current.value;
    }
    const value = selector(state);
    cache.current = { state, value };
    return value;
  };

  const getServerSnapshot = () => selector(initial);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export const uid = () => Math.random().toString(36).slice(2, 10);

export function goalKey(phaseIndex: number, goalIndex: number) {
  return `${phaseIndex}:${goalIndex}`;
}

export function seedWorkspace(project: Project): ProjectWorkspace {
  return {
    projectId: project.id,
    startedAt: Date.now(),
    kanban: {
      todo: project.roadmap.map((ph) => ({ id: uid(), text: `${ph.name} (${ph.weeks})` })),
      doing: [],
      blocked: [],
      done: [],
    },
    todos: project.roadmap.flatMap((ph) =>
      ph.goals.map((g) => ({ id: uid(), text: g, done: false, phase: ph.name })),
    ),
    roadmapChecks: {},
    stackChecks: {},
    notes: [],
    risks: Object.fromEntries(
      project.challenges.map((c) => [c, { status: "open" as RiskStatus, note: "" }]),
    ),
  };
}

export function getTodos(ws: ProjectWorkspace): Todo[] {
  return ws.todos ?? [];
}

export function addTodo(id: string, text: string) {
  updateWs(id, (ws) => ({ ...ws, todos: [...getTodos(ws), { id: uid(), text, done: false }] }));
}

export function toggleTodo(id: string, todoId: string) {
  updateWs(id, (ws) => ({
    ...ws,
    todos: getTodos(ws).map((t) => (t.id === todoId ? { ...t, done: !t.done } : t)),
  }));
}

export function removeTodo(id: string, todoId: string) {
  updateWs(id, (ws) => ({ ...ws, todos: getTodos(ws).filter((t) => t.id !== todoId) }));
}

export function clearDoneTodos(id: string) {
  updateWs(id, (ws) => ({ ...ws, todos: getTodos(ws).filter((t) => !t.done) }));
}

export function todoProgress(ws: ProjectWorkspace) {
  const todos = getTodos(ws);
  const done = todos.filter((t) => t.done).length;
  return {
    total: todos.length,
    done,
    pct: todos.length ? Math.round((done / todos.length) * 100) : 0,
  };
}

/* ---------- actions ---------- */

export function setTheme(theme: "dark" | "light") {
  set((s) => ({ ...s, theme }));
}

export function toggleCompare(id: string) {
  set((s) => {
    const has = s.compare.includes(id);
    if (has) return { ...s, compare: s.compare.filter((c) => c !== id) };
    if (s.compare.length >= 3) return s;
    return { ...s, compare: [...s.compare, id] };
  });
}

export function clearCompare() {
  set((s) => ({ ...s, compare: [] }));
}

export function startProject(id: string) {
  const project = getProject(id);
  if (!project) return;
  set((s) => ({
    ...s,
    active: id,
    byProject: s.byProject[id] ? s.byProject : { ...s.byProject, [id]: seedWorkspace(project) },
  }));
}

export function resetProject(id: string) {
  const project = getProject(id);
  if (!project) return;
  set((s) => ({ ...s, byProject: { ...s.byProject, [id]: seedWorkspace(project) } }));
}

function updateWs(id: string, fn: (ws: ProjectWorkspace) => ProjectWorkspace) {
  set((s) => {
    const ws = s.byProject[id];
    if (!ws) return s;
    return { ...s, byProject: { ...s.byProject, [id]: fn(ws) } };
  });
}

export function toggleGoal(id: string, key: string) {
  updateWs(id, (ws) => ({
    ...ws,
    roadmapChecks: { ...ws.roadmapChecks, [key]: !ws.roadmapChecks[key] },
  }));
}

export function toggleStackItem(id: string, item: string) {
  updateWs(id, (ws) => ({
    ...ws,
    stackChecks: { ...ws.stackChecks, [item]: !ws.stackChecks[item] },
  }));
}

export function addNote(id: string, text: string) {
  updateWs(id, (ws) => ({ ...ws, notes: [{ id: uid(), ts: Date.now(), text }, ...ws.notes] }));
}

export function deleteNote(id: string, noteId: string) {
  updateWs(id, (ws) => ({ ...ws, notes: ws.notes.filter((n) => n.id !== noteId) }));
}

export function setRisk(id: string, challenge: string, patch: Partial<RiskEntry>) {
  updateWs(id, (ws) => ({
    ...ws,
    risks: {
      ...ws.risks,
      [challenge]: {
        status: patch.status ?? ws.risks[challenge]?.status ?? "open",
        note: patch.note ?? ws.risks[challenge]?.note ?? "",
      },
    },
  }));
}

export function addCard(id: string, column: ColumnId, text: string) {
  updateWs(id, (ws) => ({
    ...ws,
    kanban: { ...ws.kanban, [column]: [...ws.kanban[column], { id: uid(), text }] },
  }));
}

export function removeCard(id: string, column: ColumnId, cardId: string) {
  updateWs(id, (ws) => ({
    ...ws,
    kanban: { ...ws.kanban, [column]: ws.kanban[column].filter((c) => c.id !== cardId) },
  }));
}

export function moveCard(id: string, from: ColumnId, to: ColumnId, cardId: string) {
  if (from === to) return;
  updateWs(id, (ws) => {
    const card = ws.kanban[from].find((c) => c.id === cardId);
    if (!card) return ws;
    return {
      ...ws,
      kanban: {
        ...ws.kanban,
        [from]: ws.kanban[from].filter((c) => c.id !== cardId),
        [to]: [...ws.kanban[to], card],
      },
    };
  });
}

/* ---------- derived ---------- */

export function progressFor(project: Project, ws: ProjectWorkspace) {
  const total = project.roadmap.reduce((n, ph) => n + ph.goals.length, 0);
  const done = project.roadmap.reduce(
    (n, ph, pi) => n + ph.goals.filter((_, gi) => ws.roadmapChecks[goalKey(pi, gi)]).length,
    0,
  );
  return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
}

export function buildReport(project: Project, ws: ProjectWorkspace) {
  const { done, total, pct } = progressFor(project, ws);
  const lines: string[] = [];
  lines.push(`# ${project.title} — Status Report`);
  lines.push("");
  lines.push(`_Generated ${new Date().toLocaleString()} · AI FYP Catalog 2026_`);
  lines.push("");
  lines.push(
    `**Domain:** ${project.domain} · **Difficulty:** ${project.difficulty} · **Timeline:** ${project.timelineLabel} · **Team:** ${project.teamSize}`,
  );
  lines.push("");
  lines.push(`## Progress`);
  lines.push(`${pct}% complete (${done}/${total} roadmap goals checked off).`);
  lines.push("");
  lines.push(`## Roadmap`);
  project.roadmap.forEach((ph, pi) => {
    lines.push(`### ${ph.name} — ${ph.weeks}`);
    ph.goals.forEach((g, gi) => {
      lines.push(`- [${ws.roadmapChecks[goalKey(pi, gi)] ? "x" : " "}] ${g}`);
    });
    lines.push("");
  });
  lines.push(`## To-do list`);
  const todos = getTodos(ws);
  if (!todos.length) lines.push("_No tasks._");
  todos.forEach((t) =>
    lines.push(`- [${t.done ? "x" : " "}] ${t.text}${t.phase ? ` _(${t.phase})_` : ""}`),
  );
  lines.push("");

  lines.push(`## Environment / stack checklist`);
  const allStack = [
    ...project.stack.frontend,
    ...project.stack.backend,
    ...project.stack.aiml,
    ...project.stack.infra,
  ];
  allStack.forEach((t) => lines.push(`- [${ws.stackChecks[t] ? "x" : " "}] ${t}`));
  lines.push("");
  lines.push(`## Risks & challenges`);
  project.challenges.forEach((c) => {
    const r = ws.risks[c] ?? { status: "open", note: "" };
    lines.push(`- **${r.status.toUpperCase()}** — ${c}${r.note ? ` _(${r.note})_` : ""}`);
  });
  lines.push("");
  lines.push(`## Decision log`);
  if (!ws.notes.length) lines.push("_No notes yet._");
  ws.notes.forEach((n) => {
    lines.push(`- **${new Date(n.ts).toLocaleString()}** — ${n.text}`);
  });
  lines.push("");
  return lines.join("\n");
}

export function downloadText(filename: string, text: string, mime = "text/markdown") {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
