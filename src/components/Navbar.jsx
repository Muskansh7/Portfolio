import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { label: 'Home', target: 'home' },
    { label: 'About', target: 'about' },
    { label: 'Experience', target: 'experience' },
    { label: 'Projects', target: 'projects' },
    { label: 'Tech Stack', target: 'skills' },
    { label: 'Contact', target: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const scrollPosition = window.scrollY + 150;
      for (const link of navLinks) {
        const el = document.getElementById(link.target);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.target);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, target) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const el = document.getElementById(target);
    if (el) {
      const offsetTop = el.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
      setActiveSection(target);
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`site-header${isScrolled ? ' site-header--scrolled' : ''}`}
    >
      <div className="site-header-inner">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className="site-logo"
        >
          <span className="site-logo-icon">⚡</span>
          <span>MS</span>
        </a>

        <nav className="desktop-nav site-nav">
          {navLinks.map((link) => (
            <a
              key={link.target}
              href={`#${link.target}`}
              onClick={(e) => handleNavClick(e, link.target)}
              className={`nav-link${activeSection === link.target ? ' nav-link--active' : ''}`}
            >
              {link.label}
              {activeSection === link.target && (
                <motion.span
                  layoutId="activeNavLine"
                  className="nav-link-indicator"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          ))}
          <button
            type="button"
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="navbar-cta"
          >
            Connect
          </a>
        </nav>

        <div className="mobile-nav-actions">
          <button
            type="button"
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="hamburger-btn"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="mobile-drawer"
          >
            {navLinks.map((link) => (
              <a
                key={link.target}
                href={`#${link.target}`}
                onClick={(e) => handleNavClick(e, link.target)}
                className={`mobile-nav-link${activeSection === link.target ? ' mobile-nav-link--active' : ''}`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="mobile-nav-cta"
            >
              Let's Connect
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .site-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 20px 24px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          background: var(--color-nav-bg);
          border-bottom: 1px solid transparent;
        }

        .site-header--scrolled {
          padding: 12px 24px;
          background: var(--color-nav-bg-scrolled);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--color-nav-border);
          box-shadow: var(--color-nav-shadow);
        }

        .site-header-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .site-logo {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 1.45rem;
          color: var(--color-heading);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .site-logo-icon {
          color: var(--color-cyan);
          filter: drop-shadow(0 0 6px var(--color-cyan-glow));
        }

        .site-nav {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .nav-link {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.9rem;
          color: var(--color-nav-link);
          text-decoration: none;
          position: relative;
          padding: 6px 0;
          transition: color var(--transition-fast);
          font-weight: 400;
        }

        .nav-link--active {
          color: var(--color-cyan);
          font-weight: 600;
        }

        .nav-link:hover {
          color: var(--color-cyan);
        }

        .nav-link-indicator {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, var(--color-cyan), var(--color-violet));
          box-shadow: 0 0 8px var(--color-cyan-glow);
        }

        .navbar-cta {
          padding: 8px 20px;
          border-radius: 8px;
          border: 1px solid rgba(0, 245, 255, 0.3);
          background: rgba(0, 245, 255, 0.05);
          color: var(--color-cyan);
          font-size: 0.85rem;
          font-weight: 600;
          font-family: 'Space Grotesk', sans-serif;
          text-decoration: none;
          transition: all var(--transition-fast);
        }

        [data-theme="light"] .navbar-cta {
          background: rgba(8, 145, 178, 0.08);
          border-color: rgba(8, 145, 178, 0.3);
        }

        .navbar-cta:hover {
          background: rgba(0, 245, 255, 0.15);
          box-shadow: 0 0 15px rgba(0, 245, 255, 0.3);
          transform: translateY(-1px);
        }

        .mobile-nav-actions {
          display: none;
          align-items: center;
          gap: 10px;
        }

        .hamburger-btn {
          background: none;
          border: none;
          color: var(--color-heading);
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-drawer {
          display: none;
          flex-direction: column;
          background: var(--color-mobile-drawer-bg);
          backdrop-filter: blur(20px);
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          border-bottom: 1px solid var(--color-nav-border);
          padding: 20px 24px;
          gap: 16px;
        }

        .mobile-nav-link {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.1rem;
          color: var(--color-nav-link);
          text-decoration: none;
          padding: 8px 0;
          font-weight: 400;
          display: block;
        }

        .mobile-nav-link--active {
          color: var(--color-cyan);
          font-weight: 600;
        }

        .mobile-nav-cta {
          text-align: center;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid rgba(0, 245, 255, 0.3);
          background: rgba(0, 245, 255, 0.05);
          color: var(--color-cyan);
          font-size: 1rem;
          font-weight: 600;
          font-family: 'Space Grotesk', sans-serif;
          text-decoration: none;
          display: block;
          margin-top: 10px;
        }

        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-nav-actions {
            display: flex !important;
          }
          .mobile-drawer {
            display: flex !important;
          }
        }
      `}</style>
    </motion.header>
  );
};

export default Navbar;
