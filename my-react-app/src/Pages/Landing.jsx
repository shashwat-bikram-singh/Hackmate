import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './Landing.css';
import Navbar from '../Components/Navbar/Navbar.jsx';
import Hero from '../Components/Hero/Hero.jsx';
import HowItWorks from '../Components/HowItWorks/HowItWorks.jsx';
import WhyHackaMate from '../Components/WhyHackaMate/WhyHackaMate.jsx';
import TeamMatch from '../Components/TeamMatch/TeamMatch.jsx';
import Hackathons from '../Components/Hackathons/Hackathons.jsx';
import CtaBanner from '../Components/CtaBanner/CtaBanner.jsx';
import Footer from '../Components/Footer/Footer.jsx';
import LandingIntro from '../Components/LandingIntro/LandingIntro.jsx';

function Landing() {
  const [introKey, setIntroKey] = useState(0);
  const [entered, setEntered] = useState(false);

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setEntered(false);
    setIntroKey((k) => k + 1);
  };

  return (
    <div className="landing-layout">
      <AnimatePresence mode="wait">
        <LandingIntro key={introKey} onFinish={() => setEntered(true)} />
      </AnimatePresence>

      <Navbar entered={entered} />
      <main className="landing-main">
        <Hero entered={entered} />
        <HowItWorks />
        <WhyHackaMate />
        <TeamMatch />
        <Hackathons />
        <CtaBanner />
      </main>
      <Footer />

      {/* Floating Replay Animation Button */}
      {entered && (
        <motion.button
          type="button"
          onClick={handleReplay}
          className="hm-replay-btn"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          title="Replay landing page entrance animation"
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
          <span>Replay</span>
        </motion.button>
      )}
    </div>
  );
}

export default Landing;
