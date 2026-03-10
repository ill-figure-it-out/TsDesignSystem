import React, { useState } from 'react';
import { SectionWrapper, SubSection, UsageNote } from './SectionWrapper';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, BarChart2, FileText, Users, Settings } from 'lucide-react';

function DSPagination({
  total,
  perPage = 10,
  variant = 'default',
}: {
  total: number;
  perPage?: number;
  variant?: 'default' | 'simple' | 'compact';
}) {
  const [current, setCurrent] = useState(3);
  const pages = Math.ceil(total / perPage);

  const getVisiblePages = () => {
    if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1);
    if (current <= 4) return [1, 2, 3, 4, 5, '...', pages];
    if (current >= pages - 3) return [1, '...', pages - 4, pages - 3, pages - 2, pages - 1, pages];
    return [1, '...', current - 1, current, current + 1, '...', pages];
  };

  const btn = (content: React.ReactNode, action: () => void, active = false, disabled = false) => (
    <button
      onClick={action}
      disabled={disabled}
      className={`
        min-w-[32px] h-8 px-2 flex items-center justify-center rounded-lg text-[0.8125rem] font-medium transition-all
        ${active ? 'bg-[#0078ba] text-white shadow-sm' : ''}
        ${!active && !disabled ? 'text-[#374151] hover:bg-[#f3f3f3]' : ''}
        ${disabled ? 'text-[#D1D5DB] cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {content}
    </button>
  );

  if (variant === 'simple') {
    return (
      <div className="flex items-center gap-3">
        {btn(<ChevronLeft size={14} />, () => setCurrent(Math.max(1, current - 1)), false, current === 1)}
        <span className="text-[0.8125rem] text-[#6B7280]">
          Page <strong className="text-[#374151]">{current}</strong> of <strong className="text-[#374151]">{pages}</strong>
        </span>
        {btn(<ChevronRight size={14} />, () => setCurrent(Math.min(pages, current + 1)), false, current === pages)}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-1">
        {btn(<ChevronsLeft size={14} />, () => setCurrent(1), false, current === 1)}
        {btn(<ChevronLeft size={14} />, () => setCurrent(Math.max(1, current - 1)), false, current === 1)}
        {getVisiblePages().map((p, i) =>
          p === '...'
            ? <span key={`dot-${i}`} className="w-8 h-8 flex items-center justify-center text-[#9CA3AF] text-[0.875rem]">…</span>
            : <span key={`page-${i}`}>{btn(p, () => setCurrent(p as number), current === p)}</span>
        )}
        {btn(<ChevronRight size={14} />, () => setCurrent(Math.min(pages, current + 1)), false, current === pages)}
        {btn(<ChevronsRight size={14} />, () => setCurrent(pages), false, current === pages)}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <span className="text-[0.8125rem] text-[#6B7280]">
        Showing <strong className="text-[#374151]">{(current - 1) * perPage + 1}–{Math.min(current * perPage, total)}</strong> of <strong className="text-[#374151]">{total.toLocaleString()}</strong> results
      </span>
      <div className="flex items-center gap-1">
        {btn(<ChevronLeft size={14} />, () => setCurrent(Math.max(1, current - 1)), false, current === 1)}
        {getVisiblePages().map((p, i) =>
          p === '...'
            ? <span key={`dot-${i}`} className="w-8 h-8 flex items-center justify-center text-[#9CA3AF] text-[0.875rem]">…</span>
            : <span key={`page-${i}`}>{btn(p, () => setCurrent(p as number), current === p)}</span>
        )}
        {btn(<ChevronRight size={14} />, () => setCurrent(Math.min(pages, current + 1)), false, current === pages)}
      </div>
      <div className="flex items-center gap-2 text-[0.8125rem] text-[#6B7280]">
        <span>Rows:</span>
        <select className="border border-[#D1D5DB] rounded-lg px-2 py-1 text-[0.8125rem] text-[#374151] outline-none focus:border-[#0078ba]">
          <option>10</option>
          <option>25</option>
          <option>50</option>
          <option>100</option>
        </select>
      </div>
    </div>
  );
}

function DSTabs({ variant }: { variant: 'underline' | 'pill' | 'card' | 'icon' }) {
  const [active, setActive] = useState(0);

  const tabs = [
    { label: 'Overview', icon: BarChart2, count: null },
    { label: 'Claims', icon: FileText, count: 24 },
    { label: 'Providers', icon: Users, count: null },
    { label: 'Settings', icon: Settings, count: null },
  ];

  if (variant === 'underline') {
    return (
      <div>
        <div className="flex border-b border-[#E5E7EB]">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setActive(i)}
              className={`
                flex items-center gap-1.5 px-4 py-2.5 text-[0.875rem] font-medium border-b-2 -mb-px transition-colors
                ${active === i
                  ? 'border-[#0078ba] text-[#0078ba]'
                  : 'border-transparent text-[#6B7280] hover:text-[#374151] hover:border-[#D1D5DB]'
                }
              `}
            >
              {t.label}
              {t.count !== null && (
                <span className={`px-1.5 py-0.5 text-[0.625rem] font-bold rounded-full ${active === i ? 'bg-[#ddeef9] text-[#0078ba]' : 'bg-[#f3f3f3] text-[#6B7280]'}`}>
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="pt-4 text-[0.875rem] text-[#6B7280]">{tabs[active].label} content area</div>
      </div>
    );
  }

  if (variant === 'pill') {
    return (
      <div>
        <div className="inline-flex bg-[#f3f3f3] p-1 rounded-xl gap-1">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setActive(i)}
              className={`
                px-3 py-1.5 text-[0.8125rem] font-medium rounded-lg transition-all
                ${active === i ? 'bg-white text-[#00396b] shadow-sm' : 'text-[#6B7280] hover:text-[#374151]'}
              `}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="mt-4 text-[0.875rem] text-[#6B7280]">{tabs[active].label} content area</div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div>
        <div className="flex gap-1">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setActive(i)}
              className={`
                px-4 py-2 text-[0.875rem] font-medium rounded-t-lg border border-b-0 transition-colors
                ${active === i
                  ? 'bg-white text-[#00396b] border-[#E5E7EB] -mb-px z-10 relative'
                  : 'bg-[#f3f3f3] text-[#6B7280] border-transparent hover:bg-[#E5E7EB]'
                }
              `}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="bg-white border border-[#E5E7EB] rounded-b-xl rounded-tr-xl p-4 text-[0.875rem] text-[#6B7280]">
          {tabs[active].label} content area
        </div>
      </div>
    );
  }

  if (variant === 'icon') {
    return (
      <div>
        <div className="flex gap-1 bg-[#f3f3f3] p-1 rounded-xl">
          {tabs.map((t, i) => {
            const Icon = t.icon;
            return (
              <button
                key={t.label}
                onClick={() => setActive(i)}
                className={`
                  flex items-center gap-2 px-3 py-2 text-[0.8125rem] font-medium rounded-lg transition-all
                  ${active === i ? 'bg-white text-[#00396b] shadow-sm' : 'text-[#6B7280] hover:text-[#374151]'}
                `}
              >
                <Icon size={15} />
                <span className="hidden sm:inline">{t.label}</span>
                {t.count !== null && (
                  <span className={`px-1.5 py-0.5 text-[0.5625rem] font-bold rounded-full ${active === i ? 'bg-[#ddeef9] text-[#0078ba]' : 'bg-[#E5E7EB] text-[#6B7280]'}`}>
                    {t.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <div className="mt-3 text-[0.875rem] text-[#6B7280]">{tabs[active].label} content area</div>
      </div>
    );
  }

  return null;
}

export function TabsPaginationSection() {
  return (
    <SectionWrapper
      id="tabs-pagination"
      title="Tabs & Pagination"
      subtitle="Tabs organize related content into distinct views. Pagination enables navigation through large datasets without overwhelming the interface."
    >
      {/* Tabs */}
      <SubSection title="Tab Variants" description="Four tab styles for different contexts and visual hierarchy.">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {[
            { v: 'underline' as const, label: 'Underline Tabs', desc: 'Default. Use inside pages and panels for content sections.' },
            { v: 'pill' as const, label: 'Pill / Segment Tabs', desc: 'Use for toggle-style controls (e.g., chart type, time period).' },
            { v: 'card' as const, label: 'Card Tabs', desc: 'Traditional browser-style tabs for panel-based layouts.' },
            { v: 'icon' as const, label: 'Icon + Label Tabs', desc: 'Enhanced tabs with icons for dashboards and complex navigation.' },
          ].map(({ v, label, desc }) => (
            <div key={label} className="p-5 rounded-xl border border-[#E5E7EB] bg-white">
              <p className="text-[0.6875rem] font-semibold text-[#6B7280] uppercase tracking-wider mb-1">{label}</p>
              <p className="text-[0.75rem] text-[#9CA3AF] mb-4">{desc}</p>
              <DSTabs variant={v} />
            </div>
          ))}
        </div>
        <UsageNote>
          Use underline tabs as the default pattern. Switch to pill tabs when the control resembles a toggle or filter. Never use more than 7 tabs in a single tab group — use a dropdown overflow if needed.
        </UsageNote>
      </SubSection>

      {/* Pagination */}
      <SubSection title="Pagination Variants" description="Three pagination patterns for different data density and screen sizes.">
        <div className="space-y-5">
          <div className="p-5 rounded-xl border border-[#E5E7EB] bg-white">
            <p className="text-[0.6875rem] font-semibold text-[#6B7280] uppercase tracking-wider mb-4">Default — Full Featured</p>
            <DSPagination total={1247} perPage={10} variant="default" />
          </div>
          <div className="p-5 rounded-xl border border-[#E5E7EB] bg-white">
            <p className="text-[0.6875rem] font-semibold text-[#6B7280] uppercase tracking-wider mb-4">Compact — Page Numbers</p>
            <DSPagination total={1247} perPage={10} variant="compact" />
          </div>
          <div className="p-5 rounded-xl border border-[#E5E7EB] bg-white">
            <p className="text-[0.6875rem] font-semibold text-[#6B7280] uppercase tracking-wider mb-4">Simple — Prev / Next</p>
            <DSPagination total={1247} perPage={10} variant="simple" />
          </div>
        </div>
        <UsageNote>
          Use the full-featured pagination for complex data tables with filter/sort controls. Use simple prev/next for content-heavy pages like articles or reports. Always show total count for data transparency. Default page sizes: 10, 25, 50, 100.
        </UsageNote>
      </SubSection>
    </SectionWrapper>
  );
}