import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Brain, Server, Database, Wrench, Sparkles } from 'lucide-react';
import resumeData from '../data/resumeData.json';

const Skills = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Languages':
        return <Code size={20} />;
      case 'AI & Machine Learning':
        return <Brain size={20} />;
      case 'Backend & Frameworks':
        return <Server size={20} />;
      case 'Databases':
        return <Database size={20} />;
      case 'Tools & Methodology':
      default:
        return <Wrench size={20} />;
    }
  };

  const exploringSkills = [
    'Agentic Workflows (LangGraph)',
    'Multimodal RAG',
    'MLOps (MLflow / DVC)',
    'LLM Guardrails & Evaluation',
    'Graph Vector DBs',
    'Prompt Engineering & DSPy'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
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
    <section id="skills" ref={ref} style={{ position: 'relative' }}>
      <div className="section-container">
        <h2 className="section-title">Technical Expertise</h2>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px',
            marginTop: '20px',
          }}
        >
          {resumeData.skills.map((category, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="glass-panel"
              style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Category Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: `rgba(${category.color === '#00F5FF' ? '0, 245, 255' : '124, 58, 237'}, 0.1)`,
                    border: `1px solid rgba(${category.color === '#00F5FF' ? '0, 245, 255' : '124, 58, 237'}, 0.25)`,
                    color: category.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {getCategoryIcon(category.category)}
                </div>
                <h3
                  style={{
                    fontSize: '1.25rem',
                    color: '#FFFFFF',
                    margin: 0,
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {category.category}
                </h3>
              </div>

              {/* Skills List inside Category */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {category.items.map((skill, skillIdx) => (
                  <div key={skillIdx} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                        {skill.name}
                      </span>
                      <span
                        style={{
                          fontSize: '0.8rem',
                          fontFamily: "'DM Mono', monospace",
                          color: category.color,
                        }}
                      >
                        {skill.level}%
                      </span>
                    </div>

                    {/* Skill level bar track */}
                    <div
                      style={{
                        height: '6px',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '3px',
                        overflow: 'hidden',
                        border: '1px solid rgba(255, 255, 255, 0.02)',
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        variants={{
                          visible: {
                            width: `${skill.level}%`,
                            transition: { duration: 1.2, ease: 'easeOut', delay: idx * 0.1 + skillIdx * 0.05 },
                          },
                        }}
                        style={{
                          height: '100%',
                          background: `linear-gradient(90deg, ${category.color}, ${category.color === '#00F5FF' ? '#7C3AED' : '#00F5FF'})`,
                          boxShadow: `0 0 8px ${category.color === '#00F5FF' ? 'rgba(0, 245, 255, 0.5)' : 'rgba(124, 58, 237, 0.5)'}`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Currently Exploring / Focus Areas */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="glass-panel"
          style={{
            marginTop: '40px',
            padding: '30px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={18} color="#00F5FF" style={{ animation: 'pulse 1.5s infinite' }} />
            <h4 style={{ fontSize: '1.15rem', color: '#FFFFFF', margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>
              CURRENT_FOCUS // RESEARCH_&_EXPLORATION
            </h4>
          </div>

          <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--color-text-secondary)' }}>
            Actively researching and designing prototype pipelines in the following engineering verticals:
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '4px' }}>
            {exploringSkills.map((skill, idx) => (
              <span
                key={idx}
                style={{
                  background: 'rgba(0, 245, 255, 0.04)',
                  border: '1px solid rgba(0, 245, 255, 0.15)',
                  color: '#00F5FF',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  padding: '6px 14px',
                  borderRadius: '20px',
                  boxShadow: '0 0 10px rgba(0, 245, 255, 0.02)',
                  transition: 'all var(--transition-fast)'
                }}
                className="exploring-pill"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .exploring-pill:hover {
          background: rgba(0, 245, 255, 0.08) !important;
          border-color: rgba(0, 245, 255, 0.35) !important;
          box-shadow: 0 0 15px rgba(0, 245, 255, 0.15);
          transform: translateY(-1px);
        }
      `}</style>
    </section>
  );
};

export default Skills;
