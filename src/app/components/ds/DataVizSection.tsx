import React, { useState } from 'react';
import { SectionWrapper, SubSection, UsageNote, FigmaName } from './SectionWrapper';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, RadialBarChart, RadialBar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, TrendingDown, Minus, BarChart2, PieChart as PieIcon, Activity } from 'lucide-react';

/* ─── Brand Palette ─────────────────────────────────────────────────────── */
const COLORS = {
  primary:   '#00396b',
  blue600:   '#0078ba',
  secondary: '#5bb0e1',
  success:   '#16A34A',
  warning:   '#D97706',
  danger:    '#DC2626',
};

const CHART_PALETTE = [COLORS.blue600, COLORS.secondary, COLORS.success, COLORS.warning, COLORS.danger, COLORS.primary];

/* ─── Mock Data ──────────────────────────────────────────────────────────── */
const claimsOverTime = [
  { month: 'Jan', submitted: 420, approved: 310, denied: 68, pending: 42 },
  { month: 'Feb', submitted: 390, approved: 285, denied: 72, pending: 33 },
  { month: 'Mar', submitted: 510, approved: 380, denied: 88, pending: 42 },
  { month: 'Apr', submitted: 475, approved: 360, denied: 71, pending: 44 },
  { month: 'May', submitted: 530, approved: 415, denied: 79, pending: 36 },
  { month: 'Jun', submitted: 610, approved: 490, denied: 82, pending: 38 },
  { month: 'Jul', submitted: 580, approved: 455, denied: 76, pending: 49 },
  { month: 'Aug', submitted: 640, approved: 512, denied: 91, pending: 37 },
];

const revenueByPayer = [
  { payer: 'Medicare',  revenue: 284000, claims: 142 },
  { payer: 'Medicaid',  revenue: 196000, claims: 108 },
  { payer: 'BlueCross', revenue: 312000, claims: 165 },
  { payer: 'Aetna',     revenue: 228000, claims: 121 },
  { payer: 'Cigna',     revenue: 175000, claims:  93 },
  { payer: 'United',    revenue: 347000, claims: 184 },
];

const claimStatus = [
  { name: 'Approved',   value: 512, color: COLORS.success  },
  { name: 'Pending',    value: 149, color: COLORS.warning   },
  { name: 'Denied',     value:  91, color: COLORS.danger    },
  { name: 'In Review',  value:  67, color: COLORS.secondary },
];

const radialData = [
  { name: 'Collection Rate', value: 87, fill: COLORS.blue600  },
  { name: 'First-Pass Rate', value: 74, fill: COLORS.secondary},
  { name: 'Clean Claim Rate',value: 92, fill: COLORS.success  },
  { name: 'Denial Rate',     value: 11, fill: COLORS.danger   },
];

const collectionTrend = [
  { week: 'W1', rate: 82 }, { week: 'W2', rate: 85 },
  { week: 'W3', rate: 80 }, { week: 'W4', rate: 88 },
  { week: 'W5', rate: 84 }, { week: 'W6', rate: 91 },
  { week: 'W7', rate: 87 }, { week: 'W8', rate: 93 },
];

