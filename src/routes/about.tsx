import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero */}
        <section>
          <span className="label-mono rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-primary">
            About the catalog
          </span>

          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            21 ideas, specced past the point of{" "}
            <span className="text-primary">&ldquo;good luck.&rdquo;</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Most FYP idea lists give you a title and a paragraph. This one gives you a stack
            breakdown, a phase-by-phase roadmap, dataset notes, and the failure modes people
            actually hit — for every project in the catalog, before you write a proposal.
          </p>
        </section>

        {/* Signature: the actual pipeline, as a strip, not icon cards */}
        <section className="mt-10 overflow-x-auto rounded-3xl border border-border bg-card p-6 sm:p-8">
          <div className="grid min-w-[720px] grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-4">
            <PipelinePanel
              eyebrow="01 — the catalog"
              title="A raw idea line"
              body={
                <>
                  <p className="label-mono text-muted-foreground">Insurtech · Advanced</p>
                  <p className="mt-2 font-medium text-foreground">Multimodal Claims Triage</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Photos plus policy text, triaged with fraud flags.
                  </p>
                </>
              }
            />

            <ArrowStep />

            <PipelinePanel
              eyebrow="02 — the spec"
              title="Roadmap, stack, risks"
              body={
                <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                  <li>Phase 1–2 · Ingestion &amp; labeling</li>
                  <li>Phase 3 · Fraud-flag model</li>
                  <li className="text-foreground/80">Frontend / Backend / AI-ML / Infra</li>
                </ul>
              }
            />

            <ArrowStep />

            <PipelinePanel
              eyebrow="03 — the workspace"
              title="A board you track"
              body={
                <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                  <span className="rounded-md border border-border bg-background px-2 py-1 text-muted-foreground">
                    To Do
                  </span>
                  <span className="rounded-md border border-primary/40 bg-primary/10 px-2 py-1 text-primary">
                    In Progress
                  </span>
                  <span className="rounded-md border border-border bg-background px-2 py-1 text-muted-foreground">
                    Done
                  </span>
                </div>
              }
            />
          </div>

          <p className="label-mono mt-6 text-muted-foreground">
            Powered by ARCHER — the research agent that scoped every stack, roadmap, and failure
            mode in this catalog.
          </p>
        </section>

        {/* What / who, as prose, not interchangeable cards */}
        <section className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-border bg-background p-6">
            <h2 className="text-xl font-semibold text-foreground">Why the specs go this deep</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              "Pick an AI project" is the easy part. The part that actually stalls a final year is
              everything after: which model to start with, what the dataset situation really looks
              like, and which corner of the idea quietly won't work. Every entry here carries that
              detail up front, so choosing a project and starting it aren't two separate months.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-background p-6">
            <h2 className="text-xl font-semibold text-foreground">Built by</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">Creator:</span>{" "}
                <a
                  href="https://abdulbasit-archer.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-primary underline underline-offset-4 hover:opacity-80"
                >
                  Abdul Basit
                  <ArrowUpRight className="size-3.5" />
                </a>
              </li>
              <li>
                <span className="font-medium text-foreground">Co-collaborator:</span>{" "}
                <span className="font-semibold text-foreground">Zainab Faraz</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Genuine sequence: this really is the order people use it in */}
        <section className="mt-10 rounded-3xl border border-border bg-surface p-8">
          <h2 className="text-2xl font-semibold text-foreground">Using it, in order</h2>
          <ol className="mt-5 space-y-3 text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">1.</span> Filter the catalog by domain,
              difficulty, or timeline until two or three ideas earn a closer look.
            </li>
            <li>
              <span className="font-medium text-foreground">2.</span> Open each one's full spec —
              stack, roadmap, dataset notes, and the challenges it actually carries.
            </li>
            <li>
              <span className="font-medium text-foreground">3.</span> Put the finalists side by side
              in Compare to see where stacks and effort actually diverge.
            </li>
            <li>
              <span className="font-medium text-foreground">4.</span> Hit{" "}
              <span className="font-medium text-foreground">Start working on this</span> to seed a
              board, checklist, and stack tracker from that project's roadmap.
            </li>
          </ol>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              Browse the catalog <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/compare"
              className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Compare projects
            </Link>
            <Link
              to="/workspace"
              className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Open workspace
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function PipelinePanel({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: React.ReactNode;
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-background p-4">
      <p className="label-mono text-primary">{eyebrow}</p>
      <p className="mt-1 font-semibold text-foreground">{title}</p>
      {body}
    </div>
  );
}

function ArrowStep() {
  return (
    <div className="flex items-center justify-center text-muted-foreground">
      <ArrowRight className="size-5" />
    </div>
  );
}
