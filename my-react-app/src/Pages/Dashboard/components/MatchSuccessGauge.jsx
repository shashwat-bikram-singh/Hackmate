import React, { useState, useEffect } from 'react';

export default function MatchSuccessGauge({ animate, interactive = false }) {
  const [targetPercent, setTargetPercent] = useState(74);
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const filledPortion = circumference * (targetPercent / 100);
  
  const [currentPercent, setCurrentPercent] = useState(() => (animate ? 0 : targetPercent));
  const [currentOffset, setCurrentOffset] = useState(() => (animate ? circumference : circumference - filledPortion));
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    if (!animate) {
      const id = requestAnimationFrame(() => {
        setCurrentPercent(targetPercent);
        setCurrentOffset(circumference - filledPortion);
      });
      return () => cancelAnimationFrame(id);
    }

    let start = null;
    const duration = 1200;
    
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    
    const animateFrame = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const easedProgress = easeOutCubic(progress);
      
      setCurrentPercent(Math.round(easedProgress * targetPercent));
      setCurrentOffset(circumference - (easedProgress * filledPortion));
      
      if (progress < 1) {
        requestAnimationFrame(animateFrame);
      }
    };
    
    requestAnimationFrame(animateFrame);
  }, [animate, circumference, filledPortion, targetPercent]);

  return (
    <div className="db-card db-gauge">
      <div className="db-card-header">
        <div>
          <h3 className="db-card-title">Match Success Rate</h3>
          <span className="db-card-meta-text">Based on confirmed hackathon teams</span>
        </div>
        
        {interactive && (
          <div className="db-gauge-actions">
            <button 
              className="db-gauge-adjust-btn"
              title="Lower rate"
              onClick={() => setTargetPercent(p => Math.max(10, p - 5))}
            >
              -
            </button>
            <button 
              className="db-gauge-adjust-btn"
              title="Increase rate"
              onClick={() => setTargetPercent(p => Math.min(100, p + 5))}
            >
              +
            </button>
          </div>
        )}
      </div>

      <div className="db-gauge-body">
        <svg className="db-gauge-svg" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="52" fill="none" stroke="var(--line)" strokeWidth="10" />
          <circle 
            cx="60" cy="60" r="52" fill="none" 
            stroke="url(#gaugeGradient)" strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={currentOffset}
            transform="rotate(-90 60 60)"
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
          <defs>
            <linearGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="var(--violet)" />
            </linearGradient>
          </defs>
        </svg>

        <div className="db-gauge-center">
          <span className="db-gauge-percent">{currentPercent}%</span>
          <span className="db-gauge-subtext">Target: 85% goal</span>
        </div>
      </div>

      <button 
        type="button" 
        className="db-gauge-link-btn" 
        onClick={() => setShowDetailsModal(!showDetailsModal)}
      >
        {showDetailsModal ? '▲ Hide breakdown' : '▼ Show algorithm details'}
      </button>

      {showDetailsModal && (
        <div className="db-gauge-breakdown">
          <div className="db-breakdown-row">
            <span>Tech Stack Fit</span>
            <strong>92%</strong>
          </div>
          <div className="db-breakdown-row">
            <span>Timezone & Availability</span>
            <strong>88%</strong>
          </div>
          <div className="db-breakdown-row">
            <span>Hackathon Experience</span>
            <strong>79%</strong>
          </div>
        </div>
      )}
    </div>
  );
}
