import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import MascotScene from "./MascotScene.jsx";
import "./SignIn.css";

/* ── Sparkle logomark ── */
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

/* ── Eye icon ── */
function EyeIcon({ open }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

/* ── GitHub icon ── */
function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

/* ── Virtual cursor SVG ── */
function CursorSVG() {
  return (
    <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
      <path d="M3 1L3 20L8 15.5L12.5 23.5L15.5 22L11 14L18.5 13L3 1Z"
        fill="white" stroke="#14161d" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}

/* ── Stagger fade-up wrapper for form elements ── */
function FadeUp({ children, delay, visible }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ════════════════════════════════════
   MAIN SIGNIN COMPONENT
   ════════════════════════════════════ */
export default function SignIn() {
  /* phases: loader → reveal → mascot-drop → assembled → demo → interactive */
  const [phase, setPhase]           = useState("loader");
  const [dotsClose, setDotsClose]   = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [dropped, setDropped]       = useState(false);
  const [assembled, setAssembled]   = useState(false);
  const [eyeState, setEyeState]     = useState("idle");

  /* form real state */
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [showPw, setShowPw]         = useState(false);
  const [remember, setRemember]     = useState(false);

  /* demo state */
  const [demoEmail, setDemoEmail]   = useState("");
  const [demoPw, setDemoPw]         = useState("");
  const [showDemoPw, setShowDemoPw] = useState(false);
  const [cursorPos, setCursorPos]   = useState({ x: -60, y: -60 });
  const [btnScale, setBtnScale]     = useState(1);
  const [loading, setLoading]       = useState(false);

  const timerRefs = useRef([]);
  const addTimer = (fn, ms) => { const t = setTimeout(fn, ms); timerRefs.current.push(t); return t; };

  const clearTimers = () => { timerRefs.current.forEach(clearTimeout); timerRefs.current = []; };

  /* reduced motion — skip straight to interactive */
  const prefersReducedMotion = typeof window !== "undefined"
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const goInteractive = useCallback(() => {
    clearTimers();
    setPhase("interactive");
    setDropped(true);
    setAssembled(true);
    setFormVisible(true);
  }, []);

  /* ── timeline ── */
  useEffect(() => {
    if (prefersReducedMotion) { goInteractive(); return; }

    /* loader dots close (1.6s) */
    addTimer(() => setDotsClose(true), 1600);
    /* reveal card (2.2s) */
    addTimer(() => { setPhase("reveal"); setFormVisible(true); }, 2200);
    /* mascot drop (3.4s) */
    addTimer(() => { setPhase("mascot-drop"); setDropped(true); }, 3400);
    /* assembly (5.6s) */
    addTimer(() => { setPhase("assembled"); setAssembled(true); setEyeState("idle"); }, 5600);
    /* start demo (7.8s) */
    addTimer(() => { setPhase("demo"); runDemo(); }, 7800);

    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── demo sequence ── */
  function runDemo() {
    const EMAIL = "team@hackmate.io";
    const PW    = "hackm@te1";

    /* cursor to email field */
    addTimer(() => { setCursorPos({ x: 140, y: 180 }); setEyeState("watching"); }, 400);

    /* type email */
    EMAIL.split("").forEach((ch, i) => {
      addTimer(() => setDemoEmail(prev => prev + ch), 800 + i * 95);
    });

    /* cursor to password */
    addTimer(() => { setCursorPos({ x: 140, y: 260 }); setEyeState("shy"); }, 800 + EMAIL.length * 95 + 400);

    /* type password (show as dots) */
    PW.split("").forEach((_, i) => {
      addTimer(() => setDemoPw(prev => prev + "\u2022"), 800 + EMAIL.length * 95 + 900 + i * 80);
    });

    /* cursor to eye icon — reveal pw */
    const afterPw = 800 + EMAIL.length * 95 + 900 + PW.length * 80;
    addTimer(() => { setCursorPos({ x: 310, y: 260 }); setEyeState("watching"); }, afterPw + 500);
    addTimer(() => { setShowDemoPw(true); setDemoPw(PW); }, afterPw + 900);
    addTimer(() => { setShowDemoPw(false); setDemoPw("\u2022".repeat(PW.length)); }, afterPw + 1600);

    /* cursor to login button */
    addTimer(() => { setCursorPos({ x: 160, y: 350 }); setBtnScale(1.04); }, afterPw + 2000);
    addTimer(() => { setBtnScale(0.97); }, afterPw + 2400);
    addTimer(() => { setBtnScale(1); setLoading(true); }, afterPw + 2650);
    addTimer(() => { setLoading(false); goInteractive(); }, afterPw + 3400);
  }

  /* ── real form submit ── */
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => window.location.hash = "#/dashboard", 900);
  }

  const inDemo     = phase === "demo";
  const inLoader   = phase === "loader";
  const inReveal   = phase === "reveal" || phase === "mascot-drop" || phase === "assembled";
  const interactive = phase === "interactive";

  return (
    <div className="anim-root">
      {/* SVG goo filter for loader */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur"/>
            <feColorMatrix in="blur" mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" result="goo"/>
            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
          </filter>
        </defs>
      </svg>

      {/* ── LOADER OVERLAY ── */}
      <AnimatePresence>
        {inLoader && (
          <motion.div
            className="anim-loader"
            exit={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="anim-loader-dots">
              <motion.div
                className="anim-dot"
                animate={{ scale: [0.8, 1.2, 0.8], x: dotsClose ? 10 : 0 }}
                transition={{ scale: { duration: 0.9, repeat: Infinity, ease: "easeInOut" },
                              x: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
              />
              <motion.div
                className="anim-dot"
                animate={{ scale: [1.2, 0.8, 1.2], x: dotsClose ? -10 : 0 }}
                transition={{ scale: { duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0.15 },
                              x: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SKIP BUTTON (shown during animation phases) ── */}
      {!interactive && (
        <button className={"anim-skip" + (inLoader ? "" : " dark")} onClick={goInteractive}>
          Skip &rarr;
        </button>
      )}

      {/* ── SPLIT CARD ── */}
      <AnimatePresence>
        {(inReveal || inDemo || interactive) && (
          <motion.div
            className="anim-card"
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
          >
            {/* LEFT — mascot panel */}
            <div className="anim-left">
              <MascotScene
                eyeState={interactive ? eyeState : (inDemo ? eyeState : (assembled ? "idle" : "idle"))}
                dropped={dropped}
                assembled={assembled}
              />
            </div>

            {/* RIGHT — form panel */}
            <div className="anim-right">
              {/* Demo cursor */}
              {inDemo && (
                <motion.div
                  className="anim-cursor"
                  animate={{ x: cursorPos.x, y: cursorPos.y }}
                  transition={{ type: "spring", stiffness: 160, damping: 22 }}
                >
                  <CursorSVG />
                </motion.div>
              )}

              <div className="anim-form-inner">
                <FadeUp delay={0} visible={formVisible}><Sparkle /></FadeUp>

                <FadeUp delay={0.08} visible={formVisible}>
                  <h1 className="anim-heading">Welcome back!</h1>
                </FadeUp>

                <FadeUp delay={0.14} visible={formVisible}>
                  <p className="anim-subtext">Please enter your details</p>
                </FadeUp>

                {/* ── Email field ── */}
                <FadeUp delay={0.2} visible={formVisible}>
                  <div className="anim-field">
                    <label className="anim-label">Email</label>
                    {interactive ? (
                      <input
                        className="anim-input"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onFocus={() => setEyeState("watching")}
                        onBlur={() => setEyeState("idle")}
                        placeholder="you@example.com"
                        required
                      />
                    ) : (
                      <div style={{ position: "relative" }}>
                        <input className="anim-input" type="text" readOnly value={demoEmail} tabIndex={-1} />
                      </div>
                    )}
                  </div>
                </FadeUp>

                {/* ── Password field ── */}
                <FadeUp delay={0.26} visible={formVisible}>
                  <div className="anim-field">
                    <label className="anim-label">Password</label>
                    <div className="anim-pw-wrap">
                      {interactive ? (
                        <input
                          className="anim-input"
                          type={showPw ? "text" : "password"}
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          onFocus={() => setEyeState("shy")}
                          onBlur={() => setEyeState("idle")}
                          style={{ paddingRight: 32 }}
                          required
                        />
                      ) : (
                        <input
                          className="anim-input"
                          type={showDemoPw ? "text" : "password"}
                          readOnly
                          value={showDemoPw ? demoPw : demoPw.replace(/./g, "\u2022")}
                          style={{ paddingRight: 32 }}
                          tabIndex={-1}
                        />
                      )}
                      <button
                        type="button"
                        className="anim-eye-btn"
                        onClick={() => interactive && setShowPw(v => !v)}
                        tabIndex={interactive ? 0 : -1}
                      >
                        <EyeIcon open={interactive ? showPw : showDemoPw} />
                      </button>
                    </div>
                  </div>
                </FadeUp>

                {/* ── Remember + forgot ── */}
                <FadeUp delay={0.32} visible={formVisible}>
                  <div className="anim-check-row">
                    <label>
                      <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
                      Remember for 30 days
                    </label>
                    <a href="#/" className="anim-forgot">Forgot password?</a>
                  </div>
                </FadeUp>

                {/* ── Login button ── */}
                <FadeUp delay={0.38} visible={formVisible}>
                  <motion.button
                    className="anim-btn-primary"
                    animate={{ scale: btnScale }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    onClick={interactive ? handleSubmit : undefined}
                    type={interactive ? "submit" : "button"}
                  >
                    {loading ? "Logging in…" : "Log In"}
                  </motion.button>
                </FadeUp>

                {/* ── GitHub button ── */}
                <FadeUp delay={0.44} visible={formVisible}>
                  <button className="anim-btn-secondary" type="button">
                    <GitHubIcon /> Continue with GitHub
                  </button>
                </FadeUp>

                {/* ── Footer ── */}
                <FadeUp delay={0.5} visible={formVisible}>
                  <p className="anim-footer">
                    Don&apos;t have an account? <a href="#/signup">Sign Up</a>
                  </p>
                </FadeUp>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
