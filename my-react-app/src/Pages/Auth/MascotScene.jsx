import React, { useRef, useEffect } from "react";
import { motion } from "motion/react";
import "./MascotScene.css";

/*
  MascotScene — 4 characters matching reference composition:
  - Violet tall rectangle (back-left)
  - Charcoal medium rectangle (back-right)
  - Orange dome (front-left)
  - Yellow pill with beak (front-right)

  Features:
  - Live cursor-reactive googly eyes tracking the cursor across the entire window via RAF loop.
  - Imperative DOM transforms on pupil refs (zero React re-renders).
  - Validation-reactive expressions (formStatus: "error" -> frowns, "valid" / "neutral" -> happy).
  - Smooth spring drop-in and out-of-phase idle bobbing.
*/

export default function MascotScene({
  eyeState = "idle",
  formStatus = "neutral",
  dropped = false,
  assembled = false,
}) {
  const pupilRefs = useRef([]); // 4 white eye pupils
  const dotEyeRefs = useRef([]); // 3 solid dot eyes
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);

  const setPupilRef = (idx) => (el) => {
    pupilRefs.current[idx] = el;
  };

  const setDotEyeRef = (idx) => (el) => {
    dotEyeRefs.current[idx] = el;
  };

  // Track window cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Continuous RAF loop for imperative googly eyes
  useEffect(() => {
    const tick = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      if (mx > -1000 && my > -1000) {
        // 1. White eye pupils (Violet & Charcoal)
        pupilRefs.current.forEach((pupil) => {
          if (!pupil || !pupil.parentElement) return;
          const rect = pupil.parentElement.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const angle = Math.atan2(my - cy, mx - cx);
          const dist = Math.min(Math.hypot(mx - cx, my - cy) * 0.01, 3.5);
          const px = Math.cos(angle) * dist;
          const py = Math.sin(angle) * dist;
          pupil.style.transform = `translate(calc(-50% + ${px.toFixed(1)}px), calc(-50% + ${py.toFixed(1)}px))`;
        });

        // 2. Solid dot eyes (Orange & Yellow)
        dotEyeRefs.current.forEach((dot) => {
          if (!dot) return;
          const rect = dot.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const angle = Math.atan2(my - cy, mx - cx);
          const dist = Math.min(Math.hypot(mx - cx, my - cy) * 0.007, 2.0);
          const px = Math.cos(angle) * dist;
          const py = Math.sin(angle) * dist;
          dot.style.transform = `translate(${px.toFixed(1)}px, ${py.toFixed(1)}px)`;
        });
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const isShy = eyeState === "shy";
  const isError = formStatus === "error";

  return (
    <div className="mascot-area">
      <div className="mascot-stage">
        {/* 1. VIOLET TALL RECTANGLE (Back-left) */}
        <motion.div
          className={`mascot-char char-violet ${isError ? "frowning" : ""} ${assembled ? "bob-0" : ""}`}
          initial={{ y: -380, opacity: 0, rotate: -8 }}
          animate={
            dropped
              ? { y: 0, opacity: 1, rotate: assembled ? 0 : -2 }
              : { y: -380, opacity: 0, rotate: -8 }
          }
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 18,
            delay: 0,
          }}
        >
          <div className="violet-face">
            <div className="violet-eyes-row">
              <div className={`eye-white ${isShy ? "closed" : ""}`}>
                <div className="eye-pupil" ref={setPupilRef(0)} />
              </div>
              <div className="violet-bar" />
              <div className={`eye-white ${isShy ? "closed" : ""}`}>
                <div className="eye-pupil" ref={setPupilRef(1)} />
              </div>
            </div>
            <div className="violet-frown" />
          </div>
        </motion.div>

        {/* 2. CHARCOAL RECTANGLE (Back-right) */}
        <motion.div
          className={`mascot-char char-charcoal ${isError ? "frowning" : ""} ${assembled ? "bob-1" : ""}`}
          initial={{ y: -380, opacity: 0, rotate: 6 }}
          animate={
            dropped
              ? { y: 0, opacity: 1, rotate: assembled ? 0 : 2 }
              : { y: -380, opacity: 0, rotate: 6 }
          }
          transition={{
            type: "spring",
            stiffness: 190,
            damping: 17,
            delay: 0.15,
          }}
        >
          <div className="charcoal-face">
            <div className="charcoal-eyes-row">
              <div className={`eye-white ${isShy ? "closed" : ""}`}>
                <div className="eye-pupil" ref={setPupilRef(2)} />
              </div>
              <div className={`eye-white ${isShy ? "closed" : ""}`}>
                <div className="eye-pupil" ref={setPupilRef(3)} />
              </div>
            </div>
            <div className="charcoal-frown" />
          </div>
        </motion.div>

        {/* 3. ORANGE DOME (Front-left) */}
        <motion.div
          className={`mascot-char char-orange ${isError ? "frowning" : ""} ${assembled ? "bob-2" : ""}`}
          initial={{ y: -380, opacity: 0, rotate: -12 }}
          animate={
            dropped
              ? { y: 0, opacity: 1, rotate: assembled ? 0 : -3 }
              : { y: -380, opacity: 0, rotate: -12 }
          }
          transition={{
            type: "spring",
            stiffness: 210,
            damping: 16,
            delay: 0.3,
          }}
        >
          <div className="orange-face">
            <div className="orange-eyes-row">
              <div
                className={`eye-dot ${isShy ? "closed" : ""}`}
                ref={setDotEyeRef(0)}
              />
              <div
                className={`eye-dot ${isShy ? "closed" : ""}`}
                ref={setDotEyeRef(1)}
              />
            </div>
            <div className="orange-mouth" />
          </div>
        </motion.div>

        {/* 4. YELLOW PILL (Front-right) */}
        <motion.div
          className={`mascot-char char-yellow ${isError ? "frowning" : ""} ${assembled ? "bob-3" : ""}`}
          initial={{ y: -380, opacity: 0, rotate: 10 }}
          animate={
            dropped
              ? { y: 0, opacity: 1, rotate: assembled ? 0 : 2 }
              : { y: -380, opacity: 0, rotate: 10 }
          }
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 16,
            delay: 0.45,
          }}
        >
          <div className="yellow-face">
            <div className="yellow-eye-wrap">
              <div
                className={`eye-dot ${isShy ? "closed" : ""}`}
                ref={setDotEyeRef(2)}
              />
            </div>
            <div className="yellow-beak" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
