import React from "react";
import { motion, AnimatePresence } from "motion/react";
import "./LogoOverlay.css";

/* HackaMate hexagon icon */
function HexIcon({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 2L44 14V34L24 46L4 34V14L24 2Z" fill="#2563eb" />
      <path d="M24 12L34 18V30L24 36L14 30V18L24 12Z" fill="#ffffff" opacity="0.25" />
      <path d="M24 18L29 21V27L24 30L19 27V21L24 18Z" fill="#ffffff" opacity="0.55" />
      {/* inner shine */}
      <path d="M24 2L44 14" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
    </svg>
  );
}

function LogoOverlay({ visible, onFadeComplete }) {
  return (
    <AnimatePresence onExitComplete={onFadeComplete}>
      {visible && (
        <motion.div
          className="logo-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="#/"
            className="logo-overlay-content"
            title="Back to HackaMate"
            style={{ textDecoration: "none", color: "inherit", cursor: "pointer", position: "relative" }}
          >
            {/* Icon springs in */}
            <motion.div
              className="logo-overlay-icon"
              initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.18 }}
            >
              <HexIcon size={68} />
            </motion.div>

            {/* Text slides in */}
            <div>
              <motion.span
                className="logo-overlay-text"
                initial={{ x: -24, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1], delay: 0.42 }}
              >
                Hacka<span className="logo-overlay-accent">Mate</span>
              </motion.span>

              {/* Tagline fades in after name */}
              <motion.div
                className="logo-overlay-tagline"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.85 }}
              >
                Connect &bull; Build &bull; Win
              </motion.div>
            </div>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LogoOverlay;
