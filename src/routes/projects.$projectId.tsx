import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ChevronDown, Printer, Rocket } from "lucide-react";
import { DOMAIN_COLOR, getProject, type Project } from "@/data/projects";
import { DifficultyBadge, DomainTag } from "@/components/project-card";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { startProject } from "@/lib/workspace";

export const Route = createFileRoute("/projects/$projectId")({
  loader: ({ params }) => {
    const project = getProject(params.projectId);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Project not found — AI FYP Catalog 2026" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.project;
    return {
      meta: [
        { title: `${p.title} — AI FYP Catalog 2026` },
        { name: "description", content: p.hook },
        { property: "og:title", content: `${p.title} — AI FYP Catalog 2026` },
        { property: "og:description", content: p.hook },
      ],
    };
  },
  component: ProjectDetail,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border py-8">
      <h2 className="label-mono mb-4 text-muted-foreground">{title}</h2>
      {children}
    </section>
  );
}

function ProjectDetail() {
  const { project } = Route.useLoaderData() as { project: Project };
  const [openChecklist, setOpenChecklist] = useState(false);
  const accent = DOMAIN_COLOR[project.domain];

  const stackGroups: [string, string[]][] = [
    ["Frontend", project.stack.frontend],
    ["Backend", project.stack.backend],
    ["AI / ML", project.stack.aiml],
    ["Infra", project.stack.infra],
  ];

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <Link
          to="/"
          className="no-print label-mono inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" /> Back to catalog
        </Link>

        <header className="mt-6" style={{ borderLeft: `3px solid ${accent}`, paddingLeft: "1rem" }}>
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <DomainTag domain={project.domain} />
            <DifficultyBadge difficulty={project.difficulty} />
            <span className="label-mono text-muted-foreground">{project.timelineLabel}</span>
            <span className="label-mono text-muted-foreground">{project.teamSize}</span>
          </div>
          <h1 className="text-3xl font-semibold sm:text-5xl">{project.title}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{project.hook}</p>
        </header>

        <div className="no-print mt-6 flex flex-wrap gap-3">
          <Link
            to="/workspace"
            onClick={() => startProject(project.id)}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Rocket className="size-4" /> Start working on this
          </Link>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-secondary"
          >
            <Printer className="size-4" /> Print spec
          </button>
        </div>

        <Section title="Description">
          <p className="leading-relaxed">{project.description}</p>
        </Section>

        <Section title="Core features">
          <ul className="space-y-3">
            {project.features.map((f, i) => (
              <li key={f} className="flex gap-3 text-sm leading-relaxed">
                <span className="label-mono mt-0.5 shrink-0" style={{ color: accent }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Tech stack">
          <div className="grid gap-4 sm:grid-cols-2">
            {stackGroups.map(([group, items]) => (
              <div key={group} className="print-plain rounded-lg border border-border bg-card p-4">
                <p className="label-mono mb-3" style={{ color: accent }}>
                  {group}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {items.map((t) => (
                    <li
                      key={t}
                      className="rounded-md border border-border bg-background px-2 py-1 font-mono text-xs"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Implementation roadmap">
          <ol className="relative border-l border-border pl-6">
            {project.roadmap.map((ph, i) => (
              <li key={ph.name} className="relative pb-8 last:pb-0">
                <span
                  className="absolute top-1 -left-[31px] flex size-3 rounded-full ring-4 ring-background"
                  style={{ backgroundColor: accent }}
                />
                <p className="label-mono text-muted-foreground">
                  Phase {i + 1} · {ph.weeks}
                </p>
                <h3 className="mt-1 text-lg font-semibold">{ph.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{ph.description}</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {ph.goals.map((g) => (
                    <li key={g} className="rounded border border-border px-2 py-0.5 font-mono text-xs">
                      {g}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Section>

        <section className="no-print border-t border-border py-8">
          <button
            onClick={() => setOpenChecklist((v) => !v)}
            className="flex w-full items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-left transition-colors hover:bg-secondary"
          >
            <span className="label-mono">Raw roadmap as checklist</span>
            <ChevronDown className={`size-4 transition-transform ${openChecklist ? "rotate-180" : ""}`} />
          </button>
          {openChecklist && (
            <div className="mt-4 space-y-5 rounded-lg border border-border bg-card p-4">
              <p className="text-xs text-muted-foreground">
                Read-only preview. Start the project to get a tickable, saved copy in your workspace.
              </p>
              {project.roadmap.map((ph, i) => (
                <div key={ph.name}>
                  <p className="label-mono mb-2" style={{ color: accent }}>
                    {i + 1}. {ph.name} — {ph.weeks}
                  </p>
                  <ul className="space-y-1.5">
                    {ph.goals.map((g) => (
                      <li key={g} className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                        <span className="size-3.5 rounded-[3px] border border-border" /> {g}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </section>

        <Section title="Data & datasets">
          <p className="leading-relaxed text-muted-foreground">{project.data}</p>
        </Section>

        <Section title="Key challenges">
          <ul className="space-y-2">
            {project.challenges.map((c) => (
              <li key={c} className="rounded-lg border border-border bg-card px-4 py-3 text-sm leading-relaxed">
                {c}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Why it's trending now">
          <p className="text-lg leading-relaxed font-display">{project.trending}</p>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
