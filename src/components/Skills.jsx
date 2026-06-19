import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Brain, Server, Database, Wrench } from 'lucide-react';
import resumeData from '../data/resumeData.json';

const Skills = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Languages':
        return <Code size={18} />;
      case 'AI & Machine Learning':
        return <Brain size={18} />;
      case 'Backend & Frameworks':
        return <Server size={18} />;
      case 'Databases':
        return <Database size={18} />;
      default:
        return <Wrench size={18} />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="skills" ref={ref} style={{ position: 'relative' }}>
      <div className="section-container">
        <h2 className="section-title">Tech Stack</h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="skills-grid"
        >
          {resumeData.skills.map((category, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="glass-panel skill-card"
            >
              <div className="skill-card-header">
                <div
                  className="skill-card-icon"
                  style={{
                    backgroundColor: `rgba(${category.color === '#00F5FF' ? '0, 245, 255' : '124, 58, 237'}, 0.1)`,
                    border: `1px solid rgba(${category.color === '#00F5FF' ? '0, 245, 255' : '124, 58, 237'}, 0.25)`,
                    color: category.color,
                  }}
                >
                  {getCategoryIcon(category.category)}
                </div>
                <h3 className="skill-category-title">{category.category}</h3>
              </div>

              <div className="skill-tags">
                {category.items.map((skill, skillIdx) => (
                  <span key={skillIdx} className="skill-tag">
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .skill-card {
          padding: 24px;
        }

        .skill-card-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }

        .skill-card-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .skill-category-title {
          font-size: 1.05rem;
          color: var(--color-heading);
          margin: 0;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          line-height: 1.3;
        }

        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .skill-tag {
          font-size: 0.8rem;
          font-family: 'Space Grotesk', sans-serif;
          background: var(--color-tag-bg);
          border: 1px solid var(--color-tag-border);
          padding: 5px 12px;
          border-radius: 6px;
          color: var(--color-text-secondary);
          transition: all var(--transition-fast);
        }

        .skill-card:hover .skill-tag {
          border-color: rgba(0, 245, 255, 0.3);
          color: var(--color-cyan);
        }

        [data-theme="light"] .skill-card:hover .skill-tag {
          border-color: rgba(8, 145, 178, 0.35);
        }
      `}</style>
    </section>
  );
};

export default Skills;
