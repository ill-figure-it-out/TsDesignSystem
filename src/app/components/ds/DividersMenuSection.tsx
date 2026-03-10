import React, { useState, useRef, useEffect } from 'react';
import { SectionWrapper, SubSection, UsageNote, ShowcaseBox } from './SectionWrapper';
import {
  LayoutDashboard, FileText, BarChart2, Settings, LogOut,
  Download, Edit3, Copy, Trash2, ExternalLink, Share2,
  ChevronRight, Check, AlertTriangle, Bell, User, Shield,
  MoreHorizontal, Plus, Filter
} from 'lucide-react';

/* ─── Divider ────────────────────────────────────────────────────────────── */
type DividerStyle = 'solid' | 'dashed' | 'dotted';
type DividerWeight = 'thin' | 'medium' | 'thick';
type DividerOrientation = 'horizontal' | 'vertical';

interface DividerProps {
  style?: DividerStyle;
  weight?: DividerWeight;
  label?: string;
  orientation?: DividerOrientation;
  color?: string;
}

const weightMap: Record<DividerWeight, string> = {
  thin:   '1px',
  medium: '2px',
  thick:  '3px',
};

export function Divider({
  style = 'solid',
  weight = 'thin',
  label,
  orientation = 'horizontal',
  color = '#E5E7EB',
}: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <div
        className="self-stretch flex-shrink-0"
        style={
          style === 'solid'
            ? { width: weightMap[weight], backgroundColor: color }
            : { width: weightMap[weight], borderLeft: `${weightMap[weight]} ${style} ${color}` }
        }
      />
    );
  }

  if (label) {
    return (
      <div className="flex items-center gap-3 w-full">
        <div
          className="flex-1"
          style={
            style === 'solid'
              ? { height: weightMap[weight], backgroundColor: color }
              : { height: 0, borderTop: `${weightMap[weight]} ${style} ${color}` }
          }
        />
        <span className="text-[0.6875rem] font-medium text-[#9CA3AF] whitespace-nowrap px-1">{label}</span>
        <div
          className="flex-1"
          style={
            style === 'solid'
              ? { height: weightMap[weight], backgroundColor: color }
              : { height: 0, borderTop: `${weightMap[weight]} ${style} ${color}` }
          }
        />
      </div>
    );
  }

  return (
    <div
      className="w-full"
      style={
        style === 'solid'
          ? { height: weightMap[weight], backgroundColor: color }
          : { height: 0, borderTop: `${weightMap[weight]} ${style} ${color}` }
      }
    />
  );
}

/* ─── Menu Item ──────────────────────────────────────────────────────────── */
type MenuItemVariant = 'default' | 'active' | 'disabled' | 'danger';

interface MenuItemProps {
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  variant?: MenuItemVariant;
  description?: string;
  badge?: string | number;
  badgeColor?: string;
  hasSubmenu?: boolean;
  checked?: boolean;
  onClick?: () => void;
}

