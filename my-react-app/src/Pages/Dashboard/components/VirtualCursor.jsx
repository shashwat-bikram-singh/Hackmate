import React from 'react';
import { motion } from 'motion/react';
import './VirtualCursor.css';

/**
 * VirtualCursor — animated SVG cursor that floats over the canvas.
 *
 * Props:
 * - x: number — x position (px, relative to viewport)
 * - y: number — y position (px, relative to viewport)
 * - visible: boolean
 * - clicking: boolean — shows click ripple
 */
function VirtualCursor({ x, y, visible, clicking }) {
  if (!visible) return null;

  return (
    <motion.div
      className="virtual-cursor"
      animate={{ x, y }}
      transition={{
        type: 'spring',
        stiffness: 120,
        damping: 25,
        mass: 0.8,
      }}
    >
      {/* macOS-style cursor arrow */}
      <svg
        width="24"
        height="28"
        viewBox="0 0 24 28"
        fill="none"
        className="virtual-cursor-svg"
      >
        <path
          d="M4 1L4 21.5L9.5 16.5L14 25L17 23.5L12.5 15L20 14L4 1Z"
          fill="#ffffff"
          stroke="#14161d"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>

      {/* Click ripple */}
      {clicking && (
        <motion.div
          className="virtual-cursor-ripple"
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      )}
    </motion.div>
  );
}

export default VirtualCursor;
