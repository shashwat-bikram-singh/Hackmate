import './CtaBanner.css';

function CtaBanner() {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta-inner">
          <h2 className="cta-title">Build something crazy.</h2>
          <p className="cta-text">Find your hackathon, form your team, and ship your idea. Win together.</p>
          <a href="#/signup" className="btn cta-btn">Get started</a>
        </div>
      </div>
    </section>
  );
}

export default CtaBanner;
