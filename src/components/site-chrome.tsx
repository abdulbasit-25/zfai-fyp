import { Link } from "@tanstack/react-router";
import { Moon, Sun, LayoutGrid, GitCompare, Hammer } from "lucide-react";
import { useEffect } from "react";
import { setTheme, useStore } from "@/lib/workspace";

export function SiteHeader() {
  const theme = useStore((s) => s.theme);
  const compareCount = useStore((s) => s.compare.length);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme !== "light");
  }, [theme]);

  const navLink =
    "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground";

  return (
    <header className="no-print sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="mr-auto flex items-baseline gap-2">
          <span className="font-display text-lg font-semibold tracking-tight">AI FYP Catalog</span>
          <span className="label-mono text-primary">2026</span>
        </Link>
        <nav className="flex items-center gap-1">
          <Link to="/" className={navLink} activeProps={{ className: "!text-foreground bg-secondary" }}>
            <LayoutGrid className="size-4" /> <span className="hidden sm:inline">Catalog</span>
          </Link>
          <Link to="/compare" className={navLink} activeProps={{ className: "!text-foreground bg-secondary" }}>
            <GitCompare className="size-4" />
            <span className="hidden sm:inline">Compare</span>
            {compareCount > 0 && (
              <span className="label-mono rounded bg-primary px-1.5 py-0.5 text-primary-foreground">
                {compareCount}
              </span>
            )}
          </Link>
          <Link to="/workspace" className={navLink} activeProps={{ className: "!text-foreground bg-secondary" }}>
            <Hammer className="size-4" /> <span className="hidden sm:inline">Workspace</span>
          </Link>
          <button
            aria-label="Toggle color theme"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="ml-1 rounded-md border border-border p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </button>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="no-print border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-muted-foreground sm:px-6">
        <p className="label-mono mb-2 text-foreground">Doc source &amp; freshness</p>
        <p className="max-w-3xl leading-relaxed">
          Catalog compiled July 2026 from the FYP idea brief. AI tooling moves fast — re-verify model
          names, library versions and dataset licences against current docs before committing to a
          project or quoting a stack in your proposal.
        </p>
        <p className="label-mono mt-6 border-t border-border pt-4">
          Powered by{" "}
          <a
            href="https://abdulbasit-archer.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="text-primary underline underline-offset-4 hover:opacity-80"
          >
            ARCHER
          </a>
        </p>
      </div>

    </footer>
  );
}
