import React, { useState, useRef } from 'react';
import { SectionWrapper, SubSection, UsageNote } from './SectionWrapper';
import { X, AlertTriangle, CheckCircle, XCircle, Info, AlertCircle, Trash2, Download, Bell, Loader2, Upload, FileText, Image, File, CloudUpload, CheckCheck } from 'lucide-react';

/* ─── Shared Modal Shell ─────────────────────────────────────────────────── */
interface ModalShellProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

function ModalShell({ open, onClose, children, size = 'md' }: ModalShellProps) {
  if (!open) return null;
  const widths = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-2xl' };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-white rounded-2xl shadow-2xl w-full ${widths[size]} overflow-hidden animate-in fade-in zoom-in-95 duration-150`}>
        {children}
      </div>
    </div>
  );
}

/* ─── Modal Header component ─────────────────────────────────────────────── */
interface ModalHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  iconBg?: string;
  onClose: () => void;
  variant?: 'default' | 'navy' | 'gradient';
}

function ModalHeader({ title, subtitle, icon, iconBg = 'bg-[#ddeef9]', onClose, variant = 'default' }: ModalHeaderProps) {
  const headerBg =
    variant === 'navy'     ? 'bg-[#00396b]' :
    variant === 'gradient' ? '' :
    'bg-white';

  const titleColor  = variant !== 'default' ? 'text-white' : 'text-[#00396b]';
  const subColor    = variant !== 'default' ? 'text-[#99cceb]' : 'text-[#6B7280]';
  const closeColor  = variant !== 'default'
    ? 'text-[#99cceb] hover:bg-white/10 hover:text-white'
    : 'text-[#9CA3AF] hover:bg-[#F3F4F6] hover:text-[#374151]';

  return (
    <div
      className={`flex items-start gap-3 px-6 py-5 border-b ${variant === 'default' ? 'border-[#E5E7EB]' : 'border-white/10'} ${headerBg}`}
      style={variant === 'gradient' ? { background: 'linear-gradient(173deg, #0078ba 0%, #00386f 73%)' } : {}}
    >
      {icon && (
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${variant === 'default' ? iconBg : 'bg-white/15'}`}>
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h3 className={`font-semibold leading-snug ${titleColor}`} style={{ fontSize: '1.0625rem' }}>{title}</h3>
        {subtitle && <p className={`text-[0.8125rem] mt-0.5 ${subColor}`}>{subtitle}</p>}
      </div>
      <button
        onClick={onClose}
        className={`p-1.5 rounded-lg transition-colors flex-shrink-0 ${closeColor}`}
        aria-label="Close modal"
      >
        <X size={16} />
      </button>
    </div>
  );
}

/* ─── Modal Footer ───────────────────────────────────────────────────────── */
interface ModalFooterProps {
  onClose: () => void;
  onConfirm?: () => void;
  cancelLabel?: string;
  confirmLabel?: string;
  confirmVariant?: 'primary' | 'danger' | 'success';
  loading?: boolean;
  loadingLabel?: string;
  extraLeft?: React.ReactNode;
}

function ModalFooter({
  onClose, onConfirm, cancelLabel = 'Cancel', confirmLabel = 'Confirm',
  confirmVariant = 'primary', loading = false, loadingLabel = 'Processing...', extraLeft,
}: ModalFooterProps) {
  const confirmBg = {
    primary: 'bg-[#0078ba] hover:bg-[#004d8f]',
    danger:  'bg-[#DC2626] hover:bg-[#B91C1C]',
    success: 'bg-[#16A34A] hover:bg-[#15803D]',
  }[confirmVariant];

  return (
    <div className="flex items-center justify-between gap-3 px-6 py-4 bg-[#f3f3f3] border-t border-[#E5E7EB]">
      <div>{extraLeft}</div>
      <div className="flex items-center gap-2">
        {/* Cancel / Close button */}
        <button
          onClick={onClose}
          className="px-4 py-2 border border-[#D1D5DB] text-[#374151] text-[0.875rem] font-medium rounded-lg hover:bg-white hover:border-[#9CA3AF] transition-all flex items-center gap-1.5"
        >
          <X size={14} />
          {cancelLabel}
        </button>
        {onConfirm && (
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`px-4 py-2 text-white text-[0.875rem] font-medium rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-60 ${confirmBg}`}
          >
            {loading ? <><Loader2 size={14} className="animate-spin" />{loadingLabel}</> : confirmLabel}
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Upload Modal ───────────────────────────────────────────────────────── */
type UploadState = 'idle' | 'dragging' | 'uploading' | 'done';

interface UploadedFile {
  name: string;
  size: string;
  type: 'pdf' | 'image' | 'doc' | 'other';
  progress: number;
  done: boolean;
}

function fileIcon(type: UploadedFile['type']) {
  const map = {
    pdf:   <FileText size={16} className="text-[#DC2626]" />,
    image: <Image size={16} className="text-[#0EA5E9]" />,
    doc:   <FileText size={16} className="text-[#1A56DB]" />,
    other: <File size={16} className="text-[#6B7280]" />,
  };
  return map[type];
}

function UploadModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [dragState, setDragState] = useState<UploadState>('idle');
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const mockFiles: UploadedFile[] = [
    { name: 'CLM-2025-0041-EOB.pdf',     size: '2.4 MB', type: 'pdf',   progress: 100, done: true },
    { name: 'Authorization-Letter.pdf',   size: '1.1 MB', type: 'pdf',   progress: 100, done: true },
    { name: 'Patient-ID-Card.jpg',        size: '856 KB', type: 'image', progress: 72,  done: false },
  ];

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragState('idle');
    setFiles(mockFiles);
  };

  const handleUpload = () => {
    if (files.length === 0) { setFiles(mockFiles); return; }
    setUploading(true);
    setTimeout(() => { setUploading(false); onClose(); }, 2000);
  };

  const removeFile = (name: string) => setFiles(f => f.filter(x => x.name !== name));

  return (
    <ModalShell open={open} onClose={onClose} size="lg">
      <ModalHeader
        title="Upload Supporting Documents"
        subtitle="Attach EOBs, authorization letters, and clinical notes to this claim"
        icon={<CloudUpload size={20} className="text-[#1A56DB]" />}
        onClose={onClose}
        variant="default"
      />

      <div className="px-6 py-5 space-y-4">
        {/* Drop zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDragState('dragging'); }}
          onDragLeave={() => setDragState('idle')}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
            dragState === 'dragging'
              ? 'border-[#0078ba] bg-[#ddeef9] scale-[1.01]'
              : 'border-[#D1D5DB] bg-[#f3f3f3] hover:border-[#0078ba] hover:bg-[#ddeef9]/30'
          }`}
        >
          <input ref={inputRef} type="file" multiple className="hidden" onChange={() => setFiles(mockFiles)} />
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${dragState === 'dragging' ? 'bg-[#0078ba]' : 'bg-[#ddeef9]'}`}>
            <Upload size={22} className={dragState === 'dragging' ? 'text-white' : 'text-[#0078ba]'} />
          </div>
          <div className="text-center">
            <p className="text-[0.9375rem] font-semibold text-[#111827]">
              {dragState === 'dragging' ? 'Drop files here' : 'Drag & drop files here'}
            </p>
            <p className="text-[0.8125rem] text-[#6B7280] mt-1">
              or <span className="text-[#0078ba] underline decoration-dashed">browse to choose files</span>
            </p>
          </div>
          <div className="flex items-center gap-2 text-[0.6875rem] text-[#9CA3AF]">
            <span className="px-2 py-0.5 bg-white border border-[#E5E7EB] rounded">PDF</span>
            <span className="px-2 py-0.5 bg-white border border-[#E5E7EB] rounded">JPG</span>
            <span className="px-2 py-0.5 bg-white border border-[#E5E7EB] rounded">PNG</span>
            <span className="px-2 py-0.5 bg-white border border-[#E5E7EB] rounded">DOCX</span>
            <span className="text-[#D1D5DB]">·</span>
            <span>Max 10 MB per file</span>
          </div>
        </div>

        {/* File list */}
        {files.length > 0 && (
          <div className="space-y-2">
            <p className="text-[0.75rem] font-semibold text-[#6B7280] uppercase tracking-wider">
              Queued Files ({files.length})
            </p>
            {files.map(f => (
              <div key={f.name} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#E5E7EB]">
                <div className="w-9 h-9 rounded-lg bg-[#F3F4F6] flex items-center justify-center flex-shrink-0">
                  {fileIcon(f.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[0.8125rem] font-medium text-[#111827] truncate">{f.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${f.done ? 'bg-[#16A34A]' : 'bg-[#0078ba]'}`}
                        style={{ width: `${f.progress}%` }}
                      />
                    </div>
                    <span className="text-[0.625rem] text-[#9CA3AF] flex-shrink-0">
                      {f.done ? <CheckCheck size={12} className="text-[#16A34A]" /> : `${f.progress}%`}
                    </span>
                    <span className="text-[0.6875rem] text-[#9CA3AF] flex-shrink-0">{f.size}</span>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(f.name)}
                  className="p-1.5 rounded-lg text-[#9CA3AF] hover:bg-[#FEE2E2] hover:text-[#DC2626] transition-colors flex-shrink-0"
                >
                  <X size={13} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Attached to */}
        <div className="p-3 bg-[#ddeef9] rounded-lg border border-[#bdddf5] flex items-center gap-2">
          <AlertCircle size={14} className="text-[#0078ba] flex-shrink-0" />
          <p className="text-[0.8125rem] text-[#00396b]">
            Documents will be attached to claim <span className="font-mono font-semibold">CLM-2025-0041</span>
          </p>
        </div>
      </div>

      <ModalFooter
        onClose={onClose}
        onConfirm={handleUpload}
        cancelLabel="Cancel"
        confirmLabel={files.length > 0 ? `Upload ${files.length} File${files.length > 1 ? 's' : ''}` : 'Select Files'}
        confirmVariant="primary"
        loading={uploading}
        loadingLabel="Uploading..."
        extraLeft={
          files.length > 0
            ? <button onClick={() => setFiles([])} className="text-[0.8125rem] text-[#6B7280] hover:text-[#DC2626] transition-colors">Clear all</button>
            : undefined
        }
      />
    </ModalShell>
  );
}

