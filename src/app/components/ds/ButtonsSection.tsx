import React, { useState } from 'react';
import { SectionWrapper, SubSection, UsageNote, ShowcaseBox, FigmaName, VariantCard } from './SectionWrapper';
import { Plus, Download, Trash2, Send, ArrowRight, Loader2, ChevronDown } from 'lucide-react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  state?: 'default' | 'hover' | 'focus' | 'disabled' | 'loading';
  icon?: 'left' | 'right' | 'only';
  children?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<string, string> = {
  primary:   'bg-[#0078ba] text-white border-transparent hover:bg-[#004d8f] focus:ring-2 focus:ring-[#0078ba] focus:ring-offset-2 active:bg-[#00396b]',
  secondary: 'bg-[#ddeef9] text-[#00396b] border-[#bdddf5] hover:bg-[#bdddf5] focus:ring-2 focus:ring-[#0078ba] focus:ring-offset-2',
  ghost:     'bg-transparent text-[#0078ba] border-transparent hover:bg-[#ddeef9] focus:ring-2 focus:ring-[#0078ba] focus:ring-offset-2',
  danger:    'bg-[#DC2626] text-white border-transparent hover:bg-[#B91C1C] focus:ring-2 focus:ring-[#DC2626] focus:ring-offset-2 active:bg-[#991B1B]',
  success:   'bg-[#16A34A] text-white border-transparent hover:bg-[#15803D] focus:ring-2 focus:ring-[#16A34A] focus:ring-offset-2',
  outline:   'bg-white text-[#374151] border-[#D1D5DB] hover:bg-[#f3f3f3] hover:border-[#9CA3AF] focus:ring-2 focus:ring-[#0078ba] focus:ring-offset-2',
};

const sizeStyles: Record<string, string> = {
  xs: 'px-2.5 py-1 text-[0.6875rem] rounded-md gap-1',
  sm: 'px-3 py-1.5 text-[0.8125rem] rounded-md gap-1.5',
  md: 'px-4 py-2 text-[0.875rem] rounded-lg gap-2',
  lg: 'px-5 py-2.5 text-[0.9375rem] rounded-lg gap-2',
  xl: 'px-6 py-3 text-[1rem] rounded-xl gap-2',
};

