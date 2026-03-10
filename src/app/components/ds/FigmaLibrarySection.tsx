import React, { useState } from 'react';
import { SectionWrapper, SubSection, UsageNote, FigmaName } from './SectionWrapper';
import {
  Layers, Box, AlignLeft, Grid, Sliders, ChevronRight, Check,
  Copy, Eye, BookOpen, Figma, Package, GitBranch, Tag
} from 'lucide-react';

/* ─── Naming Convention Row ──────────────────────────────────────────────── */
function NamingRow({ category, component, variant, state, notes }: {
  category: string; component: string; variant?: string; state?: string; notes: string;
}) {
  const parts = [category, component, variant, state].filter(Boolean);
  return (
    <tr className="border-b border-[#f3f3f3] hover:bg-[#f3f3f3] group">
      <td className="px-4 py-3">
        <div className="flex items-center gap-1 flex-wrap">
          {parts.flatMap((p, i) => [
            <code key={`code-${i}`} className="text-[0.75rem] font-mono bg-[#ddeef9] text-[#0078ba] px-1.5 py-0.5 rounded">{p}</code>,
            ...(i < parts.length - 1 ? [<ChevronRight key={`sep-${i}`} size={10} className="text-[#9CA3AF]" />] : []),
          ])}
        </div>
      </td>
      <td className="px-4 py-3 text-[0.75rem] text-[#374151]">{category}</td>
      <td className="px-4 py-3 text-[0.75rem] text-[#6B7280]">{notes}</td>
    </tr>
  );
}

