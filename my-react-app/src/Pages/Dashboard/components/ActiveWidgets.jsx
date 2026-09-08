import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';


export default function ActiveWidgets({ activeWidgets, onRemoveWidget }) {
  // Submission Tracker local state
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Demo Video Recording (3 min)', done: true },
    { id: 2, text: 'Pitch Deck Slides (10 slides)', done: true },
    { id: 3, text: 'Smart Contracts Deployed to Testnet', done: false },
    { id: 4, text: 'GitHub Repo & Documentation', done: false },
  ]);

  // Chat activity local state
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'Alex (Backend)', text: 'API endpoints for team matching are live!', time: '10:14 AM' },
    { id: 2, sender: 'Priya (UI/UX)', text: 'Just uploaded the new Figma prototype!', time: '10:28 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Leaderboard upvotes
  const [upvotes, setUpvotes] = useState({ 1: 42, 2: 38, 3: 29 });

  const toggleCheck = (id) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setChatMessages(prev => [
      ...prev,
      { id: Date.now(), sender: 'You', text: newMessage.trim(), time: 'Just now' }
    ]);
    setNewMessage('');
  };

  const completedCount = checklist.filter(c => c.done).length;
  const progressPct = Math.round((completedCount / checklist.length) * 100);

  if (!activeWidgets || activeWidgets.length === 0) return null;

  return (
    <div className="db-active-widgets-section">
      <div className="db-active-widgets-header">
        <h3 className="db-section-subtitle">
          <span>Active Custom Widgets</span>
          <span className="db-widget-count-badge">{activeWidgets.length} added</span>
        </h3>
        <p className="db-section-desc">Widgets added from the "+ Add widget" drawer. Click ✕ to remove or interact with any widget.</p>
      </div>

      <div className="db-active-widgets-grid">
        <AnimatePresence>
          {activeWidgets.map(widgetId => {
            if (widgetId === 'radar') {
              return (
                <motion.div
                  key="radar"
                  className="db-card db-widget-box"
                  initial={{ opacity: 0, y: 15, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="db-card-header">
                    <div className="db-widget-title-group">
                      <span className="db-widget-badge-tag" style={{ background: '#eff6ff', color: 'var(--violet)' }}>#skills</span>
                      <h4 className="db-card-title">Skills Radar</h4>
                    </div>
                    <button className="db-widget-remove-btn" title="Remove widget" onClick={() => onRemoveWidget('radar')}>✕</button>
                  </div>

                  <div className="db-radar-container">
                    <svg viewBox="0 0 200 180" className="db-radar-svg">
                      {/* Concentric pentagons */}
                      <polygon points="100,20 170,60 145,140 55,140 30,60" fill="none" stroke="var(--line)" strokeWidth="1" />
                      <polygon points="100,45 150,75 130,130 70,130 50,75" fill="none" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 3" />
                      <polygon points="100,70 130,90 118,120 82,120 70,90" fill="none" stroke="var(--line)" strokeWidth="1" />
                      
                      {/* Team polygon fill */}
                      <polygon
                        points="100,28 162,64 125,134 62,126 38,62"
                        fill="rgba(37, 99, 235, 0.25)"
                        stroke="var(--violet)"
                        strokeWidth="2"
                      />

                      {/* Vertex points */}
                      <circle cx="100" cy="28" r="4" fill="var(--violet)" />
                      <circle cx="162" cy="64" r="4" fill="var(--violet)" />
                      <circle cx="125" cy="134" r="4" fill="var(--violet)" />
                      <circle cx="62" cy="126" r="4" fill="var(--violet)" />
                      <circle cx="38" cy="62" r="4" fill="var(--violet)" />

                      {/* Labels */}
                      <text x="100" y="14" textAnchor="middle" fontSize="10" fill="var(--ink)" fontWeight="600">Frontend (92%)</text>
                      <text x="175" y="65" textAnchor="start" fontSize="10" fill="var(--ink)" fontWeight="600">AI/ML (85%)</text>
                      <text x="145" y="155" textAnchor="middle" fontSize="10" fill="var(--ink)" fontWeight="600">DevOps (70%)</text>
                      <text x="55" y="155" textAnchor="middle" fontSize="10" fill="var(--ink)" fontWeight="600">Design (78%)</text>
                      <text x="25" y="65" textAnchor="end" fontSize="10" fill="var(--ink)" fontWeight="600">Backend (88%)</text>
                    </svg>
                  </div>
                  <div className="db-radar-footer">
                    <span>Overall Team Compatibility: <strong>82.6%</strong></span>
                  </div>
                </motion.div>
              );
            }

            if (widgetId === 'calendar') {
              return (
                <motion.div
                  key="calendar"
                  className="db-card db-widget-box"
                  initial={{ opacity: 0, y: 15, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="db-card-header">
                    <div className="db-widget-title-group">
                      <span className="db-widget-badge-tag" style={{ background: '#f3e8ff', color: '#8b5cf6' }}>#events</span>
                      <h4 className="db-card-title">Hackathon Calendar</h4>
                    </div>
                    <button className="db-widget-remove-btn" title="Remove widget" onClick={() => onRemoveWidget('calendar')}>✕</button>
                  </div>

                  <div className="db-calendar-events">
                    <div className="db-cal-event-item">
                      <div className="db-cal-date-badge">
                        <span className="db-cal-month">OCT</span>
                        <span className="db-cal-day">15</span>
                      </div>
                      <div className="db-cal-details">
                        <h5>ETHGlobal Bangkok Kickoff</h5>
                        <p>Team sync & opening ceremony • 10:00 AM</p>
                      </div>
                      <span className="db-cal-countdown">In 9 days</span>
                    </div>

                    <div className="db-cal-event-item">
                      <div className="db-cal-date-badge" style={{ background: '#eff6ff', color: 'var(--violet)' }}>
                        <span className="db-cal-month">OCT</span>
                        <span className="db-cal-day">17</span>
                      </div>
                      <div className="db-cal-details">
                        <h5>Final Project Submission</h5>
                        <p>Video demo & contracts submission deadline</p>
                      </div>
                      <span className="db-cal-countdown" style={{ color: '#ef4444' }}>Critical</span>
                    </div>

                    <div className="db-cal-event-item">
                      <div className="db-cal-date-badge" style={{ background: '#fef3c7', color: '#d97706' }}>
                        <span className="db-cal-month">NOV</span>
                        <span className="db-cal-day">01</span>
                      </div>
                      <div className="db-cal-details">
                        <h5>HackMIT 2026 Opening</h5>
                        <p>Virtual hacker check-in & mentor matchmaking</p>
                      </div>
                      <span className="db-cal-countdown">In 25 days</span>
                    </div>
                  </div>
                </motion.div>
              );
            }

            if (widgetId === 'chat') {
              return (
                <motion.div
                  key="chat"
                  className="db-card db-widget-box"
                  initial={{ opacity: 0, y: 15, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="db-card-header">
                    <div className="db-widget-title-group">
                      <span className="db-widget-badge-tag" style={{ background: '#ecfdf5', color: '#10b981' }}>#team-chat</span>
                      <h4 className="db-card-title">Team Chat Activity</h4>
                    </div>
                    <button className="db-widget-remove-btn" title="Remove widget" onClick={() => onRemoveWidget('chat')}>✕</button>
                  </div>

                  <div className="db-widget-chat-feed">
                    {chatMessages.map(msg => (
                      <div key={msg.id} className="db-widget-chat-msg">
                        <div className="db-chat-meta">
                          <strong>{msg.sender}</strong>
                          <span>{msg.time}</span>
                        </div>
                        <p className="db-chat-text">{msg.text}</p>
                      </div>
                    ))}
                  </div>

                  <form className="db-widget-chat-form" onSubmit={handleSendMessage}>
                    <input
                      type="text"
                      placeholder="Type a team message..."
                      value={newMessage}
                      onChange={e => setNewMessage(e.target.value)}
                      className="db-chat-input"
                    />
                    <button type="submit" className="db-chat-send-btn">Send</button>
                  </form>
                </motion.div>
              );
            }

            if (widgetId === 'trophy') {
              return (
                <motion.div
                  key="trophy"
                  className="db-card db-widget-box"
                  initial={{ opacity: 0, y: 15, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="db-card-header">
                    <div className="db-widget-title-group">
                      <span className="db-widget-badge-tag" style={{ background: '#fef3c7', color: '#d97706' }}>#ranking</span>
                      <h4 className="db-card-title">Leaderboard</h4>
                    </div>
                    <button className="db-widget-remove-btn" title="Remove widget" onClick={() => onRemoveWidget('trophy')}>✕</button>
                  </div>

                  <div className="db-leaderboard-list">
                    {[
                      { rank: 1, name: 'ByteCrafters (Your Team)', points: 984, tag: 'ETHGlobal' },
                      { rank: 2, name: 'NeuralNomads', points: 921, tag: 'HackMIT' },
                      { rank: 3, name: 'SoliditySurfers', points: 885, tag: 'CalHacks' },
                    ].map(team => (
                      <div key={team.rank} className="db-leaderboard-item">
                        <span className={`db-rank-num rank-${team.rank}`}>#{team.rank}</span>
                        <div className="db-leaderboard-info">
                          <h6>{team.name}</h6>
                          <span>{team.tag} • {team.points} pts</span>
                        </div>
                        <button
                          className="db-upvote-btn"
                          onClick={() => setUpvotes(p => ({ ...p, [team.rank]: (p[team.rank] || 0) + 1 }))}
                        >
                          ▲ {upvotes[team.rank] || 0}
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            }

            if (widgetId === 'checklist') {
              return (
                <motion.div
                  key="checklist"
                  className="db-card db-widget-box"
                  initial={{ opacity: 0, y: 15, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="db-card-header">
                    <div className="db-widget-title-group">
                      <span className="db-widget-badge-tag" style={{ background: '#fef2f2', color: '#ef4444' }}>#tracker</span>
                      <h4 className="db-card-title">Submission Tracker</h4>
                    </div>
                    <button className="db-widget-remove-btn" title="Remove widget" onClick={() => onRemoveWidget('checklist')}>✕</button>
                  </div>

                  <div className="db-tracker-progress">
                    <div className="db-tracker-bar-header">
                      <span>Milestone Progress</span>
                      <strong>{progressPct}%</strong>
                    </div>
                    <div className="db-tracker-bar-track">
                      <div
                        className="db-tracker-bar-fill"
                        style={{ width: `${progressPct}%`, background: progressPct === 100 ? '#10b981' : 'var(--violet)' }}
                      />
                    </div>
                  </div>

                  <div className="db-checklist-list">
                    {checklist.map(item => (
                      <label key={item.id} className="db-checklist-item">
                        <input
                          type="checkbox"
                          checked={item.done}
                          onChange={() => toggleCheck(item.id)}
                          className="db-checklist-checkbox"
                        />
                        <span className={item.done ? 'db-checklist-done' : ''}>{item.text}</span>
                      </label>
                    ))}
                  </div>
                </motion.div>
              );
            }

            return null;
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
