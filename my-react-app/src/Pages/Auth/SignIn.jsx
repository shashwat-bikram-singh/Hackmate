import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import MascotScene from "./MascotScene.jsx";
import "./SignIn.css";

function Sparkle() {
  return (
    <svg className="anim-sparkle" width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16 2 L16 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <path d="M2 16 L30 16" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <path d="M7 7 L25 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M25 7 L7 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function EyeIcon({ open }) {
  if (open) return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

function FadeUp({ children, delay, show }) {
  if (!show) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export default function SignIn() {
  const [phase, setPhase] = useState("loader");
  const timers = useRef([]);
  const later = (fn, ms) => { const id = setTimeout(fn, ms); timers.current.push(id); };
  const killTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [remember, setRemember] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [eyeState, setEyeState]   = useState("idle");
  const [dropped, setDropped]     = useState(false);
  const [assembled, setAssembled] = useState(false);
  const [dotsClose, setDotsClose] = useState(false);

  function skip() {
    killTimers();
    setPhase("interactive");
    setDropped(true);
    setAssembled(true);
    setEyeState("idle");
  }

  useEffect(() => {
    later(() => setDotsClose(true), 1500);
    later(() => setPhase("reveal"), 2200);
    later(() => { setDropped(true); }, 3400);
    later(() => { setAssembled(true); setEyeState("idle"); }, 5200);
    later(() => setPhase("interactive"), 6500);
    return killTimers;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => { window.location.hash = "#/dashboard"; }, 800);
  }

  const showLoader = phase === "loader";
  const showCard   = phase !== "loader";
  const isLive     = phase === "interactive";

  return (
    <div className="anim-root">
      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur"/>
            <feColorMatrix in="blur" mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" result="goo"/>
            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
          </filter>
        </defs>
      </svg>

      <AnimatePresence>
        {showLoader && (
          <motion.div key="loader" className="anim-loader"
            exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
            <div className="anim-loader-dots">
              <motion.div className="anim-dot"
                animate={{ scale: [0.8, 1.15, 0.8], x: dotsClose ? 10 : 0 }}
                transition={{ scale: { duration: 0.85, repeat: Infinity, ease: "easeInOut" },
                              x: { duration: 0.45, ease: "easeInOut" } }} />
              <motion.div className="anim-dot"
                animate={{ scale: [1.15, 0.8, 1.15], x: dotsClose ? -10 : 0 }}
                transition={{ scale: { duration: 0.85, repeat: Infinity, ease: "easeInOut", delay: 0.12 },
                              x: { duration: 0.45, ease: "easeInOut" } }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLive && (
        <button className={"anim-skip" + (showLoader ? "" : " dark")} onClick={skip}>Skip &rarr;</button>
      )}

      {showCard && (
        <motion.div className="anim-card"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}>

          <div className="anim-left">
            <MascotScene eyeState={eyeState} dropped={dropped} assembled={assembled} />
          </div>

          <div className="anim-right">
            <div className="anim-form-inner">
              <FadeUp delay={0} show={showCard}><Sparkle /></FadeUp>
              <FadeUp delay={0.08} show={showCard}><h1 className="anim-heading">Welcome back!</h1></FadeUp>
              <FadeUp delay={0.14} show={showCard}><p className="anim-subtext">Please enter your details</p></FadeUp>

              <FadeUp delay={0.2} show={showCard}>
                <div className="anim-field">
                  <label className="anim-label">Email</label>
                  <input className="anim-input" type="email" value={email}
                    onChange={e => setEmail(e.target.value)}
                    onFocus={() => setEyeState("watching")}
                    onBlur={() => setEyeState("idle")}
                    placeholder="you@example.com" required />
                </div>
              </FadeUp>

              <FadeUp delay={0.26} show={showCard}>
                <div className="anim-field">
                  <label className="anim-label">Password</label>
                  <div className="anim-pw-wrap">
                    <input className="anim-input" type={showPw ? "text" : "password"}
                      value={password} onChange={e => setPassword(e.target.value)}
                      onFocus={() => setEyeState("shy")}
                      onBlur={() => setEyeState("idle")}
                      style={{ paddingRight: 32 }} required />
                    <button type="button" className="anim-eye-btn" onClick={() => setShowPw(v => !v)}>
                      <EyeIcon open={showPw} />
                    </button>
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={0.32} show={showCard}>
                <div className="anim-check-row">
                  <label><input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} /> Remember for 30 days</label>
                  <a href="#/" className="anim-forgot">Forgot password?</a>
                </div>
              </FadeUp>

              <FadeUp delay={0.38} show={showCard}>
                <button className="anim-btn-primary" onClick={handleSubmit} type="button">
                  {submitting ? "Logging in\u2026" : "Log In"}
                </button>
              </FadeUp>

              <FadeUp delay={0.44} show={showCard}>
                <button className="anim-btn-secondary" type="button">
                  <GitHubIcon /> Continue with GitHub
                </button>
              </FadeUp>

              <FadeUp delay={0.5} show={showCard}>
                <p className="anim-footer">Don&apos;t have an account? <a href="#/signup">Sign Up</a></p>
              </FadeUp>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
