'use client';

import { useState, type FC, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUpIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ActivityItemType {
  icon: ReactNode;
  title: string;
  desc: string;
  time: string;
  color?: string;
  bgColor?: string;
  borderColor?: string;
}

export interface ActivitiesCardProps {
  headerIcon?: ReactNode;
  title?: string;
  subtitle?: string;
  activities?: ActivityItemType[];
  defaultOpen?: boolean;
  className?: string;
  onActivityClick?: (item: ActivityItemType, index: number) => void;
}

const ITEM_ACCENTS = [
  { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100', timeBg: 'bg-blue-50 text-blue-600' },
  { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', timeBg: 'bg-emerald-50 text-emerald-600' },
  { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100', timeBg: 'bg-amber-50 text-amber-600' },
  { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100', timeBg: 'bg-purple-50 text-purple-600' },
  { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-100', timeBg: 'bg-cyan-50 text-cyan-600' },
];

const ActivityItem: FC<ActivityItemType & { index: number; onClick?: () => void }> = ({
  icon,
  title,
  desc,
  time,
  index,
  onClick,
}) => {
  const accent = ITEM_ACCENTS[index % ITEM_ACCENTS.length];

  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center gap-3 px-3.5 py-2.5 mx-1.5 rounded-xl transition-colors duration-150 hover:bg-blue-50/70 active:scale-[0.99] sm:gap-4 sm:px-4 sm:py-3"
    >
      <div
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border sm:h-11 sm:w-11 shadow-xs transition-transform duration-150',
          accent.bg,
          accent.border,
          accent.text
        )}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] leading-snug font-bold text-slate-800 sm:text-[15px]">
          {title}
        </p>
        <p className="truncate text-[12px] text-slate-500 sm:text-[13px]">
          {desc}
        </p>
      </div>

      <span className={cn('shrink-0 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-slate-100 sm:text-[12px]', accent.timeBg)}>
        {time}
      </span>
    </div>
  );
};

export const ActivitiesCard: FC<ActivitiesCardProps> = ({
  headerIcon,
  title = '5 New Activities',
  subtitle = "What's happening around you",
  activities = [],
  defaultOpen = true,
  className = '',
  onActivityClick,
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className={cn(
        'w-full max-w-sm overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-blue-500/10 transition-shadow duration-200 hover:shadow-2xl hover:shadow-blue-500/15',
        className
      )}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full cursor-pointer items-center justify-between gap-3 bg-gradient-to-b from-white to-slate-50/60 px-3.5 py-3 transition-colors duration-150 hover:bg-slate-50/80 sm:gap-4 sm:px-4 sm:py-3.5"
      >
        <div className="flex min-w-0 flex-1 items-center gap-3 text-left sm:gap-3.5">
          <div
            className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 via-indigo-50/60 to-blue-100 shadow-sm text-blue-600 sm:h-12 sm:w-12 transition-transform duration-200"
          >
            <span className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.9),_inset_-1px_-1px_2px_rgba(37,99,235,0.15)]" />
            <div className={cn("transition-transform duration-200", open ? "scale-90" : "scale-100")}>
              {headerIcon}
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col justify-center">
            <div className="flex items-center gap-2">
              <p className="truncate text-[15px] font-bold tracking-tight text-slate-900 sm:text-[16px]">
                {title}
              </p>
              <span className="hidden sm:inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-600 border border-blue-200/60">
                Live
              </span>
            </div>
            <p className={cn(
              "truncate text-[13px] font-medium text-slate-400 transition-opacity duration-200 sm:text-[14px]",
              open ? "opacity-0 h-0 overflow-hidden m-0" : "opacity-100 h-auto"
            )}>
              {subtitle}
            </p>
          </div>
        </div>

        <div
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/25 transition-transform duration-200 ease-out",
            open ? "rotate-180" : "rotate-0"
          )}
        >
          <ChevronUpIcon className="size-4 stroke-[2.5]" />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="activities-content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-slate-100 bg-white overflow-hidden will-change-[height,opacity]"
          >
            <div className="py-2 divide-y divide-slate-50/80 max-h-[360px] overflow-y-auto no-scrollbar">
              {activities.map((item, i) => (
                <ActivityItem
                  key={i}
                  index={i}
                  {...item}
                  onClick={() => onActivityClick?.(item, i)}
                />
              ))}
            </div>
            <div className="border-t border-slate-100 bg-slate-50/60 px-4 py-2 text-center">
              <span className="text-[11px] font-medium text-slate-400">
                Showing latest team & hackathon events
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ActivitiesCard;
