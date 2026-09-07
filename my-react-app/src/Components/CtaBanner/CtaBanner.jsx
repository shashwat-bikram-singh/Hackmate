import './CtaBanner.css';
import Reveal from '../Reveal/Reveal.jsx';

function CtaBanner() {
  return (
    <section className="cta">
      <div className="container">
        <Reveal className="cta-inner" scale={0.96} y={22}>
          <h2 className="cta-title">Build something crazy.</h2>
          <p className="cta-text">Find your hackathon, form your team, and ship your idea. Win together.</p>
          <a href="#/signup" className="btn cta-btn">Get started</a>
        </Reveal>
      </div>
    </section>
  );
}

export default CtaBanner;