/* ─── Existing modal types ───────────────────────────────────────────────── */
function Modal({ type }: { type: 'info' | 'confirm' | 'form' | 'success' }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setOpen(false); }, 1500);
  };

  const configs = {
    info: {
      btnLabel: 'Info Modal', btnClass: 'bg-[#ddeef9] text-[#00396b] border border-[#bdddf5] hover:bg-[#bdddf5]',
      title: 'Claim Processing Notice', subtitle: 'Status update for CLM-2025-0014',
      icon: <Info size={18} className="text-[#2563EB]" />, iconBg: 'bg-[#DBEAFE]',
      content: (
        <p className="text-[0.875rem] text-[#6B7280] leading-relaxed">
          Claim <span className="font-mono font-semibold text-[#374151]">CLM-2025-0014</span> is currently in queue for manual review. Average processing time is <strong className="text-[#374151]">5–7 business days</strong>. You will receive an email notification when the status changes.
        </p>
      ),
      footer: <button onClick={() => setOpen(false)} className="px-4 py-2 bg-[#0078ba] text-white text-[0.875rem] font-medium rounded-lg hover:bg-[#004d8f] transition-colors">Got it</button>,
    },
    confirm: {
      btnLabel: 'Confirm Dialog', btnClass: 'bg-[#FEE2E2] text-[#DC2626] border border-[#FCA5A5] hover:bg-[#FCA5A5]',
      title: 'Delete Claim Record', subtitle: 'This action is permanent and cannot be undone',
      icon: <Trash2 size={18} className="text-[#DC2626]" />, iconBg: 'bg-[#FEE2E2]',
      content: (
        <div>
          <p className="text-[0.875rem] text-[#6B7280] leading-relaxed mb-3">
            Are you sure you want to permanently delete claim <span className="font-mono font-semibold text-[#374151]">CLM-2025-0013</span>?
          </p>
          <div className="p-3 bg-[#FFF5F5] border border-[#FCA5A5] rounded-lg text-[0.8125rem] text-[#B91C1C]">
            ⚠ All associated documents and audit history will be permanently removed.
          </div>
        </div>
      ),
      footer: (
        <div className="flex gap-2">
          <button onClick={() => setOpen(false)} className="px-4 py-2 border border-[#D1D5DB] text-[#374151] text-[0.875rem] font-medium rounded-lg hover:bg-[#F9FAFB] flex items-center gap-1.5 transition-colors">
            <X size={13} />Cancel
          </button>
          <button onClick={handleConfirm} disabled={loading} className="px-4 py-2 bg-[#DC2626] text-white text-[0.875rem] font-medium rounded-lg hover:bg-[#B91C1C] flex items-center gap-1.5 disabled:opacity-60 transition-colors">
            {loading ? <><Loader2 size={13} className="animate-spin" />Deleting...</> : <><Trash2 size={13} />Delete Permanently</>}
          </button>
        </div>
      ),
    },
    form: {
      btnLabel: 'Form Modal', btnClass: 'bg-[#0078ba] text-white hover:bg-[#004d8f]',
      title: 'Export Claims Report', subtitle: 'Configure your export settings below',
      icon: <Download size={18} className="text-[#16A34A]" />, iconBg: 'bg-[#DCFCE7]',
      content: (
        <div className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.8125rem] font-medium text-[#374151]">Report Format</label>
            <select className="bg-white border border-[#D1D5DB] rounded-lg px-3 py-2 text-[0.875rem] text-[#374151] outline-none focus:border-[#0078ba]">
              <option>Excel (.xlsx)</option><option>CSV (.csv)</option><option>PDF Report</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.8125rem] font-medium text-[#374151]">Start Date</label>
              <input type="date" className="bg-white border border-[#D1D5DB] rounded-lg px-3 py-2 text-[0.875rem] outline-none focus:border-[#0078ba]" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.8125rem] font-medium text-[#374151]">End Date</label>
              <input type="date" className="bg-white border border-[#D1D5DB] rounded-lg px-3 py-2 text-[0.875rem] outline-none focus:border-[#0078ba]" />
            </div>
          </div>
        </div>
      ),
      footer: (
        <div className="flex gap-2">
          <button onClick={() => setOpen(false)} className="px-4 py-2 border border-[#D1D5DB] text-[#374151] text-[0.875rem] font-medium rounded-lg hover:bg-[#F9FAFB] flex items-center gap-1.5 transition-colors">
            <X size={13} />Cancel
          </button>
          <button onClick={handleConfirm} disabled={loading} className="px-4 py-2 bg-[#0078ba] text-white text-[0.875rem] font-medium rounded-lg hover:bg-[#004d8f] flex items-center gap-1.5 disabled:opacity-60 transition-colors">
            {loading ? <><Loader2 size={13} className="animate-spin" />Generating...</> : <><Download size={13} />Export Report</>}
          </button>
        </div>
      ),
    },
    success: {
      btnLabel: 'Success State', btnClass: 'bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0] hover:bg-[#BBF7D0]',
      title: 'Claim Submitted!', subtitle: 'Successfully sent to Medicare',
      icon: <CheckCircle size={18} className="text-[#16A34A]" />, iconBg: 'bg-[#DCFCE7]',
      content: (
        <div className="text-center py-2">
          <div className="w-16 h-16 bg-[#DCFCE7] rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-[#16A34A]" />
          </div>
          <p className="text-[0.875rem] text-[#6B7280] leading-relaxed">
            Claim <span className="font-mono font-semibold text-[#374151]">CLM-2025-0018</span> has been successfully submitted to <strong className="text-[#374151]">Medicare</strong> for processing.
          </p>
        </div>
      ),
      footer: (
        <div className="flex gap-2 w-full">
          <button onClick={() => setOpen(false)} className="flex-1 px-4 py-2 border border-[#D1D5DB] text-[#374151] text-[0.875rem] font-medium rounded-lg hover:bg-[#F9FAFB] transition-colors">Submit Another</button>
          <button onClick={() => setOpen(false)} className="flex-1 px-4 py-2 bg-[#16A34A] text-white text-[0.875rem] font-medium rounded-lg hover:bg-[#15803D] transition-colors">View Claim</button>
        </div>
      ),
    },
  };

  const cfg = configs[type];

  return (
    <>
      <button onClick={() => setOpen(true)} className={`px-3 py-2 text-[0.8125rem] font-medium rounded-lg transition-colors ${cfg.btnClass}`}>
        {cfg.btnLabel}
      </button>
      <ModalShell open={open} onClose={() => setOpen(false)}>
        <ModalHeader title={cfg.title} subtitle={cfg.subtitle} icon={cfg.icon} iconBg={cfg.iconBg} onClose={() => setOpen(false)} />
        <div className="px-6 py-5">{cfg.content}</div>
        <div className="flex items-center justify-end gap-2 px-6 py-4 bg-[#F9FAFB] border-t border-[#E5E7EB]">
          {cfg.footer}
        </div>
      </ModalShell>
    </>
  );
}

