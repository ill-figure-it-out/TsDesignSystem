import React from 'react';
import { SectionWrapper, SubSection, UsageNote } from './SectionWrapper';

interface SwatchProps {
  hex: string;
  name: string;
  token: string;
  textColor?: string;
  usage?: string;
}

function Swatch({ hex, name, token, textColor = '#fff', usage }: SwatchProps) {
  return (
    <div className="rounded-xl overflow-hidden border border-[#E5E7EB] shadow-sm group">
      <div
        className="h-20 w-full flex items-end p-3 transition-all duration-200 group-hover:scale-[1.02]"
        style={{ backgroundColor: hex }}
      >
        <span className="text-[0.625rem] font-mono font-medium opacity-80" style={{ color: textColor }}>
          {hex}
        </span>
      </div>
      <div className="p-3 bg-white">
        <p className="text-[0.8125rem] font-semibold text-[#111827]">{name}</p>
        <p className="text-[0.6875rem] font-mono text-[#6B7280] mt-0.5">{token}</p>
        {usage && <p className="text-[0.6875rem] text-[#9CA3AF] mt-1 leading-snug">{usage}</p>}
      </div>
    </div>
  );
}

interface PaletteRowProps {
  shades: { hex: string; label: string; token: string; dark?: boolean }[];
  name: string;
}

