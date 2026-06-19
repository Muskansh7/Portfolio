import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, ArrowRight } from 'lucide-react';
import { Linkedin, Github } from './BrandIcons';
import resumeData from '../data/resumeData.json';

const Hero = () => {
  const words = ['AI/ML Engineer', 'LLM Builder', 'RAG Architect', 'Software Developer'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentWord = words[currentWordIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && displayedText === currentWord) {
      // Pause when full word is typed
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && displayedText === '') {
      // Switch word when deleted
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    } else {
      timer = setTimeout(() => {
        setDisplayedText((prev) =>
          isDeleting
            ? currentWord.substring(0, prev.length - 1)
            : currentWord.substring(0, prev.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentWordIndex]);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offsetTop = el.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="home">
      <div className="interactive-blob" style={{ top: '20%', right: '10%' }} />
      <div className="interactive-blob" style={{ bottom: '10%', left: '5%', animationDelay: '-10s' }} />

      <div className="section-container" style={{ width: '100%' }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            maxWidth: '800px',
          }}
        >
          {/* Location Badge */}
          <motion.div
            variants={itemVariants}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              alignSelf: 'flex-start',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              color: 'var(--color-heading)',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
            }}
          >
            <MapPin size={14} color="#00F5FF" />
            <span>{resumeData.personal.locationShort}</span>
          </motion.div>

          {/* Name Display */}
          <motion.h1
            variants={itemVariants}
            style={{
              fontSize: 'clamp(3.5rem, 8vw, 5.5rem)',
              lineHeight: 0.95,
              fontWeight: 800,
              fontFamily: "'Syne', sans-serif",
            }}
            className="shimmer-text"
          >
            {resumeData.personal.name}
          </motion.h1>

          {/* Typewriter text */}
          <motion.div
            variants={itemVariants}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              minHeight: '40px',
            }}
          >
            <span
              style={{
                fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
                fontWeight: 700,
                color: 'var(--color-heading)',
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              I build intelligence as a
            </span>
            <span
              style={{
                fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
                fontWeight: 700,
                color: '#00F5FF',
                fontFamily: "'Space Grotesk', sans-serif",
                textShadow: '0 0 20px rgba(0, 245, 255, 0.3)',
                borderRight: '3px solid #00F5FF',
                paddingRight: '4px',
                animation: 'cursor-blink 0.8s infinite',
                display: 'inline-block',
              }}
            >
              {displayedText}
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            style={{
              fontSize: '1.25rem',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.5,
              maxWidth: '600px',
            }}
          >
            Building intelligent systems — multi-agent routing, RAG pipelines, and production-grade AI backends.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            style={{
              display: 'flex',
              gap: '16px',
              marginTop: '12px',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={() => handleScrollTo('experience')}
              style={{
                background: 'linear-gradient(135deg, #7C3AED, #00F5FF)',
                border: 'none',
                color: 'var(--color-heading)',
                padding: '14px 28px',
                fontSize: '0.95rem',
                fontWeight: 600,
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 0 20px rgba(0, 245, 255, 0.25)',
                transition: 'all var(--transition-fast)',
                fontFamily: "'Space Grotesk', sans-serif",
              }}
              className="primary-btn"
            >
              <span>View Experience</span>
              <ArrowRight size={16} />
            </button>
            
            <button
              onClick={() => handleScrollTo('contact')}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: 'var(--color-text-primary)',
                padding: '14px 28px',
                fontSize: '0.95rem',
                fontWeight: 600,
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                fontFamily: "'Space Grotesk', sans-serif",
              }}
              className="secondary-btn"
            >
              Let's Connect
            </button>
          </motion.div>

          {/* Social Icons row */}
          <motion.div
            variants={itemVariants}
            style={{
              display: 'flex',
              gap: '20px',
              marginTop: '40px',
              alignItems: 'center',
            }}
          >
            {[
              { icon: <Linkedin size={22} />, url: resumeData.personal.linkedin, title: 'LinkedIn' },
              { icon: <Github size={22} />, url: resumeData.personal.github, title: 'GitHub' },
              { icon: <Mail size={22} />, url: `mailto:${resumeData.personal.email}`, title: 'Email' },
            ].map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                title={social.title}
                style={{
                  color: 'var(--color-heading)', // High contrast icons
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all var(--transition-fast)',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  textDecoration: 'none',
                }}
                className="social-icon-link"
              >
                {social.icon}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes cursor-blink {
          0%, 100% { border-color: transparent; }
          50% { border-color: #00F5FF; }
        }
        
        .primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 30px rgba(0, 245, 255, 0.45);
        }
        
        .secondary-btn:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(0, 245, 255, 0.25);
          transform: translateY(-2px);
        }
        
        .social-icon-link:hover {
          color: #00F5FF !important;
          border-color: rgba(0, 245, 255, 0.3) !important;
          background: rgba(0, 245, 255, 0.05) !important;
          box-shadow: 0 0 15px rgba(0, 245, 255, 0.15);
          transform: translateY(-2px) rotate(5deg);
        }
      `}</style>
    </section>
  );
};

export default Hero;
