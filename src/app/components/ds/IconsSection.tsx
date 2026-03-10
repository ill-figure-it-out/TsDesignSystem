import React, { useState } from 'react';
import { SectionWrapper, SubSection, UsageNote } from './SectionWrapper';
import {
  LayoutDashboard, FileText, BarChart2, BarChart, LineChart, PieChart, Activity,
  Users, User, UserCheck, UserX, Shield, ShieldCheck, ShieldAlert,
  DollarSign, TrendingUp, TrendingDown, CreditCard, Wallet, Receipt,
  CheckCircle, XCircle, AlertTriangle, AlertCircle, Info, Clock, Timer,
  Search, Filter, Download, Upload, RefreshCw, Settings, Sliders, Eye, EyeOff,
  Plus, Minus, Edit, Trash2, Copy, ExternalLink, ArrowRight, ArrowLeft,
  ChevronRight, ChevronLeft, ChevronDown, ChevronUp, ChevronsRight,
  Bell, Mail, Send, Phone, Globe, Lock, Unlock, Key, LogOut, LogIn,
  Calendar, CalendarCheck, ClipboardList, ClipboardCheck, Folder, FolderOpen,
  Building2, Hospital, Stethoscope, Pill, Heart, Microscope, FileSearch,
  Check, X, MoreHorizontal, MoreVertical, Menu, Grid, List, Table,
  Zap, Star, Bookmark, Tag, Flag, Hash, Link, Paperclip
} from 'lucide-react';

const iconCategories = [
  {
    name: 'Navigation & Layout',
    icons: [
      { icon: LayoutDashboard, name: 'LayoutDashboard' },
      { icon: Menu, name: 'Menu' },
      { icon: Grid, name: 'Grid' },
      { icon: List, name: 'List' },
      { icon: Table, name: 'Table' },
      { icon: ChevronRight, name: 'ChevronRight' },
      { icon: ChevronLeft, name: 'ChevronLeft' },
      { icon: ChevronDown, name: 'ChevronDown' },
      { icon: ChevronUp, name: 'ChevronUp' },
      { icon: ArrowRight, name: 'ArrowRight' },
      { icon: ArrowLeft, name: 'ArrowLeft' },
      { icon: ChevronsRight, name: 'ChevronsRight' },
    ],
  },
  {
    name: 'Claims & Documents',
    icons: [
      { icon: FileText, name: 'FileText' },
      { icon: FileSearch, name: 'FileSearch' },
      { icon: ClipboardList, name: 'ClipboardList' },
      { icon: ClipboardCheck, name: 'ClipboardCheck' },
      { icon: Folder, name: 'Folder' },
      { icon: FolderOpen, name: 'FolderOpen' },
      { icon: Paperclip, name: 'Paperclip' },
      { icon: Download, name: 'Download' },
      { icon: Upload, name: 'Upload' },
      { icon: Copy, name: 'Copy' },
      { icon: ExternalLink, name: 'ExternalLink' },
      { icon: Link, name: 'Link' },
    ],
  },
  {
    name: 'Analytics & Data',
    icons: [
      { icon: BarChart2, name: 'BarChart2' },
      { icon: BarChart, name: 'BarChart' },
      { icon: LineChart, name: 'LineChart' },
      { icon: PieChart, name: 'PieChart' },
      { icon: Activity, name: 'Activity' },
      { icon: TrendingUp, name: 'TrendingUp' },
      { icon: TrendingDown, name: 'TrendingDown' },
      { icon: Zap, name: 'Zap' },
      { icon: Hash, name: 'Hash' },
      { icon: Sliders, name: 'Sliders' },
      { icon: Filter, name: 'Filter' },
      { icon: Search, name: 'Search' },
    ],
  },
  {
    name: 'Revenue & Finance',
    icons: [
      { icon: DollarSign, name: 'DollarSign' },
      { icon: CreditCard, name: 'CreditCard' },
      { icon: Wallet, name: 'Wallet' },
      { icon: Receipt, name: 'Receipt' },
      { icon: Building2, name: 'Building2' },
      { icon: Tag, name: 'Tag' },
      { icon: Star, name: 'Star' },
      { icon: Bookmark, name: 'Bookmark' },
      { icon: RefreshCw, name: 'RefreshCw' },
      { icon: Calendar, name: 'Calendar' },
      { icon: CalendarCheck, name: 'CalendarCheck' },
      { icon: Timer, name: 'Timer' },
    ],
  },
  {
    name: 'Status & Feedback',
    icons: [
      { icon: CheckCircle, name: 'CheckCircle' },
      { icon: XCircle, name: 'XCircle' },
      { icon: AlertTriangle, name: 'AlertTriangle' },
      { icon: AlertCircle, name: 'AlertCircle' },
      { icon: Info, name: 'Info' },
      { icon: Clock, name: 'Clock' },
      { icon: Check, name: 'Check' },
      { icon: X, name: 'X' },
      { icon: Flag, name: 'Flag' },
      { icon: Bell, name: 'Bell' },
      { icon: Eye, name: 'Eye' },
      { icon: EyeOff, name: 'EyeOff' },
    ],
  },
  {
    name: 'Users & Security',
    icons: [
      { icon: Users, name: 'Users' },
      { icon: User, name: 'User' },
      { icon: UserCheck, name: 'UserCheck' },
      { icon: UserX, name: 'UserX' },
      { icon: Shield, name: 'Shield' },
      { icon: ShieldCheck, name: 'ShieldCheck' },
      { icon: ShieldAlert, name: 'ShieldAlert' },
      { icon: Lock, name: 'Lock' },
      { icon: Unlock, name: 'Unlock' },
      { icon: Key, name: 'Key' },
      { icon: LogIn, name: 'LogIn' },
      { icon: LogOut, name: 'LogOut' },
    ],
  },
  {
    name: 'Actions',
    icons: [
      { icon: Plus, name: 'Plus' },
      { icon: Minus, name: 'Minus' },
      { icon: Edit, name: 'Edit' },
      { icon: Trash2, name: 'Trash2' },
      { icon: Settings, name: 'Settings' },
      { icon: Send, name: 'Send' },
      { icon: Mail, name: 'Mail' },
      { icon: Phone, name: 'Phone' },
      { icon: Globe, name: 'Globe' },
      { icon: MoreHorizontal, name: 'MoreHorizontal' },
      { icon: MoreVertical, name: 'MoreVertical' },
      { icon: RefreshCw, name: 'RefreshCw' },
    ],
  },
  {
    name: 'Healthcare',
    icons: [
      { icon: Hospital, name: 'Hospital' },
      { icon: Stethoscope, name: 'Stethoscope' },
      { icon: Pill, name: 'Pill' },
      { icon: Heart, name: 'Heart' },
      { icon: Microscope, name: 'Microscope' },
      { icon: Activity, name: 'Activity' },
      { icon: ShieldCheck, name: 'ShieldCheck' },
      { icon: ClipboardList, name: 'ClipboardList' },
    ],
  },
];

