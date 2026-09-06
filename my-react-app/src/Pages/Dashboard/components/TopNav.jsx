import React, { useState } from 'react';

/**
 * TopNav — dashboard header with interactive search, add widget, export, notifications & replay intro
 */
export default function TopNav({ 
  onAddWidget, 
  interactive = false, 
  searchQuery = '', 
  onSearchChange,
  onReplayIntro,
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [exportToast, setExportToast] = useState(false);

  const notifications = [
    { id: 1, title: 'Team Invitation', text: 'Sarah invited you to join ByteHacks team', time: '12m ago', unread: true },
    { id: 2, title: 'HackMIT Deadline', text: '3 hours remaining to submit draft pitch deck', time: '1h ago', unread: true },
    { id: 3, title: 'Match Verified', text: 'ETHGlobal confirmed your 4-builder team roster', time: '1d ago', unread: false },
  ];

  const handleExport = () => {
    setExportToast(true);
    setTimeout(() => setExportToast(false), 3000);
  };

  return (
    <header className="db-topnav">
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
        <span className="db-topnav-date">📅 Sep 1, 2026 – Sep 30, 2026</span>
        <span className="db-topnav-period">Last 30 days ▾</span>

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

        {/* Notifications Icon with Dropdown */}
        <div className="db-notif-container">
          <button 
            className="db-topnav-icon-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span className="db-topnav-notif-dot"></span>
          </button>

          {showNotifications && (
            <div className="db-notif-dropdown">
              <div className="db-notif-head">
                <h5>Notifications</h5>
                <span className="db-notif-badge">2 new</span>
              </div>
              <div className="db-notif-list">
                {notifications.map(n => (
                  <div key={n.id} className={`db-notif-item ${n.unread ? 'db-notif-item--unread' : ''}`}>
                    <div className="db-notif-item-title">{n.title}</div>
                    <div className="db-notif-item-text">{n.text}</div>
                    <div className="db-notif-item-time">{n.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