/* ─── Modal Header Showcases ─────────────────────────────────────────────── */
function ModalHeaderShowcase() {
  const [variant, setVariant] = useState<'default' | 'navy' | 'gradient'>('default');
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-3">
        {(['default', 'navy', 'gradient'] as const).map(v => (
          <button key={v} onClick={() => { setVariant(v); setOpen(true); }}
            className={`px-3 py-2 text-[0.8125rem] font-medium rounded-lg border transition-all capitalize ${
              v === 'default' ? 'bg-white border-[#D1D5DB] text-[#374151] hover:border-[#0078ba]' :
              v === 'navy'    ? 'bg-[#00396b] text-white border-[#00396b] hover:bg-[#004d8f]' :
              'text-white border-transparent hover:opacity-90'
            }`}
            style={v === 'gradient' ? { background: 'linear-gradient(173deg, #0078ba 0%, #00386f 73%)' } : {}}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)} Header
          </button>
        ))}
      </div>

      <ModalShell open={open} onClose={() => setOpen(false)}>
        <ModalHeader
          title="Modal Header Variant"
          subtitle="This subtitle provides additional context for the modal"
          icon={<Info size={18} className={variant === 'default' ? 'text-[#2563EB]' : 'text-white'} />}
          iconBg={variant === 'default' ? 'bg-[#DBEAFE]' : 'bg-white/20'}
          onClose={() => setOpen(false)}
          variant={variant}
        />
        <div className="px-6 py-5">
          <p className="text-[0.875rem] text-[#6B7280] leading-relaxed">
            This demonstrates the <strong className="text-[#374151]">{variant}</strong> header variant.
            The modal shell is reusable with any header style, icon, and content configuration.
          </p>
          <div className="mt-4 p-3 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
            <p className="text-[0.75rem] font-mono text-[#6B7280]">variant="{variant}"</p>
          </div>
        </div>
        <ModalFooter onClose={() => setOpen(false)} onConfirm={() => setOpen(false)} confirmLabel="Got it" />
      </ModalShell>
    </>
  );
}

