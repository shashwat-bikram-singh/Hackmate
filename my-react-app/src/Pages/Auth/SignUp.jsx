import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import MascotScene from "./MascotScene.jsx";
import "./SignUp.css";

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

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

function CursorSVG() {
  return (
    <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
      <path d="M3 1L3 20L8 15.5L12.5 23.5L15.5 22L11 14L18.5 13L3 1Z"
        fill="white" stroke="#14161d" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}

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

export default function SignUp() {
  const [phase, setPhase]           = useState("loader");
  const [dotsClose, setDotsClose]   = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [dropped, setDropped]       = useState(false);
  const [assembled, setAssembled]   = useState(false);
  const [eyeState, setEyeState]     = useState("idle");

  const [name, setName]             = useState("");
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [confirmPw, setConfirmPw]   = useState("");
  const [showPw, setShowPw]         = useState(false);

  const [demoName, setDemoName]     = useState("");
  const [demoEmail, setDemoEmail]   = useState("");
  const [demoPw, setDemoPw]         = useState("");
  const [cursorPos, setCursorPos]   = useState({ x: -60, y: -60 });
  const [btnScale, setBtnScale]     = useState(1);
  const [loading, setLoading]       = useState(false);

  const timerRefs = useRef([]);
  const addTimer = (fn, ms) => { const t = setTimeout(fn, ms); timerRefs.current.push(t); return t; };
  const clearTimers = () => { timerRefs.current.forEach(clearTimeout); timerRefs.current = []; };

  const prefersReducedMotion = typeof window !== "undefined"
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const goInteractive = useCallback(() => {
    clearTimers();
    setPhase("interactive");
    setDropped(true);
    setAssembled(true);
    setFormVisible(true);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) { goInteractive(); return; }

    addTimer(() => setDotsClose(true), 1600);
    addTimer(() => { setPhase("reveal"); setFormVisible(true); }, 2200);
    addTimer(() => { setPhase("mascot-drop"); setDropped(true); }, 3400);
    addTimer(() => { setPhase("assembled"); setAssembled(true); setEyeState("idle"); }, 5600);
    addTimer(() => { setPhase("demo"); runDemo(); }, 7800);

    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function runDemo() {
    const NAME  = "Alex Chen";
    const EMAIL = "alex@hackmate.io";
    const PW    = "join@hack1";

    addTimer(() => { setCursorPos({ x: 140, y: 150 }); setEyeState("watching"); }, 300);
    NAME.split("").forEach((ch, i) => {
      addTimer(() => setDemoName(prev => prev + ch), 700 + i * 90);
    });

    const afterName = 700 + NAME.length * 90;
    addTimer(() => { setCursorPos({ x: 140, y: 220 }); }, afterName + 300);
    EMAIL.split("").forEach((ch, i) => {
      addTimer(() => setDemoEmail(prev => prev + ch), afterName + 700 + i * 85);
    });

    const afterEmail = afterName + 700 + EMAIL.length * 85;
    addTimer(() => { setCursorPos({ x: 140, y: 295 }); setEyeState("shy"); }, afterEmail + 300);
    PW.split("").forEach((_, i) => {
      addTimer(() => setDemoPw(prev => prev + "\u2022"), afterEmail + 700 + i * 80);
    });

    const afterPw = afterEmail + 700 + PW.length * 80;
    addTimer(() => { setCursorPos({ x: 160, y: 390 }); setBtnScale(1.04); setEyeState("watching"); }, afterPw + 600);
    addTimer(() => { setBtnScale(0.97); }, afterPw + 1000);
    addTimer(() => { setBtnScale(1); setLoading(true); }, afterPw + 1250);
    addTimer(() => { setLoading(false); goInteractive(); }, afterPw + 2000);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => window.location.hash = "#/dashboard", 900);
  }

  const inDemo      = phase === "demo";
  const inLoader    = phase === "loader";
  const inReveal    = phase === "reveal" || phase === "mascot-drop" || phase === "assembled";
  const interactive = phase === "interactive";

  return (
    <div className="anim-root">
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

      <AnimatePresence>
        {inLoader && (
          <motion.div
            className="anim-loader"
            exit={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="anim-loader-dots">
              <motion.div className="anim-dot"
                animate={{ scale: [0.8, 1.2, 0.8], x: dotsClose ? 10 : 0 }}
                transition={{ scale: { duration: 0.9, repeat: Infinity, ease: "easeInOut" },
                              x: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
              />
              <motion.div className="anim-dot"
                animate={{ scale: [1.2, 0.8, 1.2], x: dotsClose ? -10 : 0 }}
                transition={{ scale: { duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0.15 },
                              x: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!interactive && (
        <button className={"anim-skip" + (inLoader ? "" : " dark")} onClick={goInteractive}>
          Skip &rarr;
        </button>
      )}

      <AnimatePresence>
        {(inReveal || inDemo || interactive) && (
          <motion.div
            className="anim-card"
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
          >
            <div className="anim-left">
              <MascotScene
                eyeState={eyeState}
                dropped={dropped}
                assembled={assembled}
              />
            </div>

            <div className="anim-right">
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
                  <h1 className="anim-heading">Join HackaMate!</h1>
                </FadeUp>

                <FadeUp delay={0.14} visible={formVisible}>
                  <p className="anim-subtext">Create your account and start building</p>
                </FadeUp>

                <FadeUp delay={0.19} visible={formVisible}>
                  <div className="anim-field">
                    <label className="anim-label">Full Name</label>
                    {interactive ? (
                      <input className="anim-input" type="text" value={name}
                        onChange={e => setName(e.target.value)}
                        onFocus={() => setEyeState("watching")}
                        onBlur={() => setEyeState("idle")}
                        placeholder="Your name" required />
                    ) : (
                      <input className="anim-input" type="text" readOnly value={demoName} tabIndex={-1} />
                    )}
                  </div>
                </FadeUp>

                <FadeUp delay={0.24} visible={formVisible}>
                  <div className="anim-field">
                    <label className="anim-label">Email</label>
                    {interactive ? (
                      <input className="anim-input" type="email" value={email}
                        onChange={e => setEmail(e.target.value)}
                        onFocus={() => setEyeState("watching")}
                        onBlur={() => setEyeState("idle")}
                        placeholder="you@example.com" required />
                    ) : (
                      <input className="anim-input" type="text" readOnly value={demoEmail} tabIndex={-1} />
                    )}
                  </div>
                </FadeUp>

                <FadeUp delay={0.29} visible={formVisible}>
                  <div className="anim-field">
                    <label className="anim-label">Password</label>
                    <div className="anim-pw-wrap">
                      {interactive ? (
                        <input className="anim-input" type={showPw ? "text" : "password"}
                          value={password} onChange={e => setPassword(e.target.value)}
                          onFocus={() => setEyeState("shy")}
                          onBlur={() => setEyeState("idle")}
                          style={{ paddingRight: 32 }} required />
                      ) : (
                        <input className="anim-input" type="password" readOnly
                          value={demoPw} style={{ paddingRight: 32 }} tabIndex={-1} />
                      )}
                      {interactive && (
                        <button type="button" className="anim-eye-btn" onClick={() => setShowPw(v => !v)}>
                          <EyeIcon open={showPw} />
                        </button>
                      )}
                    </div>
                  </div>
                </FadeUp>

                {interactive && (
                  <div className="anim-field">
                    <label className="anim-label">Confirm Password</label>
                    <input className="anim-input" type="password"
                      value={confirmPw} onChange={e => setConfirmPw(e.target.value)}
                      onFocus={() => setEyeState("shy")}
                      onBlur={() => setEyeState("idle")}
                      required />
                  </div>
                )}

                <FadeUp delay={0.35} visible={formVisible}>
                  <motion.button
                    className="anim-btn-primary"
                    animate={{ scale: btnScale }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    onClick={interactive ? handleSubmit : undefined}
                    type={interactive ? "submit" : "button"}
                    style={{ marginTop: 8 }}
                  >
                    {loading ? "Creating account…" : "Create Account"}
                  </motion.button>
                </FadeUp>

                <FadeUp delay={0.41} visible={formVisible}>
                  <button className="anim-btn-secondary" type="button">
                    <GitHubIcon /> Sign up with GitHub
                  </button>
                </FadeUp>

                <FadeUp delay={0.47} visible={formVisible}>
                  <p className="anim-footer">
                    Already have an account? <a href="#/login">Log in</a>
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
