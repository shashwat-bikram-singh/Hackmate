import React, { useState, useEffect } from 'react';

function useCounter(target, animate, duration = 1500) {
  const [count, setCount] = useState(() => (animate ? 0 : target));

  useEffect(() => {
    if (!animate) {
      const id = window.requestAnimationFrame(() => setCount(target));
      return () => window.cancelAnimationFrame(id);
    }
    
    let startTimestamp = null;
    let animationFrameId = null;
    
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * target));
      
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };
    
    animationFrameId = window.requestAnimationFrame(step);
    
    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [target, animate, duration]);

  return count;
}

const KPICard = ({ item, animate, onUpdateValue, interactive = false }) => {
  const animatedValue = useCounter(item.value, animate);
  const [isEditing, setIsEditing] = useState(false);
  const [editVal, setEditVal] = useState(item.value);

  const handleSave = (e) => {
    e.preventDefault();
    const num = parseInt(editVal, 10);
    if (!isNaN(num) && num >= 0) {
      onUpdateValue(item.id, num);
    }
    setIsEditing(false);
  };

  return (
    <div className={`db-kpi-card ${interactive ? 'db-kpi-card--interactive' : ''}`}>
      <div className="db-kpi-icon" style={{ background: item.color + '15' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {item.icon === 'trophy' && (
            <>
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
              <path d="M4 22h16"></path>
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path>
            </>
          )}
          {item.icon === 'handshake' && (
            <>
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </>
          )}
          {item.icon === 'mail' && (
            <>
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </>
          )}
          {item.icon === 'rocket' && (
            <>
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
            </>
          )}
        </svg>
      </div>

      <div className="db-kpi-info">
        <div className="db-kpi-header-row">
          <span className="db-kpi-label">{item.label}</span>
          {interactive && (
            <button
              className="db-kpi-edit-trigger"
              title="Edit metric"
              onClick={() => {
                setEditVal(item.value);
                setIsEditing(!isEditing);
              }}
            >
              ✎
            </button>
          )}
        </div>

        {isEditing ? (
          <form className="db-kpi-edit-form" onSubmit={handleSave}>
            <input
              type="number"
              className="db-kpi-edit-input"
              value={editVal}
              onChange={e => setEditVal(e.target.value)}
              autoFocus
            />
            <button type="submit" className="db-kpi-save-btn">✓</button>
            <button type="button" className="db-kpi-cancel-btn" onClick={() => setIsEditing(false)}>✕</button>
          </form>
        ) : (
          <div className="db-kpi-row">
            <span className="db-kpi-value">{animatedValue}</span>
            <span className="db-kpi-change">{item.change}</span>
          </div>
        )}

        <span className="db-kpi-prev">vs. {item.prev}</span>

        {interactive && (
          <div className="db-kpi-steppers">
            <button 
              className="db-kpi-step-btn" 
              title="Decrease"
              onClick={() => onUpdateValue(item.id, Math.max(0, item.value - 1))}
            >
              -
            </button>
            <button 
              className="db-kpi-step-btn" 
              title="Increase"
              onClick={() => onUpdateValue(item.id, item.value + 1)}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function KPICards({ animate, interactive = false }) {
  const [data, setData] = useState([
    { id: 'hackathons', icon: 'trophy', label: 'Active Hackathons', value: 24, change: '+12.5%', prev: '21 last month', color: '#f59e0b' },
    { id: 'matches', icon: 'handshake', label: 'Team Matches', value: 156, change: '+23.8%', prev: '126 last month', color: '#2563eb' },
    { id: 'applications', icon: 'mail', label: 'Applications Sent', value: 89, change: '+15.2%', prev: '77 last month', color: '#8b5cf6' },
    { id: 'projects', icon: 'rocket', label: 'Projects Live', value: 12, change: '+8.3%', prev: '11 last month', color: '#10b981' },
  ]);

  const handleUpdateValue = (id, newVal) => {
    setData(prev => prev.map(item => item.id === id ? { ...item, value: newVal } : item));
  };

  return (
    <div className="db-kpi-grid">
      {data.map(item => (
        <KPICard 
          key={item.id} 
          item={item} 
          animate={animate} 
          onUpdateValue={handleUpdateValue}
          interactive={interactive}
        />
      ))}
    </div>
  );
}
