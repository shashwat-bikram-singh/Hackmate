import React, { useState, useEffect } from 'react';
import { motion, LayoutGroup, useReducedMotion } from 'motion/react';
import './Navbar.css';

const navTabs = [
  { id: 'home', label: 'Home', href: '#/' },
  { id: 'contact', label: 'Contact', href: '#/contact' },
  { id: 'events', label: 'Events', href: '#teams' },
  { id: 'community', label: 'Community', href: '#features' },
  { id: 'about', label: 'About', href: '#/about' },
];

function getActiveTabFromHash(hash) {
  if (hash === '#/about') return 'about';
  if (hash === '#/contact') return 'contact';
  if (hash === '#teams') return 'events';
  if (hash === '#features') return 'community';
  return 'home';
}

// `entered` gates the drop-in entrance. Defaults to true so routes that mount
// the navbar directly (about / contact) still animate it in on mount; the
// landing page passes the flag it toggles as the intro overlay lifts.
function Navbar({ entered = true }) {
  const reduce = useReducedMotion();

  const [active, setActive] = useState(() => {
    return typeof window !== 'undefined'
      ? getActiveTabFromHash(window.location.hash)
      : 'home';
  });

  useEffect(() => {
    const syncActiveTab = () => {
      setActive(getActiveTabFromHash(window.location.hash));
    };

    syncActiveTab();
    window.addEventListener('hashchange', syncActiveTab);
    return () => window.removeEventListener('hashchange', syncActiveTab);
  }, []);

  const handleTabClick = (tab) => {
    setActive(tab.id);
  };

  return (
    <motion.header
      className="navbar"
      // Subtle drop-in from just above. Kept off the inner LayoutGroup so the
      // sliding active-pill (layoutId) is never measured mid-transform.
      initial={reduce ? false : { y: -18, opacity: 0 }}
      animate={entered ? { y: 0, opacity: 1 } : { y: -18, opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container navbar-inner">
        <a href="#/" className="logo navbar-logo">
          Hacka<span className="logo-accent">Mate</span>
        </a>

        {/* Animated Continuous Tabs Navigation */}
        <LayoutGroup id="navbar-nav-group">
          <nav className="navbar-tabs-nav" aria-label="Main Navigation">
            {navTabs.map((tab) => {
              const isActive = active === tab.id;

              return (
                <a
                  key={tab.id}
                  href={tab.href}
                  onClick={() => handleTabClick(tab)}
                  className={`navbar-tab-btn ${isActive ? 'is-active' : ''}`}
                >
                  {/* Sliding Active Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                        mass: 0.9,
                      }}
                      className="navbar-active-pill"
                    />
                  )}

                  {/* Text Label */}
                  <motion.span
                    layout="position"
                    className="navbar-tab-text"
                  >
                    {tab.label}
                  </motion.span>
                </a>
              );
            })}
          </nav>
        </LayoutGroup>

        <div className="navbar-actions">
          <a href="#/login" className="navbar-login">Log in</a>
          <a href="#/signup" className="btn btn-primary navbar-cta">Get started</a>
        </div>
      </div>
    </motion.header>
  );
}

export default Navbar;
