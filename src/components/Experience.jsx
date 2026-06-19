import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Briefcase, ChevronRight } from 'lucide-react';
import resumeData from '../data/resumeData.json';

const Experience = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25 },
    },
  };

  const cardVariants = (index) => ({
    hidden: {
      opacity: 0,
      x: index % 2 === 0 ? -45 : 45,
      y: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.65, ease: 'easeOut' },
    },
  });

  return (
    <section id="experience" ref={ref} style={{ position: 'relative' }}>
      <div className="section-container">
        <h2 className="section-title">Experience</h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          style={{
            position: 'relative',
            maxWidth: '900px',
            margin: '0 auto',
          }}
          className="timeline-container"
        >
          {/* Vertical Center Line */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'linear-gradient(180deg, rgba(0,245,255,0.4) 0%, rgba(124,58,237,0.4) 50%, rgba(10,10,15,0) 100%)',
              transform: 'translateX(-50%)',
            }}
            className="timeline-line"
          />

          {resumeData.experience.map((job, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                justifyContent: idx % 2 === 0 ? 'flex-start' : 'flex-end',
                alignItems: 'center',
                width: '100%',
                marginBottom: '50px',
                position: 'relative',
              }}
              className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}
            >
              {/* Central Circle Pin */}
              <motion.div
                initial={{ scale: 0 }}
                variants={{
                  visible: { scale: 1, transition: { delay: idx * 0.25, type: 'spring', stiffness: 200 } },
                }}
                style={{
                  position: 'absolute',
                  left: '50%',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: '#0A0A0F',
                  border: `3px solid ${job.color}`,
                  boxShadow: `0 0 10px ${job.color}`,
                  transform: 'translateX(-50%)',
                  zIndex: 5,
                }}
                className="timeline-pin"
              />

              {/* Information Card */}
              <motion.div
                variants={cardVariants(idx)}
                className="glass-panel timeline-card"
                style={{
                  width: '45%',
                  padding: '30px',
                  position: 'relative',
                }}
              >
                {/* Duration Badge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'var(--color-heading)', // High-contrast white for small text
                    fontSize: '0.82rem',
                    fontFamily: "'DM Mono', monospace",
                    marginBottom: '10px',
                  }}
                >
                  <Calendar size={14} color={job.color} />
                  <span style={{ letterSpacing: '0.02em' }}>{job.duration}</span>
                </div>

                {/* Role and Company */}
                <h3
                  style={{
                    fontSize: '1.35rem',
                    color: 'var(--color-heading)',
                    margin: '0 0 6px 0',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 650,
                  }}
                >
                  {job.role}
                </h3>
                
                <div
                  style={{
                    display: 'inline-block',
                    background: `rgba(${job.color === '#00F5FF' ? '0, 245, 255' : '124, 58, 237'}, 0.08)`,
                    border: `1px solid rgba(${job.color === '#00F5FF' ? '0, 245, 255' : '124, 58, 237'}, 0.25)`,
                    color: job.color,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: '6px',
                    marginBottom: '20px',
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {job.company}
                </div>

                {/* Achievements details */}
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  {job.bullets.map((bullet, bulletIdx) => (
                    <motion.li
                      key={bulletIdx}
                      initial={{ opacity: 0, x: -10 }}
                      variants={{
                        visible: {
                          opacity: 1,
                          x: 0,
                          transition: { delay: idx * 0.25 + bulletIdx * 0.08, duration: 0.4 },
                        },
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        fontSize: '0.9rem',
                        color: 'var(--color-text-secondary)',
                        lineHeight: '1.45',
                      }}
                    >
                      <ChevronRight
                        size={16}
                        color={job.color}
                        style={{ marginTop: '2px', flexShrink: 0 }}
                      />
                      <span>{bullet}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .timeline-line {
            left: 20px !important;
          }
          .timeline-pin {
            left: 20px !important;
          }
          .timeline-item {
            justify-content: flex-end !important;
            margin-bottom: 35px !important;
          }
          .timeline-card {
            width: calc(100% - 45px) !important;
            padding: 24px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Experience;
