import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
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
  const [entered, setEntered] = useState(false);

  return (
    <div className="landing-layout">
      <AnimatePresence mode="wait">
        <LandingIntro onFinish={() => setEntered(true)} />
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
    </div>
  );
}

export default Landing;
