import React from 'react';
import { Link } from 'react-router-dom';
import './Templates.css';

const MOCK_TEMPLATES = [
  { id: 1, name: 'Hospital & Healthcare', category: 'Medical', image: '🏥' },
  { id: 2, name: 'Modern Portfolio', category: 'Personal', image: '👨‍💻' },
  { id: 3, name: 'E-commerce Store', category: 'Retail', image: '🛒' },
  { id: 4, name: 'Restaurant & Cafe', category: 'Food', image: '🍔' },
  { id: 5, name: 'Startup Agency', category: 'Business', image: '🚀' },
  { id: 6, name: 'Real Estate', category: 'Property', image: '🏢' },
];

export default function Templates() {
  return (
    <div className="templates-container">
      <div className="templates-header">
        <div>
          <h1 className="templates-title">Website Templates</h1>
          <p className="templates-subtitle">Start with a stunning design or build from scratch</p>
        </div>
        <Link to="/builder" className="btn btn-primary">
          <span style={{ marginRight: '8px' }}>✨</span> Start from Scratch
        </Link>
      </div>

      <div className="templates-grid">
        {MOCK_TEMPLATES.map((template) => (
          <div key={template.id} className="template-card">
            <div className="template-preview">
              <span className="template-emoji">{template.image}</span>
            </div>
            <div className="template-info">
              <span className="template-category">{template.category}</span>
              <h3 className="template-name">{template.name}</h3>
            </div>
            <div className="template-overlay">
              <Link to={`/builder?template=${template.id}`} className="btn btn-primary">Use Template</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
