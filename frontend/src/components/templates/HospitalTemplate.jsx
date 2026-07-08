import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HospitalTemplate.css';

export default function HospitalTemplate({ templateState, renderEditable, chatMessages, setChatMessages }) {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('Home');
  const [bookForm, setBookForm] = useState({ name: '', phone: '', department: '' });
  const [isBooked, setIsBooked] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isContactSent, setIsContactSent] = useState(false);
  const [showJourney, setShowJourney] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isServiceRequested, setIsServiceRequested] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isConsultRequested, setIsConsultRequested] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isAmbulanceCalled, setIsAmbulanceCalled] = useState(false);
  
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [siteChatMessages, setSiteChatMessages] = useState([{ role: 'ai', text: 'Hi! I am CSIT Hospital AI. How can I help you with booking or health questions today?' }]);
  const [chatInput, setChatInput] = useState('');

  const deptData = {
    'Cardiology': { icon: '❤️', bg: '#fee2e2', color: '#ef4444', desc: 'Our Cardiology department offers advanced heart care, ECG, Echo, and 24/7 emergency cardiac treatments.' },
    'Neurology': { icon: '🧠', bg: '#f3e8ff', color: '#a855f7', desc: 'Expert neurologists providing comprehensive care for brain, spine, and nervous system disorders.' },
    'Orthopedics': { icon: '🦴', bg: '#f1f5f9', color: '#64748b', desc: 'State-of-the-art bone and joint treatment, including joint replacement and sports injury recovery.' },
    'Pediatrics': { icon: '👶', bg: '#ffedd5', color: '#f97316', desc: 'Dedicated child healthcare with gentle, compassionate pediatricians and a child-friendly environment.' },
    'Emergency': { icon: '🚑', bg: '#fef2f2', color: '#ef4444', desc: '24/7 Emergency trauma center with fully equipped life-support ambulances and rapid response teams.' },
    'Dental Care': { icon: '🦷', bg: '#ecfdf5', color: '#10b981', desc: 'Complete dental health solutions from routine checkups to advanced cosmetic dentistry.' }
  };

  const handleContactSubmit = () => {
    if (!contactForm.name || !contactForm.message) return;
    setIsContactSent(true);
    
    // Save to localStorage for Dashboard Inbox
    const savedMessages = JSON.parse(localStorage.getItem('siteMessages') || '[]');
    savedMessages.push({
      id: Date.now(),
      name: contactForm.name,
      email: contactForm.email || 'No email provided',
      message: contactForm.message,
      date: new Date().toLocaleDateString()
    });
    localStorage.setItem('siteMessages', JSON.stringify(savedMessages));

    setChatMessages([...chatMessages, { role: 'ai', text: '✅ Your message has been sent successfully and saved to your Dashboard Inbox!' }]);
    setContactForm({ name: '', email: '', message: '' });
    setTimeout(() => setIsContactSent(false), 3000);
  };

  const handleBook = async () => {
    if (!bookForm.name || !bookForm.phone) return;
    setIsBooked(true);
    
    try {
      const response = await fetch('http://localhost:8080/api/hospital/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookForm)
      });
      if (response.ok) {
        setChatMessages([...chatMessages, { role: 'ai', text: `Appointment booked for ${bookForm.name}! Your data has been securely saved in the hospital database.` }]);
      } else {
        setChatMessages([...chatMessages, { role: 'ai', text: `Failed to save your booking in the database. Please try again.` }]);
      }
    } catch (error) {
      console.error("Booking Error:", error);
      setChatMessages([...chatMessages, { role: 'ai', text: `Could not connect to the database. Please ensure the backend is running.` }]);
    }
    
    setBookForm({ name: '', phone: '', department: '' });
    setTimeout(() => setIsBooked(false), 3000);
  };

  const companyName = templateState?.companyName || "CS Ayurvedik Hospital";
  const companyLogo = templateState?.companyLogo || "CS";
  const companyTagline = templateState?.companyTagline || "Natural Healing & Wellness";
  const primaryAction = templateState?.primaryAction || "Book Appointment";
  const navLinks = templateState?.navLinks || ['Home', 'About Us', 'Services', 'Doctors', 'Departments', 'Pages', 'Contact'];

  const sidebar1 = templateState?.sidebar1 || { title: 'Chat AI', icon: '💬' };
  const sidebar2 = templateState?.sidebar2 || { title: 'Symptoms', icon: '📈' };
  const sidebar3 = templateState?.sidebar3 || { title: 'Find Doctor', icon: '👨‍⚕️' };
  const sidebar4 = templateState?.sidebar4 || { title: 'Health Tips', icon: '💡' };

  return (
    <div className="hospital-t-container">
      {/* Top Navigation */}
      <nav className="ht-nav t-glass">
        <div className="ht-logo">
          <div className="ht-logo-icon" style={{background: 'linear-gradient(135deg, #10b981, #059669)', fontSize: '18px', fontWeight: 'bold'}}>{companyLogo}</div>
          <div className="ht-logo-text">
            {companyName}
            <span>{companyTagline}</span>
          </div>
        </div>
        <div className="ht-links">
          {navLinks.map(link => (
            <span 
              key={link} 
              className={activeNav === link ? 'active' : ''}
              onClick={() => setActiveNav(link)}
            >
              {link}
            </span>
          ))}
        </div>
        <div className="ht-actions">
          <button style={{background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px'}}>🌓</button>
          <button className="btn-book" onClick={() => document.getElementById('booking-form').scrollIntoView({behavior: 'smooth'})}>{primaryAction}</button>
        </div>
      </nav>

      {/* Left Sidebar */}
      <div className="ht-sidebar t-glass">
        <div className="ht-side-item" onClick={() => setIsChatOpen(true)}>
          <div className="ht-side-icon" style={{color: '#3b82f6'}}>{sidebar1.icon}</div>
          {sidebar1.title}
        </div>
        <div className="ht-side-item" onClick={() => setSelectedFeature({ title: sidebar2.title, icon: sidebar2.icon, desc: `Analyzing data for ${sidebar2.title}. For accurate information and immediate assistance, please use our primary action button.` })}>
          <div className="ht-side-icon" style={{color: '#10b981'}}>{sidebar2.icon}</div>
          {sidebar2.title}
        </div>
        <div className="ht-side-item" onClick={() => setActiveNav(navLinks[3] || 'Services')}>
          <div className="ht-side-icon" style={{color: '#8b5cf6'}}>{sidebar3.icon}</div>
          {sidebar3.title}
        </div>
        <div className="ht-side-item" onClick={() => setSelectedFeature({ title: sidebar4.title, icon: sidebar4.icon, desc: `Here is a daily update for ${sidebar4.title}. Stay active and keep track of your goals!` })}>
          <div className="ht-side-icon" style={{color: '#f59e0b'}}>{sidebar4.icon}</div>
          {sidebar4.title}
        </div>
      </div>

      {/* Floating Emergency Button */}
      <div className="ht-sticky-emergency" onClick={() => setIsEmergencyOpen(true)}>
        🚑 Emergency
      </div>

      {/* Emergency Modal */}
      {isEmergencyOpen && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div className="t-glass" style={{padding: '40px', maxWidth: '400px', width: '90%', background: 'white', borderRadius: '20px', textAlign: 'center'}}>
            <h2 style={{color: '#ef4444'}}>🚨 Emergency Protocol</h2>
            <p>Do you need an ambulance immediately?</p>
            <div style={{display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px'}}>
              <button className="btn-book" style={{background: '#ef4444'}} onClick={() => { setIsAmbulanceCalled(true); setTimeout(() => setIsEmergencyOpen(false), 2000); }}>{isAmbulanceCalled ? 'Ambulance Dispatched!' : 'Call Ambulance'}</button>
              <button className="btn-secondary" onClick={() => setIsEmergencyOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="ht-main">
        {activeNav === 'Home' && (
          <>
            {/* Hero Section */}
        <div className="ht-hero">
          <div className="ht-hero-left">
            <div className="ht-badge">✨ AI Powered Healthcare</div>
            {renderEditable('heroHeading', true)}
            {renderEditable('heroSub', false)}
            
            <div className="ht-hero-buttons">
              <button className="btn-book" onClick={() => document.getElementById('booking-form').scrollIntoView({behavior: 'smooth'})}>Book Appointment</button>
              <button className="btn-secondary">🎥 Virtual Consultation</button>
            </div>
          </div>

          <div className="ht-hero-center">
            <div className="ht-floating-emergency t-glass">
              <div className="em-icon">📞</div>
              <div className="em-text">
                <h4>24/7 Emergency</h4>
                <p>+91 1234 567 890</p>
                <small>Emergency Help</small>
              </div>
            </div>
            
            {/* The background image */}
            {renderEditable('heroImage', false, true)}
            
            {/* Right Overlay Booking Form */}
            <div id="booking-form" className="ht-booking-form t-glass">
              <h3>📅 Book Appointment</h3>
              
              <div className="ht-form-group">
                <label>Full Name</label>
                <input type="text" className="ht-input" placeholder="Enter your name" value={bookForm.name} onChange={e => setBookForm({...bookForm, name: e.target.value})} />
              </div>
              
              <div className="ht-form-group">
                <label>Phone Number</label>
                <div className="ht-phone-input">
                  <div className="country">🇮🇳 +91</div>
                  <input type="text" className="ht-input" placeholder="Enter your phone" value={bookForm.phone} onChange={e => setBookForm({...bookForm, phone: e.target.value})} />
                </div>
              </div>
              
              <div className="ht-form-group">
                <label>Select Department</label>
                <select className="ht-input" value={bookForm.department} onChange={e => setBookForm({...bookForm, department: e.target.value})}>
                  <option>Select department</option>
                  <option>Cardiology</option>
                  <option>Neurology</option>
                </select>
              </div>
              
              <button 
                className="btn-book" 
                style={{width: '100%', marginTop: '10px', background: isBooked ? '#10b981' : '', transition: 'background 0.3s'}} 
                onClick={handleBook}
              >
                {isBooked ? '✅ Booking Confirmed!' : 'Book Now'}
              </button>
              
              <div className="ht-form-footer">
                <div className="ht-avatars">
                  <img src="https://i.pravatar.cc/100?img=1" alt="user" />
                  <img src="https://i.pravatar.cc/100?img=2" alt="user" />
                  <img src="https://i.pravatar.cc/100?img=3" alt="user" />
                </div>
                <p>50K+ Patients Booked</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="ht-stats t-glass">
          <div className="ht-stat-item">
            <div className="ht-stat-icon" style={{background: '#eff6ff', color: '#3b82f6'}}>👨‍⚕️</div>
            <div className="ht-stat-text"><h4>120+</h4><p>Expert Doctors</p></div>
          </div>
          <div className="ht-stat-item">
            <div className="ht-stat-icon" style={{background: '#f0fdf4', color: '#10b981'}}>🏥</div>
            <div className="ht-stat-text"><h4>50+</h4><p>Departments</p></div>
          </div>
          <div className="ht-stat-item">
            <div className="ht-stat-icon" style={{background: '#fdf4ff', color: '#d946ef'}}>📞</div>
            <div className="ht-stat-text"><h4>25K+</h4><p>Happy Patients</p></div>
          </div>
          <div className="ht-stat-item">
            <div className="ht-stat-icon" style={{background: '#ecfdf5', color: '#059669'}}>💚</div>
            <div className="ht-stat-text"><h4>98%</h4><p>Success Rate</p></div>
          </div>
          <div className="ht-stat-item">
            <div className="ht-stat-icon" style={{background: '#fffbeb', color: '#d97706'}}>⭐</div>
            <div className="ht-stat-text"><h4>4.9</h4><p>Patient Rating</p></div>
          </div>
        </div>

        {/* Departments Grid */}
        <div className="ht-section-header">
          <div className="ht-section-label">⚙️ OUR DEPARTMENTS</div>
          <h2>Comprehensive Healthcare <span>Services</span></h2>
        </div>
        
        <div className="ht-departments-grid">
          {Object.entries(deptData).map(([name, data]) => (
            <div key={name} className="ht-dept-card t-glass" onClick={() => setSelectedDepartment({name, ...data})}>
              <div className="ht-dept-icon" style={{background: data.bg, color: data.color}}>{data.icon}</div>
              <h4>{name}</h4>
              <p>{data.desc.substring(0, 40)}...</p>
              <span className="ht-dept-link">Learn More →</span>
            </div>
          ))}
        </div>
        </>
        )}

        {activeNav === 'About Us' && (
          <div style={{padding: '60px 40px', background: '#f8fafc', borderRadius: '30px', marginBottom: '40px'}}>
            <div style={{display: 'flex', gap: '40px', alignItems: 'center'}}>
              <div style={{flex: 1}}>
                <img src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=800&q=80" alt="About Hospital" style={{width: '100%', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}} />
              </div>
              <div style={{flex: 1}}>
                <h1 style={{fontSize: '48px', color: '#0f172a', marginBottom: '20px', fontFamily: 'Poppins'}}>About <span style={{color: '#4f46e5'}}>CSIT Hospital</span></h1>
                <p style={{fontSize: '16px', color: '#64748b', lineHeight: '1.8', marginBottom: '20px'}}>
                  Founded with a vision to provide world-class healthcare, CSIT Hospital has been a beacon of hope and healing for over two decades. Our commitment to excellence is reflected in our state-of-the-art facilities, advanced technology, and a team of dedicated medical professionals.
                </p>
                <p style={{fontSize: '16px', color: '#64748b', lineHeight: '1.8', marginBottom: '30px'}}>
                  We believe in a patient-first approach, ensuring that every individual receives personalized, compassionate, and comprehensive care tailored to their unique needs.
                </p>
                <button className="btn-book" onClick={() => setShowJourney(!showJourney)}>
                  {showJourney ? 'Hide Journey Details' : 'Learn More About Our Journey'}
                </button>
                
                {showJourney && (
                  <div style={{marginTop: '25px', padding: '20px', background: '#eff6ff', borderRadius: '15px', borderLeft: '4px solid #4f46e5', animation: 'fadeIn 0.3s ease-in-out'}}>
                    <h4 style={{margin: '0 0 10px 0', color: '#0f172a', fontSize: '18px'}}>Our Journey Began in 2005 🚀</h4>
                    <p style={{fontSize: '14px', color: '#475569', margin: 0, lineHeight: '1.6'}}>
                      Starting as a small 50-bed clinic, CSIT Hospital has grown into a premier multi-specialty healthcare hub with over 500+ beds and internationally recognized medical professionals. We continuously adopt cutting-edge technology to serve our community better every single day.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeNav === 'Doctors' && (
          <div style={{padding: '60px 40px', background: '#f8fafc', borderRadius: '30px', marginBottom: '40px'}}>
            <h1 style={{fontSize: '40px', color: '#0f172a', marginBottom: '10px', fontFamily: 'Poppins', textAlign: 'center'}}>Our <span style={{color: '#4f46e5'}}>Expert Doctors</span></h1>
            <p style={{textAlign: 'center', color: '#64748b', marginBottom: '40px'}}>Meet our highly qualified and experienced medical professionals.</p>
            
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px'}}>
              {[{name: 'Dr. Sarah Jenkins', spec: 'Cardiologist', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80'}, {name: 'Dr. Michael Chen', spec: 'Neurologist', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80'}, {name: 'Dr. Emily Carter', spec: 'Pediatrician', img: 'https://images.unsplash.com/photo-1594824436951-7f12bc41753a?auto=format&fit=crop&w=300&q=80'}].map((doc, idx) => (
                <div key={idx} className="t-glass" style={{padding: '20px', textAlign: 'center', background: 'white'}}>
                  <img src={doc.img} alt={doc.name} style={{width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', marginBottom: '15px', border: '3px solid #eff6ff'}} />
                  <h3 style={{fontSize: '20px', color: '#0f172a', margin: '0 0 5px 0'}}>{doc.name}</h3>
                  <p style={{color: '#4f46e5', fontWeight: '600', margin: '0 0 20px 0', fontSize: '14px'}}>{doc.spec}</p>
                  <button className="btn-secondary" style={{width: '100%', justifyContent: 'center'}} onClick={() => { setActiveNav('Home'); setTimeout(() => document.getElementById('booking-form').scrollIntoView({behavior: 'smooth'}), 100); }}>Book Appointment</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeNav === 'Contact' && (
          <div style={{padding: '60px 40px', background: '#f8fafc', borderRadius: '30px', marginBottom: '40px'}}>
            <div style={{maxWidth: '600px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)'}}>
              <h1 style={{fontSize: '36px', color: '#0f172a', marginBottom: '10px', fontFamily: 'Poppins', textAlign: 'center'}}>Contact <span style={{color: '#4f46e5'}}>Us</span></h1>
              <p style={{textAlign: 'center', color: '#64748b', marginBottom: '30px'}}>We are here to help and answer any question you might have.</p>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                <input type="text" className="ht-input" placeholder="Your Name" value={contactForm.name} onChange={e => setContactForm({...contactForm, name: e.target.value})} />
                <input type="email" className="ht-input" placeholder="Your Email" value={contactForm.email} onChange={e => setContactForm({...contactForm, email: e.target.value})} />
                <textarea className="ht-input" placeholder="How can we help you?" rows="4" style={{resize: 'none'}} value={contactForm.message} onChange={e => setContactForm({...contactForm, message: e.target.value})}></textarea>
                <button 
                  className="btn-book" 
                  style={{width: '100%', padding: '15px', fontSize: '16px', background: isContactSent ? '#10b981' : '', transition: 'background 0.3s'}} 
                  onClick={handleContactSubmit}
                >
                  {isContactSent ? '✅ Message Sent!' : 'Send Message'}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeNav === 'Services' && (
          <div style={{padding: '60px 40px', background: '#f8fafc', borderRadius: '30px', marginBottom: '40px'}}>
            <h1 style={{fontSize: '40px', color: '#0f172a', marginBottom: '10px', fontFamily: 'Poppins', textAlign: 'center'}}>Our <span style={{color: '#4f46e5'}}>Services</span></h1>
            <p style={{textAlign: 'center', color: '#64748b', marginBottom: '40px'}}>We offer a wide range of medical services with state-of-the-art facilities.</p>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px'}}>
              {[{name: '24/7 Ambulance', icon: '🚑', color: '#ef4444', bg: '#fee2e2'}, {name: 'Pharmacy', icon: '💊', color: '#10b981', bg: '#ecfdf5'}, {name: 'Laboratory', icon: '🔬', color: '#3b82f6', bg: '#eff6ff'}, {name: 'Intensive Care (ICU)', icon: '🛏️', color: '#a855f7', bg: '#f3e8ff'}, {name: 'Blood Bank', icon: '🩸', color: '#f97316', bg: '#ffedd5'}, {name: 'Digital X-Ray', icon: '🩻', color: '#64748b', bg: '#f1f5f9'}].map((srv, idx) => (
                <div key={idx} className="t-glass" style={{padding: '30px', textAlign: 'center', background: 'white', borderRadius: '20px', cursor: 'pointer', transition: 'transform 0.2s'}} onClick={() => setSelectedService(srv)} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{fontSize: '40px', width: '80px', height: '80px', background: srv.bg, color: srv.color, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '20px', margin: '0 auto 20px auto'}}>{srv.icon}</div>
                  <h3 style={{fontSize: '20px', color: '#0f172a', margin: '0 0 10px 0'}}>{srv.name}</h3>
                  <p style={{color: '#64748b', fontSize: '14px', margin: 0}}>High-quality {srv.name.toLowerCase()} available round the clock.</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeNav === 'Departments' && (
          <div style={{padding: '60px 40px', background: '#f8fafc', borderRadius: '30px', marginBottom: '40px'}}>
            <h1 style={{fontSize: '40px', color: '#0f172a', marginBottom: '10px', fontFamily: 'Poppins', textAlign: 'center'}}>All <span style={{color: '#4f46e5'}}>Departments</span></h1>
            <p style={{textAlign: 'center', color: '#64748b', marginBottom: '40px'}}>Comprehensive care across various medical specialties.</p>
            <div className="ht-departments-grid">
              {Object.entries(deptData).map(([name, data]) => (
                <div key={name} className="ht-dept-card t-glass" onClick={() => setSelectedDepartment({name, ...data})}>
                  <div className="ht-dept-icon" style={{background: data.bg, color: data.color}}>{data.icon}</div>
                  <h4>{name}</h4>
                  <p>{data.desc.substring(0, 40)}...</p>
                  <span className="ht-dept-link">Learn More →</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeNav === 'Pages' && (
          <div style={{padding: '60px 40px', background: '#f8fafc', borderRadius: '30px', marginBottom: '40px'}}>
            <h1 style={{fontSize: '40px', color: '#0f172a', marginBottom: '10px', fontFamily: 'Poppins', textAlign: 'center'}}>Helpful <span style={{color: '#4f46e5'}}>Resources</span></h1>
            <p style={{textAlign: 'center', color: '#64748b', marginBottom: '40px'}}>Quick links to important hospital information.</p>
            <div style={{display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap'}}>
              {['Pricing & Insurance', 'Patient FAQs', 'Careers', 'Testimonials'].map((page, idx) => (
                <div key={idx} className="t-glass" style={{padding: '20px 30px', background: 'white', borderRadius: '15px', cursor: 'pointer', borderLeft: '4px solid #4f46e5', minWidth: '200px'}} onClick={() => setSelectedResource(page)} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <h4 style={{margin: '0 0 5px 0', color: '#0f172a'}}>{page}</h4>
                  <span style={{fontSize: '12px', color: '#4f46e5', fontWeight: '600'}}>View Page →</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Bottom Bar */}
        <div className="ht-footer">
          <div className="ht-voice" style={{cursor: 'pointer', background: isVoiceListening ? '#3b82f6' : '', color: isVoiceListening ? 'white' : '', transition: 'all 0.3s'}} onClick={() => {
            setIsVoiceListening(true);
            setTimeout(() => {
              setIsVoiceListening(false);
              setChatMessages([...chatMessages, { role: 'ai', text: '🎤 Voice Assistant Activated! Speak now, how can I assist you with your booking today?' }]);
            }, 2000);
          }}>
            <i>🎤</i> {isVoiceListening ? 'Listening...' : 'Voice Assistant'}
            <div style={{display: 'flex', gap: '3px', alignItems: 'center'}}>
              <div style={{width: '3px', height: isVoiceListening ? '14px' : '10px', background: isVoiceListening ? 'white' : '#3b82f6', borderRadius: '2px', transition: 'height 0.2s', animation: isVoiceListening ? 'pulse 0.5s infinite alternate' : 'none'}}></div>
              <div style={{width: '3px', height: isVoiceListening ? '22px' : '16px', background: isVoiceListening ? 'white' : '#3b82f6', borderRadius: '2px', transition: 'height 0.2s', animation: isVoiceListening ? 'pulse 0.6s infinite alternate' : 'none'}}></div>
              <div style={{width: '3px', height: isVoiceListening ? '12px' : '8px', background: isVoiceListening ? 'white' : '#3b82f6', borderRadius: '2px', transition: 'height 0.2s', animation: isVoiceListening ? 'pulse 0.4s infinite alternate' : 'none'}}></div>
              <div style={{width: '3px', height: isVoiceListening ? '18px' : '14px', background: isVoiceListening ? 'white' : '#3b82f6', borderRadius: '2px', transition: 'height 0.2s', animation: isVoiceListening ? 'pulse 0.7s infinite alternate' : 'none'}}></div>
            </div>
          </div>
          
          <div className="ht-footer-item" style={{cursor: 'pointer'}} onClick={() => setSelectedFeature({title: 'Advanced Technology', icon: '⚙️', desc: 'We utilize state-of-the-art medical equipment including 3D MRI, robotic surgery assistants, and AI-driven diagnostic tools to ensure precise and effective treatments.'})}>
            <div className="ht-footer-icon">⚙️</div>
            <div className="ht-footer-text">
              <h5>Advanced Technology</h5>
              <p>Latest medical equipment</p>
            </div>
          </div>
          
          <div className="ht-footer-item" style={{cursor: 'pointer'}} onClick={() => setSelectedFeature({title: 'Expert Doctors', icon: '👨‍⚕️', desc: 'Our hospital is staffed by internationally recognized specialists and surgeons with decades of experience in their respective fields.'})}>
            <div className="ht-footer-icon">👨‍⚕️</div>
            <div className="ht-footer-text">
              <h5>Expert Doctors</h5>
              <p>Highly qualified professionals</p>
            </div>
          </div>
          
          <div className="ht-footer-item" style={{cursor: 'pointer'}} onClick={() => setSelectedFeature({title: '24/7 Support', icon: '🕒', desc: 'Medical emergencies can happen anytime. Our dedicated rapid response team and trauma center are fully operational 24 hours a day, 365 days a year.'})}>
            <div className="ht-footer-icon">🕒</div>
            <div className="ht-footer-text">
              <h5>24/7 Support</h5>
              <p>Round the clock care</p>
            </div>
          </div>
          
          <div className="ht-footer-item" style={{cursor: 'pointer'}} onClick={() => setSelectedFeature({title: 'Safe & Secure', icon: '🛡️', desc: 'Your health and data privacy are our top priorities. We follow strict international hygiene protocols and secure medical record systems.'})}>
            <div className="ht-footer-icon">🛡️</div>
            <div className="ht-footer-text">
              <h5>Safe & Secure</h5>
              <p>Your health is our priority</p>
            </div>
          </div>
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{background: 'white', width: '500px', maxWidth: '90%', borderRadius: '24px', padding: '40px', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', animation: 'fadeIn 0.3s ease-out'}}>
            <button 
              onClick={() => setSelectedService(null)} 
              style={{position: 'absolute', top: '20px', right: '20px', background: '#f1f5f9', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b'}}
            >
              ✕
            </button>
            
            <div style={{fontSize: '60px', width: '100px', height: '100px', background: selectedService.bg, color: selectedService.color, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '24px', margin: '0 auto 20px auto'}}>
              {selectedService.icon}
            </div>
            
            <h2 style={{textAlign: 'center', color: '#0f172a', fontSize: '28px', marginBottom: '10px', fontFamily: 'Poppins'}}>{selectedService.name}</h2>
            <p style={{textAlign: 'center', color: '#64748b', fontSize: '16px', lineHeight: '1.6', marginBottom: '30px'}}>
              At CSIT Hospital, our {selectedService.name} is fully equipped with the latest technology and staffed by expert medical professionals to ensure you receive the highest quality care whenever you need it.
            </p>
            
            <button 
              className="btn-book" 
              style={{width: '100%', padding: '15px', background: isServiceRequested ? '#10b981' : '', transition: 'background 0.3s'}} 
              onClick={() => {
                setIsServiceRequested(true);
                setChatMessages([...chatMessages, { role: 'ai', text: `✅ Your request for ${selectedService.name} has been received! Our team will contact you shortly.` }]);
                
                // Save to Dashboard Inbox
                const savedMessages = JSON.parse(localStorage.getItem('siteMessages') || '[]');
                savedMessages.push({
                  id: Date.now(),
                  name: 'Service Request',
                  email: 'No email',
                  message: `Requested Service: ${selectedService.name}`,
                  date: new Date().toLocaleDateString()
                });
                localStorage.setItem('siteMessages', JSON.stringify(savedMessages));

                setTimeout(() => {
                  setIsServiceRequested(false);
                  setSelectedService(null);
                }, 2000);
              }}
            >
              {isServiceRequested ? '✅ Service Requested!' : 'Request this Service'}
            </button>
          </div>
        </div>
      )}

      {/* Department Detail Modal */}
      {selectedDepartment && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{background: 'white', width: '500px', maxWidth: '90%', borderRadius: '24px', padding: '40px', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', animation: 'fadeIn 0.3s ease-out'}}>
            <button 
              onClick={() => setSelectedDepartment(null)} 
              style={{position: 'absolute', top: '20px', right: '20px', background: '#f1f5f9', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b'}}
            >
              ✕
            </button>
            
            <div style={{fontSize: '60px', width: '100px', height: '100px', background: selectedDepartment.bg, color: selectedDepartment.color, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '24px', margin: '0 auto 20px auto'}}>
              {selectedDepartment.icon}
            </div>
            
            <h2 style={{textAlign: 'center', color: '#0f172a', fontSize: '28px', marginBottom: '10px', fontFamily: 'Poppins'}}>{selectedDepartment.name} Department</h2>
            <p style={{textAlign: 'center', color: '#64748b', fontSize: '16px', lineHeight: '1.6', marginBottom: '30px'}}>
              {selectedDepartment.desc}
            </p>
            
            <button 
              className="btn-book" 
              style={{width: '100%', padding: '15px', background: isConsultRequested ? '#10b981' : '', transition: 'background 0.3s'}} 
              onClick={() => {
                setIsConsultRequested(true);
                setTimeout(() => {
                  setIsConsultRequested(false);
                  setSelectedDepartment(null);
                  setActiveNav('Home');
                  setTimeout(() => {
                    setBookForm({...bookForm, department: selectedDepartment.name});
                    document.getElementById('booking-form').scrollIntoView({behavior: 'smooth'});
                  }, 100);
                }, 800);
              }}
            >
              {isConsultRequested ? '✅ Department Selected!' : 'Consult a Doctor'}
            </button>
          </div>
        </div>
      )}

      {/* Resource Detail Modal */}
      {selectedResource && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{background: 'white', width: '600px', maxWidth: '90%', borderRadius: '24px', padding: '40px', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', animation: 'fadeIn 0.3s ease-out', maxHeight: '80vh', overflowY: 'auto'}}>
            <button 
              onClick={() => setSelectedResource(null)} 
              style={{position: 'absolute', top: '20px', right: '20px', background: '#f1f5f9', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b'}}
            >
              ✕
            </button>
            
            <h2 style={{color: '#0f172a', fontSize: '28px', marginBottom: '20px', fontFamily: 'Poppins', borderBottom: '2px solid #f1f5f9', paddingBottom: '10px'}}>{selectedResource}</h2>
            
            {selectedResource === 'Pricing & Insurance' && (
              <div>
                <p style={{color: '#475569', lineHeight: '1.6', marginBottom: '20px'}}>We believe in transparent pricing and partner with most major insurance providers to ensure you get the best care without financial stress.</p>
                <ul style={{color: '#475569', lineHeight: '1.8', paddingLeft: '20px'}}>
                  <li><b>Accepted Insurances:</b> Medicare, BlueCross, Aetna, Cigna, UnitedHealthcare</li>
                  <li><b>Consultation Fees:</b> Starting from $50 (General) to $150 (Specialist)</li>
                  <li><b>Financial Assistance:</b> Available for eligible patients</li>
                </ul>
              </div>
            )}

            {selectedResource === 'Patient FAQs' && (
              <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                <div style={{background: '#f8fafc', padding: '15px', borderRadius: '10px'}}>
                  <h4 style={{margin: '0 0 5px 0', color: '#0f172a'}}>What are the visiting hours?</h4>
                  <p style={{margin: 0, color: '#64748b', fontSize: '14px'}}>General visiting hours are from 10:00 AM to 8:00 PM daily. ICU hours may vary.</p>
                </div>
                <div style={{background: '#f8fafc', padding: '15px', borderRadius: '10px'}}>
                  <h4 style={{margin: '0 0 5px 0', color: '#0f172a'}}>Do I need to bring my medical records?</h4>
                  <p style={{margin: 0, color: '#64748b', fontSize: '14px'}}>Yes, please bring any previous medical records, test results, and a list of current medications.</p>
                </div>
              </div>
            )}

            {selectedResource === 'Careers' && (
              <div>
                <p style={{color: '#475569', lineHeight: '1.6', marginBottom: '20px'}}>Join our team of dedicated professionals and make a difference in people's lives every day. We offer competitive salaries, excellent benefits, and a supportive work environment.</p>
                <h4 style={{color: '#0f172a', marginBottom: '10px'}}>Current Openings:</h4>
                <ul style={{color: '#475569', lineHeight: '1.8', paddingLeft: '20px'}}>
                  <li>Registered Nurse (ICU) - Full Time</li>
                  <li>Pediatric Specialist - Full Time</li>
                  <li>Medical Lab Technician - Part Time</li>
                  <li>Front Desk Executive - Day Shift</li>
                </ul>
              </div>
            )}

            {selectedResource === 'Testimonials' && (
              <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                <div style={{background: '#fffbeb', padding: '20px', borderRadius: '15px', borderLeft: '4px solid #f59e0b'}}>
                  <p style={{margin: '0 0 10px 0', color: '#475569', fontStyle: 'italic'}}>"The care I received at CSIT Hospital was exceptional. The staff was incredibly attentive and the doctors took the time to explain everything clearly."</p>
                  <h5 style={{margin: 0, color: '#0f172a'}}>- Sarah M.</h5>
                </div>
                <div style={{background: '#eff6ff', padding: '20px', borderRadius: '15px', borderLeft: '4px solid #3b82f6'}}>
                  <p style={{margin: '0 0 10px 0', color: '#475569', fontStyle: 'italic'}}>"From the emergency room to recovery, the professionalism of the team here is unmatched. Highly recommended."</p>
                  <h5 style={{margin: 0, color: '#0f172a'}}>- David L.</h5>
                </div>
              </div>
            )}

            <button 
              className="btn-book" 
              style={{width: '100%', padding: '15px', marginTop: '30px'}} 
              onClick={() => setSelectedResource(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Feature Detail Modal */}
      {selectedFeature && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{background: 'white', width: '450px', maxWidth: '90%', borderRadius: '24px', padding: '40px', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', animation: 'fadeIn 0.2s ease-out', textAlign: 'center'}}>
            <button 
              onClick={() => setSelectedFeature(null)} 
              style={{position: 'absolute', top: '20px', right: '20px', background: '#f1f5f9', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b'}}
            >
              ✕
            </button>
            <div style={{fontSize: '50px', marginBottom: '15px'}}>{selectedFeature.icon}</div>
            <h2 style={{color: '#0f172a', fontSize: '24px', marginBottom: '15px', fontFamily: 'Poppins'}}>{selectedFeature.title}</h2>
            <p style={{color: '#64748b', lineHeight: '1.6', fontSize: '15px'}}>{selectedFeature.desc}</p>
          </div>
        </div>
      )}

      {/* Emergency Modal */}
      {isEmergencyOpen && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(239, 68, 68, 0.4)', backdropFilter: 'blur(8px)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{background: 'white', width: '450px', maxWidth: '90%', borderRadius: '24px', padding: '40px', position: 'relative', boxShadow: '0 25px 50px -12px rgba(239, 68, 68, 0.5)', animation: 'fadeIn 0.2s ease-out', textAlign: 'center', border: '4px solid #ef4444'}}>
            <button 
              onClick={() => setIsEmergencyOpen(false)} 
              style={{position: 'absolute', top: '20px', right: '20px', background: '#fee2e2', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444'}}
            >
              ✕
            </button>
            
            <div style={{fontSize: '60px', marginBottom: '10px', animation: 'pulse 1s infinite alternate'}}>🚨</div>
            <h2 style={{color: '#ef4444', fontSize: '28px', margin: '0 0 5px 0', fontFamily: 'Poppins'}}>EMERGENCY PROTOCOL</h2>
            <p style={{color: '#64748b', fontSize: '14px', marginBottom: '25px'}}>If this is a life-threatening medical emergency, please do not wait.</p>
            
            <div style={{background: '#f8fafc', padding: '20px', borderRadius: '15px', marginBottom: '25px'}}>
              <h3 style={{margin: '0 0 10px 0', color: '#0f172a'}}>Hospital Hotline</h3>
              <p style={{fontSize: '24px', fontWeight: 'bold', color: '#3b82f6', margin: '0 0 15px 0'}}>1-800-CSIT-HELP</p>
              
              <h3 style={{margin: '0 0 5px 0', color: '#0f172a'}}>National Emergency</h3>
              <p style={{fontSize: '24px', fontWeight: 'bold', color: '#ef4444', margin: 0}}>911</p>
            </div>
            
            <button 
              className="btn-book" 
              style={{width: '100%', padding: '15px', background: isAmbulanceCalled ? '#10b981' : '#ef4444', transition: 'background 0.3s', fontSize: '18px'}} 
              onClick={() => {
                setIsAmbulanceCalled(true);
                
                // Save emergency alert to inbox
                const savedMessages = JSON.parse(localStorage.getItem('siteMessages') || '[]');
                savedMessages.push({
                  id: Date.now(),
                  name: 'URGENT ALERT',
                  email: 'Emergency',
                  message: 'An ambulance was dispatched via the Emergency Protocol.',
                  date: new Date().toLocaleDateString()
                });
                localStorage.setItem('siteMessages', JSON.stringify(savedMessages));

                setTimeout(() => {
                  setIsAmbulanceCalled(false);
                  setIsEmergencyOpen(false);
                  setChatMessages([...chatMessages, { role: 'ai', text: '🚨 Ambulance dispatched immediately to your location!' }]);
                }, 2000);
              }}
            >
              {isAmbulanceCalled ? '✅ Ambulance Dispatched!' : 'Dispatch Ambulance Now'}
            </button>
          </div>
        </div>
      )}

      {/* Site AI Chat Modal */}
      {isChatOpen && (
        <div style={{position: 'fixed', bottom: '20px', right: '20px', width: '350px', background: 'white', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)', zIndex: 10001, overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid #e2e8f0', animation: 'fadeIn 0.3s ease-out'}}>
          {/* Header */}
          <div style={{background: '#4f46e5', padding: '15px 20px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <span style={{fontSize: '20px'}}>💬</span>
              <h3 style={{margin: 0, fontSize: '16px', fontFamily: 'Poppins'}}>AI Assistant</h3>
            </div>
            <button onClick={() => setIsChatOpen(false)} style={{background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '20px', display: 'flex', alignItems: 'center'}}>✕</button>
          </div>
          
          {/* Messages */}
          <div style={{height: '320px', overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px', background: '#f8fafc'}}>
            {siteChatMessages.map((msg, idx) => (
              <div key={idx} style={{alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%'}}>
                <div style={{
                  background: msg.role === 'user' ? '#4f46e5' : 'white', 
                  color: msg.role === 'user' ? 'white' : '#334155', 
                  padding: '12px 16px', 
                  borderRadius: '16px', 
                  borderBottomRightRadius: msg.role === 'user' ? '4px' : '16px',
                  borderBottomLeftRadius: msg.role === 'ai' ? '4px' : '16px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                  fontSize: '14px',
                  lineHeight: '1.5'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          
          {/* Input */}
          <div style={{padding: '15px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '10px', background: 'white', alignItems: 'center'}}>
            <input 
              type="text" 
              placeholder="Type your message..." 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => {
                if(e.key === 'Enter' && chatInput.trim()) {
                  const newMsg = chatInput.trim();
                  setSiteChatMessages([...siteChatMessages, {role: 'user', text: newMsg}]);
                  setChatInput('');
                  setTimeout(() => {
                    setSiteChatMessages(prev => [...prev, {role: 'ai', text: 'I am a demo AI. For real medical assistance, please use the Contact Us page or Book an Appointment!'}]);
                  }, 1000);
                }
              }}
              style={{flex: 1, padding: '12px 15px', borderRadius: '20px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', background: '#f8fafc'}}
            />
            <button 
              onClick={() => {
                if(chatInput.trim()) {
                  const newMsg = chatInput.trim();
                  setSiteChatMessages([...siteChatMessages, {role: 'user', text: newMsg}]);
                  setChatInput('');
                  setTimeout(() => {
                    setSiteChatMessages(prev => [...prev, {role: 'ai', text: 'I am a demo AI. For real medical assistance, please use the Contact Us page or Book an Appointment!'}]);
                  }, 1000);
                }
              }}
              style={{background: '#4f46e5', color: 'white', border: 'none', borderRadius: '50%', width: '42px', height: '42px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px'}}
            >
              ➤
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