export function MenuItem({
  label,
  icon,
  shortcut,
  variant = 'default',
  description,
  badge,
  badgeColor = '#DC2626',
  hasSubmenu = false,
  checked = false,
  onClick,
}: MenuItemProps) {
  const styles: Record<MenuItemVariant, string> = {
    default:  'text-[#374151] hover:bg-[#f3f3f3] hover:text-[#111827]',
    active:   'bg-[#ddeef9] text-[#0078ba]',
    disabled: 'text-[#9CA3AF] cursor-not-allowed pointer-events-none',
    danger:   'text-[#DC2626] hover:bg-[#FEE2E2]',
  };

  const iconColors: Record<MenuItemVariant, string> = {
    default:  'text-[#6B7280] group-hover:text-[#374151]',
    active:   'text-[#0078ba]',
    disabled: 'text-[#D1D5DB]',
    danger:   'text-[#DC2626]',
  };

  return (
    <button
      onClick={onClick}
      disabled={variant === 'disabled'}
      className={`w-full flex items-center gap-2.5 px-3 py-2 text-[0.8125rem] rounded-lg transition-all group ${styles[variant]}`}
    >
      {/* Checkmark column */}
      <span className="w-4 flex-shrink-0 flex items-center justify-center">
        {checked ? <Check size={13} className={variant === 'active' ? 'text-[#1A56DB]' : 'text-[#374151]'} /> : null}
      </span>

      {/* Icon */}
      {icon && (
        <span className={`flex-shrink-0 transition-colors ${iconColors[variant]}`}>
          {icon}
        </span>
      )}

      {/* Label + description */}
      <div className="flex-1 min-w-0 text-left">
        <p className="leading-tight">{label}</p>
        {description && <p className="text-[0.6875rem] text-[#9CA3AF] mt-0.5 leading-tight">{description}</p>}
      </div>

      {/* Badge */}
      {badge !== undefined && (
        <span
          className="ml-auto px-1.5 py-0.5 text-white text-[0.5625rem] font-bold rounded-full flex-shrink-0"
          style={{ backgroundColor: badgeColor }}
        >
          {badge}
        </span>
      )}

      {/* Keyboard shortcut */}
      {shortcut && !badge && (
        <span className="ml-auto text-[0.6875rem] text-[#9CA3AF] font-mono flex-shrink-0">{shortcut}</span>
      )}

      {/* Submenu arrow */}
      {hasSubmenu && (
        <ChevronRight size={13} className="ml-auto text-[#9CA3AF] flex-shrink-0" />
      )}
    </button>
  );
}

/* ─── Dropdown Menu ──────────────────────────────────────────────────────── */
interface DropdownItem {
  type?: 'item' | 'divider' | 'label';
  label?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  variant?: MenuItemVariant;
  badge?: string | number;
  hasSubmenu?: boolean;
  checked?: boolean;
  description?: string;
}

