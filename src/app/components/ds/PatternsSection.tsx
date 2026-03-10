import React, { useState } from 'react';
import { SectionWrapper, SubSection, UsageNote, FigmaName } from './SectionWrapper';
import {
  Search, Filter, Download, Plus, Bell, ChevronDown, ChevronRight,
  AlertCircle, CheckCircle, Clock, XCircle,
  User, Settings, HelpCircle, LogOut, MoreHorizontal, Eye, Edit,
  FileText, Upload, X, Check, DollarSign, Activity,
  ArrowUpRight, Send,
} from 'lucide-react';

/* ─── Shared micro-components ─────────────────────────────────────────────── */
function Avatar({ initials, color = '#0078ba', size = 'md' }: { initials: string; color?: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizeMap = { sm: 'w-7 h-7 text-[0.5625rem]', md: 'w-9 h-9 text-[0.6875rem]', lg: 'w-11 h-11 text-[0.8125rem]' };
  return (
    <div
      className={`${sizeMap[size]} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`}
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}

function StatusBadge({ status }: { status: 'approved' | 'denied' | 'pending' | 'review' | 'submitted' }) {
  const map = {
    approved:  { label: 'Approved',   bg: '#DCFCE7', text: '#15803D', dot: '#16A34A' },
    denied:    { label: 'Denied',     bg: '#FEE2E2', text: '#B91C1C', dot: '#DC2626' },
    pending:   { label: 'Pending',    bg: '#FEF3C7', text: '#B45309', dot: '#D97706' },
    review:    { label: 'In Review',  bg: '#ddeef9', text: '#0078ba', dot: '#5bb0e1' },
    submitted: { label: 'Submitted',  bg: '#F3F4F6', text: '#4B5563', dot: '#9CA3AF' },
  };
  const s = map[status];
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full"
      style={{ backgroundColor: s.bg, color: s.text, fontSize: '0.6875rem', fontWeight: 600 }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.dot }} />
      {s.label}
    </span>
  );
}

