import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, Award, Calendar, GraduationCap, FileText, Cpu, GitCommit } from 'lucide-react';
import resumeData from '../data/resumeData.json';

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [cgpaProgress, setCgpaProgress] = useState(0);
  const [latestCommit, setLatestCommit] = useState({
    repo: 'adaptive-ai-agent',
    message: 'feat: optimize langgraph agent routing pipeline',
    time: 'Recent',
    loading: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
      // Animate CGPA progress ring
      let start = 0;
      const end = parseFloat(resumeData.education.cgpa) * 10; // 8.12/10 in percentage
      const duration = 1500;
      const stepTime = Math.abs(Math.floor(duration / end));
      const timer = setInterval(() => {
        start += 1;
        if (start >= end) {
          setCgpaProgress(end);
          clearInterval(timer);
        } else {
          setCgpaProgress(start);
        }
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [controls, inView]);

  useEffect(() => {
    const fetchLatestCommit = async () => {
      try {
        const res = await fetch('https://api.github.com/users/Muskansh7/events');
        if (!res.ok) throw new Error('API limit or network error');
        const events = await res.json();
        
        const pushEvent = events.find(e => e.type === 'PushEvent');
        if (pushEvent && pushEvent.payload && pushEvent.payload.commits && pushEvent.payload.commits.length > 0) {
          const repoFullName = pushEvent.repo.name;
          const repoName = repoFullName.split('/')[1] || repoFullName;
          const commitMsg = pushEvent.payload.commits[0].message;
          
          // Format date/time
          const commitDate = new Date(pushEvent.created_at);
          const timeString = commitDate.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' + commitDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          
          setLatestCommit({
            repo: repoName,
            message: commitMsg,
            time: timeString,
            loading: false
          });
        } else {
          setLatestCommit(prev => ({ ...prev, loading: false }));
        }
      } catch (err) {
        console.warn("Failed to fetch live GitHub commits, using fallback.", err);
        setLatestCommit(prev => ({ ...prev, loading: false }));
      }
    };

    fetchLatestCommit();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // SVG parameters for progress ring
  const radius = 60;
  const strokeWidth = 8;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (cgpaProgress / 100) * circumference;

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
   * Description: ${p.desc}
   * Tech Stack: ${p.stack.join(', ')}
   * Key Stats: ${p.stats.map(s => `${s.label}: ${s.val}`).join(', ')}
   * Repository: ${p.github}
`).join('\n')}

-----------------------------------------
CERTIFICATIONS & ACHIEVEMENTS
-----------------------------------------
${resumeData.certifications.map(c => `* ${c.title} (${c.org})`).join('\n')}

-----------------------------------------
LEADERSHIP
-----------------------------------------
* ${resumeData.leadership.role} | ${resumeData.leadership.organization}
  ${resumeData.leadership.bullets.map(b => `- ${b}`).join('\n  ')}
=========================================
`;
    const element = document.createElement("a");
    const file = new Blob([resumeText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "Muskan_Sharma_Resume.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section id="about" ref={ref} style={{ position: 'relative' }}>
      <div className="section-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '60px',
            alignItems: 'center',
          }}
          className="about-grid"
        >
          {/* Narrative Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 className="section-title">About Me</h2>
            
            <motion.p variants={itemVariants} className="text-narrative">
              I'm Muskan, an AI/ML engineer obsessed with building systems that actually think. 
              From orchestrating multi-agent pipelines to engineering RAG systems for healthcare, 
              I thrive at the intersection of cutting-edge research and production-grade engineering.
            </motion.p>
            
            <motion.p variants={itemVariants} style={{ color: 'var(--color-text-secondary)', fontSize: '1.02rem', lineHeight: '1.6' }}>
              My engineering philosophy focuses on building architectures that don't just process queries but reason intelligently. By combining FastAPI, LangChain, and vector stores, I write high-performance backend systems with sub-second latencies that unlock the potential of LLMs.
            </motion.p>

            {/* University Stats Card */}
            <motion.div
              variants={itemVariants}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginTop: '10px',
              }}
            >
              <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#00F5FF' }}>
                  <GraduationCap size={20} />
                  <span style={{ fontSize: '0.82rem', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>UNIVERSITY</span>
                </div>
                <h4 style={{ fontSize: '1.05rem', color: '#FFFFFF', margin: 0 }}>{resumeData.education.university}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: 0 }}>{resumeData.education.degree} ({resumeData.education.specialization})</p>
              </div>

              <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#7C3AED' }}>
                  <Calendar size={20} />
                  <span style={{ fontSize: '0.82rem', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>TIMELINE</span>
                </div>
                <h4 style={{ fontSize: '1.05rem', color: '#FFFFFF', margin: 0 }}>Expected {resumeData.education.graduationYear}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: 0 }}>Final-Year Student</p>
              </div>
            </motion.div>

            {/* Resume Button */}
            <motion.div variants={itemVariants} style={{ marginTop: '10px' }}>
              <button
                onClick={handleDownloadResume}
                style={{
                  background: 'none',
                  border: '1px solid rgba(0, 245, 255, 0.4)',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  color: '#00F5FF',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all var(--transition-fast)',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
                className="resume-btn"
              >
                <Download size={18} />
                <span>Download Resume</span>
              </button>
            </motion.div>
          </div>

          {/* Visual Elements Panel */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '40px',
            }}
          >
            {/* Avatar / Photo Placeholder */}
            <motion.div
              variants={itemVariants}
              style={{
                width: '240px',
                height: '240px',
                borderRadius: '50%',
                border: '2px solid rgba(124, 58, 237, 0.2)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(15, 15, 25, 0.3)',
              }}
            >
              {/* Rotating outer cyan ring */}
              <motion.div
                style={{
                  position: 'absolute',
                  width: '256px',
                  height: '256px',
                  borderRadius: '50%',
                  border: '2px dashed #00F5FF',
                  opacity: 0.6,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              />

              {/* Rotating inner violet ring */}
              <motion.div
                style={{
                  position: 'absolute',
                  width: '246px',
                  height: '246px',
                  borderRadius: '50%',
                  border: '1px dotted #7C3AED',
                  opacity: 0.8,
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              />

              {/* Tech Monogram / Photo Substitute inside Avatar */}
              <div
                style={{
                  width: '220px',
                  height: '220px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  background: 'radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, rgba(0, 0, 0, 0.4) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  border: '1.5px solid rgba(255, 255, 255, 0.05)',
                }}
              >
                {/* Embedded SVG AI Node Grid Representation */}
                <svg width="120" height="120" viewBox="0 0 100 100" opacity="0.8">
                  <line x1="20" y1="50" x2="50" y2="20" stroke="rgba(0, 245, 255, 0.3)" strokeWidth="1.5" />
                  <line x1="20" y1="50" x2="50" y2="80" stroke="rgba(0, 245, 255, 0.3)" strokeWidth="1.5" />
                  <line x1="50" y1="20" x2="80" y2="50" stroke="rgba(124, 58, 237, 0.3)" strokeWidth="1.5" />
                  <line x1="50" y1="80" x2="80" y2="50" stroke="rgba(124, 58, 237, 0.3)" strokeWidth="1.5" />
                  <line x1="20" y1="50" x2="80" y2="50" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
                  <line x1="50" y1="20" x2="50" y2="80" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
                  
                  <circle cx="20" cy="50" r="6" fill="#00F5FF" style={{ filter: 'drop-shadow(0 0 4px #00F5FF)' }} />
                  <circle cx="50" cy="20" r="6" fill="#7C3AED" style={{ filter: 'drop-shadow(0 0 4px #7C3AED)' }} />
                  <circle cx="50" cy="80" r="6" fill="#7C3AED" style={{ filter: 'drop-shadow(0 0 4px #7C3AED)' }} />
                  <circle cx="80" cy="50" r="6" fill="#00F5FF" style={{ filter: 'drop-shadow(0 0 4px #00F5FF)' }} />
                  <circle cx="50" cy="50" r="8" fill="#FFFFFF" style={{ filter: 'drop-shadow(0 0 6px #FFFFFF)' }} />
                </svg>

                <div
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '0.75rem',
                    color: '#00F5FF',
                    background: 'rgba(10, 10, 15, 0.85)',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    border: '1px solid rgba(0, 245, 255, 0.15)',
                  }}
                >
                  &lt;AI_NODE_01&gt;
                </div>
              </div>
            </motion.div>

            {/* CGPA Progress Ring */}
            <motion.div
              variants={itemVariants}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
              }}
            >
              <div style={{ position: 'relative', width: '136px', height: '136px' }}>
                <svg width="136" height="136" viewBox="0 0 136 136">
                  {/* Track ring */}
                  <circle
                    cx="68"
                    cy="68"
                    r={radius}
                    fill="transparent"
                    stroke="rgba(255, 255, 255, 0.04)"
                    strokeWidth={strokeWidth}
                  />
                  {/* Progress ring */}
                  <motion.circle
                    cx="68"
                    cy="68"
                    r={radius}
                    fill="transparent"
                    stroke="url(#gradient)"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform="rotate(-90 68 68)"
                  />
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7C3AED" />
                      <stop offset="100%" stopColor="#00F5FF" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* CGPA Text overlay */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: '1.45rem',
                      color: '#00F5FF',
                    }}
                  >
                    {resumeData.education.cgpa}
                  </span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--color-text-secondary)', letterSpacing: '0.05em' }}>
                    CGPA / 10
                  </span>
                </div>
              </div>
              
              <div>
                <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#FFFFFF' }}>Academic Excellence</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-secondary)', maxWidth: '160px' }}>
                  Consistently ranking in specialized AI & ML cohorts.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Live Developer Activity Grid Row (GitHub Contributions + Live Commit Ticker) */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            marginTop: '80px',
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '30px',
            alignItems: 'stretch',
          }}
          className="about-grid"
        >
          {/* GitHub Contribution Graph */}
          <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Cpu size={18} color="#00F5FF" />
                <h4 style={{ fontSize: '1.1rem', color: '#FFFFFF', margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>
                  GITHUB_CONTRIBUTION_GRID
                </h4>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontFamily: "'DM Mono', monospace" }}>
                Muskansh7 // LIVE_COMMITS
              </span>
            </div>
            
            <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.03)' }}>
              <img 
                src="https://ghchart.rshah.org/00f5ff/Muskansh7" 
                alt="Muskan Sharma's GitHub Contributions" 
                style={{ width: '100%', filter: 'brightness(1.1) contrast(1.1)', display: 'block' }} 
              />
            </div>
          </div>

          {/* Live Commit Ticker */}
          <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <GitCommit size={18} color="#7C3AED" />
                <h4 style={{ fontSize: '1.1rem', color: '#FFFFFF', margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>
                  NOW_BUILDING // LAST_COMMIT
                </h4>
              </div>

              <div style={{ background: 'rgba(5, 5, 8, 0.6)', border: '1px solid rgba(124, 58, 237, 0.15)', borderRadius: '10px', padding: '20px', fontFamily: "'DM Mono', monospace", position: 'relative' }}>
                {/* Pulsing indicator */}
                <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
                  <span style={{ fontSize: '0.65rem', color: '#10B981', fontWeight: 600 }}>LIVE</span>
                </div>

                {latestCommit.loading ? (
                  <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
                    &gt; Pulling dynamic logs from GitHub API...
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ fontSize: '0.85rem', color: '#00F5FF' }}>
                      &gt; Repository: <span style={{ color: '#FFFFFF', fontWeight: 'bold' }}>{latestCommit.repo}</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.4' }}>
                      &gt; Commit: "{latestCommit.message}"
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>
                      Timestamp: {latestCommit.time}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: '1.4' }}>
              This panel live-fetches the latest code check-ins directly from Muskan's GitHub account to reflect active, day-to-day engineering.
            </p>
          </div>
        </motion.div>
      </div>

      <style>{`
        .resume-btn:hover {
          background: rgba(0, 245, 255, 0.08) !important;
          box-shadow: 0 0 15px rgba(0, 245, 255, 0.2);
          transform: translateY(-1px);
        }
        
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
