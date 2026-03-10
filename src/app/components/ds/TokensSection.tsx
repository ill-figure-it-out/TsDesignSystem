import React, { useState } from 'react';
import { SectionWrapper, SubSection } from './SectionWrapper';
import { Copy, Check } from 'lucide-react';

interface TokenRowProps {
  name: string;
  value: string;
  preview?: React.ReactNode;
  description?: string;
}

function TokenRow({ name, value, preview, description }: TokenRowProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(name).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <tr className="border-b border-[#f3f3f3] hover:bg-[#f3f3f3] group">
      <td className="px-4 py-2.5">
        <div className="flex items-center gap-2">
          <code className="text-[0.75rem] font-mono text-[#0078ba]">{name}</code>
          <button
            onClick={handleCopy}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded text-[#9CA3AF] hover:text-[#0078ba]"
            title="Copy token name"
          >
            {copied ? <Check size={11} /> : <Copy size={11} />}
          </button>
        </div>
      </td>
      <td className="px-4 py-2.5 font-mono text-[0.75rem] text-[#374151]">{value}</td>
      <td className="px-4 py-2.5">{preview}</td>
      <td className="px-4 py-2.5 text-[0.6875rem] text-[#9CA3AF] hidden lg:table-cell">{description}</td>
    </tr>
  );
}