export function DSButton({
  variant = 'primary',
  size = 'md',
  state = 'default',
  icon,
  children = 'Button',
  fullWidth = false,
}: ButtonProps) {
  const disabled = state === 'disabled';
  const loading = state === 'loading';

  return (
    <button
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center font-medium border transition-all duration-150 cursor-pointer select-none
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''}
        ${loading ? 'opacity-80 cursor-not-allowed' : ''}
        ${fullWidth ? 'w-full' : ''}
      `}
    >
      {loading && <Loader2 size={size === 'xs' ? 10 : size === 'sm' ? 12 : 14} className="animate-spin" />}
      {!loading && icon === 'left' && <Plus size={size === 'xs' ? 10 : size === 'sm' ? 12 : 14} />}
      {icon !== 'only' && <span>{children}</span>}
      {icon === 'only' && !loading && <Plus size={size === 'xs' ? 12 : size === 'sm' ? 14 : 16} />}
      {!loading && icon === 'right' && <ArrowRight size={size === 'xs' ? 10 : size === 'sm' ? 12 : 14} />}
    </button>
  );
}

export function ButtonsSection() {
  const variants: Array<{ label: string; figmaName: string; v: ButtonProps['variant']; desc: string }> = [
    { label: 'Primary', figmaName: 'Button / Primary / Default', v: 'primary', desc: 'High-emphasis actions. Use only once per view for the main CTA.' },
    { label: 'Secondary', figmaName: 'Button / Secondary / Default', v: 'secondary', desc: 'Medium-emphasis. Complement to primary, common for "Cancel" pairs.' },
    { label: 'Ghost', figmaName: 'Button / Ghost / Default', v: 'ghost', desc: 'Low-emphasis. Inline actions, toolbar buttons, navigation.' },
    { label: 'Outline', figmaName: 'Button / Outline / Default', v: 'outline', desc: 'Neutral actions. Alternative secondary with visible border.' },
    { label: 'Danger', figmaName: 'Button / Danger / Default', v: 'danger', desc: 'Destructive actions: delete, revoke. Always confirm before executing.' },
    { label: 'Success', figmaName: 'Button / Success / Default', v: 'success', desc: 'Confirm or positive actions. Submit, approve, activate.' },
  ];

  const sizes: Array<{ label: string; s: ButtonProps['size'] }> = [
    { label: 'XS — 28px', s: 'xs' },
    { label: 'SM — 32px', s: 'sm' },
    { label: 'MD — 36px (Default)', s: 'md' },
    { label: 'LG — 40px', s: 'lg' },
    { label: 'XL — 48px', s: 'xl' },
  ];

  return (
    <SectionWrapper
      id="buttons"
      title="Buttons"
      subtitle="Buttons communicate actions that users can take. They are typically placed throughout the UI in places like dialogs, forms, cards, and toolbars."
    >
      {/* Variants with Figma names */}
      <SubSection title="Variants" description="Six button variants to communicate action hierarchy. Each card shows the Figma component name for the library.">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {variants.map(({ label, figmaName, v, desc }) => (
            <div key={label} className="p-4 rounded-xl border border-[#E5E7EB] bg-white">
              <FigmaName name={figmaName} />
              <p className="text-[0.6875rem] font-semibold text-[#6B7280] uppercase tracking-wider mb-3 mt-1">{label}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <DSButton variant={v} size="md">Label</DSButton>
                <DSButton variant={v} size="md" icon="left">Add New</DSButton>
                <DSButton variant={v} size="md" state="disabled">Disabled</DSButton>
              </div>
              <p className="text-[0.6875rem] text-[#9CA3AF] leading-snug">{desc}</p>
            </div>
          ))}
        </div>
      </SubSection>

      {/* States with Figma names */}
      <SubSection title="Component States" description="All interactive states for the primary button, each mapped to a Figma variant.">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'Default', figma: 'Button / Primary / Default', state: 'default' as const },
            { label: 'Hover', figma: 'Button / Primary / Hover', state: 'default' as const },
            { label: 'Focus', figma: 'Button / Primary / Focus', state: 'focus' as const },
            { label: 'Active', figma: 'Button / Primary / Active', state: 'default' as const },
            { label: 'Disabled', figma: 'Button / Primary / Disabled', state: 'disabled' as const },
            { label: 'Loading', figma: 'Button / Primary / Loading', state: 'loading' as const },
          ].map(({ label, figma, state }) => (
            <div key={label} className="p-3 rounded-xl border border-[#E5E7EB] bg-white flex flex-col items-center gap-2">
              <FigmaName name={figma} />
              <DSButton variant="primary" size="md" state={state}>
                {label === 'Loading' ? 'Loading' : 'Label'}
              </DSButton>
              <p className="text-[0.625rem] font-semibold text-[#6B7280] uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>
      </SubSection>

      {/* Sizes */}
      <SubSection title="Sizes" description="Button sizes scaled to context: XS for compact toolbars, XL for prominent CTAs.">
        <ShowcaseBox label="Button / Primary / {Size}">
          <div className="flex flex-wrap items-center gap-3">
            {sizes.map(({ label, s }) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <DSButton variant="primary" size={s}>Action</DSButton>
                <span className="text-[0.625rem] text-[#9CA3AF] text-center">{label}</span>
              </div>
            ))}
          </div>
        </ShowcaseBox>
      </SubSection>

      {/* With Icons */}
      <SubSection title="Buttons with Icons">
        <ShowcaseBox label="Button / Primary + Icon / {Position}">
          <div className="flex flex-wrap gap-3 items-center">
            <DSButton variant="primary" icon="left">Add Claim</DSButton>
            <DSButton variant="primary" icon="right">Next Step</DSButton>
            <DSButton variant="outline" icon="only" />
            <DSButton variant="secondary" icon="left">Export</DSButton>
            <DSButton variant="danger" size="sm">
              <span className="flex items-center gap-1.5"><Trash2 size={13} />Delete</span>
            </DSButton>
            <DSButton variant="ghost" size="sm">
              <span className="flex items-center gap-1.5"><Download size={13} />Download</span>
            </DSButton>
          </div>
        </ShowcaseBox>
      </SubSection>

      {/* Icon Buttons */}
      <SubSection title="Icon-Only Buttons" description="Use for compact toolbars, table row actions, and toolbar items. Figma name: Button / Icon / {Variant}">
        <ShowcaseBox label="Button / Icon / {Variant}">
          <div className="flex flex-wrap gap-3 items-center">
            {(['primary', 'secondary', 'ghost', 'outline', 'danger'] as const).map(v => (
              <button
                key={v}
                className={`
                  w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-150
                  ${v === 'primary'   ? 'bg-[#0078ba] text-white border-transparent hover:bg-[#004d8f]' : ''}
                  ${v === 'secondary' ? 'bg-[#ddeef9] text-[#00396b] border-[#bdddf5] hover:bg-[#bdddf5]' : ''}
                  ${v === 'ghost'     ? 'bg-transparent text-[#0078ba] border-transparent hover:bg-[#ddeef9]' : ''}
                  ${v === 'outline'   ? 'bg-white text-[#374151] border-[#D1D5DB] hover:bg-[#f3f3f3]' : ''}
                  ${v === 'danger'    ? 'bg-[#FEE2E2] text-[#DC2626] border-[#FCA5A5] hover:bg-[#FCA5A5]' : ''}
                `}
                title={v}
              >
                {v === 'danger' ? <Trash2 size={15} /> : <Plus size={15} />}
              </button>
            ))}
          </div>
        </ShowcaseBox>
      </SubSection>

      {/* Button Groups */}
      <SubSection title="Button Groups" description="Used for segmented controls, multi-action toolbars. Figma name: Button / Group / Segmented">
        <ShowcaseBox label="Button / Group / {Type}">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Segmented */}
            <div className="inline-flex rounded-lg border border-[#D1D5DB] overflow-hidden">
              {['Day', 'Week', 'Month', 'Year'].map((l, i) => (
                <button
                  key={l}
                  className={`px-3 py-1.5 text-[0.8125rem] font-medium border-r border-[#D1D5DB] last:border-0 transition-colors
                    ${i === 1 ? 'bg-[#0078ba] text-white' : 'bg-white text-[#374151] hover:bg-[#f3f3f3]'}`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Split Button */}
            <div className="inline-flex">
              <button className="px-4 py-2 bg-[#0078ba] text-white text-[0.875rem] font-medium rounded-l-lg border border-transparent hover:bg-[#004d8f] transition-colors flex items-center gap-1.5">
                <Send size={14} />Submit Claim
              </button>
              <button className="px-2 py-2 bg-[#0078ba] text-white rounded-r-lg border-l border-[#004d8f] hover:bg-[#004d8f] transition-colors">
                <ChevronDown size={14} />
              </button>
            </div>
          </div>
        </ShowcaseBox>
      </SubSection>

      <UsageNote>
        Use at most <strong>one primary button</strong> per view. Group related actions using button groups or split buttons. Always ensure minimum 44×44px touch target for mobile. Never use color alone to distinguish button state.
        In Figma, use the naming convention <strong>Button / {'{Variant}'} / {'{State}'}</strong> for all button components.
      </UsageNote>
    </SectionWrapper>
  );
}
