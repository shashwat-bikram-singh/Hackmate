import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import "./CinematicIntro.css";
import LogoOverlay from "./components/LogoOverlay.jsx";
import DashboardCanvas from "./components/DashboardCanvas.jsx";

function CinematicIntro() {
  const [showOverlay, setShowOverlay] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Auto-dismiss logo after 2.2s
  useEffect(() => {
    const t = setTimeout(() => setShowOverlay(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="cinema-viewport">
      {/* HackaMate brand reveal — fades out after 2.2s */}
      <LogoOverlay visible={showOverlay} />

      {/* Interactive dashboard fades in beneath the overlay */}
      <AnimatePresence>
        {!showOverlay && (
          <motion.div
            className="db-interactive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <DashboardCanvas
              animateKPIs={false}
              animateGauge={false}
              showTooltip={false}
              highlightSkill={null}
              drawerOpen={drawerOpen}
              onToggleDrawer={() => setDrawerOpen((v) => !v)}
              interactive={true}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CinematicIntro;
