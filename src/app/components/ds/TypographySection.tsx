import React from 'react';
import { SectionWrapper, SubSection, CodeBadge, UsageNote } from './SectionWrapper';

interface TypeSpecProps {
  tag: string;
  size: string;
  weight: string;
  lineHeight: string;
  letterSpacing: string;
  usage: string;
  sample: string;
}

function TypeSpec({ tag, size, weight, lineHeight, letterSpacing, usage, sample }: TypeSpecProps) {
  return (
    <div className="py-5 border-b border-[#E5E7EB] last:border-0 grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-4 items-center">
      <div>
        <p className="text-[0.75rem] font-mono text-[#6B7280] mb-2">
          <CodeBadge>{tag}</CodeBadge>
          <span className="ml-2 text-[#9CA3AF]">{size} · {weight} · lh {lineHeight} · ls {letterSpacing}</span>
        </p>
        <div
          style={{
            fontSize: size,
            fontWeight: weight,
            lineHeight,
            letterSpacing,
            color: '#00396b',
          }}
          className="font-[Inter,sans-serif] break-words"
        >
          {sample}
        </div>
      </div>
      <div className="bg-[#F3F4F6] rounded-lg p-3">
        <p className="text-[0.6875rem] text-[#6B7280] leading-relaxed">{usage}</p>
      </div>
    </div>
  );
}

