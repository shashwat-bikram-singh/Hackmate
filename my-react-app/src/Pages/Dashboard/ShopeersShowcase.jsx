import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import "./ShopeersShowcase.css";

/* ─── Blue Geometric Polygon Icon (Shopeers Brandmark) ─── */
function ShopeersPolygonIcon({ size = 42 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className="shopeers-polygon-icon">
      <path
        d="M24 2L44 13.5V34.5L24 46L4 34.5V13.5L24 2Z"
        fill="#2563EB"
      />
      <path
        d="M24 10L36 17V31L24 38L12 31V17L24 10Z"
        fill="#ffffff"
        opacity="0.28"
      />
      <path
        d="M24 16L30 19.5V28.5L24 32L18 28.5V19.5L24 16Z"
        fill="#ffffff"
        opacity="0.65"
      />
    </svg>
  );
}

/* ─── Smooth Number Ticker Hook (Phase 6 Roll-Up) ─── */
function useTicker(targetNumber, startAnimation, duration = 1400) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!startAnimation) {
      setVal(0);
      return;
    }
    let startTime = null;
    let rafId = null;

    const tick = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(ease * targetNumber));

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [targetNumber, startAnimation, duration]);

  return val;
}

const TIMELINE_STEPS = [
  { id: "logo", label: "1. Logo Intro", time: 0 },
  { id: "pan", label: "2. Canvas Pan", time: 2000 },
  { id: "chart", label: "3. Chart Scrubber", time: 5000 },
  { id: "ai", label: "4. AI Assistant", time: 8000 },
  { id: "drawer", label: "5. Add Widget", time: 11000 },
  { id: "settle", label: "6. Full Layout", time: 15000 },
];

