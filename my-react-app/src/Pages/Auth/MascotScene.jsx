import React from "react";
import { motion } from "motion/react";
import "./MascotScene.css";

/* Eye component — open dot or closed squint */
function Eye({ state, offsetX = 0 }) {
  return (
    <div
      className={"mascot-eye" + (state === "shy" ? " shy" : "")}
      style={{ transform: state === "watching" ? `translateX(${offsetX}px)` : "none" }}
    />
  );
}

/* One mascot character */
function MascotChar({ color, width, height, radius, eyeState, bobClass, dropped, assembled, dropDelay, assembleX, assembleY, rotate }) {
  const watching = eyeState === "watching";
  const shy = eyeState === "shy";
  const smile = eyeState === "idle" || eyeState === "watching";

  return (
    <motion.div
      className={"mascot-char " + (assembled ? bobClass : "")}
      initial={{ y: -320, opacity: 0, rotate: rotate }}
      animate={
        dropped
          ? { y: assembled ? assembleY : 0, x: assembled ? assembleX : 0, opacity: 1, rotate: assembled ? 0 : rotate * 0.3 }
          : { y: -320, opacity: 0, rotate: rotate }
      }
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 18,
        delay: dropDelay,
      }}
    >
      {/* body */}
      <div
        className="mascot-body"
        style={{ width, height, background: color, borderRadius: radius, position: "relative" }}
      >
        {/* face */}
        <div className="mascot-face">
          <div className="mascot-eyes">
            <Eye state={eyeState} offsetX={watching ? 3 : 0} />
            <Eye state={eyeState} offsetX={watching ? 3 : 0} />
          </div>
          <div className={"mascot-mouth" + (smile ? " smile" : "")} />
        </div>
      </div>
    </motion.div>
  );
}

/* The four-character mascot scene */
export default function MascotScene({ eyeState = "idle", dropped = false, assembled = false }) {
  const chars = [
    { color: "#f59e0b", width: 38, height: 62, radius: 20,   dropDelay: 0,    rotate: -12, assembleX: -2, assembleY: 0,  bobClass: "bob-0" },
    { color: "#f97316", width: 72, height: 42, radius: "50px 50px 10px 10px", dropDelay: 0.15, rotate: 10,  assembleX: 0,  assembleY: 0,  bobClass: "bob-1" },
    { color: "#1e2130", width: 48, height: 86, radius: 14,   dropDelay: 0.3,  rotate: -8,  assembleX: 2,  assembleY: 0,  bobClass: "bob-2" },
    { color: "#2563eb", width: 58, height: 118,radius: 16,   dropDelay: 0.45, rotate: 14,  assembleX: 0,  assembleY: 0,  bobClass: "bob-3" },
  ];

  return (
    <div className="mascot-area">
      <div className="mascot-group">
        {chars.map((c, i) => (
          <MascotChar key={i} {...c} eyeState={eyeState} dropped={dropped} assembled={assembled} />
        ))}
      </div>
    </div>
  );
}
