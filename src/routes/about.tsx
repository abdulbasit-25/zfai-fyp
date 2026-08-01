import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

const QUICK_LINKS = [
  { href: "#overview", label: "Overview" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#help", label: "Help & FAQ" },
  { href: "#get-started", label: "Get started" },
];

function AboutPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Quick nav — wraps on mobile, single row on desktop */}
        <nav aria-label="On this page" className="flex flex-wrap gap-2 border-b border-border pb-6">
          {QUICK_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="label-mono rounded-full border border-border px-3 py-1.5 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Hero */}
        <section id="overview" className="scroll-mt-24 pt-10 sm:pt-12">
          <span className="label-mono rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-primary">
            About the catalog
          </span>

          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            21 ideas, specced past the point of{" "}
            <span className="text-primary">&ldquo;good luck.&rdquo;</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Most FYP idea lists give you a title and a paragraph. This one gives you a stack
            breakdown, a phase-by-phase roadmap, dataset notes, and the failure modes people
            actually hit — for every project in the catalog, before you write a proposal.
          </p>
        </section>

        {/* Signature: the actual pipeline — stacks vertically on mobile, horizontal from sm up */}
        <section
          id="how-it-works"
          className="mt-12 scroll-mt-24 rounded-3xl border border-border bg-card p-5 sm:p-8"
        >
          <h2 className="text-xl font-semibold text-foreground sm:text-2xl">How it works</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            The catalog isn&apos;t just a list — it&apos;s a pipeline from a one-line idea to a
            board you actually work off of.
          </p>

          <div className="mt-6 flex flex-col items-stretch gap-3 sm:grid sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:gap-4">
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
                  <span className="rounded-md border border-border bg-background px-2 py-1 text-center text-muted-foreground">
                    To Do
                  </span>
                  <span className="rounded-md border border-primary/40 bg-primary/10 px-2 py-1 text-center text-primary">
                    In Progress
                  </span>
                  <span className="rounded-md border border-border bg-background px-2 py-1 text-center text-muted-foreground">
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

        {/* Why / who */}
        <section className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-border bg-background p-5 sm:p-6">
            <h2 className="text-xl font-semibold text-foreground">Why the specs go this deep</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              "Pick an AI project" is the easy part. The part that actually stalls a final year is
              everything after: which model to start with, what the dataset situation really looks
              like, and which corner of the idea quietly won't work. Every entry here carries that
              detail up front, so choosing a project and starting it aren't two separate months.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-background p-5 sm:p-6">
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

        {/* Help & FAQ */}
        <section id="help" className="mt-10 scroll-mt-24">
          <h2 className="text-2xl font-semibold text-foreground">Help &amp; FAQ</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            The things people usually ask after they've started a project, not before.
          </p>

          <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
            <FaqItem question="Where does my workspace data actually live?">
              In your browser&apos;s local storage, under the key{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs">
                fyp-catalog-2026.v1
              </code>
              . There&apos;s no account and no server — everything (board, notes, stack checklist,
              theme) stays on the machine and browser you used to build it. Switching browsers or
              devices starts you with a blank workspace there.
            </FaqItem>

            <FaqItem question="Can I work on more than one project at a time?">
              Yes. Starting a project seeds a workspace for it, and you can start several — switch
              between them from the workspace header at any time. Each keeps its own board, notes,
              stack, and risk log.
            </FaqItem>

            <FaqItem question="What's actually inside a project's full spec?">
              A numbered feature list, a stack broken into Frontend / Backend / AI-ML / Infra, a
              roadmap of phases with week ranges and goals, dataset notes, the honest challenges,
              and why the idea's trending. It's built to be enough to start work from, not just
              enough to pick a title.
            </FaqItem>

            <FaqItem question="How do I shortlist between a few ideas?">
              Tap Compare on up to three cards, then open the Compare view for a side-by-side table
              — domain, difficulty, timeline, team size, full stacks with shared tools highlighted,
              and each project's challenges.
            </FaqItem>

            <FaqItem question="I have a supervisor meeting tomorrow — can I export something?">
              Two options: the workspace's Export tab downloads a Markdown status report, or use
              your browser's Print → PDF (the project detail page also has a dedicated{" "}
              <span className="font-medium text-foreground">Print spec</span> button for a clean
              single-project PDF).
            </FaqItem>

            <FaqItem question="What if scope changes after I've started?">
              Log it in the Notes tab — it's a timestamped decision log built for exactly that:
              supervisor feedback, scope cuts, pivots. Board cards can be added, edited, or deleted
              freely too; the seeded roadmap is a starting point, not a contract.
            </FaqItem>

            <FaqItem question="Is search just matching titles?">
              No — it searches titles, hooks, domains, descriptions, keywords, and every tech-stack
              entry at once. Press{" "}
              <kbd className="rounded border border-border bg-secondary px-1.5 py-0.5 font-mono text-xs">
                /
              </kbd>{" "}
              from the catalog to jump straight to it.
            </FaqItem>

            <FaqItem question="How current is the tech stack advice?">
              Compiled July 2026. AI tooling moves fast, so re-verify model names, library versions,
              and dataset licences against current docs before you quote a stack in a proposal.
            </FaqItem>
          </div>
        </section>

        {/* Genuine sequence */}
        <section
          id="get-started"
          className="mt-10 scroll-mt-24 rounded-3xl border border-border bg-surface p-5 sm:p-8"
        >
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
    <div className="flex flex-1 flex-col rounded-2xl border border-border bg-background p-4">
      <p className="label-mono text-primary">{eyebrow}</p>
      <p className="mt-1 font-semibold text-foreground">{title}</p>
      {body}
    </div>
  );
}

function ArrowStep() {
  return (
    <div className="flex items-center justify-center text-muted-foreground">
      <ArrowDown className="size-5 sm:hidden" />
      <ArrowRight className="hidden size-5 sm:block" />
    </div>
  );
}

function FaqItem({ question, children }: { question: string; children: React.ReactNode }) {
  return (
    <details className="group px-5 py-4 first:rounded-t-2xl last:rounded-b-2xl open:bg-background/60 sm:px-6">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-foreground">
        <span>{question}</span>
        <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
      </summary>
      <p className="mt-3 leading-relaxed text-muted-foreground">{children}</p>
    </details>
  );
}
