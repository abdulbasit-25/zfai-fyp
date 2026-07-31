import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Circle, Download, FileText, Plus, RotateCcw, Trash2 } from "lucide-react";
import { DOMAIN_COLOR, PROJECTS, getProject } from "@/data/projects";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import {
  addNote,
  addTodo,
  buildReport,
  clearDoneTodos,
  deleteNote,
  downloadText,
  getTodos,
  removeTodo,
  resetProject,
  startProject,
  todoProgress,
  toggleTodo,
  useStore,
} from "@/lib/workspace";

export const Route = createFileRoute("/workspace")({
  head: () => ({
    meta: [
      { title: "My Workspace — Track Your AI FYP Progress | AI FYP Catalog 2026" },
      {
        name: "description",
        content:
          "A to-do list, progress tracker and timestamped notes log for the final-year AI project you picked. Everything saved in your browser — no signup required.",
      },
      { name: "keywords", content: "FYP workspace, project tracker, AI project management, kanban board, todo list, progress tracker" },
      
      // OpenGraph
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://zfai-fyp.vercel.app/workspace" },
      { property: "og:title", content: "My Workspace — Track Your AI FYP Progress" },
      {
        property: "og:description",
        content: "Track tasks, progress and decisions for your final-year AI project.",
      },
      { property: "og:image", content: "https://zfai-fyp.vercel.app/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:site_name", content: "AI FYP Catalog 2026" },
      
      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "My Workspace — Track Your AI FYP Progress" },
      {
        name: "twitter:description",
        content: "Track tasks, progress and decisions for your final-year AI project.",
      },
      { name: "twitter:image", content: "https://zfai-fyp.vercel.app/og-image.jpg" },
      
      // Additional SEO
      { name: "robots", content: "index, follow" },
    ],
  }),
  component: Workspace,
});

