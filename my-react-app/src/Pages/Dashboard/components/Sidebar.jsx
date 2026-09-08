import React from 'react';

const mainNavItems = [
  {
    key: 'Dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"></rect>
        <rect x="14" y="3" width="7" height="7" rx="1"></rect>
        <rect x="14" y="14" width="7" height="7" rx="1"></rect>
        <rect x="3" y="14" width="7" height="7" rx="1"></rect>
      </svg>
    ),
  },
  {
    key: 'My Teams',
    label: 'My Teams',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
  },
  {
    key: 'Hackathons',
    label: 'Hackathons',
    badge: '3',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
        <path d="M4 22h16"></path>
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path>
      </svg>
    ),
  },
  {
    key: 'Matches',
    label: 'Matches',
    badge: '12',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
      </svg>
    ),
  },
  {
    key: 'Messages',
    label: 'Messages',
    badge: '5',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    ),
  },
  {
    key: 'Projects',
    label: 'Projects',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
      </svg>
    ),
  },
];

const bottomNavItems = [
  {
    key: 'Profile',
    label: 'Profile',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"></circle>
        <path d="M12 14c-6.1 0-8 4-8 4v2h16v-2s-1.9-4-8-4z"></path>
      </svg>
    ),
  },
  {
    key: 'Settings',
    label: 'Settings',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.32 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>
    ),
  },
  {
    key: 'Help',
    label: 'Help & Support',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    ),
  },
];

/**
 * Sidebar — HackaMate dashboard navigation
 * @param {{ activeItem?: string, onNavClick?: (key: string) => void, interactive?: boolean }} props
 */
export default function Sidebar({
  activeItem = 'Dashboard',
  onNavClick,
  interactive = false,
  isOpen = false,
  onClose,
}) {
  const handleClick = (key) => {
    if (interactive && onNavClick) {
      onNavClick(key);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="db-sidebar-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside className={`db-sidebar ${isOpen ? 'is-open' : ''}`}>
      <a href="#/" className="db-sidebar-header" title="Back to HackaMate Landing Page">
        <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
          <path d="M24 2L44 14V34L24 46L4 34V14L24 2Z" fill="#2563eb" />
          <path d="M24 12L34 18V30L24 36L14 30V18L24 12Z" fill="#ffffff" opacity="0.3" />
          <path d="M24 18L29 21V27L24 30L19 27V21L24 18Z" fill="#ffffff" opacity="0.6" />
        </svg>
        <span className="db-sidebar-brand">Hacka<span className="db-sidebar-accent">Mate</span></span>
      </a>

      <nav className="db-sidebar-nav">
        {mainNavItems.map(item => (
          <a
            key={item.key}
            className={`db-sidebar-link ${activeItem === item.key ? 'db-sidebar-link--active' : ''}`}
            onClick={() => handleClick(item.key)}
            style={interactive ? { cursor: 'pointer' } : undefined}
          >
            <span className="db-sidebar-link-icon">{item.icon}</span>
            <span>{item.label}</span>
            {item.badge && <span className="db-sidebar-badge">{item.badge}</span>}
          </a>
        ))}
      </nav>

      <div className="db-sidebar-divider" />

      <nav className="db-sidebar-nav db-sidebar-nav--bottom">
        {bottomNavItems.map(item => (
          <a
            key={item.key}
            className={`db-sidebar-link ${activeItem === item.key ? 'db-sidebar-link--active' : ''}`}
            onClick={() => handleClick(item.key)}
            style={interactive ? { cursor: 'pointer' } : undefined}
          >
            <span className="db-sidebar-link-icon">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
    </>
  );
}
