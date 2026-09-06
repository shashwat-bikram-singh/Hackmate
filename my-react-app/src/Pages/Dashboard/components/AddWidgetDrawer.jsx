import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const availableWidgets = [
  { 
    id: 'radar',
    icon: 'radar', 
    title: 'Skills Radar', 
    desc: 'Visualize your team\'s skill coverage and gaps across 5 core competencies', 
    tag: '#skills', 
    color: 'var(--violet)' 
  },
  { 
    id: 'calendar',
    icon: 'calendar', 
    title: 'Hackathon Calendar', 
    desc: 'See upcoming hackathons, deadlines & milestones on an interactive timeline', 
    tag: '#events', 
    color: '#8b5cf6' 
  },
  { 
    id: 'chat',
    icon: 'chat', 
    title: 'Team Chat Activity', 
    desc: 'Live team communication feed with interactive instant messaging', 
    tag: '#communication', 
    color: '#10b981' 
  },
  { 
    id: 'trophy',
    icon: 'trophy', 
    title: 'Leaderboard', 
    desc: 'Track your team ranking, scores, and peer upvotes across hackathons', 
    tag: '#ranking', 
    color: '#f59e0b' 
  },
  { 
    id: 'checklist',
    icon: 'checklist', 
    title: 'Submission Tracker', 
    desc: 'Interactive checklist for deliverables, demo videos, and contracts', 
    tag: '#projects', 
    color: '#ef4444' 
  },
];

const renderIcon = (type) => {
  switch (type) {
    case 'radar':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="6"></circle>
          <circle cx="12" cy="12" r="2"></circle>
          <line x1="12" y1="2" x2="12" y2="22"></line>
          <line x1="2" y1="12" x2="22" y2="12"></line>
        </svg>
      );
    case 'calendar':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      );
    case 'chat':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      );
    case 'trophy':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 21h8"></path>
          <path d="M12 17v4"></path>
          <path d="M7 4h10"></path>
          <path d="M5 4h14v7a7 7 0 0 1-14 0V4z"></path>
          <path d="M5 9H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2"></path>
          <path d="M19 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2"></path>
        </svg>
      );
    case 'checklist':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          <path d="M9 14l2 2 4-4"></path>
        </svg>
      );
    default:
      return null;
  }
};

/**
 * Slide-over drawer to add/remove widgets interactively.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls visibility
 * @param {Function} props.onClose - Callback to close drawer
 * @param {Array<string>} props.activeWidgets - Currently selected widget IDs
 * @param {Function} props.onToggleWidget - Function to toggle widget
 */
export default function AddWidgetDrawer({ isOpen, onClose, activeWidgets = [], onToggleWidget }) {
  const [filterText, setFilterText] = useState('');

  const filtered = availableWidgets.filter(w => 
    w.title.toLowerCase().includes(filterText.toLowerCase()) || 
    w.desc.toLowerCase().includes(filterText.toLowerCase()) ||
    w.tag.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="db-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div 
            className="db-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="db-drawer-header">
              <div>
                <h2 className="db-drawer-title">Add Widgets</h2>
                <p className="db-drawer-subtitle">Click to add interactive modules directly to your dashboard.</p>
              </div>
              <button className="db-drawer-close" onClick={onClose} aria-label="Close drawer">✕</button>
            </div>

            <div className="db-drawer-search-wrap">
              <input
                type="text"
                className="db-drawer-search"
                placeholder="Filter widget templates..."
                value={filterText}
                onChange={e => setFilterText(e.target.value)}
              />
            </div>

            <div className="db-drawer-list">
              {filtered.map(w => {
                const isAdded = activeWidgets.includes(w.id);

                return (
                  <div 
                    className={`db-drawer-card ${isAdded ? 'db-drawer-card--selected' : ''}`} 
                    key={w.id}
                  >
                    <div className="db-drawer-card-top">
                      <div className="db-drawer-card-icon" style={{ background: w.color + '15', color: w.color }}>
                        {renderIcon(w.icon)}
                      </div>
                      <div className="db-drawer-card-info">
                        <div className="db-drawer-card-title-row">
                          <h4 className="db-drawer-card-title">{w.title}</h4>
                          <span className="db-drawer-card-tag">{w.tag}</span>
                        </div>
                        <p className="db-drawer-card-desc">{w.desc}</p>
                      </div>
                    </div>

                    <button 
                      className={`db-drawer-card-select ${isAdded ? 'db-drawer-card-select--added' : ''}`}
                      onClick={() => onToggleWidget && onToggleWidget(w.id)}
                    >
                      {isAdded ? '✓ Added to Dashboard' : '+ Add Widget'}
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
