import React, { useState } from 'react';
import { SectionWrapper, SubSection, UsageNote, ShowcaseBox } from './SectionWrapper';
import { X, Check, Tag, Star, AlertCircle, Clock, User, Zap } from 'lucide-react';

/* ─── Token references (mirrors theme.css) ──────────────────────────────── */
const T = {
  primary:   { solid: '#0078ba', light: '#ddeef9', border: '#bdddf5', text: '#00396b' },
  success:   { solid: '#16A34A', light: '#DCFCE7', border: '#86EFAC', text: '#15803D' },
  warning:   { solid: '#D97706', light: '#FEF3C7', border: '#FCD34D', text: '#92400E' },
  error:     { solid: '#DC2626', light: '#FEE2E2', border: '#FCA5A5', text: '#B91C1C' },
  info:      { solid: '#2563EB', light: '#DBEAFE', border: '#93C5FD', text: '#1D4ED8' },
  neutral:   { solid: '#6B7280', light: '#F3F4F6', border: '#D1D5DB', text: '#374151' },
  teal:      { solid: '#5bb0e1', light: '#ddeef9', border: '#99cceb', text: '#0078ba' },
};

type ChipColor = keyof typeof T;
type ChipVariant = 'solid' | 'soft' | 'outlined';
type ChipSize   = 'sm' | 'md' | 'lg';
type ChipShape  = 'rounded' | 'pill';

interface ChipProps {
  label: string;
  color?: ChipColor;
  variant?: ChipVariant;
  size?: ChipSize;
  shape?: ChipShape;
  icon?: React.ReactNode;
  dismissible?: boolean;
  dot?: boolean;
  selected?: boolean;
}

const sizeMap: Record<ChipSize, { px: string; py: string; text: string; gap: string; dotSize: string }> = {
  sm: { px: 'px-2',   py: 'py-0.5', text: 'text-[0.6875rem]', gap: 'gap-1',   dotSize: 'w-1.5 h-1.5' },
  md: { px: 'px-2.5', py: 'py-1',   text: 'text-[0.75rem]',   gap: 'gap-1.5', dotSize: 'w-2 h-2'     },
  lg: { px: 'px-3',   py: 'py-1.5', text: 'text-[0.8125rem]', gap: 'gap-2',   dotSize: 'w-2 h-2'     },
};

function Chip({
  label,
  color = 'primary',
  variant = 'soft',
  size = 'md',
  shape = 'pill',
  icon,
  dismissible = false,
  dot = false,
  selected = false,
}: ChipProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const palette = T[color];
  const s = sizeMap[size];
  const radius = shape === 'pill' ? 'rounded-full' : 'rounded-md';

  const variantStyles: Record<ChipVariant, React.CSSProperties> = {
    solid: {
      backgroundColor: palette.solid,
      color: '#fff',
      border: `1px solid ${palette.solid}`,
    },
    soft: {
      backgroundColor: palette.light,
      color: palette.text,
      border: `1px solid ${palette.border}`,
    },
    outlined: {
      backgroundColor: 'transparent',
      color: palette.solid,
      border: `1px solid ${palette.solid}`,
    },
  };

  const selectedOverride: React.CSSProperties = selected
    ? { backgroundColor: palette.solid, color: '#fff', border: `1px solid ${palette.solid}` }
    : {};

  return (
    <span
      className={`inline-flex items-center font-medium transition-all ${s.px} ${s.py} ${s.text} ${s.gap} ${radius}`}
      style={{ ...variantStyles[variant], ...selectedOverride }}
    >
      {dot && (
        <span className={`${s.dotSize} rounded-full flex-shrink-0`} style={{ backgroundColor: variant === 'solid' || selected ? '#fff' : palette.solid }} />
      )}
      {icon && <span className="flex-shrink-0 opacity-80">{icon}</span>}
      {label}
      {dismissible && (
        <button
          onClick={() => setDismissed(true)}
          className="flex-shrink-0 rounded-full hover:opacity-70 transition-opacity ml-0.5"
          aria-label="Remove"
        >
          <X size={size === 'lg' ? 13 : 11} />
        </button>
      )}
      {selected && !dismissible && <Check size={11} className="flex-shrink-0 ml-0.5" />}
    </span>
  );
}

