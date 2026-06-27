import { useState } from "react";
import {
  Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Cell,
} from "recharts";
import { GlassCard } from "./shared/GlassCard";
import { SectionHeading } from "./shared/SectionHeading";
import { salaryRoles } from "@/lib/landing/data";
import { TrendingUp, Flame, Sparkles } from "lucide-react";

export function SalaryDashboard() {
  const [active, setActive] = useState(0);
  const role = salaryRoles[active];
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Industry opportunity"
          title={<>AI is reshaping <span className="text-gradient">every industry</span></>}
          subtitle="Live salary benchmarks across the highest-leverage AI roles in 2026."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <GlassCard className="glass-strong p-2 sm:p-3">
            <div className="max-h-[460px] overflow-auto">
              {salaryRoles.map((r, i) => (
                <button
                  key={r.role}
                  onClick={() => setActive(i)}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-sm transition-all ${
                    i === active
                      ? "bg-gradient-primary text-primary-foreground shadow-glow"
                      : "hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="font-medium">{r.role}</span>
                  <span className={`text-xs ${i === active ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    ${r.avg}k
                  </span>
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="glass-strong p-6 sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h3 className="text-3xl font-bold tracking-tight">{role.role}</h3>
                <p className="mt-1 text-sm text-muted-foreground">Global average · 2026 benchmark</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--accent)]/15 px-3 py-1 text-xs font-mono uppercase tracking-wider text-[color:var(--accent)]">
                <Flame className="size-3" /> {role.outlook}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <Metric icon={<TrendingUp className="size-4" />} label="Avg salary" value={`$${role.avg}k`} />
              <Metric icon={<Sparkles className="size-4" />} label="Demand growth" value={`+${role.growth}%`} />
              <Metric icon={<Flame className="size-4" />} label="Outlook" value={role.outlook} />
            </div>

            <div className="mt-6 h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salaryRoles}>
                  <CartesianGrid stroke="oklch(1 0 0 / 0.06)" vertical={false} />
                  <XAxis
                    dataKey="role"
                    tick={{ fill: "oklch(0.7 0.03 260)", fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    interval={0}
                    angle={-25}
                    textAnchor="end"
                    height={70}
                  />
                  <YAxis
                    tick={{ fill: "oklch(0.7 0.03 260)", fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `$${v}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "oklch(0.14 0.04 270)",
                      border: "1px solid oklch(1 0 0 / 0.12)",
                      borderRadius: 12,
                      color: "white",
                      fontSize: 12,
                    }}
                    cursor={{ fill: "oklch(1 0 0 / 0.04)" }}
                  />
                  <Bar dataKey="avg" radius={[8, 8, 0, 0]}>
                    {salaryRoles.map((_, i) => (
                      <Cell key={i} fill={i === active ? "oklch(0.82 0.16 200)" : "oklch(0.65 0.21 252 / 0.7)"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="glass rounded-xl p-4">
      <div className="flex items-center gap-1.5 text-[color:var(--accent)]">{icon}</div>
      <p className="mt-2 text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 text-xl font-bold">{value}</p>
    </div>
  );
}
