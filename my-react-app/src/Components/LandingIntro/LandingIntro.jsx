import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import "./LandingIntro.css";

/*
  LandingIntro — branded preloader curtain wipe matching the Xurya reference.
  Sequence (~1.3s):
    1. Dark (--panel) full-screen curtain overlay.
    2. Brand mark pops in with spring rotation, followed by HackaMate wordmark.
    3. Gradient progress bar grows across with a numeric percentage counter (0% -> 100%).
    4. Smooth shutter wipe upward to reveal the page and trigger the Hero entrance choreography.
*/

function Counter({ duration = 950 }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let start = null;
    let animId;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * 100));
      if (progress < 1) {
        animId = requestAnimationFrame(step);
      }
    };
    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [duration]);

  return <span className="hm-intro-counter">{val}%</span>;
}

export default function LandingIntro({ onFinish }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(true);
  const finishedRef = useRef(false);

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    if (typeof onFinish === "function") onFinish();
  };

  useEffect(() => {
    if (reduce) {
      finish();
      return;
    }
    // Hold on the logo/counter, then begin the shutter wipe-up exit
    const t = setTimeout(() => setOpen(false), 1150);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  if (reduce) return null;

  return (
    <motion.div
      className="hm-intro"
      initial={{ y: 0 }}
      animate={open ? { y: 0 } : { y: "-100%" }}
      transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (!open) finish();
      }}
      aria-hidden="true"
    >
      <div className="hm-intro-lockup">
        <motion.span
          className="hm-intro-mark"
          initial={{ scale: 0, rotate: -40, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 240, damping: 15, delay: 0.05 }}
        >
          <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
            <path
              d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z"
              fill="#fff"
            />
          </svg>
        </motion.span>

        <motion.span
          className="hm-intro-word logo"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
        >
          Hacka<span className="logo-accent hm-intro-accent">Mate</span>
        </motion.span>
      </div>

      <div className="hm-intro-progress-wrap">
        <motion.span
          className="hm-intro-bar"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        />
        <Counter duration={950} />
      </div>
    </motion.div>
  );
}