export function IconsSection() {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(`<${name} size={16} />`);
    setCopiedIcon(name);
    setTimeout(() => setCopiedIcon(null), 1500);
  };

  return (
    <SectionWrapper
      id="icons"
      title="Icon System"
      subtitle="TrueSight uses Lucide React as its icon library — a clean, consistent, and highly accessible open-source icon set with over 1,000 icons. All icons follow a 16×16px default grid at 1.5px stroke weight."
    >
      {/* Icon Guidelines */}
      <SubSection title="Icon Style Guidelines">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { size: 12, label: 'XS — 12px', use: 'Badge labels, inline micro icons' },
            { size: 16, label: 'SM — 16px', use: 'Default, nav items, buttons' },
            { size: 20, label: 'MD — 20px', use: 'Card icons, form prefixes' },
            { size: 24, label: 'LG — 24px', use: 'Feature icons, empty states' },
          ].map(s => (
            <div key={s.size} className="p-4 rounded-xl border border-[#E5E7EB] bg-white flex flex-col items-center gap-2 text-center">
              <Activity size={s.size} className="text-[#1A56DB]" />
              <p className="text-[0.8125rem] font-semibold text-[#374151]">{s.label}</p>
              <p className="text-[0.6875rem] text-[#9CA3AF] leading-snug">{s.use}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Default', color: '#374151', bg: 'transparent', desc: 'Most icon usage — inherits text color', border: '#E5E7EB' },
            { label: 'Branded', color: '#1A56DB', bg: '#EBF0FF', desc: 'Interactive icons, primary actions', border: '#C7D9FE' },
            { label: 'Semantic', color: '#16A34A', bg: '#DCFCE7', desc: 'Status icons with semantic color', border: '#BBF7D0' },
          ].map(style => (
            <div
              key={style.label}
              className="p-4 rounded-xl border flex items-center gap-3"
              style={{ borderColor: style.border, backgroundColor: style.bg || '#ffffff' }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: style.bg, border: `1.5px solid ${style.border}` }}
              >
                <CheckCircle size={20} style={{ color: style.color }} />
              </div>
              <div>
                <p className="text-[0.8125rem] font-semibold" style={{ color: style.color }}>{style.label}</p>
                <p className="text-[0.6875rem] text-[#9CA3AF]">{style.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <UsageNote>
          Always pair icons with a visible text label when used for navigation or primary actions. Icon-only controls (toolbars, icon buttons) must have aria-label and a tooltip. Use size={16} as the default, size={20} for card/feature contexts. Never scale icons with CSS transforms — use the size prop.
        </UsageNote>
      </SubSection>

      {/* Icon Library */}
      <SubSection
        title="Icon Library"
        description="Click any icon to copy its JSX import. Organized by usage category."
      >
        {iconCategories.map(category => (
          <div key={category.name} className="mb-8">
            <p className="text-[0.75rem] font-semibold text-[#6B7280] uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-6 h-px bg-[#D1D5DB] inline-block" />
              {category.name}
              <span className="w-6 h-px bg-[#D1D5DB] inline-block" />
            </p>
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
              {category.icons.map(({ icon: Icon, name }) => (
                <button
                  key={name}
                  onClick={() => handleCopy(name)}
                  onMouseEnter={() => setHoveredIcon(name)}
                  onMouseLeave={() => setHoveredIcon(null)}
                  className="relative group flex flex-col items-center gap-1.5 p-2.5 rounded-xl border border-transparent hover:border-[#C7D9FE] hover:bg-[#EBF0FF] transition-all"
                  title={name}
                >
                  <Icon
                    size={18}
                    className={`transition-colors ${copiedIcon === name ? 'text-[#16A34A]' : 'text-[#374151] group-hover:text-[#1A56DB]'}`}
                  />
                  <span className="text-[0.5rem] text-[#9CA3AF] group-hover:text-[#1A56DB] leading-tight text-center break-all hidden sm:block transition-colors">
                    {copiedIcon === name ? '✓ Copied' : name.substring(0, 10)}
                  </span>
                  {hoveredIcon === name && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 bg-[#111827] text-white text-[0.625rem] font-mono px-2 py-1 rounded whitespace-nowrap z-20 pointer-events-none">
                      {`<${name} />`}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </SubSection>

      {/* Icon in Context */}
      <SubSection title="Icons in Context" description="Examples of icons used with text labels in real UI patterns.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-[#E5E7EB] bg-white">
            <p className="text-[0.6875rem] font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Button Icons</p>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: Plus, label: 'New Claim', variant: 'primary' },
                { icon: Download, label: 'Export', variant: 'outline' },
                { icon: Filter, label: 'Filter', variant: 'ghost' },
                { icon: Trash2, label: 'Delete', variant: 'danger' },
              ].map(({ icon: Icon, label, variant }) => (
                <button
                  key={label}
                  className={`
                    flex items-center gap-1.5 px-3 py-1.5 text-[0.8125rem] font-medium rounded-lg border transition-colors
                    ${variant === 'primary' ? 'bg-[#1A56DB] text-white border-transparent hover:bg-[#103776]' : ''}
                    ${variant === 'outline' ? 'bg-white text-[#374151] border-[#D1D5DB] hover:bg-[#F9FAFB]' : ''}
                    ${variant === 'ghost' ? 'bg-transparent text-[#1A56DB] border-transparent hover:bg-[#EBF0FF]' : ''}
                    ${variant === 'danger' ? 'bg-[#FEE2E2] text-[#DC2626] border-[#FCA5A5] hover:bg-[#FCA5A5]' : ''}
                  `}
                >
                  <Icon size={14} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl border border-[#E5E7EB] bg-white">
            <p className="text-[0.6875rem] font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Status Icons</p>
            <div className="space-y-2">
              {[
                { icon: CheckCircle, label: 'Approved — $1,247.50', color: '#16A34A', bg: '#DCFCE7' },
                { icon: XCircle, label: 'Denied — Reason: CO-97', color: '#DC2626', bg: '#FEE2E2' },
                { icon: Clock, label: 'Pending review', color: '#D97706', bg: '#FEF3C7' },
                { icon: AlertTriangle, label: 'Prior auth required', color: '#2563EB', bg: '#DBEAFE' },
              ].map(({ icon: Icon, label, color, bg }) => (
                <div key={label} className="flex items-center gap-2.5 px-3 py-2 rounded-lg" style={{ backgroundColor: bg }}>
                  <Icon size={15} style={{ color }} />
                  <span className="text-[0.8125rem] font-medium" style={{ color }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SubSection>
    </SectionWrapper>
  );
}
