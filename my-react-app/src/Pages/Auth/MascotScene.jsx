import React, { useRef, useEffect } from "react";
import { motion } from "motion/react";
import "./MascotScene.css";

/*
  MascotScene — 4 characters matching reference composition:
  - Violet tall rectangle (back-left) — HINGED: bends/morphs on password focus
  - Charcoal medium rectangle (back-right) — ducks down on password focus
  - Orange dome (front-left) — squashes + frowns on password focus
  - Yellow pill with beak (front-right) — tilts away on password focus

  Features:
  - Live cursor-reactive googly eyes tracking the cursor across the entire window via RAF loop.
  - Imperative DOM transforms on pupil refs (zero React re-renders).
  - Password focus (eyeState "shy") -> whole cast reacts: purple pillar bends at the
    neck, everyone frowns / looks away (matches the reference video).
  - Email focus (eyeState "watching") -> subtle lean-in toward the form.
  - Validation-reactive expressions (formStatus "error" -> frowns).
  - Smooth spring drop-in and out-of-phase idle bobbing.
*/

export default function MascotScene({
  eyeState = "idle",
  formStatus = "neutral",
  dropped = false,
  assembled = false,
  peek = false,
}) {
  const pupilRefs = useRef([]); // 4 white eye pupils
  const dotEyeRefs = useRef([]); // 3 solid dot eyes
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);
  const isShyRef = useRef(false);

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
      const shy = isShyRef.current;

      if (!shy && mx > -1000 && my > -1000) {
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
      } else if (shy) {
        // Password focus: recenter eyes (characters look away / close)
        pupilRefs.current.forEach((pupil) => {
          if (pupil) pupil.style.transform = "translate(-50%, -50%)";
        });
        dotEyeRefs.current.forEach((dot) => {
          if (dot) dot.style.transform = "translate(0px, 0px)";
        });
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // "shy" = cover eyes / bend away, but ONLY while the password is hidden.
  // If the password is revealed (peek), there's nothing to hide, so the
  // characters relax: eyes open and track the cursor (curious lean-in).
  const isShy = eyeState === "shy" && !peek;
  const isWatching =
    eyeState === "watching" || (eyeState === "shy" && peek);
  const isError = formStatus === "error";

  useEffect(() => {
    isShyRef.current = isShy;
  }, [isShy]);

  const stageClass = `mascot-stage${isShy ? " shy" : ""}${
    isWatching ? " watching" : ""
  }${isError ? " error" : ""}`;

  return (
    <div className="mascot-area">
      <div className={stageClass}>
        {/* 1. VIOLET TALL RECTANGLE (Back-left) — hinged, bends on password */}
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
          <div className="violet-lower" />
          <div className="violet-upper">
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
          </div>
        </motion.div>

        {/* 2. CHARCOAL RECTANGLE (Back-right) — ducks down on password */}
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
          <div className="charcoal-body">
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
          </div>
        </motion.div>

        {/* 3. ORANGE DOME (Front-left) — squashes + frowns on password */}
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
          <div className="orange-body">
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
          </div>
        </motion.div>

        {/* 4. YELLOW PILL (Front-right) — tilts away on password */}
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
          <div className="yellow-body">
            <div className="yellow-face">
              <div className="yellow-eye-wrap">
                <div
                  className={`eye-dot ${isShy ? "closed" : ""}`}
                  ref={setDotEyeRef(2)}
                />
              </div>
              <div className="yellow-beak" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
