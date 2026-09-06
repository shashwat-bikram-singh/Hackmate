import React from 'react';
import './TeamMatch.css';
import ExpandableProfileCard from '../ProfileCard/ExpandableProfileCard.jsx';

import SaveToggle from '../AuthToggle/SaveToggle.jsx';

const openRoles = ['Frontend', 'Backend', 'ML engineer', 'Designer'];

const members = [
  {
    name: 'Aria Menon',
    role: 'Full-stack developer',
    tags: 'React · Node · Postgres',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    bio: 'Full-stack developer specializing in real-time collaborative workspaces, WebSockets, and distributed Postgres backends.',
    focus: 'Realtime Infrastructure · AI Copilots',
    stack: 'React, Node.js, PostgreSQL, WebSockets, Docker',
    stats: '5 hackathons · 12 projects shipped',
  },
  {
    name: 'Diego Alvarez',
    role: 'UI/UX designer',
    tags: 'Figma · Prototyping',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    bio: 'Product designer obsessed with sleek developer tools, intuitive interaction states, and rapid Figma-to-code design systems.',
    focus: 'Design Systems · Micro-interactions',
    stack: 'Figma, Tailwind CSS, Motion, Prototyping, UX Research',
    stats: '8 hackathons · 2x Best Design Winner',
  },
  {
    name: 'Sara Okafor',
    role: 'ML engineer',
    tags: 'Python · PyTorch',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    bio: 'Machine learning researcher building vector search embeddings and fine-tuned LLM agents for smart team matchmaking.',
    focus: 'Vector Search · LLM Agents · RecSys',
    stack: 'Python, PyTorch, FastAPI, LangChain, Qdrant',
    stats: '6 hackathons · 1st Place Global Hack 2025',
  },
];

function TeamMatch() {
  return (
    <section className="team" id="teams">
      <div className="container team-grid">
        {/* Column 1: For teams */}
        <div className="team-col">
          <span className="eyebrow">For teams</span>
          <h2 className="team-heading">Stop searching. Start building.</h2>
          <p className="team-sub">Post the roles you need and let the right builders come to you.</p>

          <div className="panel">
            <div className="panel-head">
              <span className="panel-title">AI Innovation Hackathon</span>
              <span className="tag">Recruiting</span>
            </div>
            <p className="panel-meta">3 of 5 spots filled</p>
            <div className="role-list">
              {openRoles.map((r) => (
                <span className="role" key={r}>{r}</span>
              ))}
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-start' }}>
              <SaveToggle
                size="sm"
                idleText="Post your team"
                savedText="Team created!"
                loadingDuration={850}
                successDuration={700}
                onComplete={() => {
                  window.location.hash = '#/signup';
                }}
              />
            </div>
          </div>
        </div>

        {/* Column 2: For builders with Expandable Profile Cards */}
        <div className="team-col team-col-builders">
          <span className="eyebrow">For builders</span>
          <h2 className="team-heading">Your idea needs a team.</h2>
          <p className="team-sub">Browse builders by skill and click to see their full profile and connect.</p>

          <div className="landing-builder-grid">
            {members.map((m) => (
              <ExpandableProfileCard
                key={m.name}
                imageSrc={m.img}
                title={m.name}
                subtitle={`${m.role} · ${m.tags}`}
                content={
                  <div className="modal-content-stack flex flex-col gap-6">
                    <p>{m.bio}</p>
                    <div>
                      <h4 className="modal-section-title text-foreground font-semibold tracking-tight mb-2">Core Focus</h4>
                      <p className="modal-section-desc text-muted-foreground">{m.focus}</p>
                    </div>
                    <div>
                      <h4 className="modal-section-title text-foreground font-semibold tracking-tight mb-2">Stack & Skills</h4>
                      <p className="modal-section-desc text-muted-foreground">{m.stack}</p>
                    </div>
                    <div>
                      <h4 className="modal-section-title text-foreground font-semibold tracking-tight mb-2">Track Record</h4>
                      <p className="modal-section-desc text-muted-foreground">{m.stats}</p>
                    </div>
                    <a
                      href="#/contact"
                      className="modal-connect-btn mt-4 px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity self-start shadow-sm"
                    >
                      Team up with {m.name.split(' ')[0]}
                    </a>
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TeamMatch;