function DropdownMenu({ trigger, items, align = 'left' }: {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={() => setOpen(o => !o)}>{trigger}</div>
      {open && (
        <div
          className={`absolute top-full mt-1.5 z-50 bg-white border border-[#E5E7EB] rounded-xl shadow-lg py-1.5 min-w-[200px] ${align === 'right' ? 'right-0' : 'left-0'}`}
        >
          {items.map((item, i) => {
            if (item.type === 'divider') {
              return <div key={i} className="my-1 mx-2"><Divider /></div>;
            }
            if (item.type === 'label') {
              return (
                <p key={i} className="px-3 py-1.5 text-[0.625rem] font-semibold text-[#9CA3AF] uppercase tracking-widest">
                  {item.label}
                </p>
              );
            }
            return (
              <div key={i} className="px-1.5">
                <MenuItem
                  label={item.label!}
                  icon={item.icon}
                  shortcut={item.shortcut}
                  variant={item.variant}
                  badge={item.badge}
                  hasSubmenu={item.hasSubmenu}
                  checked={item.checked}
                  description={item.description}
                  onClick={() => setOpen(false)}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── Context Menu ───────────────────────────────────────────────────────── */
function ContextMenuDemo() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const handleContext = (e: React.MouseEvent) => {
    e.preventDefault();
    setPos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const dismiss = () => setPos(null);
    document.addEventListener('click', dismiss);
    return () => document.removeEventListener('click', dismiss);
  }, []);

  return (
    <>
      <div
        ref={ref}
        onContextMenu={handleContext}
        className="w-full h-24 rounded-xl border-2 border-dashed border-[#D1D5DB] bg-[#F9FAFB] flex items-center justify-center cursor-context-menu select-none text-[0.875rem] text-[#9CA3AF] hover:border-[#1A56DB] hover:bg-[#F5F8FF] transition-all"
      >
        Right-click here to see context menu
      </div>
      {pos && (
        <div
          className="fixed z-[100] bg-white border border-[#E5E7EB] rounded-xl shadow-xl py-1.5 min-w-[180px]"
          style={{ left: pos.x, top: pos.y }}
          onClick={e => e.stopPropagation()}
        >
          {[
            { label: 'Open', icon: <ExternalLink size={14} />, shortcut: '⌘O' },
            { label: 'Copy Link', icon: <Copy size={14} />, shortcut: '⌘C' },
            { label: 'Share', icon: <Share2 size={14} /> },
            { type: 'divider' as const },
            { label: 'Download', icon: <Download size={14} /> },
            { label: 'Rename', icon: <Edit3 size={14} /> },
            { type: 'divider' as const },
            { label: 'Delete', icon: <Trash2 size={14} />, variant: 'danger' as MenuItemVariant },
          ].map((item, i) => (
            item.type === 'divider'
              ? <div key={i} className="my-1 mx-2"><Divider /></div>
              : <div key={i} className="px-1.5">
                  <MenuItem label={item.label!} icon={item.icon} shortcut={item.shortcut} variant={item.variant} onClick={() => setPos(null)} />
                </div>
          ))}
        </div>
      )}
    </>
  );
}

/* ─── Sidebar Nav ────────────────────────────────────────────────────────── */
function SidebarMenuExample() {
  const [active, setActive] = useState('Dashboard');

  const sections = [
    {
      label: 'Main',
      items: [
        { label: 'Dashboard', icon: <LayoutDashboard size={15} />, badge: undefined },
        { label: 'Claims', icon: <FileText size={15} />, badge: 12 },
        { label: 'Analytics', icon: <BarChart2 size={15} /> },
      ],
    },
    {
      label: 'Admin',
      items: [
        { label: 'Users', icon: <User size={15} /> },
        { label: 'Compliance', icon: <Shield size={15} /> },
        { label: 'Alerts', icon: <Bell size={15} />, badge: 4 },
        { label: 'Settings', icon: <Settings size={15} /> },
      ],
    },
  ];

  return (
    <div className="w-56 bg-white rounded-xl border border-[#E5E7EB] py-2 overflow-hidden shadow-sm">
      {sections.map((section, si) => (
        <div key={section.label}>
          {si > 0 && <div className="my-1.5 mx-3"><Divider /></div>}
          <p className="px-4 py-1.5 text-[0.5625rem] font-bold text-[#9CA3AF] uppercase tracking-widest">{section.label}</p>
          {section.items.map(item => (
            <div key={item.label} className="px-1.5">
              <MenuItem
                label={item.label}
                icon={item.icon}
                variant={active === item.label ? 'active' : 'default'}
                badge={item.badge}
                badgeColor="#DC2626"
                onClick={() => setActive(item.label)}
              />
            </div>
          ))}
        </div>
      ))}
      <div className="mt-1.5 mx-3"><Divider /></div>
      <div className="px-1.5 mt-1.5 pb-1">
        <MenuItem label="Sign Out" icon={<LogOut size={15} />} variant="default" />
      </div>
    </div>
  );
}

export function DividersMenuSection() {
  return (
    <SectionWrapper
      id="menus-dividers"
      title="Menus & Dividers"
      subtitle="Menus organize actions and navigation into scannable lists. Dividers create visual hierarchy within panels, lists, and modals — essential for structured healthcare data interfaces."
    >
      {/* Dividers */}
      <SubSection title="Dividers" description="Horizontal and vertical separators in three styles and weights.">
        <div className="p-5 rounded-xl border border-[#E5E7EB] bg-white space-y-6">
          {/* Solid */}
          <div className="space-y-3">
            <p className="text-[0.6875rem] font-semibold text-[#6B7280] uppercase tracking-wider">Solid</p>
            <Divider style="solid" weight="thin" />
            <Divider style="solid" weight="medium" color="#D1D5DB" />
            <Divider style="solid" weight="thick" color="#9CA3AF" />
          </div>

          {/* Dashed */}
          <div className="space-y-3">
            <p className="text-[0.6875rem] font-semibold text-[#6B7280] uppercase tracking-wider">Dashed</p>
            <Divider style="dashed" weight="thin" />
            <Divider style="dashed" weight="medium" color="#D1D5DB" />
          </div>

          {/* Dotted */}
          <div className="space-y-3">
            <p className="text-[0.6875rem] font-semibold text-[#6B7280] uppercase tracking-wider">Dotted</p>
            <Divider style="dotted" weight="thin" />
          </div>

          {/* With labels */}
          <div className="space-y-3">
            <p className="text-[0.6875rem] font-semibold text-[#6B7280] uppercase tracking-wider">With Label</p>
            <Divider style="solid" label="OR" />
            <Divider style="dashed" label="Section Break" />
            <Divider style="solid" label="Jan 15, 2025" color="#D1D5DB" />
          </div>

          {/* Vertical */}
          <div>
            <p className="text-[0.6875rem] font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Vertical</p>
            <div className="flex items-center gap-4 h-8">
              <span className="text-[0.875rem] text-[#374151]">Claims</span>
              <Divider orientation="vertical" />
              <span className="text-[0.875rem] text-[#374151]">Analytics</span>
              <Divider orientation="vertical" weight="medium" color="#D1D5DB" />
              <span className="text-[0.875rem] text-[#374151]">Reports</span>
            </div>
          </div>

          {/* Semantic dividers */}
          <div className="space-y-2">
            <p className="text-[0.6875rem] font-semibold text-[#6B7280] uppercase tracking-wider">Semantic Colors</p>
            <Divider style="solid" weight="medium" color="#1A56DB" />
            <Divider style="solid" weight="medium" color="#16A34A" />
            <Divider style="solid" weight="medium" color="#DC2626" />
          </div>
        </div>
      </SubSection>

      {/* Menu Items */}
      <SubSection title="Menu Item States" description="All interactive states for individual menu items.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Standard states */}
          <div>
            <p className="text-[0.6875rem] font-semibold text-[#6B7280] uppercase tracking-wider mb-3">States</p>
            <div className="bg-white rounded-xl border border-[#E5E7EB] py-2 px-1.5 space-y-0.5">
              <MenuItem label="Default Item" icon={<FileText size={14} />} />
              <MenuItem label="Active / Selected" icon={<LayoutDashboard size={14} />} variant="active" />
              <MenuItem label="With Shortcut" icon={<Download size={14} />} shortcut="⌘D" />
              <MenuItem label="With Badge" icon={<Bell size={14} />} badge={5} />
              <MenuItem label="With Submenu" icon={<Settings size={14} />} hasSubmenu />
              <MenuItem label="Disabled Item" icon={<Shield size={14} />} variant="disabled" />
              <div className="my-1 mx-1"><Divider /></div>
              <MenuItem label="Danger Action" icon={<Trash2 size={14} />} variant="danger" />
            </div>
          </div>

          {/* Rich items */}
          <div>
            <p className="text-[0.6875rem] font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Rich Menu Items</p>
            <div className="bg-white rounded-xl border border-[#E5E7EB] py-2 px-1.5 space-y-0.5">
              <MenuItem
                label="Export to Excel"
                icon={<Download size={14} />}
                description="Download as .xlsx format"
                shortcut="⌘E"
              />
              <MenuItem
                label="Share Report"
                icon={<Share2 size={14} />}
                description="Send to team members"
              />
              <MenuItem
                label="Generate PDF"
                icon={<FileText size={14} />}
                description="Formatted report for printing"
              />
              <div className="my-1 mx-1"><Divider /></div>
              <MenuItem
                label="Flag for Review"
                icon={<AlertTriangle size={14} />}
                description="Mark claim for manual audit"
                variant="danger"
              />
            </div>
          </div>

          {/* Checkmark items */}
          <div>
            <p className="text-[0.6875rem] font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Selectable / Checkmark</p>
            <div className="bg-white rounded-xl border border-[#E5E7EB] py-2 px-1.5 space-y-0.5">
              {['Medicare', 'Medicaid', 'BCBS', 'Aetna', 'Cigna'].map((item, i) => (
                <MenuItem key={item} label={item} checked={i < 2} />
              ))}
            </div>
          </div>

          {/* Icon-right */}
          <div>
            <p className="text-[0.6875rem] font-semibold text-[#6B7280] uppercase tracking-wider mb-3">With Numeric Badges</p>
            <div className="bg-white rounded-xl border border-[#E5E7EB] py-2 px-1.5 space-y-0.5">
              <MenuItem label="Pending Claims" icon={<FileText size={14} />} badge={24} badgeColor="#D97706" />
              <MenuItem label="Denied" icon={<AlertTriangle size={14} />} badge={8} badgeColor="#DC2626" />
              <MenuItem label="Notifications" icon={<Bell size={14} />} badge={3} badgeColor="#1A56DB" />
              <MenuItem label="New Users" icon={<User size={14} />} badge={1} badgeColor="#16A34A" />
            </div>
          </div>
        </div>
      </SubSection>

      {/* Sidebar nav example */}
      <SubSection title="Sidebar Navigation Menu" description="Full sidebar menu pattern with sections, dividers, badges, and active state.">
        <ShowcaseBox label="Sidebar Menu — Light Theme">
          <div className="flex justify-center">
            <SidebarMenuExample />
          </div>
        </ShowcaseBox>
      </SubSection>

      {/* Dropdown Menus */}
      <SubSection title="Dropdown Menus" description="Click triggers to open context dropdowns. Dismiss by clicking outside.">
        <ShowcaseBox label="Dropdown Variants">
          <div className="flex flex-wrap gap-4 min-h-[200px] items-start">
            {/* Actions dropdown */}
            <DropdownMenu
              trigger={
                <button className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-[#D1D5DB] rounded-lg text-[0.875rem] font-medium text-[#374151] hover:border-[#0078ba] hover:text-[#0078ba] transition-all">
                  <MoreHorizontal size={15} /> Actions
                </button>
              }
              items={[
                { type: 'label', label: 'Claim Actions' },
                { label: 'View Details', icon: <ExternalLink size={14} />, shortcut: '⌘V' },
                { label: 'Edit Claim', icon: <Edit3 size={14} />, shortcut: '⌘E' },
                { label: 'Duplicate', icon: <Copy size={14} /> },
                { type: 'divider' },
                { label: 'Download PDF', icon: <Download size={14} /> },
                { label: 'Share', icon: <Share2 size={14} /> },
                { type: 'divider' },
                { label: 'Delete Claim', icon: <Trash2 size={14} />, variant: 'danger' },
              ]}
            />

            {/* Filter dropdown */}
            <DropdownMenu
              trigger={
                <button className="inline-flex items-center gap-2 px-3 py-2 bg-[#0078ba] text-white rounded-lg text-[0.875rem] font-medium hover:bg-[#004d8f] transition-colors">
                  <Filter size={15} /> Filter
                </button>
              }
              items={[
                { type: 'label', label: 'Status' },
                { label: 'Approved', checked: true },
                { label: 'Pending', checked: true },
                { label: 'Denied', checked: false },
                { type: 'divider' },
                { type: 'label', label: 'Payer' },
                { label: 'Medicare', checked: true },
                { label: 'Medicaid', checked: false },
                { label: 'BCBS', checked: false },
              ]}
            />

            {/* Plus/New dropdown */}
            <DropdownMenu
              trigger={
                <button className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-[#D1D5DB] rounded-lg text-[0.875rem] font-medium text-[#374151] hover:border-[#0078ba] hover:text-[#0078ba] transition-all">
                  <Plus size={15} /> New
                </button>
              }
              items={[
                { label: 'New Claim', icon: <FileText size={14} />, description: 'Submit a new insurance claim', shortcut: '⌘N' },
                { label: 'New Report', icon: <BarChart2 size={14} />, description: 'Generate analytics report' },
                { label: 'New Provider', icon: <User size={14} />, description: 'Add provider to directory', variant: 'disabled' },
              ]}
            />
          </div>
        </ShowcaseBox>
      </SubSection>

      {/* Context Menu */}
      <SubSection title="Context Menu" description="Right-click / long-press triggered menu. Essential for data tables and file managers.">
        <ContextMenuDemo />
      </SubSection>

      <UsageNote>
        Menus must close on outside click, Escape key, and item selection. Minimum menu item height is 36px for touch targets.
        Use <strong>dividers sparingly</strong> — max 2–3 per menu to create logical groups without clutter.
        Danger actions must always be at the bottom of the menu, separated by a divider. Never place destructive actions at the top.
      </UsageNote>
    </SectionWrapper>
  );
}