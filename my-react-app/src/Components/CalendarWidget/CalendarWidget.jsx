'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CalendarDays, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { defaultHackathonEvents } from './eventsData';
import './CalendarWidget.css';

const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatLocalDate(d) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function CalendarWidget({
  events = defaultHackathonEvents,
  initialSelectedDate = '2026-09-01',
  currentMonthYear,
  onSelectDate,
  className = '',
}) {
  const [selectedDate, setSelectedDate] = useState(initialSelectedDate);
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onMouseDown = (e) => {
      isDragging.current = true;
      startX.current = e.pageX - el.offsetLeft;
      scrollLeftStart.current = el.scrollLeft;
      el.style.cursor = 'grabbing';
    };

    const onMouseLeave = () => {
      isDragging.current = false;
      el.style.cursor = 'grab';
    };

    const onMouseUp = () => {
      isDragging.current = false;
      el.style.cursor = 'grab';
    };

    const onMouseMove = (e) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX.current) * 1.2;
      el.scrollLeft = scrollLeftStart.current - walk;
    };

    el.style.cursor = 'grab';
    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('mouseleave', onMouseLeave);
    el.addEventListener('mouseup', onMouseUp);
    el.addEventListener('mousemove', onMouseMove);

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const dates = Array.from({ length: 92 }, (_, i) => {
    const date = new Date(2026, 8, 1 + i);
    return {
      day: date.getDate(),
      fullDate: formatLocalDate(date),
      month: date.getMonth(),
      year: date.getFullYear(),
      dateObj: date,
      dayOfWeek: date.getDay(),
      dayName: daysOfWeek[date.getDay()],
    };
  });

  const displayMonthYear = currentMonthYear || (() => {
    try {
      const parts = selectedDate.split('-');
      const mIdx = parseInt(parts[1], 10) - 1;
      return `${monthNames[mIdx] || 'Sep'} ${parts[0] || '2026'}`;
    } catch {
      return 'Sep 2026';
    }
  })();

  const handleDateClick = (fullDate) => {
    setSelectedDate(fullDate);
    if (onSelectDate) {
      onSelectDate(fullDate);
    }
  };

  const scrollByAmount = (amount) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <div className={`cal-widget cal-widget-themed ${className}`}>
      {/* Header */}
      <div className="cal-header">
        <motion.div
          key={displayMonthYear}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="cal-month-title"
        >
          {displayMonthYear}
        </motion.div>

        <div className="cal-nav-buttons">
          <button
            type="button"
            className="cal-nav-btn"
            onClick={() => scrollByAmount(-180)}
            title="Previous dates"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            className="cal-nav-btn"
            onClick={() => scrollByAmount(180)}
            title="Next dates"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Dates Horizontal Strip */}
      <div className="cal-strip-wrapper">
        <div
          ref={scrollRef}
          className="cal-dates-strip scrollbar-hide"
        >
          {dates.map((date) => {
            const isSelected = selectedDate === date.fullDate;
            const hasEvent = (events[date.fullDate]?.length ?? 0) > 0;

            return (
              <div
                key={date.fullDate}
                className="cal-date-col"
              >
                <span className={`cal-day-name ${isSelected ? 'cal-day-name--selected' : ''}`}>
                  {date.dayName}
                </span>

                <motion.div
                  className="cal-day-btn"
                  whileTap={{ scale: 0.92 }}
                  onClick={() => handleDateClick(date.fullDate)}
                >
                  <div className="cal-day-circle">
                    {isSelected && (
                      <motion.div
                        layoutId="cal-selected-bg"
                        transition={{
                          type: 'spring',
                          stiffness: 220,
                          damping: 24,
                        }}
                        className="cal-selected-indicator"
                      />
                    )}
                    <span className={`cal-day-number ${isSelected ? 'cal-day-number--selected' : ''}`}>
                      {date.day}
                    </span>
                  </div>

                  <AnimatePresence mode="popLayout" initial={false}>
                    {hasEvent && !isSelected && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.2 }}
                        className="cal-event-dot"
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Events Box for Selected Date */}
      <div className="cal-events-panel">
        <div className="cal-events-scroll no-scrollbar">
          <AnimatePresence mode="popLayout" initial={false}>
            {events[selectedDate]?.length ? (
              <motion.div key={selectedDate} className="cal-events-list">
                {events[selectedDate].map((event, idx) => (
                  <motion.div
                    key={`${event.title}-${idx}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2, delay: idx * 0.04 }}
                    className="cal-event-card"
                  >
                    <div className="cal-event-accent-bar" />
                    <div className="cal-event-content">
                      <span className="cal-event-title">{event.title}</span>
                      <span className="cal-event-time">
                        <Clock size={12} />
                        {event.time}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="no-events"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="cal-no-events"
              >
                <div className="cal-no-events-icon-wrap">
                  <CalendarDays className="cal-no-events-icon" />
                </div>
                <p className="cal-no-events-text">No events on this date</p>
                <span className="cal-no-events-sub">Select another date to view scheduled hackathons</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default CalendarWidget;
