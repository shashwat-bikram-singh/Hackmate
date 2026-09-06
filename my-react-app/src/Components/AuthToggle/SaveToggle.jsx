import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { BsCheckCircleFill } from 'react-icons/bs';
import { cn } from '../../lib/utils';
import './SaveToggle.css';

const SIZE_CONFIG = {
  sm: {
    height: 44,
    circleWidth: 44,
    idleWidth: 120,
    savedWidth: 140,
    fontSize: '0.88rem',
    iconSize: 20,
    spinnerSize: 22,
  },
  md: {
    height: 50,
    circleWidth: 50,
    idleWidth: 150,
    savedWidth: 180,
    fontSize: '0.96rem',
    iconSize: 24,
    spinnerSize: 26,
  },
  lg: {
    height: 56,
    circleWidth: 56,
    idleWidth: 180,
    savedWidth: 210,
    fontSize: '1.05rem',
    iconSize: 28,
    spinnerSize: 30,
  },
  full: {
    height: 48,
    circleWidth: 48,
    idleWidth: 320,
    savedWidth: 220,
    fontSize: '0.95rem',
    iconSize: 24,
    spinnerSize: 26,
  },
};

export const SaveToggle = ({
  size = 'md',
  idleText = 'Save',
  savedText = 'Saved',
  loadingDuration = 900,
  successDuration = 700,
  onStatusChange,
  onComplete,
  type = 'button',
  variant = 'brand',
  className = '',
  disabled = false,
  status: controlledStatus,
}) => {
  const [internalStatus, setInternalStatus] = useState('idle');
  const status = controlledStatus !== undefined ? controlledStatus : internalStatus;

  const cfg = SIZE_CONFIG[size] || SIZE_CONFIG.md;
  const stableWidth = Math.max(cfg.idleWidth, cfg.savedWidth);

  useEffect(() => {
    onStatusChange?.(status);
  }, [status, onStatusChange]);

  const handleClick = (e) => {
    if (disabled) return;

    if (status === 'idle') {
      setInternalStatus('loading');

      setTimeout(() => {
        setInternalStatus('success');

        setTimeout(() => {
          setInternalStatus('saved');

          if (onComplete) {
            setTimeout(() => {
              onComplete();
            }, 650);
          }
        }, successDuration);
      }, loadingDuration);
    } else if (status === 'saved' && !onComplete) {
      setInternalStatus('idle');
    }
  };

  const isCircle = status === 'loading' || status === 'success';

  const getBackgroundColor = () => {
    if (variant === 'brand') {
      if (status === 'saved') return '#16c265'; // Vibrant status green on approved
      return '#2563eb'; // Royal Blue
    }
    if (status === 'loading' || status === 'success') {
      return '#18181b';
    }
    if (status === 'saved') {
      return '#16c265';
    }
    return '#2563eb';
  };

  const getCheckColor = () => {
    return '#ffffff';
  };

  return (
    <div className={cn('save-toggle-wrap', className)}>
      <MotionConfig
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 30,
          mass: 1,
        }}
      >
        <motion.button
          type={type}
          onClick={handleClick}
          disabled={disabled || status === 'loading' || status === 'success'}
          initial={false}
          animate={{
            width: isCircle ? cfg.circleWidth : stableWidth,
            height: cfg.height,
            backgroundColor: getBackgroundColor(),
          }}
          transition={{
            type: 'spring',
            stiffness: 220,
            damping: 18,
            mass: 1.1,
            backgroundColor: {
              duration: 0.25,
            },
          }}
          className="save-toggle-btn"
        >
          <AnimatePresence mode="popLayout">
            {status === 'idle' && (
              <motion.span
                key="idle"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15, x: -20 }}
                className="save-toggle-text"
                style={{ fontSize: cfg.fontSize }}
              >
                {idleText}
              </motion.span>
            )}

            {status === 'loading' && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
                className="save-toggle-loading"
              >
                <motion.svg
                  viewBox="0 0 26 26"
                  className="save-toggle-spinner"
                  style={{ width: cfg.spinnerSize, height: cfg.spinnerSize }}
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.7,
                    ease: 'linear',
                  }}
                >
                  <circle
                    cx="13"
                    cy="13"
                    r="10"
                    stroke="rgba(255, 255, 255, 0.25)"
                    strokeWidth="3"
                    fill="none"
                  />
                  <path
                    d="M13 3 A10 10 0 0 1 23 13"
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                </motion.svg>
              </motion.div>
            )}

            {(status === 'success' || status === 'saved') && (
              <motion.div
                key="check-state"
                layout
                initial={
                  status === 'success'
                    ? { opacity: 0, scale: 0.5, filter: 'blur(4px)' }
                    : { opacity: 1 }
                }
                animate={
                  status === 'success'
                    ? { opacity: 1, scale: 1.15, filter: 'blur(0px)' }
                    : { opacity: 1, scale: 1, y: 0 }
                }
                exit={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                className="save-toggle-check-state"
              >
                <motion.div
                  layout
                  className="save-toggle-check-icon"
                  animate={{
                    color: getCheckColor(),
                  }}
                >
                  <BsCheckCircleFill size={cfg.iconSize} />
                </motion.div>

                <AnimatePresence mode="popLayout">
                  {status === 'saved' && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.1 }}
                      className="save-toggle-saved-text"
                      style={{ fontSize: cfg.fontSize }}
                    >
                      {savedText}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </MotionConfig>
    </div>
  );
};

export default SaveToggle;
