import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Cpu, BarChart3, Zap, GitFork, Star } from 'lucide-react';
import { Github } from './BrandIcons';
import resumeData from '../data/resumeData.json';

const Projects = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [githubRepos, setGithubRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(true);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  useEffect(() => {
    const fetchGitHubRepos = async () => {
      try {
        const res = await fetch('https://api.github.com/users/Muskansh7/repos');
        if (!res.ok) throw new Error('Failed to fetch repositories');
        const repos = await res.json();
        
        // Filter out featured repos
        const featuredNames = ['adaptive-ai-agent', 'medilens-knowledge-engine', 'voicevision-healthcare'];
        const secondaryRepos = repos.filter(
          (repo) => !featuredNames.includes(repo.name.toLowerCase())
        );

        // Sort by last updated
        secondaryRepos.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
        
        setGithubRepos(secondaryRepos);
      } catch (err) {
        console.warn("Failed to fetch public repos from GitHub API. Using fallbacks.", err);
        // Fallback mock repos in case of API rate limits
        setGithubRepos([
          {
            id: 1,
            name: 'bluestock-fintech-tasks',
            description: 'Backend implementation tasks built with Python FastAPI and PostgreSQL integrations.',
            language: 'Python',
            html_url: 'https://github.com/Muskansh7/bluestock-fintech-tasks',
            stargazers_count: 2,
            forks_count: 1
          },
          {
            id: 2,
            name: 'agentic-reasoning-rag',
            description: 'A playground for evaluating prompt-to-agent architectures using DSPy.',
            language: 'Python',
            html_url: 'https://github.com/Muskansh7/agentic-reasoning-rag',
            stargazers_count: 1,
            forks_count: 0
          },
          {
            id: 3,
            name: 'vit-bhopal-coursework',
            description: 'Collection of ML notebooks and assignments completed during academic curriculum.',
            language: 'Jupyter Notebook',
            html_url: 'https://github.com/Muskansh7/vit-bhopal-coursework',
            stargazers_count: 0,
            forks_count: 0
          }
        ]);
      } finally {
        setLoadingRepos(false);
      }
    };

    fetchGitHubRepos();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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
        <h2 className="section-title">Selected Projects</h2>

        {/* Featured Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
            marginTop: '20px',
          }}
        >
          {resumeData.projects.map((project, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="glass-panel project-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '30px',
                borderRadius: '16px',
                background: 'var(--bg-card)',
                height: '100%',
                position: 'relative',
              }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              {/* Card Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div style={{ color: idx % 2 === 0 ? '#00F5FF' : '#7C3AED', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.04)' }}>
                  {idx === 0 ? <Cpu size={22} /> : idx === 1 ? <BarChart3 size={22} /> : <Zap size={22} />}
                </div>
                {/* Links */}
                <div style={{ display: 'flex', gap: '14px' }}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#FFFFFF', transition: 'color var(--transition-fast)' }}
                    className="project-link"
                    title="GitHub Repository"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href={project.demo}
                    style={{ color: '#FFFFFF', transition: 'color var(--transition-fast)' }}
                    className="project-link"
                    title="Live Simulation"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: '1.4rem',
                  color: '#FFFFFF',
                  margin: '0 0 12px 0',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 650,
                }}
              >
                {project.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: '0.94rem',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.55',
                  marginBottom: '24px',
                  flexGrow: 1,
                }}
              >
                {project.desc}
              </p>

              {/* Stat callouts */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '10px',
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid rgba(255,255,255,0.03)',
                  padding: '12px',
                  borderRadius: '10px',
                  marginBottom: '24px',
                }}
              >
                {project.stats.map((stat, statIdx) => (
                  <div key={statIdx} style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#00F5FF', fontFamily: "'DM Mono', monospace" }}>
                      {stat.val}
                    </span>
                    <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tags/Stack list */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {project.stack.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    style={{
                      fontSize: '0.72rem',
                      fontFamily: "'DM Mono', monospace",
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      color: '#FFFFFF',
                      transition: 'all var(--transition-fast)',
                    }}
                    className="stack-tag"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Secondary Section - "More on GitHub" */}
        <div style={{ marginTop: '80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
            <Github size={22} color="#00F5FF" />
            <h3 style={{ fontSize: '1.65rem', color: '#FFFFFF', margin: 0, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
              More on GitHub
            </h3>
          </div>

          {loadingRepos ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--color-text-secondary)', fontFamily: "'DM Mono', monospace" }}>
              Loading public builds...
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
              }}
            >
              {githubRepos.slice(0, 6).map((repo) => (
                <div
                  key={repo.id}
                  className="glass-panel"
                  style={{
                    padding: '20px',
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '12px',
                    background: 'rgba(10, 10, 15, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.03)',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  <div>
                    {/* Top Row: title & link */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <h4 style={{ fontSize: '1.05rem', color: '#FFFFFF', margin: 0, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
                        {repo.name}
                      </h4>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#00F5FF' }}
                        className="project-link"
                        title="View Repo"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>

                    {/* Desc */}
                    <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', margin: 0, lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {repo.description || "No description provided."}
                    </p>
                  </div>

                  {/* Bottom details */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                    {/* Language pill */}
                    {repo.language ? (
                      <span style={{ fontSize: '0.68rem', fontFamily: "'DM Mono', monospace", background: 'rgba(0, 245, 255, 0.05)', border: '1px solid rgba(0, 245, 255, 0.15)', padding: '2px 8px', borderRadius: '4px', color: '#00F5FF' }}>
                        {repo.language}
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.68rem', fontFamily: "'DM Mono', monospace", color: 'var(--color-text-muted)' }}>
                        Plain text
                      </span>
                    )}

                    {/* Stars / Forks */}
                    <div style={{ display: 'flex', gap: '10px', fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                      {repo.stargazers_count > 0 && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <Star size={12} />
                          {repo.stargazers_count}
                        </span>
                      )}
                      {repo.forks_count > 0 && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <GitFork size={12} />
                          {repo.forks_count}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      <style>{`
        .project-link:hover {
          color: #00F5FF !important;
          transform: scale(1.1);
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
      `}</style>
    </section>
  );
};

export default Projects;
