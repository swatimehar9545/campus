import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import { MOCK_PROJECTS } from '../mock/projects';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Assume user ID is 1 for now (mocked auth)
        const res = await fetch('http://localhost:8080/api/projects/user/1');
        if (res.ok) {
          const data = await res.json();
          // Merge real backend data with mock data so it doesn't look empty if DB is fresh
          setProjects([...data, ...MOCK_PROJECTS]);
        } else {
          setProjects(MOCK_PROJECTS);
        }
      } catch (error) {
        console.error("Could not fetch projects from Java backend, using mocks", error);
        setProjects(MOCK_PROJECTS);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
    
    // Load contact messages from localStorage
    const savedMsgs = JSON.parse(localStorage.getItem('csit_messages') || '[]');
    setMessages(savedMsgs);
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">My Projects</h1>
          <p className="dashboard-subtitle">Manage your AI-generated websites</p>
        </div>
        <Link to="/" className="btn btn-primary">
          <span style={{ marginRight: '8px' }}>+</span> Create New Website
        </Link>
      </div>

      {loading ? (
        <div style={{color: 'white', textAlign: 'center', marginTop: '40px'}}>Loading projects from Database...</div>
      ) : (
        <div className="projects-grid">
          {projects.map((project, idx) => (
            <div key={project.id || idx} className="project-card">
              <div className="project-preview">
                <div className="preview-placeholder">
                  <span style={{ fontSize: '32px' }}>{project.templateId === 'Restaurant' ? '🍔' : project.templateId === 'Real Estate' ? '🏠' : '🌐'}</span>
                </div>
              </div>
              <div className="project-info">
                <h3 className="project-name">{project.name}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-meta">
                  <span className={"status-badge status-" + (project.status ? project.status.toLowerCase() : 'draft')}>
                    {project.status || 'DRAFT'}
                  </span>
                  <span className="project-date">
                    Updated: {project.lastModified ? new Date(project.lastModified).toLocaleDateString() : 'Just now'}
                  </span>
                </div>
              </div>
              <div className="project-actions">
                <Link to="/builder" className="action-link">Edit</Link>
                <Link to="/preview" className="action-link">Preview</Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Messages Inbox Section */}
      <div style={{ marginTop: '60px' }}>
        <h2 className="dashboard-title" style={{ fontSize: '24px', marginBottom: '20px' }}>Inbox Messages</h2>
        {messages.length === 0 ? (
          <div style={{ color: 'var(--text-secondary)', background: 'var(--glass-bg)', padding: '30px', borderRadius: '12px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
            No messages received yet. Submit the contact form in the Builder to see them here!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ background: 'var(--glass-bg)', padding: '20px', borderRadius: '12px', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ color: 'white', fontSize: '18px' }}>{msg.name}</strong>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{msg.date}</span>
                </div>
                <div style={{ color: '#3b82f6', fontSize: '14px' }}>{msg.email}</div>
                <div style={{ color: 'var(--text-secondary)', marginTop: '10px', background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '8px' }}>
                  "{msg.message}"
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