export default function ShopeersShowcase() {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [showLogoOverlay, setShowLogoOverlay] = useState(true);

  const [camera, setCamera] = useState({
    x: -80,
    y: -40,
    scale: 1.75,
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1],
  });

  const [cursor, setCursor] = useState({
    x: 600,
    y: 800,
    visible: false,
    scale: 1,
    clicking: false,
  });

  const [showChartGuide, setShowChartGuide] = useState(false);
  const [showChartTooltip, setShowChartTooltip] = useState(false);
  const [aiInputFocused, setAiInputFocused] = useState(false);
  const [showAiChips, setShowAiChips] = useState(false);
  const [addBtnClicked, setAddBtnClicked] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [draggingTemplate, setDraggingTemplate] = useState(false);
  const [startCounterRollup, setStartCounterRollup] = useState(false);

  const timers = useRef([]);
  const addTimer = (fn, ms) => {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
    return t;
  };

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const pageViews = useTicker(16431, startCounterRollup, 1300);
  const visitors = useTicker(6225, startCounterRollup, 1300);
  const clicks = useTicker(2832, startCounterRollup, 1300);
  const orders = useTicker(1224, startCounterRollup, 1300);

  const playShowcase = useCallback(() => {
    clearTimers();
    setShowLogoOverlay(true);
    setShowChartGuide(false);
    setShowChartTooltip(false);
    setAiInputFocused(false);
    setShowAiChips(false);
    setAddBtnClicked(false);
    setDrawerOpen(false);
    setDraggingTemplate(false);
    setStartCounterRollup(false);
    setCursor({ x: 800, y: 700, visible: false, scale: 1, clicking: false });

    setCamera({
      x: -120,
      y: -60,
      scale: 1.75,
      duration: 0.1,
      ease: "linear",
    });

    // Phase 1: Logo Intro (0:00 – 0:02)
    setCurrentStepIdx(0);
    addTimer(() => {
      setShowLogoOverlay(false);
    }, 1800);

    // Phase 2: Magnified Canvas Entry & Pan (0:02 – 0:05)
    addTimer(() => {
      setCurrentStepIdx(1);
      setCamera({
        x: -140,
        y: -90,
        scale: 1.75,
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      });
    }, 2000);

    addTimer(() => {
      setCamera({
        x: -440,
        y: -90,
        scale: 1.75,
        duration: 2.2,
        ease: "easeInOut",
      });
    }, 3200);

    // Phase 3: Chart Scrubber Interaction (0:05 – 0:08)
    addTimer(() => {
      setCurrentStepIdx(2);
      setCamera({
        x: -240,
        y: -140,
        scale: 1.75,
        duration: 1.1,
        ease: [0.22, 1, 0.36, 1],
      });
      setCursor({
        x: 680,
        y: 620,
        visible: true,
        scale: 1,
        clicking: false,
      });
    }, 5000);

    addTimer(() => {
      setCursor({
        x: 524,
        y: 350,
        visible: true,
        scale: 1,
        clicking: false,
      });
    }, 5800);

    addTimer(() => {
      setShowChartGuide(true);
      setShowChartTooltip(true);
    }, 6400);

    // Phase 4: AI Assistant Interaction (0:08 – 0:11)
    addTimer(() => {
      setCurrentStepIdx(3);
      setShowChartGuide(false);
      setShowChartTooltip(false);
      setCamera({
        x: -210,
        y: -390,
        scale: 1.75,
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      });
      setCursor({
        x: 440,
        y: 680,
        visible: true,
        scale: 1,
        clicking: false,
      });
    }, 8000);

    addTimer(() => {
      setCursor({
        x: 440,
        y: 680,
        visible: true,
        scale: 0.92,
        clicking: true,
      });
      setAiInputFocused(true);
    }, 9100);

    addTimer(() => {
      setCursor((prev) => ({ ...prev, scale: 1, clicking: false }));
      setShowAiChips(true);
    }, 9400);

    // Phase 5: Add Widget Drawer & Drag (0:11 – 0:15)
    addTimer(() => {
      setCurrentStepIdx(4);
      setCamera({
        x: -580,
        y: 0,
        scale: 1.75,
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      });
      setCursor({
        x: 1205,
        y: 38,
        visible: true,
        scale: 1,
        clicking: false,
      });
    }, 11000);

    addTimer(() => {
      setCursor({
        x: 1205,
        y: 38,
        visible: true,
        scale: 0.92,
        clicking: true,
      });
      setAddBtnClicked(true);
    }, 12100);

    addTimer(() => {
      setAddBtnClicked(false);
      setDrawerOpen(true);
      setCursor((prev) => ({ ...prev, scale: 1, clicking: false }));
    }, 12400);

    addTimer(() => {
      setCursor({
        x: 1200,
        y: 220,
        visible: true,
        scale: 1,
        clicking: false,
      });
    }, 13100);

    addTimer(() => {
      setCursor({
        x: 1165,
        y: 220,
        visible: true,
        scale: 0.94,
        clicking: true,
      });
      setDraggingTemplate(true);
    }, 13700);

    addTimer(() => {
      setCursor((prev) => ({ ...prev, scale: 1, clicking: false }));
      setDraggingTemplate(false);
    }, 14500);

    // Phase 6: Canvas Pull-Back & KPI Counter Roll-Up (0:15 – 0:18)
    addTimer(() => {
      setCurrentStepIdx(5);
      setDrawerOpen(false);
      setCamera({
        x: 0,
        y: 0,
        scale: 1.0,
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      });
      setCursor((prev) => ({ ...prev, visible: false }));
    }, 15000);

    addTimer(() => {
      setStartCounterRollup(true);
    }, 15800);
  }, []);

  useEffect(() => {
    playShowcase();
    return clearTimers;
  }, [playShowcase]);

  const skipToInteractive = () => {
    clearTimers();
    setCurrentStepIdx(5);
    setShowLogoOverlay(false);
    setShowChartGuide(false);
    setShowChartTooltip(false);
    setDrawerOpen(false);
    setDraggingTemplate(false);
    setShowAiChips(true);
    setAiInputFocused(false);
    setCursor((prev) => ({ ...prev, visible: false }));
    setCamera({
      x: 0,
      y: 0,
      scale: 1.0,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    });
    setStartCounterRollup(true);
  };

  const jumpToStep = (index) => {
    if (index === 0) playShowcase();
    else if (index === 1) {
      clearTimers();
      setCurrentStepIdx(1);
      setShowLogoOverlay(false);
      setCamera({ x: -140, y: -90, scale: 1.75, duration: 0.8, ease: "easeOut" });
    } else if (index === 2) {
      clearTimers();
      setCurrentStepIdx(2);
      setShowLogoOverlay(false);
      setCamera({ x: -240, y: -140, scale: 1.75, duration: 0.8, ease: "easeOut" });
      setCursor({ x: 524, y: 350, visible: true, scale: 1, clicking: false });
      setShowChartGuide(true);
      setShowChartTooltip(true);
    } else if (index === 3) {
      clearTimers();
      setCurrentStepIdx(3);
      setShowLogoOverlay(false);
      setCamera({ x: -210, y: -390, scale: 1.75, duration: 0.8, ease: "easeOut" });
      setCursor({ x: 440, y: 680, visible: true, scale: 1, clicking: false });
      setAiInputFocused(true);
      setShowAiChips(true);
    } else if (index === 4) {
      clearTimers();
      setCurrentStepIdx(4);
      setShowLogoOverlay(false);
      setCamera({ x: -580, y: 0, scale: 1.75, duration: 0.8, ease: "easeOut" });
      setDrawerOpen(true);
      setCursor({ x: 1200, y: 220, visible: true, scale: 1, clicking: false });
    } else {
      skipToInteractive();
    }
  };

  return (
    <div className="shopeers-root">
      {/* ─── 1. Logo Intro Overlay ─── */}
      <AnimatePresence>
        {showLogoOverlay && (
          <motion.div
            className="shopeers-logo-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <div className="shopeers-logo-content">
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1.0, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 22,
                  delay: 0.15,
                }}
              >
                <ShopeersPolygonIcon size={56} />
              </motion.div>

              <motion.span
                className="shopeers-logo-text"
                initial={{ x: -24, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.45,
                }}
              >
                Shopeers
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Director / Tour Control Bar ─── */}
      <div className="shopeers-director-bar">
        <div className="shopeers-director-left">
          <span className="shopeers-rec-dot" />
          <span className="shopeers-director-title">Shopeers Motion Showcase</span>
        </div>

        <div className="shopeers-step-pills">
          {TIMELINE_STEPS.map((s, idx) => (
            <button
              key={s.id}
              className={`shopeers-step-pill ${currentStepIdx === idx ? "active" : ""}`}
              onClick={() => jumpToStep(idx)}
            >
              {s.label}
            </button>
          ))}
        </div>

        <button className="shopeers-replay-btn" onClick={playShowcase} title="Replay intro">
          ↻ Replay
        </button>

        <button className="shopeers-skip-btn" onClick={skipToInteractive}>
          ⚡ Full Layout →
        </button>
      </div>

      {/* ─── Virtual Camera Viewport ─── */}
      <div className="shopeers-camera-viewport">
        <motion.div
          className="shopeers-canvas-stage"
          animate={{
            x: camera.x,
            y: camera.y,
            scale: camera.scale,
          }}
          transition={{
            duration: camera.duration,
            ease: camera.ease,
          }}
        >
          {/* ─── Sidebar ─── */}
          <aside className="shopeers-sidebar">
            <a href="#/" className="shopeers-brand-header">
              <ShopeersPolygonIcon size={32} />
              <span className="shopeers-brand-text">Shopeers</span>
            </a>

            <nav className="shopeers-nav-list">
              <div className="shopeers-nav-item active">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="2" />
                  <rect x="14" y="3" width="7" height="7" rx="2" />
                  <rect x="14" y="14" width="7" height="7" rx="2" />
                  <rect x="3" y="14" width="7" height="7" rx="2" />
                </svg>
                Dashboard
              </div>
              <div className="shopeers-nav-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                Orders
              </div>
              <div className="shopeers-nav-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                Customers
              </div>
              <div className="shopeers-nav-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
                Analytics
              </div>
              <div className="shopeers-nav-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
                Products
              </div>
              <div className="shopeers-nav-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
                Settings
              </div>
            </nav>

            <div className="shopeers-sidebar-bottom">
              <div className="shopeers-help-title">Shopeers Pro v2.4</div>
              <div className="shopeers-help-sub">Automated SaaS Analytics</div>
            </div>
          </aside>

          {/* ─── Main Content ─── */}
          <main className="shopeers-main-content">
            <header className="shopeers-topnav">
              <div className="shopeers-search-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input type="text" placeholder="Search anything in store..." readOnly />
                <span className="shopeers-cmd-kbd">⌘K</span>
              </div>

              <div className="shopeers-topnav-actions">
                <button
                  className="shopeers-add-widget-btn"
                  style={{
                    transform: addBtnClicked ? "scale(0.94)" : "scale(1)",
                  }}
                  onClick={() => setDrawerOpen((v) => !v)}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  + Add widget
                </button>

                <div className="shopeers-avatar" />
              </div>
            </header>

            <div className="shopeers-body-grid">
              {/* Row 1: Top 4 KPI Cards */}
              <div className="shopeers-kpi-grid">
                <div className="shopeers-kpi-card">
                  <div className="shopeers-kpi-info">
                    <span className="shopeers-kpi-label">Page Views</span>
                    <span className="shopeers-kpi-value">
                      {startCounterRollup ? pageViews.toLocaleString() : "16,431"}
                    </span>
                    <span className="shopeers-kpi-change">▲ +19.3%</span>
                  </div>
                  <div className="shopeers-kpi-icon" style={{ background: "rgba(37, 99, 235, 0.1)", color: "#2563eb" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                </div>

                <div className="shopeers-kpi-card">
                  <div className="shopeers-kpi-info">
                    <span className="shopeers-kpi-label">Visitors</span>
                    <span className="shopeers-kpi-value">
                      {startCounterRollup ? visitors.toLocaleString() : "6,225"}
                    </span>
                    <span className="shopeers-kpi-change">▲ +8.4%</span>
                  </div>
                  <div className="shopeers-kpi-icon" style={{ background: "rgba(16, 185, 129, 0.1)", color: "#10b981" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                    </svg>
                  </div>
                </div>

                <div className="shopeers-kpi-card">
                  <div className="shopeers-kpi-info">
                    <span className="shopeers-kpi-label">Click</span>
                    <span className="shopeers-kpi-value">
                      {startCounterRollup ? clicks.toLocaleString() : "2,832"}
                    </span>
                    <span className="shopeers-kpi-change">▲ +16.9%</span>
                  </div>
                  <div className="shopeers-kpi-icon" style={{ background: "rgba(139, 92, 246, 0.1)", color: "#8b5cf6" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 3h6v6" />
                      <path d="M10 14L21 3" />
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    </svg>
                  </div>
                </div>

                <div className="shopeers-kpi-card">
                  <div className="shopeers-kpi-info">
                    <span className="shopeers-kpi-label">Orders</span>
                    <span className="shopeers-kpi-value">
                      {startCounterRollup ? orders.toLocaleString() : "1,224"}
                    </span>
                    <span className="shopeers-kpi-change">▲ +3.4%</span>
                  </div>
                  <div className="shopeers-kpi-icon" style={{ background: "rgba(245, 158, 11, 0.1)", color: "#f59e0b" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Row 2: Total Profit Chart + Repeat Customer Rate */}
              <div className="shopeers-mid-grid">
                <div className="shopeers-chart-card">
                  <div className="shopeers-card-header">
                    <div>
                      <h3 className="shopeers-card-title">Total Profit</h3>
                      <div className="shopeers-chart-value-wrap">
                        <span className="shopeers-chart-big-val">$124,854</span>
                        <span className="shopeers-kpi-change">▲ +14.2%</span>
                      </div>
                    </div>

                    <div className="shopeers-chart-tabs">
                      <button className="shopeers-chart-tab active">Overview</button>
                      <button className="shopeers-chart-tab">Monthly</button>
                      <button className="shopeers-chart-tab">Weekly</button>
                    </div>
                  </div>

                  <div className="shopeers-svg-chart-area">
                    <svg viewBox="0 0 680 180" width="100%" height="100%">
                      <defs>
                        <linearGradient id="shopeersBlueGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.22" />
                          <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      <line x1="40" y1="20" x2="650" y2="20" stroke="#f1f5f9" strokeDasharray="4 4" />
                      <line x1="40" y1="60" x2="650" y2="60" stroke="#f1f5f9" strokeDasharray="4 4" />
                      <line x1="40" y1="100" x2="650" y2="100" stroke="#f1f5f9" strokeDasharray="4 4" />
                      <line x1="40" y1="140" x2="650" y2="140" stroke="#f1f5f9" strokeDasharray="4 4" />

                      <path
                        d="M 50,130 C 140,125 180,105 260,110 C 340,115 390,95 470,95 C 540,95 580,75 640,80"
                        fill="none"
                        stroke="#94a3b8"
                        strokeWidth="2"
                        strokeDasharray="5 5"
                      />

                      <path
                        d="M 50,150 L 50,110 C 140,110 180,70 260,70 C 340,70 380,45 470,45 C 540,45 580,35 640,30 L 640,150 Z"
                        fill="url(#shopeersBlueGrad)"
                      />

                      <path
                        d="M 50,110 C 140,110 180,70 260,70 C 340,70 380,45 470,45 C 540,45 580,35 640,30"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      <circle cx="345" cy="55" r="5.5" fill="#ffffff" stroke="#2563eb" strokeWidth="3" />

                      {showChartGuide && (
                        <line
                          x1="345"
                          y1="10"
                          x2="345"
                          y2="150"
                          stroke="#2563eb"
                          strokeWidth="1.8"
                          strokeDasharray="4 4"
                        />
                      )}

                      <text x="50" y="170" fill="#94a3b8" fontSize="11" textAnchor="middle">10 Jan</text>
                      <text x="195" y="170" fill="#94a3b8" fontSize="11" textAnchor="middle">14 Jan</text>
                      <text x="345" y="170" fill={showChartGuide ? "#2563eb" : "#94a3b8"} fontSize="11" fontWeight={showChartGuide ? "700" : "500"} textAnchor="middle">18 Jan</text>
                      <text x="490" y="170" fill="#94a3b8" fontSize="11" textAnchor="middle">22 Jan</text>
                      <text x="640" y="170" fill="#94a3b8" fontSize="11" textAnchor="middle">26 Jan</text>
                    </svg>

                    <AnimatePresence>
                      {showChartTooltip && (
                        <motion.div
                          className="shopeers-chart-tooltip"
                          initial={{ opacity: 0, y: 6, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1.0 }}
                          exit={{ opacity: 0, y: 4, scale: 0.95 }}
                          transition={{ duration: 0.28, ease: "easeOut" }}
                          style={{ left: "305px", top: "-15px" }}
                        >
                          <div className="shopeers-tooltip-date">Jan 18, 2025</div>
                          <div className="shopeers-tooltip-row">
                            <span style={{ color: "#2563eb" }}>
                              <span className="shopeers-tooltip-indicator" style={{ background: "#2563eb" }} />
                              This month
                            </span>
                            <span style={{ color: "#0f172a" }}>$12,324</span>
                          </div>
                          <div className="shopeers-tooltip-row">
                            <span style={{ color: "#64748b" }}>
                              <span className="shopeers-tooltip-indicator" style={{ background: "#94a3b8" }} />
                              Last month
                            </span>
                            <span style={{ color: "#64748b" }}>$5,563</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="shopeers-gauge-card">
                  <h3 className="shopeers-card-title">Repeat Customer Rate</h3>

                  <div className="shopeers-gauge-wrap">
                    <svg width="140" height="140" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r="46"
                        fill="none"
                        stroke="#f1f5f9"
                        strokeWidth="10"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="46"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={289}
                        strokeDashoffset={startCounterRollup ? 92 : 289}
                        style={{
                          transformOrigin: "center",
                          transform: "rotate(-90deg)",
                          transition: "stroke-dashoffset 1.3s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                      />
                    </svg>

                    <div className="shopeers-gauge-center-text">
                      <span className="shopeers-gauge-big-num">
                        {startCounterRollup ? "68%" : "68%"}
                      </span>
                      <span className="shopeers-gauge-sub">Retention</span>
                    </div>
                  </div>

                  <div className="shopeers-gauge-legend">
                    <div className="shopeers-gauge-legend-item">
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }} />
                      Returning (68%)
                    </div>
                    <div className="shopeers-gauge-legend-item">
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#e2e8f0" }} />
                      First time (32%)
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: AI Assistant + Most Day Active */}
              <div className="shopeers-bottom-grid">
                <div className="shopeers-ai-card">
                  <div className="shopeers-card-header">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <h3 className="shopeers-card-title">AI Assistant</h3>
                      <span className="shopeers-ai-badge">✨ Live AI</span>
                    </div>
                  </div>

                  <div className="shopeers-orb-container">
                    <motion.div
                      className="shopeers-3d-orb"
                      animate={{
                        y: [-4, 4, -4],
                      }}
                      transition={{
                        duration: 3,
                        ease: "easeInOut",
                        repeat: Infinity,
                      }}
                    >
                      <div className="shopeers-orb-ring" />
                      <div className="shopeers-orb-ring shopeers-orb-ring--outer" />
                    </motion.div>
                  </div>

                  <div className="shopeers-ai-chips-wrap">
                    <AnimatePresence>
                      {showAiChips && (
                        <>
                          {["SEO Writer", "Sales Insight", "Fraud Detection", "ADS Insight"].map(
                            (chip, idx) => (
                              <motion.div
                                key={chip}
                                className="shopeers-ai-chip"
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 260,
                                  damping: 20,
                                  delay: idx * 0.06,
                                }}
                              >
                                {chip}
                              </motion.div>
                            )
                          )}
                        </>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className={`shopeers-ai-input-bar ${aiInputFocused ? "focused" : ""}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                    </svg>

                    <input type="text" placeholder="Ask me anything..." readOnly />

                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" y1="19" x2="12" y2="23" />
                      <line x1="8" y1="23" x2="16" y2="23" />
                    </svg>

                    <button className="shopeers-ai-btn">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="shopeers-bars-card">
                  <div className="shopeers-card-header">
                    <h3 className="shopeers-card-title">Most Day Active</h3>
                    <span style={{ fontSize: "0.76rem", color: "#64748b", fontWeight: "600" }}>Weekly Activity</span>
                  </div>

                  <div className="shopeers-bars-wrap">
                    {[
                      { day: "Mon", height: 65, active: false },
                      { day: "Tue", height: 95, active: false },
                      { day: "Wed", height: 140, active: true },
                      { day: "Thu", height: 125, active: true },
                      { day: "Fri", height: 85, active: false },
                      { day: "Sat", height: 45, active: false },
                      { day: "Sun", height: 35, active: false },
                    ].map((item) => (
                      <div key={item.day} className="shopeers-bar-col">
                        <div className="shopeers-bar-track">
                          <div
                            className={`shopeers-bar-fill ${item.active ? "active" : ""}`}
                            style={{ height: `${item.height}px` }}
                          />
                        </div>
                        <span className="shopeers-bar-label">{item.day}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* ─── 5. Add Widget Modal Drawer ─── */}
          <motion.div
            className="shopeers-drawer"
            initial={{ x: "100%" }}
            animate={{ x: drawerOpen ? "0%" : "100%" }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="shopeers-drawer-header">
              <h2 className="shopeers-drawer-title">Add Widget</h2>
              <button className="shopeers-drawer-close" onClick={() => setDrawerOpen(false)}>
                ✕
              </button>
            </div>

            <div className="shopeers-drawer-list">
              <div className="shopeers-widget-template">
                <div className="shopeers-widget-name">Visitors by Device</div>
                <div className="shopeers-widget-desc">Mobile, Desktop, and Tablet distribution</div>
              </div>

              <div
                className={`shopeers-widget-template ${draggingTemplate ? "dragging" : ""}`}
                style={{
                  transform: draggingTemplate ? "translateX(-35px) rotate(-1deg)" : "none",
                }}
              >
                <div className="shopeers-widget-name" style={{ color: draggingTemplate ? "#2563eb" : "#0f172a" }}>
                  Dashboard Overview
                </div>
                <div className="shopeers-widget-desc">Live sales metrics, active carts, and conversions</div>
              </div>

              <div className="shopeers-widget-template">
                <div className="shopeers-widget-name">Orders Performance</div>
                <div className="shopeers-widget-desc">Fulfillment velocity and customer satisfaction</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ─── Virtual Cursor Layer ─── */}
        <AnimatePresence>
          {cursor.visible && (
            <motion.div
              className="shopeers-virtual-cursor"
              initial={{ opacity: 0 }}
              animate={{
                x: cursor.x,
                y: cursor.y,
                opacity: 1,
                scale: cursor.scale,
              }}
              exit={{ opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 140,
                damping: 20,
                mass: 0.7,
              }}
            >
              <svg width="24" height="28" viewBox="0 0 24 28" fill="none" className="shopeers-cursor-arrow">
                <path
                  d="M4 1L4 21.5L9.5 16.5L14 25L17 23.5L12.5 15L20 14L4 1Z"
                  fill="#ffffff"
                  stroke="#14161d"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>

              {cursor.clicking && <div className="shopeers-click-ripple" />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
