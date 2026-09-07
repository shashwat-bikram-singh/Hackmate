import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import MascotScene from "./MascotScene.jsx";
import SaveToggle from "../../Components/AuthToggle/SaveToggle.jsx";
import "./SignUp.css";

/* ── 4-point geometric sparkle icon matching reference ── */
function Sparkle({ size = 26 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="#14161d"
      className="anim-sparkle"
    >
      <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
    </svg>
  );
}

/* ── Google Multi-color G Icon ── */
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

/* ── Eye Toggle Icon ── */
function EyeIcon({ open }) {
  if (open) {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function FadeUp({ children, delay, show }) {
  if (!show) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay }}
      style={{ width: "100%" }}
    >
      {children}
    </motion.div>
  );
}

export default function SignUp() {
  const [phase, setPhase] = useState("loader");
  const timers = useRef([]);

  const later = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
  };

  const killTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Validation States
  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);

  // Mascot Animation States
  const [eyeState, setEyeState] = useState("idle");
  const [dropped, setDropped] = useState(false);
  const [assembled, setAssembled] = useState(false);
  const [dotsClose, setDotsClose] = useState(false);
  // Which password-type field is focused ("password" | "confirm" | null).
  // Confirm Password is always masked, so only the main password can "peek".
  const [focusedField, setFocusedField] = useState(null);

  const peek = focusedField === "password" && showPw;

  // Validation logic
  const isEmailValid = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const isPasswordValid = (val) => val.length >= 6;

  const nameError = nameTouched && !name ? "Name is required" : "";
  const emailError =
    emailTouched && (!email ? "Email is required" : !isEmailValid(email) ? "Please enter a valid email" : "");
  const passwordError =
    passwordTouched && (!password ? "Password is required" : !isPasswordValid(password) ? "Password must be at least 6 characters" : "");
  const confirmError =
    confirmTouched && (!confirmPw ? "Confirm your password" : confirmPw !== password ? "Passwords do not match" : "");

  const hasError = Boolean(nameError || emailError || passwordError || confirmError);
  const formStatus = hasError ? "error" : name && email && password && confirmPw ? "valid" : "neutral";

  function skip() {
    killTimers();
    setPhase("interactive");
    setDropped(true);
    setAssembled(true);
    setEyeState("idle");
  }

  useEffect(() => {
    later(() => setDotsClose(true), 1300);
    later(() => setPhase("reveal"), 1900);
    later(() => {
      setDropped(true);
    }, 2500);
    later(() => {
      setAssembled(true);
      setEyeState("idle");
      setPhase("interactive");
    }, 3800);

    return killTimers;
  }, []);

  function handleSubmit(e) {
    if (e) e.preventDefault();
    setNameTouched(true);
    setEmailTouched(true);
    setPasswordTouched(true);
    setConfirmTouched(true);

    if (
      !name ||
      !email ||
      !isEmailValid(email) ||
      !password ||
      !isPasswordValid(password) ||
      confirmPw !== password
    ) {
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      window.location.hash = "#/dashboard";
    }, 750);
  }

  const showLoader = phase === "loader";
  const showCard = phase !== "loader";
  const isLive = phase === "interactive";

  return (
    <div className="anim-root">
      {/* SVG filter for gooey dots merge */}
      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Phase 0 & 1: Full-bleed Violet Loader */}
      <AnimatePresence>
        {showLoader && (
          <motion.div
            key="loader"
            className="anim-loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="anim-loader-dots">
              <motion.div
                className="anim-dot"
                animate={{
                  scale: [0.85, 1.2, 0.85],
                  x: dotsClose ? 10 : 0,
                }}
                transition={{
                  scale: { duration: 0.85, repeat: Infinity, ease: "easeInOut" },
                  x: { duration: 0.45, ease: "easeInOut" },
                }}
              />
              <motion.div
                className="anim-dot"
                animate={{
                  scale: [1.2, 0.85, 1.2],
                  x: dotsClose ? -10 : 0,
                }}
                transition={{
                  scale: { duration: 0.85, repeat: Infinity, ease: "easeInOut", delay: 0.12 },
                  x: { duration: 0.45, ease: "easeInOut" },
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLive && (
        <button
          className={`anim-skip ${showLoader ? "" : "dark"}`}
          onClick={skip}
          title="Skip intro"
        >
          Skip &rarr;
        </button>
      )}

      {showCard && (
        <motion.div
          className="anim-card"
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
        >
          {/* LEFT PANEL: Light-gray Illustration Zone with Mascots */}
          <div className="anim-left">
            <MascotScene
              eyeState={eyeState}
              formStatus={formStatus}
              dropped={dropped}
              assembled={assembled}
              peek={peek}
            />
          </div>

          {/* RIGHT PANEL: White Form Panel */}
          <div className="anim-right">
            <div className="anim-form-inner">
              {/* Sparkle Brand Mark */}
              <FadeUp delay={0} show={showCard}>
                <div className="anim-sparkle-wrap">
                  <Sparkle size={28} />
                </div>
              </FadeUp>

              {/* Headings */}
              <FadeUp delay={0.06} show={showCard}>
                <h1 className="anim-heading">Join HackaMate!</h1>
              </FadeUp>
              <FadeUp delay={0.12} show={showCard}>
                <p className="anim-subtext">Create your account to start matching</p>
              </FadeUp>

              {/* SignUp Form */}
              <form className="anim-form" onSubmit={handleSubmit} noValidate>
                {/* Full Name */}
                <FadeUp delay={0.16} show={showCard}>
                  <div className={`anim-field ${nameError ? "has-error" : ""}`}>
                    <label className="anim-label" htmlFor="signup-name">
                      Full Name
                    </label>
                    <input
                      id="signup-name"
                      className="anim-input"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (nameTouched) setNameTouched(true);
                      }}
                      onFocus={() => {
                        setEyeState("watching");
                        setFocusedField(null);
                      }}
                      onBlur={() => {
                        setNameTouched(true);
                        setEyeState("idle");
                      }}
                      placeholder="Alex Chen"
                      required
                      autoComplete="name"
                    />
                    {nameError && (
                      <div className="anim-error-text">{nameError}</div>
                    )}
                  </div>
                </FadeUp>

                {/* Email Field */}
                <FadeUp delay={0.2} show={showCard}>
                  <div className={`anim-field ${emailError ? "has-error" : ""}`}>
                    <label className="anim-label" htmlFor="signup-email">
                      Email
                    </label>
                    <input
                      id="signup-email"
                      className="anim-input"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailTouched) setEmailTouched(true);
                      }}
                      onFocus={() => {
                        setEyeState("watching");
                        setFocusedField(null);
                      }}
                      onBlur={() => {
                        setEmailTouched(true);
                        setEyeState("idle");
                      }}
                      placeholder="alex@gmail.com"
                      required
                      autoComplete="email"
                    />
                    {emailError && (
                      <div className="anim-error-text">{emailError}</div>
                    )}
                  </div>
                </FadeUp>

                {/* Password Field */}
                <FadeUp delay={0.24} show={showCard}>
                  <div className={`anim-field ${passwordError ? "has-error" : ""}`}>
                    <label className="anim-label" htmlFor="signup-password">
                      Password
                    </label>
                    <div className="anim-pw-wrap">
                      <input
                        id="signup-password"
                        className="anim-input"
                        type={showPw ? "text" : "password"}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (passwordTouched) setPasswordTouched(true);
                        }}
                        onFocus={() => {
                          setEyeState("shy");
                          setFocusedField("password");
                        }}
                        onBlur={() => {
                          setPasswordTouched(true);
                          setEyeState("idle");
                          setFocusedField(null);
                        }}
                        style={{ paddingRight: 32 }}
                        placeholder="••••••••••••"
                        required
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="anim-eye-btn"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setShowPw((v) => !v)}
                        aria-label={showPw ? "Hide password" : "Show password"}
                      >
                        <EyeIcon open={showPw} />
                      </button>
                    </div>
                    {passwordError && (
                      <div className="anim-error-text">{passwordError}</div>
                    )}
                  </div>
                </FadeUp>

                {/* Confirm Password Field */}
                <FadeUp delay={0.28} show={showCard}>
                  <div className={`anim-field ${confirmError ? "has-error" : ""}`}>
                    <label className="anim-label" htmlFor="signup-confirm">
                      Confirm Password
                    </label>
                    <input
                      id="signup-confirm"
                      className="anim-input"
                      type="password"
                      value={confirmPw}
                      onChange={(e) => {
                        setConfirmPw(e.target.value);
                        if (confirmTouched) setConfirmTouched(true);
                      }}
                      onFocus={() => {
                        setEyeState("shy");
                        setFocusedField("confirm");
                      }}
                      onBlur={() => {
                        setConfirmTouched(true);
                        setEyeState("idle");
                        setFocusedField(null);
                      }}
                      placeholder="••••••••••••"
                      required
                      autoComplete="new-password"
                    />
                    {confirmError && (
                      <div className="anim-error-text">{confirmError}</div>
                    )}
                  </div>
                </FadeUp>

                {/* SaveToggle Pop Up Button */}
                <FadeUp delay={0.32} show={showCard}>
                  <div style={{ display: "flex", justifyContent: "center", width: "100%", margin: "8px 0 12px" }}>
                    <SaveToggle
                      size="md"
                      idleText="Create account"
                      savedText="Account created!"
                      loadingDuration={950}
                      successDuration={750}
                      onComplete={() => {
                        window.location.hash = "#/dashboard";
                      }}
                    />
                  </div>
                </FadeUp>

                {/* Google Sign Up */}
                <FadeUp delay={0.36} show={showCard}>
                  <button
                    className="anim-btn-secondary"
                    type="button"
                    onClick={() => {
                      setSubmitting(true);
                      setTimeout(() => {
                        window.location.hash = "#/dashboard";
                      }, 500);
                    }}
                  >
                    <GoogleIcon /> Sign up with Google
                  </button>
                </FadeUp>

                {/* Footer Line */}
                <FadeUp delay={0.4} show={showCard}>
                  <p className="anim-footer">
                    Already have an account? <a href="#/login">Log in</a>
                  </p>
                </FadeUp>
              </form>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
