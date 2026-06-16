import React from 'react';
import { Users, Presentation, MessageSquare, Award } from 'lucide-react';

const Leadership = () => {
  const leadershipHighlights = [
    {
      icon: <Users size={18} />,
      title: 'Community Building',
      desc: 'Directed outreach and local campaigns to manage and engage a growing community of 20+ active public speaking members.',
    },
    {
      icon: <Presentation size={18} />,
      title: 'Branding & Outreach',
      desc: 'Led visual identities, marketing newsletters, and digital flyers, increasing student cohort turnout in weekly assemblies.',
    },
  ];

  return (
    <section id="leadership" style={{ position: 'relative' }}>
      <div className="section-container">
        <h2 className="section-title">Leadership & Community</h2>

        <div
          className="glass-panel"
          style={{
            maxWidth: '900px',
            margin: '40px auto 0 auto',
            padding: '40px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              paddingBottom: '24px',
              marginBottom: '32px',
            }}
          >
            <div>
              <div
                style={{
                  color: '#00F5FF',
                  fontSize: '0.8rem',
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 500,
                  marginBottom: '8px',
                }}
              >
                ROLE // VICE_PRESIDENT_PUBLIC_RELATIONS
              </div>
              
              <h3
                style={{
                  fontSize: '1.65rem',
                  color: '#FFFFFF',
                  margin: 0,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                }}
              >
                Toastmasters International
              </h3>
              
              <p style={{ margin: '4px 0 0 0', color: 'var(--color-text-secondary)' }}>
                University Chapter leadership role.
              </p>
            </div>

            {/* Glowing Accent Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(124, 58, 237, 0.06)',
                border: '1px solid rgba(124, 58, 237, 0.2)',
                padding: '8px 18px',
                borderRadius: '8px',
                color: '#7C3AED',
                fontWeight: 600,
                fontSize: '0.85rem',
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              <Award size={16} />
              <span>Executive Board</span>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 0.9fr',
              gap: '40px',
              alignItems: 'center',
            }}
            className="leadership-grid"
          >
            {/* Impact Text & Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <p
                style={{
                  fontSize: '1.1rem',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.6',
                  margin: 0,
                }}
              >
                As Vice President of Public Relations, I took charge of branding, audience expansion, and community engagement. I organized and scaled weekly speaking clinics, shaping public outreach campaigns that helped our community think on their feet and connect effectively.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {leadershipHighlights.map((highlight, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#00F5FF',
                        flexShrink: 0,
                        marginTop: '2px',
                      }}
                    >
                      {highlight.icon}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', color: '#FFFFFF', margin: '0 0 4px 0', fontWeight: 600 }}>
                        {highlight.title}
                      </h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: 0, lineHeight: '1.45' }}>
                        {highlight.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Stat Panels */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '20px',
              }}
            >
              <div
                className="glass-panel"
                style={{
                  padding: '24px',
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid rgba(255,255,255,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#00F5FF', fontFamily: "'Syne', sans-serif" }}>
                  20+
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Members Managed
                </div>
                <p style={{ margin: '8px 0 0 0', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                  Directed branding, registrations, and engagement channels.
                </p>
              </div>

              <div
                className="glass-panel"
                style={{
                  padding: '24px',
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid rgba(255,255,255,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#7C3AED', fontFamily: "'Syne', sans-serif" }}>
                  20+
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Chapters Coordinated
                </div>
                <p style={{ margin: '8px 0 0 0', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                  Led outreach and branding for inter-university speech summits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .leadership-grid {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Leadership;
