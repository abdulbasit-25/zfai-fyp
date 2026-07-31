import { createFileRoute, Link } from "@tanstack/react-router";
import { DOMAIN_COLOR, PROJECTS, getProject } from "@/data/projects";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { clearCompare, startProject, toggleCompare, useStore } from "@/lib/workspace";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare Projects — AI FYP Catalog 2026" },
      {
        name: "description",
        content:
          "Put two or three final-year AI project ideas side by side: difficulty, timeline, team size, stack overlap and shared challenges.",
      },
      { property: "og:title", content: "Compare Projects — AI FYP Catalog 2026" },
      {
        property: "og:description",
        content: "Side-by-side comparison of AI final-year project ideas to help you commit to one.",
      },
    ],
  }),
  component: Compare,
});

function Compare() {
  const ids = useStore((s) => s.compare);
  const picked = ids.map(getProject).filter(Boolean) as NonNullable<ReturnType<typeof getProject>>[];

  const stackOf = (p: (typeof PROJECTS)[number]) => [
    ...p.stack.frontend,
    ...p.stack.backend,
    ...p.stack.aiml,
    ...p.stack.infra,
  ];

  const overlap =
    picked.length > 1
      ? stackOf(picked[0]).filter((t) => picked.every((p) => stackOf(p).includes(t)))
      : [];

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-semibold sm:text-4xl">Compare</h1>
        <p className="mt-2 text-muted-foreground">
          Select up to three projects in the catalog, then decide here.
        </p>

        {picked.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground">Nothing selected yet.</p>
            <Link to="/" className="mt-4 inline-block text-sm text-primary underline underline-offset-4">
              Pick projects in the catalog
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {picked.map((p) => (
                <button
                  key={p.id}
                  onClick={() => toggleCompare(p.id)}
                  className="label-mono rounded-full border border-border px-2.5 py-1 text-muted-foreground hover:text-foreground"
                >
                  remove {p.title}
                </button>
              ))}
              <button onClick={clearCompare} className="label-mono text-muted-foreground hover:text-foreground">
                clear all
              </button>
            </div>

            <div className="mt-6 overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-3xl border-collapse text-sm">
                <thead>
                  <tr className="bg-surface">
                    <th className="label-mono w-44 p-4 text-left text-muted-foreground">Attribute</th>
                    {picked.map((p) => (
                      <th
                        key={p.id}
                        className="p-4 text-left align-top"
                        style={{ borderTop: `3px solid ${DOMAIN_COLOR[p.domain]}` }}
                      >
                        <Link
                          to="/projects/$projectId"
                          params={{ projectId: p.id }}
                          className="font-display text-lg font-semibold hover:text-primary"
                        >
                          {p.title}
                        </Link>
                        <p className="mt-1 text-xs font-normal text-muted-foreground">{p.hook}</p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <Row label="Domain" cells={picked.map((p) => p.domain)} />
                  <Row label="Difficulty" cells={picked.map((p) => p.difficulty)} />
                  <Row label="Timeline" cells={picked.map((p) => p.timelineLabel)} />
                  <Row label="Team size" cells={picked.map((p) => p.teamSize)} />
                  <Row label="Roadmap length" cells={picked.map((p) => `${p.roadmap.length} phases`)} />
                  <Row
                    label="Total goals"
                    cells={picked.map((p) => `${p.roadmap.reduce((n, ph) => n + ph.goals.length, 0)} goals`)}
                  />
                  <tr className="border-t border-border align-top">
                    <td className="label-mono p-4 text-muted-foreground">Stack</td>
                    {picked.map((p) => (
                      <td key={p.id} className="p-4">
                        <ul className="flex flex-wrap gap-1.5">
                          {stackOf(p).map((t) => (
                            <li
                              key={t}
                              className={`rounded border px-1.5 py-0.5 font-mono text-xs ${
                                overlap.includes(t)
                                  ? "border-primary text-primary"
                                  : "border-border text-muted-foreground"
                              }`}
                            >
                              {t}
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-border align-top">
                    <td className="label-mono p-4 text-muted-foreground">Key challenges</td>
                    {picked.map((p) => (
                      <td key={p.id} className="p-4">
                        <ul className="list-disc space-y-1 pl-4 text-xs text-muted-foreground">
                          {p.challenges.map((c) => (
                            <li key={c}>{c}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-border">
                    <td className="label-mono p-4 text-muted-foreground">Commit</td>
                    {picked.map((p) => (
                      <td key={p.id} className="p-4">
                        <Link
                          to="/workspace"
                          onClick={() => startProject(p.id)}
                          className="inline-flex rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
                        >
                          Start this one
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 rounded-xl border border-border bg-card p-4">
              <p className="label-mono mb-2 text-muted-foreground">Shared stack ({overlap.length})</p>
              <p className="text-sm">
                {overlap.length
                  ? overlap.join(" · ")
                  : "No tools in common — these projects would build very different skill sets."}
              </p>
            </div>
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

function Row({ label, cells }: { label: string; cells: string[] }) {
  return (
    <tr className="border-t border-border">
      <td className="label-mono p-4 text-muted-foreground">{label}</td>
      {cells.map((c, i) => (
        <td key={i} className="p-4">
          {c}
        </td>
      ))}
    </tr>
  );
}
