import React from 'react';
import { SectionWrapper, SubSection, UsageNote } from './SectionWrapper';
import { TrendingUp, TrendingDown, MoreHorizontal, ArrowRight, Activity, AlertTriangle, CheckCircle, Clock, DollarSign, FileText, Users } from 'lucide-react';

function StatCard({ label, value, delta, trend, icon: Icon, color = '#0078ba', bgColor = '#ddeef9' }: {
  label: string;
  value: string;
  delta: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ElementType;
  color?: string;
  bgColor?: string;
}) {
  const isPositive = trend === 'up';
  const isNeutral = trend === 'neutral';

  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-col">
          <span className="text-[0.75rem] font-medium text-[#6B7280] uppercase tracking-wider">{label}</span>
        </div>
        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: bgColor }}>
          <Icon size={16} style={{ color }} />
        </div>
      </div>
      <p className="text-[2rem] font-bold text-[#00396b] tracking-tight mb-2" style={{fontVariantNumeric: 'tabular-nums'}}>
        {value}
      </p>
      <div className="flex items-center gap-1.5">
        {!isNeutral && (
          isPositive
            ? <TrendingUp size={13} className="text-[#16A34A]" />
            : <TrendingDown size={13} className="text-[#DC2626]" />
        )}
        <span className={`text-[0.75rem] font-semibold ${isPositive ? 'text-[#16A34A]' : isNeutral ? 'text-[#6B7280]' : 'text-[#DC2626]'}`}>
          {delta}
        </span>
        <span className="text-[0.75rem] text-[#9CA3AF]">vs last month</span>
      </div>
    </div>
  );
}

function ContentCard({ variant = 'default' }: { variant?: 'default' | 'bordered' | 'elevated' | 'flat' | 'colored' }) {
  const cardStyles: Record<string, string> = {
    default: 'bg-white border border-[#E5E7EB] shadow-sm',
    bordered: 'bg-white border-2 border-[#0078ba]',
    elevated: 'bg-white shadow-lg border-0',
    flat: 'bg-[#f3f3f3] border border-[#E5E7EB]',
    colored: 'bg-[#00396b] text-white border-0',
  };

  const textColor = variant === 'colored' ? 'text-[#99cceb]' : 'text-[#6B7280]';
  const titleColor = variant === 'colored' ? 'text-white' : 'text-[#00396b]';
  const dividerColor = variant === 'colored' ? 'border-[#004d8f]' : 'border-[#F3F4F6]';
  const badgeBg = variant === 'colored' ? 'bg-[#0078ba]' : 'bg-[#ddeef9]';
  const badgeText = 'text-white';

  return (
    <div className={`rounded-xl overflow-hidden ${cardStyles[variant]}`}>
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className={`text-[0.6875rem] font-semibold uppercase tracking-wider ${textColor}`}>
              {variant.charAt(0).toUpperCase() + variant.slice(1)} Card
            </span>
            <h4 className={`text-[1rem] font-semibold mt-0.5 ${titleColor}`}>
              Denial Rate Analysis
            </h4>
          </div>
          <button className={`p-1 rounded hover:bg-black/5 ${textColor}`}>
            <MoreHorizontal size={15} />
          </button>
        </div>
        <p className={`text-[0.8125rem] mb-4 leading-relaxed ${textColor}`}>
          Blue Cross denials increased 12% this quarter, primarily driven by prior authorization issues in CPT 99213–99215.
        </p>
      </div>
      <div className={`px-4 py-3 border-t ${dividerColor} flex items-center justify-between`}>
        <span className={`text-[0.75rem] ${textColor}`}>Updated 2 hours ago</span>
        <button className={`flex items-center gap-1 text-[0.75rem] font-medium ${variant === 'colored' ? 'text-[#99cceb]' : 'text-[#0078ba]'} hover:underline`}>
          View report <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
}

function StatusCard({ status }: { status: 'approved' | 'denied' | 'pending' | 'appealed' }) {
  const config = {
    approved: { color: '#16A34A', bg: '#DCFCE7', border: '#BBF7D0', icon: CheckCircle, label: 'Approved', amount: '$1,247.50' },
    denied: { color: '#DC2626', bg: '#FEE2E2', border: '#FCA5A5', icon: AlertTriangle, label: 'Denied', amount: '$892.00' },
    pending: { color: '#D97706', bg: '#FEF3C7', border: '#FDE68A', icon: Clock, label: 'Pending Review', amount: '$2,100.00' },
    appealed: { color: '#2563EB', bg: '#DBEAFE', border: '#BFDBFE', icon: Activity, label: 'Under Appeal', amount: '$456.25' },
  }[status];

  const Icon = config.icon;

  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: config.bg }}>
          <Icon size={15} style={{ color: config.color }} />
        </div>
        <div>
          <p className="text-[0.8125rem] font-semibold text-[#374151]">CLM-2025-{Math.floor(Math.random() * 9000 + 1000)}</p>
          <p className="text-[0.6875rem] text-[#9CA3AF]">Medicare · CPT 99213</p>
        </div>
        <div className="ml-auto">
          <span
            className="px-2 py-0.5 text-[0.625rem] font-bold rounded-full"
            style={{ backgroundColor: config.bg, color: config.color, border: `1px solid ${config.border}` }}
          >
            {config.label}
          </span>
        </div>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-[0.75rem] text-[#6B7280]">Billed Amount</p>
        <p className="text-[1.125rem] font-bold" style={{ color: config.color }}>{config.amount}</p>
      </div>
    </div>
  );
}

