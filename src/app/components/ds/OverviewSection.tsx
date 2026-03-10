import React from 'react';
import { Activity, Shield, TrendingUp, Zap, CheckCircle } from 'lucide-react';

export function OverviewSection() {
  return (
    <div id="overview" className="py-12 border-b border-[#E5E7EB]">
      {/* Hero — uses the exact TrueSight website gradient */}
      <div
        className="rounded-2xl p-8 mb-10 text-white overflow-hidden relative"
        style={{
          background: 'linear-gradient(173deg, #0078ba 0%, #00386f 73%)',
          borderRadius: '24px',
          border: '3px solid rgba(255,255,255,0.15)',
        }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full opacity-5 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-40 w-64 h-64 bg-[#5bb0e1] rounded-full opacity-10 translate-y-1/3" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Activity size={20} className="text-white" />
            </div>
            <div>
              <p className="text-[0.6875rem] font-semibold uppercase tracking-widest text-[#99cceb]">Design System</p>
              <h1 className="text-[1.75rem] font-bold tracking-tight">TrueSight by MedBill</h1>
            </div>
          </div>
          <p className="text-[1rem] text-[#bdddf5] max-w-xl leading-relaxed mb-6">
            A comprehensive component library and design language for building consistent, accessible, and data-driven healthcare revenue cycle management interfaces.
          </p>
          <div className="flex flex-wrap gap-3">
            {['v2.5.0', 'WCAG 2.1 AA', 'React + Tailwind CSS', 'Lucide Icons', '60+ Components', 'Figma Library Ready'].map(tag => (
              <span key={tag} className="px-2.5 py-1 bg-white/10 text-white text-[0.6875rem] font-medium rounded-full border border-white/20 backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Colors callout */}
      <div className="mb-10 p-5 rounded-2xl border border-[#E5E7EB] bg-white">
        <p className="text-[0.75rem] font-bold text-[#00396b] uppercase tracking-wider mb-4">Accurate Brand Colors — TrueSight Website</p>
        <div className="flex flex-wrap gap-4 items-center">
          {[
            { hex: '#00396b', label: 'Primary Navy', desc: '#00396b' },
            { hex: '#0078ba', label: 'Blue 600 (Gradient)', desc: '#0078ba' },
            { hex: '#5bb0e1', label: 'Secondary Blue', desc: '#5bb0e1' },
            { hex: '#f3f3f3', label: 'Background Grey', desc: '#f3f3f3', border: true },
          ].map(c => (
            <div key={c.hex} className="flex items-center gap-2.5">
              <div
                className={`w-8 h-8 rounded-lg flex-shrink-0 ${c.border ? 'border border-[#E5E7EB]' : ''}`}
                style={{ backgroundColor: c.hex }}
              />
              <div>
                <p className="text-[0.75rem] font-semibold text-[#111827]">{c.label}</p>
                <p className="text-[0.6875rem] font-mono text-[#6B7280]">{c.desc}</p>
              </div>
            </div>
          ))}
          <div className="ml-auto hidden md:block">
            <div
              className="h-10 w-40 rounded-lg"
              style={{ background: 'linear-gradient(173deg, #0078ba 0%, #00386f 73%)' }}
              title="Website Gradient: linear-gradient(173deg, #0078ba 0%, #00386f 73%)"
            />
            <p className="text-[0.5625rem] font-mono text-[#9CA3AF] mt-1 text-center">Website Gradient</p>
          </div>
        </div>
      </div>

      {/* Principles */}
      <div className="mb-10">
        <h2 className="text-[1.875rem] font-bold text-[#00396b] tracking-tight mb-2">Design Principles</h2>
        <p className="text-[#6B7280] text-[0.9375rem] mb-6 max-w-2xl">
          Every decision in this design system is rooted in four core principles that reflect TrueSight's mission.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: Shield,
              title: 'Trust Through Clarity',
              desc: 'Healthcare data demands precision. Every element communicates information unambiguously, using established medical conventions where applicable.',
              color: '#0078ba', bg: '#ddeef9',
            },
            {
              icon: TrendingUp,
              title: 'Data First',
              desc: 'Designed for dense data environments. Tables, charts, and stat cards are first-class citizens, optimized for rapid scanning and comparison.',
              color: '#16A34A', bg: '#DCFCE7',
            },
            {
              icon: Zap,
              title: 'Efficiency at Scale',
              desc: 'Billing coordinators process hundreds of claims daily. Every click is intentional, every workflow is optimized for speed and accuracy.',
              color: '#D97706', bg: '#FEF3C7',
            },
            {
              icon: CheckCircle,
              title: 'Accessible Always',
              desc: 'WCAG 2.1 AA compliance is a baseline, not a goal. All components are keyboard-navigable, screen-reader ready, and color-contrast verified.',
              color: '#5bb0e1', bg: '#ddeef9',
            },
          ].map(({ icon: Icon, title, desc, color, bg }) => (
            <div key={title} className="p-5 rounded-xl border border-[#E5E7EB] bg-white">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: bg }}>
                <Icon size={18} style={{ color }} />
              </div>
              <h3 className="text-[0.9375rem] font-semibold text-[#00396b] mb-2">{title}</h3>
              <p className="text-[0.8125rem] text-[#6B7280] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { value: '8', label: 'Foundation Sections', sub: 'Colors, type, spacing, tokens' },
          { value: '15+', label: 'Component Types', sub: 'Buttons, forms, tables...' },
          { value: '80+', label: 'Component Variants', sub: 'States, sizes, themes' },
          { value: '96+', label: 'Icons Catalogued', sub: 'Lucide React set' },
        ].map(s => (
          <div key={s.label} className="p-5 rounded-xl border border-[#E5E7EB] bg-white text-center">
            <p className="text-[2.25rem] font-extrabold text-[#0078ba] tracking-tight">{s.value}</p>
            <p className="text-[0.8125rem] font-semibold text-[#374151] mb-0.5">{s.label}</p>
            <p className="text-[0.6875rem] text-[#9CA3AF]">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Navigation Guide */}
      <div className="p-5 rounded-xl bg-[#ddeef9] border border-[#bdddf5]">
        <p className="text-[0.75rem] font-semibold text-[#00396b] uppercase tracking-wider mb-3">How to navigate this design system</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[0.8125rem] text-[#374151]">
          <div>
            <p className="font-semibold text-[#00396b] mb-1.5">Foundation</p>
            <ul className="space-y-1 text-[#6B7280]">
              <li>• <strong className="text-[#374151]">Design Tokens</strong> — Start here. Single source of truth for all values</li>
              <li>• <strong className="text-[#374151]">Color System</strong> — Brand palette, semantic colors, contrast rules</li>
              <li>• <strong className="text-[#374151]">Typography</strong> — Font families, type scale, weight usage</li>
              <li>• <strong className="text-[#374151]">Spacing & Layout</strong> — 8pt grid, breakpoints, containers</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-[#00396b] mb-1.5">Components + Figma Library + Patterns</p>
            <ul className="space-y-1 text-[#6B7280]">
              <li>• <strong className="text-[#374151]">Figma Library</strong> — Naming conventions, component sets, auto layout</li>
              <li>• <strong className="text-[#374151]">Buttons</strong> — Variants, sizes, states, icon patterns</li>
              <li>• <strong className="text-[#374151]">Form Elements</strong> — Inputs, selects, checkboxes, toggles</li>
              <li>• <strong className="text-[#374151]">Data Visualization</strong> — Charts (Area, Bar, Donut, Radial) with brand palette</li>
              <li>• <strong className="text-[#374151]">UI Patterns</strong> — Dashboard, claim cards, multi-step forms, tables</li>
              <li>• <strong className="text-[#374151]">Accessibility</strong> — WCAG 2.1 AA, contrast matrix, ARIA patterns</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}