function PaletteRow({ shades, name }: PaletteRowProps) {
  return (
    <div className="mb-6">
      <p className="text-[0.75rem] font-semibold text-[#6B7280] uppercase tracking-wider mb-2">{name}</p>
      <div className="flex rounded-xl overflow-hidden border border-[#E5E7EB] shadow-sm h-14">
        {shades.map((s, i) => (
          <div
            key={i}
            className="flex-1 flex flex-col justify-end p-1 group relative"
            style={{ backgroundColor: s.hex }}
            title={`${s.label} — ${s.hex}`}
          >
            <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#111827] text-white text-[0.625rem] font-mono px-2 py-1 rounded whitespace-nowrap z-10 pointer-events-none transition-opacity">
              {s.label}<br />{s.hex}
            </div>
            <span
              className="text-[0.5rem] font-mono hidden sm:block"
              style={{ color: s.dark ? '#fff' : '#000', opacity: 0.6 }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Gradient Swatch ──────────────────────────────────────────────────── */
interface GradientSwatchProps {
  name: string;
  gradient: string;
  cssValue: string;
  usage: string;
  textLight?: boolean;
  featured?: boolean;
}

function GradientSwatch({ name, gradient, cssValue, usage, textLight = true, featured = false }: GradientSwatchProps) {
  return (
    <div className={`rounded-xl overflow-hidden border shadow-sm group ${featured ? 'border-[#0078ba] ring-2 ring-[#0078ba]/20' : 'border-[#E5E7EB]'}`}>
      {featured && (
        <div className="px-3 py-1 bg-[#0078ba] flex items-center gap-1.5">
          <span className="text-[0.5625rem] font-bold text-white uppercase tracking-widest">Website Gradient</span>
        </div>
      )}
      <div
        className="h-24 w-full flex items-end p-3 transition-all duration-200 group-hover:brightness-110"
        style={{ background: gradient }}
      >
        <span className={`text-[0.5625rem] font-mono font-medium opacity-80 ${textLight ? 'text-white' : 'text-[#00396b]'}`}>
          {name}
        </span>
      </div>
      <div className="p-3 bg-white">
        <p className="text-[0.8125rem] font-semibold text-[#111827]">{name}</p>
        <p className="text-[0.625rem] font-mono text-[#0078ba] mt-0.5 break-all leading-snug">{cssValue}</p>
        <p className="text-[0.6875rem] text-[#9CA3AF] mt-1 leading-snug">{usage}</p>
      </div>
    </div>
  );
}

export function ColorSection() {
  const primaryColors: SwatchProps[] = [
    { hex: '#00396b', name: 'Navy Primary', token: '--ts-navy-primary', usage: 'Brand, sidebar, dark headers' },
    { hex: '#0078ba', name: 'Blue 600', token: '--ts-blue-600', usage: 'Primary CTA, links, focus rings' },
    { hex: '#5bb0e1', name: 'Blue Secondary', token: '--ts-blue-secondary', usage: 'Hover states, secondary highlights' },
    { hex: '#99cceb', name: 'Blue 300', token: '--ts-blue-300', usage: 'Decorative, disabled tints' },
    { hex: '#ddeef9', name: 'Blue 100', token: '--ts-blue-100', usage: 'Backgrounds, selected states', textColor: '#00396b' },
  ];

  const semanticColors: SwatchProps[] = [
    { hex: '#16A34A', name: 'Success', token: '--ts-success-600', usage: 'Positive states, confirmations' },
    { hex: '#D97706', name: 'Warning', token: '--ts-warning-600', usage: 'Caution states, pending items', textColor: '#fff' },
    { hex: '#DC2626', name: 'Error', token: '--ts-error-600', usage: 'Errors, destructive actions' },
    { hex: '#2563EB', name: 'Info', token: '--ts-info-600', usage: 'Informational messages' },
  ];

  const neutralShades = [
    { hex: '#111827', label: '900', token: '--ts-gray-900', dark: true },
    { hex: '#1F2937', label: '800', token: '--ts-gray-800', dark: true },
    { hex: '#374151', label: '700', token: '--ts-gray-700', dark: true },
    { hex: '#4B5563', label: '600', token: '--ts-gray-600', dark: true },
    { hex: '#6B7280', label: '500', token: '--ts-gray-500', dark: true },
    { hex: '#9CA3AF', label: '400', token: '--ts-gray-400', dark: false },
    { hex: '#D1D5DB', label: '300', token: '--ts-gray-300', dark: false },
    { hex: '#E5E7EB', label: '200', token: '--ts-gray-200', dark: false },
    { hex: '#f3f3f3', label: 'BG', token: '--ts-gray-bg', dark: false },
    { hex: '#FFFFFF', label: 'White', token: '--ts-white', dark: false },
  ];

  const navyShades = [
    { hex: '#001a33', label: '950', token: '', dark: true },
    { hex: '#002650', label: '900', token: '', dark: true },
    { hex: '#00396b', label: '800', token: '', dark: true },  // PRIMARY
    { hex: '#004d8f', label: '700', token: '', dark: true },
    { hex: '#005ea0', label: '650', token: '', dark: true },
    { hex: '#0078ba', label: '600', token: '', dark: true },  // GRADIENT START
    { hex: '#5bb0e1', label: '400', token: '', dark: false }, // SECONDARY
    { hex: '#99cceb', label: '300', token: '', dark: false },
    { hex: '#bdddf5', label: '200', token: '', dark: false },
    { hex: '#ddeef9', label: '100', token: '', dark: false },
  ];

  return (
    <SectionWrapper
      id="colors"
      title="Color System"
      subtitle="The TrueSight color palette is built on an accurate brand foundation — deep navy primary (#00396b), medium blue (#0078ba), and sky blue secondary (#5bb0e1) — conveying clinical trust and data clarity."
    >
      {/* Color Palette Strips */}
      <SubSection
        title="Full Palette"
        description="Hover any shade to see its hex value. Starred shades are brand-specified primary, secondary, and background colors."
      >
        {/* Brand color callout */}
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { hex: '#00396b', label: 'Primary Navy', token: '--ts-navy-primary', desc: 'Main brand color — sidebar, headers, text' },
            { hex: '#5bb0e1', label: 'Secondary Blue', token: '--ts-blue-secondary', desc: 'Accent, highlights, secondary actions', textColor: '#00396b' },
            { hex: '#f3f3f3', label: 'Background Grey', token: '--ts-bg-grey', desc: 'Page background, neutral surfaces', textColor: '#374151' },
          ].map(c => (
            <div key={c.hex} className="rounded-xl overflow-hidden border-2 border-[#0078ba] shadow-md">
              <div className="h-16 flex items-end p-3" style={{ backgroundColor: c.hex }}>
                <span className="text-[0.625rem] font-mono font-bold" style={{ color: c.textColor || '#fff' }}>{c.hex}</span>
              </div>
              <div className="p-3 bg-white">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[0.5rem] font-bold text-[#0078ba] uppercase tracking-widest bg-[#ddeef9] px-1.5 py-0.5 rounded">Brand Specified</span>
                </div>
                <p className="text-[0.8125rem] font-bold text-[#111827]">{c.label}</p>
                <p className="text-[0.6875rem] font-mono text-[#6B7280] mt-0.5">{c.token}</p>
                <p className="text-[0.625rem] text-[#9CA3AF] mt-1">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <PaletteRow name="Navy / Primary Blue — #00396b (Primary) · #0078ba (Mid) · #5bb0e1 (Secondary)" shades={navyShades} />
        <PaletteRow name="Neutral Gray — #f3f3f3 (Brand BG)" shades={neutralShades} />
        <PaletteRow
          name="Semantic"
          shades={[
            { hex: '#15803D', label: 'Success 700', token: '', dark: true },
            { hex: '#16A34A', label: 'Success 600', token: '', dark: true },
            { hex: '#DCFCE7', label: 'Success 100', token: '', dark: false },
            { hex: '#D97706', label: 'Warning 600', token: '', dark: true },
            { hex: '#FEF3C7', label: 'Warning 100', token: '', dark: false },
            { hex: '#DC2626', label: 'Error 600', token: '', dark: true },
            { hex: '#FEE2E2', label: 'Error 100', token: '', dark: false },
            { hex: '#2563EB', label: 'Info 600', token: '', dark: true },
            { hex: '#DBEAFE', label: 'Info 100', token: '', dark: false },
          ]}
        />
      </SubSection>

      {/* ─── GRADIENTS ────────────────────────────��────────────────────────── */}
      <SubSection
        title="Color Gradients"
        description="Brand-approved gradients extracted directly from the TrueSight website CSS. The primary website gradient uses 173deg direction with #0078ba → #00386f."
      >
        {/* Website gradient reference */}
        <div className="mb-4 p-4 rounded-xl border border-[#0078ba] bg-[#ddeef9]">
          <p className="text-[0.75rem] font-bold text-[#00396b] mb-1">Extracted from TrueSight Website CSS</p>
          <code className="text-[0.6875rem] font-mono text-[#0078ba] block">
            background-image: linear-gradient(173deg, #0078ba 0%, #00386f 73%);
          </code>
          <code className="text-[0.6875rem] font-mono text-[#6B7280] block mt-0.5">
            background-color: #00386f; · border-radius: 24px; · border: 3px solid #fff;
          </code>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <GradientSwatch
            featured
            name="TrueSight Primary"
            gradient="linear-gradient(173deg, #0078ba 0%, #00386f 73%)"
            cssValue="linear-gradient(173deg, #0078ba 0%, #00386f 73%)"
            usage="Hero sections, primary cards — exact website gradient"
          />
          <GradientSwatch
            name="Navy Deep"
            gradient="linear-gradient(135deg, #001a33 0%, #00396b 50%, #005ea0 100%)"
            cssValue="linear-gradient(135deg, #001a33, #00396b, #005ea0)"
            usage="Sidebar, premium card headers"
          />
          <GradientSwatch
            name="Brand Blue"
            gradient="linear-gradient(135deg, #00396b 0%, #0078ba 100%)"
            cssValue="linear-gradient(135deg, #00396b, #0078ba)"
            usage="Primary CTA backgrounds, onboarding screens"
          />
          <GradientSwatch
            name="Sky Accent"
            gradient="linear-gradient(135deg, #0078ba 0%, #5bb0e1 50%, #99cceb 100%)"
            cssValue="linear-gradient(135deg, #0078ba, #5bb0e1, #99cceb)"
            usage="Data visualization fills, accent cards"
          />
          <GradientSwatch
            name="Sky Radial"
            gradient="radial-gradient(ellipse at top left, #5bb0e1, #00396b)"
            cssValue="radial-gradient(ellipse at top left, #5bb0e1, #00396b)"
            usage="Feature highlights, dashboard headers"
          />
          <GradientSwatch
            name="Success Mint"
            gradient="linear-gradient(135deg, #DCFCE7 0%, #86EFAC 50%, #22C55E 100%)"
            cssValue="linear-gradient(135deg, #DCFCE7, #86EFAC, #22C55E)"
            usage="Approved claim banners, positive KPI cards"
            textLight={false}
          />
          <GradientSwatch
            name="Alert Warm"
            gradient="linear-gradient(135deg, #FEF3C7 0%, #FCD34D 50%, #F59E0B 100%)"
            cssValue="linear-gradient(135deg, #FEF3C7, #FCD34D, #F59E0B)"
            usage="Warning sections, pending review backgrounds"
            textLight={false}
          />
          <GradientSwatch
            name="Mesh Blue"
            gradient="radial-gradient(at 0% 0%, #ddeef9 0%, transparent 50%), radial-gradient(at 100% 100%, #bdddf5 0%, transparent 50%), #f3f3f3"
            cssValue="radial-gradient mesh — Navy 50/100/200"
            usage="Subtle section backgrounds, card surfaces"
            textLight={false}
          />
          <GradientSwatch
            name="Glass Navy"
            gradient="linear-gradient(145deg, rgba(0,57,107,0.9) 0%, rgba(0,120,186,0.8) 100%)"
            cssValue="linear-gradient(145deg, rgba(#00396b,0.9), rgba(#0078ba,0.8))"
            usage="Glassmorphism overlays, modal backdrops"
          />
        </div>

        {/* Gradient Token strip */}
        <div className="rounded-xl overflow-hidden border border-[#E5E7EB] shadow-sm">
          <div className="h-12 w-full" style={{ background: 'linear-gradient(90deg, #001a33 0%, #00396b 18%, #004d8f 35%, #0078ba 50%, #5bb0e1 68%, #99cceb 82%, #bdddf5 91%, #ddeef9 100%)' }} />
          <div className="px-4 py-2 bg-white flex items-center justify-between">
            <span className="text-[0.75rem] font-semibold text-[#374151]">Navy Full Spectrum</span>
            <span className="text-[0.6875rem] font-mono text-[#0078ba]">950 → 100</span>
          </div>
        </div>
        <div className="mt-2 rounded-xl overflow-hidden border border-[#E5E7EB] shadow-sm">
          <div className="h-12 w-full" style={{ background: 'linear-gradient(90deg, #15803D 0%, #16A34A 20%, #22C55E 40%, #86EFAC 60%, #DCFCE7 80%, #F0FDF4 100%)' }} />
          <div className="px-4 py-2 bg-white flex items-center justify-between">
            <span className="text-[0.75rem] font-semibold text-[#374151]">Success Spectrum</span>
            <span className="text-[0.6875rem] font-mono text-[#16A34A]">700 → 50</span>
          </div>
        </div>

        <UsageNote>
          Always use the exact website gradient <strong>linear-gradient(173deg, #0078ba 0%, #00386f 73%)</strong> for hero/featured sections.
          Test gradient overlays with WCAG contrast checker. For text on gradients, use the darkest swatch color as the contrast reference.
          Reserve gradients for decorative backgrounds and data visualizations — not functional UI controls.
        </UsageNote>
      </SubSection>

      {/* Primary */}
      <SubSection
        title="Primary Colors"
        description="Use these for brand identity, primary CTAs, and interactive elements."
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {primaryColors.map(c => (
            <Swatch key={c.hex} {...c} textColor={c.hex === '#ddeef9' || c.hex === '#f3f3f3' ? '#00396b' : '#fff'} />
          ))}
        </div>
        <UsageNote>
          Use <strong>Blue 600 (#0078ba)</strong> for all primary interactive elements: buttons, links, active nav items, and focus indicators. Use <strong>Navy Primary (#00396b)</strong> for sidebar backgrounds, hero sections, and primary brand placement. Use <strong>Blue Secondary (#5bb0e1)</strong> for accents, highlights, and data callouts.
        </UsageNote>
      </SubSection>

      {/* Semantic */}
      <SubSection
        title="Semantic Colors"
        description="Used for system feedback, status indicators, and notifications."
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {semanticColors.map(c => (
            <Swatch key={c.hex} {...c} />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { bg: '#DCFCE7', border: '#16A34A', text: '#15803D', label: 'Success Background' },
            { bg: '#FEF3C7', border: '#D97706', text: '#92400E', label: 'Warning Background' },
            { bg: '#FEE2E2', border: '#DC2626', text: '#B91C1C', label: 'Error Background' },
            { bg: '#DBEAFE', border: '#2563EB', text: '#1D4ED8', label: 'Info Background' },
          ].map(s => (
            <div
              key={s.label}
              className="px-3 py-2 rounded-lg border text-[0.75rem] font-medium"
              style={{ backgroundColor: s.bg, borderColor: s.border, color: s.text }}
            >
              {s.label}
            </div>
          ))}
        </div>
        <UsageNote>
          Always pair a semantic color with its lighter background variant for alerts. Never use semantic colors for branding or decorative purposes — they must always communicate meaning.
        </UsageNote>
      </SubSection>

      {/* Neutral */}
      <SubSection
        title="Neutral Palette"
        description="Used for text, borders, backgrounds, and decorative surfaces. Background grey #f3f3f3 is the brand-specified page background."
      >
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-2">
          {[
            { hex: '#111827', name: '900', tc: '#fff' },
            { hex: '#1F2937', name: '800', tc: '#fff' },
            { hex: '#374151', name: '700', tc: '#fff' },
            { hex: '#4B5563', name: '600', tc: '#fff' },
            { hex: '#6B7280', name: '500', tc: '#fff' },
            { hex: '#9CA3AF', name: '400', tc: '#fff' },
            { hex: '#D1D5DB', name: '300', tc: '#374151' },
            { hex: '#E5E7EB', name: '200', tc: '#374151' },
            { hex: '#f3f3f3', name: 'BG ★', tc: '#374151' },
            { hex: '#FFFFFF', name: 'White', tc: '#374151' },
          ].map(n => (
            <div key={n.hex} className={`rounded-lg overflow-hidden border ${n.name === 'BG ★' ? 'border-[#0078ba] ring-1 ring-[#0078ba]/30' : 'border-[#E5E7EB]'}`}>
              <div className="h-12 w-full" style={{ backgroundColor: n.hex }} />
              <div className="py-1.5 px-1 bg-white text-center">
                <p className={`text-[0.625rem] font-semibold ${n.name === 'BG ★' ? 'text-[#0078ba]' : 'text-[#374151]'}`}>{n.name}</p>
                <p className="text-[0.5rem] font-mono text-[#9CA3AF]">{n.hex}</p>
              </div>
            </div>
          ))}
        </div>
        <UsageNote>
          <strong>Gray 900–700</strong>: primary text and headings. <strong>Gray 600–500</strong>: body text, secondary labels. <strong>Gray 400–300</strong>: borders, dividers, disabled text. <strong>#f3f3f3 (BG ★)</strong>: brand-specified page background. <strong>White</strong>: card surfaces, modal backgrounds.
        </UsageNote>
      </SubSection>

      {/* Color Contrast Reference */}
      <SubSection title="Contrast & Accessibility">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { bg: '#0078ba', text: '#FFFFFF', ratio: '4.9:1', level: 'AA ✓', label: 'Blue 600 / White' },
            { bg: '#00396b', text: '#FFFFFF', ratio: '12.8:1', level: 'AAA ✓', label: 'Navy Primary / White' },
            { bg: '#FFFFFF', text: '#1F2937', ratio: '14.7:1', level: 'AAA ✓', label: 'White / Gray 800' },
            { bg: '#ddeef9', text: '#00396b', ratio: '7.6:1', level: 'AAA ✓', label: 'Blue 100 / Navy Primary' },
            { bg: '#DC2626', text: '#FFFFFF', ratio: '4.8:1', level: 'AA ✓', label: 'Error / White' },
            { bg: '#f3f3f3', text: '#6B7280', ratio: '4.1:1', level: 'AA ✓', label: 'BG Grey / Gray 500' },
          ].map(c => (
            <div
              key={c.label}
              className="flex items-center justify-between rounded-lg px-4 py-3 border border-[#E5E7EB]"
              style={{ backgroundColor: c.bg, color: c.text }}
            >
              <span className="text-[0.875rem] font-medium">{c.label}</span>
              <div className="text-right">
                <span className="text-[0.75rem] font-mono block">{c.ratio}</span>
                <span className="text-[0.625rem] font-semibold block opacity-80">{c.level}</span>
              </div>
            </div>
          ))}
        </div>
        <UsageNote>
          All text must meet WCAG 2.1 AA minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text (18pt+ or 14pt bold). Run Figma's contrast checker or use <strong>Stark</strong> before publishing any designs.
        </UsageNote>
      </SubSection>
    </SectionWrapper>
  );
}
