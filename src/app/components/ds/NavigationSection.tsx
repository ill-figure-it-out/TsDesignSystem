import React, { useState } from 'react';
import { SectionWrapper, SubSection, UsageNote, FigmaName } from './SectionWrapper';
import {
  LayoutDashboard, FileText, BarChart2, Users, Settings, Bell, Search,
  ChevronRight, ChevronDown, Menu, X, Home, LogOut,
  Activity, DollarSign, AlertTriangle, Shield
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: FileText, label: 'Claims', badge: '12' },
  { icon: BarChart2, label: 'Analytics' },
  { icon: DollarSign, label: 'Revenue Cycle' },
  { icon: AlertTriangle, label: 'Denials', badge: '4' },
  { icon: Users, label: 'Providers' },
  { icon: Shield, label: 'Compliance' },
  { icon: Settings, label: 'Settings' },
];

function SidebarNav({ collapsed = false }: { collapsed?: boolean }) {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  return (
    <div
      className={`flex flex-col h-[480px] transition-all duration-200 rounded-xl overflow-hidden ${isCollapsed ? 'w-16' : 'w-60'}`}
      style={{ background: 'linear-gradient(180deg, #001a33 0%, #00396b 100%)' }}
    >
      {/* Header */}
      <div className={`flex items-center ${isCollapsed ? 'justify-center px-3' : 'justify-between px-4'} py-4 border-b border-[#004d8f]/60`}>
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(173deg, #0078ba, #00396b)' }}>
              <Activity size={14} className="text-white" />
            </div>
            <span className="text-white font-bold text-[0.9375rem] tracking-tight">TrueSight</span>
          </div>
        )}
        {isCollapsed && (
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(173deg, #0078ba, #00396b)' }}>
            <Activity size={14} className="text-white" />
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-1 rounded hover:bg-[#004d8f] text-[#99cceb] transition-colors ${isCollapsed ? 'hidden' : ''}`}
        >
          <Menu size={16} />
        </button>
      </div>

      {/* Search */}
      {!isCollapsed && (
        <div className="px-3 py-3">
          <div className="flex items-center gap-2 bg-[#004d8f]/60 rounded-lg px-2.5 py-1.5">
            <Search size={13} className="text-[#5bb0e1]" />
            <input
              placeholder="Search..."
              className="bg-transparent text-[0.75rem] text-[#99cceb] placeholder:text-[#5bb0e1] outline-none w-full"
            />
          </div>
        </div>
      )}

      {/* Nav Items */}
      <nav className="flex-1 px-2 py-1 space-y-0.5 overflow-y-auto">
        {!isCollapsed && (
          <p className="text-[0.6rem] font-semibold text-[#5bb0e1] uppercase tracking-widest px-2 py-2 mt-1">Main Menu</p>
        )}
        {navItems.map(({ icon: Icon, label, active, badge }) => (
          <button
            key={label}
            className={`
              w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-2.5'} px-2.5 py-2 rounded-lg text-[0.8125rem] font-medium transition-colors relative group
              ${active
                ? 'bg-[#0078ba] text-white'
                : 'text-[#99cceb] hover:bg-[#004d8f] hover:text-white'
              }
            `}
            title={isCollapsed ? label : undefined}
          >
            <Icon size={16} className="flex-shrink-0" />
            {!isCollapsed && <span className="flex-1 text-left">{label}</span>}
            {!isCollapsed && badge && (
              <span className="px-1.5 py-0.5 bg-[#DC2626] text-white text-[0.5rem] font-bold rounded-full">
                {badge}
              </span>
            )}
            {isCollapsed && badge && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#DC2626] rounded-full" />
            )}
            {isCollapsed && (
              <span className="absolute left-full ml-2 px-2 py-1 bg-[#111827] text-white text-[0.75rem] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                {label}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-[#004d8f]/60 p-3">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-2.5'}`}>
          <div className="w-7 h-7 rounded-full bg-[#0078ba] flex items-center justify-center flex-shrink-0">
            <span className="text-[0.6875rem] font-bold text-white">JD</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-[0.75rem] font-semibold text-white truncate">Jane Doe</p>
              <p className="text-[0.625rem] text-[#99cceb] truncate">Billing Manager</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TopNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const tabs = ['Dashboard', 'Claims', 'Analytics', 'Denials', 'Reports'];
  const [active, setActive] = useState('Dashboard');

  return (
    <div className="rounded-xl border border-[#E5E7EB] overflow-hidden">
      <nav className="px-4 py-0 flex items-center justify-between h-14" style={{ background: '#00396b' }}>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(173deg, #0078ba, #00396b)' }}>
              <Activity size={13} className="text-white" />
            </div>
            <span className="text-white font-bold text-[0.9375rem]">TrueSight</span>
          </div>
          <div className="hidden md:flex items-center h-14">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`
                  h-full px-4 text-[0.8125rem] font-medium border-b-2 transition-colors
                  ${active === tab
                    ? 'border-white text-white'
                    : 'border-transparent text-[#99cceb] hover:text-white hover:border-[#5bb0e1]'
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg text-[#99cceb] hover:bg-[#004d8f] hover:text-white transition-colors relative">
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#DC2626] rounded-full" />
          </button>
          <div className="hidden md:flex items-center gap-2 pl-2 border-l border-[#004d8f]">
            <div className="w-7 h-7 rounded-full bg-[#0078ba] flex items-center justify-center">
              <span className="text-[0.625rem] font-bold text-white">JD</span>
            </div>
            <span className="text-[0.8125rem] text-white font-medium">Jane D.</span>
            <ChevronDown size={13} className="text-[#99cceb]" />
          </div>
          <button
            className="md:hidden p-2 rounded text-[#99cceb] hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="bg-[#002650] border-t border-[#004d8f] px-4 py-2">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`w-full text-left px-3 py-2.5 text-[0.875rem] rounded-lg mb-0.5 ${active === tab ? 'bg-[#0078ba] text-white' : 'text-[#99cceb]'}`}
              onClick={() => { setActive(tab); setMobileOpen(false); }}
            >
              {tab}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Breadcrumbs() {
  const crumbs = ['Home', 'Analytics', 'Revenue Cycle', 'Q4 2025 Report'];
  return (
    <nav className="flex items-center gap-1.5 text-[0.8125rem]">
      {crumbs.map((c, i) => (
        <span key={c} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight size={13} className="text-[#D1D5DB]" />}
          <span className={i === crumbs.length - 1
            ? 'text-[#374151] font-medium'
            : 'text-[#0078ba] hover:underline cursor-pointer'
          }>
            {c}
          </span>
        </span>
      ))}
    </nav>
  );
}

function TabNav() {
  const tabs = [
    { label: 'Overview', count: null },
    { label: 'Pending', count: 24 },
    { label: 'Approved', count: 142 },
    { label: 'Denied', count: 18 },
    { label: 'Appealed', count: 6 },
  ];
  const [active, setActive] = useState('Overview');

  return (
    <div className="border-b border-[#E5E7EB]">
      <div className="flex items-center gap-0 overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t.label}
            onClick={() => setActive(t.label)}
            className={`
              flex items-center gap-1.5 px-4 py-3 text-[0.875rem] font-medium border-b-2 whitespace-nowrap transition-colors
              ${active === t.label
                ? 'border-[#0078ba] text-[#0078ba]'
                : 'border-transparent text-[#6B7280] hover:text-[#374151] hover:border-[#D1D5DB]'
              }
            `}
          >
            {t.label}
            {t.count !== null && (
              <span className={`px-1.5 py-0.5 text-[0.625rem] font-bold rounded-full ${active === t.label ? 'bg-[#ddeef9] text-[#0078ba]' : 'bg-[#f3f3f3] text-[#6B7280]'}`}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export function NavigationSection() {
  return (
    <SectionWrapper
      id="navigation"
      title="Navigation"
      subtitle="TrueSight uses a persistent sidebar navigation for the main app shell, supplemented by top navigation, breadcrumbs, and tab navigation for sub-sections."
    >
      {/* Sidebar */}
      <SubSection
        title="Sidebar Navigation"
        description="The primary navigation pattern for the TrueSight app shell. Uses the brand navy gradient. Click the hamburger icon to toggle collapse."
      >
        <div className="mb-2">
          <FigmaName name="Navigation / Sidebar / Expanded" />
          <span className="mx-1 text-[#9CA3AF]">·</span>
          <FigmaName name="Navigation / Sidebar / Collapsed" />
        </div>
        <div className="flex gap-6 overflow-x-auto pb-2">
          <div>
            <p className="text-[0.6875rem] font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Expanded</p>
            <SidebarNav collapsed={false} />
          </div>
          <div>
            <p className="text-[0.6875rem] font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Collapsed</p>
            <SidebarNav collapsed={true} />
          </div>
        </div>
        <UsageNote>
          The sidebar should always be visible on desktop (lg: and above). On tablet and mobile, it should collapse into a bottom navigation or hamburger drawer. Active item uses Blue 600 (#0078ba) fill. Sidebar background uses the brand navy gradient.
        </UsageNote>
      </SubSection>

      {/* Top Nav */}
      <SubSection
        title="Top Navigation Bar"
        description="Alternative navigation for simpler, less hierarchical applications or marketing pages."
      >
        <div className="mb-2">
          <FigmaName name="Navigation / TopBar / Default" />
        </div>
        <TopNav />
        <UsageNote>
          Use top navigation for apps with fewer than 7 primary navigation items. The active tab is indicated by a white bottom border on the dark background. Mobile: collapse to hamburger menu.
        </UsageNote>
      </SubSection>

      {/* Breadcrumbs */}
      <SubSection title="Breadcrumbs" description="Show current location in a hierarchy of 2+ levels deep.">
        <div className="mb-2">
          <FigmaName name="Navigation / Breadcrumb / Default" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="p-4 rounded-xl border border-[#E5E7EB] bg-white">
            <Breadcrumbs />
          </div>
          <div className="p-4 rounded-xl border border-[#E5E7EB] bg-[#f3f3f3]">
            <nav className="flex items-center gap-1.5 text-[0.8125rem]">
              <Home size={13} className="text-[#9CA3AF]" />
              {['Claims', 'CLM-2025-001247'].map((c, i) => (
                <span key={c} className="flex items-center gap-1.5">
                  <ChevronRight size={13} className="text-[#D1D5DB]" />
                  <span className={i === 1 ? 'text-[#374151] font-medium' : 'text-[#0078ba] cursor-pointer hover:underline'}>{c}</span>
                </span>
              ))}
            </nav>
          </div>
        </div>
      </SubSection>

      {/* Tab Nav */}
      <SubSection
        title="Tab Navigation"
        description="Used inside pages to organize related content into distinct views."
      >
        <div className="mb-2">
          <FigmaName name="Navigation / TabBar / Default" />
        </div>
        <div className="p-4 rounded-xl border border-[#E5E7EB] bg-white">
          <TabNav />
          <div className="pt-4 text-[0.875rem] text-[#6B7280]">Tab content area appears here</div>
        </div>
      </SubSection>
    </SectionWrapper>
  );
}
