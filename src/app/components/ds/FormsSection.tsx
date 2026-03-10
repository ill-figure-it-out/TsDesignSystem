import React, { useState, useRef } from 'react';
import { SectionWrapper, SubSection, UsageNote, ShowcaseBox } from './SectionWrapper';
import { Search, Eye, EyeOff, ChevronDown, Check, AlertCircle, Calendar, X, Filter } from 'lucide-react';

/* ─── Search Bar ─────────────────────────────────────────────────────────── */
function SearchBar({
  variant = 'default',
  placeholder = 'Search...',
  size = 'md',
}: {
  variant?: 'default' | 'rounded' | 'bordered' | 'dark';
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);

  const sizes = {
    sm: { height: 'h-8',  px: 'px-3',   icon: 14, text: 'text-[0.8125rem]' },
    md: { height: 'h-10', px: 'px-3.5', icon: 16, text: 'text-[0.875rem]'  },
    lg: { height: 'h-12', px: 'px-4',   icon: 18, text: 'text-[0.9375rem]' },
  }[size];

  const variantStyles = {
    default: `bg-white border ${focused ? 'border-[#0078ba] ring-2 ring-[#0078ba]/15' : 'border-[#D1D5DB]'} rounded-lg`,
    rounded: `bg-white border ${focused ? 'border-[#0078ba] ring-2 ring-[#0078ba]/15' : 'border-[#D1D5DB]'} rounded-full`,
    bordered: `bg-[#f3f3f3] border-2 ${focused ? 'border-[#0078ba]' : 'border-[#E5E7EB]'} rounded-xl`,
    dark: `bg-[#004d8f] border ${focused ? 'border-[#5bb0e1]' : 'border-[#005ea0]'} rounded-lg`,
  }[variant];

  const iconColor  = variant === 'dark' ? 'text-[#5bb0e1]'  : focused ? 'text-[#0078ba]' : 'text-[#9CA3AF]';
  const textColor  = variant === 'dark' ? 'text-white'       : 'text-[#111827]';
  const phColor    = variant === 'dark' ? 'placeholder:text-[#5bb0e1]' : 'placeholder:text-[#9CA3AF]';

  return (
    <div className={`flex items-center gap-2.5 ${sizes.height} ${sizes.px} transition-all ${variantStyles}`}>
      <Search size={sizes.icon} className={`flex-shrink-0 transition-colors ${iconColor}`} />
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className={`flex-1 bg-transparent outline-none ${sizes.text} ${textColor} ${phColor}`}
      />
      {value && (
        <button onClick={() => setValue('')} className={`flex-shrink-0 rounded-full p-0.5 transition-colors ${variant === 'dark' ? 'text-[#5bb0e1] hover:text-white' : 'text-[#9CA3AF] hover:text-[#374151]'}`}>
          <X size={sizes.icon - 2} />
        </button>
      )}
    </div>
  );
}

