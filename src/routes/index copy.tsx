// import { createFileRoute, Link } from "@tanstack/react-router";
// import { useMemo, useState } from "react";
// import { Search, Shuffle, X } from "lucide-react";
// import { DOMAINS, DOMAIN_COLOR, PROJECTS, type Domain } from "@/data/projects";
// import { FeaturedCard, ProjectCard } from "@/components/project-card";
// import { SiteFooter, SiteHeader } from "@/components/site-chrome";
// import { clearCompare, useStore } from "@/lib/workspace";

// export const Route = createFileRoute("/")({
//   head: () => ({
//     meta: [
//       { title: "AI FYP Catalog 2026 — Browse & Plan Final-Year AI Projects" },
//       {
//         name: "description",
//         content:
//           "Researched final-year AI project ideas with stacks, roadmaps and datasets — plus a kanban workspace to plan and track the one you pick.",
//       },
//       { property: "og:title", content: "AI FYP Catalog 2026" },
//       {
//         property: "og:description",
//         content:
//           "Browse 11 AI final-year project specs and turn the one you choose into a tracked workspace.",
//       },
//     ],
//   }),
//   component: Catalog,
// });

// type SortKey = "featured" | "difficulty" | "timeline";
// const DIFF_ORDER = { Intermediate: 1, Advanced: 2, Expert: 3 } as const;

// function Catalog() {
//   const [query, setQuery] = useState("");
//   const [domains, setDomains] = useState<Domain[]>([]);
//   const [difficulty, setDifficulty] = useState("all");
//   const [timeline, setTimeline] = useState("all");
//   const [team, setTeam] = useState("all");
//   const [sort, setSort] = useState<SortKey>("featured");
//   const [spotlight, setSpotlight] = useState<string | null>(null);

//   const compare = useStore((s) => s.compare);
//   const featured = PROJECTS.find((p) => p.featured)!;

//   const results = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     let list = PROJECTS.filter((p) => {
//       if (domains.length && !domains.includes(p.domain)) return false;
//       if (difficulty !== "all" && p.difficulty !== difficulty) return false;
//       if (timeline === "short" && p.timelineWeeks > 16) return false;
//       if (timeline === "mid" && (p.timelineWeeks <= 16 || p.timelineWeeks > 20)) return false;
//       if (timeline === "long" && p.timelineWeeks <= 20) return false;
//       if (team === "2" && p.teamCount > 2) return false;
//       if (team === "3" && p.teamCount !== 3) return false;
//       if (team === "4" && p.teamCount < 4) return false;
//       if (!q) return true;
//       const hay = [
//         p.title,
//         p.hook,
//         p.domain,
//         p.description,
//         ...p.keywords,
//         ...p.stack.frontend,
//         ...p.stack.backend,
//         ...p.stack.aiml,
//         ...p.stack.infra,
//       ]
//         .join(" ")
//         .toLowerCase();
//       return hay.includes(q);
//     });
//     list = [...list].sort((a, b) => {
//       if (sort === "difficulty") return DIFF_ORDER[a.difficulty] - DIFF_ORDER[b.difficulty];
//       if (sort === "timeline") return a.timelineWeeks - b.timelineWeeks;
//       return Number(!!b.featured) - Number(!!a.featured);
//     });
//     return list;
//   }, [query, domains, difficulty, timeline, team, sort]);

//   const selectClass =
//     "rounded-md border border-border bg-card px-2.5 py-2 text-sm text-foreground outline-none focus:border-primary";

//   return (
//     <div className="min-h-screen">
//       <SiteHeader />

//       <section className="border-b border-border bg-surface">
//         <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
//           <p className="label-mono text-primary">Software Engineering / AI · 2026 intake</p>
//           <h1 className="mt-3 max-w-3xl text-4xl leading-[1.05] font-semibold sm:text-6xl">
//             AI final-year projects, specced far enough to actually start.
//           </h1>
//           <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
//             Each entry carries a full stack breakdown, a phase-by-phase roadmap, dataset notes and
//             the honest failure modes. Pick one and the catalog turns it into a working board you can
//             track all year.
//           </p>
//         </div>
//       </section>

//       <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
//         <FeaturedCard project={featured} />

