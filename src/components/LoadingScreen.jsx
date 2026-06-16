import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onFinished }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onFinished();
          }, 400); // Small pause for UX
          return 100;
        }
        // Increment faster initially, slower later
        const increment = Math.max(1, Math.floor((100 - prev) / 6));
        return prev + increment;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#0A0A0F',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        gap: '24px',
      }}
    >
      {/* Animated Initials Logo */}
      <div style={{ position: 'relative' }}>
        <motion.svg
          width="120"
          height="120"
          viewBox="0 0 100 100"
          initial="hidden"
          animate="visible"
        >
          {/* Neon Glow Filters */}
          <defs>
            <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Letter M */}
          <motion.path
            d="M 15 80 L 15 20 L 50 65 L 85 20 L 85 80"
            fill="none"
            stroke="#7C3AED"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#neon-glow)"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: {
                pathLength: 1,
                opacity: 1,
                transition: { duration: 1.5, ease: 'easeInOut' },
              },
            }}
          />

          {/* Crossbar details in Cyan */}
          <motion.path
            d="M 25 35 L 75 35"
            fill="none"
            stroke="#00F5FF"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#neon-glow)"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: {
                pathLength: 1,
                opacity: 0.8,
                transition: { delay: 0.8, duration: 1.0, ease: 'easeInOut' },
              },
            }}
          />

        </motion.svg>
      </div>

      {/* Progress Value */}
      <motion.span
        style={{
          fontFamily: "'DM Mono', monospace",
          color: '#00F5FF',
          fontSize: '1rem',
          letterSpacing: '0.15em',
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        INITIALIZING_{progress}%
      </motion.span>

      {/* Progress Bar Track */}
      <div
        style={{
          width: '200px',
          height: '4px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '2px',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.03)',
        }}
      >
        <motion.div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #7C3AED, #00F5FF)',
            width: `${progress}%`,
          }}
          transition={{ ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
