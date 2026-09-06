import React, { useState, useRef } from 'react';
import './about.css';
import ExpandableProfileCard from '../../Components/ProfileCard/ExpandableProfileCard.jsx';


export function EditableImage({
  initialSrc,
  alt = 'Demo Asset',
  className = '',
  aspectRatio,
  borderRadius,
}) {
  const [src, setSrc] = useState(initialSrc);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSrc(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsHovered(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSrc(URL.createObjectURL(file));
    }
  };

  return (
    <div
      className={`editable-image-container ${className}`}
      style={{
        borderRadius: borderRadius || 'inherit',
        aspectRatio: aspectRatio || 'auto',
      }}
      onClick={() => fileInputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setIsHovered(true);
      }}
      onDragLeave={() => setIsHovered(false)}
      onDrop={handleDrop}
      title="Click or drag an image here to change it"
    >
      <img src={src} alt={alt} className="editable-img" />
      <div className={`editable-overlay ${isHovered ? 'force-visible' : ''}`}>
        <div className="editable-pill">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
          <span>Change</span>
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleUpload}
        accept="image/*"
        style={{ display: 'none' }}
      />
    </div>
  );
}

const teamMembers = [
  {
    name: 'Clarissa Miller',
    role: 'CEO / Founder',
    theme: 'yellow',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    bio: 'Passionate about empowering developers, designers, and innovators to build groundbreaking technology together.',
    focus: 'Product Strategy · Venture · Ecosystem',
    stats: { hackathons: '24+', projects: '40+', experience: '8 yrs' },
    skills: ['Leadership', 'Product Vision', 'Venture Capital', 'Community'],
    handle: '@clarissa_builds',
  },
  {
    name: 'Edward Calloway',
    role: 'CTO / Co-Founder',
    theme: 'dark',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    bio: 'Architecting intelligent skill-matching algorithms and real-time collaboration infrastructure for builders.',
    focus: 'Distributed Systems · Cloud · Realtime',
    stats: { hackathons: '18+', projects: '65+', experience: '10 yrs' },
    skills: ['Go', 'Rust', 'Kubernetes', 'WebSockets', 'PostgreSQL'],
    handle: '@calloway_dev',
  },
  {
    name: 'Juliet Stanton',
    role: 'Community Lead',
    theme: 'dark',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    bio: 'Connecting active hackathon teams with top-tier industry mentors, workshop leaders, and sponsors.',
    focus: 'DevRel · Mentorship · Event Operations',
    stats: { hackathons: '30+', projects: '120+ teams', experience: '5 yrs' },
    skills: ['Event Ops', 'DevRel', 'Discord Ops', 'Public Speaking'],
    handle: '@juliet_stanton',
  },
  {
    name: 'Anna Huntington',
    role: 'Growth & Partnerships',
    theme: 'dark',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    bio: 'Partnering with universities and global organizers to make hackathons more accessible to every builder.',
    focus: 'Global Partnerships · University Outreach',
    stats: { hackathons: '50+ partners', projects: '80+ unis', experience: '6 yrs' },
    skills: ['University Hubs', 'Sponsorships', 'Marketing', 'Analytics'],
    handle: '@anna_growth',
  },
  {
    name: 'Craig Horton',
    role: 'Senior Full-Stack Engineer',
    theme: 'dark',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    bio: 'Designing high-speed team formation pipelines, live workspace integrations, and real-time messaging.',
    focus: 'Full-Stack Architecture · API Design',
    stats: { hackathons: '15+', projects: '30+', experience: '7 yrs' },
    skills: ['TypeScript', 'React', 'Node.js', 'Redis', 'GraphQL'],
    handle: '@craig_codes',
  },
  {
    name: 'Andy Smith',
    role: 'Frontend Architect',
    theme: 'dark',
    img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
    bio: 'Crafting responsive, intuitive user interfaces that help hackers discover projects and teammates in seconds.',
    focus: 'Design Systems · Web Performance · Animation',
    stats: { hackathons: '12+', projects: '25+', experience: '6 yrs' },
    skills: ['React', 'CSS Architecture', 'Animations', 'Next.js', 'Vite'],
    handle: '@andysmith_ui',
  },
  {
    name: 'Keera Warning',
    role: 'Product Designer',
    theme: 'dark',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    bio: 'Designing frictionless user experiences centered around seamless developer collaboration and team discovery.',
    focus: 'UI/UX · Design Systems · User Research',
    stats: { hackathons: '10+', projects: '35+', experience: '5 yrs' },
    skills: ['Figma', 'Prototyping', 'User Research', 'Design Systems'],
    handle: '@keera_designs',
  },
  {
    name: 'Mike Owens',
    role: 'Security & Platform Lead',
    theme: 'dark',
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    bio: 'Maintaining bank-grade security, authenticated communication channels, and 99.9% platform availability.',
    focus: 'Zero-Trust · Cloud Security · Compliance',
    stats: { hackathons: '8+', projects: '99.99% SLA', experience: '9 yrs' },
    skills: ['AWS', 'OAuth 2.0', 'Docker', 'Pen Testing', 'Terraform'],
    handle: '@mike_secops',
  },
  {
    name: 'Anthony Chiralla',
    role: 'AI / ML Scientist',
    theme: 'white',
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    bio: 'Pioneering vector-based skill matching to ensure every team has the perfect balance of technical capabilities.',
    focus: 'Vector Search · Embeddings · RecSys',
    stats: { hackathons: '14+', projects: '45+', experience: '6 yrs' },
    skills: ['Python', 'PyTorch', 'FastAPI', 'LangChain', 'Qdrant'],
    handle: '@chiralla_ai',
  },
];