//         <div className="mt-10 flex flex-wrap items-center gap-2">
//           {DOMAINS.map((d) => {
//             const on = domains.includes(d);
//             return (
//               <button
//                 key={d}
//                 onClick={() => setDomains((s) => (on ? s.filter((x) => x !== d) : [...s, d]))}
//                 className="label-mono rounded-full border px-2.5 py-1 transition-colors"
//                 style={{
//                   color: on ? "var(--color-background)" : DOMAIN_COLOR[d],
//                   backgroundColor: on ? DOMAIN_COLOR[d] : "transparent",
//                   borderColor: `color-mix(in oklab, ${DOMAIN_COLOR[d]} 50%, transparent)`,
//                 }}
//               >
//                 {d}
//               </button>
//             );
//           })}
//           {domains.length > 0 && (
//             <button
//               onClick={() => setDomains([])}
//               className="label-mono inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
//             >
//               <X className="size-3" /> clear
//             </button>
//           )}
//         </div>

//         <div className="mt-4 flex flex-col gap-3 rounded-xl border border-border bg-card p-3 sm:flex-row sm:items-center">
//           <div className="flex flex-1 items-center gap-2 rounded-md border border-border bg-background px-3">
//             <Search className="size-4 text-muted-foreground" />
//             <input
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Search titles, domains, tech stack, keywords…"
//               className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
//             />
//           </div>
//           <div className="flex flex-wrap gap-2">
//             <select
//               value={difficulty}
//               onChange={(e) => setDifficulty(e.target.value)}
//               className={selectClass}
//             >
//               <option value="all">All difficulty</option>
//               <option>Intermediate</option>
//               <option>Advanced</option>
//               <option>Expert</option>
//             </select>
//             <select
//               value={timeline}
//               onChange={(e) => setTimeline(e.target.value)}
//               className={selectClass}
//             >
//               <option value="all">Any timeline</option>
//               <option value="short">≤ 16 weeks</option>
//               <option value="mid">17–20 weeks</option>
//               <option value="long">21+ weeks</option>
//             </select>
//             <select value={team} onChange={(e) => setTeam(e.target.value)} className={selectClass}>
//               <option value="all">Any team size</option>
//               <option value="2">2 students</option>
//               <option value="3">3 students</option>
//               <option value="4">4+ students</option>
//             </select>
//             <select
//               value={sort}
//               onChange={(e) => setSort(e.target.value as SortKey)}
//               className={selectClass}
//             >
//               <option value="featured">Sort: featured</option>
//               <option value="difficulty">Sort: difficulty</option>
//               <option value="timeline">Sort: timeline</option>
//             </select>
//             <button
//               onClick={() => {
//                 const pick = results[Math.floor(Math.random() * results.length)] ?? PROJECTS[0];
//                 setSpotlight(pick.id);
//                 document
//                   .getElementById(`card-${pick.id}`)
//                   ?.scrollIntoView({ behavior: "smooth", block: "center" });
//               }}
//               className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm transition-colors hover:bg-secondary"
//             >
//               <Shuffle className="size-4" /> Random pick
//             </button>
//           </div>
//         </div>

//         <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
//           <p className="label-mono text-muted-foreground">
//             {results.length} project{results.length === 1 ? "" : "s"}
//           </p>
//           {compare.length > 0 && (
//             <div className="flex items-center gap-2">
//               <Link
//                 to="/compare"
//                 className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
//               >
//                 Compare {compare.length} selected
//               </Link>
//               <button
//                 onClick={clearCompare}
//                 className="label-mono text-muted-foreground hover:text-foreground"
//               >
//                 clear
//               </button>
//             </div>
//           )}
//         </div>

//         <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
//           {results.map((p) => (
//             <div
//               key={p.id}
//               id={`card-${p.id}`}
//               className={
//                 spotlight === p.id
//                   ? "rounded-xl ring-2 ring-primary ring-offset-2 ring-offset-background"
//                   : ""
//               }
//             >
//               <ProjectCard project={p} />
//             </div>
//           ))}
//         </div>
//         {results.length === 0 && (
//           <p className="py-16 text-center text-muted-foreground">
//             Nothing matches those filters. Try clearing a chip or two.
//           </p>
//         )}
//       </main>

//       <SiteFooter />
//     </div>
//   );
// }