/* ─── Alerts & Toasts (existing) ─────────────────────────────────────────── */
function Alert({ variant }: { variant: 'info' | 'success' | 'warning' | 'error' }) {
  const [dismissed, setDismissed] = useState(false);
  const configs = {
    info:    { bg: '#EFF6FF', border: '#93C5FD', icon: Info,          iconColor: '#2563EB', title: 'System Update Scheduled',   msg: 'TrueSight will undergo maintenance on Jan 25, 2025 from 2:00–4:00 AM EST. Claims submitted during this window will be queued.' },
    success: { bg: '#F0FDF4', border: '#86EFAC', icon: CheckCircle,   iconColor: '#16A34A', title: 'Batch Upload Complete',      msg: '247 claims were successfully imported. 3 claims were skipped due to duplicate claim IDs.' },
    warning: { bg: '#FFFBEB', border: '#FCD34D', icon: AlertTriangle, iconColor: '#D97706', title: 'Prior Authorization Required', msg: 'Claim CLM-2025-0021 requires prior authorization from Aetna before submission. Estimated delay: 3–5 business days.' },
    error:   { bg: '#FFF5F5', border: '#FCA5A5', icon: XCircle,       iconColor: '#DC2626', title: 'Submission Failed',          msg: 'Claim CLM-2025-0019 was rejected by Medicare (Error 835-CO-97). The billed service is not covered under the patient\'s current plan.' },
  }[variant];
  const Icon = configs.icon;
  if (dismissed) return null;
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl border" style={{ backgroundColor: configs.bg, borderColor: configs.border }}>
      <Icon size={18} style={{ color: configs.iconColor }} className="flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-[0.8125rem] font-semibold mb-0.5" style={{ color: configs.iconColor }}>{configs.title}</p>
        <p className="text-[0.8125rem] text-[#374151] leading-relaxed">{configs.msg}</p>
      </div>
      <button onClick={() => setDismissed(true)} className="p-0.5 rounded text-[#9CA3AF] hover:text-[#374151] transition-colors flex-shrink-0">
        <X size={14} />
      </button>
    </div>
  );
}

