'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  ChevronDown, 
  Calendar 
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface ScheduleDateProps {
  onApply?: (range: DateRange) => void;
  onCancel?: () => void;
  initialRange?: DateRange;
}

const PRESETS = [
  { label: 'Today', id: 'today' },
  { label: 'Yesterday', id: 'yesterday' },
  { label: 'Last 7 Days', id: '7d' },
  { label: 'Last 30 Days', id: '30d' },
  { label: 'Last 365 Days', id: '365d' },
  { label: 'Week to Date', id: 'wtd' },
  { label: 'Month to Date', id: 'mtd' },
  { label: 'Year to Date', id: 'ytd' },
  { label: 'Custom', id: 'custom' },
];

const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

export const ScheduleDate: React.FC<ScheduleDateProps> = ({
  onApply,
  onCancel,
  initialRange,
}) => {
  const [selectedPreset, setSelectedPreset] = useState('30d');
  const [viewDate, setViewDate] = useState(
    initialRange?.start ? new Date(initialRange.start.getFullYear(), initialRange.start.getMonth(), 1) : new Date(2026, 8, 1)
  );
  const [range, setRange] = useState<DateRange>(
    initialRange || {
      start: new Date(2026, 8, 1),
      end: new Date(2026, 8, 30),
    }
  );

  const applyPresetRange = (presetId: string) => {
    setSelectedPreset(presetId);
    const base = new Date(2026, 8, 30); // 2026 Hackathon season reference point
    let start: Date | null = null;
    let end: Date | null = new Date(base);

    switch (presetId) {
      case 'today':
        start = new Date(base);
        end = new Date(base);
        break;
      case 'yesterday': {
        const y = new Date(base);
        y.setDate(y.getDate() - 1);
        start = y;
        end = y;
        break;
      }
      case '7d': {
        const s7 = new Date(base);
        s7.setDate(s7.getDate() - 6);
        start = s7;
        break;
      }
      case '30d': {
        start = new Date(2026, 8, 1);
        end = new Date(2026, 8, 30);
        break;
      }
      case '365d': {
        const s365 = new Date(base);
        s365.setDate(s365.getDate() - 364);
        start = s365;
        break;
      }
      case 'wtd': {
        const w = new Date(base);
        const day = (w.getDay() + 6) % 7;
        w.setDate(w.getDate() - day);
        start = w;
        break;
      }
      case 'mtd': {
        start = new Date(base.getFullYear(), base.getMonth(), 1);
        break;
      }
      case 'ytd': {
        start = new Date(base.getFullYear(), 0, 1);
        break;
      }
      case 'custom':
      default:
        return;
    }

    if (start) {
      setRange({ start, end });
      setViewDate(new Date(start.getFullYear(), start.getMonth(), 1));
    }
  };

  const handleDateClick = (date: Date) => {
    if (!range.start || (range.start && range.end)) {
      setRange({ start: date, end: null });
      setSelectedPreset('custom');
    } else {
      if (date < range.start) {
        setRange({ start: date, end: range.start });
      } else {
        setRange({ ...range, end: date });
      }
    }
  };

  const renderMonthGrid = (
    monthDate: Date,
    showLeftNav = false,
    showRightNav = false,
  ) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthName = monthDate.toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });

    return (
      <div className="w-[260px] sm:w-[270px] shrink-0">
        <div className="mb-4 flex items-center justify-between px-2">
          {showLeftNav ? (
            <button
              type="button"
              title="Previous Month"
              onClick={() => setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
              className="p-1.5 text-neutral-400 transition-colors hover:text-neutral-900 rounded-lg hover:bg-neutral-100 cursor-pointer"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>
          ) : (
            <div className="w-8" />
          )}
          <span className="text-sm font-semibold tracking-tight text-neutral-800">
            {monthName}
          </span>
          {showRightNav ? (
            <button
              type="button"
              title="Next Month"
              onClick={() => setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
              className="p-1.5 text-neutral-400 transition-colors hover:text-neutral-900 rounded-lg hover:bg-neutral-100 cursor-pointer"
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          ) : (
            <div className="w-8" />
          )}
        </div>

        <div className="relative grid grid-cols-7 gap-y-1 text-center">
          {DAYS.map((d) => (
            <span
              key={d}
              className="mb-2 text-xs font-semibold text-neutral-400 uppercase"
            >
              {d}
            </span>
          ))}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="h-9" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const currentDayDate = new Date(year, month, day);
            const isStart =
              range.start?.toDateString() === currentDayDate.toDateString();
            const isEnd =
              range.end?.toDateString() === currentDayDate.toDateString();
            const isInRange =
              range.start &&
              range.end &&
              currentDayDate > range.start &&
              currentDayDate < range.end;

            return (
              <div
                key={day}
                onClick={() => handleDateClick(currentDayDate)}
                className="group relative flex h-9 cursor-pointer items-center justify-center"
              >
                {(isInRange || isStart || isEnd) && (
                  <div
                    className={cn(
                      'absolute z-0 h-9',
                      'border-y border-blue-100 bg-blue-50/80',
                      isStart ? 'left-1/2 rounded-l-lg border-l border-blue-200' : 'left-0',
                      isEnd ? 'right-1/2 rounded-r-lg border-r border-blue-200' : 'right-0',
                      isInRange && !isStart && !isEnd ? 'w-full' : '',
                    )}
                  />
                )}
                {isStart || isEnd ? (
                  <div className="absolute z-10 flex h-9 w-9 flex-col items-center justify-center rounded-lg border border-blue-600 bg-linear-to-b from-blue-600 to-blue-700 shadow-md shadow-blue-500/25">
                    <span className="text-xs font-bold text-white">{day}</span>
                    <motion.div
                      layoutId="activeThumb"
                      className="absolute bottom-1 h-[2px] w-2.5 rounded-full bg-blue-200 shadow-[0_0_8px_#93c5fd]"
                    />
                  </div>
                ) : (
                  <span
                    className={cn(
                      'relative z-10 text-[13px] font-medium transition-colors',
                      isInRange
                        ? 'font-semibold text-blue-900'
                        : 'text-neutral-700 group-hover:text-neutral-900',
                    )}
                  >
                    {day}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const formattedRangeText = range.start && range.end
    ? `${range.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} – ${range.end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
    : range.start
    ? range.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'No date range selected';

  return (
    <div 
      className="mx-auto flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white font-sans text-slate-800 shadow-2xl transition-all duration-200"
    >
      {/* Top Header Bar */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/25">
            <Calendar size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-slate-900">
                HackaMate Schedule & Date Range
              </h4>
              <span className="hidden sm:inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-blue-600 border border-blue-200">
                2026 Season
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Choose a preset period or customize start and end dates
            </p>
          </div>
        </div>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 cursor-pointer"
            title="Close (Esc)"
          >
            ✕
          </button>
        )}
      </header>

      {/* Main Content Area (Sidebar + Calendars) */}
      <div className="flex min-h-0 w-full flex-1 flex-col md:flex-row overflow-hidden bg-white">
        {/* Sidebar Presets */}
        <aside className="no-scrollbar flex w-full shrink-0 flex-row gap-1 overflow-x-auto border-b border-slate-200 bg-slate-50/50 py-3 md:w-56 md:flex-col md:border-r md:border-b-0 md:overflow-y-auto">
          {PRESETS.map((preset, idx) => (
            <React.Fragment key={preset.id}>
              {[2, 5, 8].includes(idx) && (
                <div className="mx-3 my-1 hidden h-px bg-slate-200 md:block" />
              )}
              <button
                type="button"
                onClick={() => applyPresetRange(preset.id)}
                className={cn(
                  'group mx-2 flex items-center justify-between rounded-xl px-3.5 py-2 text-xs whitespace-nowrap transition-all duration-200 md:mx-3 md:text-[13px] cursor-pointer',
                  selectedPreset === preset.id
                    ? preset.id === 'custom'
                      ? 'border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50/80 font-bold text-blue-700 shadow-xs'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-white shadow-md shadow-blue-500/25'
                    : 'hover:bg-blue-50 hover:text-blue-700 text-slate-600 font-medium',
                )}
              >
                <span>{preset.label}</span>
                {selectedPreset === preset.id && preset.id === 'custom' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-2 text-blue-600"
                  >
                    <Check size={12} />
                  </motion.div>
                )}
              </button>
            </React.Fragment>
          ))}
        </aside>

        {/* Main Content (Inputs + Months) */}
        <main className="flex min-w-0 flex-1 flex-col gap-6 overflow-y-auto bg-white p-4 md:p-6">
          {/* Inputs Area */}
          <div className="grid shrink-0 grid-cols-1 gap-3 sm:grid-cols-2 max-w-2xl mx-auto w-full">
            <DateInput label="Start date" date={range.start} />
            <DateInput label="End date" date={range.end} />
          </div>

          {/* Calendars Container */}
          <div className="no-scrollbar flex flex-row items-start justify-center gap-4 sm:gap-6 lg:gap-8 overflow-x-hidden overflow-y-hidden py-1 flex-1">
            {/* Left Month */}
            <div className="shrink-0">
              {renderMonthGrid(viewDate, true, false)}
            </div>

            {/* Divider */}
            <div className="hidden h-52 w-px shrink-0 self-center bg-slate-200 sm:block" />

            {/* Right Month */}
            <div className="shrink-0">
              {renderMonthGrid(
                new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1),
                false,
                true,
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="flex h-16 shrink-0 items-center justify-between border-t border-slate-200 bg-white px-4 md:px-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold text-slate-700 hidden sm:inline">
            Range:
          </span>
          <span className="truncate max-w-xs md:max-w-md font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg">
            {formattedRangeText}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 shadow-xs cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onApply?.(range)}
            className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2 text-xs font-bold text-white shadow-md shadow-blue-500/25 transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-blue-500/35 active:scale-95 cursor-pointer"
          >
            Apply Range
          </button>
        </div>
      </footer>
    </div>
  );
};

const DateInput = ({ label, date }: { label: string; date: Date | null }) => (
  <div className="flex flex-1 flex-col gap-1.5">
    <label className="ml-1 text-[12px] font-semibold text-slate-600">
      {label}
    </label>
    <div className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-700 transition-all hover:border-blue-400 hover:bg-blue-50/20 shadow-xs md:text-[13px]">
      <span className="font-semibold text-slate-900">
        {date
          ? date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })
          : 'Select Date'}
      </span>
      <ChevronDown
        size={14}
        className="text-slate-400"
      />
    </div>
  </div>
);

export default ScheduleDate;
