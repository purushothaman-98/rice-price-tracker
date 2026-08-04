import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Overview" },
  { to: "/history", label: "2014–present" },
  { to: "/explorer", label: "Price explorer" },
  { to: "/varieties", label: "Variety atlas" },
  { to: "/government", label: "Government & PDS" },
  { to: "/tax", label: "Tax & packaging" },
  { to: "/newsroom", label: "Investigations" },
  { to: "/sources", label: "Sources" },
  { to: "/admin", label: "Admin" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b-4 border-double border-maroon bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-3 sm:flex sm:justify-between">
          <div className="min-w-0">
            <Link to="/" className="block">
              <p className="eyebrow">Tamil Nadu · Public interest data journalism</p>
              <h1 className="truncate text-xl font-bold leading-tight sm:text-2xl">
                Rice Price Tracker
              </h1>
            </Link>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="hidden text-xs text-muted-foreground sm:inline">
              அரிசி விலை பொதுப் பதிவு
            </span>
            <button
              type="button"
              className="inline-flex min-h-11 min-w-11 items-center justify-center border border-border lg:hidden"
              aria-expanded={open}
              aria-controls="primary-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>
      <nav
        id="primary-nav"
        aria-label="Primary"
        className={cn("border-t border-border bg-secondary lg:block", open ? "block" : "hidden")}
      >
        <ul className="mx-auto flex max-w-6xl flex-col gap-0 px-2 text-sm lg:flex-row lg:flex-wrap lg:items-center">
          {nav.map((n) => (
            <li key={n.to}>
              <Link
                to={n.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: n.to === "/" }}
                activeProps={{ className: "bg-maroon text-maroon-foreground" }}
                className="block px-3 py-2.5 font-semibold hover:bg-turmeric hover:text-turmeric-foreground"
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t-4 border-double border-maroon bg-secondary">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3">
        <div>
          <h2 className="text-base font-bold">Rice Price Tracker</h2>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            An independent public-education project on rice prices in Tamil Nadu, built for
            consumers first and useful to farmers, traders, researchers and policymakers.
          </p>
        </div>
        <div>
          <h2 className="eyebrow">Standards</h2>
          <ul className="mt-2 space-y-1 text-xs">
            <li>
              <Link to="/sources" className="underline underline-offset-2">
                Methodology and corrections
              </Link>
            </li>
            <li>
              <Link to="/sources" className="underline underline-offset-2">
                Source library
              </Link>
            </li>
            <li>
              <Link to="/admin" className="underline underline-offset-2">
                Data entry prototype
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="eyebrow">Current status</h2>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            The homepage uses source-linked official records and leaves unavailable periods blank.
            The explorer and some investigation pages remain prototypes and may still contain clearly
            labelled demonstration records until their row-level sources are completed.
          </p>
        </div>
      </div>
      <div className="kolam-rule" aria-hidden="true" />
    </footer>
  );
}