/* ─── Autocomplete Search ────────────────────────────────────────────────── */
function AutocompleteSearch() {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const suggestions = [
    { type: 'claim',    label: 'CLM-2025-0041', meta: 'Medicare · $1,247.50 · Approved' },
    { type: 'claim',    label: 'CLM-2025-0042', meta: 'Aetna · $890.00 · Pending' },
    { type: 'patient',  label: 'James Wilson',  meta: 'Patient · DOB 03/14/1968' },
    { type: 'provider', label: 'Dr. Sarah Chen', meta: 'Provider · NPI 1234567890' },
    { type: 'code',     label: 'CPT 99213',      meta: 'Office visit, established patient' },
  ].filter(s => value && s.label.toLowerCase().includes(value.toLowerCase()));

  const typeColors: Record<string, string> = {
    claim: '#ddeef9',    patient: '#DCFCE7',
    provider: '#E0F2FE', code: '#FEF3C7',
  };
  const typeTextColors: Record<string, string> = {
    claim: '#00396b',    patient: '#15803D',
    provider: '#0E7490', code: '#92400E',
  };

  return (
    <div ref={ref} className="relative w-full">
      <div className={`flex items-center gap-2.5 h-10 px-3.5 bg-white border rounded-xl transition-all ${open ? 'border-[#0078ba] ring-2 ring-[#0078ba]/15' : 'border-[#D1D5DB]'}`}>
        <Search size={15} className={open ? 'text-[#0078ba]' : 'text-[#9CA3AF]'} />
        <input
          type="text"
          value={value}
          onChange={e => { setValue(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="Search claims, patients, providers..."
          className="flex-1 bg-transparent outline-none text-[0.875rem] text-[#111827] placeholder:text-[#9CA3AF]"
        />
        <div className="flex items-center gap-1 flex-shrink-0">
          {value && <button onClick={() => { setValue(''); setOpen(false); }} className="text-[#9CA3AF] hover:text-[#374151]"><X size={13} /></button>}
          <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 bg-[#F3F4F6] border border-[#E5E7EB] rounded text-[0.5625rem] text-[#6B7280] font-mono">⌘K</kbd>
        </div>
      </div>

      {open && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-[#E5E7EB] rounded-xl shadow-lg z-50 overflow-hidden">
          {(['claim', 'patient', 'provider', 'code'] as const).map(type => {
            const group = suggestions.filter(s => s.type === type);
            if (!group.length) return null;
            const labels = { claim: 'Claims', patient: 'Patients', provider: 'Providers', code: 'CPT Codes' };
            return (
              <div key={type}>
                <p className="px-3 pt-2.5 pb-1 text-[0.625rem] font-semibold text-[#9CA3AF] uppercase tracking-widest">{labels[type]}</p>
                {group.map(s => (
                  <button key={s.label} onMouseDown={() => { setValue(s.label); setOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-[#F9FAFB] transition-colors text-left"
                  >
                    <span className="px-1.5 py-0.5 rounded text-[0.5625rem] font-semibold flex-shrink-0"
                      style={{ backgroundColor: typeColors[type], color: typeTextColors[type] }}>
                      {type.toUpperCase()}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[0.875rem] font-medium text-[#111827]">{s.label}</p>
                      <p className="text-[0.75rem] text-[#9CA3AF] truncate">{s.meta}</p>
                    </div>
                  </button>
                ))}
              </div>
            );
          })}
          <div className="px-3 py-2 border-t border-[#F3F4F6] flex items-center gap-1.5 text-[0.75rem] text-[#9CA3AF]">
            <Search size={12} /> Press Enter to search all results
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Filter Search Bar ──────────────────────────────────────────────────── */
function FilterSearchBar() {
  const [query, setQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>(['Medicare', 'Approved']);

  const removeFilter = (f: string) => setActiveFilters(prev => prev.filter(x => x !== f));

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 bg-white border border-[#D1D5DB] rounded-xl px-3 py-2 focus-within:border-[#0078ba] focus-within:ring-2 focus-within:ring-[#0078ba]/15 transition-all min-h-[44px] flex-wrap">
        {activeFilters.map(f => (
          <span key={f} className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#ddeef9] text-[#00396b] text-[0.75rem] font-medium rounded-full border border-[#bdddf5] flex-shrink-0">
            {f} <button onClick={() => removeFilter(f)} className="hover:opacity-60"><X size={10} /></button>
          </span>
        ))}
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={activeFilters.length === 0 ? 'Search with filters...' : 'Add filter...'}
          className="flex-1 min-w-[120px] bg-transparent outline-none text-[0.875rem] text-[#111827] placeholder:text-[#9CA3AF]"
        />
        <button className="flex items-center gap-1.5 px-2 py-1 bg-[#f3f3f3] border border-[#E5E7EB] rounded-lg text-[0.75rem] text-[#6B7280] hover:border-[#0078ba] hover:text-[#0078ba] transition-all flex-shrink-0">
          <Filter size={12} /> Filters
        </button>
      </div>
    </div>
  );
}

/* ─── Slider ─────────────────────────────────────────────────────────────── */
interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  label?: string;
  disabled?: boolean;
  showValue?: boolean;
  color?: string;
  marks?: { value: number; label: string }[];
  formatValue?: (v: number) => string;
}

function Slider({
  min = 0, max = 100, step = 1, defaultValue = 50, label,
  disabled = false, showValue = true, color = '#0078ba',
  marks, formatValue = v => String(v),
}: SliderProps) {
  const [value, setValue] = useState(defaultValue);
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className={`flex flex-col gap-2 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <label className="text-[0.8125rem] font-medium text-[#374151]">{label}</label>}
          {showValue && (
            <span className="text-[0.8125rem] font-semibold px-2 py-0.5 bg-[#ddeef9] text-[#0078ba] rounded-md font-mono">
              {formatValue(value)}
            </span>
          )}
        </div>
      )}
      <div className="relative flex items-center h-6">
        {/* Track background */}
        <div className="absolute w-full h-1.5 bg-[#E5E7EB] rounded-full" />
        {/* Track fill */}
        <div
          className="absolute h-1.5 rounded-full transition-all"
          style={{ width: `${pct}%`, backgroundColor: disabled ? '#9CA3AF' : color }}
        />
        {/* Marks */}
        {marks && marks.map(m => {
          const mPct = ((m.value - min) / (max - min)) * 100;
          return (
            <div key={m.value} className="absolute flex flex-col items-center" style={{ left: `${mPct}%`, transform: 'translateX(-50%)' }}>
              <div className="w-1 h-1 rounded-full bg-[#D1D5DB] mt-2" />
            </div>
          );
        })}
        {/* Native input (overlaid) */}
        <input
          type="range"
          min={min} max={max} step={step}
          value={value}
          disabled={disabled}
          onChange={e => setValue(Number(e.target.value))}
          className="absolute w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          style={{ zIndex: 2 }}
        />
        {/* Thumb */}
        <div
          className="absolute w-5 h-5 rounded-full border-2 border-white shadow-md transition-all"
          style={{
            left: `calc(${pct}% - 10px)`,
            backgroundColor: disabled ? '#9CA3AF' : color,
            boxShadow: `0 0 0 3px ${disabled ? '#9CA3AF' : color}33`,
          }}
        />
      </div>
      {/* Marks labels */}
      {marks && (
        <div className="relative h-5">
          {marks.map(m => {
            const mPct = ((m.value - min) / (max - min)) * 100;
            return (
              <span key={m.value} className="absolute text-[0.625rem] text-[#9CA3AF]" style={{ left: `${mPct}%`, transform: 'translateX(-50%)' }}>
                {m.label}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── Range Slider ───────────────────────────────────────────────────────── */
function RangeSlider({ label, min = 0, max = 100, defaultMin = 20, defaultMax = 75, formatValue = (v: number) => String(v) }: {
  label?: string; min?: number; max?: number; defaultMin?: number; defaultMax?: number; formatValue?: (v: number) => string;
}) {
  const [range, setRange] = useState([defaultMin, defaultMax]);

  const pctMin = ((range[0] - min) / (max - min)) * 100;
  const pctMax = ((range[1] - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-[0.8125rem] font-medium text-[#374151]">{label}</label>
          <span className="text-[0.8125rem] font-semibold px-2 py-0.5 bg-[#ddeef9] text-[#0078ba] rounded-md font-mono">
            {formatValue(range[0])} – {formatValue(range[1])}
          </span>
        </div>
      )}
      <div className="relative flex items-center h-6">
        <div className="absolute w-full h-1.5 bg-[#E5E7EB] rounded-full" />
        <div className="absolute h-1.5 bg-[#0078ba] rounded-full" style={{ left: `${pctMin}%`, width: `${pctMax - pctMin}%` }} />
        {/* Min thumb */}
        <input type="range" min={min} max={range[1]} value={range[0]}
          onChange={e => setRange([Math.min(Number(e.target.value), range[1] - 1), range[1]])}
          className="absolute w-full h-full opacity-0 cursor-pointer" style={{ zIndex: 3 }}
        />
        <div className="absolute w-5 h-5 rounded-full border-2 border-white bg-[#0078ba] shadow-md" style={{ left: `calc(${pctMin}% - 10px)`, zIndex: 2 }} />
        {/* Max thumb */}
        <input type="range" min={range[0]} max={max} value={range[1]}
          onChange={e => setRange([range[0], Math.max(Number(e.target.value), range[0] + 1)])}
          className="absolute w-full h-full opacity-0 cursor-pointer" style={{ zIndex: 3 }}
        />
        <div className="absolute w-5 h-5 rounded-full border-2 border-white bg-[#0078ba] shadow-md" style={{ left: `calc(${pctMax}% - 10px)`, zIndex: 2 }} />
      </div>
    </div>
  );
}

function InputField({
  label,
  placeholder = 'Enter value...',
  state = 'default',
  type = 'text',
  helper,
  prefix,
  suffix,
  required = false,
}: {
  label: string;
  placeholder?: string;
  state?: 'default' | 'focus' | 'error' | 'success' | 'disabled';
  type?: string;
  helper?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  required?: boolean;
}) {
  const borderColor = {
    default: 'border-[#D1D5DB] focus-within:border-[#0078ba]',
    focus: 'border-[#0078ba] ring-2 ring-[#0078ba] ring-opacity-20',
    error: 'border-[#DC2626] ring-2 ring-[#DC2626] ring-opacity-20',
    success: 'border-[#16A34A] ring-2 ring-[#16A34A] ring-opacity-20',
    disabled: 'border-[#E5E7EB] bg-[#f3f3f3] opacity-60',
  }[state];

  const helperColor = {
    default: 'text-[#6B7280]',
    focus: 'text-[#0078ba]',
    error: 'text-[#DC2626]',
    success: 'text-[#16A34A]',
    disabled: 'text-[#9CA3AF]',
  }[state];

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.8125rem] font-medium text-[#374151]">
        {label}
        {required && <span className="text-[#DC2626] ml-0.5">*</span>}
      </label>
      <div className={`flex items-center gap-2 bg-white border rounded-lg px-3 py-2 transition-all duration-150 ${borderColor}`}>
        {prefix && <span className="text-[#9CA3AF] flex-shrink-0">{prefix}</span>}
        <input
          type={type}
          placeholder={placeholder}
          disabled={state === 'disabled'}
          className="flex-1 bg-transparent outline-none text-[0.875rem] text-[#111827] placeholder:text-[#9CA3AF]"
        />
        {suffix && <span className="text-[#9CA3AF] flex-shrink-0">{suffix}</span>}
        {state === 'error' && <AlertCircle size={15} className="text-[#DC2626] flex-shrink-0" />}
        {state === 'success' && <Check size={15} className="text-[#16A34A] flex-shrink-0" />}
      </div>
      {helper && <p className={`text-[0.75rem] ${helperColor}`}>{helper}</p>}
    </div>
  );
}

function DSCheckbox({ label, checked, indeterminate = false, disabled = false }: {
  label: string;
  checked: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
}) {
  const [isChecked, setIsChecked] = useState(checked);
  return (
    <label className={`flex items-center gap-2.5 cursor-pointer group ${disabled ? 'opacity-40 pointer-events-none' : ''}`}>
      <div
        onClick={() => !disabled && setIsChecked(!isChecked)}
        className={`
          w-4 h-4 rounded flex items-center justify-center border-[1.5px] transition-all duration-150 flex-shrink-0
          ${isChecked || indeterminate
            ? 'bg-[#0078ba] border-[#0078ba]'
            : 'bg-white border-[#D1D5DB] group-hover:border-[#0078ba]'
          }
        `}
      >
        {isChecked && !indeterminate && <Check size={10} className="text-white stroke-[3]" />}
        {indeterminate && <div className="w-2 h-0.5 bg-white rounded-full" />}
      </div>
      <span className="text-[0.875rem] text-[#374151]">{label}</span>
    </label>
  );
}

function DSToggle({ label, on = false, disabled = false, size = 'md' }: {
  label?: string;
  on?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}) {
  const [isOn, setIsOn] = useState(on);

  const trackSizes = { sm: 'w-7 h-4', md: 'w-9 h-5', lg: 'w-12 h-6' };
  const knobSizes = { sm: 'w-3 h-3', md: 'w-4 h-4', lg: 'w-5 h-5' };
  const translateX = { sm: 'translate-x-3', md: 'translate-x-4', lg: 'translate-x-6' };

  return (
    <label className={`flex items-center gap-2.5 cursor-pointer ${disabled ? 'opacity-40 pointer-events-none' : ''}`}>
      <button
        onClick={() => !disabled && setIsOn(!isOn)}
        className={`
          ${trackSizes[size]} rounded-full relative transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#0078ba] focus:ring-offset-1
          ${isOn ? 'bg-[#0078ba]' : 'bg-[#D1D5DB]'}
        `}
      >
        <div className={`
          ${knobSizes[size]} bg-white rounded-full shadow-sm absolute top-0.5 left-0.5 transition-transform duration-200
          ${isOn ? translateX[size] : 'translate-x-0'}
        `} />
      </button>
      {label && <span className="text-[0.875rem] text-[#374151]">{label}</span>}
    </label>
  );
}

function DSSelect({ label, options, placeholder = 'Select option...' }: {
  label: string;
  options: string[];
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.8125rem] font-medium text-[#374151]">{label}</label>
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between bg-white border border-[#D1D5DB] rounded-lg px-3 py-2 text-[0.875rem] hover:border-[#9CA3AF] focus:border-[#0078ba] focus:ring-2 focus:ring-[#0078ba] focus:ring-opacity-20 transition-all outline-none"
        >
          <span className={selected ? 'text-[#111827]' : 'text-[#9CA3AF]'}>
            {selected || placeholder}
          </span>
          <ChevronDown size={15} className={`text-[#9CA3AF] transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E5E7EB] rounded-xl shadow-lg z-50 overflow-hidden">
            {options.map(opt => (
              <button
                key={opt}
                onClick={() => { setSelected(opt); setOpen(false); }}
                className={`w-full text-left px-3 py-2.5 text-[0.875rem] hover:bg-[#F3F4F6] flex items-center justify-between transition-colors
                  ${selected === opt ? 'text-[#0078ba] bg-[#ddeef9]' : 'text-[#374151]'}`}
              >
                {opt}
                {selected === opt && <Check size={14} className="text-[#0078ba]" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function DSRadio({ options, name, defaultValue }: { options: {label: string; value: string; desc?: string}[]; name: string; defaultValue?: string }) {
  const [selected, setSelected] = useState(defaultValue || '');
  return (
    <div className="space-y-3">
      {options.map(opt => (
        <label key={opt.value} className="flex items-start gap-3 cursor-pointer group">
          <div
            onClick={() => setSelected(opt.value)}
            className={`
              mt-0.5 w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center flex-shrink-0 transition-all
              ${selected === opt.value ? 'border-[#0078ba] bg-white' : 'border-[#D1D5DB] group-hover:border-[#0078ba]'}
            `}
          >
            {selected === opt.value && <div className="w-2 h-2 rounded-full bg-[#0078ba]" />}
          </div>
          <div>
            <p className="text-[0.875rem] font-medium text-[#374151]">{opt.label}</p>
            {opt.desc && <p className="text-[0.75rem] text-[#6B7280]">{opt.desc}</p>}
          </div>
        </label>
      ))}
    </div>
  );
}

export function FormsSection() {
  const [showPw, setShowPw] = useState(false);

  return (
    <SectionWrapper
      id="forms"
      title="Form Elements"
      subtitle="Form elements enable data collection and user input. TrueSight forms prioritize clarity, accessibility, and inline validation for complex healthcare data entry."
    >
      {/* Search Bar */}
      <SubSection title="Search Bar" description="Search components ranging from simple inline inputs to advanced autocomplete with filters.">
        <div className="grid grid-cols-1 gap-5">
          {/* Basic variants */}
          <div>
            <p className="text-[0.75rem] font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Style Variants</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <SearchBar variant="default" placeholder="Default search..." />
                <span className="text-[0.625rem] text-[#9CA3AF]">Default — white bg, rounded-lg</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <SearchBar variant="rounded" placeholder="Rounded search..." />
                <span className="text-[0.625rem] text-[#9CA3AF]">Pill — rounded-full</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <SearchBar variant="bordered" placeholder="Bordered search..." />
                <span className="text-[0.625rem] text-[#9CA3AF]">Bordered — thick border, gray bg</span>
              </div>
              <div className="flex flex-col gap-1.5 p-3 bg-[#00396b] rounded-xl">
                <SearchBar variant="dark" placeholder="Search on dark bg..." />
                <span className="text-[0.625rem] text-[#5bb0e1]">Dark — for sidebar/nav use</span>
              </div>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <p className="text-[0.75rem] font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Sizes</p>
            <div className="flex flex-col gap-3 max-w-md">
              <div className="flex flex-col gap-1.5">
                <SearchBar size="sm" placeholder="Small (32px)..." />
                <span className="text-[0.625rem] text-[#9CA3AF]">SM — 32px, compact toolbars</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <SearchBar size="md" placeholder="Medium (40px)..." />
                <span className="text-[0.625rem] text-[#9CA3AF]">MD — 40px, default</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <SearchBar size="lg" placeholder="Large (48px)..." />
                <span className="text-[0.625rem] text-[#9CA3AF]">LG — 48px, hero/global search</span>
              </div>
            </div>
          </div>

          {/* Autocomplete */}
          <div>
            <p className="text-[0.75rem] font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Autocomplete / Global Search</p>
            <div className="max-w-lg">
              <AutocompleteSearch />
              <p className="text-[0.75rem] text-[#9CA3AF] mt-2">Try typing "CLM", "James", "Dr.", or "CPT"</p>
            </div>
          </div>

          {/* Filter search */}
          <div>
            <p className="text-[0.75rem] font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Filter Chip Search</p>
            <div className="max-w-lg">
              <FilterSearchBar />
              <p className="text-[0.75rem] text-[#9CA3AF] mt-2">Click × to remove active filter chips</p>
            </div>
          </div>
        </div>
        <UsageNote>
          Always add keyboard shortcut indicators (e.g. ⌘K) for global search triggers. Include a clear (×) button when input has value.
          Autocomplete dropdowns must close on Escape and outside click. Use the dark variant for search inside navy sidebars.
        </UsageNote>
      </SubSection>

      {/* Slider */}
      <SubSection title="Slider" description="Range inputs for numeric values, filters, and adjustments in data-heavy workflows.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl border border-[#E5E7EB] bg-white space-y-6">
            <Slider label="Denial Rate Threshold" defaultValue={35} formatValue={v => `${v}%`} />
            <Slider label="Claim Amount" defaultValue={2500} min={0} max={10000} step={100}
              formatValue={v => `$${v.toLocaleString()}`} color="#5bb0e1" />
            <Slider label="Processing Days" defaultValue={7} min={1} max={30} step={1}
              formatValue={v => `${v} days`} color="#16A34A"
              marks={[
                { value: 1, label: '1d' }, { value: 10, label: '10d' },
                { value: 20, label: '20d' }, { value: 30, label: '30d' },
              ]}
            />
            <Slider label="Disabled Slider" defaultValue={60} disabled />
          </div>

          <div className="p-5 rounded-xl border border-[#E5E7EB] bg-white space-y-6">
            <RangeSlider label="Billed Amount Range" min={0} max={50000} defaultMin={5000} defaultMax={25000}
              formatValue={v => `$${(v/1000).toFixed(0)}k`}
            />
            <RangeSlider label="Date Range (Days Ago)" min={0} max={365} defaultMin={30} defaultMax={180}
              formatValue={v => `${v}d`}
            />

            {/* Discrete steps */}
            <div>
              <Slider
                label="Confidence Level"
                defaultValue={3} min={1} max={5} step={1}
                formatValue={v => ['', 'Very Low', 'Low', 'Medium', 'High', 'Very High'][v]}
                marks={[
                  { value: 1, label: 'VL' }, { value: 2, label: 'L' },
                  { value: 3, label: 'M' }, { value: 4, label: 'H' }, { value: 5, label: 'VH' },
                ]}
                color="#D97706"
              />
            </div>
          </div>
        </div>
        <UsageNote>
          Use sliders for continuous ranges where exact input is not critical. For precise values, combine with a number input.
          Always show the current value. Range sliders must ensure min thumb cannot exceed max thumb.
          Minimum thumb size is 20×20px for touch targets (we use 20×20px).
        </UsageNote>
      </SubSection>

      {/* Text Inputs */}
      <SubSection title="Text Inputs" description="All states for standard text input fields.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Default State"
            placeholder="Enter claim ID..."
            state="default"
            helper="Helper text provides guidance"
          />
          <InputField
            label="Focus State"
            placeholder="Enter claim ID..."
            state="focus"
            helper="Field is active and ready for input"
          />
          <InputField
            label="Error State"
            placeholder="Enter claim ID..."
            state="error"
            helper="Claim ID format is invalid (e.g. CLM-00123)"
          />
          <InputField
            label="Success State"
            placeholder="Enter claim ID..."
            state="success"
            helper="Claim found and verified"
          />
          <InputField
            label="Disabled State"
            placeholder="Not editable"
            state="disabled"
            helper="This field cannot be modified"
          />
          <InputField
            label="Required Field"
            placeholder="Patient name..."
            required
            helper="This field is required"
          />
        </div>
      </SubSection>

      {/* Input Variations */}
      <SubSection title="Input Variations" description="Prefix icons, suffix icons, search, password, and textarea.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Search Input"
            placeholder="Search claims, patients..."
            prefix={<Search size={15} />}
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.8125rem] font-medium text-[#374151]">Password</label>
            <div className="flex items-center gap-2 bg-white border border-[#D1D5DB] rounded-lg px-3 py-2 focus-within:border-[#0078ba] focus-within:ring-2 focus-within:ring-[#0078ba] focus-within:ring-opacity-20 transition-all">
              <input
                type={showPw ? 'text' : 'password'}
                placeholder="Enter password..."
                className="flex-1 bg-transparent outline-none text-[0.875rem] text-[#111827] placeholder:text-[#9CA3AF]"
              />
              <button onClick={() => setShowPw(!showPw)} className="text-[#9CA3AF] hover:text-[#6B7280]">
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          <InputField
            label="Amount Field"
            placeholder="0.00"
            prefix={<span className="text-[0.875rem] font-medium text-[#6B7280]">$</span>}
            suffix={<span className="text-[0.75rem] font-mono text-[#9CA3AF]">USD</span>}
          />
          <InputField
            label="Date of Service"
            type="date"
            suffix={<Calendar size={15} />}
          />
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-[0.8125rem] font-medium text-[#374151]">Textarea</label>
            <textarea
              rows={3}
              placeholder="Enter clinical notes or denial reason..."
              className="w-full bg-white border border-[#D1D5DB] rounded-lg px-3 py-2 text-[0.875rem] text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:border-[#0078ba] focus:ring-2 focus:ring-[#0078ba] focus:ring-opacity-20 transition-all resize-y"
            />
            <p className="text-[0.75rem] text-[#6B7280]">Maximum 500 characters</p>
          </div>
        </div>
      </SubSection>

      {/* Select / Dropdown */}
      <SubSection title="Select & Dropdown" description="Used for choosing from predefined option lists.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <DSSelect
            label="Payer Group"
            options={['Medicare', 'Medicaid', 'Blue Cross Blue Shield', 'Aetna', 'Cigna', 'United Healthcare']}
            placeholder="Select payer..."
          />
          <DSSelect
            label="Claim Status"
            options={['Pending', 'Approved', 'Denied', 'Appealed', 'Partially Paid']}
            placeholder="Filter by status..."
          />
          <DSSelect
            label="Provider"
            options={['Dr. James Wilson', 'Dr. Sarah Chen', 'Dr. Michael Park', 'Dr. Lisa Torres']}
            placeholder="Select provider..."
          />
        </div>
        <UsageNote>
          Use selects when there are 5+ options. For fewer than 5, prefer radio buttons. Always include a blank "placeholder" option that is not a valid selection.
        </UsageNote>
      </SubSection>

      {/* Checkboxes */}
      <SubSection title="Checkboxes" description="Used for multiple selection and settings toggles.">
        <ShowcaseBox label="Checkbox States">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <DSCheckbox label="Unchecked" checked={false} />
            <DSCheckbox label="Checked" checked={true} />
            <DSCheckbox label="Indeterminate" checked={false} indeterminate />
            <DSCheckbox label="Disabled" checked={false} disabled />
            <DSCheckbox label="Checked + Disabled" checked={true} disabled />
          </div>
        </ShowcaseBox>

        <div className="mt-4 p-4 rounded-xl border border-[#E5E7EB] bg-white">
          <p className="text-[0.8125rem] font-semibold text-[#374151] mb-3">Checkbox Group Example</p>
          <div className="space-y-2.5">
            <p className="text-[0.75rem] text-[#6B7280] uppercase tracking-wider font-semibold">Denial Reason Filter</p>
            <DSCheckbox label="Medical Necessity" checked={true} />
            <DSCheckbox label="Authorization Required" checked={true} />
            <DSCheckbox label="Patient Eligibility" checked={false} />
            <DSCheckbox label="Coding Error" checked={false} />
            <DSCheckbox label="Timely Filing" checked={false} />
          </div>
        </div>
      </SubSection>

      {/* Toggles */}
      <SubSection title="Toggles / Switches" description="Binary on/off settings. Prefer toggles for instant-effect settings.">
        <ShowcaseBox label="Toggle Variants">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              <DSToggle label="Email Notifications" on={true} size="sm" />
              <DSToggle label="Auto-submit Claims" on={false} size="sm" />
              <DSToggle label="Dark Mode (disabled)" on={false} disabled size="sm" />
            </div>
            <div className="flex flex-wrap items-center gap-8 pt-2 border-t border-[#F3F4F6]">
              <div className="flex flex-col gap-1">
                <span className="text-[0.6875rem] text-[#9CA3AF]">Small</span>
                <DSToggle on={true} size="sm" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[0.6875rem] text-[#9CA3AF]">Medium</span>
                <DSToggle on={true} size="md" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[0.6875rem] text-[#9CA3AF]">Large</span>
                <DSToggle on={true} size="lg" />
              </div>
            </div>
          </div>
        </ShowcaseBox>
      </SubSection>

      {/* Radio Buttons */}
      <SubSection title="Radio Buttons" description="Use for mutually exclusive options when all choices should be visible.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl border border-[#E5E7EB] bg-white">
            <p className="text-[0.8125rem] font-semibold text-[#374151] mb-3">Claim Submission Type</p>
            <DSRadio
              name="claim-type"
              defaultValue="electronic"
              options={[
                { label: 'Electronic (EDI 837)', value: 'electronic', desc: 'Fastest processing, recommended' },
                { label: 'Paper Form (CMS-1500)', value: 'paper', desc: 'Manual review, 10–14 days' },
                { label: 'Portal Submission', value: 'portal', desc: 'Payer-specific web portal' },
              ]}
            />
          </div>
          <div className="p-4 rounded-xl border border-[#E5E7EB] bg-white">
            <p className="text-[0.8125rem] font-semibold text-[#374151] mb-3">Report Frequency</p>
            <DSRadio
              name="frequency"
              defaultValue="weekly"
              options={[
                { label: 'Daily', value: 'daily' },
                { label: 'Weekly', value: 'weekly' },
                { label: 'Monthly', value: 'monthly' },
                { label: 'Quarterly', value: 'quarterly' },
              ]}
            />
          </div>
        </div>
      </SubSection>

      {/* Form Example */}
      <SubSection title="Complete Form Example" description="A full claim submission form showing all components in context.">
        <div className="p-6 rounded-xl border border-[#E5E7EB] bg-white max-w-2xl">
          <h4 className="text-[1.0625rem] font-semibold text-[#0D2B5E] mb-1">Submit New Claim</h4>
          <p className="text-[0.8125rem] text-[#6B7280] mb-5">Fields marked with * are required</p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <InputField label="Patient Name" placeholder="First Last" required />
            <InputField label="Date of Birth" type="date" />
            <InputField label="Claim ID" placeholder="CLM-000000" helper="Auto-generated if left blank" />
            <InputField label="Date of Service" type="date" required />
          </div>

          <div className="grid grid-cols-1 gap-4 mb-4">
            <DSSelect label="Payer" options={['Medicare', 'Medicaid', 'Blue Cross Blue Shield', 'Aetna']} placeholder="Select payer *" />
          </div>

          <div className="flex flex-col gap-1.5 mb-4">
            <label className="text-[0.8125rem] font-medium text-[#374151]">Clinical Notes</label>
            <textarea
              rows={2}
              placeholder="Additional context for this claim..."
              className="w-full bg-white border border-[#D1D5DB] rounded-lg px-3 py-2 text-[0.875rem] text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:border-[#0078ba] focus:ring-2 focus:ring-[#0078ba] focus:ring-opacity-20 transition-all resize-none"
            />
          </div>

          <div className="space-y-2.5 mb-5">
            <DSCheckbox label="I confirm this claim is accurate and complete" checked={false} />
            <DSCheckbox label="Send confirmation email to billing coordinator" checked={true} />
          </div>

          <div className="flex items-center gap-3">
            <button className="px-5 py-2 bg-[#0078ba] text-white text-[0.875rem] font-medium rounded-lg hover:bg-[#004d8f] transition-colors">
              Submit Claim
            </button>
            <button className="px-5 py-2 bg-[#ddeef9] text-[#00396b] text-[0.875rem] font-medium rounded-lg hover:bg-[#bdddf5] transition-colors">
              Save Draft
            </button>
            <button className="px-4 py-2 text-[#6B7280] text-[0.875rem] font-medium hover:text-[#374151] transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </SubSection>

      <UsageNote>
        Always group related form fields and label them clearly. Use inline validation (never wait until submit). For long forms, use a stepper pattern. Ensure all inputs have associated label elements for screen readers. Touch targets must be at minimum 44px tall.
      </UsageNote>
    </SectionWrapper>
  );
}