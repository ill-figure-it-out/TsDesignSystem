import React from 'react';

interface SectionWrapperProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionWrapper({ id, title, subtitle, children, className = '' }: SectionWrapperProps) {
  return (
    <section id={id} className={`py-12 border-b border-[#E5E7EB] ${className}`}>
      <div className="mb-8">
        <h2 className="text-[1.875rem] font-bold text-[#00396b] tracking-tight mb-2">{title}</h2>
        {subtitle && <p className="text-[#6B7280] text-[0.9375rem] max-w-2xl">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

interface SubSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function SubSection({ title, description, children, className = '' }: SubSectionProps) {
  return (
    <div className={`mb-10 ${className}`}>
      <h3 className="text-[1.125rem] font-semibold text-[#1F2937] mb-1">{title}</h3>
      {description && <p className="text-[0.875rem] text-[#6B7280] mb-4">{description}</p>}
      {!description && <div className="mb-4" />}
      {children}
    </div>
  );
}

interface CodeBadgeProps {
  children: React.ReactNode;
}

export function CodeBadge({ children }: CodeBadgeProps) {
  return (
    <code className="px-2 py-0.5 bg-[#f3f3f3] text-[#0078ba] text-[0.75rem] rounded font-mono border border-[#E5E7EB]">
      {children}
    </code>
  );
}

interface UsageNoteProps {
  children: React.ReactNode;
}

export function UsageNote({ children }: UsageNoteProps) {
  return (
    <div className="mt-4 p-4 bg-[#ddeef9] border-l-4 border-[#0078ba] rounded-r-lg">
      <p className="text-[0.8125rem] text-[#00396b] leading-relaxed">
        <span className="font-semibold">Usage: </span>
        {children}
      </p>
    </div>
  );
}

interface ShowcaseBoxProps {
  label?: string;
  children: React.ReactNode;
  bg?: string;
  className?: string;
}

export function ShowcaseBox({ label, children, bg = 'bg-[#f3f3f3]', className = '' }: ShowcaseBoxProps) {
  return (
    <div className="rounded-xl border border-[#E5E7EB] overflow-hidden">
      {label && (
        <div className="px-4 py-2 bg-[#ebebeb] border-b border-[#E5E7EB]">
          <span className="text-[0.75rem] font-medium text-[#6B7280] uppercase tracking-wider">{label}</span>
        </div>
      )}
      <div className={`p-6 ${bg} ${className}`}>
        {children}
      </div>
    </div>
  );
}

/* ─── Figma Name Badge ──────────────────────────────────────────────────── */
interface FigmaNameProps {
  name: string;
}

export function FigmaName({ name }: FigmaNameProps) {
  return (
    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#f3f3f3] border border-[#E5E7EB] mb-2">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
        <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z" fill="#0ACF83"/>
        <path d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z" fill="#A259FF"/>
        <path d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z" fill="#F24E1E"/>
        <path d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z" fill="#FF7262"/>
        <path d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z" fill="#1ABCFE"/>
      </svg>
      <span className="text-[0.5625rem] font-mono text-[#6B7280]">{name}</span>
    </div>
  );
}

/* ─── Variant Card ──────────────────────────────────────────────────────── */
interface VariantCardProps {
  figmaName: string;
  label: string;
  children: React.ReactNode;
  state?: 'default' | 'hover' | 'active' | 'disabled' | 'focus' | 'error' | 'loading';
}

export function VariantCard({ figmaName, label, children, state }: VariantCardProps) {
  const stateColors: Record<string, string> = {
    default: '#6B7280',
    hover:   '#0078ba',
    active:  '#00396b',
    disabled:'#9CA3AF',
    focus:   '#5bb0e1',
    error:   '#DC2626',
    loading: '#D97706',
  };
  const stateColor = state ? stateColors[state] : '#6B7280';

  return (
    <div className="p-4 rounded-xl border border-[#E5E7EB] bg-white flex flex-col gap-2">
      <FigmaName name={figmaName} />
      {state && (
        <span
          className="inline-flex w-fit items-center px-1.5 py-0.5 rounded text-[0.5rem] font-bold uppercase tracking-wider"
          style={{ backgroundColor: `${stateColor}18`, color: stateColor }}
        >
          {state}
        </span>
      )}
      <p className="text-[0.6875rem] font-semibold text-[#6B7280] uppercase tracking-wider">{label}</p>
      <div>{children}</div>
    </div>
  );
}
