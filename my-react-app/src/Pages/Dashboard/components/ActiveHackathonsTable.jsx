import React, { useState } from 'react';

const STATUS_CONFIG = {
  'Registered': { color: '#16c265', bg: 'rgba(22, 194, 101, 0.12)' },
  'Forming Team': { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)' },
  'Needs Team': { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.12)' },
};

const NEXT_STATUS = {
  'Registered': 'Forming Team',
  'Forming Team': 'Needs Team',
  'Needs Team': 'Registered',
};

export default function ActiveHackathonsTable({ searchQuery = '', interactive = false }) {
  const [hackathons, setHackathons] = useState([
    { id: 1, name: 'ETHGlobal Bangkok', date: 'Oct 15–17', team: '4/4', prize: '$50,000', status: 'Registered' },
    { id: 2, name: 'HackMIT 2026', date: 'Nov 1–3', team: '3/4', prize: '$25,000', status: 'Forming Team' },
    { id: 3, name: 'TreeHacks Stanford', date: 'Nov 15–17', team: '2/5', prize: '$30,000', status: 'Forming Team' },
    { id: 4, name: 'CalHacks 11.0', date: 'Dec 5–7', team: '4/4', prize: '$40,000', status: 'Registered' },
    { id: 5, name: 'PennApps XXIV', date: 'Dec 12–14', team: '1/4', prize: '$20,000', status: 'Needs Team' },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newH, setNewH] = useState({
    name: '',
    date: '',
    team: '1/4',
    prize: '$10,000',
    status: 'Forming Team',
  });

  const cycleStatus = (id) => {
    if (!interactive) return;
    setHackathons(prev => prev.map(h => {
      if (h.id === id) {
        return { ...h, status: NEXT_STATUS[h.status] || 'Registered' };
      }
      return h;
    }));
  };

  const deleteHackathon = (id) => {
    setHackathons(prev => prev.filter(h => h.id !== id));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newH.name.trim()) return;
    setHackathons(prev => [
      ...prev,
      {
        id: Date.now(),
        name: newH.name.trim(),
        date: newH.date || 'TBA',
        team: newH.team || '1/4',
        prize: newH.prize || '$10,000',
        status: newH.status || 'Forming Team',
      }
    ]);
    setNewH({ name: '', date: '', team: '1/4', prize: '$10,000', status: 'Forming Team' });
    setShowAddForm(false);
  };

  const filtered = hackathons.filter(h =>
    h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.date.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="db-card db-hackathons-table">
      <div className="db-card-header">
        <div>
          <h3 className="db-card-title">Active Hackathons</h3>
          <p className="db-card-subtitle">Manage upcoming hackathon registrations and team statuses.</p>
        </div>

        <div className="db-table-header-actions">
          {interactive && (
            <button
              className="db-table-add-btn"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              {showAddForm ? '✕ Cancel' : '+ Add Hackathon'}
            </button>
          )}
        </div>
      </div>

      {showAddForm && (
        <form className="db-table-inline-form" onSubmit={handleAddSubmit}>
          <input
            type="text"
            placeholder="Hackathon name (e.g. Solana Breakpoint)"
            value={newH.name}
            onChange={e => setNewH({ ...newH, name: e.target.value })}
            required
            className="db-form-input"
          />
          <input
            type="text"
            placeholder="Dates (e.g. Dec 20–22)"
            value={newH.date}
            onChange={e => setNewH({ ...newH, date: e.target.value })}
            className="db-form-input"
          />
          <input
            type="text"
            placeholder="Team (e.g. 3/4)"
            value={newH.team}
            onChange={e => setNewH({ ...newH, team: e.target.value })}
            className="db-form-input"
          />
          <input
            type="text"
            placeholder="Prize (e.g. $50,000)"
            value={newH.prize}
            onChange={e => setNewH({ ...newH, prize: e.target.value })}
            className="db-form-input"
          />
          <select
            value={newH.status}
            onChange={e => setNewH({ ...newH, status: e.target.value })}
            className="db-form-select"
          >
            <option value="Registered">Registered</option>
            <option value="Forming Team">Forming Team</option>
            <option value="Needs Team">Needs Team</option>
          </select>
          <button type="submit" className="db-form-submit-btn">Add to List</button>
        </form>
      )}

      <div className="db-table-responsive-wrap">
        <table className="db-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Hackathon</th>
              <th>Date</th>
              <th>Team Size</th>
              <th>Prize</th>
              <th>Status {interactive && <span className="db-th-hint">(click to toggle)</span>}</th>
              {interactive && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={interactive ? 7 : 6} style={{ textAlign: 'center', padding: '24px', color: 'var(--muted)' }}>
                  No hackathons match "{searchQuery}"
                </td>
              </tr>
            ) : (
              filtered.map((h, idx) => {
                const cfg = STATUS_CONFIG[h.status] || STATUS_CONFIG['Forming Team'];

                return (
                  <tr key={h.id}>
                    <td>{idx + 1}</td>
                    <td className="db-table-name-cell">
                      <strong>{h.name}</strong>
                    </td>
                    <td>{h.date}</td>
                    <td>{h.team}</td>
                    <td className="db-table-prize-cell">{h.prize}</td>
                    <td>
                      <button
                        type="button"
                        className={`db-table-status-btn ${interactive ? 'db-table-status-btn--interactive' : ''}`}
                        style={{ color: cfg.color, background: cfg.bg }}
                        onClick={() => cycleStatus(h.id)}
                        title={interactive ? "Click to change status" : undefined}
                      >
                        ● {h.status}
                      </button>
                    </td>
                    {interactive && (
                      <td>
                        <button
                          className="db-table-del-btn"
                          title="Delete hackathon"
                          onClick={() => deleteHackathon(h.id)}
                        >
                          ✕
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
