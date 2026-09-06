import React, { useState, useEffect } from 'react';
import { motion, LayoutGroup } from 'motion/react';
import './Navbar.css';

const DEFAULT_TABS = [
  { id: 'home', label: 'Home', href: '#/' },
  { id: 'contact', label: 'Contact', href: '#/contact' },
  { id: 'events', label: 'Events', href: '#teams' },
  { id: 'community', label: 'Community', href: '#features' },
  { id: 'about', label: 'About', href: '#/about' },
];

export const ContinuousTabs = ({
  tabs = DEFAULT_TABS,
  defaultActiveId = 'home',
  onChange,
  className = '',
}) => {
  const [active, setActive] = useState(defaultActiveId);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsMounted(true));
  }, []);

  const handleChange = (tab) => {
    setActive(tab.id);
    onChange?.(tab.id);
  };

  if (!isMounted) return null;

  return (
    <LayoutGroup id="continuous-tabs-group">
      <nav className={`navbar-tabs-nav ${className}`} aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = active === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleChange(tab)}
              className={`navbar-tab-btn ${isActive ? 'is-active' : ''}`}
            >
              {isActive && (
                <motion.div
                  layoutId="continuous-active-pill"
                  transition={{
                    type: 'spring',
                    stiffness: 380,
                    damping: 30,
                    mass: 0.9,
                  }}
                  className="navbar-active-pill"
                />
              )}

              <motion.span layout="position" className="navbar-tab-text">
                {tab.label}
              </motion.span>
            </button>
          );
        })}
      </nav>
    </LayoutGroup>
  );
};

export default ContinuousTabs;
