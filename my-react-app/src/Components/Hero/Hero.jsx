import './Hero.css';

const avatars = ['#f97316', '#22c55e', '#38bdf8', '#a855f7', '#ec4899'];

const matches = [
  { title: 'AI Innovation Hack', meta: '$15K prizes · 12 days left' },
  { title: 'ETH Global Build', meta: '$50K prizes · 18 days left' },
  { title: 'CyberForge Hack', meta: '$10K prizes · 5 days left' },
  { title: 'CodeSprint Open', meta: '$5K prizes · 2 days left' },
];

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-inner">
        <div className="hero-left">
          <span className="eyebrow">Find · Build · Collaborate · Win</span>
          <h1 className="hero-title">Your gateway to limitless hackathons.</h1>
          <p className="hero-text">
            Connect with builders around the world, form a team backed by mentors,
            and ship real projects. One place for everything a hackathon needs.
          </p>
          <div className="hero-buttons">
            <a href="#hackathons" className="btn btn-primary">Explore hackathons</a>
            <a href="#/signup" className="btn btn-outline">Create account</a>
          </div>
          <div className="hero-social">
            <div className="avatars">
              {avatars.map((c) => (
                <span key={c} className="avatar" style={{ background: c }}></span>
              ))}
            </div>
            <span className="hero-social-text">500+ hackers building right now</span>
          </div>
        </div>

        <div className="hero-right">
          <div className="dashboard">
            <div className="dashboard-head">
              <h3>Welcome back, hacker</h3>
              <p>Your personalized hackathon dashboard</p>
            </div>
            <input
              className="dashboard-search"
              type="text"
              placeholder="Search by tech, track, or location"
            />
            <p className="dashboard-label">Active matches for you</p>
            <ul className="match-list">
              {matches.map((m) => (
                <li className="match" key={m.title}>
                  <span className="match-title">{m.title}</span>
                  <span className="match-meta">{m.meta}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