function Workspace() {
  const activeId = useStore((s) => s.active);
  const ws = useStore((s) => (s.active ? s.byProject[s.active] : undefined));
  const started = useStore((s) => Object.keys(s.byProject));
  const [noteText, setNoteText] = useState("");
  const [taskText, setTaskText] = useState("");
  const [filter, setFilter] = useState<"all" | "open" | "done">("all");

  const project = activeId ? getProject(activeId) : undefined;

  if (!project || !ws) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <main className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <h1 className="text-3xl font-semibold sm:text-4xl">No project in your workspace yet</h1>
          <p className="mt-3 text-muted-foreground">
            Open any project spec and hit “Start working on this” — the roadmap seeds a to-do list, a
            progress tracker and a notes log, all saved in this browser.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {PROJECTS.slice(0, 4).map((p) => (
              <button
                key={p.id}
                onClick={() => startProject(p.id)}
                className="rounded-lg border border-border bg-card p-4 text-left transition-colors hover:bg-secondary"
              >
                <p className="label-mono" style={{ color: DOMAIN_COLOR[p.domain] }}>
                  {p.domain}
                </p>
                <p className="mt-1 font-medium">{p.title}</p>
              </button>
            ))}
          </div>
          <Link to="/" className="mt-8 inline-block text-sm text-primary underline underline-offset-4">
            Browse the full catalog
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const accent = DOMAIN_COLOR[project.domain];
  const { pct, done, total } = todoProgress(ws);
  const todos = getTodos(ws);
  const visible = todos.filter((t) => (filter === "all" ? true : filter === "done" ? t.done : !t.done));

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div style={{ borderLeft: `3px solid ${accent}`, paddingLeft: "1rem" }}>
            <p className="label-mono text-muted-foreground">Active project</p>
            <h1 className="text-3xl font-semibold sm:text-4xl">{project.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {project.timelineLabel} · {project.teamSize} · {project.difficulty}
            </p>
          </div>
          <div className="no-print flex flex-wrap gap-2">
            <button
              onClick={() => downloadText(`${project.id}-status-report.md`, buildReport(project, ws))}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
            >
              <Download className="size-4" /> Export Markdown
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm hover:bg-secondary"
            >
              <FileText className="size-4" /> Print / PDF
            </button>
            <button
              onClick={() => resetProject(project.id)}
              className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm hover:bg-secondary"
            >
              <RotateCcw className="size-4" /> Reset
            </button>
          </div>
        </div>

        {started.length > 1 && (
          <div className="no-print mt-4 flex flex-wrap items-center gap-2">
            <span className="label-mono text-muted-foreground">Switch:</span>
            {started.map((id) => {
              const pr = getProject(id);
              if (!pr) return null;
              return (
                <button
                  key={id}
                  onClick={() => startProject(id)}
                  className={`label-mono rounded-full border px-2.5 py-1 ${
                    id === project.id ? "border-primary text-primary" : "border-border text-muted-foreground"
                  }`}
                >
                  {pr.title}
                </button>
              );
            })}
          </div>
        )}

        {/* Progress */}
        <section className="mt-6 rounded-xl border border-border bg-card p-5">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="label-mono text-muted-foreground">Progress</p>
              <p className="font-display text-3xl font-semibold">{pct}%</p>
            </div>
            <p className="font-mono text-sm text-muted-foreground">
              {done} done · {total - done} left · {total} tasks
            </p>
          </div>
          <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, backgroundColor: accent }}
            />
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* To-do list */}
          <section className="rounded-xl border border-border bg-card p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h2 className="label-mono text-muted-foreground">To-do list</h2>
              <div className="no-print flex items-center gap-1">
                {(["all", "open", "done"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`label-mono rounded-full border px-2.5 py-1 transition-colors ${
                      filter === f ? "border-primary text-primary" : "border-border text-muted-foreground"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!taskText.trim()) return;
                addTodo(project.id, taskText.trim());
                setTaskText("");
              }}
              className="no-print mb-4 flex gap-2"
            >
              <input
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Add a task…"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="rounded-md bg-primary px-3 text-primary-foreground"
                aria-label="Add task"
              >
                <Plus className="size-4" />
              </button>
            </form>

            <ul className="space-y-1.5">
              {visible.map((t) => (
                <li
                  key={t.id}
                  className="group flex items-start gap-3 rounded-lg border border-transparent px-2 py-2 transition-colors hover:border-border hover:bg-secondary/50"
                >
                  <button
                    onClick={() => toggleTodo(project.id, t.id)}
                    aria-label={t.done ? "Mark as not done" : "Mark as done"}
                    className="mt-0.5 shrink-0"
                  >
                    {t.done ? (
                      <CheckCircle2 className="size-4" style={{ color: accent }} />
                    ) : (
                      <Circle className="size-4 text-muted-foreground" />
                    )}
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm leading-snug ${t.done ? "text-muted-foreground line-through" : ""}`}>
                      {t.text}
                    </p>
                    {t.phase && <p className="label-mono mt-0.5 text-muted-foreground">{t.phase}</p>}
                  </div>
                  <button
                    onClick={() => removeTodo(project.id, t.id)}
                    aria-label="Delete task"
                    className="no-print mt-0.5 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Trash2 className="size-3.5 text-muted-foreground hover:text-destructive" />
                  </button>
                </li>
              ))}
              {!visible.length && (
                <p className="px-2 py-6 text-sm text-muted-foreground">Nothing here yet.</p>
              )}
            </ul>

            {todos.some((t) => t.done) && (
              <button
                onClick={() => clearDoneTodos(project.id)}
                className="no-print mt-4 text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                Clear completed
              </button>
            )}
          </section>

          {/* Notes */}
          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="label-mono mb-4 text-muted-foreground">Notes &amp; decisions</h2>
            <div className="no-print">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={3}
                placeholder="Supervisor feedback, scope cut, decision made…"
                className="w-full resize-y rounded-md border border-border bg-background p-3 text-sm outline-none focus:border-primary"
              />
              <button
                onClick={() => {
                  if (!noteText.trim()) return;
                  addNote(project.id, noteText.trim());
                  setNoteText("");
                }}
                className="mt-2 inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
              >
                <Plus className="size-4" /> Save note
              </button>
            </div>
            <ul className="mt-4 space-y-3">
              {ws.notes.map((n) => (
                <li key={n.id} className="rounded-lg border border-border bg-background p-3">
                  <div className="flex items-center justify-between">
                    <span className="label-mono text-muted-foreground">
                      {new Date(n.ts).toLocaleString()}
                    </span>
                    <button
                      onClick={() => deleteNote(project.id, n.id)}
                      aria-label="Delete note"
                      className="no-print"
                    >
                      <Trash2 className="size-3.5 text-muted-foreground hover:text-destructive" />
                    </button>
                  </div>
                  <p className="mt-2 text-sm whitespace-pre-wrap">{n.text}</p>
                </li>
              ))}
              {!ws.notes.length && <p className="text-sm text-muted-foreground">No notes yet.</p>}
            </ul>
          </section>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Everything on this page is saved to your browser’s local storage — no account needed.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
