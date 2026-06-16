import React from 'react';
import { Award, ShieldCheck, Cpu, Star } from 'lucide-react';

const Certifications = () => {
  const items = [
    {
      title: 'ET-AI Hackathon 2026 Semi-Finalist',
      org: 'The Economic Times Digital',
      icon: <Award size={18} color="#FFD700" />,
      tag: '🏆 HACKATHON',
      border: '#FFD700',
    },
    {
      title: 'Machine Learning Specialization',
      org: 'DeepLearning.AI',
      icon: <ShieldCheck size={18} color="#00F5FF" />,
      tag: '📜 SPEC.',
      border: '#00F5FF',
    },
    {
      title: 'NPTEL: Introduction to IoT',
      org: 'Elite Certificate',
      icon: <Cpu size={18} color="#7C3AED" />,
      tag: '📜 COURSE',
      border: '#7C3AED',
    },
    {
      title: 'AI/ML Professional Cohort',
      org: 'VIT Bhopal University',
      icon: <Star size={18} color="#FFD700" />,
      tag: '⭐ ACADEMIC',
      border: '#FFD700',
    },
  ];

  // Duplicate the array to create a seamless infinite marquee effect
  const tickerItems = [...items, ...items, ...items];

  return (
    <section id="certifications" style={{ position: 'relative', overflow: 'hidden', padding: '60px 0' }}>
      {/* Visual background elements */}
      <div className="interactive-blob" style={{ bottom: '-10%', right: '20%', width: '300px', height: '300px' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', marginBottom: '30px' }}>
        <h3
          style={{
            fontSize: '1.65rem',
            color: '#FFFFFF',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <span>Certifications & Achievements</span>
        </h3>
      </div>

      {/* Scrolling Ticker Track */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          padding: '20px 0',
          background: 'rgba(255, 255, 255, 0.01)',
          borderTop: '1px solid rgba(255, 255, 255, 0.03)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
          display: 'flex',
        }}
        className="ticker-container"
      >
        {/* Soft edge masking for editorial vignette effect */}
        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '100px', background: 'linear-gradient(90deg, #0A0A0F 0%, transparent 100%)', zIndex: 3, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '100px', background: 'linear-gradient(-90deg, #0A0A0F 0%, transparent 100%)', zIndex: 3, pointerEvents: 'none' }} />

        {/* Moving track */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
            animation: 'marquee 30s linear infinite',
            whiteSpace: 'nowrap',
          }}
          className="ticker-track"
        >
          {tickerItems.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel ticker-item"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px 24px',
                borderRadius: '12px',
                border: `1px solid rgba(255, 255, 255, 0.05)`,
                background: 'rgba(15, 15, 25, 0.5)',
                minWidth: '320px',
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.02)',
                  border: `1.5px solid rgba(255, 255, 255, 0.06)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span
                  style={{
                    fontSize: '0.65rem',
                    fontFamily: "'DM Mono', monospace",
                    color: item.border,
                    letterSpacing: '0.05em',
                  }}
                >
                  {item.tag}
                </span>
                
                <h4 style={{ fontSize: '0.9rem', color: '#FFFFFF', margin: 0, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
                  {item.title}
                </h4>
                
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                  {item.org}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        
        .ticker-container:hover .ticker-track {
          animation-play-state: paused;
        }

        .ticker-item {
          transition: all var(--transition-fast) !important;
        }

        .ticker-item:hover {
          border-color: rgba(0, 245, 255, 0.25) !important;
          box-shadow: 0 5px 15px rgba(0, 245, 255, 0.05);
          transform: scale(1.02);
        }
      `}</style>
    </section>
  );
};

export default Certifications;