export function CardsSection() {
  return (
    <SectionWrapper
      id="cards"
      title="Cards"
      subtitle="Cards are the primary content container in TrueSight. They group related information and actions into a scannable, contained surface."
    >
      {/* KPI / Stat Cards */}
      <SubSection
        title="KPI / Stat Cards"
        description="Used in dashboards to display key performance metrics at a glance."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Revenue"
            value="$2.4M"
            delta="+8.2%"
            trend="up"
            icon={DollarSign}
            color="#16A34A"
            bgColor="#DCFCE7"
          />
          <StatCard
            label="Claims Submitted"
            value="1,247"
            delta="+143"
            trend="up"
            icon={FileText}
            color="#0078ba"
            bgColor="#ddeef9"
          />
          <StatCard
            label="Denial Rate"
            value="7.3%"
            delta="+1.2%"
            trend="down"
            icon={AlertTriangle}
            color="#DC2626"
            bgColor="#FEE2E2"
          />
          <StatCard
            label="Active Providers"
            value="84"
            delta="No change"
            trend="neutral"
            icon={Users}
            color="#D97706"
            bgColor="#FEF3C7"
          />
        </div>
      </SubSection>

      {/* Card Variants */}
      <SubSection
        title="Card Variants"
        description="Five visual styles for different contexts and hierarchy levels."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <ContentCard variant="default" />
          <ContentCard variant="bordered" />
          <ContentCard variant="elevated" />
          <ContentCard variant="flat" />
          <ContentCard variant="colored" />
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-[0.75rem]">
          {[
            { name: 'Default', use: 'Standard content containers, most common pattern' },
            { name: 'Bordered', use: 'Selected/active state, highlighted items' },
            { name: 'Elevated', use: 'Floating panels, emphasized features' },
            { name: 'Flat', use: 'Background sections, nested content areas' },
          ].map(v => (
            <div key={v.name} className="p-3 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
              <p className="font-semibold text-[#374151] mb-1">{v.name}</p>
              <p className="text-[#9CA3AF]">{v.use}</p>
            </div>
          ))}
        </div>
      </SubSection>

      {/* Status Cards */}
      <SubSection
        title="Status Cards"
        description="Claim status cards for quick scanning of claim states in list views."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <StatusCard status="approved" />
          <StatusCard status="denied" />
          <StatusCard status="pending" />
          <StatusCard status="appealed" />
        </div>
      </SubSection>

      {/* Feature Card */}
      <SubSection title="Feature / Marketing Card" description="Used on landing/about pages to communicate product features.">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Activity, title: 'Real-Time Insights', desc: 'Monitor claim status and payer behavior across all active submissions in real time.', color: '#0078ba', bg: '#ddeef9' },
            { icon: TrendingUp, title: 'Revenue Optimization', desc: 'AI-driven recommendations to maximize reimbursement rates and reduce underpayments.', color: '#16A34A', bg: '#DCFCE7' },
            { icon: AlertTriangle, title: 'Denial Prevention', desc: 'Predictive alerts flag high-risk claims before submission to prevent costly denials.', color: '#D97706', bg: '#FEF3C7' },
          ].map(({ icon: Icon, title, desc, color, bg }) => (
            <div key={title} className="bg-white rounded-xl border border-[#E5E7EB] p-6 hover:shadow-md transition-shadow group">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: bg }}>
                <Icon size={20} style={{ color }} />
              </div>
              <h4 className="text-[1rem] font-semibold text-[#00396b] mb-2">{title}</h4>
              <p className="text-[0.8125rem] text-[#6B7280] leading-relaxed mb-4">{desc}</p>
              <button className="flex items-center gap-1 text-[0.8125rem] font-medium text-[#0078ba] group-hover:gap-2 transition-all">
                Learn more <ArrowRight size={13} />
              </button>
            </div>
          ))}
        </div>
      </SubSection>

      <UsageNote>
        Cards should have consistent padding (24px default, 16px compact). Use shadow-sm for default elevation, shadow-md on hover. Always include a clear content hierarchy with a title, body, and optional footer action within a card.
      </UsageNote>
    </SectionWrapper>
  );
}