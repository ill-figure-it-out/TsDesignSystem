import React, { useState } from 'react';
import { SectionWrapper, SubSection, UsageNote } from './SectionWrapper';
import { ChevronUp, ChevronDown, ChevronsUpDown, MoreHorizontal, Filter, Download, Search, Eye, Edit, Trash2, CheckCircle, Clock, XCircle, AlertTriangle } from 'lucide-react';

const claims = [
  { id: 'CLM-2025-0012', patient: 'Robert Chen', provider: 'Dr. Wilson', payer: 'Medicare', amount: '$1,247.50', status: 'approved', date: 'Jan 15, 2025', code: '99213' },
  { id: 'CLM-2025-0013', patient: 'Maria Santos', provider: 'Dr. Park', payer: 'Aetna', amount: '$892.00', status: 'denied', date: 'Jan 16, 2025', code: '99214' },
  { id: 'CLM-2025-0014', patient: 'James Williams', provider: 'Dr. Chen', payer: 'BCBS', amount: '$2,100.00', status: 'pending', date: 'Jan 17, 2025', code: '99215' },
  { id: 'CLM-2025-0015', patient: 'Patricia Lee', provider: 'Dr. Torres', payer: 'Cigna', amount: '$456.25', status: 'appealed', date: 'Jan 18, 2025', code: '99212' },
  { id: 'CLM-2025-0016', patient: 'David Brown', provider: 'Dr. Wilson', payer: 'United', amount: '$3,200.00', status: 'approved', date: 'Jan 19, 2025', code: '99215' },
];

const statusConfig: Record<string, { color: string; bg: string; border: string; icon: React.ElementType; label: string }> = {
  approved: { color: '#16A34A', bg: '#DCFCE7', border: '#BBF7D0', icon: CheckCircle, label: 'Approved' },
  denied: { color: '#DC2626', bg: '#FEE2E2', border: '#FCA5A5', icon: XCircle, label: 'Denied' },
  pending: { color: '#D97706', bg: '#FEF3C7', border: '#FDE68A', icon: Clock, label: 'Pending' },
  appealed: { color: '#2563EB', bg: '#DBEAFE', border: '#BFDBFE', icon: AlertTriangle, label: 'Appealed' },
};

function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status];
  if (!config) return null;
  const Icon = config.icon;
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 text-[0.6875rem] font-semibold rounded-full"
      style={{ backgroundColor: config.bg, color: config.color, border: `1px solid ${config.border}` }}
    >
      <Icon size={10} />
      {config.label}
    </span>
  );
}

type SortDir = 'asc' | 'desc' | null;

