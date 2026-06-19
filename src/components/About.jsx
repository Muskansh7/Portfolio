import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, GraduationCap } from 'lucide-react';
import resumeData from '../data/resumeData.json';

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  const handleDownloadResume = () => {
    const resumeText = `
=========================================
${resumeData.personal.name.toUpperCase()} - AI/ML ENGINEER
=========================================
${resumeData.personal.location}
Phone: ${resumeData.personal.phone} | Email: ${resumeData.personal.email}
LinkedIn: ${resumeData.personal.linkedin}
GitHub: ${resumeData.personal.github}

-----------------------------------------
EDUCATION
-----------------------------------------
${resumeData.education.university} (Expected Graduation ${resumeData.education.graduationYear})
${resumeData.education.degree} (${resumeData.education.specialization})
CGPA: ${resumeData.education.cgpa} / 10

-----------------------------------------
TECHNICAL SKILLS
-----------------------------------------
${resumeData.skills.map(c => `* ${c.category}: ${c.items.map(s => `${s.name} (${s.level}%)`).join(', ')}`).join('\n')}

-----------------------------------------
EXPERIENCE
-----------------------------------------
${resumeData.experience.map(exp => `
* ${exp.company} - ${exp.role} (${exp.duration})
  ${exp.bullets.map(b => `- ${b}`).join('\n  ')}
`).join('\n')}

-----------------------------------------
FEATURED PROJECTS
-----------------------------------------
${resumeData.projects.map((p, idx) => `
${idx+1}. ${p.title}
   * Role: ${p.role}
   * Summary: ${p.desc}
   * Problem: ${p.problem}
   * Approach: ${p.approach}
   * Impact: ${p.impact}
   * Tech Stack: ${p.stack.join(', ')}
   * Repository: ${p.github}
`).join('\n')}
=========================================
`;
    const element = document.createElement('a');
    const file = new Blob([resumeText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'Muskan_Sharma_Resume.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section id="about" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
          style={{ maxWidth: '720px' }}
        >
          <h2 className="section-title section-title-sm">About</h2>

          <p className="text-narrative" style={{ fontSize: '1.2rem', marginBottom: '16px' }}>
            I'm an AI/ML engineer focused on building production-ready intelligent systems — from
            multi-agent pipelines to RAG architectures for real-world domains like healthcare.
          </p>

          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '24px' }}>
            I combine FastAPI, LangChain, and vector stores to ship backends with low latency and
            high reliability. Currently a final-year student at {resumeData.education.university},
            graduating {resumeData.education.graduationYear}.
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: 'var(--color-text-secondary)',
              fontSize: '0.9rem',
              marginBottom: '28px',
            }}
          >
            <GraduationCap size={18} color="#00F5FF" />
            <span>
              {resumeData.education.degree} · CGPA {resumeData.education.cgpa}/10
            </span>
          </div>

          <button
            onClick={handleDownloadResume}
            style={{
              background: 'none',
              border: '1px solid rgba(0, 245, 255, 0.4)',
              padding: '10px 20px',
              borderRadius: '8px',
              color: '#00F5FF',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all var(--transition-fast)',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
            className="resume-btn"
          >
            <Download size={16} />
            Download Resume
          </button>
        </motion.div>
      </div>

      <style>{`
        .resume-btn:hover {
          background: rgba(0, 245, 255, 0.08);
          box-shadow: 0 0 15px rgba(0, 245, 255, 0.2);
        }
      `}</style>
    </section>
  );
};

export default About;
