import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Copy, Check, Send } from 'lucide-react';
import { Linkedin, Github } from './BrandIcons';
import resumeData from '../data/resumeData.json';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formState, setFormState] = useState('idle'); // idle, sending, success
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormState('sending');
    // Simulate sending message
    setTimeout(() => {
      setFormState('success');
      setFormData({ name: '', email: '', message: '' });
      // Reset form status after 3 seconds
      setTimeout(() => setFormState('idle'), 4000);
    }, 1500);
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section id="contact" style={{ position: 'relative' }}>
      <div className="section-container">
        <h2 className="section-title">Get In Touch</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '0.9fr 1.1fr',
            gap: '60px',
            marginTop: '40px',
          }}
          className="contact-grid"
        >
          {/* Contact Details Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div>
              <h3
                style={{
                  fontSize: '1.45rem',
                  color: '#FFFFFF',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 650,
                  marginBottom: '12px',
                }}
              >
                Let's discuss intelligence.
              </h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: '1.5', margin: 0 }}>
                I am actively seeking full-time opportunities, internships, and research collaborations in AI/ML, LLM development, and RAG architectures. Drop a message or reach out via email.
              </p>
            </div>

            {/* Direct Channels */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Email channel */}
              <div
                className="glass-panel"
                style={{
                  padding: '18px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid rgba(255,255,255,0.03)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ color: '#00F5FF', width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(0, 245, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={18} />
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: '#E5E7EB', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Email</span>
                    <a href={`mailto:${resumeData.personal.email}`} style={{ color: '#FFFFFF', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 500 }} className="hover-cyan">
                      {resumeData.personal.email}
                    </a>
                  </div>
                </div>
                
                <button
                  onClick={() => copyToClipboard(resumeData.personal.email, 'email')}
                  style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Copy to clipboard"
                  className="copy-btn"
                >
                  {copiedEmail ? <Check size={16} color="#00F5FF" /> : <Copy size={16} />}
                </button>
              </div>

              {/* Phone channel */}
              <div
                className="glass-panel"
                style={{
                  padding: '18px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid rgba(255,255,255,0.03)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ color: '#7C3AED', width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(124, 58, 237, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={18} />
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: '#E5E7EB', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Phone</span>
                    <a href={`tel:${resumeData.personal.phone.replace(/[^0-9+]/g, '')}`} style={{ color: '#FFFFFF', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 500 }} className="hover-cyan">
                      {resumeData.personal.phone}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(resumeData.personal.phone, 'phone')}
                  style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Copy to clipboard"
                  className="copy-btn"
                >
                  {copiedPhone ? <Check size={16} color="#7C3AED" /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            {/* Location & Social links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-text-secondary)' }}>
                <MapPin size={18} color="#00F5FF" />
                <span style={{ fontSize: '0.95rem' }}>{resumeData.personal.location}</span>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginTop: '10px' }}>
                <a
                  href={resumeData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.05)',
                    background: 'rgba(255,255,255,0.01)',
                    color: '#FFFFFF',
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                    transition: 'all var(--transition-fast)',
                  }}
                  className="contact-social-link"
                >
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={resumeData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.05)',
                    background: 'rgba(255,255,255,0.01)',
                    color: '#FFFFFF',
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                    transition: 'all var(--transition-fast)',
                  }}
                  className="contact-social-link"
                >
                  <Github size={16} />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Email Form */}
          <div className="glass-panel" style={{ padding: '36px', position: 'relative' }}>
            <AnimatePresence mode="wait">
              {formState !== 'success' ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                >
                  {/* Name field */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="name" style={{ fontSize: '0.8rem', color: '#E5E7EB', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, letterSpacing: '0.02em' }}>
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Muskan Sharma"
                      style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        color: '#F3F4F6',
                        fontSize: '0.9rem',
                        outline: 'none',
                        transition: 'border var(--transition-fast)',
                      }}
                      className="form-input"
                    />
                  </div>

                  {/* Email field */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="email" style={{ fontSize: '0.8rem', color: '#E5E7EB', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, letterSpacing: '0.02em' }}>
                      YOUR EMAIL
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="hello@domain.com"
                      style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        color: '#F3F4F6',
                        fontSize: '0.9rem',
                        outline: 'none',
                        transition: 'border var(--transition-fast)',
                      }}
                      className="form-input"
                    />
                  </div>

                  {/* Message field */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="message" style={{ fontSize: '0.8rem', color: '#E5E7EB', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, letterSpacing: '0.02em' }}>
                      YOUR MESSAGE
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows="5"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="I'd love to chat about a job opportunity or collaboration..."
                      style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        color: '#F3F4F6',
                        fontSize: '0.9rem',
                        outline: 'none',
                        resize: 'none',
                        fontFamily: 'inherit',
                        transition: 'border var(--transition-fast)',
                      }}
                      className="form-input"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={formState === 'sending'}
                    style={{
                      background: 'linear-gradient(135deg, #7C3AED 0%, #00F5FF 100%)',
                      border: 'none',
                      color: '#FFFFFF',
                      padding: '14px',
                      borderRadius: '8px',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      boxShadow: '0 0 15px rgba(0, 245, 255, 0.15)',
                      transition: 'all var(--transition-fast)',
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                    className="submit-btn"
                  >
                    {formState === 'sending' ? (
                      <span>TRANSMITTING...</span>
                    ) : (
                      <>
                        <span>Transmit Message</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '40px 0',
                    textAlign: 'center',
                    gap: '16px',
                  }}
                >
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'rgba(0, 245, 255, 0.08)',
                      border: '2px solid #00F5FF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#00F5FF',
                      boxShadow: '0 0 20px rgba(0, 245, 255, 0.3)',
                    }}
                  >
                    <Check size={32} />
                  </div>
                  <h4 style={{ fontSize: '1.4rem', color: '#FFFFFF', margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>
                    Transmission Complete
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', maxWidth: '280px', margin: 0 }}>
                    Thank you! Your message has been encrypted and sent to my queue. I will reply shortly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        .hover-cyan:hover {
          color: #00F5FF !important;
        }
        .copy-btn {
          transition: all var(--transition-fast);
        }
        .copy-btn:hover {
          color: #00F5FF !important;
        }
        .contact-social-link:hover {
          color: #00F5FF !important;
          border-color: rgba(0, 245, 255, 0.3) !important;
          background: rgba(0, 245, 255, 0.03) !important;
        }
        .form-input:focus {
          border-color: rgba(0, 245, 255, 0.5) !important;
          box-shadow: 0 0 10px rgba(0, 245, 255, 0.08);
          background: rgba(255, 255, 255, 0.04) !important;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 0 25px rgba(0, 245, 255, 0.4);
        }
        
        @media (max-width: 800px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
