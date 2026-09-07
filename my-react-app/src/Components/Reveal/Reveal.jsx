import React from "react";
import { motion, useReducedMotion } from "motion/react";
import "./Reveal.css";

/*
  Reveal — scroll-triggered entrance primitive.

  Mirrors the Xurya reference's on-scroll section reveals: each block fades up
  (or in from a side / scales) once it enters the viewport, then stays put.

  Usage:
    <Reveal>...</Reveal>                       // fade + rise (default)
    <Reveal as="section" className="how">...   // animate an existing element in place
    <Reveal className="reveal-cell" delay={i*0.09}>  // grid card wrapper (see Reveal.css)

  IMPORTANT: for elements that carry a CSS :hover transform (e.g. the landing
  cards' translateY(-6px) lift), WRAP them with a <Reveal className="reveal-cell">
  instead of converting the element itself — otherwise motion's leftover inline
  transform overrides the hover lift. The .reveal-cell class keeps the wrapped
  card at full grid width and equal row height.

  Honors prefers-reduced-motion: when set, content renders with no motion.
*/
export default function Reveal({
  as = "div",
  children,
  className,
  style,
  delay = 0,
  duration = 0.6,
  y = 26,
  x = 0,
  scale = 1,
  once = true,
  amount = 0.18,
  ...rest
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (reduce) {
    // No transforms/opacity animation — respect the user's motion preference.
    return (
      <MotionTag className={className} style={style} {...rest}>
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once, amount }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
