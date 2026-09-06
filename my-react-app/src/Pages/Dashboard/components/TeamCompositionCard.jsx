import React, { useState } from 'react';

export default function TeamCompositionCard({ interactive = false }) {
  const [roles, setRoles] = useState([
    { id: 'frontend', label: 'Frontend Devs', count: 284, color: '#2563eb', icon: <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" /> },
    { id: 'backend', label: 'Backend Devs', count: 198, color: '#8b5cf6', icon: <path d="M20 16V7a2 2 0 00-2-2H6a2 2 0 00-2 2v9m16 0H4m16 0l1.28 2.559A.5.5 0 0120.832 22H3.168a.5.5 0 01-.448-.724L4 16m16 0H4" /> },
    { id: 'designers', label: 'Designers', count: 143, color: '#f59e0b', icon: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /> },
    { id: 'data', label: 'Data/ML Devs', count: 87, color: '#10b981', icon: <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /> }
  ]);

  const totalMembers = roles.reduce((sum, r) => sum + r.count, 0);

  const adjustCount = (id, delta) => {
    setRoles(prev => prev.map(r => {
      if (r.id === id) {
        return { ...r, count: Math.max(0, r.count + delta) };
      }
      return r;
    }));
  };

  return (
    <div className="db-card db-team-comp">
      <div className="db-card-header">
        <div>
          <h3 className="db-card-title">Team Composition</h3>
          <span className="db-card-meta-text">Total tracked builders: <strong>{totalMembers}</strong></span>
        </div>
      </div>

      <div className="db-team-comp-list">
        {roles.map((role) => {
          const pct = totalMembers > 0 ? Math.round((role.count / totalMembers) * 100) : 0;

          return (
            <div key={role.id} className="db-team-comp-row">
              <span className="db-team-comp-dot" style={{ background: role.color }}></span>
              <span className="db-team-comp-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {role.icon}
                </svg>
              </span>
              <span className="db-team-comp-label">{role.label}</span>
              <span className="db-team-comp-count">{role.count}</span>

              {interactive && (
                <div className="db-comp-steppers">
                  <button
                    className="db-comp-btn"
                    title="Decrease"
                    onClick={() => adjustCount(role.id, -5)}
                  >
                    -
                  </button>
                  <button
                    className="db-comp-btn"
                    title="Increase"
                    onClick={() => adjustCount(role.id, 5)}
                  >
                    +
                  </button>
                </div>
              )}

              <div className="db-comp-bar-track">
                <div
                  className="db-team-comp-bar"
                  style={{ width: `${pct}%`, background: role.color }}
                  title={`${pct}% of team`}
                />
              </div>
              <span className="db-comp-pct">{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
