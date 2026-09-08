import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ScheduleDate } from '../../../Components/ScheduleDate';
import { ActivitiesCardDemo } from '../../../Components/ActivitiesCard';

/**
 * TopNav — dashboard header with interactive search, add widget, export, notifications & replay intro
 */
export default function TopNav({ 
  onAddWidget, 
  interactive = false, 
  searchQuery = '', 
  onSearchChange,
  onReplayIntro,
  onToggleSidebar,
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [exportToast, setExportToast] = useState(false);

  // Calendar / ScheduleDate State
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [dateRangeText, setDateRangeText] = useState('Sep 1, 2026 – Sep 30, 2026');
  const [periodLabel, setPeriodLabel] = useState('Last 30 days');
  const [dateRange, setDateRange] = useState({
    start: new Date(2026, 8, 1),
    end: new Date(2026, 8, 30),
  });
  const calendarRef = useRef(null);
  const modalContentRef = useRef(null);
  const notifRef = useRef(null);

  const handleApplyRange = (appliedRange) => {
    setDateRange(appliedRange);
    if (appliedRange.start && appliedRange.end) {
      const fmt = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      setDateRangeText(`${fmt(appliedRange.start)} – ${fmt(appliedRange.end)}`);
      const diffTime = Math.abs(appliedRange.end.getTime() - appliedRange.start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setPeriodLabel(diffDays === 30 ? 'Last 30 days' : `${diffDays} days`);
    } else if (appliedRange.start) {
      const fmt = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      setDateRangeText(fmt(appliedRange.start));
      setPeriodLabel('1 day');
    }
    setCalendarOpen(false);
  };

  useEffect(() => {
    if (!calendarOpen) return;

    const handleClickOutside = (e) => {
      if (calendarRef.current?.contains(e.target)) return;
      if (modalContentRef.current?.contains(e.target)) return;
      setCalendarOpen(false);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setCalendarOpen(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [calendarOpen]);

  useEffect(() => {
    if (!showNotifications) return;

    const handleClickOutsideNotif = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };

    const handleKeyDownNotif = (e) => {
      if (e.key === 'Escape') {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutsideNotif);
    document.addEventListener('keydown', handleKeyDownNotif);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideNotif);
      document.removeEventListener('keydown', handleKeyDownNotif);
    };
  }, [showNotifications]);

  const handleExport = () => {
    setExportToast(true);
    setTimeout(() => setExportToast(false), 3000);
  };

  return (
    <header className="db-topnav">
      {/* Mobile Sidebar Toggle Button */}
      <button
        className="db-mobile-menu-btn"
        type="button"
        onClick={onToggleSidebar}
        title="Open navigation menu"
        aria-label="Open navigation menu"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      <div className={`db-topnav-search ${interactive ? 'db-topnav-search--interactive' : ''}`}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        {interactive ? (
          <input
            type="text"
            className="db-topnav-search-input"
            placeholder="Search hackathons, teams, skills..."
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          />
        ) : (
          <span>Search hackathons, teams...</span>
        )}
        <div className="db-topnav-search-shortcut">⌘K</div>
      </div>

      <div className="db-topnav-actions">
        {/* Interactive Calendar Date Picker Popover */}
        <div className="db-topnav-calendar-anchor" ref={calendarRef}>
          <button
            className={`db-topnav-date-btn ${calendarOpen ? 'db-topnav-date-btn--active' : ''}`}
            onClick={() => setCalendarOpen(prev => !prev)}
            type="button"
            title="Toggle Hackathon Calendar & Date Filter"
            aria-expanded={calendarOpen}
          >
            <span className="db-topnav-date">📅 {dateRangeText}</span>
            <span className="db-topnav-period">
              {periodLabel} <span className="db-topnav-arrow">{calendarOpen ? '▴' : '▾'}</span>
            </span>
          </button>
        </div>

        {/* Calendar Modal Dialog portaled to document.body to prevent clipping by navbar */}
        {typeof document !== 'undefined' && createPortal(
          <AnimatePresence>
            {calendarOpen && (
              <motion.div
                className="db-calendar-modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => {
                  if (e.target === e.currentTarget) setCalendarOpen(false);
                }}
              >
                <motion.div
                  ref={modalContentRef}
                  className="db-calendar-modal-container"
                  initial={{ opacity: 0, scale: 0.96, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 15 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ScheduleDate
                    initialRange={dateRange}
                    onApply={(appliedRange) => {
                      handleApplyRange(appliedRange);
                    }}
                    onCancel={() => {
                      setCalendarOpen(false);
                    }}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

        {/* Add Widget Button */}
        <button className="db-topnav-add" onClick={onAddWidget} title="Open Add Widget drawer">
          + Add widget
        </button>

        {/* Export Button */}
        <button className="db-topnav-export" onClick={handleExport} title="Export dashboard report">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Export
        </button>

        {/* Replay Intro Button (Interactive mode) */}
        {interactive && onReplayIntro && (
          <button className="db-topnav-replay" onClick={onReplayIntro} title="Re-watch the cinematic camera intro">
            🎬 Replay Intro
          </button>
        )}

        {/* Notifications Icon with Activities Card Dropdown */}
        <div className="db-notif-container" ref={notifRef}>
          <button 
            className={`db-topnav-icon-btn ${showNotifications ? 'db-topnav-icon-btn--active' : ''}`}
            onClick={() => setShowNotifications(prev => !prev)}
            title="Notifications & Activities"
            aria-expanded={showNotifications}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span className="db-topnav-notif-dot"></span>
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                className="db-notif-dropdown"
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.98 }}
                transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              >
                <ActivitiesCardDemo defaultOpen={true} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Avatar */}
        <div className="db-topnav-avatar" title="Logged in as Alex">A</div>
      </div>

      {/* Export Toast Notification */}
      {exportToast && (
        <div className="db-toast">
          ✓ Exported HackaMate metrics summary report (CSV & JSON ready)
        </div>
      )}
    </header>
  );
}
