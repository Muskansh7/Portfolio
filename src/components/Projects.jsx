import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Cpu, BarChart3, Zap } from 'lucide-react';
import { Github } from './BrandIcons';
import resumeData from '../data/resumeData.json';

const caseStudySections = [
  { key: 'problem', label: 'Problem' },
  { key: 'approach', label: 'Approach' },
  { key: 'impact', label: 'Impact' },
];

const projectIcons = [Cpu, BarChart3, Zap];

const hasLiveDemo = (demo) => demo && demo !== '#' && demo.trim() !== '';

const Projects = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="projects" ref={ref} style={{ position: 'relative' }}>
      <div className="section-container">
        <h2 className="section-title">Projects</h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="case-study-list"
        >
          {resumeData.projects.map((project, idx) => {
            const Icon = projectIcons[idx % projectIcons.length];
            const accent = idx % 2 === 0 ? '#00F5FF' : '#7C3AED';
            const demoReady = hasLiveDemo(project.demo);

            return (
              <motion.article
                key={idx}
                variants={cardVariants}
                className="glass-panel project-card case-study-card"
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div className="case-study-header">
                  <div
                    style={{
                      color: accent,
                      padding: '10px',
                      background: 'rgba(255,255,255,0.02)',
                      borderRadius: '10px',
                      border: '1px solid rgba(255,255,255,0.04)',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={22} />
                  </div>

                  <div className="case-study-header-text">
                    <div className="case-study-title-row">
                      <h3 className="case-study-title">{project.title}</h3>
                      {demoReady && <span className="case-study-live">Live</span>}
                    </div>
                    <p className="case-study-role">{project.role}</p>
                  </div>
                </div>

                <p className="case-study-desc">{project.desc}</p>

                <div className="case-study-divider" />

                <div className="case-study-grid">
                  {caseStudySections.map(({ key, label }) => (
                    <div key={key} className="case-study-block">
                      <span className="case-study-label">{label}</span>
                      <p className="case-study-text">{project[key]}</p>
                    </div>
                  ))}
                </div>

                <div className="case-study-stack">
                  {project.stack.map((tag, tagIdx) => (
                    <span key={tagIdx} className="stack-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="case-study-actions">
                  {demoReady ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="case-study-btn case-study-btn-primary"
                    >
                      <ExternalLink size={16} />
                      Live demo
                    </a>
                  ) : (
                    <span
                      className="case-study-btn case-study-btn-primary case-study-btn-pending"
                      title="Demo link coming soon"
                    >
                      <ExternalLink size={16} />
                      Live demo
                    </span>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="case-study-btn case-study-btn-secondary"
                  >
                    <Github size={16} />
                    View code
                  </a>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* More Work */}
        <div className="more-work-section">
          <div className="more-work-heading">
            <Github size={22} color="#00F5FF" />
            <h3 className="more-work-title">More Work</h3>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="more-work-grid"
          >
            {(resumeData.moreWorkProjects || []).map((project) => (
              <a
                key={project.name}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel more-work-card more-work-card-curated"
              >
                <div className="more-work-card-top">
                  <h4 className="more-work-card-title">{project.title}</h4>
                  <ExternalLink size={16} color="#00F5FF" />
                </div>
                <p className="more-work-card-desc more-work-card-desc-full">
                  {project.desc}
                </p>
                <div className="more-work-stack">
                  {project.stack.map((tag, i) => (
                    <span key={i} className="more-work-stack-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </motion.div>

          <div className="more-work-github-cta">
            <a
              href={resumeData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="case-study-btn case-study-btn-secondary more-work-github-btn"
            >
              <Github size={18} />
              For more, visit my GitHub
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .case-study-list {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .case-study-card {
          display: flex;
          flex-direction: column;
          gap: 22px;
          padding: 30px;
          border-radius: 16px;
          background: var(--bg-card);
        }

        .case-study-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .case-study-header-text {
          flex: 1;
          min-width: 0;
        }

        .case-study-title-row {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .case-study-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.4rem;
          font-weight: 650;
          color: var(--color-heading);
          margin: 0;
          line-height: 1.2;
        }

        .case-study-live {
          font-family: 'DM Mono', monospace;
          font-size: 0.68rem;
          font-weight: 600;
          color: #10B981;
          border: 1px solid rgba(16, 185, 129, 0.35);
          background: rgba(16, 185, 129, 0.08);
          padding: 3px 10px;
          border-radius: 20px;
          letter-spacing: 0.04em;
        }

        .case-study-role {
          margin: 6px 0 0;
          font-size: 0.85rem;
          color: #00F5FF;
          font-family: 'Space Grotesk', sans-serif;
          line-height: 1.45;
        }

        .case-study-desc {
          margin: 0;
          font-size: 0.94rem;
          color: var(--color-text-secondary);
          line-height: 1.55;
        }

        .case-study-divider {
          height: 1px;
          background: var(--color-divider);
        }

        .case-study-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .case-study-block {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .case-study-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-text-muted);
        }

        .case-study-text {
          margin: 0;
          font-size: 0.88rem;
          color: var(--color-text-secondary);
          line-height: 1.5;
        }

        .case-study-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .stack-tag {
          font-size: 0.72rem;
          font-family: 'DM Mono', monospace;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--color-tag-border);
          padding: 4px 10px;
          border-radius: 4px;
          color: var(--color-heading);
          transition: all var(--transition-fast);
        }

        .case-study-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 4px;
        }

        .case-study-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          font-family: 'Space Grotesk', sans-serif;
          text-decoration: none;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .case-study-btn-primary {
          background: linear-gradient(135deg, #7C3AED, #00F5FF);
          color: var(--color-heading);
          border: none;
          box-shadow: 0 0 15px rgba(0, 245, 255, 0.15);
        }

        .case-study-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 25px rgba(0, 245, 255, 0.35);
        }

        .case-study-btn-pending {
          opacity: 0.45;
          cursor: not-allowed;
          pointer-events: none;
        }

        .case-study-btn-secondary {
          background: rgba(255, 255, 255, 0.02);
          color: var(--color-text-primary);
          background: var(--color-btn-secondary-bg);
          border: 1px solid var(--color-btn-secondary-border);
        }

        .case-study-btn-secondary:hover {
          background: var(--color-divider);
          border-color: rgba(0, 245, 255, 0.25);
          transform: translateY(-2px);
        }

        .project-card:hover {
          border-color: rgba(0, 245, 255, 0.3) !important;
          box-shadow: 0 12px 40px -10px rgba(0, 245, 255, 0.12),
                      0 0 1px 1px rgba(0, 245, 255, 0.2) inset !important;
        }

        .project-card:hover .stack-tag {
          border-color: rgba(124, 58, 237, 0.3);
          color: #00F5FF;
          background: rgba(124, 58, 237, 0.05);
        }

        .more-work-section {
          margin-top: 64px;
        }

        .more-work-heading {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 28px;
        }

        .more-work-title {
          font-size: 1.65rem;
          color: var(--color-heading);
          margin: 0;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
        }

        .more-work-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .more-work-card {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 20px;
          border-radius: 12px;
          background: var(--bg-card-solid);
          text-decoration: none;
          transition: all var(--transition-fast);
        }

        .more-work-card:hover {
          border-color: rgba(0, 245, 255, 0.25) !important;
          transform: translateY(-4px);
        }

        .more-work-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        .more-work-card-title {
          font-size: 1.05rem;
          color: var(--color-heading);
          margin: 0;
          font-weight: 600;
          font-family: 'Space Grotesk', sans-serif;
        }

        .more-work-card-desc {
          font-size: 0.82rem;
          color: var(--color-text-secondary);
          margin: 0;
          line-height: 1.45;
        }

        .more-work-card-desc-full {
          display: block;
          overflow: visible;
        }

        .more-work-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 4px;
        }

        .more-work-stack-tag {
          font-size: 0.68rem;
          font-family: 'DM Mono', monospace;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 3px 8px;
          border-radius: 4px;
          color: var(--color-text-secondary);
        }

        .more-work-card-curated:hover .more-work-stack-tag {
          border-color: rgba(0, 245, 255, 0.25);
          color: #00F5FF;
        }

        .more-work-github-cta {
          display: flex;
          justify-content: center;
          margin-top: 36px;
        }

        .more-work-github-btn {
          padding: 14px 32px;
        }

        @media (max-width: 768px) {
          .case-study-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
