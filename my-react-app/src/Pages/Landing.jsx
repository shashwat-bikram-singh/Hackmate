import Navbar from '../Components/Navbar/Navbar.jsx';
import Hero from '../Components/Hero/Hero.jsx';
import HowItWorks from '../Components/HowItWorks/HowItWorks.jsx';
import WhyHackaMate from '../Components/WhyHackaMate/WhyHackaMate.jsx';
import TeamMatch from '../Components/TeamMatch/TeamMatch.jsx';
import Hackathons from '../Components/Hackathons/Hackathons.jsx';
import CtaBanner from '../Components/CtaBanner/CtaBanner.jsx';
import Footer from '../Components/Footer/Footer.jsx';

function Landing() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <WhyHackaMate />
        <TeamMatch />
        <Hackathons />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}

export default Landing;
