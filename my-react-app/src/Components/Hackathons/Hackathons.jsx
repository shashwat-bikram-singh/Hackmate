import './Hackathons.css';
import Reveal from '../Reveal/Reveal.jsx';

const filters = ['All', 'AI / ML', 'Web3', 'Mobile', 'FinTech', 'Open source'];

const events = [
  { tag: 'AI / ML', title: 'AI Innovation Hack', prize: '$15K', days: '12 days left', tech: ['Python', 'LLMs', 'APIs'] },
  { tag: 'Web3', title: 'ETH Global Build', prize: '$50K', days: '18 days left', tech: ['Solidity', 'Web3', 'React'] },
  { tag: 'Open source', title: 'CodeSprint Open', prize: '$5K', days: '2 days left', tech: ['Go', 'Rust', 'CLI'] },
  { tag: 'Security', title: 'CyberForge Hack', prize: '$10K', days: '5 days left', tech: ['Security', 'Networking'] },
];

function Hackathons() {
  return (
    <section className="events" id="hackathons">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Live now</span>
          <h2 className="section-title">Find your next challenge</h2>
          <p className="section-text">Browse open hackathons across the tech you care about.</p>
        </Reveal>

        <Reveal className="filters" delay={0.08}>
          {filters.map((f, i) => (
            <button className={i === 0 ? 'filter filter-active' : 'filter'} key={f} type="button">
              {f}
            </button>
          ))}
        </Reveal>

        <div className="events-grid">
          {events.map((e, i) => (
            <Reveal className="reveal-cell" delay={i * 0.09} key={e.title}>
              <div className="event-card">
                <span className="event-tag">{e.tag}</span>
                <h3 className="event-title">{e.title}</h3>
                <div className="event-meta">
                  <span className="event-prize">{e.prize} prizes</span>
                  <span className="event-days">{e.days}</span>
                </div>
                <div className="event-tech">
                  {e.tech.map((t) => (
                    <span className="chip" key={t}>{t}</span>
                  ))}
                </div>
                <a href="#/signup" className="btn btn-outline event-btn">Explore</a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hackathons;
