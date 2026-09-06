import React, { useState } from 'react';

const WEEK_DATA = [
  { week: 'Week 1', x: 50, thisMonth: 22, lastMonth: 15, yThis: 126, yLast: 140 },
  { week: 'Week 2', x: 193, thisMonth: 38, lastMonth: 28, yThis: 94, yLast: 114 },
  { week: 'Week 3', x: 336, thisMonth: 48, lastMonth: 31, yThis: 74, yLast: 108 },
  { week: 'Week 4', x: 480, thisMonth: 48, lastMonth: 35, yThis: 74, yLast: 100 },
];

export default function MatchActivityChart({ showTooltip = false, interactive = false }) {
  const [hoveredWeek, setHoveredWeek] = useState(null);
  const [showThisMonth, setShowThisMonth] = useState(true);
  const [showLastMonth, setShowLastMonth] = useState(true);

  // If showTooltip is passed from cinematic camera animation, default to Week 3
  const activeWeek = hoveredWeek !== null 
    ? WEEK_DATA[hoveredWeek] 
    : showTooltip 
      ? WEEK_DATA[2] 
      : null;

  return (
    <div className="db-card db-match-chart">
      <div className="db-card-header">
        <div>
          <h3 className="db-card-title">Team Match Activity</h3>
          <div className="db-match-chart-value">
            <span className="db-match-chart-big">156 Matches</span>
            <span className="db-match-chart-change">▲ +23.8% vs. last period</span>
          </div>
        </div>

        {interactive && (
          <div className="db-chart-toggles">
            <button
              className={`db-chart-pill ${showThisMonth ? 'db-chart-pill--active' : ''}`}
              onClick={() => setShowThisMonth(!showThisMonth)}
            >
              ● This month
            </button>
            <button
              className={`db-chart-pill ${showLastMonth ? 'db-chart-pill--active' : ''}`}
              onClick={() => setShowLastMonth(!showLastMonth)}
            >
              ○ Last month
            </button>
          </div>
        )}
      </div>
      
      <div className="db-match-chart-area">
        <svg viewBox="0 0 500 200" className="db-match-chart-svg">
          {/* Grid lines */}
          <line x1="50" y1="10" x2="480" y2="10" stroke="var(--line)" strokeDasharray="4 4" />
          <line x1="50" y1="50" x2="480" y2="50" stroke="var(--line)" strokeDasharray="4 4" />
          <line x1="50" y1="90" x2="480" y2="90" stroke="var(--line)" strokeDasharray="4 4" />
          <line x1="50" y1="130" x2="480" y2="130" stroke="var(--line)" strokeDasharray="4 4" />
          <line x1="50" y1="170" x2="480" y2="170" stroke="var(--line)" strokeDasharray="4 4" />

          {/* Y-axis labels */}
          <text x="40" y="14" fill="var(--faint)" fontSize="12" textAnchor="end">80</text>
          <text x="40" y="54" fill="var(--faint)" fontSize="12" textAnchor="end">60</text>
          <text x="40" y="94" fill="var(--faint)" fontSize="12" textAnchor="end">40</text>
          <text x="40" y="134" fill="var(--faint)" fontSize="12" textAnchor="end">20</text>
          <text x="40" y="174" fill="var(--faint)" fontSize="12" textAnchor="end">0</text>

          {/* X-axis labels */}
          {WEEK_DATA.map((w, idx) => (
            <text
              key={w.week}
              x={w.x}
              y="195"
              fill={activeWeek?.week === w.week ? 'var(--violet)' : 'var(--faint)'}
              fontSize="12"
              fontWeight={activeWeek?.week === w.week ? '700' : '500'}
              textAnchor="middle"
              style={{ cursor: interactive ? 'pointer' : 'default' }}
              onMouseEnter={() => interactive && setHoveredWeek(idx)}
            >
              {w.week}
            </text>
          ))}

          {/* Last month line (gray, dashed) */}
          {showLastMonth && (
            <path 
              d="M 50,140 C 121,140 121,114 193,114 C 264,114 264,108 336,108 C 408,108 408,100 480,100" 
              fill="none" 
              stroke="var(--faint)" 
              strokeWidth="1.5" 
              strokeDasharray="4 4" 
            />
          )}

          {/* This month area fill (blue, 10% opacity) */}
          {showThisMonth && (
            <>
              <path 
                d="M 50,170 L 50,126 C 121,126 121,94 193,94 C 264,94 264,74 336,74 C 408,74 408,74 480,74 L 480,170 Z" 
                fill="var(--violet)" 
                opacity="0.1" 
              />
              <path 
                d="M 50,126 C 121,126 121,94 193,94 C 264,94 264,74 336,74 C 408,74 408,74 480,74" 
                fill="none" 
                stroke="var(--violet)" 
                strokeWidth="2.5" 
              />
            </>
          )}

          {/* Active guide line */}
          {activeWeek && (
            <line
              x1={activeWeek.x}
              y1="10"
              x2={activeWeek.x}
              y2="170"
              stroke="var(--violet)"
              strokeDasharray="4 4"
              strokeWidth="1.5"
            />
          )}

          {/* Data points for this month */}
          {showThisMonth && WEEK_DATA.map((w, idx) => (
            <g key={w.week} style={{ cursor: interactive ? 'pointer' : 'default' }} onMouseEnter={() => interactive && setHoveredWeek(idx)}>
              <circle
                cx={w.x}
                cy={w.yThis}
                r={activeWeek?.week === w.week ? "7" : "5"}
                fill={activeWeek?.week === w.week ? "var(--violet)" : "var(--bg)"}
                stroke="var(--violet)"
                strokeWidth="2.5"
                style={{ transition: 'all 0.2s' }}
              />
              {/* Invisible large hit target for easy mouse hover */}
              <circle cx={w.x} cy={w.yThis} r="18" fill="transparent" />
            </g>
          ))}
        </svg>
        
        {/* Dynamic Tooltip */}
        {activeWeek && (
          <div
            className="db-match-chart-tooltip"
            style={{
              position: 'absolute',
              left: `${(activeWeek.x / 500) * 100}%`,
              top: '20px',
              transform: 'translate(-50%, -60%)',
              transition: 'left 0.2s ease, top 0.2s ease',
            }}
          >
            <div className="db-match-chart-tooltip-header">{activeWeek.week} Performance</div>
            <div className="db-match-chart-tooltip-row">
              <span className="db-match-chart-tooltip-dot" style={{ background: 'var(--violet)' }}></span>
              <span><strong>{activeWeek.thisMonth}</strong> matches this month</span>
            </div>
            <div className="db-match-chart-tooltip-row">
              <span className="db-match-chart-tooltip-dot" style={{ background: 'var(--faint)' }}></span>
              <span><strong>{activeWeek.lastMonth}</strong> matches last month</span>
            </div>
            {interactive && (
              <div className="db-tooltip-footer">
                Growth: +{Math.round(((activeWeek.thisMonth - activeWeek.lastMonth) / activeWeek.lastMonth) * 100)}%
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="db-match-chart-legend">
        <span className="db-match-chart-legend-item">
          <span className="db-match-chart-legend-line" style={{ background: 'var(--violet)' }}></span>
          This month
        </span>
        <span className="db-match-chart-legend-item">
          <span className="db-match-chart-legend-line" style={{ background: 'var(--faint)' }}></span>
          Last month
        </span>
        {interactive && (
          <span className="db-legend-hint">Hover over data points to inspect weekly breakdown</span>
        )}
      </div>
    </div>
  );
}
