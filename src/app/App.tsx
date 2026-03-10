import React, { useState, useEffect, useCallback } from 'react';
import {
  Activity, Palette, Type, LayoutGrid, DollarSign, Square, PenLine,
  Navigation2, CreditCard, Table, Layers, Bell, Hash, Menu, X, ChevronRight,
  Search, ExternalLink, Tag, Users, Minus, SlidersHorizontal, Figma
} from 'lucide-react';

import { OverviewSection }       from './components/ds/OverviewSection';
import { TokensSection }         from './components/ds/TokensSection';
import { ColorSection }          from './components/ds/ColorSection';
import { TypographySection }     from './components/ds/TypographySection';
import { SpacingSection }        from './components/ds/SpacingSection';
import { ButtonsSection }        from './components/ds/ButtonsSection';
import { FormsSection }          from './components/ds/FormsSection';
import { NavigationSection }     from './components/ds/NavigationSection';
import { CardsSection }          from './components/ds/CardsSection';
import { TablesSection }         from './components/ds/TablesSection';
import { ModalsAlertsSection }   from './components/ds/ModalsAlertsSection';
import { TabsPaginationSection } from './components/ds/TabsPaginationSection';
import { IconsSection }          from './components/ds/IconsSection';
import { ChipsSection }          from './components/ds/ChipsSection';
import { AvatarsSection }        from './components/ds/AvatarsSection';
import { DividersMenuSection }   from './components/ds/DividersMenuSection';
import { FigmaLibrarySection }   from './components/ds/FigmaLibrarySection';
import { DataVizSection }        from './components/ds/DataVizSection';
import { PatternsSection }       from './components/ds/PatternsSection';
import { AccessibilitySection }  from './components/ds/AccessibilitySection';

/* ─── Nav structure ──────────────────────────────────────────────────────── */
interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  group: string;
  badge?: string;
}

const navItems: NavItem[] = [
  // Introduction
  { id: 'overview',        label: 'Overview',          icon: Activity,        group: 'Introduction' },

  // Foundation
  { id: 'tokens',          label: 'Design Tokens',     icon: DollarSign,      group: 'Foundation' },
  { id: 'colors',          label: 'Color System',      icon: Palette,         group: 'Foundation' },
  { id: 'typography',      label: 'Typography',        icon: Type,            group: 'Foundation' },
  { id: 'spacing',         label: 'Spacing & Layout',  icon: LayoutGrid,      group: 'Foundation' },

  // Figma Library
  { id: 'figma-library',   label: 'Figma Library',     icon: Figma,           group: 'Figma Library', badge: 'New' },

  // Inputs
  { id: 'buttons',         label: 'Buttons',           icon: Square,          group: 'Inputs' },
  { id: 'forms',           label: 'Forms & Inputs',    icon: PenLine,         group: 'Inputs', badge: 'Search · Slider' },

  // Navigation
  { id: 'navigation',      label: 'Navigation',        icon: Navigation2,     group: 'Navigation' },
  { id: 'menus-dividers',  label: 'Menus & Dividers',  icon: Minus,           group: 'Navigation' },

  // Feedback
  { id: 'modals',          label: 'Modals & Alerts',   icon: Bell,            group: 'Feedback', badge: 'Upload' },

  // Data Display
  { id: 'cards',           label: 'Cards',             icon: CreditCard,      group: 'Data Display' },
  { id: 'tables',          label: 'Tables',            icon: Table,           group: 'Data Display' },
  { id: 'tabs-pagination', label: 'Tabs & Pagination', icon: Layers,          group: 'Data Display' },
  { id: 'chips',           label: 'Chips & Tags',      icon: Tag,             group: 'Data Display', badge: 'New' },
  { id: 'avatars',         label: 'Avatars',           icon: Users,           group: 'Data Display', badge: 'New' },
  { id: 'data-viz',        label: 'Data Visualization',icon: SlidersHorizontal, group: 'Data Display', badge: 'Charts' },

  // Patterns
  { id: 'patterns',        label: 'UI Patterns',       icon: LayoutGrid,      group: 'Patterns',     badge: 'New' },
  { id: 'accessibility',   label: 'Accessibility',     icon: Activity,        group: 'Patterns',     badge: 'WCAG' },

  // Assets
  { id: 'icons',           label: 'Icon System',       icon: Hash,            group: 'Assets' },
];

const groups = ['Introduction', 'Foundation', 'Figma Library', 'Inputs', 'Navigation', 'Feedback', 'Data Display', 'Patterns', 'Assets'];

const groupColors: Record<string, string> = {
  Introduction:   '#0078ba',
  Foundation:     '#5bb0e1',
  'Figma Library':'#A259FF',
  Inputs:         '#16A34A',
  Navigation:     '#D97706',
  Feedback:       '#DC2626',
  'Data Display': '#8B5CF6',
  Patterns:       '#0D9488',
  Assets:         '#6B7280',
};

