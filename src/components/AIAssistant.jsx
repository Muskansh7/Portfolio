import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';
import resumeData from '../data/resumeData.json';
const API = import.meta.env.VITE_API_URL;

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hi! I'm Muskan's AI assistant. Ask me anything about my skills, projects, experience, or education. How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const starterQuestions = [
    { text: "What are Muskan's strongest skills?", id: 'skills' },
    { text: "Tell me about her AI projects", id: 'projects' },
    { text: "Is she open to opportunities?", id: 'opportunities' },
    { text: "What tech stack does she use?", id: 'stack' },
  ];

  const handleSendMessage = async (textToSend) => {
    if (!textToSend.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('${API}/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error('Server returned error status');
      }

      const data = await response.json();
      
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: data.text || "I didn't receive a reply from my brain.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.warn("Failed to reach server backend chat endpoint, using local fallback.", error);
      
      // Heuristic fallback response generator
      const reply = generateAIResponseFallback(textToSend);
      
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const generateAIResponseFallback = (query) => {
    const q = query.toLowerCase();

    // Greeting
    if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('greeting')) {
      return "Hello! Great to connect with you. I can tell you about my AI/ML background, engineering projects, internships, or how to get in touch. What are you interested in?";
    }

    // Skills / Stack
    if (q.includes('skill') || q.includes('stack') || q.includes('language') || q.includes('tool') || q.includes('python') || q.includes('code') || q.includes('expert')) {
      return "I specialize in **AI & Machine Learning** and **Backend Engineering**. Here is my technical stack:\n\n" +
             "• **Languages**: Python, C++, SQL\n" +
             "• **AI/ML**: Large Language Models (LLMs), RAG pipelines, LangChain, LangGraph, HuggingFace, FAISS, Computer Vision, Multimodal AI, Vector Databases\n" +
             "• **Backend & UI**: FastAPI, REST APIs, Streamlit, Gradio, React\n" +
             "• **Databases**: PostgreSQL, MySQL\n" +
             "• **MLOps & Tools**: Git, AWS, CI/CD pipelines, MLOps practices, Agile SDLC\n\n" +
             "I thrive on designing architectures that connect advanced machine intelligence with scalable, production-grade applications.";
    }

    // Projects
    if (q.includes('project') || q.includes('agent') || q.includes('medilens') || q.includes('voicevision') || q.includes('portfolio') || q.includes('build')) {
      return "I have engineered several key AI systems:\n\n" +
             "1. **Adaptive AI Agent Platform**: A multi-agent framework built with LangGraph, Gemini, and OpenAI. It integrates web search augmentation and FastAPI backend to deliver intelligent routing and query resolution under 2 seconds (1,000+ interactions).\n\n" +
             "2. **MediLens AI Knowledge Engine**: A RAG pipeline employing FAISS and HuggingFace for healthcare QA. By processing 1,000+ medical journals and utilizing LLaMA 3.3 and Gemini Vision, it improved retrieval precision by 35%.\n\n" +
             "3. **VoiceVision Healthcare AI**: A multimodal application combining speech recognition, computer vision, and LLM reasoning. It unified diagnosis steps and reduced development integration efforts by 40%.\n\n" +
             "Which project would you like to explore in more detail?";
    }

    // Internships / Experience
    if (q.includes('experience') || q.includes('work') || q.includes('job') || q.includes('intern') || q.includes('bluestock') || q.includes('smartbridge')) {
      return "I have completed two technical internships:\n\n" +
             "• **Bluestock Fintech** — *Software Development Engineer Intern* (Mar 2026 – Apr 2026):\n" +
             "Focussed on backend development using Python and REST APIs. I implemented 10+ core production features and utilized CI/CD and Agile practices to streamline deployments.\n\n" +
             "• **SmartBridge** — *Machine Learning Intern* (May 2025 – Jun 2025):\n" +
             "Built end-to-end ML workflows on datasets of over 10,000+ records. I automated pipelines that accelerated experimentation cycles by 30% and improved model performance by 20%.";
    }

    // Education
    if (q.includes('education') || q.includes('university') || q.includes('college') || q.includes('vit') || q.includes('gpa') || q.includes('cgpa') || q.includes('graduate') || q.includes('study')) {
      return `I am a final-year **B.Tech (Computer Science & Engineering) student specializing in AI & Machine Learning** at **VIT Bhopal University**, graduating in **2027**. I currently maintain a **CGPA of 8.12**.`;
    }

    // Opportunities / Contact / Hiring
    if (q.includes('hire') || q.includes('job') || q.includes('opportunity') || q.includes('contact') || q.includes('email') || q.includes('open') || q.includes('phone') || q.includes('linkedin') || q.includes('mail')) {
      return `Yes! I am actively looking for **full-time opportunities, internships, and collaborative projects in AI/ML engineering starting 2027**.\n\n` +
             `You can reach me directly at:\n` +
             `📧 **Email**: ${resumeData.personal.email}\n` +
             `📞 **Phone**: ${resumeData.personal.phone}\n` +
             `🔗 **LinkedIn**: [LinkedIn Profile](${resumeData.personal.linkedin})\n` +
             `🐙 **GitHub**: [GitHub Profile](${resumeData.personal.github})\n\n` +
             `I am based in Delhi, India, but open to remote work or relocation!`;
    }

    // Hackathons / Achievements / Certifications
    if (q.includes('hackathon') || q.includes('achievement') || q.includes('certification') || q.includes('nptel') || q.includes('et') || q.includes('award')) {
      return "Here are a few highlights of my certifications and achievements:\n\n" +
             "🏆 **ET-AI Hackathon 2026 Semi-Finalist**: Selected as semi-finalist in the AI hackathon organized by The Economic Times Digital.\n" +
             "📜 **Machine Learning Specialization**: Certified by DeepLearning.AI (completed Jul 2025).\n" +
             "📜 **NPTEL: Introduction to IoT**: Certified with elite scores (completed Apr 2026).";
    }

    // Toastmasters / Leadership
    if (q.includes('leadership') || q.includes('toastmaster') || q.includes('extracurricular') || q.includes('president') || q.includes('pr')) {
      return "I serve as the **Vice President of Public Relations** for Toastmasters International (University Chapter). In this role, I lead branding and marketing initiatives, coordinating community growth campaigns for our 20+ member community and public speaking events.";
    }

    // Default Fallback
    return `I'm not sure I fully caught that, but I'd love to share more about myself! I'm a final-year AI/ML student at VIT Bhopal with a CGPA of 8.12. My skills span LLMs, RAG, LangChain, FastAPI, and AWS. ` +
           `Feel free to ask about my internships (Bluestock, SmartBridge), projects (Adaptive AI Agent, MediLens), or how to connect with me at ${resumeData.personal.email}.`;
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
      {/* Floating Chat Bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '30px',
              background: 'linear-gradient(135deg, #7C3AED, #00F5FF)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(0, 245, 255, 0.4), 0 0 40px rgba(124, 58, 237, 0.2)',
              position: 'relative',
            }}
            title="Chat with Muskan's AI"
          >
            {/* Pulsing ring indicator */}
            <span
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '30px',
                border: '2px solid #00F5FF',
                animation: 'chat-pulse 2s infinite',
                pointerEvents: 'none',
              }}
            />
            <MessageSquare size={26} color="#FFFFFF" />
            <style>{`
              @keyframes chat-pulse {
                0% { transform: scale(1); opacity: 0.8; }
                100% { transform: scale(1.4); opacity: 0; }
              }
            `}</style>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '380px',
              height: '540px',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(10, 10, 15, 0.95)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 245, 255, 0.05)',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '16px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'linear-gradient(90deg, rgba(124, 58, 237, 0.15), rgba(0, 245, 255, 0.15))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Bot size={22} color="#00F5FF" style={{ filter: 'drop-shadow(0 0 4px rgba(0, 245, 255, 0.5))' }} />
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#F3F4F6', fontFamily: "'Space Grotesk', sans-serif" }}>
                    Muskan's AI
                  </h4>
                  <span style={{ fontSize: '0.72rem', color: '#00F5FF', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#00F5FF', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
                    Active Assistant // RAG Chatbot
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9CA3AF',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                className="hover-bright"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div
              style={{
                flex: 1,
                padding: '16px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    gap: '8px',
                  }}
                >
                  {msg.sender === 'bot' && (
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(124, 58, 237, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      <Sparkles size={14} color="#7C3AED" />
                    </div>
                  )}
                  <div
                    style={{
                      maxWidth: '80%',
                      padding: '10px 14px',
                      borderRadius: '14px',
                      borderTopRightRadius: msg.sender === 'user' ? '2px' : '14px',
                      borderTopLeftRadius: msg.sender === 'bot' ? '2px' : '14px',
                      fontSize: '0.85rem',
                      lineHeight: '1.45',
                      color: '#F3F4F6',
                      background: msg.sender === 'user' ? 'rgba(0, 245, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                      border: msg.sender === 'user' ? '1px solid rgba(0, 245, 255, 0.15)' : '1px solid rgba(255, 255, 255, 0.05)',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {msg.text.split('\n').map((line, i) => {
                      // Formatting simple markdown-like bold list bullets
                      if (line.startsWith('• ') || line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ')) {
                        return <div key={i} style={{ marginLeft: '4px', marginBottom: '4px' }}>{renderBoldText(line)}</div>;
                      }
                      return <p key={i} style={{ margin: 0, marginBottom: '6px' }}>{renderBoldText(line)}</p>;
                    })}
                    <span style={{ display: 'block', fontSize: '0.7rem', color: '#9CA3AF', textAlign: 'right', marginTop: '4px' }}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(124, 58, 237, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Sparkles size={14} color="#7C3AED" />
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)', padding: '12px 16px', borderRadius: '14px', borderTopLeftRadius: '2px', display: 'flex', gap: '4px', alignItems: 'center' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#00F5FF', animation: 'typing 1.4s infinite 0s' }} />
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#00F5FF', animation: 'typing 1.4s infinite 0.2s' }} />
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#00F5FF', animation: 'typing 1.4s infinite 0.4s' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Starter Chips */}
            <div
              style={{
                padding: '8px 12px',
                display: 'flex',
                gap: '8px',
                overflowX: 'auto',
                borderTop: '1px solid rgba(255, 255, 255, 0.04)',
                flexShrink: 0,
                scrollbarWidth: 'none',
              }}
              className="starter-chips"
            >
              {starterQuestions.map((q) => (
                <button
                  key={q.id}
                  onClick={() => handleSendMessage(q.text)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '20px',
                    padding: '6px 12px',
                    color: '#D1D5DB',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all var(--transition-fast)',
                  }}
                  className="chip-btn"
                >
                  {q.text}
                </button>
              ))}
            </div>

            {/* AI Engineer RAG Tag */}
            <div
              style={{
                background: 'rgba(0, 245, 255, 0.04)',
                borderTop: '1px solid rgba(0, 245, 255, 0.1)',
                padding: '6px 16px',
                fontSize: '0.68rem',
                color: '#00F5FF',
                fontFamily: "'DM Mono', monospace",
                textAlign: 'center',
                letterSpacing: '0.02em',
                flexShrink: 0
              }}
            >
              ⚡ Powered by GPT-4o-mini + Local Resume RAG Context
            </div>

            {/* Chat Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
              }}
              style={{
                padding: '12px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                background: 'rgba(10, 10, 15, 0.98)',
              }}
            >
              <input
                type="text"
                placeholder="Ask me a question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  color: '#F3F4F6',
                  fontSize: '0.85rem',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #7C3AED, #00F5FF)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                }}
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .starter-chips::-webkit-scrollbar {
          display: none;
        }
        .chip-btn:hover {
          color: #00F5FF;
          border-color: rgba(0, 245, 255, 0.3);
          background: rgba(0, 245, 255, 0.03);
        }
        @keyframes typing {
          0%, 100% { transform: translateY(0px); opacity: 0.4; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
        .hover-bright:hover {
          color: #FFFFFF !important;
        }
        input::placeholder {
          color: #9CA3AF !important;
        }
      `}</style>
    </div>
  );
};

// Helper function to render bold tags from string
function renderBoldText(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} style={{ color: '#00F5FF', fontWeight: '600' }}>{part.slice(2, -2)}</strong>;
    }
    // Check for inline markdown links [text](url)
    const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      return (
        <a key={index} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" style={{ color: '#00F5FF', textDecoration: 'underline' }}>
          {linkMatch[1]}
        </a>
      );
    }
    return part;
  });
}

export default AIAssistant;
