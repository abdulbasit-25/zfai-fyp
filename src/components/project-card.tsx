import { Link } from "@tanstack/react-router";
import { Clock, Users, Check } from "lucide-react";
import { DOMAIN_COLOR, type Project } from "@/data/projects";
import { toggleCompare, useStore } from "@/lib/workspace";

export function DomainTag({ domain }: { domain: Project["domain"] }) {
  return (
    <span
      className="label-mono inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5"
      style={{
        color: DOMAIN_COLOR[domain],
        borderColor: `color-mix(in oklab, ${DOMAIN_COLOR[domain]} 45%, transparent)`,
        backgroundColor: `color-mix(in oklab, ${DOMAIN_COLOR[domain]} 12%, transparent)`,
      }}
    >
      {domain}
    </span>
  );
}

export function DifficultyBadge({ difficulty }: { difficulty: Project["difficulty"] }) {
  const bars = difficulty === "Intermediate" ? 1 : difficulty === "Advanced" ? 2 : 3;
  return (
    <span className="label-mono inline-flex items-center gap-1.5 text-muted-foreground">
      <span className="flex items-end gap-0.5">
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className={`w-1 rounded-sm ${i <= bars ? "bg-primary" : "bg-border"}`}
            style={{ height: `${3 + i * 3}px` }}
          />
        ))}
      </span>
      {difficulty}
    </span>
  );
}

function CompareToggle({ id }: { id: string }) {
  const selected = useStore((s) => s.compare.includes(id));
  const full = useStore((s) => s.compare.length >= 3);
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleCompare(id);
      }}
      disabled={!selected && full}
      className={`label-mono inline-flex items-center gap-1.5 rounded-md border px-2 py-1 transition-colors disabled:opacity-40 ${
        selected
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
      }`}
    >
      <span
        className={`flex size-3 items-center justify-center rounded-[3px] border ${
          selected ? "border-primary-foreground" : "border-current"
        }`}
      >
        {selected && <Check className="size-2.5" />}
      </span>
      Compare
    </button>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to="/projects/$projectId"
      params={{ projectId: project.id }}
      className="card-lift group flex flex-col rounded-xl border border-border bg-card p-5"
      style={{ borderTop: `2px solid ${DOMAIN_COLOR[project.domain]}` }}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <DomainTag domain={project.domain} />
        <DifficultyBadge difficulty={project.difficulty} />
      </div>
      <h3 className="font-display text-xl leading-snug font-semibold group-hover:text-primary">
        {project.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{project.hook}</p>
      <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-3">
        <div className="label-mono flex items-center gap-3 text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" /> {project.timelineLabel}
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="size-3.5" /> {project.teamCount}
          </span>
        </div>
        <CompareToggle id={project.id} />
      </div>
    </Link>
  );
}

export function FeaturedCard({ project }: { project: Project }) {
  return (
    <div
      className="card-lift relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8"
      style={{ borderTop: `3px solid ${DOMAIN_COLOR[project.domain]}` }}
    >
      <div className="grid-paper pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="label-mono rounded-full bg-primary px-2.5 py-1 text-primary-foreground">
            Featured
          </span>
          <DomainTag domain={project.domain} />
          <DifficultyBadge difficulty={project.difficulty} />
        </div>
        <Link to="/projects/$projectId" params={{ projectId: project.id }}>
          <h2 className="font-display text-3xl font-semibold sm:text-5xl">{project.title}</h2>
        </Link>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {project.hook}
        </p>
        <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            ["Timeline", project.timelineLabel],
            ["Team size", project.teamSize],
            ["Phases", `${project.roadmap.length} phases`],
            ["Core features", `${project.features.length} features`],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="label-mono text-muted-foreground">{k}</dt>
              <dd className="mt-1 text-sm font-medium">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            to="/projects/$projectId"
            params={{ projectId: project.id }}
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            View full spec
          </Link>
          <CompareToggle id={project.id} />
        </div>
      </div>
    </div>
  );
}
