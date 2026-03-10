import React, { useState } from 'react';
import { SectionWrapper, SubSection, UsageNote, FigmaName } from './SectionWrapper';
import {
  Eye, Keyboard, Monitor, Volume2,
  CheckCircle, XCircle, AlertTriangle, Info, ChevronRight,
} from 'lucide-react';

/* ─── Contrast Pair Row ──────────────────────────────────────────────────── */
function ContrastRow({
  bg, text, bgLabel, textLabel, ratio, wcag, usage,
}: {
  bg: string; text: string; bgLabel: string; textLabel: string;
  ratio: string; wcag: 'AAA' | 'AA' | 'AA Large' | 'Fail';
  usage: string;
}) {
  const wcagConfig = {
    AAA:      { bg: '#DCFCE7', text: '#15803D', icon: CheckCircle },
    AA:       { bg: '#DCFCE7', text: '#15803D', icon: CheckCircle },
    'AA Large': { bg: '#FEF3C7', text: '#B45309', icon: AlertTriangle },
    Fail:     { bg: '#FEE2E2', text: '#B91C1C', icon: XCircle },
  };
  const cfg = wcagConfig[wcag];

  return (
    <div className="flex items-center gap-4 p-3 rounded-xl border border-[#E5E7EB] bg-white hover:shadow-sm transition-shadow">
      {/* Color preview */}
      <div
        className="w-24 h-12 rounded-lg flex items-center justify-center flex-shrink-0 border border-[#E5E7EB]"
        style={{ backgroundColor: bg }}
      >
        <span className="text-[0.75rem] font-bold" style={{ color: text }}>Aa</span>
      </div>

      {/* Labels */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-[0.625rem] font-mono text-[#9CA3AF]">{bgLabel}</span>
          <ChevronRight size={9} className="text-[#D1D5DB]" />
          <span className="text-[0.625rem] font-mono text-[#9CA3AF]">{textLabel}</span>
        </div>
        <p className="text-[0.75rem] text-[#374151]">{usage}</p>
      </div>

      {/* Ratio */}
      <div className="text-right flex-shrink-0">
        <p className="text-[1rem] font-extrabold text-[#111827]">{ratio}</p>
        <p className="text-[0.5rem] text-[#9CA3AF]">contrast ratio</p>
      </div>

      {/* WCAG badge */}
      <div
        className="flex items-center gap-1 px-2 py-1 rounded-lg flex-shrink-0"
        style={{ backgroundColor: cfg.bg, color: cfg.text }}
      >
        <cfg.icon size={11} />
        <span className="text-[0.5625rem] font-bold">{wcag}</span>
      </div>
    </div>
  );
}

/* ─── Focus Ring Demo ─────────────────────────────────────────────────────── */
function FocusDemo({ label, type }: { label: string; type: 'button' | 'input' | 'link' | 'checkbox' }) {
  return (
    <div className="p-4 rounded-xl border border-[#E5E7EB] bg-white text-center">
      <p className="text-[0.5625rem] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">{label}</p>
      {type === 'button' && (
        <button
          className="px-4 py-2 rounded-lg text-white font-medium"
          style={{
            backgroundColor: '#0078ba',
            outline: '2px solid #0078ba',
            outlineOffset: '2px',
            boxShadow: '0 0 0 4px rgba(0,120,186,0.25)',
            fontSize: '0.8125rem',
          }}
        >
          Add Claim
        </button>
      )}
      {type === 'input' && (
        <div
          className="border-2 rounded-lg px-3 py-2"
          style={{
            borderColor: '#0078ba',
            boxShadow: '0 0 0 3px rgba(0,120,186,0.2)',
          }}
        >
          <input
            className="outline-none text-[#374151] w-full"
            style={{ fontSize: '0.8125rem' }}
            placeholder="Search claims..."
            readOnly
          />
        </div>
      )}
      {type === 'link' && (
        <a
          href="#"
          onClick={e => e.preventDefault()}
          className="font-medium"
          style={{
            color: '#0078ba',
            textDecoration: 'underline',
            outline: '2px solid #0078ba',
            outlineOffset: '3px',
            borderRadius: '2px',
            fontSize: '0.875rem',
          }}
        >
          View claim details
        </a>
      )}
      {type === 'checkbox' && (
        <div className="flex items-center justify-center gap-2">
          <div
            className="w-5 h-5 rounded border-2 flex items-center justify-center"
            style={{
              borderColor: '#0078ba',
              backgroundColor: '#0078ba',
              boxShadow: '0 0 0 3px rgba(0,120,186,0.25)',
            }}
          >
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-[0.8125rem] text-[#374151]">Approved only</span>
        </div>
      )}
      <p className="text-[0.5625rem] font-mono text-[#9CA3AF] mt-3">
        {type === 'button' && 'ring-2 ring-[#0078ba] ring-offset-2'}
        {type === 'input'  && 'border-[#0078ba] ring-3 ring-[#0078ba]/20'}
        {type === 'link'   && 'outline-2 outline-[#0078ba] outline-offset-3'}
        {type === 'checkbox' && 'ring-3 ring-[#0078ba]/25'}
      </p>
    </div>
  );
}

/* ─── ARIA Pattern Card ───────────────────────────────────────────────────── */
function AriaCard({ tag, attrs, desc, example }: {
  tag: string; attrs: string[]; desc: string; example: string;
}) {
  return (
    <div className="p-4 rounded-xl border border-[#E5E7EB] bg-white">
      <code className="text-[0.625rem] font-mono bg-[#ddeef9] text-[#0078ba] px-2 py-0.5 rounded mb-2 inline-block">{tag}</code>
      <p className="text-[0.6875rem] text-[#374151] mb-2">{desc}</p>
      <div className="flex flex-wrap gap-1 mb-2">
        {attrs.map(a => (
          <code key={a} className="text-[0.5rem] font-mono bg-[#f3f3f3] text-[#6B7280] border border-[#E5E7EB] px-1.5 py-0.5 rounded">{a}</code>
        ))}
      </div>
      <div className="p-2 bg-[#f3f3f3] rounded-lg border-l-2 border-[#0078ba]">
        <code className="text-[0.5625rem] font-mono text-[#6B7280] break-all">{example}</code>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export function AccessibilitySection() {
  const [simulationMode, setSimulationMode] = useState<'normal' | 'protanopia' | 'deuteranopia' | 'monochrome'>('normal');

  const statusColors: Record<string, { normal: string; label: string }> = {
    approved: { normal: '#16A34A', label: 'Approved'  },
    denied:   { normal: '#DC2626', label: 'Denied'    },
    pending:  { normal: '#D97706', label: 'Pending'   },
    review:   { normal: '#0078ba', label: 'In Review' },
  };

  const simulatedColors: Record<string, Record<string, string>> = {
    normal:       { approved: '#16A34A', denied: '#DC2626', pending: '#D97706', review: '#0078ba' },
    protanopia:   { approved: '#8B8000', denied: '#2B5EA8', pending: '#C8A000', review: '#2B5EA8' },
    deuteranopia: { approved: '#9A8500', denied: '#2B64B8', pending: '#C8A200', review: '#2B64B8' },
    monochrome:   { approved: '#555555', denied: '#111111', pending: '#888888', review: '#333333' },
  };

  const simColors = simulatedColors[simulationMode];

  return (
    <SectionWrapper
      id="accessibility"
      title="Accessibility Guidelines"
      subtitle="WCAG 2.1 AA compliance requirements, focus management patterns, color contrast rules, and ARIA labeling conventions for all TrueSight components."
    >
      {/* Compliance Level Banner */}
      <div
        className="rounded-xl p-5 mb-8 flex items-start gap-4"
        style={{ background: 'linear-gradient(135deg, #ddeef9 0%, #f0f8ff 100%)', border: '1.5px solid #bdddf5' }}
      >
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
          <CheckCircle size={18} className="text-[#0078ba]" />
        </div>
        <div className="flex-1">
          <p className="text-[0.875rem] font-bold text-[#00396b] mb-1">WCAG 2.1 Level AA — Baseline Compliance Target</p>
          <p className="text-[0.8125rem] text-[#374151] leading-relaxed max-w-2xl">
            All TrueSight components are designed to meet or exceed WCAG 2.1 Level AA. This includes minimum 4.5:1 contrast for normal text, 3:1 for large text and UI components, visible focus indicators, and full keyboard navigability.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {[
              { label: '1.4.3 Contrast (AA)',      color: '#16A34A' },
              { label: '2.1.1 Keyboard',            color: '#0078ba' },
              { label: '2.4.7 Focus Visible',       color: '#5bb0e1' },
              { label: '4.1.2 Name, Role, Value',   color: '#D97706' },
              { label: '1.4.11 Non-text Contrast',  color: '#8B5CF6' },
            ].map(b => (
              <span
                key={b.label}
                className="px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: b.color, fontSize: '0.5625rem', fontWeight: 700 }}
              >
                {b.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Color Contrast */}
      <SubSection
        title="Color Contrast Matrix"
        description="All approved text/background color combinations verified against WCAG 2.1 SC 1.4.3 (minimum 4.5:1 for body text, 3:1 for large text)."
      >
        <div className="space-y-2">
          <ContrastRow bg="#00396b" text="#ffffff" bgLabel="#00396b" textLabel="#ffffff" ratio="12.6:1" wcag="AAA"      usage="Primary nav, headings on dark bg" />
          <ContrastRow bg="#0078ba" text="#ffffff" bgLabel="#0078ba" textLabel="#ffffff" ratio="4.8:1"  wcag="AA"       usage="Primary buttons, active links" />
          <ContrastRow bg="#5bb0e1" text="#ffffff" bgLabel="#5bb0e1" textLabel="#ffffff" ratio="2.9:1"  wcag="AA Large" usage="Large headings, badges (18px+)" />
          <ContrastRow bg="#5bb0e1" text="#00396b" bgLabel="#5bb0e1" textLabel="#00396b" ratio="4.6:1"  wcag="AA"       usage="Secondary chips on light blue" />
          <ContrastRow bg="#ffffff" text="#00396b" bgLabel="#ffffff" textLabel="#00396b" ratio="12.6:1" wcag="AAA"      usage="Body text on white backgrounds" />
          <ContrastRow bg="#ffffff" text="#374151" bgLabel="#ffffff" textLabel="#374151" ratio="8.6:1"  wcag="AAA"      usage="Secondary body text" />
          <ContrastRow bg="#f3f3f3" text="#374151" bgLabel="#f3f3f3" textLabel="#374151" ratio="7.9:1"  wcag="AAA"      usage="Labels on background grey" />
          <ContrastRow bg="#DCFCE7" text="#15803D" bgLabel="#DCFCE7" textLabel="#15803D" ratio="5.3:1"  wcag="AA"       usage="Success badges and alert text" />
          <ContrastRow bg="#FEE2E2" text="#B91C1C" bgLabel="#FEE2E2" textLabel="#B91C1C" ratio="4.7:1"  wcag="AA"       usage="Error badges and alert text" />
          <ContrastRow bg="#ddeef9" text="#0078ba" bgLabel="#ddeef9" textLabel="#0078ba" ratio="3.2:1"  wcag="AA Large" usage="Info badges (large text only)" />
        </div>
        <UsageNote>
          The <strong>#5bb0e1 secondary blue</strong> only passes AA at large text sizes (18pt regular or 14pt bold). Never use it for small body text or button labels. Pair it with <strong>#00396b</strong> navy for sufficient contrast at any size.
        </UsageNote>
      </SubSection>

      {/* Color Blindness Simulation */}
      <SubSection
        title="Color Vision Deficiency Simulation"
        description="Status indicators must communicate meaning through shape+icon+label, not color alone. Toggle simulations to verify."
      >
        <div className="mb-4 flex flex-wrap gap-2">
          {[
            { id: 'normal',       label: 'Normal Vision'  },
            { id: 'protanopia',   label: 'Protanopia (Red-Blind)' },
            { id: 'deuteranopia', label: 'Deuteranopia (Green-Blind)' },
            { id: 'monochrome',   label: 'Monochromacy'  },
          ].map(m => (
            <button
              key={m.id}
              onClick={() => setSimulationMode(m.id as any)}
              className={`px-3 py-1.5 rounded-lg border font-medium transition-colors`}
              style={{
                fontSize: '0.6875rem',
                backgroundColor: simulationMode === m.id ? '#0078ba' : 'white',
                color: simulationMode === m.id ? 'white' : '#374151',
                borderColor: simulationMode === m.id ? '#0078ba' : '#D1D5DB',
              }}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="p-5 rounded-xl border border-[#E5E7EB] bg-white">
          <p className="text-[0.6875rem] font-semibold text-[#374151] uppercase tracking-wider mb-4">
            Claim Status Badges — {simulationMode === 'normal' ? 'Normal Vision' : simulationMode.charAt(0).toUpperCase() + simulationMode.slice(1)} Simulation
          </p>

          {/* Without icons — color-only (bad) */}
          <div className="mb-4">
            <p className="text-[0.5625rem] text-[#DC2626] font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
              <XCircle size={9} /> Color only (non-compliant in color-deficient vision)
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(statusColors).map(([key, { label }]) => (
                <span
                  key={key}
                  className="px-3 py-1 rounded-full text-white"
                  style={{ backgroundColor: simColors[key], fontSize: '0.6875rem', fontWeight: 600 }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* With icons — accessible */}
          <div>
            <p className="text-[0.5625rem] text-[#16A34A] font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
              <CheckCircle size={9} /> Icon + label (compliant — passes all simulations)
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'approved', icon: CheckCircle, iconColor: '#15803D', bg: '#DCFCE7', text: '#15803D', label: 'Approved'  },
                { key: 'denied',   icon: XCircle,     iconColor: '#B91C1C', bg: '#FEE2E2', text: '#B91C1C', label: 'Denied'    },
                { key: 'pending',  icon: AlertTriangle,iconColor: '#B45309',bg: '#FEF3C7', text: '#B45309', label: 'Pending'   },
                { key: 'review',   icon: Info,        iconColor: '#0078ba', bg: '#ddeef9', text: '#0078ba', label: 'In Review' },
              ].map(s => (
                <span
                  key={s.key}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: simulationMode === 'monochrome' ? '#E5E7EB' : s.bg,
                    color: simulationMode === 'monochrome' ? '#374151' : s.text,
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                  }}
                >
                  <s.icon size={10} />
                  {s.label}
                </span>
              ))}
            </div>
          </div>
        </div>
        <UsageNote>
          Always pair status colors with a semantic icon (CheckCircle → success, XCircle → error, AlertTriangle → warning, Info → informational). The icon shape alone communicates status for users with color vision deficiencies, and the text label provides redundancy for screen reader users.
        </UsageNote>
      </SubSection>

      {/* Focus Management */}
      <SubSection
        title="Focus Indicators"
        description="WCAG 2.4.7 requires that keyboard focus is visible. All TrueSight interactive elements use a consistent 2px ring in brand blue with 2px offset."
      >
        <FigmaName name="Accessibility / Focus / Ring" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
          <FocusDemo label="Button Focus"   type="button"   />
          <FocusDemo label="Input Focus"    type="input"    />
          <FocusDemo label="Link Focus"     type="link"     />
          <FocusDemo label="Checkbox Focus" type="checkbox" />
        </div>

        <div className="mt-4 p-4 rounded-xl border border-[#E5E7EB] bg-white">
          <p className="text-[0.6875rem] font-bold text-[#374151] uppercase tracking-wider mb-3">Tailwind Focus Token System</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                label: 'Primary Interactive (Buttons, Links)',
                classes: ['focus:outline-none', 'focus:ring-2', 'focus:ring-[#0078ba]', 'focus:ring-offset-2'],
              },
              {
                label: 'Input Fields',
                classes: ['focus:border-[#0078ba]', 'focus:ring-3', 'focus:ring-[#0078ba]/20', 'focus:outline-none'],
              },
              {
                label: 'Dark Background Contexts',
                classes: ['focus:ring-2', 'focus:ring-white', 'focus:ring-offset-2', 'focus:ring-offset-[#00396b]'],
              },
            ].map(t => (
              <div key={t.label} className="p-3 rounded-lg bg-[#f3f3f3]">
                <p className="text-[0.5625rem] font-bold text-[#374151] mb-2">{t.label}</p>
                <div className="flex flex-wrap gap-1">
                  {t.classes.map(c => (
                    <code key={c} className="text-[0.5rem] font-mono bg-white text-[#0078ba] border border-[#bdddf5] px-1 py-0.5 rounded">{c}</code>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <UsageNote>
          Never use <code className="font-mono">outline: none</code> without replacing it with a custom focus ring. The minimum focus indicator size is 3:1 contrast against adjacent colors per WCAG 2.1 SC 1.4.11 (Non-text Contrast).
        </UsageNote>
      </SubSection>

      {/* Keyboard Navigation */}
      <SubSection
        title="Keyboard Navigation Patterns"
        description="All TrueSight interactive components follow WAI-ARIA Authoring Practices for keyboard interaction."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            {
              component: 'Button',
              keys: [
                { key: 'Tab / Shift+Tab', action: 'Move focus to/from button' },
                { key: 'Enter / Space',   action: 'Activate the button' },
              ],
            },
            {
              component: 'Dropdown Menu',
              keys: [
                { key: 'Enter / Space', action: 'Open menu' },
                { key: '↑ / ↓',        action: 'Navigate items' },
                { key: 'Escape',        action: 'Close, return focus to trigger' },
                { key: 'Home / End',    action: 'Jump to first/last item' },
              ],
            },
            {
              component: 'Modal / Dialog',
              keys: [
                { key: 'Tab',    action: 'Cycle focus within dialog (trapped)' },
                { key: 'Escape', action: 'Close dialog, restore page focus' },
              ],
            },
            {
              component: 'Data Table',
              keys: [
                { key: 'Tab',       action: 'Move to next interactive cell/row' },
                { key: '↑ / ↓',    action: 'Navigate between rows' },
                { key: 'Enter',     action: 'Activate row action / expand' },
                { key: 'Space',     action: 'Select row (if selectable)' },
              ],
            },
            {
              component: 'Tab Bar',
              keys: [
                { key: '← / →',  action: 'Move between tabs' },
                { key: 'Home',    action: 'First tab' },
                { key: 'End',     action: 'Last tab' },
                { key: 'Enter',   action: 'Activate focused tab' },
              ],
            },
            {
              component: 'Checkbox / Radio',
              keys: [
                { key: 'Tab / Shift+Tab', action: 'Move focus' },
                { key: 'Space',           action: 'Toggle checkbox' },
                { key: '↑ / ���',          action: 'Cycle radio group options' },
              ],
            },
          ].map(c => (
            <div key={c.component} className="p-4 rounded-xl border border-[#E5E7EB] bg-white">
              <div className="flex items-center gap-2 mb-3">
                <Keyboard size={12} className="text-[#0078ba]" />
                <p className="text-[0.75rem] font-bold text-[#111827]">{c.component}</p>
              </div>
              <div className="space-y-2">
                {c.keys.map(k => (
                  <div key={k.key} className="flex items-start gap-2">
                    <kbd className="px-1.5 py-0.5 rounded bg-[#f3f3f3] border border-[#D1D5DB] text-[#374151] font-mono whitespace-nowrap flex-shrink-0" style={{ fontSize: '0.5rem' }}>
                      {k.key}
                    </kbd>
                    <span className="text-[0.5625rem] text-[#6B7280]">{k.action}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SubSection>

      {/* ARIA Patterns */}
      <SubSection
        title="ARIA Labeling Patterns"
        description="Required ARIA attributes for semantic HTML in TrueSight components."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <AriaCard
            tag="<button>"
            attrs={['aria-label', 'aria-disabled', 'aria-pressed', 'aria-expanded']}
            desc="Buttons require aria-label when the visible label is insufficient (icon-only buttons)."
            example='<button aria-label="Delete claim CLM-08843" aria-disabled="false">'
          />
          <AriaCard
            tag="<input>"
            attrs={['aria-label', 'aria-required', 'aria-invalid', 'aria-describedby']}
            desc="Form inputs must be associated with a visible label or aria-label. Error messages use aria-describedby."
            example='<input aria-required="true" aria-invalid="true" aria-describedby="dob-error" />'
          />
          <AriaCard
            tag="<dialog>"
            attrs={['role="dialog"', 'aria-modal="true"', 'aria-labelledby', 'aria-describedby']}
            desc="Modal dialogs trap focus and require a descriptive title linked via aria-labelledby."
            example='<div role="dialog" aria-modal="true" aria-labelledby="dialog-title">'
          />
          <AriaCard
            tag="<nav>"
            attrs={['aria-label', 'aria-current="page"', 'role="navigation"']}
            desc="Navigation landmarks require a descriptive aria-label to distinguish them. Active links use aria-current='page'."
            example='<nav aria-label="Primary navigation"><a aria-current="page" href="/claims">'
          />
          <AriaCard
            tag="<table>"
            attrs={['role="table"', 'aria-label', 'scope="col"', 'aria-sort']}
            desc="Data tables require proper th scope attributes and aria-sort for sortable columns."
            example='<th scope="col" aria-sort="ascending">Claim ID</th>'
          />
          <AriaCard
            tag="Status Badges"
            attrs={['role="status"', 'aria-live="polite"', 'aria-label']}
            desc="Dynamic status updates should use aria-live regions so screen readers announce changes."
            example='<span role="status" aria-label="Claim status: Approved">'
          />
        </div>
        <UsageNote>
          Use <code className="font-mono">aria-live="polite"</code> for non-critical updates (status changes, filter counts) and <code className="font-mono">aria-live="assertive"</code> only for critical errors that require immediate attention. Never use assertive for routine UI updates — it interrupts screen reader narration.
        </UsageNote>
      </SubSection>

      {/* Motion & Reduced Motion */}
      <SubSection
        title="Motion & Reduced Motion"
        description="Animations must respect the prefers-reduced-motion media query. TrueSight uses subtle, functional transitions only."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Allowed',
              icon: CheckCircle,
              color: '#16A34A',
              bg: '#DCFCE7',
              items: [
                'Color transitions on hover/focus (150ms)',
                'Opacity changes for overlays (200ms)',
                'Height/max-height for accordion expand (200ms)',
                'Border changes for focus rings',
              ],
            },
            {
              title: 'Use Sparingly',
              icon: AlertTriangle,
              color: '#D97706',
              bg: '#FEF3C7',
              items: [
                'Slide-in for modals and drawers (300ms max)',
                'Loading spinners (animate-spin)',
                'Progress bar fills',
                'Toast entrance/exit',
              ],
            },
            {
              title: 'Avoid',
              icon: XCircle,
              color: '#DC2626',
              bg: '#FEE2E2',
              items: [
                'Parallax scrolling effects',
                'Auto-playing animations',
                'Rapid flashing (>3 times/sec)',
                'Large-scale transforms without pause',
              ],
            },
          ].map(cat => (
            <div key={cat.title} className="p-4 rounded-xl border border-[#E5E7EB] bg-white">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: cat.bg }}>
                  <cat.icon size={13} style={{ color: cat.color }} />
                </div>
                <p className="text-[0.75rem] font-bold" style={{ color: cat.color }}>{cat.title}</p>
              </div>
              <ul className="space-y-1.5">
                {cat.items.map(item => (
                  <li key={item} className="flex items-start gap-1.5">
                    <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: cat.color }} />
                    <span className="text-[0.6875rem] text-[#6B7280]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 rounded-xl bg-[#f3f3f3] border border-[#E5E7EB]">
          <p className="text-[0.6875rem] font-bold text-[#374151] uppercase tracking-wider mb-2">Tailwind Reduced-Motion Pattern</p>
          <code className="text-[0.6875rem] font-mono text-[#0078ba] leading-relaxed">
            {`className="transition-colors duration-150 motion-reduce:transition-none"`}
          </code>
          <br />
          <code className="text-[0.6875rem] font-mono text-[#0078ba]">
            {`className="animate-spin motion-reduce:animate-none"`}
          </code>
        </div>
        <UsageNote>
          Always add <code className="font-mono">motion-reduce:transition-none</code> and <code className="font-mono">motion-reduce:animate-none</code> to any Tailwind animation or transition class. This respects the OS-level "Reduce motion" accessibility setting.
        </UsageNote>
      </SubSection>

      {/* Checklist */}
      <SubSection
        title="Component Accessibility Checklist"
        description="Run this checklist on every component before marking it as production-ready in the Figma library."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              category: 'Visual',
              icon: Eye,
              color: '#0078ba',
              checks: [
                'Text contrast ≥ 4.5:1 (body) or ≥ 3:1 (large)',
                'Non-text UI elements ≥ 3:1 contrast',
                'Focus indicator visible and ≥ 3:1 contrast',
                'Status not conveyed by color alone',
                'Touch targets ≥ 44×44px on mobile',
              ],
            },
            {
              category: 'Keyboard',
              icon: Keyboard,
              color: '#00396b',
              checks: [
                'All actions reachable via Tab / arrow keys',
                'Focus trap in modals and dialogs',
                'Escape closes overlays and returns focus',
                'No keyboard traps (except intentional modal)',
                'Skip nav link for long sidebar navigation',
              ],
            },
            {
              category: 'Screen Reader',
              icon: Volume2,
              color: '#5bb0e1',
              checks: [
                'Meaningful alt text on all images',
                'Icon-only buttons have aria-label',
                'Form inputs associated with visible labels',
                'Error messages linked via aria-describedby',
                'Dynamic content uses aria-live regions',
              ],
            },
            {
              category: 'Structure',
              icon: Monitor,
              color: '#16A34A',
              checks: [
                'Page has a single H1 landmark',
                'Headings follow correct hierarchy (H1→H2→H3)',
                'Navigation uses <nav> with aria-label',
                'Tables use <th scope="col/row">',
                'Lists use <ul>/<ol> for related items',
              ],
            },
          ].map(cat => (
            <div key={cat.category} className="p-4 rounded-xl border border-[#E5E7EB] bg-white">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${cat.color}18` }}>
                  <cat.icon size={13} style={{ color: cat.color }} />
                </div>
                <p className="text-[0.75rem] font-bold text-[#111827]">{cat.category}</p>
              </div>
              <ul className="space-y-2">
                {cat.checks.map(c => (
                  <li key={c} className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded border-2 border-[#D1D5DB] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle size={9} className="text-[#D1D5DB]" />
                    </div>
                    <span className="text-[0.6875rem] text-[#6B7280]">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SubSection>
    </SectionWrapper>
  );
}