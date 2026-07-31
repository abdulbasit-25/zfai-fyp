import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, Shuffle, X, Sparkles } from "lucide-react";
import { DOMAINS, DOMAIN_COLOR, PROJECTS, type Domain } from "@/data/projects";
import { FeaturedCard, ProjectCard } from "@/components/project-card";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { clearCompare, useStore } from "@/lib/workspace";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI FYP Catalog 2026 — 111 Final-Year AI Projects with Stacks & Roadmaps" },
      {
        name: "description",
        content:
          "Browse 111 researched final-year AI project ideas with complete tech stacks, phase-by-phase roadmaps, datasets, and failure modes. Plus a kanban workspace to plan and track your chosen project.",
      },
      { name: "keywords", content: "AI projects, final year project, FYP, machine learning, deep learning, NLP, computer vision, project ideas 2026, student projects, AI catalog" },
      
      // OpenGraph
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://zfai-fyp.vercel.app/" },
      { property: "og:title", content: "AI FYP Catalog 2026 — 111 Final-Year AI Projects" },
      {
        property: "og:description",
        content:
          "Browse 111 AI final-year project specs with stacks, roadmaps and datasets. Pick one and track it in a working kanban board all year.",
      },
      { property: "og:image", content: "https://zfai-fyp.vercel.app/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "AI FYP Catalog 2026 — Browse final-year AI projects" },
      { property: "og:site_name", content: "AI FYP Catalog 2026" },
      
      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AI FYP Catalog 2026 — 111 Final-Year AI Projects" },
      {
        name: "twitter:description",
        content:
          "Browse 111 AI final-year project specs with stacks, roadmaps and datasets. Pick one and track it in a working kanban board.",
      },
      { name: "twitter:image", content: "https://zfai-fyp.vercel.app/og-image.jpg" },
      { name: "twitter:image:alt", content: "AI FYP Catalog 2026" },
      
      // Additional SEO
      { name: "author", content: "ARCHER Research Agent" },
      { name: "robots", content: "index, follow" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  component: Catalog,
});

type SortKey = "featured" | "difficulty" | "timeline";
const DIFF_ORDER = { Intermediate: 1, Advanced: 2, Expert: 3 } as const;

const DEFAULT_FILTERS = {
  difficulty: "all",
  timeline: "all",
  team: "all",
  sort: "featured" as SortKey,
};