/* ─── Pattern 1: Dashboard Header ───────────────────────────────────────── */
function DashboardHeaderPattern() {
  return (
    <div className="rounded-xl border border-[#E5E7EB] overflow-hidden bg-white">
      {/* Top Nav */}
      <div
        className="flex items-center gap-4 px-5 py-3"
        style={{ background: 'linear-gradient(173deg, #0078ba 0%, #00386f 73%)' }}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
            <Activity size={14} className="text-white" />
          </div>
          <span className="text-white font-bold" style={{ fontSize: '0.9375rem' }}>TrueSight</span>
        </div>

        <div className="flex items-center gap-1 bg-white/10 rounded-lg px-3 py-1.5 flex-1 max-w-xs">
          <Search size={12} className="text-white/60 flex-shrink-0" />
          <span className="text-white/50" style={{ fontSize: '0.75rem' }}>Search claims, patients...</span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button className="relative p-2 rounded-lg text-white/70 hover:bg-white/10">
            <Bell size={15} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#DC2626] rounded-full" />
          </button>
          <button className="p-2 rounded-lg text-white/70 hover:bg-white/10">
            <HelpCircle size={15} />
          </button>
          <div className="flex items-center gap-2 pl-2 border-l border-white/20">
            <Avatar initials="JD" color="#5bb0e1" size="sm" />
            <div className="hidden sm:block">
              <p className="text-white text-[0.6875rem] font-semibold">Jane Doe</p>
              <p className="text-white/60 text-[0.5rem]">Billing Manager</p>
            </div>
            <ChevronDown size={11} className="text-white/60" />
          </div>
        </div>
      </div>

      {/* Sub-header with page title + actions */}
      <div className="flex items-center gap-4 px-5 py-3 border-b border-[#E5E7EB] bg-white">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[#9CA3AF]" style={{ fontSize: '0.6875rem' }}>Dashboard</span>
            <ChevronRight size={10} className="text-[#D1D5DB]" />
            <span className="text-[#374151] font-medium" style={{ fontSize: '0.6875rem' }}>Claims Overview</span>
          </div>
          <h1 className="text-[1.25rem] font-bold text-[#00396b]">Claims Overview</h1>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D1D5DB] text-[#374151] hover:bg-[#f3f3f3] transition-colors"
            style={{ fontSize: '0.75rem' }}>
            <Filter size={12} />
            Filter
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D1D5DB] text-[#374151] hover:bg-[#f3f3f3] transition-colors"
            style={{ fontSize: '0.75rem' }}>
            <Download size={12} />
            Export
          </button>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white"
            style={{ fontSize: '0.75rem', background: '#0078ba' }}
          >
            <Plus size={12} />
            New Claim
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-4 divide-x divide-[#E5E7EB] bg-[#f3f3f3]/50">
        {[
          { label: 'Total Claims',    value: '1,247',  delta: '+8.3%',  up: true,  icon: FileText,  color: '#0078ba'  },
          { label: 'Revenue Cycle',   value: '$1.34M', delta: '+12.4%', up: true,  icon: DollarSign,color: '#16A34A'  },
          { label: 'Denial Rate',     value: '11.1%',  delta: '-1.5%',  up: true,  icon: XCircle,   color: '#DC2626'  },
          { label: 'Avg. Days A/R',   value: '28.4',   delta: '-2.1d',  up: true,  icon: Clock,     color: '#D97706'  },
        ].map(k => (
          <div key={k.label} className="px-5 py-4">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[0.625rem] font-semibold text-[#9CA3AF] uppercase tracking-wider">{k.label}</p>
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${k.color}18` }}>
                <k.icon size={11} style={{ color: k.color }} />
              </div>
            </div>
            <p className="text-[1.25rem] font-extrabold text-[#111827] tracking-tight">{k.value}</p>
            <p className="text-[0.5625rem] font-medium" style={{ color: '#16A34A' }}>
              <ArrowUpRight size={9} className="inline mr-0.5" />{k.delta} vs last month
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Pattern 2: Claim Detail Card ────────────────────────────────────────── */
function ClaimDetailPattern() {
  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white overflow-hidden">
      {/* Card Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#ddeef9]">
            <FileText size={16} className="text-[#0078ba]" />
          </div>
          <div>
            <p className="text-[0.875rem] font-bold text-[#111827]">Claim #CLM-2024-08847</p>
            <div className="flex items-center gap-2 mt-0.5">
              <StatusBadge status="review" />
              <span className="text-[0.6875rem] text-[#9CA3AF]">Submitted Jan 15, 2025</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button className="p-1.5 rounded-lg border border-[#E5E7EB] text-[#6B7280] hover:bg-[#f3f3f3]">
            <Eye size={13} />
          </button>
          <button className="p-1.5 rounded-lg border border-[#E5E7EB] text-[#6B7280] hover:bg-[#f3f3f3]">
            <Edit size={13} />
          </button>
          <button className="p-1.5 rounded-lg border border-[#E5E7EB] text-[#6B7280] hover:bg-[#f3f3f3]">
            <MoreHorizontal size={13} />
          </button>
        </div>
      </div>

      {/* Detail Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-[#E5E7EB] border-b border-[#E5E7EB]">
        {[
          { label: 'Patient',    value: 'Robert Chen',  sub: 'DOB: 03/14/1968' },
          { label: 'Payer',      value: 'BlueCross',    sub: 'Policy #BC-8834910' },
          { label: 'Billed Amt', value: '$4,280.00',    sub: 'CPT: 99213, 80053'  },
          { label: 'Expected',   value: '$3,196.00',    sub: 'After contracted adj.' },
        ].map(f => (
          <div key={f.label} className="px-4 py-3">
            <p className="text-[0.5625rem] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-0.5">{f.label}</p>
            <p className="text-[0.875rem] font-semibold text-[#111827]">{f.value}</p>
            <p className="text-[0.6875rem] text-[#9CA3AF]">{f.sub}</p>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="px-5 py-4">
        <p className="text-[0.6875rem] font-bold text-[#374151] uppercase tracking-wider mb-3">Activity Timeline</p>
        <div className="space-y-3">
          {[
            { icon: CheckCircle, color: '#16A34A', label: 'Claim Submitted', time: 'Jan 15 · 9:02 AM', sub: 'Submitted electronically to BlueCross' },
            { icon: Clock,       color: '#D97706', label: 'In Review',       time: 'Jan 17 · 11:45 AM', sub: 'Payer acknowledged receipt, review pending' },
            { icon: AlertCircle, color: '#0078ba', label: 'Additional Info', time: 'Jan 20 · 2:30 PM', sub: 'Payer requested supporting documentation' },
          ].map((ev, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${ev.color}18` }}>
                <ev.icon size={12} style={{ color: ev.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-[0.75rem] font-semibold text-[#111827]">{ev.label}</p>
                  <p className="text-[0.5625rem] text-[#9CA3AF]">{ev.time}</p>
                </div>
                <p className="text-[0.6875rem] text-[#6B7280]">{ev.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center gap-2 px-5 py-3 bg-[#f3f3f3]/60 border-t border-[#E5E7EB]">
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white"
          style={{ fontSize: '0.75rem', background: '#0078ba' }}
        >
          <Send size={11} />
          Resubmit
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E7EB] text-[#374151] bg-white hover:bg-[#f3f3f3]"
          style={{ fontSize: '0.75rem' }}>
          <Upload size={11} />
          Attach Docs
        </button>
        <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#FEE2E2] text-[#DC2626] bg-white hover:bg-[#FEE2E2]"
          style={{ fontSize: '0.75rem' }}>
          <XCircle size={11} />
          Void Claim
        </button>
      </div>
    </div>
  );
}

/* ─── Pattern 3: Data Table with search/filter ───────────────────────────── */
const tableData = [
  { id: 'CLM-08841', patient: 'Sarah Johnson',  payer: 'Medicare',  amount: '$1,240', status: 'approved' as const, date: 'Jan 22' },
  { id: 'CLM-08842', patient: 'Marcus Lee',     payer: 'Aetna',     amount: '$890',   status: 'pending'  as const, date: 'Jan 22' },
  { id: 'CLM-08843', patient: 'Elena Torres',   payer: 'Medicaid',  amount: '$2,150', status: 'denied'   as const, date: 'Jan 21' },
  { id: 'CLM-08844', patient: 'David Park',     payer: 'BlueCross', amount: '$640',   status: 'approved' as const, date: 'Jan 21' },
  { id: 'CLM-08845', patient: 'Nicole Adams',   payer: 'Cigna',     amount: '$1,780', status: 'review'   as const, date: 'Jan 20' },
];

function ClaimsTablePattern() {
  const [query, setQuery] = useState('');
  const filtered = tableData.filter(
    r => r.patient.toLowerCase().includes(query.toLowerCase()) ||
         r.id.toLowerCase().includes(query.toLowerCase()) ||
         r.payer.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white overflow-hidden">
      {/* Table Header */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-2 bg-[#f3f3f3] border border-[#E5E7EB] rounded-lg px-3 py-1.5 flex-1 max-w-xs">
          <Search size={12} className="text-[#9CA3AF] flex-shrink-0" />
          <input
            type="text"
            placeholder="Search claims..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="bg-transparent text-[#374151] placeholder:text-[#9CA3AF] outline-none flex-1"
            style={{ fontSize: '0.75rem' }}
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-[#9CA3AF] hover:text-[#6B7280]">
              <X size={10} />
            </button>
          )}
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E7EB] text-[#6B7280] hover:bg-[#f3f3f3]"
          style={{ fontSize: '0.75rem' }}>
          <Filter size={12} />
          Filters
          <span className="w-4 h-4 rounded-full bg-[#0078ba] text-white flex items-center justify-center" style={{ fontSize: '0.5rem' }}>2</span>
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E7EB] text-[#6B7280] hover:bg-[#f3f3f3]"
          style={{ fontSize: '0.75rem' }}>
          <Download size={12} />
          Export
        </button>
        <span className="ml-auto text-[0.625rem] text-[#9CA3AF]">{filtered.length} of {tableData.length} claims</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f3f3f3] border-b border-[#E5E7EB]">
              {['Claim ID', 'Patient', 'Payer', 'Amount', 'Status', 'Date', ''].map(h => (
                <th key={h} className="px-4 py-2.5 text-left font-semibold text-[#6B7280]" style={{ fontSize: '0.6875rem' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-[#9CA3AF]" style={{ fontSize: '0.8125rem' }}>
                  No claims match your search.
                </td>
              </tr>
            ) : (
              filtered.map(row => (
                <tr key={row.id} className="border-b border-[#f3f3f3] hover:bg-[#f9fafb] transition-colors group">
                  <td className="px-4 py-3">
                    <span className="font-mono text-[0.75rem] text-[#0078ba] font-semibold">{row.id}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Avatar initials={row.patient.split(' ').map(n => n[0]).join('')} color="#0078ba" size="sm" />
                      <span className="text-[0.8125rem] font-medium text-[#111827]">{row.patient}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[0.8125rem] text-[#374151]">{row.payer}</td>
                  <td className="px-4 py-3 text-[0.8125rem] font-semibold text-[#111827]">{row.amount}</td>
                  <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
                  <td className="px-4 py-3 text-[0.75rem] text-[#9CA3AF]">{row.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 rounded text-[#6B7280] hover:bg-[#ddeef9] hover:text-[#0078ba]"><Eye size={13} /></button>
                      <button className="p-1 rounded text-[#6B7280] hover:bg-[#ddeef9] hover:text-[#0078ba]"><Edit size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination footer */}
      <div className="flex items-center justify-between px-5 py-3 bg-[#f3f3f3]/60 border-t border-[#E5E7EB]">
        <span className="text-[0.6875rem] text-[#9CA3AF]">Showing {filtered.length} results</span>
        <div className="flex items-center gap-1">
          {[1, 2, 3, '...', 12].map((p, i) => (
            <button
              key={i}
              className={`w-7 h-7 rounded text-[0.6875rem] font-medium ${p === 1 ? 'bg-[#0078ba] text-white' : 'text-[#6B7280] hover:bg-[#E5E7EB]'}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Pattern 4: Multi-step Form ───────────────────────────────────────────── */
function MultiStepFormPattern() {
  const [step, setStep] = useState(0);

  const steps = [
    { label: 'Patient Info',  icon: User      },
    { label: 'Claim Details', icon: FileText   },
    { label: 'Attachments',   icon: Upload     },
    { label: 'Review',        icon: CheckCircle},
  ];

  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white overflow-hidden">
      {/* Step Indicator */}
      <div className="px-6 pt-6 pb-4 border-b border-[#E5E7EB] bg-[#f3f3f3]/40">
        <p className="text-[0.625rem] font-bold text-[#9CA3AF] uppercase tracking-wider mb-4">
          Step {step + 1} of {steps.length}
        </p>
        <div className="flex items-center gap-0">
          {steps.flatMap((s, i) => {
            const done    = i < step;
            const current = i === step;
            const isLast  = i === steps.length - 1;
            return [
              <button
                key={`step-${i}`}
                onClick={() => setStep(i)}
                className="flex flex-col items-center gap-1 min-w-[70px]"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all"
                  style={{
                    borderColor: done || current ? '#0078ba' : '#D1D5DB',
                    backgroundColor: done ? '#0078ba' : current ? '#ddeef9' : 'white',
                    color: done ? 'white' : current ? '#0078ba' : '#9CA3AF',
                  }}
                >
                  {done ? <Check size={13} /> : <s.icon size={13} />}
                </div>
                <p
                  className="text-[0.5rem] font-semibold uppercase tracking-wide text-center"
                  style={{ color: current ? '#0078ba' : done ? '#374151' : '#9CA3AF' }}
                >
                  {s.label}
                </p>
              </button>,
              ...(!isLast ? [
                <div
                  key={`conn-${i}`}
                  className="flex-1 h-0.5 mb-5"
                  style={{ backgroundColor: i < step ? '#0078ba' : '#E5E7EB' }}
                />,
              ] : []),
            ];
          })}
        </div>
      </div>

      {/* Form Body */}
      <div className="px-6 py-5">
        {step === 0 && (
          <div className="space-y-4">
            <p className="text-[0.875rem] font-bold text-[#111827]">Patient Information</p>
            <div className="grid grid-cols-2 gap-3">
              {['First Name', 'Last Name'].map(label => (
                <div key={label}>
                  <label className="block text-[0.6875rem] font-semibold text-[#374151] mb-1">{label}</label>
                  <div className="border border-[#D1D5DB] rounded-lg px-3 py-2 bg-white focus-within:border-[#0078ba] focus-within:ring-2 focus-within:ring-[#0078ba]/20 transition-all">
                    <input className="w-full outline-none text-[#374151]" style={{ fontSize: '0.8125rem' }} placeholder={`Enter ${label.toLowerCase()}`} />
                  </div>
                </div>
              ))}
              <div>
                <label className="block text-[0.6875rem] font-semibold text-[#374151] mb-1">Date of Birth</label>
                <div className="border border-[#D1D5DB] rounded-lg px-3 py-2 bg-white">
                  <input type="date" className="w-full outline-none text-[#374151]" style={{ fontSize: '0.8125rem' }} />
                </div>
              </div>
              <div>
                <label className="block text-[0.6875rem] font-semibold text-[#374151] mb-1">Member ID</label>
                <div className="border border-[#D1D5DB] rounded-lg px-3 py-2 bg-white">
                  <input className="w-full outline-none text-[#374151]" style={{ fontSize: '0.8125rem' }} placeholder="e.g. BC-8834910" />
                </div>
              </div>
            </div>
          </div>
        )}
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-[0.875rem] font-bold text-[#111827]">Claim Details</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Service Date',  type: 'date'   },
                { label: 'CPT Code',      type: 'text', ph: 'e.g. 99213' },
                { label: 'Diagnosis Code',type: 'text', ph: 'ICD-10' },
                { label: 'Billed Amount', type: 'text', ph: '$0.00' },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-[0.6875rem] font-semibold text-[#374151] mb-1">{f.label}</label>
                  <div className="border border-[#D1D5DB] rounded-lg px-3 py-2 bg-white focus-within:border-[#0078ba] focus-within:ring-2 focus-within:ring-[#0078ba]/20 transition-all">
                    <input type={f.type} placeholder={f.ph} className="w-full outline-none text-[#374151]" style={{ fontSize: '0.8125rem' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <p className="text-[0.875rem] font-bold text-[#111827] mb-4">Attach Supporting Documents</p>
            <div className="border-2 border-dashed border-[#bdddf5] rounded-xl p-8 text-center bg-[#f3f3f3]/50 hover:bg-[#ddeef9]/30 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-[#ddeef9] flex items-center justify-center mx-auto mb-3">
                <Upload size={18} className="text-[#0078ba]" />
              </div>
              <p className="text-[0.875rem] font-semibold text-[#374151] mb-1">Drop files here or click to upload</p>
              <p className="text-[0.6875rem] text-[#9CA3AF]">PDF, PNG, JPG up to 20MB each</p>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <p className="text-[0.875rem] font-bold text-[#111827] mb-4">Review & Submit</p>
            <div className="p-4 rounded-xl bg-[#DCFCE7] border border-[#BBF7D0]">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={14} className="text-[#16A34A]" />
                <p className="text-[0.8125rem] font-semibold text-[#15803D]">Claim ready for submission</p>
              </div>
              <p className="text-[0.6875rem] text-[#16A34A]">All required fields are complete. Review the details below before submitting.</p>
            </div>
            <div className="mt-3 space-y-2">
              {[
                { label: 'Patient',    value: 'Robert Chen' },
                { label: 'Payer',      value: 'BlueCross'  },
                { label: 'Service',    value: 'Jan 22, 2025' },
                { label: 'CPT Code',   value: '99213'       },
                { label: 'Billed',     value: '$1,240.00'   },
              ].map(r => (
                <div key={r.label} className="flex items-center justify-between py-1.5 border-b border-[#E5E7EB]">
                  <span className="text-[0.6875rem] text-[#9CA3AF]">{r.label}</span>
                  <span className="text-[0.75rem] font-semibold text-[#374151]">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Form Footer */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-[#E5E7EB] bg-[#f3f3f3]/40">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="px-4 py-2 rounded-lg border border-[#D1D5DB] text-[#374151] disabled:opacity-40 hover:bg-[#f3f3f3] transition-colors"
          style={{ fontSize: '0.8125rem' }}
        >
          Back
        </button>
        <div className="flex items-center gap-1.5">
          {steps.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full transition-colors" style={{ backgroundColor: i === step ? '#0078ba' : '#D1D5DB' }} />
          ))}
        </div>
        <button
          onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white transition-colors"
          style={{ fontSize: '0.8125rem', backgroundColor: step === steps.length - 1 ? '#16A34A' : '#0078ba' }}
        >
          {step === steps.length - 1 ? (
            <><Check size={13} /> Submit Claim</>
          ) : (
            <>Next <ChevronRight size={13} /></>
          )}
        </button>
      </div>
    </div>
  );
}

/* ─── Pattern 5+6 */
function OverlayPatternsPattern() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <FigmaName name="Pattern / Nav / User Dropdown" />
        <div className="mt-2">
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-[#E5E7EB] bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <Avatar initials="JD" color="#0078ba" size="sm" />
              <div className="text-left">
                <p className="text-[0.75rem] font-semibold text-[#111827]">Jane Doe</p>
                <p className="text-[0.5625rem] text-[#9CA3AF]">Billing Manager</p>
              </div>
              <ChevronDown size={13} className="text-[#9CA3AF] ml-1" />
            </button>

            {profileOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-[#E5E7EB] rounded-xl shadow-xl z-10 overflow-hidden">
                {/* User info */}
                <div className="px-4 py-3 border-b border-[#E5E7EB] bg-[#f3f3f3]/60">
                  <p className="text-[0.75rem] font-bold text-[#111827]">Jane Doe</p>
                  <p className="text-[0.6875rem] text-[#9CA3AF]">jane.doe@medbill.com</p>
                  <div className="mt-1.5 flex items-center gap-1">
                    <span className="px-1.5 py-0.5 rounded-full bg-[#ddeef9] text-[#0078ba] text-[0.5rem] font-bold uppercase tracking-wide">Admin</span>
                  </div>
                </div>

                {/* Menu items */}
                {[
                  { icon: User,     label: 'My Profile',    sub: 'Edit your profile' },
                  { icon: Settings, label: 'Settings',       sub: 'App preferences' },
                  { icon: Bell,     label: 'Notifications',  sub: '3 unread alerts', badge: '3' },
                  { icon: HelpCircle, label: 'Help & Support', sub: 'Documentation' },
                ].map(item => (
                  <button
                    key={item.label}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#f3f3f3] text-left transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#f3f3f3] flex items-center justify-center flex-shrink-0">
                      <item.icon size={12} className="text-[#6B7280]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[0.75rem] font-medium text-[#111827]">{item.label}</p>
                      <p className="text-[0.5625rem] text-[#9CA3AF]">{item.sub}</p>
                    </div>
                    {item.badge && (
                      <span className="w-4 h-4 rounded-full bg-[#DC2626] text-white text-[0.5rem] font-bold flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}

                {/* Logout */}
                <div className="border-t border-[#E5E7EB]">
                  <button
                    onClick={() => setProfileOpen(false)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#FEE2E2] text-left transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#FEE2E2] flex items-center justify-center flex-shrink-0">
                      <LogOut size={12} className="text-[#DC2626]" />
                    </div>
                    <span className="text-[0.75rem] font-medium text-[#DC2626]">Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <FigmaName name="Pattern / Overlay / Notifications" />
        <div className="mt-2">
          <div className="rounded-xl border border-[#E5E7EB] bg-white overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#E5E7EB]">
              <div className="flex items-center gap-2">
                <Bell size={14} className="text-[#374151]" />
                <p className="text-[0.875rem] font-bold text-[#111827]">Notifications</p>
                <span className="w-5 h-5 rounded-full bg-[#DC2626] text-white flex items-center justify-center text-[0.5rem] font-bold">3</span>
              </div>
              <div className="flex items-center gap-1">
                {(['all', 'unread'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setNotificationsOpen(t === 'unread')}
                    className={`px-2.5 py-1 rounded-lg capitalize transition-colors ${
                      notificationsOpen === (t === 'unread') ? 'bg-[#ddeef9] text-[#0078ba]' : 'text-[#6B7280] hover:bg-[#f3f3f3]'
                    }`}
                    style={{ fontSize: '0.6875rem', fontWeight: 600 }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="divide-y divide-[#f3f3f3]">
              {[
                { type: 'denied',   icon: XCircle,     color: '#DC2626', bg: '#FEE2E2', title: 'Claim Denied', body: 'CLM-08843 was denied by Medicaid. Action required.', time: '2m ago', read: false },
                { type: 'approved', icon: CheckCircle, color: '#16A34A', bg: '#DCFCE7', title: 'Claim Approved', body: 'CLM-08841 approved for $1,240.00 by Medicare.', time: '18m ago', read: false },
                { type: 'info',     icon: Bell,        color: '#0078ba', bg: '#ddeef9', title: 'System Update', body: 'ERA files for Jan 22 are ready for posting.', time: '1h ago', read: false },
                { type: 'pending',  icon: Clock,       color: '#D97706', bg: '#FEF3C7', title: 'Claim Pending', body: 'CLM-08845 is awaiting additional documentation.', time: '3h ago', read: true },
              ].filter(n => !notificationsOpen || !n.read).map((n, i) => (
                <div key={i} className={`flex items-start gap-3 px-5 py-3.5 hover:bg-[#f9fafb] transition-colors ${!n.read ? 'bg-white' : 'bg-[#f9fafb]/50'}`}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: n.bg }}>
                    <n.icon size={13} style={{ color: n.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[0.75rem] font-semibold text-[#111827]">{n.title}</p>
                      <span className="text-[0.5625rem] text-[#9CA3AF] flex-shrink-0">{n.time}</span>
                    </div>
                    <p className="text-[0.6875rem] text-[#6B7280] leading-relaxed">{n.body}</p>
                  </div>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-[#0078ba] flex-shrink-0 mt-2" />}
                </div>
              ))}
            </div>
            <div className="px-5 py-3 border-t border-[#E5E7EB] bg-[#f3f3f3]/40">
              <button className="w-full text-center text-[#0078ba] font-semibold hover:underline" style={{ fontSize: '0.6875rem' }}>
                View all notifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Export ─────────────────────────────────────────────────────────── */
export function PatternsSection() {
  return (
    <SectionWrapper
      id="patterns"
      title="UI Patterns"
      subtitle="Composed, real-world interface patterns built from TrueSight components. Each pattern is production-ready and follows the Figma Library naming convention."
    >
      {/* Pattern 1 */}
      <SubSection
        title="Dashboard Header"
        description="Top navigation bar + page title bar + KPI row. The most-used layout entry point in the TrueSight application."
      >
        <FigmaName name="Pattern / Dashboard / Header" />
        <div className="mt-3">
          <DashboardHeaderPattern />
        </div>
        <UsageNote>
          The gradient header uses the exact TrueSight website gradient: <code className="font-mono">linear-gradient(173deg, #0078ba 0%, #00386f 73%)</code>. Always maintain the KPI row in a 4-column grid on desktop. On mobile (sm), collapse KPIs to a horizontal scroll or 2×2 grid.
        </UsageNote>
      </SubSection>

      {/* Pattern 2 */}
      <SubSection
        title="Claim Detail Card"
        description="Full-detail view of a single claim with metadata, an activity timeline, and contextual actions."
      >
        <FigmaName name="Pattern / Claim / Detail" />
        <div className="mt-3">
          <ClaimDetailPattern />
        </div>
        <UsageNote>
          The activity timeline uses semantic icon+color pairs: CheckCircle (success), Clock (warning), AlertCircle (info), XCircle (danger). Never display a timeline with more than 8 events without a "Show more" collapse.
        </UsageNote>
      </SubSection>

      {/* Pattern 3 */}
      <SubSection
        title="Searchable Data Table"
        description="Live-search filtering data table with status badges, row hover actions, and pagination footer. Fully interactive — try searching above."
      >
        <FigmaName name="Pattern / Table / Claims" />
        <div className="mt-3">
          <ClaimsTablePattern />
        </div>
        <UsageNote>
          Use <code className="font-mono">group</code> + <code className="font-mono">group-hover:opacity-100</code> to reveal row actions on hover. Always show a results count in the toolbar. Animate row highlights with <code className="font-mono">transition-colors</code>.
        </UsageNote>
      </SubSection>

      {/* Pattern 4 */}
      <SubSection
        title="Multi-Step Form"
        description="A 4-step claim submission wizard with step indicator, field validation states, and a review/submit screen. Click Next and Back to navigate."
      >
        <FigmaName name="Pattern / Form / Multi-Step" />
        <div className="mt-3">
          <MultiStepFormPattern />
        </div>
        <UsageNote>
          Steps are numbered visually (1–4) with icon + label. Completed steps show a checkmark. The progress bar between steps fills with brand blue. Never allow skipping steps — enforce sequential progression for claim data integrity.
        </UsageNote>
      </SubSection>

      {/* Pattern 5+6 */}
      <SubSection
        title="Overlay Patterns"
        description="Dropdown menus and notification panels. Click the user avatar to open the dropdown."
      >
        <OverlayPatternsPattern />
        <UsageNote>
          Dropdowns use <code className="font-mono">z-10</code> with shadow-xl and 8px border-radius. Position with <code className="font-mono">absolute + top-full + mt-2</code>. The notification bell badge uses an absolutely-positioned <code className="font-mono">w-2 h-2</code> dot; it pulses when there are critical denials.
        </UsageNote>
      </SubSection>
    </SectionWrapper>
  );
}