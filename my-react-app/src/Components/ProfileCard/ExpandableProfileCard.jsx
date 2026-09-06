import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './ExpandableProfileCard.css';

export default function ExpandableProfileCard({
  imageSrc = 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1000',
  title = 'Jane Doe',
  subtitle = 'Senior UX Designer',
  content,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const layoutId = `expandable-profile-card-${(title || 'default').replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <>
      <motion.div
        layoutId={layoutId}
        onClick={() => setIsOpen(true)}
        className="expandable-card-container cursor-pointer relative h-64 w-100 overflow-hidden rounded-xl border border-border group shadow-sm"
        whileHover="hover"
      >
        <motion.img
          layoutId={`image-${layoutId}`}
          src={imageSrc}
          className="expandable-card-image absolute inset-0 h-full w-full object-cover"
          variants={{
            hover: { scale: 1.05 },
          }}
          transition={{ duration: 0.3 }}
        />
        <div className="expandable-card-gradient absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

        <div className="expandable-card-overlay">
          <motion.p
            layoutId={`subtitle-${layoutId}`}
            className="expandable-card-subtitle"
          >
            {subtitle}
          </motion.p>
          <motion.h3
            layoutId={`title-${layoutId}`}
            className="expandable-card-title"
          >
            {title}
          </motion.h3>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <div className="expandable-modal-root fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="expandable-modal-backdrop absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            <motion.div
              layoutId={layoutId}
              className="expandable-modal-dialog relative w-full max-w-4xl h-[80vh] bg-card rounded-2xl overflow-hidden border border-border z-10 flex flex-col md:flex-row shadow-xl"
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="expandable-modal-close absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center bg-background/50 hover:bg-accent rounded-full border border-border text-foreground transition-colors backdrop-blur-sm"
                aria-label="Close"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>

              <div className="expandable-modal-media relative h-64 w-full shrink-0 overflow-hidden md:h-full md:w-1/2">
                <motion.img
                  layoutId={`image-${layoutId}`}
                  src={imageSrc}
                  className="expandable-modal-img h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent md:hidden" />
              </div>

              <div className="expandable-modal-content p-6 sm:p-8 w-full md:w-1/2 flex flex-col h-full overflow-y-auto custom-scrollbar">
                <motion.p
                  layoutId={`subtitle-${layoutId}`}
                  className="expandable-modal-subtitle text-primary text-xs font-medium tracking-wide uppercase mb-3"
                >
                  {subtitle}
                </motion.p>
                <motion.h3
                  layoutId={`title-${layoutId}`}
                  className="expandable-modal-title text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mb-6 pb-4 border-b border-border"
                >
                  {title}
                </motion.h3>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ delay: 0.2 }}
                  className="expandable-modal-body text-foreground/80 text-sm leading-relaxed grow"
                >
                  {content || (
                    <div className="modal-content-stack flex flex-col gap-6">
                      <p>
                        A passionate creator with years of experience shipping impactful products.
                        Specializing in turning bold hackathon ideas into functional, production-ready prototypes.
                      </p>

                      <div>
                        <h4 className="modal-section-title text-foreground font-semibold tracking-tight mb-2">Background</h4>
                        <p className="modal-section-desc text-muted-foreground">
                          Experienced in rapid prototyping, cross-functional collaboration, and shipping full-stack applications under tight deadlines.
                        </p>
                      </div>

                      <div>
                        <h4 className="modal-section-title text-foreground font-semibold tracking-tight mb-2">Current Focus</h4>
                        <p className="modal-section-desc text-muted-foreground">
                          Assembling dream hackathon teams, mentoring developers, and exploring cutting-edge AI tools for builder collaboration.
                        </p>
                      </div>

                      <a
                        href="#/contact"
                        className="modal-connect-btn mt-4 px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity self-start shadow-sm"
                      >
                        Connect with {title.split(' ')[0]}
                      </a>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