function Catalog() {
  const [query, setQuery] = useState("");
  const [domains, setDomains] = useState<Domain[]>([]);
  const [difficulty, setDifficulty] = useState(DEFAULT_FILTERS.difficulty);
  const [timeline, setTimeline] = useState(DEFAULT_FILTERS.timeline);
  const [team, setTeam] = useState(DEFAULT_FILTERS.team);
  const [sort, setSort] = useState<SortKey>(DEFAULT_FILTERS.sort);
  const [spotlight, setSpotlight] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);
  const compare = useStore((s) => s.compare);
  const featured = PROJECTS.find((p) => p.featured)!;

  const activeFilterCount =
    domains.length +
    (difficulty !== "all" ? 1 : 0) +
    (timeline !== "all" ? 1 : 0) +
    (team !== "all" ? 1 : 0) +
    (query.trim() ? 1 : 0);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = PROJECTS.filter((p) => {
      if (domains.length && !domains.includes(p.domain)) return false;
      if (difficulty !== "all" && p.difficulty !== difficulty) return false;
      if (timeline === "short" && p.timelineWeeks > 16) return false;
      if (timeline === "mid" && (p.timelineWeeks <= 16 || p.timelineWeeks > 20)) return false;
      if (timeline === "long" && p.timelineWeeks <= 20) return false;
      if (team === "2" && p.teamCount > 2) return false;
      if (team === "3" && p.teamCount !== 3) return false;
      if (team === "4" && p.teamCount < 4) return false;
      if (!q) return true;
      const hay = [
        p.title,
        p.hook,
        p.domain,
        p.description,
        ...p.keywords,
        ...p.stack.frontend,
        ...p.stack.backend,
        ...p.stack.aiml,
        ...p.stack.infra,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
    list = [...list].sort((a, b) => {
      if (sort === "difficulty") return DIFF_ORDER[a.difficulty] - DIFF_ORDER[b.difficulty];
      if (sort === "timeline") return a.timelineWeeks - b.timelineWeeks;
      return Number(!!b.featured) - Number(!!a.featured);
    });
    return list;
  }, [query, domains, difficulty, timeline, team, sort]);

  // "/" focuses search, like most catalog/docs sites
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== searchRef.current) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // auto-clear the "random pick" ring after a few seconds
  useEffect(() => {
    if (!spotlight) return;
    const t = setTimeout(() => setSpotlight(null), 2500);
    return () => clearTimeout(t);
  }, [spotlight]);

  function resetAllFilters() {
    setQuery("");
    setDomains([]);
    setDifficulty(DEFAULT_FILTERS.difficulty);
    setTimeline(DEFAULT_FILTERS.timeline);
    setTeam(DEFAULT_FILTERS.team);
    setSort(DEFAULT_FILTERS.sort);
  }

  function pickRandom() {
    if (!results.length) return;
    setSpinning(true);
    setTimeout(() => setSpinning(false), 500);
    const pick = results[Math.floor(Math.random() * results.length)];
    setSpotlight(pick.id);
    document.getElementById(`card-${pick.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  const selectClass =
    "rounded-md border border-border bg-card px-2.5 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary hover:border-primary/60";

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="label-mono text-primary">Software Engineering / AI · 2026 intake</p>
            <div className="relative">
              <a
                href="https://abdulbasit-archer.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="label-mono group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border border-primary/40 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent px-3.5 py-1.5 text-primary transition-all duration-300 hover:scale-[1.03] hover:border-primary hover:shadow-[0_0_24px_-4px_var(--color-primary)]"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                aria-describedby="archer-tooltip"
              >
                {/* shimmer sweep on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full ring-1 ring-primary/20 animate-pulse"
                />
                <Sparkles className="relative size-3.5 animate-pulse" />
                <span className="relative font-semibold tracking-wide">Powered by ARCHER</span>
              </a>
              
              {/* Tooltip */}
              <div
                id="archer-tooltip"
                role="tooltip"
                className={`pointer-events-none absolute right-0 top-[calc(100%+8px)] z-20 w-64 origin-top-right rounded-lg border border-border bg-popover px-3 py-2.5 text-xs leading-relaxed text-popover-foreground shadow-lg transition-all duration-150 ${
                  showTooltip ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
                }`}
              >
                <p className="font-medium text-foreground">ARCHER</p>
                <p className="mt-0.5 text-muted-foreground">
                  The research agent that scoped every project in this catalog — stacks, roadmaps,
                  datasets and failure modes. Click to see how it works.
                </p>
                <span
                  aria-hidden
                  className="absolute -top-1 right-5 size-2 rotate-45 border-l border-t border-border bg-popover"
                />
              </div>
            </div>
          </div>

          <h1 className="mt-3 max-w-3xl text-4xl leading-[1.05] font-semibold sm:text-6xl">
            AI final-year projects, specced far enough to actually start.
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            Each entry carries a full stack breakdown, a phase-by-phase roadmap, dataset notes and
            the honest failure modes. Pick one and the catalog turns it into a working board you can
            track all year.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <FeaturedCard project={featured} />

        <div className="mt-10 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by domain">
          {DOMAINS.map((d) => {
            const on = domains.includes(d);
            return (
              <button
                key={d}
                aria-pressed={on}
                onClick={() => setDomains((s) => (on ? s.filter((x) => x !== d) : [...s, d]))}
                className="label-mono rounded-full border px-2.5 py-1 transition-all hover:scale-[1.04]"
                style={{
                  color: on ? "var(--color-background)" : DOMAIN_COLOR[d],
                  backgroundColor: on ? DOMAIN_COLOR[d] : "transparent",
                  borderColor: `color-mix(in oklab, ${DOMAIN_COLOR[d]} 50%, transparent)`,
                }}
              >
                {d}
              </button>
            );
          })}
          {domains.length > 0 && (
            <button
              onClick={() => setDomains([])}
              className="label-mono inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
            >
              <X className="size-3" /> clear domains
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-3 rounded-xl border border-border bg-card p-3 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-2 rounded-md border border-border bg-background px-3 transition-colors focus-within:border-primary">
            <Search className="size-4 text-muted-foreground" />
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search titles, domains, tech stack, keywords… (press /)"
              aria-label="Search projects"
              className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              aria-label="Filter by difficulty"
              className={selectClass}
            >
              <option value="all">All difficulty</option>
              <option>Intermediate</option>
              <option>Advanced</option>
              <option>Expert</option>
            </select>
            <select
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              aria-label="Filter by timeline"
              className={selectClass}
            >
              <option value="all">Any timeline</option>
              <option value="short">≤ 16 weeks</option>
              <option value="mid">17–20 weeks</option>
              <option value="long">21+ weeks</option>
            </select>
            <select
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              aria-label="Filter by team size"
              className={selectClass}
            >
              <option value="all">Any team size</option>
              <option value="2">2 students</option>
              <option value="3">3 students</option>
              <option value="4">4+ students</option>
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              aria-label="Sort projects"
              className={selectClass}
            >
              <option value="featured">Sort: featured</option>
              <option value="difficulty">Sort: difficulty</option>
              <option value="timeline">Sort: timeline</option>
            </select>
            <button
              onClick={pickRandom}
              disabled={!results.length}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Shuffle className={`size-4 transition-transform duration-500 ${spinning ? "rotate-180" : ""}`} />
              Random pick
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p key={results.length} className="label-mono animate-in fade-in text-muted-foreground duration-300" aria-live="polite">
            {results.length} project{results.length === 1 ? "" : "s"}
            {activeFilterCount > 0 && ` · ${activeFilterCount} filter${activeFilterCount === 1 ? "" : "s"} active`}
          </p>
          <div className="flex items-center gap-3">
            {activeFilterCount > 0 && (
              <button
                onClick={resetAllFilters}
                className="label-mono text-muted-foreground hover:text-foreground"
              >
                reset all filters
              </button>
            )}
            {compare.length > 0 && (
              <div className="flex items-center gap-2">
                <Link
                  to="/compare"
                  className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
                >
                  Compare {compare.length} selected
                </Link>
                <button
                  onClick={clearCompare}
                  className="label-mono text-muted-foreground hover:text-foreground"
                >
                  clear
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {results.map((p) => (
            <div
              key={p.id}
              id={`card-${p.id}`}
              className={
                spotlight === p.id
                  ? "animate-pulse rounded-xl ring-2 ring-primary ring-offset-2 ring-offset-background transition-shadow"
                  : ""
              }
            >
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
        {results.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-muted-foreground">Nothing matches those filters. Try clearing a chip or two.</p>
            <button
              onClick={resetAllFilters}
              className="label-mono mt-3 text-primary hover:underline"
            >
              reset all filters
            </button>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}