function Toast({ variant }: { variant: 'success' | 'error' | 'info' | 'warning' }) {
  const configs = {
    success: { bg: '#00396b', icon: CheckCircle,   iconColor: '#4ADE80', title: 'Claim submitted successfully', msg: 'CLM-2025-0022 sent to Medicare' },
    error:   { bg: '#7F1D1D', icon: XCircle,       iconColor: '#FCA5A5', title: 'Submission error',             msg: 'Check EDI format and retry' },
    info:    { bg: '#004d8f', icon: Bell,           iconColor: '#99cceb', title: 'Claim status updated',        msg: 'CLM-2025-0015 approved by BCBS' },
    warning: { bg: '#78350F', icon: AlertTriangle,  iconColor: '#FCD34D', title: 'Review required',             msg: 'High-risk claim flagged for review' },
  }[variant];
  const Icon = configs.icon;
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg" style={{ backgroundColor: configs.bg, minWidth: '280px' }}>
      <Icon size={16} style={{ color: configs.iconColor }} />
      <div className="flex-1">
        <p className="text-[0.8125rem] font-semibold text-white">{configs.title}</p>
        <p className="text-[0.75rem] text-[#99cceb]">{configs.msg}</p>
      </div>
      <button className="p-0.5 text-[#93B4FD] hover:text-white transition-colors"><X size={13} /></button>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */
export function ModalsAlertsSection() {
  const [uploadOpen, setUploadOpen] = useState(false);

  return (
    <SectionWrapper
      id="modals"
      title="Modals, Alerts & Notifications"
      subtitle="These patterns communicate important information and request decisions. Use them purposefully — avoid interrupting users unnecessarily."
    >
      {/* Modal Header Variants */}
      <SubSection title="Modal Header Variants" description="Three header styles for different contexts: default (light), navy, and gradient.">
        <ModalHeaderShowcase />
        <UsageNote>
          Use <strong>default</strong> for standard modals, <strong>navy</strong> for critical system messages, and <strong>gradient</strong> for premium or onboarding flows. All headers include a standardized close (×) button in the top-right corner.
        </UsageNote>
      </SubSection>

      {/* Upload Document */}
      <SubSection title="Upload Document Modal" description="Drag-and-drop file upload with progress tracking, file validation, and attach-to-claim context.">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setUploadOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0078ba] text-white text-[0.875rem] font-medium rounded-lg hover:bg-[#004d8f] transition-colors"
          >
            <Upload size={15} /> Upload Documents
          </button>
          <p className="text-[0.875rem] text-[#6B7280]">Click to preview the full upload modal</p>
        </div>
        <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} />

        {/* Static preview */}
        <div className="mt-4 rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-sm max-w-xl">
          <div className="flex items-start gap-3 px-6 py-5 border-b border-[#E5E7EB] bg-white">
            <div className="w-10 h-10 rounded-xl bg-[#ddeef9] flex items-center justify-center flex-shrink-0">
              <CloudUpload size={20} className="text-[#0078ba]" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[#00396b]" style={{ fontSize: '1.0625rem' }}>Upload Supporting Documents</h3>
              <p className="text-[0.8125rem] text-[#6B7280] mt-0.5">Attach EOBs, authorization letters, and clinical notes</p>
            </div>
            <button className="p-1.5 rounded-lg text-[#9CA3AF] hover:bg-[#F3F4F6] transition-colors">
              <X size={16} />
            </button>
          </div>
          <div className="px-6 py-5 bg-white space-y-3">
            <div className="flex flex-col items-center gap-2 p-6 rounded-xl border-2 border-dashed border-[#D1D5DB] bg-[#f3f3f3]">
              <div className="w-10 h-10 rounded-xl bg-[#ddeef9] flex items-center justify-center">
                <Upload size={18} className="text-[#0078ba]" />
              </div>
              <p className="text-[0.875rem] font-semibold text-[#111827]">Drag & drop files here</p>
              <p className="text-[0.75rem] text-[#6B7280]">or <span className="text-[#0078ba]">browse to choose</span></p>
            </div>
            {[
              { name: 'CLM-2025-0041-EOB.pdf', size: '2.4 MB', progress: 100, done: true },
              { name: 'Patient-ID-Card.jpg',   size: '856 KB', progress: 72,  done: false },
            ].map(f => (
              <div key={f.name} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#E5E7EB]">
                <div className="w-9 h-9 rounded-lg bg-[#F3F4F6] flex items-center justify-center flex-shrink-0">
                  <FileText size={16} className={f.done ? 'text-[#16A34A]' : 'text-[#DC2626]'} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[0.8125rem] font-medium text-[#111827] truncate">{f.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${f.done ? 'bg-[#16A34A]' : 'bg-[#0078ba]'}`} style={{ width: `${f.progress}%` }} />
                    </div>
                    <span className="text-[0.6875rem] text-[#9CA3AF]">{f.size}</span>
                  </div>
                </div>
                <button className="p-1.5 rounded-lg text-[#9CA3AF] hover:bg-[#FEE2E2] hover:text-[#DC2626] transition-colors">
                  <X size={13} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between px-6 py-4 bg-[#f3f3f3] border-t border-[#E5E7EB]">
            <button className="text-[0.8125rem] text-[#6B7280] hover:text-[#DC2626]">Clear all</button>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-[#D1D5DB] text-[#374151] text-[0.875rem] font-medium rounded-lg flex items-center gap-1.5">
                <X size={13} /> Cancel
              </button>
              <button className="px-4 py-2 bg-[#0078ba] text-white text-[0.875rem] font-medium rounded-lg flex items-center gap-1.5">
                <Upload size={13} /> Upload 2 Files
              </button>
            </div>
          </div>
        </div>
      </SubSection>

      {/* Modals */}
      <SubSection title="Modal Types" description="Click a button to preview each modal type. All include structured headers with close buttons.">
        <div className="flex flex-wrap gap-3">
          <Modal type="info" />
          <Modal type="confirm" />
          <Modal type="form" />
          <Modal type="success" />
        </div>
        <UsageNote>
          Use modals for actions requiring user confirmation or focused input. Keep modal content concise — under 3 form fields or 150 words. Always allow keyboard dismissal (Escape key). The cancel/close button always uses an X icon + label for clarity.
        </UsageNote>
      </SubSection>

      {/* Close / Cancel Button Patterns */}
      <SubSection title="Close & Cancel Button Patterns" description="Standardized dismiss patterns used across all modal types.">
        <div className="p-5 rounded-xl border border-[#E5E7EB] bg-white">
          <p className="text-[0.75rem] font-semibold text-[#6B7280] uppercase tracking-wider mb-4">Cancel / Close Variants</p>
          <div className="flex flex-wrap gap-3">
            {/* Icon only */}
            <div className="flex flex-col items-center gap-2">
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-[#9CA3AF] hover:bg-[#F3F4F6] hover:text-[#374151] border border-[#E5E7EB] transition-all">
                <X size={16} />
              </button>
              <span className="text-[0.625rem] text-[#9CA3AF]">Icon only</span>
            </div>
            {/* Cancel text */}
            <div className="flex flex-col items-center gap-2">
              <button className="px-4 py-2 border border-[#D1D5DB] text-[#374151] text-[0.875rem] font-medium rounded-lg hover:bg-[#F9FAFB] transition-all">
                Cancel
              </button>
              <span className="text-[0.625rem] text-[#9CA3AF]">Text only</span>
            </div>
            {/* X + Cancel */}
            <div className="flex flex-col items-center gap-2">
              <button className="px-4 py-2 border border-[#D1D5DB] text-[#374151] text-[0.875rem] font-medium rounded-lg hover:bg-[#F9FAFB] flex items-center gap-1.5 transition-all">
                <X size={14} /> Cancel
              </button>
              <span className="text-[0.625rem] text-[#9CA3AF]">Icon + label</span>
            </div>
            {/* Ghost dismiss */}
            <div className="flex flex-col items-center gap-2">
              <button className="px-4 py-2 text-[#6B7280] text-[0.875rem] font-medium hover:text-[#374151] transition-colors">
                Dismiss
              </button>
              <span className="text-[0.625rem] text-[#9CA3AF]">Ghost dismiss</span>
            </div>
            {/* Disabled close */}
            <div className="flex flex-col items-center gap-2">
              <button disabled className="px-4 py-2 border border-[#E5E7EB] text-[#9CA3AF] text-[0.875rem] font-medium rounded-lg cursor-not-allowed flex items-center gap-1.5 opacity-50">
                <X size={14} /> Close
              </button>
              <span className="text-[0.625rem] text-[#9CA3AF]">Disabled</span>
            </div>
          </div>
        </div>
      </SubSection>

      {/* Alert Banners */}
      <SubSection title="Inline Alerts" description="Inline alerts appear within page content to communicate contextual status.">
        <div className="space-y-3">
          <Alert variant="info" />
          <Alert variant="success" />
          <Alert variant="warning" />
          <Alert variant="error" />
        </div>
        <UsageNote>
          Place inline alerts immediately before the content they relate to. Always include a clear title and actionable message. Allow dismissal for non-critical alerts.
        </UsageNote>
      </SubSection>

      {/* Toast */}
      <SubSection title="Toast Notifications" description="Brief, auto-dismissing messages for background events and action confirmations.">
        <div className="flex flex-wrap gap-3">
          <Toast variant="success" />
          <Toast variant="error" />
          <Toast variant="info" />
          <Toast variant="warning" />
        </div>
        <UsageNote>
          Toast notifications appear in the bottom-right corner, stack vertically, and auto-dismiss after 4–5 seconds. Always allow manual dismissal. Maximum 3 toasts visible at once.
        </UsageNote>
      </SubSection>

      {/* Tooltip */}
      <SubSection title="Tooltips" description="Short contextual information on hover. Limited to 80 characters max.">
        <div className="flex flex-wrap gap-6 p-6 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
          {[
            { label: 'Default', tip: 'Claim denial rate increased 2.1% this week' },
            { label: 'With Icon', tip: 'CPT codes must match diagnosis code per payer requirements' },
            { label: 'Data Tip', tip: '$1,247.50 · Medicare · Approved Jan 15' },
          ].map(({ label, tip }) => (
            <div key={label} className="relative group">
              <button className="px-3 py-1.5 bg-white border border-[#D1D5DB] rounded-lg text-[0.8125rem] text-[#374151] hover:border-[#0078ba] transition-colors">
                {label}
              </button>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">
                <div className="bg-[#111827] text-white text-[0.6875rem] px-3 py-1.5 rounded-lg shadow-lg max-w-[200px] text-center leading-snug whitespace-nowrap">
                  {tip}
                </div>
                <div className="w-2 h-2 bg-[#111827] rotate-45 mx-auto -mt-1" />
              </div>
            </div>
          ))}
        </div>
      </SubSection>
    </SectionWrapper>
  );
}