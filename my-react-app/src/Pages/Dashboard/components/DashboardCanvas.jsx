import React, { useState } from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar.jsx';
import TopNav from './TopNav.jsx';
import KPICards from './KPICards.jsx';
import MatchActivityChart from './MatchActivityChart.jsx';
import SkillsDistributionChart from './SkillsDistributionChart.jsx';
import TeamCompositionCard from './TeamCompositionCard.jsx';
import MatchSuccessGauge from './MatchSuccessGauge.jsx';
import ActiveHackathonsTable from './ActiveHackathonsTable.jsx';
import AddWidgetDrawer from './AddWidgetDrawer.jsx';
import ActiveWidgets from './ActiveWidgets.jsx';

/**
 * DashboardCanvas — the full dashboard layout with interactive & editable capabilities.
 */
function DashboardCanvas({
  animateKPIs = false,
  animateGauge = false,
  showTooltip = false,
  highlightSkill = null,
  drawerOpen = false,
  onToggleDrawer,
  interactive = false,
  onReplayIntro,
}) {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Editable Dashboard Title
  const [dashboardTitle, setDashboardTitle] = useState('HackaMate Team Matching Dashboard');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(dashboardTitle);

  // Active Widgets added from Add Widget drawer
  const [activeWidgets, setActiveWidgets] = useState(['radar', 'checklist', 'calendar']);

  const handleToggleWidget = (widgetId) => {
    setActiveWidgets(prev => 
      prev.includes(widgetId) 
        ? prev.filter(id => id !== widgetId) 
        : [...prev, widgetId]
    );
  };

  const handleRemoveWidget = (widgetId) => {
    setActiveWidgets(prev => prev.filter(id => id !== widgetId));
  };

  const handleSaveTitle = (e) => {
    e.preventDefault();
    if (tempTitle.trim()) {
      setDashboardTitle(tempTitle.trim());
    }
    setIsEditingTitle(false);
  };

  return (
    <div className={`db-canvas ${interactive ? 'db-canvas--interactive' : ''}`}>
      <Sidebar
        activeItem={activeNav}
        onNavClick={interactive ? (key) => { setActiveNav(key); setSidebarOpen(false); } : undefined}
        interactive={interactive}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="db-main">
        <TopNav 
          onAddWidget={onToggleDrawer} 
          interactive={interactive}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onReplayIntro={onReplayIntro}
          onToggleSidebar={() => setSidebarOpen(prev => !prev)}
        />

        <div className="db-content">
          {/* Header row with editable title */}
          <div className="db-title-bar">
            {isEditingTitle ? (
              <form className="db-title-edit-form" onSubmit={handleSaveTitle}>
                <input
                  type="text"
                  className="db-title-edit-input"
                  value={tempTitle}
                  onChange={e => setTempTitle(e.target.value)}
                  autoFocus
                />
                <button type="submit" className="db-title-btn-save">Save</button>
                <button type="button" className="db-title-btn-cancel" onClick={() => setIsEditingTitle(false)}>Cancel</button>
              </form>
            ) : (
              <div className="db-title-display-wrap">
                <a href="#/" className="db-title-home-link" title="Back to HackaMate Landing Page">
                  <h1 className="db-page-title">{dashboardTitle}</h1>
                </a>
                <a href="#/" className="db-back-home-badge" title="Back to Landing Page">
                  ← Landing Page
                </a>
                {interactive && (
                  <button 
                    className="db-title-edit-btn" 
                    title="Edit dashboard title"
                    onClick={() => {
                      setTempTitle(dashboardTitle);
                      setIsEditingTitle(true);
                    }}
                  >
                    ✎ Rename
                  </button>
                )}
              </div>
            )}

            {interactive && (
              <div className="db-quick-stats-pill">
                <span>⚡ Live Mode Active</span>
                <span className="db-pulse-dot" />
              </div>
            )}
          </div>

          {/* KPI row */}
          <KPICards animate={animateKPIs} interactive={interactive} />

          {/* Active Custom Widgets (added via + Add widget) */}
          <ActiveWidgets 
            activeWidgets={activeWidgets} 
            onRemoveWidget={handleRemoveWidget} 
          />

          {/* Charts row */}
          <div className="db-grid-2">
            <MatchActivityChart 
              showTooltip={showTooltip} 
              interactive={interactive}
            />
            <div className="db-grid-col-right">
              <SkillsDistributionChart 
                highlightSkill={highlightSkill} 
                interactive={interactive}
              />
            </div>
          </div>

          {/* Bottom row */}
          <div className="db-grid-3">
            <TeamCompositionCard interactive={interactive} />
            <MatchSuccessGauge 
              animate={animateGauge} 
              interactive={interactive}
            />
          </div>

          {/* Hackathons Table */}
          <ActiveHackathonsTable 
            searchQuery={searchQuery} 
            interactive={interactive}
          />
        </div>
      </div>

      {/* Widget drawer */}
      <AddWidgetDrawer 
        isOpen={drawerOpen} 
        onClose={onToggleDrawer} 
        activeWidgets={activeWidgets}
        onToggleWidget={handleToggleWidget}
      />
    </div>
  );
}

export default DashboardCanvas;
