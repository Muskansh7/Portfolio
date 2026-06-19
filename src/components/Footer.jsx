import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { Linkedin, Github } from './BrandIcons';
import resumeData from '../data/resumeData.json';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleBackToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="site-footer">
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
        }}
        className="footer-content"
      >
        {/* Left: Branding & Copyright */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p className="footer-brand">Designed & Built by Muskan Sharma</p>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontFamily: "'DM Mono', monospace" }}>
            © {currentYear} // ALL_SYSTEMS_OPERATIONAL
          </span>
        </div>

        {/* Center: Social Links */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {[
            { icon: <Linkedin size={18} />, url: resumeData.personal.linkedin, label: 'LinkedIn' },
            { icon: <Github size={18} />, url: resumeData.personal.github, label: 'GitHub' },
            { icon: <Mail size={18} />, url: `mailto:${resumeData.personal.email}`, label: 'Email' },
          ].map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              title={item.label}
              style={{
                color: 'var(--color-heading)',
                transition: 'color var(--transition-fast)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className="footer-social-link"
            >
              {item.icon}
            </a>
          ))}
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={handleBackToTop}
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            color: 'var(--color-heading)',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all var(--transition-fast)',
          }}
          className="back-to-top-btn"
          title="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      </div>

      <style>{`
        .site-footer {
          border-top: 1px solid var(--color-nav-border);
          background: var(--color-footer-bg);
          padding: 40px 24px;
          position: relative;
          z-index: 20;
          transition: background var(--transition-smooth), border-color var(--transition-smooth);
        }

        .footer-brand {
          margin: 0;
          font-size: 0.9rem;
          color: var(--color-text-primary);
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 500;
        }

        .footer-social-link:hover {
          color: #00F5FF !important;
        }
        .back-to-top-btn:hover {
          color: #00F5FF !important;
          border-color: rgba(0, 245, 255, 0.3) !important;
          background: rgba(0, 245, 255, 0.03) !important;
          transform: translateY(-2px);
        }
        
        @media (max-width: 600px) {
          .footer-content {
            flex-direction: column !important;
            text-align: center;
            align-items: center !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