/* ─── Selectable chip group ─────────────────────────────────────────────── */
function ChipFilter({ options }: { options: string[] }) {
  const [active, setActive] = useState<string[]>(['All']);

  const toggle = (opt: string) => {
    if (opt === 'All') { setActive(['All']); return; }
    setActive(prev => {
      const without = prev.filter(x => x !== 'All');
      return without.includes(opt) ? without.filter(x => x !== opt) || ['All'] : [...without, opt];
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => {
        const sel = active.includes(opt);
        return (
          <button
            key={opt}
            onClick={() => toggle(opt)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.8125rem] font-medium border transition-all duration-150 ${
              sel
                ? 'bg-[#1A56DB] text-white border-[#1A56DB] shadow-sm'
                : 'bg-white text-[#6B7280] border-[#D1D5DB] hover:border-[#1A56DB] hover:text-[#1A56DB]'
            }`}
          >
            {sel && <Check size={12} />}
            {opt}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Tag input ─────────────────────────────────────────────────────────── */
function TagInput() {
  const [tags, setTags] = useState(['Medicare', 'Q4-2025', 'High Priority']);
  const [input, setInput] = useState('');

  const add = () => {
    const t = input.trim();
    if (t && !tags.includes(t)) setTags([...tags, t]);
    setInput('');
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.8125rem] font-medium text-[#374151]">Claim Tags</label>
      <div className="flex flex-wrap items-center gap-1.5 bg-white border border-[#D1D5DB] rounded-lg px-3 py-2 focus-within:border-[#1A56DB] focus-within:ring-2 focus-within:ring-[#1A56DB]/20 transition-all min-h-[42px]">
        {tags.map(tag => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#EBF0FF] text-[#0D2B5E] text-[0.75rem] font-medium rounded-full border border-[#C7D9FE]"
          >
            {tag}
            <button onClick={() => setTags(tags.filter(t => t !== tag))} className="hover:opacity-60 transition-opacity">
              <X size={10} />
            </button>
          </span>
        ))}
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(); } }}
          placeholder={tags.length === 0 ? 'Add tags...' : ''}
          className="flex-1 min-w-[80px] bg-transparent outline-none text-[0.875rem] text-[#111827] placeholder:text-[#9CA3AF]"
        />
      </div>
      <p className="text-[0.75rem] text-[#6B7280]">Press Enter or comma to add a tag</p>
    </div>
  );
}

/* ─── Status badge ──────────────────────────────────────────────────────── */
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { color: ChipColor; dot: boolean }> = {
    'Approved':  { color: 'success', dot: true },
    'Pending':   { color: 'warning', dot: true },
    'Denied':    { color: 'error',   dot: true },
    'In Review': { color: 'info',    dot: true },
    'Draft':     { color: 'neutral', dot: true },
    'Urgent':    { color: 'error',   dot: false },
  };
  const cfg = map[status] || { color: 'neutral', dot: false };
  return <Chip label={status} color={cfg.color} variant="soft" size="sm" shape="pill" dot={cfg.dot} />;
}

export function ChipsSection() {
  return (
    <SectionWrapper
      id="chips"
      title="Chips, Tags & Badges"
      subtitle="Chips represent attributes, filters, or status. They enable quick scanning and compact classification of data — critical in healthcare dashboards for claim status, payer groups, and filters."
    >
      {/* Color Variants */}
      <SubSection title="Color Variants" description="Soft variant (default) across all semantic colors.">
        <ShowcaseBox label="Soft — Pill Shape">
          <div className="flex flex-wrap gap-2">
            {(Object.keys(T) as ChipColor[]).map(c => (
              <Chip key={c} label={c.charAt(0).toUpperCase() + c.slice(1)} color={c} variant="soft" shape="pill" />
            ))}
          </div>
        </ShowcaseBox>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <ShowcaseBox label="Solid">
            <div className="flex flex-wrap gap-2">
              {(['primary', 'success', 'error', 'warning'] as ChipColor[]).map(c => (
                <Chip key={c} label={c.charAt(0).toUpperCase() + c.slice(1)} color={c} variant="solid" shape="pill" />
              ))}
            </div>
          </ShowcaseBox>
          <ShowcaseBox label="Outlined">
            <div className="flex flex-wrap gap-2">
              {(['primary', 'success', 'error', 'neutral'] as ChipColor[]).map(c => (
                <Chip key={c} label={c.charAt(0).toUpperCase() + c.slice(1)} color={c} variant="outlined" shape="pill" />
              ))}
            </div>
          </ShowcaseBox>
          <ShowcaseBox label="Rounded Square">
            <div className="flex flex-wrap gap-2">
              {(['primary', 'teal', 'warning', 'neutral'] as ChipColor[]).map(c => (
                <Chip key={c} label={c.charAt(0).toUpperCase() + c.slice(1)} color={c} variant="soft" shape="rounded" />
              ))}
            </div>
          </ShowcaseBox>
        </div>
      </SubSection>

      {/* Sizes */}
      <SubSection title="Sizes" description="Three sizes to match context — SM in tables, MD inline, LG for filter pills.">
        <ShowcaseBox label="Size Scale">
          <div className="flex flex-wrap items-center gap-4">
            {(['sm', 'md', 'lg'] as ChipSize[]).map(s => (
              <div key={s} className="flex flex-col items-center gap-2">
                <Chip label={s.toUpperCase()} color="primary" variant="soft" size={s} shape="pill" />
                <span className="text-[0.625rem] text-[#9CA3AF]">{s === 'sm' ? '24px' : s === 'md' ? '28px' : '32px'} height</span>
              </div>
            ))}
          </div>
        </ShowcaseBox>
      </SubSection>

      {/* With Icons & Dot Indicators */}
      <SubSection title="With Icons & Status Dots" description="Enrich chips with leading icons or animated status dots.">
        <ShowcaseBox label="Icon & Dot Variants">
          <div className="flex flex-wrap gap-2">
            <Chip label="Medicare" color="primary" variant="soft" shape="pill" icon={<Tag size={12} />} />
            <Chip label="High Priority" color="error" variant="soft" shape="pill" icon={<Zap size={12} />} dot />
            <Chip label="Pending Review" color="warning" variant="soft" shape="pill" dot />
            <Chip label="Verified" color="success" variant="soft" shape="pill" icon={<Check size={12} />} />
            <Chip label="Assigned" color="info" variant="soft" shape="pill" icon={<User size={12} />} />
            <Chip label="Due Today" color="error" variant="outlined" shape="pill" icon={<Clock size={12} />} />
            <Chip label="Starred" color="warning" variant="solid" shape="pill" icon={<Star size={12} />} />
          </div>
        </ShowcaseBox>
      </SubSection>

      {/* Dismissible */}
      <SubSection title="Dismissible Chips" description="Click × to remove a chip. Used in tag inputs, filter bars, and active filter lists.">
        <ShowcaseBox label="Dismissible — click × to remove">
          <div className="flex flex-wrap gap-2">
            <Chip label="Medical Necessity" color="primary" variant="soft" shape="pill" dismissible />
            <Chip label="Auth Required" color="warning" variant="soft" shape="pill" dismissible />
            <Chip label="Timely Filing" color="error" variant="soft" shape="pill" dismissible />
            <Chip label="Coding Error" color="neutral" variant="outlined" shape="pill" dismissible />
            <Chip label="BCBS" color="teal" variant="soft" shape="pill" dismissible />
            <Chip label="Q4 2025" color="success" variant="solid" shape="pill" dismissible />
          </div>
        </ShowcaseBox>
      </SubSection>

      {/* Status Badges */}
      <SubSection title="Status Badges" description="Compact claim status indicators used in tables and claim cards.">
        <ShowcaseBox label="Claim Status Badges">
          <div className="flex flex-wrap gap-2 mb-4">
            {['Approved', 'Pending', 'Denied', 'In Review', 'Draft', 'Urgent'].map(s => (
              <StatusBadge key={s} status={s} />
            ))}
          </div>

          {/* Table row example */}
          <div className="overflow-hidden rounded-lg border border-[#E5E7EB]">
            <table className="w-full text-[0.8125rem]">
              <thead>
                <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                  <th className="text-left px-4 py-2.5 font-semibold text-[#374151]">Claim ID</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-[#374151]">Payer</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-[#374151]">Status</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-[#374151]">Tags</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 'CLM-2025-0041', payer: 'Medicare', status: 'Approved', tags: ['Electronic', 'Q4-2025'] },
                  { id: 'CLM-2025-0042', payer: 'Aetna',    status: 'Pending',  tags: ['Auth Required'] },
                  { id: 'CLM-2025-0043', payer: 'BCBS',     status: 'Denied',   tags: ['Medical Necessity', 'Urgent'] },
                ].map(row => (
                  <tr key={row.id} className="border-b border-[#F3F4F6] last:border-0">
                    <td className="px-4 py-3 font-mono text-[#1A56DB]">{row.id}</td>
                    <td className="px-4 py-3 text-[#374151]">{row.payer}</td>
                    <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {row.tags.map(t => (
                          <Chip key={t} label={t} color="neutral" variant="outlined" size="sm" shape="rounded" />
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ShowcaseBox>
      </SubSection>

      {/* Selectable Filter Chips */}
      <SubSection title="Selectable Filter Chips" description="Multi-select filter bar pattern. Toggle options to filter content.">
        <div className="p-4 rounded-xl border border-[#E5E7EB] bg-white">
          <p className="text-[0.75rem] font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Filter by Payer</p>
          <ChipFilter options={['All', 'Medicare', 'Medicaid', 'BCBS', 'Aetna', 'Cigna', 'United']} />
        </div>
      </SubSection>

      {/* Tag Input */}
      <SubSection title="Tag Input" description="Freeform tag entry for labeling claims, patients, or records.">
        <div className="max-w-md">
          <TagInput />
        </div>
      </SubSection>

      <UsageNote>
        Use <strong>soft variant + pill shape</strong> for status badges. Use <strong>outlined + rounded</strong> for metadata tags.
        Keep chip labels under 24 characters. Dismissible chips must have a minimum touch target of 24×24px for the × button.
        Never use color alone to convey status — always include a label or icon.
      </UsageNote>
    </SectionWrapper>
  );
}