/* ─── Sidebar ────────────────────────────────────────────────────────────── */
function Sidebar({
  activeSection, searchQ, setSearchQ, filteredNav, groupedNav,
  scrollToSection, setMobileOpen,
}: {
  activeSection: string;
  searchQ: string;
  setSearchQ: (q: string) => void;
  filteredNav: NavItem[];
  groupedNav: Record<string, NavItem[]>;
  scrollToSection: (id: string) => void;
  setMobileOpen: (v: boolean) => void;
}) {
  return (
    <aside className="flex flex-col h-full w-64 flex-shrink-0" style={{ background: 'linear-gradient(180deg, #001a33 0%, #00396b 100%)' }}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-[#004d8f]/60">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(173deg, #0078ba 0%, #00386f 73%)' }}
        >
          <Activity size={15} className="text-white" />
        </div>
        <div>
          <p className="text-white font-bold leading-tight" style={{ fontSize: '0.9375rem' }}>TrueSight</p>
          <p className="text-[#5bb0e1] font-semibold uppercase tracking-wider" style={{ fontSize: '0.5625rem' }}>Design System v2.5</p>
        </div>
        <button
          className="ml-auto p-1 rounded text-[#99cceb] hover:text-white lg:hidden transition-colors"
          onClick={() => setMobileOpen(false)}
        >
          <X size={16} />
        </button>
      </div>

      {/* Search */}
      <div className="px-3 py-3 border-b border-[#004d8f]/60">
        <div className="flex items-center gap-2 bg-[#004d8f]/70 rounded-lg px-3 py-1.5">
          <Search size={12} className="text-[#5bb0e1] flex-shrink-0" />
          <input
            type="text"
            placeholder="Search sections..."
            value={searchQ}
            onChange={e => setSearchQ(e.target.value)}
            className="bg-transparent text-[#99cceb] placeholder:text-[#5bb0e1] outline-none w-full"
            style={{ fontSize: '0.75rem' }}
          />
          {searchQ && (
            <button onClick={() => setSearchQ('')} className="text-[#5bb0e1] hover:text-[#99cceb] transition-colors">
              <X size={10} />
            </button>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
        {Object.entries(groupedNav).map(([group, items]) => (
          <div key={group} className="mb-3">
            {/* Group label with color dot */}
            <div className="flex items-center gap-2 px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: groupColors[group] }} />
              <p className="font-bold uppercase tracking-widest" style={{ fontSize: '0.5rem', color: groupColors[group] }}>
                {group}
              </p>
            </div>

            {items.map(item => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium transition-all mb-0.5 text-left group
                    ${isActive
                      ? 'text-white shadow-md'
                      : 'text-[#99cceb] hover:bg-[#004d8f]/60 hover:text-white'
                    }
                  `}
                  style={{
                    fontSize: '0.8125rem',
                    backgroundColor: isActive ? '#0078ba' : undefined,
                  }}
                >
                  <Icon size={14} className="flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.badge && !isActive && (
                    <span className="text-[0.5rem] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ backgroundColor: `${groupColors[item.group]}22`, color: groupColors[item.group] }}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight size={12} className="ml-auto opacity-60 flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        ))}
        {/* Empty search state — only shown when search yields no results */}
        {filteredNav.length === 0 && (
          <p className="px-3 py-4 text-center text-[#5bb0e1]" style={{ fontSize: '0.75rem' }}>
            No sections match "{searchQ}".
          </p>
        )}
      </nav>

      {/* Brand colors footer */}
      <div className="px-4 py-3 border-t border-[#004d8f]/60">
        <div className="flex items-center gap-1.5 mb-2">
          {['#00396b', '#0078ba', '#5bb0e1', '#f3f3f3'].map(c => (
            <div key={c} className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: c }} title={c} />
          ))}
          <span className="text-[#5bb0e1] ml-1" style={{ fontSize: '0.5625rem' }}>Brand Colors</span>
        </div>
        <div className="flex items-center justify-between" style={{ fontSize: '0.625rem' }}>
          <span className="font-mono text-[#5bb0e1]">v2.5 · {navItems.length} sections</span>
          <a href="https://lucide.dev" target="_blank" rel="noreferrer"
            className="flex items-center gap-1 text-[#5bb0e1] hover:text-[#99cceb] transition-colors">
            Lucide <ExternalLink size={9} />
          </a>
        </div>
      </div>
    </aside>
  );
}

/* ─── App ────────────────────────────────────────────────────────────────── */
export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [searchQ, setSearchQ]             = useState('');

  const filteredNav = navItems.filter(item =>
    item.label.toLowerCase().includes(searchQ.toLowerCase()) ||
    (item.badge || '').toLowerCase().includes(searchQ.toLowerCase())
  );

  const groupedNav = groups.reduce<Record<string, NavItem[]>>((acc, group) => {
    const items = filteredNav.filter(item => item.group === group);
    if (items.length > 0) acc[group] = items;
    return acc;
  }, {});

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
      setMobileOpen(false);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { root: null, rootMargin: '-10% 0px -80% 0px', threshold: 0 }
    );
    navItems.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const sidebarProps = { activeSection, searchQ, setSearchQ, filteredNav, groupedNav, scrollToSection, setMobileOpen };
  const currentSection = navItems.find(n => n.id === activeSection);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#f3f3f3', fontFamily: 'Inter, sans-serif' }}>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col h-full shadow-xl">
        <Sidebar {...sidebarProps} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative flex flex-col">
            <Sidebar {...sidebarProps} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center gap-3 px-4 sm:px-6 py-3 bg-white border-b border-[#E5E7EB] flex-shrink-0 shadow-sm">
          <button
            className="lg:hidden p-2 rounded-lg text-[#6B7280] hover:bg-[#f3f3f3] transition-colors"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={18} />
          </button>

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 min-w-0" style={{ fontSize: '0.8125rem' }}>
            <span className="text-[#9CA3AF]">TrueSight DS</span>
            <ChevronRight size={13} className="text-[#D1D5DB] flex-shrink-0" />
            {currentSection && (
              <>
                <span className="text-[#9CA3AF] hidden sm:inline">{currentSection.group}</span>
                <ChevronRight size={13} className="text-[#D1D5DB] flex-shrink-0 hidden sm:inline" />
              </>
            )}
            <span className="text-[#374151] font-medium truncate">
              {currentSection?.label || 'Overview'}
            </span>
          </nav>

          {/* Right badges */}
          <div className="ml-auto flex items-center gap-2 flex-shrink-0">
            {/* Group color indicator */}
            {currentSection && (
              <span
                className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider"
                style={{
                  backgroundColor: `${groupColors[currentSection.group]}15`,
                  color: groupColors[currentSection.group],
                  fontSize: '0.5625rem',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: groupColors[currentSection.group] }} />
                {currentSection.group}
              </span>
            )}
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#DCFCE7] text-[#16A34A] rounded-full font-bold uppercase tracking-wider" style={{ fontSize: '0.5625rem' }}>
              <span className="w-1.5 h-1.5 bg-[#16A34A] rounded-full animate-pulse" />
              WCAG 2.1 AA
            </span>
            {/* Brand color dots */}
            <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-[#f3f3f3] rounded-full border border-[#E5E7EB]">
              {['#00396b', '#0078ba', '#5bb0e1'].map(c => (
                <div key={c} className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} title={c} />
              ))}
            </div>
            <span className="px-2 py-1 bg-[#ddeef9] text-[#0078ba] font-mono font-semibold rounded" style={{ fontSize: '0.6875rem' }}>v2.5.0</span>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

            {/* ── Introduction ── */}
            <OverviewSection />

            {/* ── Foundation ── */}
            <TokensSection />
            <ColorSection />
            <TypographySection />
            <SpacingSection />

            {/* ── Figma Library ── */}
            <FigmaLibrarySection />

            {/* ── Inputs ── */}
            <ButtonsSection />
            <FormsSection />

            {/* ── Navigation ── */}
            <NavigationSection />
            <DividersMenuSection />

            {/* ── Feedback ── */}
            <ModalsAlertsSection />

            {/* ── Data Display ── */}
            <CardsSection />
            <TablesSection />
            <TabsPaginationSection />
            <ChipsSection />
            <AvatarsSection />
            <DataVizSection />

            {/* ── Patterns ── */}
            <PatternsSection />
            <AccessibilitySection />

            {/* ── Assets ── */}
            <IconsSection />

            {/* Footer */}
            <footer className="mt-16 py-10 border-t border-[#E5E7EB] text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div
                  className="w-7 h-7 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(173deg, #0078ba 0%, #00386f 73%)' }}
                >
                  <Activity size={13} className="text-white" />
                </div>
                <span className="font-bold text-[#00396b]" style={{ fontSize: '0.9375rem' }}>TrueSight Design System</span>
              </div>
              <p className="text-[#9CA3AF] mb-2" style={{ fontSize: '0.75rem' }}>
                Built with React, Tailwind CSS v4, and Lucide Icons · WCAG 2.1 AA Compliant
              </p>
              {/* Brand colors strip */}
              <div className="flex items-center justify-center gap-2 mb-3">
                {[
                  { hex: '#00396b', label: 'Primary' },
                  { hex: '#0078ba', label: 'Blue 600' },
                  { hex: '#5bb0e1', label: 'Secondary' },
                  { hex: '#f3f3f3', label: 'BG Grey' },
                ].map(c => (
                  <div key={c.hex} className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded-full border border-[#E5E7EB]" style={{ backgroundColor: c.hex }} />
                    <span className="text-[#9CA3AF]" style={{ fontSize: '0.5625rem' }}>{c.hex}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
                {groups.map(g => (
                  <span key={g} className="px-2 py-0.5 rounded-full font-medium" style={{ fontSize: '0.5625rem', backgroundColor: `${groupColors[g]}15`, color: groupColors[g] }}>
                    {g}
                  </span>
                ))}
              </div>
              <p className="text-[#D1D5DB] font-mono" style={{ fontSize: '0.6875rem' }}>
                © 2025 MedBill Technologies · v2.5.0 · {navItems.length} documented components
              </p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}