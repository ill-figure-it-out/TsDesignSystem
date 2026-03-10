import React, { useState } from 'react';
import { SectionWrapper, SubSection, UsageNote, ShowcaseBox } from './SectionWrapper';
import { User, Camera, Building2, Shield, Bot, Plus } from 'lucide-react';

/* ─── Size tokens ───────────────────────────────────────────────────────── */
const sizeTokens = {
  '2xs': { wh: 'w-6 h-6',   text: 'text-[0.5rem]',    icon: 10, ring: 'ring-[1.5px]', status: 'w-1.5 h-1.5', statusOff: '-bottom-[1px] -right-[1px]' },
  xs:    { wh: 'w-8 h-8',   text: 'text-[0.625rem]',  icon: 12, ring: 'ring-2',        status: 'w-2 h-2',     statusOff: '-bottom-0.5 -right-0.5' },
  sm:    { wh: 'w-9 h-9',   text: 'text-[0.6875rem]', icon: 14, ring: 'ring-2',        status: 'w-2.5 h-2.5', statusOff: '-bottom-0.5 -right-0.5' },
  md:    { wh: 'w-10 h-10', text: 'text-[0.75rem]',   icon: 16, ring: 'ring-2',        status: 'w-3 h-3',     statusOff: '0 0' },
  lg:    { wh: 'w-12 h-12', text: 'text-[0.875rem]',  icon: 20, ring: 'ring-[2.5px]', status: 'w-3.5 h-3.5', statusOff: '0.5px 0.5px' },
  xl:    { wh: 'w-16 h-16', text: 'text-[1rem]',      icon: 24, ring: 'ring-[3px]',   status: 'w-4 h-4',     statusOff: '1px 1px' },
  '2xl': { wh: 'w-20 h-20', text: 'text-[1.125rem]',  icon: 28, ring: 'ring-[3px]',   status: 'w-5 h-5',     statusOff: '2px 2px' },
};

type AvatarSize = keyof typeof sizeTokens;
type AvatarStatus = 'online' | 'offline' | 'busy' | 'away' | 'none';

const statusColors: Record<AvatarStatus, string> = {
  online:  '#16A34A',
  offline: '#9CA3AF',
  busy:    '#DC2626',
  away:    '#D97706',
  none:    'transparent',
};

/* Deterministic hue from initials string */
const initialsColor = (initials: string) => {
  const palettes = [
    { bg: '#00396b', text: '#bdddf5' },
    { bg: '#0078ba', text: '#ddeef9' },
    { bg: '#0E7490', text: '#E0F2FE' },
    { bg: '#15803D', text: '#DCFCE7' },
    { bg: '#D97706', text: '#FEF3C7' },
    { bg: '#DC2626', text: '#FEE2E2' },
    { bg: '#7C3AED', text: '#EDE9FE' },
    { bg: '#DB2777', text: '#FCE7F3' },
  ];
  const idx = (initials.charCodeAt(0) || 0) % palettes.length;
  return palettes[idx];
};

interface AvatarProps {
  type?: 'image' | 'initials' | 'icon';
  initials?: string;
  src?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  shape?: 'circle' | 'rounded';
  icon?: React.ReactNode;
  ring?: boolean;
  badge?: number;
}

