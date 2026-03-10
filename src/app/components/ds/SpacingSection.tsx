import React from 'react';
import { SectionWrapper, SubSection, UsageNote } from './SectionWrapper';

export function SpacingSection() {
  const spacingScale = [
    { token: '--ts-space-0',  value: '0px',   tailwind: 'p-0 / m-0',   use: 'No spacing' },
    { token: '--ts-space-1',  value: '4px',   tailwind: 'p-1 / m-1',   use: 'Inline icon gaps, tight badges' },
    { token: '--ts-space-2',  value: '8px',   tailwind: 'p-2 / m-2',   use: 'Compact elements, chip padding' },
    { token: '--ts-space-3',  value: '12px',  tailwind: 'p-3 / m-3',   use: 'Button padding, small card padding' },
    { token: '--ts-space-4',  value: '16px',  tailwind: 'p-4 / m-4',   use: 'Default padding, form field height' },
    { token: '--ts-space-5',  value: '20px',  tailwind: 'p-5 / m-5',   use: 'Card padding (sm), sidebar items' },
    { token: '--ts-space-6',  value: '24px',  tailwind: 'p-6 / m-6',   use: 'Card padding (default), section gaps' },
    { token: '--ts-space-8',  value: '32px',  tailwind: 'p-8 / m-8',   use: 'Section padding, panel spacing' },
    { token: '--ts-space-10', value: '40px',  tailwind: 'p-10 / m-10', use: 'Between major sections' },
    { token: '--ts-space-12', value: '48px',  tailwind: 'p-12 / m-12', use: 'Large section gaps' },
    { token: '--ts-space-16', value: '64px',  tailwind: 'p-16 / m-16', use: 'Hero padding, page-level spacing' },
    { token: '--ts-space-20', value: '80px',  tailwind: 'p-20 / m-20', use: 'Section breaks on landing pages' },
    { token: '--ts-space-24', value: '96px',  tailwind: 'p-24 / m-24', use: 'Marketing page maximum padding' },
  ];

  const breakpoints = [
    { name: 'Mobile',       bp: 'Default',  px: '< 640px',  cols: '4',  margin: '16px', gutter: '12px' },
    { name: 'Tablet',       bp: 'sm:',      px: '≥ 640px',  cols: '8',  margin: '24px', gutter: '16px' },
    { name: 'Tablet L',    bp: 'md:',      px: '≥ 768px',  cols: '8',  margin: '32px', gutter: '20px' },
    { name: 'Laptop',      bp: 'lg:',      px: '≥ 1024px', cols: '12', margin: '40px', gutter: '24px' },
    { name: 'Desktop',     bp: 'xl:',      px: '≥ 1280px', cols: '12', margin: '48px', gutter: '24px' },
    { name: 'Wide',        bp: '2xl:',     px: '≥ 1536px', cols: '12', margin: '64px', gutter: '32px' },
  ];

  const containerWidths = [
    { name: 'xs',       width: '480px',   use: 'Modals, confirmation dialogs' },
    { name: 'sm',       width: '640px',   use: 'Narrow forms, sidebars' },
    { name: 'md',       width: '768px',   use: 'Content articles, settings' },
    { name: 'lg',       width: '1024px',  use: 'App layouts with sidebars' },
    { name: 'xl',       width: '1280px',  use: 'Full-width dashboards' },
    { name: '2xl',      width: '1536px',  use: 'Wide-screen analytics views' },
    { name: 'max',      width: '1440px',  use: 'Default max-width for content' },
  ];

  return (
    <SectionWrapper
      id="spacing"
      title="Spacing & Layout"
      subtitle="TrueSight uses an 8pt base grid system. All spacing values are multiples of 4px (half-step) or 8px (full step), ensuring visual consistency across the entire product."
    >
      {/* 8pt Grid Visual */}
      <SubSection title="8-Point Base Grid">
        <div className="p-6 rounded-xl bg-[#ddeef9] border border-[#bdddf5]">
          <p className="text-[0.75rem] font-semibold text-[#00396b] uppercase tracking-wider mb-4">Visual Scale Reference</p>
          <div className="flex flex-wrap items-end gap-2">
            {[4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80].map(px => (
              <div key={px} className="flex flex-col items-center gap-1">
                <div
                  className="bg-[#0078ba] rounded"
                  style={{ width: `${Math.min(px * 1.5, 80)}px`, height: `${Math.min(px, 64)}px`, minWidth: '4px' }}
                />
                <span className="text-[0.5625rem] font-mono text-[#0078ba]">{px}px</span>
              </div>
            ))}
          </div>
        </div>
        <UsageNote>
          All spacing should come from the 8pt scale. Use 4px (half-step) only for micro-adjustments like icon gaps, label-to-input spacing, and badge padding.
        </UsageNote>
      </SubSection>

      {/* Spacing Scale Table */}
      <SubSection
        title="Spacing Scale"
        description="Complete token reference for padding, margin, and gap values."
      >
        <div className="rounded-xl border border-[#E5E7EB] overflow-hidden">
          <table className="w-full text-[0.8125rem]">
            <thead>
              <tr className="bg-[#F3F4F6] text-left">
                <th className="px-4 py-3 font-semibold text-[#374151]">Visual</th>
                <th className="px-4 py-3 font-semibold text-[#374151]">Token</th>
                <th className="px-4 py-3 font-semibold text-[#374151]">Value</th>
                <th className="px-4 py-3 font-semibold text-[#374151]">Tailwind</th>
                <th className="px-4 py-3 font-semibold text-[#374151] hidden md:table-cell">Usage</th>
              </tr>
            </thead>
            <tbody>
              {spacingScale.map((s, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f3f3f3]'}>
                  <td className="px-4 py-2.5">
                    <div
                      className="bg-[#0078ba] rounded"
                      style={{ width: `${Math.min(parseInt(s.value) * 1.5, 100)}px`, height: '10px', minWidth: '2px' }}
                    />
                  </td>
                  <td className="px-4 py-2.5 font-mono text-[#0078ba] text-[0.75rem]">{s.token}</td>
                  <td className="px-4 py-2.5 font-mono text-[#374151] font-semibold">{s.value}</td>
                  <td className="px-4 py-2.5 font-mono text-[#6B7280] text-[0.7rem]">{s.tailwind}</td>
                  <td className="px-4 py-2.5 text-[#6B7280] hidden md:table-cell">{s.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SubSection>

      {/* Grid System */}
      <SubSection
        title="Grid System"
        description="TrueSight uses a 12-column grid on desktop, 8-column on tablet, and 4-column on mobile."
      >
        {/* Desktop 12-col */}
        <div className="mb-4">
          <p className="text-[0.75rem] font-semibold text-[#6B7280] mb-2">Desktop — 12 Columns</p>
          <div className="grid grid-cols-12 gap-3 rounded-xl overflow-hidden">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-10 bg-[#bdddf5] rounded flex items-center justify-center">
                <span className="text-[0.5rem] font-semibold text-[#00396b]">{i + 1}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-12 gap-3">
            <div className="col-span-3 h-2 bg-[#0078ba] rounded opacity-40" />
            <div className="col-span-9 h-2 bg-[#5bb0e1] rounded opacity-40" />
          </div>
          <p className="text-[0.6875rem] text-[#6B7280] mt-1">Example: 3-col sidebar + 9-col content</p>
        </div>

        {/* Tablet 8-col */}
        <div className="mb-4">
          <p className="text-[0.75rem] font-semibold text-[#6B7280] mb-2">Tablet — 8 Columns</p>
          <div className="grid grid-cols-8 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-10 bg-[#E0F2FE] rounded flex items-center justify-center">
                <span className="text-[0.5rem] font-semibold text-[#0E7490]">{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile 4-col */}
        <div className="mb-4">
          <p className="text-[0.75rem] font-semibold text-[#6B7280] mb-2">Mobile — 4 Columns</p>
          <div className="grid grid-cols-4 gap-3 max-w-xs">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 bg-[#DCFCE7] rounded flex items-center justify-center">
                <span className="text-[0.5rem] font-semibold text-[#15803D]">{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </SubSection>

      {/* Breakpoints */}
      <SubSection
        title="Responsive Breakpoints"
        description="TrueSight follows Tailwind's breakpoint system with custom container widths."
      >
        <div className="rounded-xl border border-[#E5E7EB] overflow-hidden">
          <table className="w-full text-[0.8125rem]">
            <thead>
              <tr className="bg-[#F3F4F6] text-left">
                <th className="px-4 py-3 font-semibold text-[#374151]">Name</th>
                <th className="px-4 py-3 font-semibold text-[#374151]">Prefix</th>
                <th className="px-4 py-3 font-semibold text-[#374151]">Width</th>
                <th className="px-4 py-3 font-semibold text-[#374151]">Columns</th>
                <th className="px-4 py-3 font-semibold text-[#374151] hidden md:table-cell">Margin</th>
                <th className="px-4 py-3 font-semibold text-[#374151] hidden lg:table-cell">Gutter</th>
              </tr>
            </thead>
            <tbody>
              {breakpoints.map((b, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}>
                  <td className="px-4 py-2.5 font-semibold text-[#374151]">{b.name}</td>
                  <td className="px-4 py-2.5 font-mono text-[#0078ba] text-[0.75rem]">{b.bp}</td>
                  <td className="px-4 py-2.5 text-[#374151]">{b.px}</td>
                  <td className="px-4 py-2.5">
                    <span className="px-2 py-0.5 bg-[#ddeef9] text-[#0078ba] text-[0.6875rem] font-semibold rounded-full">
                      {b.cols} col
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-[#6B7280] hidden md:table-cell">{b.margin}</td>
                  <td className="px-4 py-2.5 text-[#6B7280] hidden lg:table-cell">{b.gutter}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SubSection>

      {/* Container Widths */}
      <SubSection title="Container Widths">
        <div className="space-y-3">
          {containerWidths.map((c, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-16 text-right">
                <span className="text-[0.75rem] font-mono text-[#0078ba] font-semibold">{c.name}</span>
              </div>
              <div className="flex-1 bg-[#f3f3f3] rounded h-8 relative overflow-hidden">
                <div
                  className="h-full bg-[#0078ba] rounded opacity-20"
                  style={{ width: `${(parseInt(c.width) / 1536) * 100}%`, minWidth: '10%' }}
                />
                <div
                  className="absolute inset-y-0 left-0 flex items-center px-3"
                  style={{ width: `${(parseInt(c.width) / 1536) * 100}%`, minWidth: '10%' }}
                >
                  <span className="text-[0.6875rem] font-mono text-[#00396b] font-semibold">{c.width}</span>
                </div>
              </div>
              <div className="w-52 hidden md:block">
                <span className="text-[0.6875rem] text-[#6B7280]">{c.use}</span>
              </div>
            </div>
          ))}
        </div>
        <UsageNote>
          All containers should be centered with auto margins. Use <code className="text-[#0078ba] font-mono">max-w-7xl mx-auto px-4 sm:px-6 lg:px-8</code> as the default page wrapper pattern.
        </UsageNote>
      </SubSection>
    </SectionWrapper>
  );
}