export function TypographySection() {
  const typeScale: TypeSpecProps[] = [
    {
      tag: 'Display / Hero',
      size: '3rem',
      weight: '800',
      lineHeight: '1.1',
      letterSpacing: '-0.03em',
      usage: 'Hero headlines, marketing pages, large display numbers in dashboards.',
      sample: 'Revenue Intelligence Platform',
    },
    {
      tag: 'H1',
      size: '2.25rem',
      weight: '700',
      lineHeight: '1.2',
      letterSpacing: '-0.025em',
      usage: 'Page titles, primary section headers. One per page.',
      sample: 'TrueSight Analytics',
    },
    {
      tag: 'H2',
      size: '1.875rem',
      weight: '700',
      lineHeight: '1.25',
      letterSpacing: '-0.02em',
      usage: 'Section titles in long-form content and feature pages.',
      sample: 'Claim Denial Intelligence',
    },
    {
      tag: 'H3',
      size: '1.5rem',
      weight: '600',
      lineHeight: '1.3',
      letterSpacing: '-0.015em',
      usage: 'Sub-section headers, card titles in feature highlights.',
      sample: 'Payer Behavior Analysis',
    },
    {
      tag: 'H4',
      size: '1.25rem',
      weight: '600',
      lineHeight: '1.4',
      letterSpacing: '-0.01em',
      usage: 'Panel headers, widget titles, drawer headers.',
      sample: 'Key Performance Metrics',
    },
    {
      tag: 'H5',
      size: '1.0625rem',
      weight: '600',
      lineHeight: '1.5',
      letterSpacing: '-0.005em',
      usage: 'Label headings, sidebar group titles, form section headers.',
      sample: 'Billing Summary',
    },
    {
      tag: 'Body Large',
      size: '1.0625rem',
      weight: '400',
      lineHeight: '1.7',
      letterSpacing: '0',
      usage: 'Lead paragraphs, prominent descriptions below headlines.',
      sample: 'TrueSight transforms complex claim data into actionable revenue insights with AI-powered analytics.',
    },
    {
      tag: 'Body',
      size: '0.9375rem',
      weight: '400',
      lineHeight: '1.6',
      letterSpacing: '0',
      usage: 'Default body text, descriptions, form helper text.',
      sample: 'Our platform integrates directly with your practice management system to identify patterns in claim denials and opportunities for revenue recovery.',
    },
    {
      tag: 'Body Small',
      size: '0.875rem',
      weight: '400',
      lineHeight: '1.55',
      letterSpacing: '0',
      usage: 'Secondary content, table cell text, sidebar content.',
      sample: 'Processing 1,247 claims across 8 payer groups for Q4 2025.',
    },
    {
      tag: 'Caption',
      size: '0.75rem',
      weight: '400',
      lineHeight: '1.5',
      letterSpacing: '0',
      usage: 'Timestamps, image captions, footnotes, helper text.',
      sample: 'Last updated 5 minutes ago · v2.4.1',
    },
    {
      tag: 'Overline',
      size: '0.6875rem',
      weight: '600',
      lineHeight: '1.4',
      letterSpacing: '0.08em',
      usage: 'Category labels, section tags, table column headers.',
      sample: 'CLAIM DENIAL CATEGORY',
    },
  ];

  return (
    <SectionWrapper
      id="typography"
      title="Typography"
      subtitle="Inter is the primary typeface for TrueSight, chosen for its exceptional readability at all scales, clean geometric forms, and comprehensive weight range. JetBrains Mono is used for code and numeric data."
    >
      {/* Font Families */}
      <SubSection title="Font Families">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-6 rounded-xl border border-[#E5E7EB] bg-white">
            <p className="text-[0.6875rem] font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Primary Typeface</p>
            <p className="text-[2.5rem] font-bold text-[#00396b] tracking-tight mb-1" style={{fontFamily: 'Inter, sans-serif'}}>Inter</p>
            <p className="text-[0.875rem] text-[#6B7280] mb-4">Google Fonts · Variable Weight</p>
            <div className="flex flex-wrap gap-2">
              {['Light 300', 'Regular 400', 'Medium 500', 'Semibold 600', 'Bold 700', 'Extrabold 800'].map(w => (
                <span key={w} className="px-2 py-1 bg-[#F3F4F6] text-[0.6875rem] text-[#374151] rounded-md font-medium">{w}</span>
              ))}
            </div>
            <p className="text-[0.75rem] font-mono mt-3 text-[#6B7280]">{'font-family: "Inter", -apple-system, sans-serif;'}</p>
          </div>
          <div className="p-6 rounded-xl border border-[#E5E7EB] bg-white">
            <p className="text-[0.6875rem] font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Monospace Typeface</p>
            <p className="text-[2.5rem] font-bold text-[#00396b] tracking-tight mb-1" style={{fontFamily: 'JetBrains Mono, monospace'}}>JetBrains Mono</p>
            <p className="text-[0.875rem] text-[#6B7280] mb-4">Google Fonts · Code & Data</p>
            <div className="flex flex-wrap gap-2">
              {['Regular 400', 'Medium 500'].map(w => (
                <span key={w} className="px-2 py-1 bg-[#F3F4F6] text-[0.6875rem] text-[#374151] rounded-md font-medium">{w}</span>
              ))}
            </div>
            <p className="text-[0.75rem] font-mono mt-3 text-[#6B7280]">{'font-family: "JetBrains Mono", "Courier New", monospace;'}</p>
          </div>
        </div>

        {/* Pangram */}
        <div className="p-6 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB]">
          <p className="text-[0.6875rem] font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Character Showcase — Inter</p>
          <p className="text-[1.25rem] text-[#374151] leading-relaxed mb-2" style={{fontFamily: 'Inter, sans-serif'}}>
            ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
            abcdefghijklmnopqrstuvwxyz<br />
            0123456789 &amp;@#$%^*()
          </p>
          <p className="text-[0.875rem] text-[#6B7280]" style={{fontFamily: 'Inter, sans-serif'}}>
            The quick brown fox jumps over the lazy dog. Healthcare analytics made simple.
          </p>
        </div>
      </SubSection>

      {/* Type Scale */}
      <SubSection
        title="Type Scale"
        description="A modular scale with a 1.2 ratio. All sizes defined in rem for accessibility."
      >
        <div className="rounded-xl border border-[#E5E7EB] bg-white overflow-hidden">
          <div className="px-5 py-3 bg-[#F3F4F6] border-b border-[#E5E7EB] grid grid-cols-[1fr_220px] gap-4">
            <span className="text-[0.6875rem] font-semibold text-[#6B7280] uppercase tracking-wider">Sample & Specs</span>
            <span className="text-[0.6875rem] font-semibold text-[#6B7280] uppercase tracking-wider">Usage Context</span>
          </div>
          <div className="px-5">
            {typeScale.map((t, i) => (
              <TypeSpec key={i} {...t} />
            ))}
          </div>
        </div>
        <UsageNote>
          Maintain strict hierarchy: never use a lower heading level for visual size — use utility classes instead. Ensure at least 4.5:1 contrast ratio for all body text. Minimum font size is 12px (0.75rem).
        </UsageNote>
      </SubSection>

      {/* Font Weights */}
      <SubSection title="Font Weights & Usage">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { weight: 300, label: 'Light', use: 'Decorative only, large display' },
            { weight: 400, label: 'Regular', use: 'Body text, descriptions' },
            { weight: 500, label: 'Medium', use: 'Labels, nav items, buttons' },
            { weight: 600, label: 'Semibold', use: 'Subheadings, UI emphasis' },
            { weight: 700, label: 'Bold', use: 'H1–H3, strong emphasis' },
            { weight: 800, label: 'Extrabold', use: 'Hero headlines, KPI values' },
          ].map(w => (
            <div key={w.weight} className="p-4 rounded-xl border border-[#E5E7EB] bg-white">
              <p
                className="text-[2rem] text-[#00396b] mb-2"
                style={{ fontWeight: w.weight, fontFamily: 'Inter, sans-serif' }}
              >
                Ag
              </p>
              <p className="text-[0.8125rem] font-semibold text-[#374151]">{w.label}</p>
              <p className="text-[0.6875rem] font-mono text-[#9CA3AF]">{w.weight}</p>
              <p className="text-[0.625rem] text-[#9CA3AF] mt-1 leading-snug">{w.use}</p>
            </div>
          ))}
        </div>
      </SubSection>

      {/* Numeric / Mono */}
      <SubSection title="Numeric & Monospace Usage">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-[#E5E7EB] bg-white">
            <p className="text-[0.6875rem] font-semibold text-[#6B7280] uppercase tracking-wider mb-3">KPI / Stat Numbers</p>
            <p className="text-[3rem] font-extrabold text-[#00396b] tracking-tight" style={{fontFamily: 'Inter, sans-serif', fontVariantNumeric: 'tabular-nums'}}>
              $2.4M
            </p>
            <p className="text-[0.75rem] text-[#6B7280] mt-1">font-variant-numeric: tabular-nums for aligned columns</p>
          </div>
          <div className="p-5 rounded-xl border border-[#E5E7EB] bg-white">
            <p className="text-[0.6875rem] font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Code / Data Values</p>
            <p className="text-[1rem] text-[#0078ba] font-medium" style={{fontFamily: 'JetBrains Mono, monospace'}}>
              CLM-2025-0001247<br/>
              CPT: 99213 · ICD: J45.21<br/>
              <span className="text-[#16A34A]">Status: APPROVED</span>
            </p>
          </div>
        </div>
      </SubSection>
    </SectionWrapper>
  );
}