function Avatar({
  type = 'initials',
  initials = 'JD',
  src,
  size = 'md',
  status = 'none',
  shape = 'circle',
  icon,
  ring = false,
  badge,
}: AvatarProps) {
  const s = sizeTokens[size];
  const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-xl';
  const { bg, text } = initialsColor(initials);

  return (
    <div className="relative inline-flex flex-shrink-0">
      {/* Ring wrapper */}
      <div
        className={`${s.wh} ${shapeClass} overflow-hidden flex items-center justify-center flex-shrink-0 ${
          ring ? `${s.ring} ring-white ring-offset-1` : ''
        }`}
        style={{ backgroundColor: type === 'image' ? '#E5E7EB' : bg }}
      >
        {type === 'image' && src && (
          <img src={src} alt={initials} className="w-full h-full object-cover" />
        )}
        {type === 'image' && !src && (
          <User size={s.icon} className="text-[#9CA3AF]" />
        )}
        {type === 'initials' && (
          <span className={`${s.text} font-semibold select-none`} style={{ color: text }}>
            {initials.slice(0, 2).toUpperCase()}
          </span>
        )}
        {type === 'icon' && (
          <span style={{ color: text }}>
            {icon ?? <User size={s.icon} />}
          </span>
        )}
      </div>

      {/* Status dot */}
      {status !== 'none' && (
        <span
          className={`absolute bottom-0 right-0 ${s.status} rounded-full border-[1.5px] border-white`}
          style={{ backgroundColor: statusColors[status] }}
        />
      )}

      {/* Numeric badge */}
      {badge !== undefined && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-[#DC2626] text-white text-[0.5625rem] font-bold rounded-full flex items-center justify-center px-1 border-[1.5px] border-white">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </div>
  );
}

/* ─── Stacked Avatar Group ──────────────────────────────────────────────── */
function AvatarGroup({
  members,
  max = 4,
  size = 'md',
}: {
  members: { initials: string; status?: AvatarStatus }[];
  max?: number;
  size?: AvatarSize;
}) {
  const s = sizeTokens[size];
  const visible = members.slice(0, max);
  const overflow = members.length - max;

  return (
    <div className="flex items-center">
      {visible.map((m, i) => (
        <div
          key={i}
          className={`${s.wh} rounded-full border-2 border-white -ml-2 first:ml-0 relative z-${10 - i}`}
          style={{ zIndex: 10 - i }}
        >
          <Avatar initials={m.initials} size={size} status={m.status} ring={false} />
        </div>
      ))}
      {overflow > 0 && (
        <div
          className={`${s.wh} rounded-full border-2 border-white -ml-2 bg-[#F3F4F6] flex items-center justify-center`}
          style={{ zIndex: 0 }}
        >
          <span className={`${s.text} font-semibold text-[#6B7280]`}>+{overflow}</span>
        </div>
      )}
    </div>
  );
}

/* ─── Avatar with name card ─────────────────────────────────────────────── */
function AvatarCard({
  initials,
  name,
  role,
  status,
}: {
  initials: string;
  name: string;
  role: string;
  status?: AvatarStatus;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-[#E5E7EB] bg-white hover:border-[#C7D9FE] hover:bg-[#F5F8FF] transition-all group cursor-pointer">
      <Avatar initials={initials} size="md" status={status} />
      <div className="min-w-0 flex-1">
        <p className="text-[0.875rem] font-semibold text-[#111827] truncate group-hover:text-[#1A56DB] transition-colors">{name}</p>
        <p className="text-[0.75rem] text-[#6B7280] truncate">{role}</p>
      </div>
      {status && status !== 'none' && (
        <span
          className="text-[0.625rem] font-medium capitalize px-1.5 py-0.5 rounded-full"
          style={{
            backgroundColor: status === 'online' ? '#DCFCE7' : status === 'busy' ? '#FEE2E2' : status === 'away' ? '#FEF3C7' : '#F3F4F6',
            color: statusColors[status],
          }}
        >
          {status}
        </span>
      )}
    </div>
  );
}

export function AvatarsSection() {
  const [selectedSize, setSelectedSize] = useState<AvatarSize>('md');

  const sizes = Object.keys(sizeTokens) as AvatarSize[];

  const team = [
    { initials: 'JD', name: 'Jane Doe',      role: 'Billing Manager',    status: 'online'  as AvatarStatus },
    { initials: 'MC', name: 'Marcus Chen',   role: 'Claims Analyst',     status: 'busy'    as AvatarStatus },
    { initials: 'SR', name: 'Sara Rodriguez', role: 'Compliance Officer', status: 'away'    as AvatarStatus },
    { initials: 'TP', name: 'Tom Parker',    role: 'Revenue Director',   status: 'offline' as AvatarStatus },
    { initials: 'AK', name: 'Aisha Kumar',   role: 'Clinical Coder',     status: 'online'  as AvatarStatus },
  ];

  return (
    <SectionWrapper
      id="avatars"
      title="Avatars"
      subtitle="Avatars represent users, providers, or organizations. They appear in navigation headers, user lists, comment threads, and assignment fields in healthcare workflows."
    >
      {/* Types */}
      <SubSection title="Avatar Types" description="Three content types: image placeholder, initials (most common), and icon.">
        <ShowcaseBox label="Types × Sizes (MD)">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <Avatar type="image" initials="JD" size="md" />
              <span className="text-[0.6875rem] text-[#9CA3AF]">Image</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar type="initials" initials="MC" size="md" />
              <span className="text-[0.6875rem] text-[#9CA3AF]">Initials</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar type="icon" initials="IC" size="md" icon={<User size={16} />} />
              <span className="text-[0.6875rem] text-[#9CA3AF]">Icon (User)</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar type="icon" initials="OI" size="md" icon={<Building2 size={16} />} />
              <span className="text-[0.6875rem] text-[#9CA3AF]">Icon (Org)</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar type="icon" initials="AI" size="md" icon={<Bot size={16} />} />
              <span className="text-[0.6875rem] text-[#9CA3AF]">Icon (Bot)</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar type="initials" initials="JD" size="md" shape="rounded" />
              <span className="text-[0.6875rem] text-[#9CA3AF]">Rounded Sq.</span>
            </div>
          </div>
        </ShowcaseBox>
      </SubSection>

      {/* Sizes */}
      <SubSection title="Sizes" description="Seven sizes following the 8pt spacing system.">
        <ShowcaseBox label="Size Scale">
          <div className="flex flex-wrap items-end gap-5">
            {sizes.map(s => {
              const dim = { '2xs': 24, xs: 32, sm: 36, md: 40, lg: 48, xl: 64, '2xl': 80 }[s];
              return (
                <div key={s} className="flex flex-col items-center gap-2">
                  <Avatar type="initials" initials="JD" size={s} />
                  <div className="text-center">
                    <p className="text-[0.6875rem] font-semibold text-[#374151]">{s.toUpperCase()}</p>
                    <p className="text-[0.5625rem] text-[#9CA3AF]">{dim}px</p>
                  </div>
                </div>
              );
            })}
          </div>
        </ShowcaseBox>
      </SubSection>

      {/* Status Indicators */}
      <SubSection title="Status Indicators" description="Presence indicators for users in real-time collaborative features.">
        <ShowcaseBox label="Status Dot Variants">
          <div className="flex flex-wrap items-center gap-6">
            {(['online', 'busy', 'away', 'offline'] as AvatarStatus[]).map(st => (
              <div key={st} className="flex flex-col items-center gap-2">
                <Avatar type="initials" initials={st.slice(0, 2).toUpperCase()} size="lg" status={st} />
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColors[st] }} />
                  <span className="text-[0.6875rem] text-[#374151] capitalize">{st}</span>
                </div>
              </div>
            ))}
          </div>
        </ShowcaseBox>
      </SubSection>

      {/* Badges */}
      <SubSection title="With Badges" description="Notification badges for unread count or action indicators.">
        <ShowcaseBox label="Avatar + Badge">
          <div className="flex flex-wrap items-center gap-6">
            <Avatar type="initials" initials="JD" size="lg" badge={3} />
            <Avatar type="initials" initials="MC" size="lg" badge={12} />
            <Avatar type="initials" initials="SR" size="lg" badge={99} />
            <Avatar type="initials" initials="TP" size="lg" badge={150} />
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <Avatar type="icon" initials="IC" size="lg" icon={<Camera size={20} />} />
                <button className="absolute bottom-0 right-0 w-6 h-6 bg-[#1A56DB] rounded-full flex items-center justify-center border-2 border-white hover:bg-[#103776] transition-colors">
                  <Plus size={11} className="text-white" />
                </button>
              </div>
              <span className="text-[0.6875rem] text-[#9CA3AF]">Edit Overlay</span>
            </div>
          </div>
        </ShowcaseBox>
      </SubSection>

      {/* Groups */}
      <SubSection title="Avatar Groups" description="Stacked avatar group for team members, collaborators, or assignees.">
        <ShowcaseBox label="Stacked Groups">
          <div className="flex flex-col gap-5">
            {(['xs', 'sm', 'md', 'lg'] as AvatarSize[]).map(s => (
              <div key={s} className="flex items-center gap-4">
                <AvatarGroup
                  size={s}
                  max={4}
                  members={[
                    { initials: 'JD', status: 'online' },
                    { initials: 'MC', status: 'busy' },
                    { initials: 'SR', status: 'away' },
                    { initials: 'TP', status: 'online' },
                    { initials: 'AK' },
                    { initials: 'BP' },
                  ]}
                />
                <span className="text-[0.75rem] text-[#6B7280]">{s.toUpperCase()} — 6 members, max 4 visible</span>
              </div>
            ))}
          </div>
        </ShowcaseBox>
      </SubSection>

      {/* Team List */}
      <SubSection title="Avatar + Name Card" description="Used in user lists, provider directories, and assignment panels.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl">
          {team.map(member => (
            <AvatarCard key={member.initials} {...member} />
          ))}
        </div>
      </SubSection>

      {/* Interactive Size Picker */}
      <SubSection title="Interactive Preview" description="Preview different sizes across all status states.">
        <div className="p-5 rounded-xl border border-[#E5E7EB] bg-white">
          <div className="flex flex-wrap gap-2 mb-5">
            {sizes.map(s => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={`px-3 py-1.5 text-[0.75rem] font-medium rounded-lg border transition-all ${
                  selectedSize === s
                    ? 'bg-[#1A56DB] text-white border-[#1A56DB]'
                    : 'bg-white text-[#6B7280] border-[#D1D5DB] hover:border-[#1A56DB] hover:text-[#1A56DB]'
                }`}
              >
                {s.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-6">
            {(['online', 'busy', 'away', 'offline'] as AvatarStatus[]).map(st => (
              <div key={st} className="flex flex-col items-center gap-2">
                <Avatar type="initials" initials={st.slice(0, 2).toUpperCase()} size={selectedSize} status={st} />
                <span className="text-[0.625rem] text-[#9CA3AF] capitalize">{st}</span>
              </div>
            ))}
          </div>
        </div>
      </SubSection>

      <UsageNote>
        Default to <strong>initials avatars</strong> when user images are unavailable — derive 2-letter initials from First + Last name.
        Status indicators must be 25% of the avatar diameter. For groups, limit visible avatars to 4–5 before showing +N overflow.
        Avatar colors are deterministically generated from initials to maintain consistency across sessions.
      </UsageNote>
    </SectionWrapper>
  );
}