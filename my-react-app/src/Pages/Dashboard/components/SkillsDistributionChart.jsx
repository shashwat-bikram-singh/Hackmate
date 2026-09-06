import React, { useState } from 'react';

export default function SkillsDistributionChart({ highlightSkill, interactive = false }) {
  const [skills, setSkills] = useState([
    { id: 'react', skill: 'React', count: 8162, pct: 100, color: 'var(--violet)' },
    { id: 'python', skill: 'Python', count: 6847, pct: 84, color: '#8b5cf6' },
    { id: 'node', skill: 'Node.js', count: 5231, pct: 64, color: '#10b981' },
    { id: 'figma', skill: 'Figma', count: 4128, pct: 51, color: '#f59e0b' },
    { id: 'ai', skill: 'ML/AI', count: 3567, pct: 44, color: '#ef4444' },
  ]);

  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCount, setNewSkillCount] = useState('2500');

  const activeHighlight = hoveredSkill || highlightSkill;

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    const count = parseInt(newSkillCount, 10) || 1000;
    const maxCount = Math.max(...skills.map(s => s.count), count);
    const pct = Math.round((count / maxCount) * 100);

    const colors = ['#2563eb', '#8b5cf6', '#10b981', '#f59e0b', '#06b6d4', '#ec4899'];
    const randomColor = colors[skills.length % colors.length];

    setSkills(prev => [
      ...prev,
      { id: Date.now().toString(), skill: newSkillName.trim(), count, pct, color: randomColor }
    ]);
    setNewSkillName('');
    setShowAddSkill(false);
  };

  return (
    <div className="db-card db-skills">
      <div className="db-card-header">
        <div>
          <h3 className="db-card-title">Skills Distribution</h3>
          <span className="db-card-meta-text">Top candidate stacks in network</span>
        </div>

        {interactive && (
          <button 
            className="db-card-small-btn" 
            onClick={() => setShowAddSkill(!showAddSkill)}
            title="Add new skill to chart"
          >
            {showAddSkill ? '✕' : '+ Skill'}
          </button>
        )}
      </div>

      {showAddSkill && (
        <form className="db-skills-add-form" onSubmit={handleAddSkill}>
          <input
            type="text"
            placeholder="Skill name (e.g. Solidity)"
            value={newSkillName}
            onChange={e => setNewSkillName(e.target.value)}
            className="db-form-input db-form-input--sm"
            required
          />
          <input
            type="number"
            placeholder="Count"
            value={newSkillCount}
            onChange={e => setNewSkillCount(e.target.value)}
            className="db-form-input db-form-input--sm"
          />
          <button type="submit" className="db-form-submit-btn db-form-submit-btn--sm">Add</button>
        </form>
      )}

      <div className="db-skills-list">
        {skills.map(item => {
          const isHighlighted = activeHighlight === item.skill;

          return (
            <div 
              className={`db-skills-row ${isHighlighted ? 'db-skills-row--highlight' : ''}`} 
              key={item.id}
              onMouseEnter={() => interactive && setHoveredSkill(item.skill)}
              onMouseLeave={() => interactive && setHoveredSkill(null)}
              style={interactive ? { cursor: 'pointer' } : undefined}
            >
              <div className="db-skills-row-header">
                <span className="db-skills-row-label">
                  {item.skill}
                  {isHighlighted && <span className="db-skill-active-badge">Active</span>}
                </span>
                <span className="db-skills-row-count">{item.count.toLocaleString()} matches</span>
              </div>
              <div className="db-skills-bar-track">
                <div 
                  className="db-skills-bar-fill" 
                  style={{ width: `${item.pct}%`, background: item.color }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
