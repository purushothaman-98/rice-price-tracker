import { districtSnapshots, type DistrictSnapshot } from "@/data/prices";
import { ConfidenceBadge } from "./ConfidenceBadge";
import { cn } from "@/lib/utils";
import { useState } from "react";

const layout: Record<string, [number, number]> = {
  Vellore: [2, 0],
  Chennai: [4, 0],
  Salem: [2, 1],
  Cuddalore: [4, 1],
  Erode: [1, 2],
  Tiruchirappalli: [3, 2],
  Thanjavur: [4, 2],
  Nagapattinam: [5, 2],
  Coimbatore: [1, 3],
  Dindigul: [2, 3],
  Madurai: [3, 4],
  Tirunelveli: [2, 5],
};

function tone(change: number) {
  if (change >= 3) return "bg-destructive/85 text-destructive-foreground";
  if (change >= 1.5) return "bg-turmeric text-turmeric-foreground";
  if (change > 0.5) return "bg-turmeric/45 text-foreground";
  return "bg-paddy/25 text-foreground";
}

export function DistrictMap() {
  const [active, setActive] = useState<DistrictSnapshot>(districtSnapshots[0]!);

  return (
    <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_15rem]">
      <div>
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: "repeat(6, minmax(0,1fr))" }}
          role="group"
          aria-label="Tamil Nadu district price cartogram"
        >
          {districtSnapshots.map((d) => {
            const pos = layout[d.district] ?? [0, 0];
            const isActive = active.district === d.district;
            return (
              <button
                key={d.district}
                type="button"
                onClick={() => setActive(d)}
                onFocus={() => setActive(d)}
                aria-pressed={isActive}
                style={{ gridColumnStart: pos[0] + 1, gridRowStart: pos[1] + 1 }}
                className={cn(
                  "aspect-square rounded-sm border border-border p-1 text-left text-[10px] font-bold leading-tight transition-transform hover:scale-[1.04]",
                  tone(d.monthChangePct),
                  isActive && "ring-2 ring-ring ring-offset-1 ring-offset-background",
                )}
              >
                <span className="block truncate">{d.district}</span>
                <span className="tabular block text-[11px]">+{d.monthChangePct}%</span>
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">
          Schematic cartogram, not a geographic boundary map. Colour shows one-month change in the
          fine-rice retail quotation.
        </p>
      </div>

      <aside className="border border-border bg-card p-3" aria-live="polite">
        <p className="eyebrow">Selected district</p>
        <h3 className="text-lg font-bold">{active.district}</h3>
        <dl className="mt-2 space-y-1 text-sm">
          <div className="flex justify-between gap-2">
            <dt className="text-muted-foreground">Fine rice</dt>
            <dd className="tabular font-semibold">₹{active.retailFine.toFixed(2)}/kg</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-muted-foreground">Common rice</dt>
            <dd className="tabular font-semibold">₹{active.retailCommon.toFixed(2)}/kg</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-muted-foreground">1-month change</dt>
            <dd className="tabular font-semibold">+{active.monthChangePct}%</dd>
          </div>
        </dl>
        <ConfidenceBadge level={active.confidence} className="mt-3" />
      </aside>
    </div>
  );
}