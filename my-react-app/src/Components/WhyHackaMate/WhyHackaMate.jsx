import React from 'react';
import './WhyHackaMate.css';

const features = [
  {
    title: 'Smart discovery',
    text: 'Recommendations tuned to your background and the tech you like to work with.',
    color: '#2563eb',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" fillOpacity="0.25" />
      </svg>
    ),
  },
  {
    title: 'Mentor network',
    text: 'Get unstuck fast with mentors and office hours running through the event.',
    color: '#f97316',
    gradient: 'linear-gradient(135deg, #fb923c 0%, #ea580c 100%)',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" fill="currentColor" fillOpacity="0.2" />
      </svg>
    ),
  },
  {
    title: 'Team finder',
    text: 'Filter and browse to find co-builders instead of hacking solo.',
    color: '#16a34a',
    gradient: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" fill="currentColor" fillOpacity="0.2" />
        <line x1="19" y1="8" x2="19" y2="14" />
        <line x1="22" y1="11" x2="16" y2="11" />
      </svg>
    ),
  },
  {
    title: 'Deadline tracker',
    text: 'Keep on top of checkpoints, submissions, and presentation calls.',
    color: '#db2777',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="13" r="8" fill="currentColor" fillOpacity="0.2" />
        <polyline points="12 9 12 13 14.5 15.5" />
        <path d="M12 2v3" />
        <path d="M9 2h6" />
      </svg>
    ),
  },
  {
    title: 'Curated resources',
    text: 'Reach sandbox credentials, mock APIs, and sponsor tools in one spot.',
    color: '#0284c7',
    gradient: 'linear-gradient(135deg, #38bdf8 0%, #0369a1 100%)',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" fill="currentColor" fillOpacity="0.25" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    title: 'Project showcase',
    text: 'Build a clean portfolio profile from the projects you have shipped.',
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, #a855f7 0%, #6d28d9 100%)',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.45 1-1 1H7v4h10v-4h-2a1 1 0 0 1-1-1v-2.34" />
        <path d="M6 4h12v7a6 6 0 0 1-12 0V4z" fill="currentColor" fillOpacity="0.2" />
      </svg>
    ),
  },
];

function WhyHackaMate() {
  return (
    <section className="why" id="features">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Why HackaMate</span>
          <h2 className="section-title">Hack smarter. Build better.</h2>
          <p className="section-text">
            A workspace built to remove the friction builders hit at every step of a hackathon.
          </p>
        </div>
        <div className="why-grid">
          {features.map((f) => (
            <div className="why-card" key={f.title}>
              <div
                className="why-dot"
                style={{ background: f.gradient || f.color }}
                aria-label={f.title}
              >
                {f.icon}
              </div>
              <h3 className="why-title">{f.title}</h3>
              <p className="why-text">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyHackaMate;
