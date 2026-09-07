import './HowItWorks.css';
import Reveal from '../Reveal/Reveal.jsx';

const steps = [
  { n: '01', title: 'Discover', text: 'Find hackathons that match your interests, stack, and experience level.' },
  { n: '02', title: 'Collaborate', text: 'Meet like-minded builders and form a team with a shared goal.' },
  { n: '03', title: 'Build', text: 'Use starter templates, APIs, and resources to ship your idea fast.' },
  { n: '04', title: 'Win', text: 'Submit your project, get judged, and take home the prizes.' },
];

function HowItWorks() {
  return (
    <section className="how" id="how">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">How HackaMate works</span>
          <h2 className="section-title">Everything you need, in one place</h2>
          <p className="section-text">
            From finding the right challenge to assembling the right team,
            HackaMate keeps the whole journey connected.
          </p>
        </Reveal>
        <div className="how-grid">
          {steps.map((s, i) => (
            <Reveal className="reveal-cell" delay={i * 0.09} key={s.n}>
              <div className="how-card">
                <span className="how-num">{s.n}</span>
                <h3 className="how-title">{s.title}</h3>
                <p className="how-text">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