/* ─── Custom Tooltip ─────────────────────────────────────────────────────── */
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-lg p-3 min-w-[140px]">
      <p className="text-[0.6875rem] font-bold text-[#374151] uppercase tracking-wider mb-2">{label}</p>
      {payload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
          <span className="text-[0.6875rem] text-[#6B7280] capitalize">{entry.name}:</span>
          <span className="text-[0.6875rem] font-semibold text-[#111827] ml-auto">
            {typeof entry.value === 'number' && entry.value > 1000
              ? `$${(entry.value / 1000).toFixed(0)}k`
              : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── KPI Badge ──────────────────────────────────────────────────────────── */
function KpiBadge({ value, label, trend, delta }: { value: string; label: string; trend: 'up' | 'down' | 'flat'; delta: string }) {
  const trendColors = { up: '#16A34A', down: '#DC2626', flat: '#9CA3AF' };
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  return (
    <div className="p-4 rounded-xl border border-[#E5E7EB] bg-white">
      <p className="text-[1.75rem] font-extrabold text-[#0078ba] tracking-tight">{value}</p>
      <p className="text-[0.75rem] font-medium text-[#374151] mt-0.5 mb-2">{label}</p>
      <div className="flex items-center gap-1" style={{ color: trendColors[trend] }}>
        <TrendIcon size={11} />
        <span className="text-[0.625rem] font-semibold">{delta} vs last period</span>
      </div>
    </div>
  );
}

/* ─── Chart Type Tab ─────────────────────────────────────────────────────── */
function ChartTab({ id, label, icon: Icon, active, onClick }: {
  id: string; label: string; icon: React.ElementType; active: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-4 py-2.5 text-[0.8125rem] font-medium border-b-2 whitespace-nowrap transition-colors ${
        active ? 'border-[#0078ba] text-[#0078ba]' : 'border-transparent text-[#6B7280] hover:text-[#374151]'
      }`}
    >
      <Icon size={13} />
      {label}
    </button>
  );
}

/* ─── Color Swatch Row ───────────────────────────────────────────────────── */
function ColorSwatch({ hex, label }: { hex: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 rounded" style={{ backgroundColor: hex }} />
      <div>
        <p className="text-[0.625rem] font-semibold text-[#374151]">{label}</p>
        <p className="text-[0.5625rem] font-mono text-[#9CA3AF]">{hex}</p>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export function DataVizSection() {
  const [activeChart, setActiveChart] = useState('area');

  const chartTabs = [
    { id: 'area',   label: 'Area / Line', icon: Activity  },
    { id: 'bar',    label: 'Bar Chart',   icon: BarChart2 },
    { id: 'donut',  label: 'Donut / Radial', icon: PieIcon },
  ];

  return (
    <SectionWrapper
      id="data-viz"
      title="Data Visualization"
      subtitle="Chart patterns and color tokens for the TrueSight dashboard ecosystem. All charts use the brand palette and consistent typography for WCAG-compliant data communication."
    >
      {/* KPI Row */}
      <SubSection
        title="KPI Summary Cards"
        description="Stat cards combine a recharts sparkline with a primary KPI value and trend indicator."
      >
        <FigmaName name="DataViz / KPI / Sparkline" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
          <KpiBadge value="$1.34M"  label="Total Revenue"        trend="up"   delta="+12.4%" />
          <KpiBadge value="87.2%"   label="Collection Rate"      trend="up"   delta="+2.1%"  />
          <KpiBadge value="819"     label="Claims Processed"     trend="up"   delta="+7.8%"  />
          <KpiBadge value="11.1%"   label="Denial Rate"          trend="down" delta="-1.5%"  />
        </div>

        {/* Sparkline row */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-[#E5E7EB] bg-white">
            <p className="text-[0.75rem] font-semibold text-[#374151] mb-3">Collection Rate — 8 Week Trend</p>
            <ResponsiveContainer width="100%" height={80}>
              <AreaChart data={collectionTrend} margin={{ top: 4, right: 4, bottom: 0, left: -32 }}>
                <defs>
                  <linearGradient id="collGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={COLORS.blue600} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={COLORS.blue600} stopOpacity={0}   />
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" tick={{ fontSize: 9, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 9, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="rate" stroke={COLORS.blue600} strokeWidth={2} fill="url(#collGrad)" dot={{ r: 3, fill: COLORS.blue600 }} name="Rate %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="p-4 rounded-xl border border-[#E5E7EB] bg-white">
            <p className="text-[0.75rem] font-semibold text-[#374151] mb-3">Claims Volume — 8 Month Overview</p>
            <ResponsiveContainer width="100%" height={80}>
              <BarChart data={claimsOverTime.slice(-6)} margin={{ top: 4, right: 4, bottom: 0, left: -32 }}>
                <XAxis dataKey="month" tick={{ fontSize: 9, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="approved" fill={COLORS.blue600}  radius={[3,3,0,0]} name="Approved" />
                <Bar dataKey="denied"   fill={COLORS.danger}   radius={[3,3,0,0]} name="Denied"   />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </SubSection>

      {/* Chart Gallery */}
      <SubSection
        title="Chart Pattern Gallery"
        description="Full-size chart implementations organized by type. Each uses the TrueSight brand palette."
      >
        {/* Tab Bar */}
        <div className="border-b border-[#E5E7EB] mb-6">
          <div className="flex items-center gap-0 overflow-x-auto">
            {chartTabs.map(t => (
              <ChartTab key={t.id} {...t} active={activeChart === t.id} onClick={() => setActiveChart(t.id)} />
            ))}
          </div>
        </div>

        {/* Area / Line Charts */}
        {activeChart === 'area' && (
          <div className="space-y-6">
            <FigmaName name="DataViz / Chart / Area" />

            {/* Stacked Area */}
            <div className="p-5 rounded-xl border border-[#E5E7EB] bg-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-[0.875rem] font-bold text-[#111827]">Claims Volume by Status</p>
                  <p className="text-[0.6875rem] text-[#9CA3AF]">Monthly breakdown — stacked area chart</p>
                </div>
                <span className="text-[0.5625rem] font-mono px-2 py-0.5 rounded bg-[#ddeef9] text-[#0078ba] border border-[#bdddf5]">
                  type="monotone" — stacked
                </span>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={claimsOverTime} margin={{ top: 8, right: 16, bottom: 0, left: -16 }}>
                  <defs>
                    {[
                      { id: 'approved', color: COLORS.success },
                      { id: 'pending',  color: COLORS.warning },
                      { id: 'denied',   color: COLORS.danger  },
                    ].map(g => (
                      <linearGradient key={g.id} id={`grad-${g.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor={g.color} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={g.color} stopOpacity={0}   />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '16px' }} />
                  <Area type="monotone" dataKey="approved" stackId="1" stroke={COLORS.success}  fill={`url(#grad-approved)`} name="Approved" />
                  <Area type="monotone" dataKey="pending"  stackId="1" stroke={COLORS.warning}  fill={`url(#grad-pending)`}  name="Pending"  />
                  <Area type="monotone" dataKey="denied"   stackId="1" stroke={COLORS.danger}   fill={`url(#grad-denied)`}   name="Denied"   />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Multi-line */}
            <FigmaName name="DataViz / Chart / Line" />
            <div className="p-5 rounded-xl border border-[#E5E7EB] bg-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-[0.875rem] font-bold text-[#111827]">Submitted vs Approved Trend</p>
                  <p className="text-[0.6875rem] text-[#9CA3AF]">8-month comparison — multi-line chart</p>
                </div>
                <span className="text-[0.5625rem] font-mono px-2 py-0.5 rounded bg-[#ddeef9] text-[#0078ba] border border-[#bdddf5]">
                  strokeWidth={2} — dot={'{'}r:4{'}'}
                </span>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={claimsOverTime} margin={{ top: 8, right: 16, bottom: 0, left: -16 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '16px' }} />
                  <Line type="monotone" dataKey="submitted" stroke={COLORS.blue600}  strokeWidth={2} dot={{ r: 4, fill: COLORS.blue600  }} name="Submitted"  activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="approved"  stroke={COLORS.success}  strokeWidth={2} dot={{ r: 4, fill: COLORS.success  }} name="Approved"   activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="denied"    stroke={COLORS.danger}   strokeWidth={2} dot={{ r: 4, fill: COLORS.danger   }} name="Denied"     activeDot={{ r: 6 }} strokeDasharray="4 3" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <UsageNote>
              Use Area charts for cumulative or trend data (revenue over time, claim volume). Use Line charts to compare two or more series. Always include a Legend and a Tooltip. Prefer <code className="font-mono">type="monotone"</code> for smooth curves in healthcare data contexts.
            </UsageNote>
          </div>
        )}

        {/* Bar Charts */}
        {activeChart === 'bar' && (
          <div className="space-y-6">
            <FigmaName name="DataViz / Chart / Bar" />

            {/* Grouped Bar */}
            <div className="p-5 rounded-xl border border-[#E5E7EB] bg-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-[0.875rem] font-bold text-[#111827]">Revenue by Payer — Grouped Bar</p>
                  <p className="text-[0.6875rem] text-[#9CA3AF]">Revenue ($) and claim count side-by-side</p>
                </div>
                <span className="text-[0.5625rem] font-mono px-2 py-0.5 rounded bg-[#ddeef9] text-[#0078ba] border border-[#bdddf5]">
                  radius={[4,4,0,0]}
                </span>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={revenueByPayer} margin={{ top: 8, right: 16, bottom: 0, left: -8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                  <XAxis dataKey="payer" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <YAxis key="yaxis-rev" yAxisId="rev" orientation="left"  tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false}
                    tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                  <YAxis key="yaxis-cnt" yAxisId="cnt" orientation="right" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '12px' }} />
                  <Bar key="bar-rev" yAxisId="rev" dataKey="revenue" fill={COLORS.blue600}  radius={[4,4,0,0]} name="Revenue" maxBarSize={36} />
                  <Bar key="bar-cnt" yAxisId="cnt" dataKey="claims"  fill={COLORS.secondary} radius={[4,4,0,0]} name="Claims"  maxBarSize={36} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Single Bar with reference line */}
            <FigmaName name="DataViz / Chart / Bar / Horizontal" />
            <div className="p-5 rounded-xl border border-[#E5E7EB] bg-white">
              <p className="text-[0.875rem] font-bold text-[#111827] mb-1">Claims Submitted — Monthly Volume</p>
              <p className="text-[0.6875rem] text-[#9CA3AF] mb-4">Single series with gradient fill</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={claimsOverTime} margin={{ top: 8, right: 16, bottom: 0, left: -16 }}>
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor={COLORS.blue600} stopOpacity={1}   />
                      <stop offset="100%" stopColor={COLORS.primary}  stopOpacity={0.7} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="submitted" fill="url(#barGrad)" radius={[4,4,0,0]} name="Submitted" maxBarSize={48} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <UsageNote>
              Use rounded corners (<code className="font-mono">radius={[4,4,0,0]}</code>) on all bars. Remove vertical grid lines for cleaner bar charts. For financial data, format Y-axis ticks as currency. Limit grouped bars to 2–3 series to avoid visual clutter.
            </UsageNote>
          </div>
        )}

        {/* Donut / Radial */}
        {activeChart === 'donut' && (
          <div className="space-y-6">
            <FigmaName name="DataViz / Chart / Donut" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Donut */}
              <div className="p-5 rounded-xl border border-[#E5E7EB] bg-white">
                <p className="text-[0.875rem] font-bold text-[#111827] mb-1">Claim Status Distribution</p>
                <p className="text-[0.6875rem] text-[#9CA3AF] mb-3">innerRadius=60 — donut style</p>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={claimStatus}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={85}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {claimStatus.map((entry, i) => (
                            <Cell key={i} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-col gap-2 min-w-[110px]">
                    {claimStatus.map(s => (
                      <div key={s.name} className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                        <div>
                          <p className="text-[0.6875rem] font-semibold text-[#374151]">{s.name}</p>
                          <p className="text-[0.5625rem] text-[#9CA3AF]">{s.value} claims</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Radial Bar */}
              <div className="p-5 rounded-xl border border-[#E5E7EB] bg-white">
                <FigmaName name="DataViz / Chart / Radial" />
                <p className="text-[0.875rem] font-bold text-[#111827] mb-1 mt-1">Performance KPIs</p>
                <p className="text-[0.6875rem] text-[#9CA3AF] mb-3">RadialBarChart — percentage rings</p>
                <ResponsiveContainer width="100%" height={200}>
                  <RadialBarChart
                    cx="50%" cy="50%"
                    innerRadius={30} outerRadius={90}
                    data={radialData}
                    startAngle={180} endAngle={-180}
                  >
                    <RadialBar dataKey="value" cornerRadius={6} background={{ fill: '#F3F4F6' }} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (!active || !payload?.length) return null;
                        const d = payload[0].payload;
                        return (
                          <div className="bg-white border border-[#E5E7EB] rounded-lg shadow-md p-2.5">
                            <p className="text-[0.6875rem] font-bold text-[#374151]">{d.name}</p>
                            <p className="text-[0.75rem] font-bold" style={{ color: d.fill }}>{d.value}%</p>
                          </div>
                        );
                      }}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {radialData.map(d => (
                    <div key={d.name} className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.fill }} />
                      <div>
                        <p className="text-[0.5625rem] font-semibold text-[#374151]">{d.name}</p>
                        <p className="text-[0.5rem] font-mono" style={{ color: d.fill }}>{d.value}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <UsageNote>
              Use Donut charts for part-to-whole relationships (claim status, payer mix). Use Radial Bar charts for displaying KPI targets as progress rings. Always include a Legend or inline labels — never rely on color alone to encode meaning.
            </UsageNote>
          </div>
        )}
      </SubSection>

      {/* Chart Color Tokens */}
      <SubSection
        title="Chart Color Tokens"
        description="Approved semantic colors for data visualization within the TrueSight brand system."
      >
        <div className="p-5 rounded-xl border border-[#E5E7EB] bg-white">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {[
              { hex: COLORS.blue600,   label: 'Series 1 — Primary',  token: '--ts-chart-1' },
              { hex: COLORS.secondary, label: 'Series 2 — Secondary', token: '--ts-chart-2' },
              { hex: COLORS.success,   label: 'Positive / Approved',  token: '--ts-chart-pos' },
              { hex: COLORS.warning,   label: 'Warning / Pending',    token: '--ts-chart-warn' },
              { hex: COLORS.danger,    label: 'Negative / Denied',    token: '--ts-chart-neg' },
              { hex: COLORS.primary,   label: 'Deep / Accent',        token: '--ts-chart-deep' },
            ].map(c => (
              <div key={c.hex} className="flex flex-col items-center gap-1.5">
                <div className="w-full h-10 rounded-lg border border-[#E5E7EB]" style={{ backgroundColor: c.hex }} />
                <p className="text-[0.5625rem] font-bold text-[#374151] text-center">{c.label}</p>
                <code className="text-[0.5rem] font-mono text-[#9CA3AF]">{c.hex}</code>
                <code className="text-[0.5rem] font-mono text-[#bdddf5] bg-[#00396b] px-1 py-0.5 rounded">{c.token}</code>
              </div>
            ))}
          </div>

          {/* Color ramp demo */}
          <div>
            <p className="text-[0.6875rem] font-semibold text-[#374151] uppercase tracking-wider mb-2">Blue Ramp — Primary Series Extended</p>
            <div className="flex gap-1 h-8">
              {['#ddeef9', '#bdddf5', '#99cceb', '#5bb0e1', '#0078ba', '#00396b', '#001a33'].map(c => (
                <div key={c} className="flex-1 rounded" style={{ backgroundColor: c }} title={c} />
              ))}
            </div>
            <div className="flex gap-1 mt-1">
              {['#ddeef9', '#bdddf5', '#99cceb', '#5bb0e1', '#0078ba', '#00396b', '#001a33'].map(c => (
                <p key={c} className="flex-1 text-center text-[0.4rem] font-mono text-[#9CA3AF] truncate">{c}</p>
              ))}
            </div>
          </div>
        </div>
        <UsageNote>
          Never use more than 5–6 distinct colors in a single chart. For multi-series data beyond 6 series, use the blue ramp to create tonal variations of the primary series color. Always pair color with a shape or label in accessibility-critical contexts.
        </UsageNote>
      </SubSection>

      {/* Recharts Config Tokens */}
      <SubSection
        title="Chart Configuration Tokens"
        description="Standard Recharts prop values to maintain visual consistency across all TrueSight charts."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: 'Grid',
              props: [
                ['strokeDasharray', '"3 3"'],
                ['stroke', '"#F3F4F6"'],
                ['vertical={false}', '(bar charts)'],
              ],
            },
            {
              title: 'Axes',
              props: [
                ['axisLine={false}', 'Remove axis line'],
                ['tickLine={false}', 'Remove tick lines'],
                ['fontSize', '10 (via tick prop)'],
                ['fill (tick)', '"#9CA3AF"'],
              ],
            },
            {
              title: 'Bars',
              props: [
                ['radius', '[4,4,0,0]'],
                ['maxBarSize', '48'],
                ['paddingAngle', '3 (pie/donut)'],
              ],
            },
            {
              title: 'Lines',
              props: [
                ['strokeWidth', '2'],
                ['type', '"monotone"'],
                ['dot', '{r: 4}'],
                ['activeDot', '{r: 6}'],
              ],
            },
            {
              title: 'Container',
              props: [
                ['margin', '{top:8,right:16,bottom:0,left:-16}'],
                ['width', '"100%"'],
              ],
            },
            {
              title: 'Tooltip',
              props: [
                ['content', '<CustomTooltip />'],
                ['bg', 'white, shadow-lg'],
                ['border', 'border-[#E5E7EB] rounded-xl'],
              ],
            },
          ].map(block => (
            <div key={block.title} className="p-4 rounded-xl border border-[#E5E7EB] bg-white">
              <p className="text-[0.6875rem] font-bold text-[#0078ba] uppercase tracking-wider mb-2">{block.title}</p>
              <div className="space-y-1.5">
                {block.props.map(([prop, val], i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <code className="text-[0.5625rem] font-mono text-[#00396b] bg-[#ddeef9] px-1 py-0.5 rounded flex-shrink-0">{prop}</code>
                    <span className="text-[0.5625rem] text-[#6B7280] font-mono">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SubSection>
    </SectionWrapper>
  );
}