export function TokensSection() {
  const colorTokens = [
    { name: '--ts-navy-primary', value: '#00396b', preview: <div className="w-6 h-6 rounded" style={{background:'#00396b'}} />, description: 'Brand navy — sidebar BG, hero areas (★ Brand specified)' },
    { name: '--ts-blue-600',     value: '#0078ba', preview: <div className="w-6 h-6 rounded" style={{background:'#0078ba'}} />, description: 'Primary action color, links, CTA (from website gradient)' },
    { name: '--ts-blue-secondary',value:'#5bb0e1', preview: <div className="w-6 h-6 rounded" style={{background:'#5bb0e1'}} />, description: 'Secondary blue accent (★ Brand specified)' },
    { name: '--ts-blue-300',     value: '#99cceb', preview: <div className="w-6 h-6 rounded" style={{background:'#99cceb'}} />, description: 'Hover state for secondary blue' },
    { name: '--ts-blue-100',     value: '#ddeef9', preview: <div className="w-6 h-6 rounded border border-[#bdddf5]" style={{background:'#ddeef9'}} />, description: 'Active/selected backgrounds' },
    { name: '--ts-success-600',  value: '#16A34A', preview: <div className="w-6 h-6 rounded" style={{background:'#16A34A'}} />, description: 'Success, approved, positive delta' },
    { name: '--ts-warning-600',  value: '#D97706', preview: <div className="w-6 h-6 rounded" style={{background:'#D97706'}} />, description: 'Warning, pending, caution' },
    { name: '--ts-error-600',    value: '#DC2626', preview: <div className="w-6 h-6 rounded" style={{background:'#DC2626'}} />, description: 'Error, denied, destructive' },
    { name: '--ts-gray-900',     value: '#111827', preview: <div className="w-6 h-6 rounded" style={{background:'#111827'}} />, description: 'Primary text color' },
    { name: '--ts-gray-500',     value: '#6B7280', preview: <div className="w-6 h-6 rounded" style={{background:'#6B7280'}} />, description: 'Secondary/muted text' },
    { name: '--ts-gray-200',     value: '#E5E7EB', preview: <div className="w-6 h-6 rounded border" style={{background:'#E5E7EB'}} />, description: 'Default border color' },
    { name: '--ts-bg-grey',      value: '#f3f3f3', preview: <div className="w-6 h-6 rounded border" style={{background:'#f3f3f3'}} />, description: 'Page background (★ Brand specified)' },
    { name: '--ts-white',        value: '#FFFFFF', preview: <div className="w-6 h-6 rounded border border-[#E5E7EB]" style={{background:'#FFFFFF'}} />, description: 'Card/modal background' },
  ];

  const gradientTokens = [
    { name: '--ts-gradient-primary', value: 'linear-gradient(173deg, #0078ba 0%, #00386f 73%)', preview: <div className="w-16 h-6 rounded" style={{background:'linear-gradient(173deg, #0078ba 0%, #00386f 73%)'}} />, description: '★ Website gradient — hero sections, primary cards' },
    { name: '--ts-gradient-sidebar', value: 'linear-gradient(180deg, #001a33 0%, #00396b 100%)', preview: <div className="w-16 h-6 rounded" style={{background:'linear-gradient(180deg, #001a33 0%, #00396b 100%)'}} />, description: 'Sidebar navigation background' },
    { name: '--ts-gradient-brand',   value: 'linear-gradient(135deg, #00396b 0%, #0078ba 100%)', preview: <div className="w-16 h-6 rounded" style={{background:'linear-gradient(135deg, #00396b 0%, #0078ba 100%)'}} />, description: 'Brand backgrounds, modal headers' },
  ];

  const spacingTokens = [
    { name: '--ts-space-1', value: '4px',  preview: <div className="bg-[#0078ba] rounded h-2" style={{width:'4px'}} />, description: 'Micro gap (icon + text)' },
    { name: '--ts-space-2', value: '8px',  preview: <div className="bg-[#0078ba] rounded h-2" style={{width:'8px'}} />, description: 'Compact padding' },
    { name: '--ts-space-3', value: '12px', preview: <div className="bg-[#0078ba] rounded h-2" style={{width:'12px'}} />, description: 'Small padding' },
    { name: '--ts-space-4', value: '16px', preview: <div className="bg-[#0078ba] rounded h-2" style={{width:'16px'}} />, description: 'Base unit / default padding' },
    { name: '--ts-space-6', value: '24px', preview: <div className="bg-[#0078ba] rounded h-2" style={{width:'24px'}} />, description: 'Card padding default' },
    { name: '--ts-space-8', value: '32px', preview: <div className="bg-[#0078ba] rounded h-2" style={{width:'32px'}} />, description: 'Section padding' },
    { name: '--ts-space-12', value: '48px', preview: <div className="bg-[#0078ba] rounded h-2" style={{width:'48px'}} />, description: 'Large section gap' },
    { name: '--ts-space-16', value: '64px', preview: <div className="bg-[#0078ba] rounded h-2" style={{width:'64px'}} />, description: 'Page padding / hero spacing' },
  ];

  const typographyTokens = [
    { name: '--font-family-base', value: '"Inter", sans-serif', preview: <span style={{fontFamily:'Inter'}}>Aa</span>, description: 'All UI text' },
    { name: '--font-family-mono', value: '"JetBrains Mono", monospace', preview: <span style={{fontFamily:'JetBrains Mono'}}>Aa</span>, description: 'Code, data, IDs' },
    { name: 'Display', value: '3rem / 800', preview: null, description: 'Hero headlines' },
    { name: 'H1', value: '2.25rem / 700', preview: null, description: 'Page titles' },
    { name: 'H2', value: '1.875rem / 700', preview: null, description: 'Section headers' },
    { name: 'H3', value: '1.5rem / 600', preview: null, description: 'Sub-section headers' },
    { name: 'H4', value: '1.25rem / 600', preview: null, description: 'Widget / panel titles' },
    { name: 'Body', value: '0.9375rem / 400', preview: null, description: 'Default body text' },
    { name: 'Small', value: '0.875rem / 400', preview: null, description: 'Secondary text, table cells' },
    { name: 'Caption', value: '0.75rem / 400', preview: null, description: 'Timestamps, helper text' },
  ];

  const radiusTokens = [
    { name: '--ts-radius-none', value: '0px',     preview: <div className="w-8 h-8 bg-[#0078ba]" />, description: 'No rounding (tables, dividers)' },
    { name: '--ts-radius-sm',   value: '4px',     preview: <div className="w-8 h-8 bg-[#0078ba] rounded-sm" />, description: 'Tags, chips, badges' },
    { name: '--ts-radius-md',   value: '6px',     preview: <div className="w-8 h-8 bg-[#0078ba] rounded-md" />, description: 'Inputs, small buttons' },
    { name: '--ts-radius-lg',   value: '8px',     preview: <div className="w-8 h-8 bg-[#0078ba] rounded-lg" />, description: 'Default buttons' },
    { name: '--ts-radius-xl',   value: '12px',    preview: <div className="w-8 h-8 bg-[#0078ba] rounded-xl" />, description: 'Cards, panels, dropdowns' },
    { name: '--ts-radius-2xl',  value: '16px',    preview: <div className="w-8 h-8 bg-[#0078ba] rounded-2xl" />, description: 'Modal dialogs, popovers' },
    { name: '--ts-radius-full', value: '9999px',  preview: <div className="w-8 h-8 bg-[#0078ba] rounded-full" />, description: 'Avatars, toggles, pill buttons' },
  ];

  const shadowTokens = [
    { name: '--ts-shadow-xs',    value: '0 1px 2px rgba(0,0,0,0.05)',            preview: <div className="w-16 h-8 bg-white rounded-lg" style={{boxShadow:'0 1px 2px rgba(0,0,0,0.05)'}} />, description: 'Inputs, subtle lifts' },
    { name: '--ts-shadow-sm',    value: '0 1px 3px rgba(0,0,0,0.1)',             preview: <div className="w-16 h-8 bg-white rounded-lg" style={{boxShadow:'0 1px 3px rgba(0,0,0,0.1)'}} />, description: 'Cards (default)' },
    { name: '--ts-shadow-md',    value: '0 4px 6px rgba(0,0,0,0.07)',            preview: <div className="w-16 h-8 bg-white rounded-lg" style={{boxShadow:'0 4px 6px rgba(0,0,0,0.07)'}} />, description: 'Dropdowns, tooltips' },
    { name: '--ts-shadow-lg',    value: '0 10px 15px rgba(0,0,0,0.1)',           preview: <div className="w-16 h-8 bg-white rounded-lg" style={{boxShadow:'0 10px 15px rgba(0,0,0,0.1)'}} />, description: 'Floating panels' },
    { name: '--ts-shadow-xl',    value: '0 20px 25px rgba(0,0,0,0.1)',           preview: <div className="w-16 h-8 bg-white rounded-lg" style={{boxShadow:'0 20px 25px rgba(0,0,0,0.1)'}} />, description: 'Modals, dialogs' },
    { name: '--ts-shadow-2xl',   value: '0 25px 50px rgba(0,0,0,0.25)',          preview: <div className="w-16 h-8 bg-white rounded-lg" style={{boxShadow:'0 25px 50px rgba(0,0,0,0.25)'}} />, description: 'Full-screen overlays' },
    { name: '--ts-shadow-inner', value: 'inset 0 2px 4px rgba(0,0,0,0.06)',     preview: <div className="w-16 h-8 bg-[#f3f3f3] rounded-lg" style={{boxShadow:'inset 0 2px 4px rgba(0,0,0,0.06)'}} />, description: 'Input fields, inset areas' },
  ];

  const borderTokens = [
    { name: '--ts-border-width',       value: '1px',       preview: <div className="w-12 h-6 rounded border" style={{borderWidth:'1px',borderColor:'#E5E7EB'}} />, description: 'Default border width' },
    { name: '--ts-border-width-2',     value: '2px',       preview: <div className="w-12 h-6 rounded border-2" style={{borderColor:'#0078ba'}} />, description: 'Focus, emphasis borders' },
    { name: '--ts-border-color',       value: '#E5E7EB',   preview: <div className="w-6 h-6 rounded" style={{background:'#E5E7EB'}} />, description: 'Default border, dividers' },
    { name: '--ts-border-color-focus', value: '#0078ba',   preview: <div className="w-6 h-6 rounded" style={{background:'#0078ba'}} />, description: 'Focus state borders' },
    { name: '--ts-border-color-error', value: '#DC2626',   preview: <div className="w-6 h-6 rounded" style={{background:'#DC2626'}} />, description: 'Error state borders' },
  ];

  const TableWrapper = ({ children, headers }: { children: React.ReactNode; headers: string[] }) => (
    <div className="rounded-xl border border-[#E5E7EB] overflow-hidden">
      <table className="w-full text-[0.8125rem]">
        <thead>
          <tr className="bg-[#f3f3f3] text-left">
            {headers.map(h => (
              <th key={h} className={`px-4 py-3 font-semibold text-[#374151] ${h === 'Description' ? 'hidden lg:table-cell' : ''}`}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );

  return (
    <SectionWrapper
      id="tokens"
      title="Design Tokens"
      subtitle="Design tokens are the single source of truth for all visual decisions. They map semantic names to raw values, enabling consistent theming and easy maintenance. Hover a token to copy its name."
    >
      <SubSection title="Color Tokens">
        <TableWrapper headers={['Token', 'Value', 'Preview', 'Description']}>
          {colorTokens.map(t => <TokenRow key={t.name} {...t} />)}
        </TableWrapper>
      </SubSection>

      <SubSection title="Gradient Tokens" description="Brand-specified gradient tokens from the TrueSight website CSS.">
        <TableWrapper headers={['Token', 'CSS Value', 'Preview', 'Description']}>
          {gradientTokens.map(t => <TokenRow key={t.name} {...t} />)}
        </TableWrapper>
      </SubSection>

      <SubSection title="Spacing Tokens">
        <TableWrapper headers={['Token', 'Value', 'Visual', 'Description']}>
          {spacingTokens.map(t => <TokenRow key={t.name} {...t} />)}
        </TableWrapper>
      </SubSection>

      <SubSection title="Typography Tokens">
        <TableWrapper headers={['Token / Scale', 'Value (size / weight)', 'Preview', 'Description']}>
          {typographyTokens.map(t => <TokenRow key={t.name} {...t} />)}
        </TableWrapper>
      </SubSection>

      <SubSection title="Border Radius Tokens">
        <TableWrapper headers={['Token', 'Value', 'Preview', 'Description']}>
          {radiusTokens.map(t => <TokenRow key={t.name} {...t} />)}
        </TableWrapper>
      </SubSection>

      <SubSection title="Shadow Tokens">
        <TableWrapper headers={['Token', 'Value', 'Preview', 'Description']}>
          {shadowTokens.map(t => <TokenRow key={t.name} {...t} />)}
        </TableWrapper>
      </SubSection>

      <SubSection title="Border Tokens">
        <TableWrapper headers={['Token', 'Value', 'Preview', 'Description']}>
          {borderTokens.map(t => <TokenRow key={t.name} {...t} />)}
        </TableWrapper>
      </SubSection>
    </SectionWrapper>
  );
}
