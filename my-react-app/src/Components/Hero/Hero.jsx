import { motion, useReducedMotion } from 'motion/react';
import './Hero.css';

const avatars = ['#f97316', '#22c55e', '#38bdf8', '#a855f7', '#ec4899'];

const matches = [
  { title: 'AI Innovation Hack', meta: '$15K prizes · 12 days left' },
  { title: 'ETH Global Build', meta: '$50K prizes · 18 days left' },
  { title: 'CyberForge Hack', meta: '$10K prizes · 5 days left' },
  { title: 'CodeSprint Open', meta: '$5K prizes · 2 days left' },
];

// The left column reveals its children one after another as the intro lifts.
const leftContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.06 },
  },
};

const leftItem = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// `entered` gates the entrance so it plays in sync with the intro overlay
// lifting. Defaults to true so the hero is never stuck hidden if mounted alone.
function Hero({ entered = true }) {
  const reduce = useReducedMotion();

  return (
    <section className="hero" id="top">
      <div className="container hero-inner">
        <motion.div
          className="hero-left"
          variants={leftContainer}
          initial={reduce ? false : 'hidden'}
          animate={entered ? 'show' : 'hidden'}
        >
          <motion.span className="eyebrow" variants={leftItem}>
            Find · Build · Collaborate · Win
          </motion.span>
          <motion.h1 className="hero-title" variants={leftItem}>
            Your gateway to limitless hackathons.
          </motion.h1>
          <motion.p className="hero-text" variants={leftItem}>
            Connect with builders around the world, form a team backed by mentors,
            and ship real projects. One place for everything a hackathon needs.
          </motion.p>
          <motion.div className="hero-buttons" variants={leftItem}>
            <a href="#hackathons" className="btn btn-primary">Explore hackathons</a>
            <a href="#/signup" className="btn btn-outline">Create account</a>
          </motion.div>
          <motion.div className="hero-social" variants={leftItem}>
            <div className="avatars">
              {avatars.map((c) => (
                <span key={c} className="avatar" style={{ background: c }}></span>
              ))}
            </div>
            <span className="hero-social-text">500+ hackers building right now</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-right"
          initial={reduce ? false : { opacity: 0, x: 40, scale: 0.96 }}
          animate={
            entered
              ? { opacity: 1, x: 0, scale: 1 }
              : { opacity: 0, x: 40, scale: 0.96 }
          }
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
        >
          <motion.div
            className="dashboard"
            animate={
              entered && !reduce
                ? { y: [0, -6, 0] }
                : { y: 0 }
            }
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.9,
            }}
          >
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