export function TablesSection() {
  const [sortCol, setSortCol] = useState<string | null>('id');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [searchQ, setSearchQ] = useState('');

  const handleSort = (col: string) => {
    if (sortCol === col) {
      setSortDir(d => d === 'asc' ? 'desc' : d === 'desc' ? null : 'asc');
      if (sortDir === 'desc') setSortCol(null);
    } else {
      setSortCol(col);
      setSortDir('asc');
    }
  };

  const toggleRow = (id: string) => {
    const next = new Set(selectedRows);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelectedRows(next);
  };

  const allSelected = claims.every(c => selectedRows.has(c.id));
  const toggleAll = () => {
    if (allSelected) setSelectedRows(new Set());
    else setSelectedRows(new Set(claims.map(c => c.id)));
  };

  const filteredClaims = claims.filter(c =>
    c.patient.toLowerCase().includes(searchQ.toLowerCase()) ||
    c.id.toLowerCase().includes(searchQ.toLowerCase()) ||
    c.payer.toLowerCase().includes(searchQ.toLowerCase())
  );

  const SortIcon = ({ col }: { col: string }) => {
    if (sortCol !== col) return <ChevronsUpDown size={12} className="text-[#D1D5DB]" />;
    return sortDir === 'asc' ? <ChevronUp size={12} className="text-[#0078ba]" /> : <ChevronDown size={12} className="text-[#0078ba]" />;
  };

  return (
    <SectionWrapper
      id="tables"
      title="Tables"
      subtitle="Tables display structured data in rows and columns, enabling comparison, sorting, and action on multiple items. TrueSight uses tables extensively for claim management and analytics."
    >
      {/* Full-featured table */}
      <SubSection title="Full-Featured Data Table" description="Sortable columns, row selection, search, and row actions.">
        <div className="rounded-xl border border-[#E5E7EB] overflow-hidden shadow-sm">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-3 px-4 py-3 bg-white border-b border-[#E5E7EB]">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-2.5 py-1.5 w-56">
                <Search size={13} className="text-[#9CA3AF]" />
                <input
                  placeholder="Search claims..."
                  value={searchQ}
                  onChange={e => setSearchQ(e.target.value)}
                  className="bg-transparent text-[0.8125rem] text-[#374151] placeholder:text-[#9CA3AF] outline-none w-full"
                />
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#E5E7EB] rounded-lg text-[0.8125rem] text-[#374151] hover:bg-[#F9FAFB] transition-colors">
                <Filter size={13} /> Filter
              </button>
            </div>
            <div className="flex items-center gap-2">
              {selectedRows.size > 0 && (
                <span className="text-[0.75rem] text-[#6B7280]">{selectedRows.size} selected</span>
              )}
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1A56DB] text-white rounded-lg text-[0.8125rem] font-medium hover:bg-[#103776] transition-colors">
                <Download size={13} /> Export
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-[0.8125rem]">
              <thead>
                <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                  <th className="w-10 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                      className="w-3.5 h-3.5 rounded accent-[#1A56DB]"
                    />
                  </th>
                  {[
                    { key: 'id', label: 'Claim ID' },
                    { key: 'patient', label: 'Patient' },
                    { key: 'provider', label: 'Provider' },
                    { key: 'payer', label: 'Payer' },
                    { key: 'code', label: 'CPT Code' },
                    { key: 'amount', label: 'Amount' },
                    { key: 'status', label: 'Status' },
                    { key: 'date', label: 'Date' },
                  ].map(col => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      className="px-4 py-3 text-left text-[0.6875rem] font-semibold text-[#374151] uppercase tracking-wider cursor-pointer hover:bg-[#F3F4F6] select-none whitespace-nowrap"
                    >
                      <div className="flex items-center gap-1">
                        {col.label}
                        <SortIcon col={col.key} />
                      </div>
                    </th>
                  ))}
                  <th className="px-4 py-3 text-right text-[0.6875rem] font-semibold text-[#374151] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClaims.map((claim, i) => (
                  <tr
                    key={claim.id}
                    className={`border-b border-[#F3F4F6] hover:bg-[#F9FAFB] transition-colors ${selectedRows.has(claim.id) ? 'bg-[#F5F8FF]' : i % 2 === 0 ? 'bg-white' : 'bg-white'}`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(claim.id)}
                        onChange={() => toggleRow(claim.id)}
                        className="w-3.5 h-3.5 rounded accent-[#1A56DB]"
                      />
                    </td>
                    <td className="px-4 py-3 font-mono text-[0.75rem] text-[#1A56DB] font-medium whitespace-nowrap">{claim.id}</td>
                    <td className="px-4 py-3 text-[#374151] font-medium whitespace-nowrap">{claim.patient}</td>
                    <td className="px-4 py-3 text-[#6B7280] whitespace-nowrap">{claim.provider}</td>
                    <td className="px-4 py-3 text-[#6B7280] whitespace-nowrap">{claim.payer}</td>
                    <td className="px-4 py-3 font-mono text-[0.75rem] text-[#374151]">{claim.code}</td>
                    <td className="px-4 py-3 font-semibold text-[#374151] whitespace-nowrap" style={{fontVariantNumeric: 'tabular-nums'}}>{claim.amount}</td>
                    <td className="px-4 py-3 whitespace-nowrap"><StatusBadge status={claim.status} /></td>
                    <td className="px-4 py-3 text-[#9CA3AF] whitespace-nowrap">{claim.date}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-[#1A56DB] hover:bg-[#EBF0FF] transition-colors" title="View">
                          <Eye size={13} />
                        </button>
                        <button className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-[#D97706] hover:bg-[#FEF3C7] transition-colors" title="Edit">
                          <Edit size={13} />
                        </button>
                        <button className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-[#DC2626] hover:bg-[#FEE2E2] transition-colors" title="Delete">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredClaims.length === 0 && (
                  <tr>
                    <td colSpan={10} className="px-4 py-10 text-center text-[0.875rem] text-[#9CA3AF]">
                      No claims match your search
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-[#E5E7EB]">
            <span className="text-[0.75rem] text-[#6B7280]">Showing {filteredClaims.length} of {claims.length} claims</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, '...', 12].map((p, i) => (
                <button
                  key={i}
                  className={`w-7 h-7 rounded text-[0.75rem] font-medium transition-colors ${p === 1 ? 'bg-[#1A56DB] text-white' : 'text-[#6B7280] hover:bg-[#F3F4F6]'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
        <UsageNote>
          Always include a search and filter bar for tables with more than 10 rows. Provide visual feedback for sorted columns. Enable row selection for bulk operations. Use zebra striping sparingly — rely on row hover instead.
        </UsageNote>
      </SubSection>

      {/* Simple Table */}
      <SubSection title="Simple Read-Only Table" description="For displaying reference data without interaction.">
        <div className="rounded-xl border border-[#E5E7EB] overflow-hidden">
          <table className="w-full text-[0.8125rem]">
            <thead>
              <tr className="bg-[#F3F4F6]">
                {['Payer', 'Total Claims', 'Approved', 'Denied', 'Denial Rate'].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-[0.6875rem] font-semibold text-[#374151] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { payer: 'Medicare', total: 482, approved: 441, denied: 41, rate: '8.5%', rateColor: '#D97706' },
                { payer: 'Medicaid', total: 261, approved: 248, denied: 13, rate: '5.0%', rateColor: '#16A34A' },
                { payer: 'BCBS', total: 318, approved: 289, denied: 29, rate: '9.1%', rateColor: '#DC2626' },
                { payer: 'Aetna', total: 124, approved: 117, denied: 7, rate: '5.6%', rateColor: '#16A34A' },
                { payer: 'United', total: 207, approved: 191, denied: 16, rate: '7.7%', rateColor: '#D97706' },
              ].map(row => (
                <tr key={row.payer} className="border-t border-[#F3F4F6] hover:bg-[#F9FAFB]">
                  <td className="px-4 py-3 font-medium text-[#374151]">{row.payer}</td>
                  <td className="px-4 py-3 text-[#6B7280]" style={{fontVariantNumeric:'tabular-nums'}}>{row.total.toLocaleString()}</td>
                  <td className="px-4 py-3 text-[#16A34A] font-medium" style={{fontVariantNumeric:'tabular-nums'}}>{row.approved.toLocaleString()}</td>
                  <td className="px-4 py-3 text-[#DC2626] font-medium" style={{fontVariantNumeric:'tabular-nums'}}>{row.denied}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: row.rateColor }}>{row.rate}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-[#E5E7EB] bg-[#F9FAFB]">
                <td className="px-4 py-2.5 font-semibold text-[#374151]">Total</td>
                <td className="px-4 py-2.5 font-semibold text-[#374151]">1,392</td>
                <td className="px-4 py-2.5 font-semibold text-[#16A34A]">1,286</td>
                <td className="px-4 py-2.5 font-semibold text-[#DC2626]">106</td>
                <td className="px-4 py-2.5 font-semibold text-[#D97706]">7.6%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </SubSection>
    </SectionWrapper>
  );
}