/* ─── Component Set Card ─────────────────────────────────────────────────── */
function ComponentSetCard({ name, variants, icon: Icon, color }: {
  name: string; variants: string[]; icon: React.ElementType; color: string;
}) {
  return (
    <div className="p-4 rounded-xl border border-[#E5E7EB] bg-white">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}18` }}>
          <Icon size={14} style={{ color }} />
        </div>
        <div>
          <p className="text-[0.8125rem] font-bold text-[#111827]">{name}</p>
          <p className="text-[0.625rem] text-[#9CA3AF]">{variants.length} variants</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {variants.map(v => (
          <span key={v} className="text-[0.5625rem] font-mono px-1.5 py-0.5 rounded bg-[#f3f3f3] text-[#6B7280] border border-[#E5E7EB]">
            {v}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Auto Layout Demo ────────────────────────────────────────────────────── */
function AutoLayoutDemo({ name, direction, gap, padding, children }: {
  name: string; direction: 'row' | 'column'; gap: string; padding: string; children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[#E5E7EB] overflow-hidden">
      <div className="px-3 py-2 bg-[#f3f3f3] border-b border-[#E5E7EB] flex items-center justify-between">
        <span className="text-[0.6875rem] font-semibold text-[#374151]">{name}</span>
        <div className="flex items-center gap-3">
          <span className="text-[0.5625rem] font-mono text-[#0078ba]">direction: {direction}</span>
          <span className="text-[0.5625rem] font-mono text-[#6B7280]">gap: {gap}</span>
          <span className="text-[0.5625rem] font-mono text-[#6B7280]">padding: {padding}</span>
        </div>
      </div>
      <div className={`p-4 flex ${direction === 'row' ? 'flex-row' : 'flex-col'} gap-3 bg-white`}>
        {children}
      </div>
    </div>
  );
}

export function FigmaLibrarySection() {
  const [activeTab, setActiveTab] = useState('naming');

  const tabs = [
    { id: 'naming', label: 'Naming Conventions' },
    { id: 'structure', label: 'Library Structure' },
    { id: 'autolayout', label: 'Auto Layout' },
    { id: 'publishing', label: 'Publishing' },
  ];

  const componentSets = [
    {
      name: 'Button',
      icon: Box,
      color: '#0078ba',
      variants: ['Primary/Default', 'Primary/Hover', 'Primary/Active', 'Primary/Disabled', 'Primary/Loading',
                 'Secondary/Default', 'Secondary/Hover', 'Ghost/Default', 'Ghost/Hover',
                 'Danger/Default', 'Danger/Hover', 'Outline/Default', 'Success/Default'],
    },
    {
      name: 'Input',
      icon: AlignLeft,
      color: '#00396b',
      variants: ['Text/Default', 'Text/Focus', 'Text/Error', 'Text/Disabled', 'Text/Filled',
                 'Search/Default', 'Search/Active', 'Select/Default', 'Select/Open', 'Select/Disabled'],
    },
    {
      name: 'Navigation / Sidebar',
      icon: Layers,
      color: '#5bb0e1',
      variants: ['Item/Default', 'Item/Hover', 'Item/Active', 'Item/Disabled',
                 'Nav/Expanded', 'Nav/Collapsed'],
    },
    {
      name: 'Card',
      icon: Grid,
      color: '#16A34A',
      variants: ['Stat/Default', 'Stat/Positive', 'Stat/Negative',
                 'Data/Default', 'Data/Highlighted',
                 'Action/Default', 'Action/Hover'],
    },
    {
      name: 'Badge / Chip',
      icon: Tag,
      color: '#D97706',
      variants: ['Status/Success', 'Status/Warning', 'Status/Error', 'Status/Info', 'Status/Neutral',
                 'Chip/Rounded', 'Chip/Bordered', 'Chip/Removable'],
    },
    {
      name: 'Avatar',
      icon: Package,
      color: '#DC2626',
      variants: ['Image/SM', 'Image/MD', 'Image/LG', 'Image/XL',
                 'Initials/SM', 'Initials/MD', 'Initials/LG',
                 'Group/2', 'Group/3', 'Group/4+'],
    },
  ];

  const namingRows = [
    { category: 'Button', component: 'Primary', variant: 'Default', notes: 'Resting state, no interaction' },
    { category: 'Button', component: 'Primary', variant: 'Hover', notes: 'Cursor over element' },
    { category: 'Button', component: 'Primary', variant: 'Active', notes: 'Mouse pressed / touch' },
    { category: 'Button', component: 'Primary', variant: 'Disabled', notes: 'Non-interactive, 40% opacity' },
    { category: 'Button', component: 'Primary', variant: 'Loading', notes: 'Async action in progress' },
    { category: 'Button', component: 'Secondary', variant: 'Default', notes: 'Medium-emphasis action' },
    { category: 'Button', component: 'Danger', variant: 'Default', notes: 'Destructive action warning' },
    { category: 'Input', component: 'Text', variant: 'Default', notes: 'Empty, unfocused input' },
    { category: 'Input', component: 'Text', variant: 'Focus', notes: 'Keyboard focus / active typing' },
    { category: 'Input', component: 'Text', variant: 'Error', notes: 'Validation failed state' },
    { category: 'Input', component: 'Search', variant: 'Default', notes: 'Search field variant' },
    { category: 'Navigation', component: 'Sidebar', variant: 'Expanded', notes: 'Full-width sidebar with labels' },
    { category: 'Navigation', component: 'Sidebar', variant: 'Collapsed', notes: 'Icon-only compact mode' },
    { category: 'Navigation', component: 'Item', variant: 'Active', notes: 'Currently selected nav item' },
    { category: 'Card', component: 'Stat', variant: 'Positive', notes: 'KPI card with upward trend' },
    { category: 'Badge', component: 'Status', variant: 'Success', notes: 'Approved / active state' },
    { category: 'Modal', component: 'Dialog', variant: 'Default', notes: 'Standard confirmation dialog' },
    { category: 'Modal', component: 'Upload', variant: 'Idle', notes: 'Document upload dropzone' },
  ];

  return (
    <SectionWrapper
      id="figma-library"
      title="Figma Library"
      subtitle="A structured guide to converting this design system into a publishable Figma component library with standardized naming conventions, component sets, auto layout, and variant organization."
    >
      {/* Tab Navigation */}
      <div className="border-b border-[#E5E7EB] mb-8">
        <div className="flex items-center gap-0 overflow-x-auto">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-3 text-[0.875rem] font-medium border-b-2 whitespace-nowrap transition-colors ${
                activeTab === t.id
                  ? 'border-[#0078ba] text-[#0078ba]'
                  : 'border-transparent text-[#6B7280] hover:text-[#374151] hover:border-[#D1D5DB]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Naming Conventions Tab ── */}
      {activeTab === 'naming' && (
        <div>
          <SubSection
            title="Component Naming Convention"
            description="All components follow a consistent slash-separated hierarchy: Category / Variant / State. This maps directly to Figma's component naming and property system."
          >
            {/* Visual formula */}
            <div className="mb-6 p-5 rounded-xl bg-[#ddeef9] border border-[#bdddf5]">
              <p className="text-[0.75rem] font-bold text-[#00396b] uppercase tracking-wider mb-3">Naming Formula</p>
              <div className="flex items-center gap-2 flex-wrap mb-3">
                {['Component', '/', 'Variant', '/', 'State'].map((part, i) => (
                  part === '/' ? (
                    <ChevronRight key={i} size={16} className="text-[#9CA3AF]" />
                  ) : (
                    <div key={i} className="px-3 py-2 rounded-lg bg-white border border-[#bdddf5] text-center min-w-[90px]">
                      <p className="text-[0.625rem] font-bold text-[#9CA3AF] uppercase mb-0.5">
                        {i === 0 ? 'CATEGORY' : i === 2 ? 'VARIANT' : 'STATE'}
                      </p>
                      <p className="text-[0.875rem] font-bold text-[#00396b]">{part}</p>
                    </div>
                  )
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                {[
                  { example: 'Button / Primary / Default', desc: 'Category → Variant → State' },
                  { example: 'Input / Text / Error', desc: 'Category → Type → State' },
                  { example: 'Navigation / Sidebar / Collapsed', desc: 'Category → Sub → Mode' },
                ].map(ex => (
                  <div key={ex.example} className="p-2.5 rounded-lg bg-white border border-[#bdddf5]">
                    <p className="text-[0.6875rem] font-mono text-[#0078ba] mb-0.5">{ex.example}</p>
                    <p className="text-[0.5625rem] text-[#9CA3AF]">{ex.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Naming table */}
            <div className="rounded-xl border border-[#E5E7EB] overflow-hidden">
              <table className="w-full text-[0.8125rem]">
                <thead>
                  <tr className="bg-[#f3f3f3] text-left">
                    <th className="px-4 py-3 font-semibold text-[#374151]">Full Component Name</th>
                    <th className="px-4 py-3 font-semibold text-[#374151]">Category</th>
                    <th className="px-4 py-3 font-semibold text-[#374151]">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {namingRows.map((row, i) => (
                    <NamingRow key={i} {...row} />
                  ))}
                </tbody>
              </table>
            </div>

            <UsageNote>
              Use forward slashes (/) in Figma component names to create automatic grouping in the Assets panel. State names should always be title-cased: Default, Hover, Active, Disabled, Focus, Error, Loading. Never abbreviate state names.
            </UsageNote>
          </SubSection>

          <SubSection title="Variant Properties" description="Each component set uses consistent Figma variant properties for easy configuration.">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { prop: 'Variant', values: ['Primary', 'Secondary', 'Ghost', 'Danger', 'Outline', 'Success'], color: '#0078ba' },
                { prop: 'Size', values: ['XS', 'SM', 'MD', 'LG', 'XL'], color: '#00396b' },
                { prop: 'State', values: ['Default', 'Hover', 'Active', 'Focus', 'Disabled', 'Loading', 'Error'], color: '#5bb0e1' },
                { prop: 'Icon', values: ['None', 'Left', 'Right', 'Only'], color: '#16A34A' },
              ].map(p => (
                <div key={p.prop} className="p-3 rounded-xl border border-[#E5E7EB] bg-white">
                  <p className="text-[0.6875rem] font-bold uppercase tracking-wider mb-2" style={{ color: p.color }}>
                    Property: {p.prop}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {p.values.map(v => (
                      <span key={v} className="text-[0.5625rem] font-mono px-1.5 py-0.5 rounded border" style={{ borderColor: `${p.color}40`, color: p.color, backgroundColor: `${p.color}0d` }}>
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SubSection>
        </div>
      )}

      {/* ── Library Structure Tab ── */}
      {activeTab === 'structure' && (
        <div>
          <SubSection
            title="File Organization"
            description="The Figma library file is organized into pages, each containing a specific category of components. This mirrors the web documentation structure."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                {
                  page: '🎨 Foundations',
                  sections: ['Color Styles', 'Text Styles', 'Spacing Tokens', 'Shadow Styles', 'Border Styles'],
                  color: '#0078ba',
                },
                {
                  page: '🔘 Inputs',
                  sections: ['Button', 'Input / Text', 'Input / Search', 'Input / Select', 'Checkbox', 'Radio', 'Toggle', 'Slider'],
                  color: '#00396b',
                },
                {
                  page: '🧭 Navigation',
                  sections: ['Sidebar / Nav', 'Top Navigation', 'Breadcrumbs', 'Tab Bar', 'Menu / Item', 'Divider'],
                  color: '#5bb0e1',
                },
                {
                  page: '💬 Feedback',
                  sections: ['Modal / Dialog', 'Modal / Upload', 'Alert / Inline', 'Toast', 'Tooltip', 'Badge / Status'],
                  color: '#D97706',
                },
                {
                  page: '📊 Data Display',
                  sections: ['Card / Stat', 'Card / Data', 'Table', 'Tabs', 'Pagination', 'Chip', 'Avatar', 'Avatar Group'],
                  color: '#16A34A',
                },
                {
                  page: '📐 Layout',
                  sections: ['Grid System', 'Page Shell', 'Section Container', 'Spacing Scale', 'Breakpoints'],
                  color: '#DC2626',
                },
              ].map(p => (
                <div key={p.page} className="p-4 rounded-xl border border-[#E5E7EB] bg-white">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                    <p className="text-[0.875rem] font-bold text-[#111827]">{p.page}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {p.sections.map(s => (
                      <span key={s} className="text-[0.5625rem] px-1.5 py-0.5 rounded border font-mono" style={{ borderColor: `${p.color}40`, color: p.color, backgroundColor: `${p.color}0d` }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SubSection>

          <SubSection title="Component Sets" description="Each component is built as a Figma Component Set with all variants in a single frame.">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {componentSets.map(cs => (
                <ComponentSetCard key={cs.name} {...cs} />
              ))}
            </div>
            <UsageNote>
              Each Component Set should have a clear base component (Default state) from which all other variants branch. Use Figma's "Edit component" feature to maintain a single source of truth, and always detach from the main component before making one-off customizations.
            </UsageNote>
          </SubSection>

          <SubSection title="Foundations Page" description="Colors, typography, spacing, and effects are defined as Figma Styles for easy global updates.">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: 'Color Styles',
                  items: ['Primary/Navy (#00396b)', 'Primary/Blue600 (#0078ba)', 'Secondary/Blue (#5bb0e1)', 'Background/Grey (#f3f3f3)', 'Semantic/Success', 'Semantic/Warning', 'Semantic/Error'],
                  icon: '🎨',
                },
                {
                  title: 'Text Styles',
                  items: ['Display / 3rem / 800', 'H1 / 2.25rem / 700', 'H2 / 1.875rem / 700', 'H3 / 1.5rem / 600', 'Body / 0.9375rem / 400', 'Caption / 0.75rem / 400'],
                  icon: '🔤',
                },
                {
                  title: 'Effect Styles',
                  items: ['Shadow/XS', 'Shadow/SM', 'Shadow/MD', 'Shadow/LG', 'Shadow/XL', 'Shadow/Inner'],
                  icon: '✨',
                },
                {
                  title: 'Grid Styles',
                  items: ['Grid/Mobile (4col/16px)', 'Grid/Tablet (8col/24px)', 'Grid/Desktop (12col/32px)', 'Grid/Wide (12col/40px)'],
                  icon: '📐',
                },
              ].map(s => (
                <div key={s.title} className="p-4 rounded-xl border border-[#E5E7EB] bg-white">
                  <p className="text-[0.875rem] font-bold text-[#111827] mb-3">{s.icon} {s.title}</p>
                  <ul className="space-y-1">
                    {s.items.map(item => (
                      <li key={item} className="flex items-center gap-2 text-[0.6875rem] text-[#6B7280]">
                        <Check size={10} className="text-[#0078ba] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </SubSection>
        </div>
      )}

      {/* ── Auto Layout Tab ── */}
      {activeTab === 'autolayout' && (
        <div>
          <SubSection
            title="Auto Layout Principles"
            description="Every component in the TrueSight Figma library uses Auto Layout. This ensures components scale correctly with content and maintain spacing tokens."
          >
            <div className="mb-6 p-5 rounded-xl bg-[#ddeef9] border border-[#bdddf5]">
              <p className="text-[0.75rem] font-bold text-[#00396b] uppercase tracking-wider mb-3">Core Auto Layout Rules</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { rule: 'All components use Auto Layout', detail: 'No fixed-size frames — let content drive size' },
                  { rule: 'Use spacing tokens for gaps', detail: 'Map to --ts-space-N values (4, 8, 12, 16, 24, 32px)' },
                  { rule: 'Horizontal fill for inputs', detail: 'Text inputs stretch to fill parent container' },
                  { rule: 'Hug content for buttons', detail: 'Buttons size to their label + icon content' },
                  { rule: 'Fixed size for icons', detail: 'Icons are always fixed 14px, 16px, 18px, or 20px' },
                  { rule: 'Min/Max width on inputs', detail: 'Min-width: 120px, Max-width: defined per context' },
                ].map(r => (
                  <div key={r.rule} className="flex items-start gap-2 p-2.5 bg-white rounded-lg border border-[#bdddf5]">
                    <Check size={12} className="text-[#0078ba] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[0.75rem] font-semibold text-[#00396b]">{r.rule}</p>
                      <p className="text-[0.625rem] text-[#9CA3AF]">{r.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <AutoLayoutDemo name="Button — Hug × Hug" direction="row" gap="8px" padding="8px 16px">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-[0.875rem] font-medium" style={{ background: '#0078ba' }}>
                <div className="w-4 h-4 bg-white/30 rounded" />
                <span>Add Claim</span>
              </div>
              <div className="flex flex-col gap-1 justify-center">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#0078ba]" />
                  <span className="text-[0.625rem] text-[#6B7280]">direction: horizontal</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#5bb0e1]" />
                  <span className="text-[0.625rem] text-[#6B7280]">sizing: hug × hug</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#00396b]" />
                  <span className="text-[0.625rem] text-[#6B7280]">align: center</span>
                </div>
              </div>
            </AutoLayoutDemo>

            <div className="mt-4">
              <AutoLayoutDemo name="Input — Fill × Fixed" direction="row" gap="8px" padding="8px 12px">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#E5E7EB] bg-white flex-1 text-[0.875rem]">
                  <div className="w-4 h-4 bg-[#f3f3f3] rounded" />
                  <span className="text-[#9CA3AF]">Search claims...</span>
                  <div className="ml-auto w-4 h-4 bg-[#f3f3f3] rounded" />
                </div>
                <div className="flex flex-col gap-1 justify-center">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#0078ba]" />
                    <span className="text-[0.625rem] text-[#6B7280]">width: fill container</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#5bb0e1]" />
                    <span className="text-[0.625rem] text-[#6B7280]">height: fixed 36px</span>
                  </div>
                </div>
              </AutoLayoutDemo>
            </div>

            <div className="mt-4">
              <AutoLayoutDemo name="Card — Fill × Hug" direction="column" gap="16px" padding="24px">
                <div className="p-4 rounded-xl border border-[#E5E7EB] bg-white flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-[#ddeef9]" />
                    <div className="w-12 h-4 rounded bg-[#f3f3f3]" />
                  </div>
                  <div className="w-20 h-7 rounded bg-[#f3f3f3] mb-1" />
                  <div className="w-32 h-3 rounded bg-[#f3f3f3]" />
                </div>
                <div className="flex flex-col gap-1 justify-center">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#0078ba]" />
                    <span className="text-[0.625rem] text-[#6B7280]">width: fill container</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#5bb0e1]" />
                    <span className="text-[0.625rem] text-[#6B7280]">height: hug contents</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#00396b]" />
                    <span className="text-[0.625rem] text-[#6B7280]">padding: 24px</span>
                  </div>
                </div>
              </AutoLayoutDemo>
            </div>

            <UsageNote>
              Never use "Fixed" sizing for text elements — always use "Hug" so text can grow. Use "Fill" for elements that should stretch to available space. Apply clip content on cards and modals to prevent overflow.
            </UsageNote>
          </SubSection>

          <SubSection title="Spacing Scale in Auto Layout" description="Always use these gap/padding values mapped to the spacing scale.">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
              {[
                { value: 4, token: '--ts-space-1', use: 'Icon gap' },
                { value: 8, token: '--ts-space-2', use: 'Compact' },
                { value: 12, token: '--ts-space-3', use: 'Small' },
                { value: 16, token: '--ts-space-4', use: 'Default' },
                { value: 24, token: '--ts-space-6', use: 'Card pad' },
                { value: 32, token: '--ts-space-8', use: 'Section' },
                { value: 48, token: '--ts-space-12', use: 'Large gap' },
                { value: 64, token: '--ts-space-16', use: 'Hero' },
              ].map(s => (
                <div key={s.value} className="p-2 rounded-lg border border-[#E5E7EB] bg-white text-center">
                  <div className="w-full bg-[#ddeef9] rounded mb-2" style={{ height: `${Math.min(s.value, 32)}px` }} />
                  <p className="text-[0.75rem] font-bold text-[#00396b]">{s.value}px</p>
                  <p className="text-[0.5rem] font-mono text-[#9CA3AF] mt-0.5">{s.use}</p>
                </div>
              ))}
            </div>
          </SubSection>
        </div>
      )}

      {/* ── Publishing Tab ── */}
      {activeTab === 'publishing' && (
        <div>
          <SubSection
            title="Publishing Checklist"
            description="Complete these steps before publishing the TrueSight component library to your Figma organization."
          >
            <div className="space-y-3">
              {[
                {
                  category: 'Foundations',
                  items: [
                    'All brand colors added as Color Styles (#00396b, #0078ba, #5bb0e1, #f3f3f3)',
                    'Website gradient saved: linear-gradient(173deg, #0078ba 0%, #00386f 73%)',
                    'All text styles created using Inter font family',
                    'Shadow and effect styles defined',
                    'Grid and layout styles created for 3 breakpoints',
                  ],
                  color: '#0078ba',
                },
                {
                  category: 'Components',
                  items: [
                    'All components use Auto Layout (no fixed frames with manual spacing)',
                    'Every component has a Default state as the base variant',
                    'Component names follow: Category / Variant / State convention',
                    'All states documented: Default, Hover, Active, Disabled, Focus',
                    'Interactive components have all required variants',
                    'Responsive behavior documented in component description',
                  ],
                  color: '#00396b',
                },
                {
                  category: 'Accessibility',
                  items: [
                    'All text/background combinations verified for WCAG 2.1 AA (4.5:1 minimum)',
                    'Focus states visible on all interactive components',
                    'Error states include icon + text (not color alone)',
                    'Component descriptions include accessibility notes',
                  ],
                  color: '#5bb0e1',
                },
                {
                  category: 'Library Settings',
                  items: [
                    'File named: "TrueSight · Design System · v2.5"',
                    'All components in a single "Components" section per page',
                    'Cover page created with version number and brand gradient',
                    'Library published to team/organization',
                    'Version changelog maintained in "Changelog" page',
                  ],
                  color: '#16A34A',
                },
              ].map(section => (
                <div key={section.category} className="rounded-xl border border-[#E5E7EB] overflow-hidden">
                  <div className="px-4 py-2.5 flex items-center gap-2" style={{ backgroundColor: `${section.color}12` }}>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: section.color }} />
                    <p className="text-[0.8125rem] font-bold" style={{ color: section.color }}>{section.category}</p>
                  </div>
                  <div className="p-4 bg-white space-y-2">
                    {section.items.map(item => (
                      <div key={item} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded border-2 border-[#E5E7EB] flex-shrink-0 mt-0.5" />
                        <p className="text-[0.8125rem] text-[#374151]">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <UsageNote>
              After publishing, notify your team via Slack or email. Include a link to the Figma file and a brief changelog summary. Bump the version number (e.g., v2.5 → v2.6) for any breaking changes to existing components.
            </UsageNote>
          </SubSection>

          <SubSection title="Version History" description="Track changes using semantic versioning in the Figma file name and a dedicated Changelog page.">
            <div className="rounded-xl border border-[#E5E7EB] overflow-hidden">
              <table className="w-full text-[0.8125rem]">
                <thead>
                  <tr className="bg-[#f3f3f3] text-left">
                    <th className="px-4 py-3 font-semibold text-[#374151]">Version</th>
                    <th className="px-4 py-3 font-semibold text-[#374151]">Change Type</th>
                    <th className="px-4 py-3 font-semibold text-[#374151]">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { v: 'v2.5.0', type: 'Major', desc: 'Updated brand colors to accurate website values (#00396b, #5bb0e1, #f3f3f3). Added website gradient.' },
                    { v: 'v2.4.0', type: 'Minor', desc: 'Added Chips, Avatars, Search Bar, Slider, Dividers, Menu Items, Upload Modal components.' },
                    { v: 'v2.3.0', type: 'Minor', desc: 'Added Color Gradients section, improved modal components with headers.' },
                    { v: 'v2.0.0', type: 'Major', desc: 'Initial comprehensive design system with Foundations, Inputs, Navigation, Feedback, Data Display.' },
                  ].map(row => (
                    <tr key={row.v} className="border-b border-[#f3f3f3] hover:bg-[#f3f3f3]">
                      <td className="px-4 py-3 font-mono text-[0.75rem] text-[#0078ba] font-bold">{row.v}</td>
                      <td className="px-4 py-3">
                        <span className={`px-1.5 py-0.5 rounded text-[0.5625rem] font-bold uppercase ${row.type === 'Major' ? 'bg-[#ddeef9] text-[#0078ba]' : 'bg-[#DCFCE7] text-[#16A34A]'}`}>
                          {row.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[0.75rem] text-[#6B7280]">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SubSection>
        </div>
      )}
    </SectionWrapper>
  );
}