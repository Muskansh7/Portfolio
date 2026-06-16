import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', target: 'home' },
    { label: 'About', target: 'about' },
    { label: 'Skills', target: 'skills' },
    { label: 'Experience', target: 'experience' },
    { label: 'Projects', target: 'projects' },
    { label: 'Contact', target: 'contact' },
  ];

  useEffect(() => {
    // Handle background opacity on scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Section Highlight Logic (Scrollspy)
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
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        padding: isScrolled ? '12px 24px' : '20px 24px',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        background: isScrolled ? 'rgba(10, 10, 15, 0.75)' : 'rgba(10, 10, 15, 0)',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(255, 255, 255, 0)',
        boxShadow: isScrolled ? '0 10px 30px rgba(0, 0, 0, 0.3)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Logo Monogram */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: '1.45rem',
            color: '#FFFFFF',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ color: '#00F5FF', filter: 'drop-shadow(0 0 6px rgba(0, 245, 255, 0.4))' }}>⚡</span>
          <span>MS</span>
        </a>

        {/* Desktop Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.target}
              href={`#${link.target}`}
              onClick={(e) => handleNavClick(e, link.target)}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.9rem',
                color: activeSection === link.target ? '#00F5FF' : '#9CA3AF',
                textDecoration: 'none',
                position: 'relative',
                padding: '6px 0',
                transition: 'color var(--transition-fast)',
                fontWeight: activeSection === link.target ? 600 : 400,
              }}
              className="nav-link"
            >
              {link.label}
              {activeSection === link.target && (
                <motion.span
                  layoutId="activeNavLine"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '2px',
                    background: 'linear-gradient(90deg, #00F5FF, #7C3AED)',
                    boxShadow: '0 0 8px rgba(0, 245, 255, 0.8)',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            style={{
              padding: '8px 20px',
              borderRadius: '8px',
              border: '1px solid rgba(0, 245, 255, 0.3)',
              background: 'rgba(0, 245, 255, 0.05)',
              color: '#00F5FF',
              fontSize: '0.85rem',
              fontWeight: 600,
              fontFamily: "'Space Grotesk', sans-serif",
              textDecoration: 'none',
              transition: 'all var(--transition-fast)',
            }}
            className="navbar-cta"
          >
            Connect
          </a>
        </nav>

        {/* Hamburger Icon for Mobile */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: '#FFFFFF',
            cursor: 'pointer',
            padding: '4px',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="hamburger-btn"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              display: 'none',
              flexDirection: 'column',
              background: 'rgba(10, 10, 15, 0.95)',
              backdropFilter: 'blur(20px)',
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '100%',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '20px 24px',
              gap: '16px',
            }}
            className="mobile-drawer"
          >
            {navLinks.map((link) => (
              <a
                key={link.target}
                href={`#${link.target}`}
                onClick={(e) => handleNavClick(e, link.target)}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1.1rem',
                  color: activeSection === link.target ? '#00F5FF' : '#9CA3AF',
                  textDecoration: 'none',
                  padding: '8px 0',
                  fontWeight: activeSection === link.target ? 600 : 400,
                  display: 'block',
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              style={{
                textAlign: 'center',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid rgba(0, 245, 255, 0.3)',
                background: 'rgba(0, 245, 255, 0.05)',
                color: '#00F5FF',
                fontSize: '1rem',
                fontWeight: 600,
                fontFamily: "'Space Grotesk', sans-serif",
                textDecoration: 'none',
                display: 'block',
                marginTop: '10px',
              }}
            >
              Let's Connect
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-link:hover {
          color: #00F5FF !important;
        }
        .navbar-cta:hover {
          background: rgba(0, 245, 255, 0.15);
          box-shadow: 0 0 15px rgba(0, 245, 255, 0.3);
          transform: translateY(-1px);
        }
        
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .hamburger-btn {
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
