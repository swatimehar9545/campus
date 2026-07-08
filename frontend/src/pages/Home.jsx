import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const AI_STEPS = [
  "Generating Header...",
  "✔ Header Complete",
  "Generating Hero Section...",
  "✔ Hero Section Complete",
  "Generating Navbar...",
  "✔ Navbar Complete",
  "Generating Footer...",
  "✔ Done! Website Ready 🚀"
];

export default function Home() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [promptText, setPromptText] = useState("");
  const [theme, setTheme] = useState("dark");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([{ sender: 'ai', text: 'Hi! How can I help you build your website today?' }]);
  const [chatInput, setChatInput] = useState('');
  const [deployStatus, setDeployStatus] = useState(null);
  const [deployTarget, setDeployTarget] = useState("");
  const [activeModal, setActiveModal] = useState(null);
  const [subscribeStatus, setSubscribeStatus] = useState(false);

  // 1. Multi-language Support
  const [lang, setLang] = useState('en');
  const TRANSLATIONS = {
    en: { hero: "Build Your Dream Website with AI", sub: "Transform your ideas into a fully functional, stunning website in seconds." },
    hi: { hero: "AI ke sath apni Website banayein", sub: "Apne ideas ko ek shandaar website me badlein bus kuch seconds me." },
    es: { hero: "Crea tu sitio web ideal con IA", sub: "Transforma tus ideas en un sitio web impresionante en segundos." }
  };

  // 2. Voice Input
  const [isListening, setIsListening] = useState(false);
  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Voice input is not supported in this browser.");
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'hi' ? 'hi-IN' : (lang === 'es' ? 'es-ES' : 'en-US');
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (e) => setPromptText(prev => (prev + " " + e.results[0][0].transcript).trim());
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.start();
  };

  // 3. Auto Save & Version History
  const [history, setHistory] = useState([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState("Saved");

  useEffect(() => {
    if (promptText) {
      setSaveStatus("Saving...");
      const timer = setTimeout(() => {
        setHistory(prev => prev[prev.length - 1] === promptText ? prev : [...prev, promptText].slice(-10));
        setSaveStatus("Saved to Cloud");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [promptText]);

  // 4. AI Image Gen State
  const [isImgGenOpen, setIsImgGenOpen] = useState(false);
  const [imgGenLoading, setImgGenLoading] = useState(false);
  const [genImage, setGenImage] = useState(null);
  const handleGenerateImage = () => {
    setImgGenLoading(true); setGenImage(null);
    setTimeout(() => { setImgGenLoading(false); setGenImage("https://picsum.photos/400/300?random=" + Math.random()); }, 2500);
  };

  // 5. Live Analytics
  const [activeUsers, setActiveUsers] = useState(124);
  useEffect(() => {
    const interval = setInterval(() => setActiveUsers(prev => prev + Math.floor(Math.random() * 5) - 2), 3000);
    return () => clearInterval(interval);
  }, []);

  // 6. Pricing & FAQ States
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'yearly'
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribeStatus(true);
    setTimeout(() => setSubscribeStatus(false), 3500);
  };

  // Update data-theme on document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleTemplateClick = (templateName) => {
    navigate('/builder', { state: { prompt: `I want a modern and professional ${templateName} website layout with responsive design.` } });
  };

  const handleDeploy = () => {
    setDeployStatus('Deploying to Vercel...');
    setTimeout(() => {
      setDeployStatus('Building assets...');
      setTimeout(() => {
        setDeployStatus('Live: https://ai-website.vercel.app');
        setTimeout(() => setDeployStatus(null), 3000);
      }, 2000);
    }, 2000);
  };

  const handleExportDummy = () => {
    const element = document.createElement("a");
    const file = new Blob(["// Auto-generated React App\nimport React from 'react';\n\nexport default function App() {\n  return <h1>My AI Website</h1>;\n}"], {type: 'text/javascript'});
    element.href = URL.createObjectURL(file);
    element.download = "Website_Code.jsx";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }; 

  const handleDeployClick = (target) => {
    if (target === 'Download ZIP') {
      handleExportDummy();
      return;
    }
    setDeployTarget(target);
    setDeployStatus('loading');
    setTimeout(() => {
      setDeployStatus('success');
      setTimeout(() => setDeployStatus(null), 3000);
    }, 2000);
  }; 

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    // Add user message
    const newMessages = [...chatMessages, { sender: 'user', text: chatInput }];
    setChatMessages(newMessages);
    setChatInput('');
    
    // Simulate AI reply
    setTimeout(() => {
      setChatMessages([...newMessages, { 
        sender: 'ai', 
        text: 'That sounds like a great idea! You can type this into the main prompt box on the homepage to start building your website immediately.' 
      }]);
    }, 1500);
  };

  const CATEGORIES = [
    { name: "Portfolio", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80", prompt: "I want a modern and creative personal portfolio website to showcase my projects and skills." },
    { name: "Restaurant", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80", prompt: "I want an elegant restaurant website with an online menu, table booking system, and location details." },
    { name: "Gym", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80", prompt: "I want a high-energy gym website featuring class schedules, membership plans, and trainer profiles." },
    { name: "Hospital", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=400&q=80", prompt: "I want a professional hospital website with doctor directories, appointment scheduling, and patient resources." },
    { name: "Ecommerce", image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=400&q=80", prompt: "I want a clean ecommerce store to sell products online with a shopping cart and secure checkout." },
    { name: "School", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=400&q=80", prompt: "I want an educational school website showing admissions info, faculty details, and a student portal." },
    { name: "Travel", image: "https://picsum.photos/id/1036/400/300", prompt: "I want a visually stunning travel agency website displaying tour packages, destinations, and booking options." },
    { name: "Hotel", image: "https://picsum.photos/id/1040/400/300", prompt: "I want a luxury hotel website with room galleries, availability checker, and direct booking." },
    { name: "Agency", image: "https://picsum.photos/id/119/400/300", prompt: "I want a corporate digital agency website highlighting our services, case studies, and client testimonials." },
    { name: "Real Estate", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80", prompt: "I want a real estate website for property listings with advanced search, image galleries, and agent contacts." }
  ];

  const handleCategoryClick = (cat) => {
    navigate('/builder', { state: { prompt: cat.prompt, category: cat.name } });
  };

  // Pre-calculate particles
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const generatedParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5
    }));
    setParticles(generatedParticles);
  }, []);

  // AI Typing Animation Logic
  useEffect(() => {
    let stepIndex = 0;
    const interval = setInterval(() => {
      setVisibleSteps(prev => {
        if (stepIndex >= AI_STEPS.length) {
          stepIndex = 0;
          return []; // Reset animation
        }
        const nextStep = AI_STEPS[stepIndex];
        stepIndex++;
        return [...prev, nextStep];
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const renderModal = () => {
    if (!activeModal) return null;
    return (
      <div className="modal-overlay" onClick={() => setActiveModal(null)} style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div className="modal-content glass-card" onClick={e => e.stopPropagation()} style={{padding: '30px', maxWidth: '500px', width: '90%', textAlign: 'center', position: 'relative'}}>
          <button onClick={() => setActiveModal(null)} style={{position: 'absolute', top: '10px', right: '15px', background: 'transparent', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer'}}>✖</button>
          
          {activeModal === 'describe' && (
            <>
              <h2>📝 Describe Your Idea</h2>
              <p style={{color: 'var(--text-secondary)', marginBottom: '20px'}}>Tell AI what you want to build.</p>
              <textarea 
                placeholder="e.g. A modern real estate website..." 
                style={{width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid var(--glass-border)', minHeight: '100px'}}
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
              ></textarea>
              <button 
                style={{marginTop: '15px', padding: '10px 20px', background: 'var(--accent-primary)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'}} 
                onClick={() => { 
                  setActiveModal(null); 
                  if(promptText.trim()) {
                    navigate('/builder', { state: { prompt: promptText } });
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' }); 
                    setTimeout(() => document.getElementById('main-prompt-textarea')?.focus(), 500);
                  }
                }}
              >
                Apply Idea
              </button>
            </>
          )}

          {activeModal === 'generate' && (
            <>
              <h2>⚙️ AI Generating Code</h2>
              <p style={{color: 'var(--text-secondary)', marginBottom: '20px'}}>AI is writing the React components...</p>
              <div style={{background: '#1e1e1e', padding: '15px', borderRadius: '8px', textAlign: 'left', fontFamily: 'monospace', color: '#4ade80', fontSize: '14px', height: '150px', overflow: 'hidden'}}>
                {`import React from 'react';\n\nexport default function App() {\n  return (\n    <div className="app">\n      <Header />\n      <HeroSection />\n      <Footer />\n    </div>\n  );\n}`}
              </div>
              <button style={{marginTop: '15px', padding: '10px 20px', background: 'var(--accent-primary)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'}} onClick={() => { setActiveModal(null); navigate('/builder', { state: { prompt: promptText } }); }}>View Result</button>
            </>
          )}

          {activeModal === 'customize' && (
            <>
              <h2>💻 Customize Visually</h2>
              <p style={{color: 'var(--text-secondary)', marginBottom: '20px'}}>Tweak colors, layout, and text with ease.</p>
              <div style={{display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px'}}>
                <div style={{width: '40px', height: '40px', background: '#3b82f6', borderRadius: '50%'}}></div>
                <div style={{width: '40px', height: '40px', background: '#10b981', borderRadius: '50%'}}></div>
                <div style={{width: '40px', height: '40px', background: '#f43f5e', borderRadius: '50%'}}></div>
              </div>
              <button style={{padding: '10px 20px', background: 'var(--accent-primary)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'}} onClick={() => { setActiveModal(null); navigate('/builder', { state: { prompt: promptText } }); }}>Open Visual Editor</button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="home-wrapper" onMouseMove={handleMouseMove}>
      {renderModal()}
      
      {/* Top Navbar */}
      <nav className="main-navbar glass-card">
        <div className="navbar-logo" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
          <div style={{width: '40px', height: '40px', background: 'var(--accent-primary)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 'bold', fontSize: '14px', border: '2px solid white', boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'}}>
            CSIT
          </div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <span style={{fontSize: '18px', fontWeight: 'bold', lineHeight: '1'}}>CSIT</span>
            <span style={{fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '1px'}}>POLYTECHNIC</span>
          </div>
        </div>
        
        <div className="navbar-center" style={{display: 'flex', gap: '15px', alignItems: 'center', fontSize: '14px', color: 'var(--text-secondary)'}}>
          <span className="auto-save">☁️ {saveStatus}</span>
          <button className="history-btn" onClick={() => setIsHistoryOpen(true)} style={{background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'white', padding: '5px 10px', borderRadius: '8px', cursor: 'pointer'}}>🕒 History</button>
        </div>

        <div className="theme-toggle-group">
          <select value={lang} onChange={(e) => setLang(e.target.value)} style={{background: 'var(--glass-bg)', color: 'var(--text-primary)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '5px'}}>
            <option value="en">🇬🇧 EN</option>
            <option value="hi">🇮🇳 HI</option>
            <option value="es">🇪🇸 ES</option>
          </select>
          <button className={`theme-btn ${theme === 'dark' ? 'active' : ''}`} onClick={() => setTheme('dark')} title="Dark Mode">🌙</button>
          <button className={`theme-btn ${theme === 'light' ? 'active' : ''}`} onClick={() => setTheme('light')} title="Light Mode">☀️</button>
          <button className={`theme-btn ${theme === 'green' ? 'active' : ''}`} onClick={() => setTheme('green')} title="Green Theme">🟢</button>
          <button className={`theme-btn ${theme === 'red' ? 'active' : ''}`} onClick={() => setTheme('red')} title="Red Theme">🔴</button>
          <button className={`theme-btn ${theme === 'blue' ? 'active' : ''}`} onClick={() => setTheme('blue')} title="Blue Theme">🔵</button>
        </div>
      </nav>

      {/* Mouse Follow Glow */}
      <div 
        className="mouse-glow"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`
        }}
      ></div>

      {/* Grid Background */}
      <div className="animated-grid"></div>

      {/* Aurora Gradients */}
      <div className="aurora-bg">
        <div className="aurora-blob aurora-1"></div>
        <div className="aurora-blob aurora-2"></div>
        <div className="aurora-blob aurora-3"></div>
      </div>

      {/* Floating Particles with Mouse Parallax */}
      <div className="particles-container">
        {particles.map(p => {
          // Parallax calculation
          const moveX = (mousePosition.x - window.innerWidth / 2) * (p.size * 0.005);
          const moveY = (mousePosition.y - window.innerHeight / 2) * (p.size * 0.005);
          
          return (
            <div 
              key={p.id} 
              className="particle"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                left: `${p.left}%`,
                top: `${p.top}%`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                transform: `translate(${moveX}px, ${moveY}px)`
              }}
            ></div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="home-content">
        <div className="hero-section">
          
          {/* Left Column: Text & Prompt */}
          <div className="hero-left">
            <div className="badge-new">
              <span className="sparkle">✨</span> Introducing AI Website Builder 2.0
              <span style={{marginLeft: '15px', paddingLeft: '15px', borderLeft: '1px solid var(--glass-border)', color: '#10b981', display: 'flex', alignItems: 'center', gap: '5px'}}>
                <span style={{width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', animation: 'pulse 2s infinite'}}></span> {activeUsers} Active Users
              </span>
            </div>
            <h1 className="hero-title">
              <span className="text-gradient">{TRANSLATIONS[lang].hero.split('AI')[0]}</span> 
              {TRANSLATIONS[lang].hero.includes('AI') ? 'AI' : ''}
              <span className="text-gradient">{TRANSLATIONS[lang].hero.split('AI')[1] || ''}</span>
            </h1>
            <p className="hero-subtitle">
              {TRANSLATIONS[lang].sub}
            </p>

            {/* AI Prompt Box */}
            <div className="hero-prompt-container glass-card" style={{position: 'relative'}}>
              <div className="prompt-header">
                <span className="sparkle">✨</span> 
                <span>Describe your website...</span>
              </div>
              <div className="prompt-input-wrapper">
                <textarea 
                  id="main-prompt-textarea"
                  className="prompt-textarea"
                  placeholder={lang === 'hi' ? "Apni website ka idea likhein..." : (lang === 'es' ? "Describe tu sitio web..." : 'Example:\n"I want a modern restaurant website with online booking."')}
                  rows="3"
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                ></textarea>
              </div>
              <div className="prompt-footer" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px'}}>
                <div style={{display: 'flex', gap: '10px'}}>
                  <button 
                    className="voice-btn" 
                    onClick={startVoiceInput} 
                    title="Voice Type"
                    style={{background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'white', padding: '8px', borderRadius: '50%', cursor: 'pointer', animation: isListening ? 'pulse 1s infinite' : 'none', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                  >
                    {isListening ? '🔴' : '🎙️'}
                  </button>
                  <button 
                    className="image-gen-btn" 
                    onClick={() => setIsImgGenOpen(true)}
                    style={{background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)', padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', fontWeight: '500'}}
                  >
                    🖼️ AI Image
                  </button>
                </div>
                
                <Link to="/builder" state={{ prompt: promptText }} className="btn-generate">
                  Generate Website <span className="arrow">→</span>
                </Link>
              </div>
            </div>
            
            {/* Lottie Animation placeholder on the side */}
            <div style={{position: 'absolute', right: '-150px', top: '20px', width: '150px', zIndex: -1}}>
              <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_q5pk6p1k.json" background="transparent" speed="1" loop autoplay></lottie-player>
            </div>
          </div>

          {/* Right Column: Live Preview Mockup */}
          <div className="hero-right">
            <div className="browser-mockup glass-card">
              <div className="browser-header">
                <div className="browser-dots">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                </div>
                <div className="browser-url">
                  {(() => {
                    if (!promptText) return 'preview.ai-builder.com';
                    const text = promptText.toLowerCase().trim();
                    const domainMatch = text.match(/([a-z0-9\-]+\.(com|in|co\.in|org|net|io))/);
                    if (domainMatch) return domainMatch[0];
                    const words = text.split(' ');
                    if (words.length <= 3 && !text.includes('clone') && !text.includes('want') && !text.includes('build')) {
                      return `www.${words.join('')}.com`;
                    }
                    return 'preview.ai-builder.com';
                  })()}
                </div>
              </div>
              <div className="browser-content" style={{padding: 0, overflow: 'hidden'}}>
                {(() => {
                  let iframeUrl = null;
                  if (promptText) {
                    const text = promptText.toLowerCase().trim();
                    const domainMatch = text.match(/([a-z0-9\-]+\.(com|in|co\.in|org|net|io))/);
                    if (domainMatch) {
                      iframeUrl = `https://${domainMatch[0]}`;
                    } else {
                      const words = text.split(' ');
                      if (words.length <= 3 && !text.includes('clone') && !text.includes('want') && !text.includes('build')) {
                        iframeUrl = `https://www.${words.join('')}.com`;
                      }
                    }
                  }
                  
                  if (iframeUrl) {
                    return (
                      <iframe 
                        src={iframeUrl} 
                        style={{width: '100%', height: '100%', border: 'none', background: 'white'}}
                        title="Live Preview"
                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                      />
                    );
                  }
                  
                  return (
                    <div className="mock-website" style={{padding: '20px', height: '100%'}}>
                      <div className="mock-nav">
                        <div className="mock-logo"></div>
                        <div className="mock-links">
                          <span></span><span></span><span></span>
                        </div>
                      </div>
                      <div className="mock-hero">
                        <div className="mock-line mock-title"></div>
                        <div className="mock-line mock-subtitle"></div>
                        <div className="mock-button"></div>
                      </div>
                      <div className="mock-features">
                        <div className="mock-card"></div>
                        <div className="mock-card"></div>
                        <div className="mock-card"></div>
                      </div>
                    </div>
                  );
                })()}
                
                {/* AI Generating Overlay */}
                <div className="generating-overlay">
                  <div className="scanner-line"></div>
                  <div className="ai-steps-container">
                    {visibleSteps.map((step, index) => (
                      <div 
                        key={index} 
                        className={`ai-step ${step.includes('✔') ? 'step-success' : 'step-loading'}`}
                      >
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        
        {/* Trusted Companies Section */}
        <div className="trusted-section">
          <p className="trusted-title">TRUSTED BY INNOVATIVE TEAMS AT</p>
          <div className="trusted-logos">
            <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="trusted-logo">Google</a>
            <a href="https://microsoft.com" target="_blank" rel="noopener noreferrer" className="trusted-logo">Microsoft</a>
            <a href="https://aws.amazon.com" target="_blank" rel="noopener noreferrer" className="trusted-logo">Amazon</a>
            <a href="https://netflix.com" target="_blank" rel="noopener noreferrer" className="trusted-logo">Netflix</a>
            <a href="https://adobe.com" target="_blank" rel="noopener noreferrer" className="trusted-logo">Adobe</a>
          </div>
        </div>

        {/* Categories Section */}
        <div className="categories-section">
          <h2 className="section-title">Popular Categories</h2>
          <p className="section-subtitle">Click a category to auto-fill the AI prompt</p>
          
          <div className="categories-grid">
            {CATEGORIES.map((cat, idx) => (
              <div 
                key={idx} 
                className="category-card glass-card"
                onClick={() => handleCategoryClick(cat)}
              >
                <div className="category-icon" style={{width: '100%', height: '120px', marginBottom: '10px', borderRadius: '8px', overflow: 'hidden'}}>
                  <img src={cat.image} alt={cat.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                </div>
                <span className="category-name">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Website Generation Steps */}
        <div className="how-it-works-section">
          <h2 className="section-title">Website Generation Steps</h2>
          <p className="section-subtitle">From idea to a live website in 5 simple steps</p>
          
          <div className="steps-container">
            <div className="step-card glass-card" onClick={() => setActiveModal('describe')} style={{cursor: 'pointer'}}>
              <div className="step-icon">📝</div>
              <h3>1. Describe</h3>
              <p>Type your idea</p>
            </div>
            <div className="step-arrow">➔</div>
            
            <div className="step-card glass-card" onClick={() => setActiveModal('generate')} style={{cursor: 'pointer'}}>
              <div className="step-icon">⚙️</div>
              <h3>2. AI Generate</h3>
              <p>AI writes the code</p>
            </div>
            <div className="step-arrow">➔</div>
            
            <div className="step-card glass-card" onClick={() => setActiveModal('customize')} style={{cursor: 'pointer'}}>
              <div className="step-icon">💻</div>
              <h3>3. Customize</h3>
              <p>Tweak visually</p>
            </div>
            <div className="step-arrow">➔</div>
            
            <div className="step-card glass-card" onClick={handleExportDummy} style={{cursor: 'pointer'}}>
              <div className="step-icon">📦</div>
              <h3>4. Export</h3>
              <p>Download React code</p>
            </div>
            <div className="step-arrow">➔</div>
            
            <div className="step-card glass-card" onClick={handleDeploy} style={{cursor: 'pointer'}}>
              <div className="step-icon">🚀</div>
              <h3>5. Deploy</h3>
              <p>Go live instantly</p>
            </div>
          </div>
        </div>

        {/* Featured Products / Templates Section */}
        <div className="products-section">
          <div className="badge-new" style={{ margin: "0 auto 20px" }}>
            <span className="sparkle">✨</span> Showcase
          </div>
          <h2 className="section-title">Featured AI Products</h2>
          <p className="section-subtitle">Check out what our AI can build for you</p>
          
          <div className="products-grid">
            <div className="product-card glass-card" style={{cursor: 'pointer'}} onClick={() => handleCategoryClick({ name: 'Dashboard', prompt: 'I want a clean SaaS analytics dashboard web app with dark mode.' })}>
              <div className="product-image" style={{ width: '100%', height: '200px', overflow: 'hidden', borderRadius: '12px 12px 0 0' }}>
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80" alt="SaaS Dashboard" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="product-info">
                <h3>SaaS Dashboard</h3>
                <p>Clean analytics dashboard with dark mode</p>
                <div className="product-tags">
                  <span onClick={(e) => { e.stopPropagation(); handleCategoryClick({ name: 'Web App', prompt: 'I want a fully functional web application with a dashboard and user authentication.' }); }} style={{cursor: 'pointer'}}>Web App</span>
                  <span onClick={(e) => { e.stopPropagation(); handleCategoryClick({ name: 'React', prompt: 'I want a pure React single page application with modern reusable components.' }); }} style={{cursor: 'pointer'}}>React</span>
                </div>
              </div>
            </div>
            <div className="product-card glass-card" style={{cursor: 'pointer'}} onClick={() => handleCategoryClick({ name: 'Portfolio', prompt: 'I want a modern creative portfolio for designers and developers.' })}>
              <div className="product-image" style={{ width: '100%', height: '200px', overflow: 'hidden', borderRadius: '12px 12px 0 0' }}>
                <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80" alt="Creative Portfolio" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="product-info">
                <h3>Creative Portfolio</h3>
                <p>Modern portfolio for designers and developers</p>
                <div className="product-tags">
                  <span onClick={(e) => { e.stopPropagation(); handleCategoryClick({ name: 'Portfolio', prompt: 'I want a modern personal portfolio to showcase my projects and skills.' }); }} style={{cursor: 'pointer'}}>Portfolio</span>
                  <span onClick={(e) => { e.stopPropagation(); handleCategoryClick({ name: 'Animation', prompt: 'I want a highly animated website with scroll effects and smooth transitions.' }); }} style={{cursor: 'pointer'}}>Animation</span>
                </div>
              </div>
            </div>
            <div className="product-card glass-card" style={{cursor: 'pointer'}} onClick={() => handleCategoryClick({ name: 'Ecommerce', prompt: 'I want a high-converting ecommerce store layout with cart functionality.' })}>
              <div className="product-image" style={{ width: '100%', height: '200px', overflow: 'hidden', borderRadius: '12px 12px 0 0' }}>
                <img src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=600&q=80" alt="E-commerce Store" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="product-info">
                <h3>E-commerce Store</h3>
                <p>High-converting store layout with cart functionality</p>
                <div className="product-tags">
                  <span onClick={(e) => { e.stopPropagation(); handleCategoryClick({ name: 'Store', prompt: 'I want a retail online store website with product pages and checkout.' }); }} style={{cursor: 'pointer'}}>Store</span>
                  <span onClick={(e) => { e.stopPropagation(); handleCategoryClick({ name: 'Shopping', prompt: 'I want an interactive shopping cart application with payment integration.' }); }} style={{cursor: 'pointer'}}>Shopping</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Templates Carousel Section */}
        <div className="carousel-section">
          <h2 className="section-title">Explore AI Templates</h2>
          <p className="section-subtitle">Stunning designs for every industry, auto-generated in seconds.</p>
          
          <div className="carousel-container">
            <div className="carousel-track">
              <div className="carousel-card" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }} onClick={() => handleTemplateClick('SaaS')}><div className="carousel-label">SaaS</div></div>
              <div className="carousel-card" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=400&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }} onClick={() => handleTemplateClick('Ecommerce')}><div className="carousel-label">Ecommerce</div></div>
              <div className="carousel-card" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }} onClick={() => handleTemplateClick('Portfolio')}><div className="carousel-label">Portfolio</div></div>
              <div className="carousel-card" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }} onClick={() => handleTemplateClick('Agency')}><div className="carousel-label">Agency</div></div>
              <div className="carousel-card" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }} onClick={() => handleTemplateClick('Restaurant')}><div className="carousel-label">Restaurant</div></div>
              <div className="carousel-card" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=400&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }} onClick={() => handleTemplateClick('Hospital')}><div className="carousel-label">Hospital</div></div>
              
              {/* Duplicated for infinite scroll */}
              <div className="carousel-card" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }} onClick={() => handleTemplateClick('SaaS')}><div className="carousel-label">SaaS</div></div>
              <div className="carousel-card" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=400&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }} onClick={() => handleTemplateClick('Ecommerce')}><div className="carousel-label">Ecommerce</div></div>
              <div className="carousel-card" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }} onClick={() => handleTemplateClick('Portfolio')}><div className="carousel-label">Portfolio</div></div>
              <div className="carousel-card" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }} onClick={() => handleTemplateClick('Agency')}><div className="carousel-label">Agency</div></div>
              <div className="carousel-card" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }} onClick={() => handleTemplateClick('Restaurant')}><div className="carousel-label">Restaurant</div></div>
              <div className="carousel-card" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=400&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }} onClick={() => handleTemplateClick('Hospital')}><div className="carousel-label">Hospital</div></div>
            </div>
          </div>
        </div>

        {/* Deployment Section */}
        <div className="deployment-section">
          <h2 className="section-title">One-Click Deployment</h2>
          <p className="section-subtitle">Take your generated code live instantly or download it</p>
          
          <div className="deploy-grid">
            <div className="deploy-card glass-card" onClick={() => handleDeployClick('Vercel')}>
              <div className="deploy-icon">▲</div>
              <h3>Vercel</h3>
              <p>Deploy to Vercel network</p>
            </div>
            <div className="deploy-card glass-card" onClick={() => handleDeployClick('Netlify')}>
              <div className="deploy-icon">⬡</div>
              <h3>Netlify</h3>
              <p>Fast global CDN hosting</p>
            </div>
            <div className="deploy-card glass-card" onClick={() => handleDeployClick('GitHub')}>
              <div className="deploy-icon">🐙</div>
              <h3>GitHub</h3>
              <p>Push to repository</p>
            </div>
            <div className="deploy-card glass-card" onClick={() => handleDeployClick('Download ZIP')}>
              <div className="deploy-icon">⬇️</div>
              <h3>Download ZIP</h3>
              <p>Export React source code</p>
            </div>
          </div>
        </div>

        <div className="features-section">
          <div className="feature-card glass-card" style={{cursor: 'pointer'}} onClick={() => { setActiveModal('step2'); setVisibleSteps([]); }}>
            <div className="feature-icon">✨</div>
            <h3>AI Generation</h3>
            <p>Instantly generate layouts, copy, and images from a single prompt.</p>
          </div>
          <div className="feature-card glass-card" style={{cursor: 'pointer'}} onClick={() => navigate('/builder', { state: { prompt: "I want to manually design my website using a drag and drop editor." } })}>
            <div className="feature-icon">🖱️</div>
            <h3>Drag & Drop</h3>
            <p>Easily customize every element with our intuitive visual editor.</p>
          </div>
          <div className="feature-card glass-card" style={{cursor: 'pointer'}} onClick={handleExportDummy}>
            <div className="feature-icon">🚀</div>
            <h3>1-Click Export</h3>
            <p>Export your code to React or HTML, or deploy directly to the web.</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <div className="stat-card">
            <h2 className="stat-number text-gradient">150K+</h2>
            <p className="stat-label">Websites Generated</p>
          </div>
          <div className="stat-card">
            <h2 className="stat-number text-gradient">98%</h2>
            <p className="stat-label">Customer Satisfaction</p>
          </div>
          <div className="stat-card">
            <h2 className="stat-number text-gradient">2M+</h2>
            <p className="stat-label">AI Prompts</p>
          </div>
          <div className="stat-card">
            <h2 className="stat-number text-gradient">45+</h2>
            <p className="stat-label">Templates</p>
          </div>
        </div>

        {/* 1. Testimonials Section */}
        <div className="testimonials-section" style={{marginTop: '100px', width: '100%', textAlign: 'center'}}>
          <h2 className="section-title">Wall of Love</h2>
          <p className="section-subtitle">What creators are saying about AI Builder</p>
          <div className="deploy-grid" style={{marginTop: '40px'}}>
            <div className="glass-card" style={{padding: '30px', textAlign: 'left', borderRadius: '20px', transition: 'all 0.3s ease', cursor: 'pointer'}}>
              <div style={{color: '#fbbf24', fontSize: '20px', marginBottom: '15px'}}>★★★★★</div>
              <p style={{fontSize: '15px', lineHeight: '1.6', marginBottom: '20px', color: 'var(--text-primary)'}}>"This tool is basically magic. I built a landing page for my startup in literally 2 minutes without writing a single line of code."</p>
              <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                <div style={{width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)'}}></div>
                <div>
                  <h4 style={{margin: 0, fontSize: '14px', color: 'var(--text-primary)'}}>Sarah Jenks</h4>
                  <p style={{margin: 0, fontSize: '12px', color: 'var(--text-secondary)'}}>Founder, TechFlow</p>
                </div>
              </div>
            </div>
            <div className="glass-card" style={{padding: '30px', textAlign: 'left', borderRadius: '20px', transition: 'all 0.3s ease', cursor: 'pointer'}}>
              <div style={{color: '#fbbf24', fontSize: '20px', marginBottom: '15px'}}>★★★★★</div>
              <p style={{fontSize: '15px', lineHeight: '1.6', marginBottom: '20px', color: 'var(--text-primary)'}}>"I was skeptical at first, but the quality of the React code it exports is production-ready. Saves me 20 hours a week."</p>
              <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                <div style={{width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(45deg, #10b981, #3b82f6)'}}></div>
                <div>
                  <h4 style={{margin: 0, fontSize: '14px', color: 'var(--text-primary)'}}>David Chen</h4>
                  <p style={{margin: 0, fontSize: '12px', color: 'var(--text-secondary)'}}>Senior Developer</p>
                </div>
              </div>
            </div>
            <div className="glass-card" style={{padding: '30px', textAlign: 'left', borderRadius: '20px', transition: 'all 0.3s ease', cursor: 'pointer'}}>
              <div style={{color: '#fbbf24', fontSize: '20px', marginBottom: '15px'}}>★★★★★</div>
              <p style={{fontSize: '15px', lineHeight: '1.6', marginBottom: '20px', color: 'var(--text-primary)'}}>"The AI templates are gorgeous. It feels like having a senior designer and developer sitting right next to you."</p>
              <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                <div style={{width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(45deg, #f43f5e, #8b5cf6)'}}></div>
                <div>
                  <h4 style={{margin: 0, fontSize: '14px', color: 'var(--text-primary)'}}>Maria Garcia</h4>
                  <p style={{margin: 0, fontSize: '12px', color: 'var(--text-secondary)'}}>UI/UX Designer</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Pricing Section */}
        <div className="pricing-section" style={{marginTop: '100px', width: '100%', textAlign: 'center'}}>
          <h2 className="section-title">Simple Pricing</h2>
          <p className="section-subtitle">Choose the perfect plan for your needs</p>
          
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', margin: '30px 0'}}>
            <span style={{color: billingCycle === 'monthly' ? 'var(--text-primary)' : 'var(--text-secondary)'}}>Monthly</span>
            <div 
              style={{width: '60px', height: '32px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '20px', position: 'relative', cursor: 'pointer'}}
              onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
            >
              <div style={{width: '24px', height: '24px', background: 'var(--accent-primary)', borderRadius: '50%', position: 'absolute', top: '3px', left: billingCycle === 'monthly' ? '4px' : '30px', transition: 'all 0.3s ease'}}></div>
            </div>
            <span style={{color: billingCycle === 'yearly' ? 'var(--text-primary)' : 'var(--text-secondary)'}}>Yearly <span style={{color: '#10b981', fontSize: '12px'}}>Save 20%</span></span>
          </div>

          <div className="deploy-grid">
            <div className="glass-card" style={{padding: '40px 30px', textAlign: 'left', borderRadius: '20px'}}>
              <h3>Starter</h3>
              <div style={{fontSize: '40px', fontWeight: 'bold', margin: '15px 0'}}>${billingCycle === 'monthly' ? '0' : '0'} <span style={{fontSize: '16px', color: 'var(--text-secondary)', fontWeight: 'normal'}}>/mo</span></div>
              <p style={{color: 'var(--text-secondary)', marginBottom: '20px'}}>Perfect for testing ideas</p>
              <button style={{width: '100%', padding: '12px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', borderRadius: '8px', cursor: 'pointer', marginBottom: '30px'}}>Get Started</button>
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: 'var(--text-secondary)'}}>
                <span>✅ 3 AI Generations/mo</span>
                <span>✅ Basic Templates</span>
                <span>✅ Community Support</span>
              </div>
            </div>
            <div className="glass-card" style={{padding: '40px 30px', textAlign: 'left', borderRadius: '20px', border: '1px solid var(--accent-primary)', position: 'relative', transform: 'scale(1.05)'}}>
              <div style={{position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: 'var(--accent-primary)', color: 'white', padding: '5px 15px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold'}}>MOST POPULAR</div>
              <h3>Pro</h3>
              <div style={{fontSize: '40px', fontWeight: 'bold', margin: '15px 0'}}>${billingCycle === 'monthly' ? '29' : '24'} <span style={{fontSize: '16px', color: 'var(--text-secondary)', fontWeight: 'normal'}}>/mo</span></div>
              <p style={{color: 'var(--text-secondary)', marginBottom: '20px'}}>For professional creators</p>
              <button style={{width: '100%', padding: '12px', background: 'linear-gradient(90deg, var(--gradient-start), var(--gradient-end))', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer', marginBottom: '30px'}}>Upgrade to Pro</button>
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: 'var(--text-primary)'}}>
                <span>✅ Unlimited Generations</span>
                <span>✅ Premium Templates</span>
                <span>✅ Code Export (React/Vue)</span>
                <span>✅ Priority Support</span>
              </div>
            </div>
            <div className="glass-card" style={{padding: '40px 30px', textAlign: 'left', borderRadius: '20px'}}>
              <h3>Enterprise</h3>
              <div style={{fontSize: '40px', fontWeight: 'bold', margin: '15px 0'}}>${billingCycle === 'monthly' ? '99' : '79'} <span style={{fontSize: '16px', color: 'var(--text-secondary)', fontWeight: 'normal'}}>/mo</span></div>
              <p style={{color: 'var(--text-secondary)', marginBottom: '20px'}}>For teams and agencies</p>
              <button style={{width: '100%', padding: '12px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', borderRadius: '8px', cursor: 'pointer', marginBottom: '30px'}}>Contact Sales</button>
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: 'var(--text-secondary)'}}>
                <span>✅ Custom Integrations</span>
                <span>✅ White-label Support</span>
                <span>✅ Dedicated Account Manager</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. FAQ Section */}
        <div className="faq-section" style={{marginTop: '100px', width: '100%', maxWidth: '800px', margin: '100px auto'}}>
          <h2 className="section-title" style={{textAlign: 'center'}}>Frequently Asked Questions</h2>
          <div style={{display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '40px'}}>
            {[
              { q: 'Can I export the code?', a: 'Yes! Pro and Enterprise users can export clean, production-ready React, Vue, or HTML/CSS code directly to a ZIP file or GitHub.' },
              { q: 'Do I need to know how to code?', a: 'Absolutely not. Our AI understands plain English descriptions. Just type what you want, and the AI builds it.' },
              { q: 'Are the websites responsive?', a: 'Yes, every website generated is 100% mobile responsive and optimized for all screen sizes by default.' },
              { q: 'Can I use my own domain name?', a: 'Yes, you can easily connect custom domains and host the site on our global CDN with one click.' }
            ].map((faq, i) => (
              <div key={i} className="glass-card" style={{padding: '20px', borderRadius: '12px', cursor: 'pointer'}} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold'}}>
                  {faq.q}
                  <span>{openFaq === i ? '−' : '+'}</span>
                </div>
                {openFaq === i && <div style={{marginTop: '15px', color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6'}}>{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* 4. Footer Section */}
        <footer style={{marginTop: '100px', width: '100%', padding: '60px 0 20px', borderTop: '1px solid var(--glass-border)'}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px'}}>
            <div>
              <div className="navbar-logo" style={{marginBottom: '20px'}}><span className="sparkle">✨</span> AI Builder</div>
              <p style={{color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6'}}>The fastest way to build beautiful websites. Powered by advanced artificial intelligence.</p>
            </div>
            <div>
              <h4 style={{marginBottom: '20px'}}>Product</h4>
              <div style={{display: 'flex', flexDirection: 'column', gap: '10px', color: 'var(--text-secondary)', fontSize: '14px'}}>
                <span style={{cursor: 'pointer'}}>Features</span>
                <span style={{cursor: 'pointer'}}>Templates</span>
                <span style={{cursor: 'pointer'}}>Pricing</span>
                <span style={{cursor: 'pointer'}}>Changelog</span>
              </div>
            </div>
            <div>
              <h4 style={{marginBottom: '20px'}}>Legal</h4>
              <div style={{display: 'flex', flexDirection: 'column', gap: '10px', color: 'var(--text-secondary)', fontSize: '14px'}}>
                <span style={{cursor: 'pointer'}}>Privacy Policy</span>
                <span style={{cursor: 'pointer'}}>Terms of Service</span>
                <span style={{cursor: 'pointer'}}>Cookie Policy</span>
              </div>
            </div>
            <div>
              <h4 style={{marginBottom: '20px'}}>Newsletter</h4>
              <p style={{color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '15px'}}>Get the latest updates and AI tips.</p>
              <form onSubmit={handleSubscribe} style={{display: 'flex', gap: '10px'}}>
                <input type="email" placeholder="Enter your email" required style={{flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'var(--text-primary)'}} />
                <button type="submit" style={{padding: '10px 15px', background: 'var(--accent-primary)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'}}>Subscribe</button>
              </form>
            </div>
          </div>
          <div style={{textAlign: 'center', color: 'var(--text-secondary)', fontSize: '14px', paddingTop: '20px', borderTop: '1px solid var(--glass-border)'}}>
            © 2026 AI Builder Inc. All rights reserved.
          </div>
        </footer>

        {/* Deployment Modal */}
        {deployStatus && (
          <div className="deploy-modal">
            <div className="deploy-modal-content glass-card">
              {deployStatus === 'loading' ? (
                <>
                  <div className="gen-spinner" style={{margin: '0 auto 20px'}}></div>
                  <h3>{deployTarget === 'Download ZIP' ? 'Zipping files...' : `Deploying to ${deployTarget}...`}</h3>
                  <p>Please wait while we process your request.</p>
                </>
              ) : (
                <>
                  <div className="deploy-success-icon">✅</div>
                  <h3>{deployTarget === 'Download ZIP' ? 'Download Complete!' : 'Successfully Deployed!'}</h3>
                  <p>{deployTarget === 'Download ZIP' ? 'Check your downloads folder.' : 'Your website is now live.'}</p>
                </>
              )}
            </div>
          </div>
        )}

        {/* Version History Modal */}
        {isHistoryOpen && (
          <div className="deploy-modal" onClick={() => setIsHistoryOpen(false)}>
            <div className="deploy-modal-content glass-card" onClick={e => e.stopPropagation()} style={{textAlign: 'left', width: '400px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
                <h3 style={{margin: 0}}>🕒 Version History</h3>
                <button onClick={() => setIsHistoryOpen(false)} style={{background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '20px'}}>×</button>
              </div>
              {history.length === 0 ? (
                <p style={{color: 'var(--text-secondary)'}}>No prompts saved yet. Auto-save is active.</p>
              ) : (
                <div style={{display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '300px', overflowY: 'auto'}}>
                  {history.map((h, i) => (
                    <div key={i} style={{background: 'var(--glass-bg)', padding: '10px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer'}} onClick={() => { setPromptText(h); setIsHistoryOpen(false); }}>
                      {h.substring(0, 50)}...
                    </div>
                  )).reverse()}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Subscribe Success Modal */}
        {subscribeStatus && (
          <div className="deploy-modal" onClick={() => setSubscribeStatus(false)}>
            <div className="deploy-modal-content glass-card" onClick={e => e.stopPropagation()} style={{textAlign: 'center', maxWidth: '400px'}}>
              <div className="deploy-success-icon" style={{fontSize: '48px', marginBottom: '10px'}}>🎉</div>
              <h3 style={{margin: '0 0 10px 0'}}>Subscribed Successfully!</h3>
              <p style={{color: 'var(--text-secondary)', margin: 0}}>Thank you! Check your email for the latest updates and AI features.</p>
            </div>
          </div>
        )}

        {/* AI Image Gen Modal */}
        {isImgGenOpen && (
          <div className="deploy-modal" onClick={() => setIsImgGenOpen(false)}>
            <div className="deploy-modal-content glass-card" onClick={e => e.stopPropagation()} style={{textAlign: 'center', width: '500px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
                <h3 style={{margin: 0}}>🖼️ AI Image Generator</h3>
                <button onClick={() => setIsImgGenOpen(false)} style={{background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '20px'}}>×</button>
              </div>
              
              <div style={{display: 'flex', gap: '10px', marginBottom: '20px'}}>
                <input type="text" placeholder="Describe an image..." style={{flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'var(--text-primary)'}} />
                <button onClick={handleGenerateImage} style={{padding: '10px 20px', background: 'var(--accent-primary)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'}}>Generate</button>
              </div>

              <div style={{width: '100%', height: '250px', background: 'var(--glass-bg)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative'}}>
                {imgGenLoading ? (
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'}}>
                    <div className="gen-spinner"></div>
                    <span style={{color: 'var(--text-secondary)', fontSize: '14px'}}>Generating Magic...</span>
                  </div>
                ) : genImage ? (
                  <img src={genImage} alt="Generated" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                ) : (
                  <span style={{color: 'var(--text-secondary)'}}>Image preview will appear here</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Floating AI Assistant */}
        <div className="floating-assistant">
          {isChatOpen ? (
            <div className="assistant-chat-popup glass-card">
              <div className="chat-header">
                🤖 AI Assistant
                <button className="close-chat" onClick={() => setIsChatOpen(false)}>×</button>
              </div>
              <div className="chat-body" style={{ maxHeight: '250px', overflowY: 'auto' }}>
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`chat-msg ${msg.sender === 'ai' ? 'ai-msg' : 'user-msg'}`} style={msg.sender === 'user' ? {background: 'var(--accent-primary)', color: '#fff', marginLeft: 'auto'} : {}}>
                    {msg.text}
                  </div>
                ))}
              </div>
              <form className="chat-input-area" onSubmit={handleSendMessage} style={{ display: 'flex' }}>
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  value={chatInput} 
                  onChange={(e) => setChatInput(e.target.value)}
                  style={{ flex: 1, padding: '10px', borderRadius: '20px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'var(--text-primary)' }}
                />
                <button type="submit" className="send-btn" style={{ background: 'var(--accent-primary)', color: 'white', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '10px', cursor: 'pointer' }}>➔</button>
              </form>
            </div>
          ) : (
            <div className="assistant-bubble">Need Help?</div>
          )}
          <button className="assistant-btn" onClick={() => setIsChatOpen(!isChatOpen)}>🤖</button>
        </div>

      </div>
    </div>
  );
}