const faqs = [
  { q: 'What is HackaMate?', a: 'HackaMate is a dedicated platform designed for builders to discover hackathons, assemble balanced dream teams by skill and stack, and collaborate efficiently from day zero.' },
  { q: 'Is HackaMate free for builders?', a: 'Yes, HackaMate is 100% free for individual developers, designers, and innovators participating in hackathons.' },
  { q: 'How does team matching work?', a: 'We match you with teammates based on complementary tech stacks (e.g. Frontend, Backend, AI/ML, Design), project interests, and timezone compatibility.' },
  { q: 'Can I form a team before the hackathon begins?', a: 'Yes! Pre-event formation ensures your team is aligned and ready so your very first working hour goes into building rather than recruiting.' },
  { q: 'Can I register an existing team with open roles?', a: 'Absolutely. Team leads can list their project concept and specify open roles (e.g. Looking for a PyTorch developer or UI designer).' },
  { q: 'How do I communicate with matched teammates?', a: 'Once matched, you can coordinate via integrated workspace channels, or connect directly through Discord, Slack, and GitHub.' },
  { q: 'Are mentors and resources provided?', a: 'Yes, event organizers and industry mentors offer office hours, curated starter templates, and sandbox credentials directly through HackaMate.' },
];

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="about-wrapper">
      {/* Hero Section */}
      <section className="about-hero">
        <h1>About HackaMate</h1>
        <p className="hero-subtext">
          Connecting passionate builders, creators, and innovators with their dream hackathon teams.<br />
          Form balanced teams by skill and stack, access mentorship, and turn bold ideas into winning projects.
        </p>

        {/* Bento Grid */}
        <div className="bento-grid">
          {/* Card 1: 10X */}
          <div className="bento-card bento-stat-dark">
            <h2>10X</h2>
            <p>Faster team formation before kickoff, saving crucial hacking hours for actual building.</p>
          </div>

          {/* Card 2: Team Standing (Editable) */}
          <div className="bento-card bento-media">
            <EditableImage
              initialSrc="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
              alt="Team members collaborating"
              borderRadius="14px"
            />
          </div>

          {/* Card 3: Tall Center Portrait (Editable) */}
          <div className="bento-card bento-center-portrait">
            <EditableImage
              initialSrc="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"
              alt="Hacker portrait"
              borderRadius="14px"
            />
          </div>

          {/* Card 4: Executive Sitting (Editable) */}
          <div className="bento-card bento-media">
            <EditableImage
              initialSrc="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80"
              alt="Builders in discussion"
              borderRadius="14px"
            />
          </div>

          {/* Card 5: 240K+ */}
          <div className="bento-card bento-stat-yellow">
            
            <p>Hackathon projects shipped and developers connected across.</p>
          </div>
        </div>

        {/* Bento Headline Footer */}
        <div className="bento-sub-headline">
          <h2 className="headline-text">
            We empower the next generation of<br />
            <span>hackathon</span>
          </h2>
          <div className="headline-paragraphs">
            <p>HackaMate turns the last-minute teammate scramble into a seamless, five-minute match based on real technical alignment.</p>
            <p>Find teammates whose skills complement yours — frontend, backend, AI/ML, and design — before the clock starts ticking.</p>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="about-feature">
        <div className="feature-content">
          <h2>Built by developers, for developers who want to create without friction.</h2>
          <div className="feature-icon"></div>
          <p>Most hackathons don’t run out of great ideas — they run out of teammates. HackaMate matches you with partners who fill your technical gaps and share your ambition.</p>
          <a href="#/signup" className="btn-dark">Start Your Journey</a>
        </div>
        <div className="feature-image-box">
          <EditableImage
            initialSrc="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80"
            alt="Workspace collaboration"
            borderRadius="18px"
          />
        </div>
      </section>

      {/* Core Values Section */}
      <section className="core-values-section">
        <div className="section-badge">•</div>
        <h2>Core values</h2>
        <p className="section-description">
          The core principles driving our mission to eliminate hackathon frustration .
        </p>

        <div className="values-grid">
          <div className="val-card val-white">
            <div className="val-icon">💡</div>
            <h3>Innovation</h3>
            <p>Encouraging fearless experimentation and building breakthrough tools that push technological limits.</p>
          </div>
          <div className="val-card val-yellow">
            <div className="val-icon">👥</div>
            <h3>Collaboration</h3>
            <p>Connecting people through complementary skills so every team has the talent needed to ship winning prototypes.</p>
          </div>
          <div className="val-card val-dark">
            <div className="val-icon">👑</div>
            <h3>Excellence</h3>
            <p>Providing top-tier developer tooling, curated hackathon tracks, and round-the-clock mentor support.</p>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="team-section">
        <div className="section-badge">👥</div>
        <h2>Meet the team</h2>
        <p className="section-description">
          The team passionate about helping every developers find their tribe and ship incredible projects.
        </p>

        <div className="team-grid">
          {teamMembers.map((member, i) => (
            <ExpandableProfileCard
              key={i}
              imageSrc={member.img}
              title={member.name}
              subtitle={member.role}
              content={
                <div className="modal-content-stack flex flex-col gap-6">
                  <p>{member.bio}</p>
                  <div>
                    <h4 className="modal-section-title text-foreground font-semibold tracking-tight mb-2">Core Focus</h4>
                    <p className="modal-section-desc text-muted-foreground">{member.focus}</p>
                  </div>
                  <div>
                    <h4 className="modal-section-title text-foreground font-semibold tracking-tight mb-2">Expertise & Stack</h4>
                    <p className="modal-section-desc text-muted-foreground">{member.skills.join(' · ')}</p>
                  </div>
                  <div>
                    <h4 className="modal-section-title text-foreground font-semibold tracking-tight mb-2">Hackathon Track Record</h4>
                    <p className="modal-section-desc text-muted-foreground">
                      {member.stats.hackathons} hackathons · {member.stats.projects} projects shipped · {member.stats.experience} experience
                    </p>
                  </div>
                  <a
                    href="#/contact"
                    className="modal-connect-btn mt-4 px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity self-start shadow-sm"
                  >
                    Connect with {member.name.split(' ')[0]}
                  </a>
                </div>
              }
            />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="section-badge">•</div>
        <h2>What builders are saying</h2>
        <p className="section-description">
          Real stories from developers, designers, and innovators who found their teams on HackaMate.
        </p>

        <div className="testimonials-cards">
          {[
            {
              quote: 'HackaMate matched us with a talented ML engineer and UI designer in minutes. Our team shipped an end-to-end demo and won 1st place!',
              name: 'Alexia Simons',
              img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
            },
            {
              quote: 'I used to hack solo because finding teammates on Discord was chaos. On HackaMate, everyone was committed and our skills clicked immediately.',
              name: 'Andrew Jacobs',
              img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
            },
            {
              quote: 'The skill-based matching is unreal. We assembled a 4-person team across three timezones and shipped a full production-grade prototype.',
              name: 'Alexander Bivak',
              img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
            },
          ].map((item, idx) => (
            <div key={idx} className="t-card">
              <p className="t-quote">"{item.quote}"</p>
              <div className="t-author">
                <div className="t-avatar">
                  <EditableImage initialSrc={item.img} alt={item.name} borderRadius="50%" />
                </div>
                <div>
                  <strong>{item.name}</strong>
                  <span>Verified developers</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Community FAQ */}
      <section className="faq-section" id="faq">
        <div className="faq-sidebar">
          <h2>Community FAQs</h2>
          <p>Everything you need to know about teaming up, discovering hackathons, and building on HackaMate.</p>
        </div>
        <div className="faq-accordion">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item" onClick={() => toggleFaq(index)}>
              <div className="faq-header">
                <span>{faq.q}</span>
                <span className="faq-plus">{openFaq === index ? '−' : '+'}</span>
              </div>
              {openFaq === index && <p className="faq-body">{faq.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="cta-banner">
        <div className="cta-left">
          <h2>Ready to build something<br />legendary?</h2>
          <p>Join hundreds of developers turning hackathon ideas into shipped products. Find your dream team today.</p>
          <a href="#/signup" className="btn-dark">Get Started</a>
        </div>
        <div className="cta-mosaic-grid">
          {[
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
            'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80',
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80',
            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
            'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
          ].map((url, i) => (
            <div key={i} className="mosaic-cell">
              <EditableImage initialSrc={url} alt={`User ${i}`} borderRadius="6px" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}