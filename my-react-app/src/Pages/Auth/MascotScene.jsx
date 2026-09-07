import React, { useRef, useEffect } from "react";
import { motion } from "motion/react";
import "./MascotScene.css";

/*
  MascotScene — four geometric characters with live cursor-tracking pupils.

  Architecture:
  - A single `mousemove` listener on `window` stores cursor {x,y} in a ref.
  - A `requestAnimationFrame` loop reads the cursor and computes each pupil's
    offset using atan2, then writes directly to each pupil DOM node's
    style.transform — zero React re-renders for tracking.
  - eyeState prop still controls open/closed shape (shy = closed arcs).
*/

const PUPIL_RADIUS = 2.5; // max px offset from center
const CHARS = [
  { color: "#f59e0b", w: 40,  h: 65,  r: "20px",                   delay: 0,    rot: -10, bobClass: "bob-0" },
  { color: "#f97316", w: 74,  h: 46,  r: "50% 50% 10px 10px",      delay: 0.15, rot: 8,   bobClass: "bob-1" },
  { color: "#1e2130", w: 50,  h: 90,  r: "14px",                    delay: 0.3,  rot: -7,  bobClass: "bob-2" },
  { color: "var(--violet, #2563eb)", w: 60, h: 122, r: "16px",      delay: 0.45, rot: 12,  bobClass: "bob-3" },
];

export default function MascotScene({ eyeState = "idle", dropped = false, assembled = false }) {
  const pupilRefs = useRef([]);  // flat array of all pupil DOM nodes (8 total, 2 per char)
  const mouseRef  = useRef({ x: -9999, y: -9999 });
  const rafRef    = useRef(null);

  /* Register a pupil ref at a flat index */
  const setPupilRef = (flatIdx) => (el) => {
    pupilRefs.current[flatIdx] = el;
  };

  /* mousemove → store in ref (no re-render) */
  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* RAF loop — compute pupil offsets imperatively */
  useEffect(() => {
    const tick = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      pupilRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.parentElement.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const angle = Math.atan2(my - cy, mx - cx);
        const dist = Math.min(
          Math.hypot(mx - cx, my - cy) * 0.008,
          PUPIL_RADIUS
        );
        const px = Math.cos(angle) * dist;
        const py = Math.sin(angle) * dist;
        el.style.transform = "translate(calc(-50% + " + px.toFixed(1) + "px), calc(-50% + " + py.toFixed(1) + "px))";
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const shy = eyeState === "shy";

  return (
    <div className="mascot-area">
      <div className="mascot-group">
        {CHARS.map((c, ci) => (
          <motion.div
            key={ci}
            className={"mascot-char " + (assembled ? c.bobClass : "")}
            initial={{ y: -340, opacity: 0, rotate: c.rot }}
            animate={
              dropped
                ? { y: 0, opacity: 1, rotate: assembled ? 0 : c.rot * 0.3 }
                : { y: -340, opacity: 0, rotate: c.rot }
            }
            transition={{
              type: "spring",
              stiffness: 190,
              damping: 16,
              delay: c.delay,
            }}
          >
            <div
              className="mascot-body"
              style={{
                width: c.w,
                height: c.h,
                background: c.color,
                borderRadius: c.r,
              }}
            >
              <div className="mascot-face">
                <div className="mascot-eyes">
                  <div className={"mascot-eye" + (shy ? " closed" : "")}>
                    <div className="mascot-pupil" ref={setPupilRef(ci * 2)} />
                  </div>
                  <div className={"mascot-eye" + (shy ? " closed" : "")}>
                    <div className="mascot-pupil" ref={setPupilRef(ci * 2 + 1)} />
                  </div>
                </div>
                <div className={"mascot-mouth" + (shy ? "" : " smile")} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
