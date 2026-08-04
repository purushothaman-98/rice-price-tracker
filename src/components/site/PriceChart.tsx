import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

export interface ChartSeries {
  key: string;
  name: string;
  color: string;
  dashed?: boolean;
}

export interface Marker {
  x: string;
  label: string;
}

export function PriceLineChart({
  data,
  series,
  markers = [],
  yLabel = "₹/kg",
  height = 320,
}: {
  data: Array<Record<string, string | number | null>>;
  series: ChartSeries[];
  markers?: Marker[];
  yLabel?: string;
  height?: number;
}) {
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 24, right: 16, bottom: 8, left: 0 }}>
          <CartesianGrid stroke="var(--color-border)" strokeDasharray="2 4" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
            stroke="var(--color-border)"
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
            stroke="var(--color-border)"
            width={52}
            label={{
              value: yLabel,
              angle: -90,
              position: "insideLeft",
              style: { fontSize: 11, fill: "var(--color-muted-foreground)" },
            }}
          />
          <Tooltip
            contentStyle={{
              background: "var(--color-card)",
              border: "1px solid var(--color-border)",
              borderRadius: 2,
              fontSize: 12,
            }}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          {markers.map((m) => (
            <ReferenceLine
              key={m.x + m.label}
              x={m.x}
              stroke="var(--color-maroon)"
              strokeDasharray="3 3"
              label={{
                value: m.label,
                position: "top",
                style: { fontSize: 9, fill: "var(--color-maroon)" },
              }}
            />
          ))}
          {series.map((s) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.name}
              stroke={s.color}
              strokeWidth={2}
              strokeDasharray={s.dashed ? "5 4" : undefined}
              dot={{ r: 2 }}
              activeDot={{ r: 4 }}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}