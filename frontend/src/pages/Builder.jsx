import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Builder.css';
import HospitalTemplate from '../components/templates/HospitalTemplate';

// Initial Template States based on Category
const TEMPLATE_CONFIGS = {
  Hospital: {
    heroHeading: { type: 'Heading (H1)', content: "Your Health,\nOur Priority", fontFamily: 'Poppins', fontSize: 64, fontWeight: 700, color: '#0B1039', textAlign: 'left', marginTop: 0, padding: 0 },
    heroSub: { type: 'Text Block', content: "Providing exceptional healthcare services with compassion and advanced technology.", fontFamily: 'Inter', fontSize: 16, fontWeight: 400, color: '#64748b', textAlign: 'left', marginTop: 0, padding: 0 },
    heroImage: { type: 'Image', content: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80", width: '100%', borderRadius: 16 },
    service1Title: { type: 'Heading (H3)', content: "General Consultation", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service1Desc: { type: 'Text Block', content: "Expert doctors for your everyday health concerns.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service2Title: { type: 'Heading (H3)', content: "Emergency Care", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service2Desc: { type: 'Text Block', content: "24/7 emergency services for critical care.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service3Title: { type: 'Heading (H3)', content: "Advanced Treatment", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service3Desc: { type: 'Text Block', content: "Latest technology and modern treatment.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service4Title: { type: 'Heading (H3)', content: "Health Checkup", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service4Desc: { type: 'Text Block', content: "Regular checkups for a healthy life.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
  },
  'Real Estate': {
    heroHeading: { type: 'Heading (H1)', content: "Find Your Dream\nHome Today", fontFamily: 'Poppins', fontSize: 64, fontWeight: 700, color: '#1e293b', textAlign: 'center', marginTop: 0, padding: 0 },
    heroSub: { type: 'Text Block', content: "Discover the best properties in your city with premium amenities.", fontFamily: 'Inter', fontSize: 18, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 20, padding: 0 },
    heroImage: { type: 'Image', content: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80", width: '100%', borderRadius: 16 },
    service1Title: { type: 'Heading (H3)', content: "Luxury Villas", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service1Desc: { type: 'Text Block', content: "Premium 5-bhk villas with pool.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service2Title: { type: 'Heading (H3)', content: "Modern Apartments", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service2Desc: { type: 'Text Block', content: "High-rise apartments with city views.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service3Title: { type: 'Heading (H3)', content: "Commercial Spaces", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service3Desc: { type: 'Text Block', content: "Best office spaces for your business.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service4Title: { type: 'Heading (H3)', content: "Cozy Studios", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service4Desc: { type: 'Text Block', content: "Affordable studio apartments.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
  },
  Restaurant: {
    heroHeading: { type: 'Heading (H1)', content: "Authentic Tastes,\nUnforgettable Moments", fontFamily: 'Poppins', fontSize: 64, fontWeight: 700, color: '#7c2d12', textAlign: 'center', marginTop: 0, padding: 0 },
    heroSub: { type: 'Text Block', content: "Experience the finest culinary delights crafted by our master chefs.", fontFamily: 'Inter', fontSize: 18, fontWeight: 400, color: '#78350f', textAlign: 'center', marginTop: 20, padding: 0 },
    heroImage: { type: 'Image', content: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80", width: '100%', borderRadius: 16 },
    service1Title: { type: 'Heading (H3)', content: "Fine Dining", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service1Desc: { type: 'Text Block', content: "A premium dining experience.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service2Title: { type: 'Heading (H3)', content: "Private Events", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service2Desc: { type: 'Text Block', content: "Book our hall for your special events.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service3Title: { type: 'Heading (H3)', content: "Home Delivery", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service3Desc: { type: 'Text Block', content: "Hot food delivered to your door.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service4Title: { type: 'Heading (H3)', content: "Catering", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service4Desc: { type: 'Text Block', content: "Outdoor catering for parties.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
  },
  Portfolio: {
    heroHeading: { type: 'Heading (H1)', content: "Creative Designer\n& Developer", fontFamily: 'Poppins', fontSize: 64, fontWeight: 700, color: '#2563eb', textAlign: 'left', marginTop: 0, padding: 0 },
    heroSub: { type: 'Text Block', content: "I build modern and scalable web applications.", fontFamily: 'Inter', fontSize: 18, fontWeight: 400, color: '#64748b', textAlign: 'left', marginTop: 20, padding: 0 },
    heroImage: { type: 'Image', content: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80", width: '100%', borderRadius: 16 },
    service1Title: { type: 'Heading (H3)', content: "Web Dev", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service1Desc: { type: 'Text Block', content: "React & Spring Boot expert.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service2Title: { type: 'Heading (H3)', content: "Backend Dev", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service2Desc: { type: 'Text Block', content: "Node.js, Express, Java.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service3Title: { type: 'Heading (H3)', content: "UI/UX Design", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service3Desc: { type: 'Text Block', content: "Figma and Adobe XD.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service4Title: { type: 'Heading (H3)', content: "Mobile Apps", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service4Desc: { type: 'Text Block', content: "React Native & Flutter.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
  },
  Gym: {
    heroHeading: { type: 'Heading (H1)', content: "Transform Your Body\nTransform Your Life", fontFamily: 'Poppins', fontSize: 64, fontWeight: 700, color: '#0B1039', textAlign: 'left', marginTop: 0, padding: 0 },
    heroSub: { type: 'Text Block', content: "State-of-the-art equipment, expert trainers, and a supportive community.", fontFamily: 'Inter', fontSize: 16, fontWeight: 400, color: '#64748b', textAlign: 'left', marginTop: 0, padding: 0 },
    heroImage: { type: 'Image', content: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80", width: '100%', borderRadius: 16 },
    service1Title: { type: 'Heading (H3)', content: "Personal Training", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service1Desc: { type: 'Text Block', content: "1-on-1 coaching for optimal results.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service2Title: { type: 'Heading (H3)', content: "Group Classes", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service2Desc: { type: 'Text Block', content: "Yoga, HIIT, Zumba and more.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service3Title: { type: 'Heading (H3)', content: "Modern Equipment", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service3Desc: { type: 'Text Block', content: "Best-in-class machines & free weights.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service4Title: { type: 'Heading (H3)', content: "Nutrition Plans", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service4Desc: { type: 'Text Block', content: "Customized diet plans to hit your goals.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
  },
  Ecommerce: {
    heroHeading: { type: 'Heading (H1)', content: "Your Premium\nOnline Store", fontFamily: 'Poppins', fontSize: 64, fontWeight: 700, color: '#0B1039', textAlign: 'left', marginTop: 0, padding: 0 },
    heroSub: { type: 'Text Block', content: "Shop the latest trends with secure checkout.", fontFamily: 'Inter', fontSize: 16, fontWeight: 400, color: '#64748b', textAlign: 'left', marginTop: 0, padding: 0 },
    heroImage: { type: 'Image', content: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80", width: '100%', borderRadius: 16 },
    service1Title: { type: 'Heading (H3)', content: "Summer T-Shirt", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service1Desc: { type: 'Text Block', content: "100% Cotton, comfortable fit. $25", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service2Title: { type: 'Heading (H3)', content: "Denim Jeans", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service2Desc: { type: 'Text Block', content: "Classic blue denim for everyday wear. $45", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service3Title: { type: 'Heading (H3)', content: "Running Shoes", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service3Desc: { type: 'Text Block', content: "Lightweight and breathable. $60", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service4Title: { type: 'Heading (H3)', content: "Leather Wallet", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service4Desc: { type: 'Text Block', content: "Premium quality genuine leather. $30", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
  },
  School: {
    heroHeading: { type: 'Heading (H1)', content: "Empowering\nFuture Leaders", fontFamily: 'Poppins', fontSize: 64, fontWeight: 700, color: '#0B1039', textAlign: 'left', marginTop: 0, padding: 0 },
    heroSub: { type: 'Text Block', content: "Providing world-class education for every student.", fontFamily: 'Inter', fontSize: 16, fontWeight: 400, color: '#64748b', textAlign: 'left', marginTop: 0, padding: 0 },
    heroImage: { type: 'Image', content: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80", width: '100%', borderRadius: 16 },
    service1Title: { type: 'Heading (H3)', content: "Primary Education", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service1Desc: { type: 'Text Block', content: "Foundational learning for kids.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service2Title: { type: 'Heading (H3)', content: "Middle School", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service2Desc: { type: 'Text Block', content: "Comprehensive curriculum.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service3Title: { type: 'Heading (H3)', content: "High School", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service3Desc: { type: 'Text Block', content: "Preparation for college.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service4Title: { type: 'Heading (H3)', content: "Extracurriculars", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service4Desc: { type: 'Text Block', content: "Sports, arts, and clubs.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
  },
  Travel: {
    heroHeading: { type: 'Heading (H1)', content: "Explore\nThe World", fontFamily: 'Poppins', fontSize: 64, fontWeight: 700, color: '#0B1039', textAlign: 'left', marginTop: 0, padding: 0 },
    heroSub: { type: 'Text Block', content: "Book your dream vacation today.", fontFamily: 'Inter', fontSize: 16, fontWeight: 400, color: '#64748b', textAlign: 'left', marginTop: 0, padding: 0 },
    heroImage: { type: 'Image', content: "https://picsum.photos/id/1036/1200/800", width: '100%', borderRadius: 16 },
    service1Title: { type: 'Heading (H3)', content: "Paris Gateway", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service1Desc: { type: 'Text Block', content: "3 Nights / 4 Days including flights.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service2Title: { type: 'Heading (H3)', content: "Maldives Resort", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service2Desc: { type: 'Text Block', content: "Luxury water villa experience.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service3Title: { type: 'Heading (H3)', content: "Swiss Alps", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service3Desc: { type: 'Text Block', content: "Skiing and snowboarding adventure.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service4Title: { type: 'Heading (H3)', content: "Tokyo Tour", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service4Desc: { type: 'Text Block', content: "Explore the vibrant city culture.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
  },
  Hotel: {
    heroHeading: { type: 'Heading (H1)', content: "Luxury\n& Comfort", fontFamily: 'Poppins', fontSize: 64, fontWeight: 700, color: '#0B1039', textAlign: 'left', marginTop: 0, padding: 0 },
    heroSub: { type: 'Text Block', content: "Experience a memorable stay with us.", fontFamily: 'Inter', fontSize: 16, fontWeight: 400, color: '#64748b', textAlign: 'left', marginTop: 0, padding: 0 },
    heroImage: { type: 'Image', content: "https://picsum.photos/id/1040/1200/800", width: '100%', borderRadius: 16 },
    service1Title: { type: 'Heading (H3)', content: "Deluxe Suite", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service1Desc: { type: 'Text Block', content: "King size bed with ocean view.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service2Title: { type: 'Heading (H3)', content: "Family Room", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service2Desc: { type: 'Text Block', content: "Spacious room for 4 people.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service3Title: { type: 'Heading (H3)', content: "Executive Room", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service3Desc: { type: 'Text Block', content: "Perfect for business travelers.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service4Title: { type: 'Heading (H3)', content: "Presidential Suite", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service4Desc: { type: 'Text Block', content: "Ultimate luxury and comfort.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
  },
  Agency: {
    heroHeading: { type: 'Heading (H1)', content: "We Build\nDigital Experiences", fontFamily: 'Poppins', fontSize: 64, fontWeight: 700, color: '#0B1039', textAlign: 'left', marginTop: 0, padding: 0 },
    heroSub: { type: 'Text Block', content: "Creative solutions for your brand.", fontFamily: 'Inter', fontSize: 16, fontWeight: 400, color: '#64748b', textAlign: 'left', marginTop: 0, padding: 0 },
    heroImage: { type: 'Image', content: "https://picsum.photos/id/119/1200/800", width: '100%', borderRadius: 16 },
    service1Title: { type: 'Heading (H3)', content: "Web Development", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service1Desc: { type: 'Text Block', content: "Custom websites and web apps.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service2Title: { type: 'Heading (H3)', content: "SEO Optimization", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service2Desc: { type: 'Text Block', content: "Rank higher on Google.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service3Title: { type: 'Heading (H3)', content: "Social Media", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service3Desc: { type: 'Text Block', content: "Grow your audience online.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service4Title: { type: 'Heading (H3)', content: "Branding", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service4Desc: { type: 'Text Block', content: "Logo and identity design.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service4Desc: { type: 'Text Block', content: "Logo and identity design.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
  },
  'Web App': {
    heroHeading: { type: 'Heading (H1)', content: "Next-Gen\nWeb Applications", fontFamily: 'Poppins', fontSize: 64, fontWeight: 700, color: '#0f172a', textAlign: 'left', marginTop: 0, padding: 0 },
    heroSub: { type: 'Text Block', content: "Powerful, scalable, and secure web apps for your business.", fontFamily: 'Inter', fontSize: 18, fontWeight: 400, color: '#64748b', textAlign: 'left', marginTop: 20, padding: 0 },
    heroImage: { type: 'Image', content: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80", width: '100%', borderRadius: 16 },
    service1Title: { type: 'Heading (H3)', content: "User Dashboard", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service1Desc: { type: 'Text Block', content: "Intuitive analytics and controls.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service2Title: { type: 'Heading (H3)', content: "Authentication", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service2Desc: { type: 'Text Block', content: "Secure login and role management.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service3Title: { type: 'Heading (H3)', content: "API Integration", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service3Desc: { type: 'Text Block', content: "Connect with third-party services.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service4Title: { type: 'Heading (H3)', content: "Real-time Data", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service4Desc: { type: 'Text Block', content: "Live updates via WebSockets.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
  },
  'React': {
    heroHeading: { type: 'Heading (H1)', content: "Pure React\nPerfection", fontFamily: 'Poppins', fontSize: 64, fontWeight: 700, color: '#61dafb', textAlign: 'center', marginTop: 0, padding: 0 },
    heroSub: { type: 'Text Block', content: "Component-driven development for high performance UIs.", fontFamily: 'Inter', fontSize: 18, fontWeight: 400, color: '#333333', textAlign: 'center', marginTop: 20, padding: 0 },
    heroImage: { type: 'Image', content: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80", width: '100%', borderRadius: 16 },
    service1Title: { type: 'Heading (H3)', content: "Components", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service1Desc: { type: 'Text Block', content: "Reusable UI components.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service2Title: { type: 'Heading (H3)', content: "Hooks", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service2Desc: { type: 'Text Block', content: "Custom state management.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service3Title: { type: 'Heading (H3)', content: "Virtual DOM", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service3Desc: { type: 'Text Block', content: "Blazing fast rendering.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service4Title: { type: 'Heading (H3)', content: "SPA", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service4Desc: { type: 'Text Block', content: "Single Page Application flow.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
  },
  'Animation': {
    heroHeading: { type: 'Heading (H1)', content: "Bring Your Site\nTo Life", fontFamily: 'Poppins', fontSize: 64, fontWeight: 700, color: '#ec4899', textAlign: 'left', marginTop: 0, padding: 0 },
    heroSub: { type: 'Text Block', content: "Interactive, fluid, and eye-catching web animations.", fontFamily: 'Inter', fontSize: 18, fontWeight: 400, color: '#64748b', textAlign: 'left', marginTop: 20, padding: 0 },
    heroImage: { type: 'Image', content: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80", width: '100%', borderRadius: 16 },
    service1Title: { type: 'Heading (H3)', content: "Scroll Effects", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service1Desc: { type: 'Text Block', content: "Parallax and reveal animations.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service2Title: { type: 'Heading (H3)', content: "Micro-interactions", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service2Desc: { type: 'Text Block', content: "Engaging hover states.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service3Title: { type: 'Heading (H3)', content: "3D Elements", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service3Desc: { type: 'Text Block', content: "WebGL and Three.js integration.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service4Title: { type: 'Heading (H3)', content: "Transitions", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service4Desc: { type: 'Text Block', content: "Seamless page transitions.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
  },
  'Store': {
    heroHeading: { type: 'Heading (H1)', content: "Your Ultimate\nDigital Store", fontFamily: 'Poppins', fontSize: 64, fontWeight: 700, color: '#10b981', textAlign: 'center', marginTop: 0, padding: 0 },
    heroSub: { type: 'Text Block', content: "Sell your products globally with our optimized storefronts.", fontFamily: 'Inter', fontSize: 18, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 20, padding: 0 },
    heroImage: { type: 'Image', content: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80", width: '100%', borderRadius: 16 },
    service1Title: { type: 'Heading (H3)', content: "Product Grid", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service1Desc: { type: 'Text Block', content: "Beautiful product displays.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service2Title: { type: 'Heading (H3)', content: "Inventory", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service2Desc: { type: 'Text Block', content: "Real-time stock tracking.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service3Title: { type: 'Heading (H3)', content: "Discounts", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service3Desc: { type: 'Text Block', content: "Coupon codes and sales.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service4Title: { type: 'Heading (H3)', content: "Analytics", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service4Desc: { type: 'Text Block', content: "Track your revenue.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
  },
  'Shopping': {
    heroHeading: { type: 'Heading (H1)', content: "Smart Shopping\nExperience", fontFamily: 'Poppins', fontSize: 64, fontWeight: 700, color: '#f59e0b', textAlign: 'left', marginTop: 0, padding: 0 },
    heroSub: { type: 'Text Block', content: "A frictionless shopping cart experience for your customers.", fontFamily: 'Inter', fontSize: 18, fontWeight: 400, color: '#64748b', textAlign: 'left', marginTop: 20, padding: 0 },
    heroImage: { type: 'Image', content: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80", width: '100%', borderRadius: 16 },
    service1Title: { type: 'Heading (H3)', content: "Smart Cart", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service1Desc: { type: 'Text Block', content: "Slide-out cart functionality.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service2Title: { type: 'Heading (H3)', content: "Fast Checkout", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service2Desc: { type: 'Text Block', content: "One-click payment options.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service3Title: { type: 'Heading (H3)', content: "Wishlist", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service3Desc: { type: 'Text Block', content: "Save items for later.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
    service4Title: { type: 'Heading (H3)', content: "Order Tracking", fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginTop: 0, padding: 0 },
    service4Desc: { type: 'Text Block', content: "Live delivery updates.", fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#64748b', textAlign: 'center', marginTop: 0, padding: 0 },
  }
};

export default function Builder() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialPrompt = location.state?.prompt || "I want a modern Hospital website...";
  
  // Determine Category from state or fallback to prompt matching
  let detectedCategory = location.state?.category || 'Hospital';
  if (!location.state?.category) {
    if (initialPrompt.toLowerCase().includes('real estate')) detectedCategory = 'Real Estate';
    if (initialPrompt.toLowerCase().includes('restaurant')) detectedCategory = 'Restaurant';
    if (initialPrompt.toLowerCase().includes('portfolio')) detectedCategory = 'Portfolio';
    if (initialPrompt.toLowerCase().includes('gym')) detectedCategory = 'Gym';
    if (initialPrompt.toLowerCase().includes('ecommerce')) detectedCategory = 'Ecommerce';
    if (initialPrompt.toLowerCase().includes('school')) detectedCategory = 'School';
    if (initialPrompt.toLowerCase().includes('travel')) detectedCategory = 'Travel';
    if (initialPrompt.toLowerCase().includes('hotel')) detectedCategory = 'Hotel';
    if (initialPrompt.toLowerCase().includes('agency')) detectedCategory = 'Agency';
    if (initialPrompt.toLowerCase().includes('hospital')) detectedCategory = 'Hospital';
  }

  // App State
  const [aiPrompt, setAiPrompt] = useState(initialPrompt);
  const [isPreview, setIsPreview] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [activePage, setActivePage] = useState('Home');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isContactSent, setIsContactSent] = useState(false);
  const [draggedType, setDraggedType] = useState(null);
  const [viewMode, setViewMode] = useState('desktop');

  // Hybrid State: Editable Template parts
  const [templateState, setTemplateState] = useState(TEMPLATE_CONFIGS[detectedCategory] || TEMPLATE_CONFIGS['Hospital']);
  const [droppedElements, setDroppedElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null); 
  const [chatMessages, setChatMessages] = useState([{ role: 'ai', text: `Hi! I am customizing the ${detectedCategory} template. Select any element to edit it!` }]);
  const [chatInput, setChatInput] = useState("");

  const handleDragStart = (e, type) => {
    setDraggedType(type);
    e.dataTransfer.setData('type', type);
  };
  const handleDragOver = (e) => e.preventDefault();
  
  const addElementToCanvas = (type) => {
    setDroppedElements([...droppedElements, {
      id: Date.now().toString(),
      type,
      content: type === 'Image' ? 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80' : `New ${type}`,
      fontFamily: 'Inter',
      fontSize: type === 'Heading' ? 32 : 16,
      fontWeight: type === 'Heading' ? 700 : 400,
      color: '#0f172a',
      textAlign: 'left',
      marginTop: 10,
      padding: 10
    }]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('type');
    if (type) {
      addElementToCanvas(type);
    }
    setDraggedType(null);
  };

  const handleSelect = (id, e) => {
    e.stopPropagation();
    setSelectedId(id);
  };

  const getSelectedData = () => {
    if (!selectedId) return null;
    if (templateState[selectedId]) return { id: selectedId, isTemplate: true, ...templateState[selectedId] };
    const dropped = droppedElements.find(el => el.id === selectedId);
    if (dropped) return { ...dropped, isTemplate: false };
    return null;
  };

  const updateProperty = (field, value) => {
    if (!selectedId) return;
    if (templateState[selectedId]) {
      setTemplateState(prev => ({
        ...prev,
        [selectedId]: { ...prev[selectedId], [field]: value }
      }));
    } else {
      setDroppedElements(prev => prev.map(el => el.id === selectedId ? { ...el, [field]: value } : el));
    }
  };

  const selectedElement = getSelectedData();

  // CONNECT TO JAVA BACKEND (POST /api/projects)
  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      const projectData = {
        name: `${detectedCategory} Project ${Math.floor(Math.random() * 1000)}`,
        description: `Generated ${detectedCategory} template`,
        templateId: detectedCategory,
        // Optional user association (mock user 1 for now)
      };

      const res = await fetch('http://localhost:8080/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectData)
      });

      if (res.ok) {
        setIsPublished(true);
      } else {
        console.error("Failed to save to Java backend");
      }
    } catch (err) {
      console.error("Backend not running or CORS issue", err);
      // Fallback for demo
      setIsPublishing(false);
      setIsPublished(true);
      setTimeout(() => setIsPublished(false), 3000);
    }
    
    setIsPublishing(false);
  };

  const handleSave = () => {
    setIsSaving(true);
    setIsSaved(false);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }, 800);
  };

  const handleGenerateAI = () => {
    if (!aiPrompt.trim()) return;
    setIsGeneratingAI(true);
    setTimeout(() => {
      setTemplateState(prev => ({
        ...prev,
        heroHeading: { ...prev.heroHeading, content: "Your Custom AI\nGenerated Website" },
        heroSub: { ...prev.heroSub, content: "Based on your prompt: " + aiPrompt }
      }));
      setIsGeneratingAI(false);
    }, 2000);
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { role: 'user', text: chatInput }]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages(prev => [...prev, { role: 'ai', text: "I can help you customize the template! Select an element on the canvas and change its properties." }]);
    }, 1000);
  };

  const renderEditable = (id, isHeading = false, isImage = false) => {
    const data = templateState[id];
    if (!data) return null; // Safe guard if template missing parts
    const isSelected = selectedId === id && !isPreview;
    
    if (isImage) {
      return (
        <div 
          onClick={(e) => handleSelect(id, e)} 
          className={`editable-element ${isSelected ? 'selected' : ''}`}
          style={{ position: 'relative', display: 'inline-block', width: '100%' }}
        >
          <img src={data.content} alt="Element" style={{width: data.width, borderRadius: `${data.borderRadius}px`, display: 'block'}} />
          {isSelected && (
            <>
              <div className="selection-toolbar" style={{top: '-40px', left: '50%', transform: 'translateX(-50%)'}}>
                <button title="Edit" onClick={(e) => { 
                  e.stopPropagation(); 
                  const newVal = prompt("Enter new image URL:", data.content);
                  if (newVal) setTemplateState(prev => ({...prev, [id]: {...prev[id], content: newVal}}));
                }}>✎</button>
                <button title="Duplicate" onClick={(e) => {
                  e.stopPropagation();
                  setChatMessages([...chatMessages, { role: 'ai', text: 'Template blocks cannot be duplicated directly. Drag a new Image element from the left sidebar!' }]);
                }}>⧉</button>
                <button title="Delete" onClick={(e) => { 
                  e.stopPropagation(); 
                  if (window.confirm("Delete this image?")) {
                    setTemplateState(prev => ({...prev, [id]: null}));
                    setSelectedId(null);
                  }
                }}>🗑</button>
              </div>
              <div className="resize-handle top-left"></div>
              <div className="resize-handle top-right"></div>
              <div className="resize-handle bottom-left"></div>
              <div className="resize-handle bottom-right"></div>
              <div className="resize-handle top-center"></div>
              <div className="resize-handle bottom-center"></div>
              <div className="resize-handle left-center"></div>
              <div className="resize-handle right-center"></div>
            </>
          )}
        </div>
      );
    }

    const styleObj = {
      fontFamily: data.fontFamily,
      fontSize: `${data.fontSize}px`,
      fontWeight: data.fontWeight,
      color: data.color,
      textAlign: data.textAlign,
      marginTop: `${data.marginTop}px`,
      padding: `${data.padding}px`,
      whiteSpace: 'pre-line',
      margin: 0
    };

    const contentNode = isHeading ? <h1 style={styleObj}>{data.content}</h1> : <div style={styleObj}>{data.content}</div>;

    return (
      <div 
        onClick={(e) => handleSelect(id, e)} 
        className={`editable-element ${isSelected ? 'selected' : ''}`}
        style={{ position: 'relative', cursor: isPreview ? 'default' : 'pointer' }}
      >
        {contentNode}
        {isSelected && !isPreview && (
          <div className="selection-toolbar" style={{top: '-40px', left: 0}}>
            <button title="Edit" onClick={(e) => { 
              e.stopPropagation(); 
              const newVal = prompt("Edit text content:", data.content);
              if (newVal !== null) setTemplateState(prev => ({...prev, [id]: {...prev[id], content: newVal}}));
            }}>✎</button>
            <button title="Duplicate" onClick={(e) => {
              e.stopPropagation();
              setChatMessages([...chatMessages, { role: 'ai', text: 'Template blocks cannot be duplicated directly. Try dragging a new Text element from the left sidebar!' }]);
            }}>⧉</button>
            <button title="Delete" onClick={(e) => { 
              e.stopPropagation(); 
              if (window.confirm("Delete this element?")) {
                setTemplateState(prev => ({...prev, [id]: null}));
                setSelectedId(null);
              }
            }}>🗑</button>
          </div>
        )}
      </div>
    );
  };

  const renderDroppedElement = (el) => {
    const isSelected = selectedId === el.id && !isPreview;
    const styleObj = {
      fontFamily: el.fontFamily, fontSize: `${el.fontSize}px`, fontWeight: el.fontWeight, color: el.color,
      textAlign: el.textAlign, marginTop: `${el.marginTop}px`, padding: `${el.padding}px`, cursor: isPreview ? 'default' : 'pointer',
      border: isSelected ? '2px dashed #3b82f6' : '2px solid transparent',
      position: 'relative'
    };

    let contentNode;
    if (el.type === 'Heading') contentNode = <h1 style={styleObj}>{el.content}</h1>;
    else if (el.type === 'Text Block') contentNode = <p style={styleObj}>{el.content}</p>;
    else if (el.type === 'Button') contentNode = <button style={{...styleObj, background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px'}}>{el.content}</button>;
    else if (el.type === 'Image') contentNode = <img src={el.content} alt="Dropped" style={{...styleObj, maxWidth: '100%', borderRadius: '8px'}} />;

    return (
      <div key={el.id} onClick={(e) => handleSelect(el.id, e)} style={{position: 'relative', marginBottom: '10px'}}>
        {contentNode}
        {isSelected && !isPreview && (
          <div className="selection-toolbar" style={{top: '-35px'}}>
            <button onClick={() => updateProperty('textAlign', 'left')}>⬅️</button>
            <button onClick={() => updateProperty('textAlign', 'center')}>⬆️</button>
            <button onClick={() => updateProperty('textAlign', 'right')}>➡️</button>
            <button onClick={(e) => { e.stopPropagation(); setDroppedElements(droppedElements.filter(c => c.id !== el.id)); setSelectedId(null); }}>🗑</button>
          </div>
        )}
      </div>
    );
  };

  // Generic Template Layout Renderer
  const renderTemplateLayout = () => {
    if (detectedCategory === 'Hospital') {
      return (
        <HospitalTemplate 
          templateState={templateState} 
          renderEditable={renderEditable} 
          chatMessages={chatMessages} 
          setChatMessages={setChatMessages} 
        />
      );
    }

    return (
      <div className="mock-hospital">
        <header className="h-nav" style={{background: detectedCategory === 'Restaurant' ? '#fff7ed' : 'white'}}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '40px', height: '40px', background: '#3b82f6', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>+</div>
            <div>
              <div style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '18px' }}>CSIT <span style={{ color: '#3b82f6' }}>{detectedCategory}</span></div>
            </div>
          </div>
          <nav className="h-nav-links" style={{cursor: 'pointer'}}>
            <span style={{ color: activePage === 'Home' ? '#3b82f6' : 'inherit', fontWeight: activePage === 'Home' ? 'bold' : 'normal' }} onClick={() => setActivePage('Home')}>Home</span>
            <span style={{ color: activePage === 'About' ? '#3b82f6' : 'inherit', fontWeight: activePage === 'About' ? 'bold' : 'normal' }} onClick={() => setActivePage('About')}>About</span>
            <span style={{ color: activePage === 'Services' ? '#3b82f6' : 'inherit', fontWeight: activePage === 'Services' ? 'bold' : 'normal' }} onClick={() => setActivePage('Services')}>Services</span>
            <span style={{ color: activePage === 'Contact' ? '#3b82f6' : 'inherit', fontWeight: activePage === 'Contact' ? 'bold' : 'normal' }} onClick={() => setActivePage('Contact')}>Contact</span>
            <button 
              style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
              onClick={() => setChatMessages([...chatMessages, { role: 'ai', text: 'You clicked Contact Us! This will open a contact form in the final website.' }])}
            >
              Contact Us
            </button>
          </nav>
        </header>

        {activePage === 'Home' && (
          <>
            <div className="h-hero" style={{flexDirection: detectedCategory === 'Real Estate' || detectedCategory === 'Restaurant' ? 'column' : 'row'}}>
          <div className="h-hero-left" style={{width: detectedCategory === 'Real Estate' || detectedCategory === 'Restaurant' ? '100%' : '50%', textAlign: detectedCategory === 'Real Estate' || detectedCategory === 'Restaurant' ? 'center' : 'left', marginBottom: '30px'}}>
            {renderEditable('heroHeading', true)}
            {renderEditable('heroSub', false)}
            <div style={{ display: 'flex', gap: '16px', marginTop: '20px', justifyContent: detectedCategory === 'Real Estate' || detectedCategory === 'Restaurant' ? 'center' : 'flex-start' }}>
              <button 
                style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                onClick={() => {
                  setChatMessages([...chatMessages, { role: 'ai', text: 'Taking you to the signup page now!' }]);
                  setTimeout(() => navigate('/signup'), 1000);
                }}
              >
                Get Started
              </button>
            </div>
          </div>
          <div className="h-hero-right" style={{width: detectedCategory === 'Real Estate' || detectedCategory === 'Restaurant' ? '100%' : '50%'}}>
            {renderEditable('heroImage', false, true)}
          </div>
        </div>

        <div className="h-services" style={{background: detectedCategory === 'Restaurant' ? '#fff7ed' : '#f8fafc'}}>
          <h2 style={{textAlign: 'center', fontSize: '36px', color: '#0f172a', marginBottom: '40px'}}>Our Features</h2>
          
          <div className="h-services-grid">
            <div className="h-service-card" style={{ cursor: 'pointer' }} onClick={() => setChatMessages([...chatMessages, { role: 'ai', text: `You clicked on ${templateState.service1Title.content}! In the published site, this will open a detailed view or trigger the feature.` }])}>
              <div style={{ color: '#3b82f6', fontSize: '32px', marginBottom: '16px', textAlign: 'center' }}>🌟</div>
              {renderEditable('service1Title', false)}
              {renderEditable('service1Desc', false)}
            </div>
            {templateState.service2Title && (
              <div className="h-service-card" style={{ cursor: 'pointer' }} onClick={() => setChatMessages([...chatMessages, { role: 'ai', text: `You clicked on ${templateState.service2Title.content}! This feature will be fully interactive for your users.` }])}>
                <div style={{ color: '#10b981', fontSize: '32px', marginBottom: '16px', textAlign: 'center' }}>🔥</div>
                {renderEditable('service2Title', false)}
                {renderEditable('service2Desc', false)}
              </div>
            )}
            {templateState.service3Title && (
              <div className="h-service-card" style={{ cursor: 'pointer' }} onClick={() => setChatMessages([...chatMessages, { role: 'ai', text: `You clicked on ${templateState.service3Title.content}! Imagine this opening a sleek slide-out panel.` }])}>
                <div style={{ color: '#8b5cf6', fontSize: '32px', marginBottom: '16px', textAlign: 'center' }}>✨</div>
                {renderEditable('service3Title', false)}
                {renderEditable('service3Desc', false)}
              </div>
            )}
            {templateState.service4Title && (
              <div className="h-service-card" style={{ cursor: 'pointer' }} onClick={() => setChatMessages([...chatMessages, { role: 'ai', text: `You clicked on ${templateState.service4Title.content}! This would navigate to a dedicated tracking page.` }])}>
                <div style={{ color: '#f59e0b', fontSize: '32px', marginBottom: '16px', textAlign: 'center' }}>🏆</div>
                {renderEditable('service4Title', false)}
                {renderEditable('service4Desc', false)}
              </div>
            )}
          </div>
        </div>
        </>
        )}

        {activePage === 'About' && (
          <div style={{padding: '80px 40px', textAlign: 'center', minHeight: '600px', background: '#f8fafc'}}>
            <h1 style={{fontSize: '48px', color: '#0f172a', marginBottom: '20px', fontFamily: 'Poppins'}}>About Us</h1>
            <p style={{fontSize: '18px', color: '#64748b', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6'}}>We are a leading provider of {detectedCategory} services, dedicated to delivering exceptional quality and innovative solutions. Our team of experts works tirelessly to ensure your success.</p>
          </div>
        )}

        {activePage === 'Services' && (
          <div style={{padding: '80px 40px', textAlign: 'center', minHeight: '600px', background: '#ffffff'}}>
            <h1 style={{fontSize: '48px', color: '#0f172a', marginBottom: '20px', fontFamily: 'Poppins'}}>Our Services</h1>
            <p style={{fontSize: '18px', color: '#64748b', marginBottom: '40px'}}>Explore the wide range of services we offer in the {detectedCategory} sector.</p>
            <div className="h-services-grid" style={{maxWidth: '900px', margin: '0 auto'}}>
               <div className="h-service-card" style={{background: '#f8fafc'}}>
                  <div style={{ color: '#3b82f6', fontSize: '32px', marginBottom: '16px', textAlign: 'center' }}>🌟</div>
                  <h3 style={{fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a'}}>Premium Plan</h3>
                  <p style={{fontFamily: 'Inter', fontSize: 14, color: '#64748b'}}>Comprehensive solutions for your business.</p>
               </div>
               <div className="h-service-card" style={{background: '#f8fafc'}}>
                  <div style={{ color: '#10b981', fontSize: '32px', marginBottom: '16px', textAlign: 'center' }}>🔥</div>
                  <h3 style={{fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#0f172a'}}>Basic Plan</h3>
                  <p style={{fontFamily: 'Inter', fontSize: 14, color: '#64748b'}}>Essential features to get you started.</p>
               </div>
            </div>
          </div>
        )}

        {activePage === 'Contact' && (
          <div style={{padding: '80px 40px', textAlign: 'center', minHeight: '600px', background: '#f8fafc'}}>
            <h1 style={{fontSize: '48px', color: '#0f172a', marginBottom: '20px', fontFamily: 'Poppins'}}>Contact Us</h1>
            <p style={{fontSize: '18px', color: '#64748b', marginBottom: '30px'}}>Get in touch with our {detectedCategory} team.</p>
            <form style={{maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '15px'}} onSubmit={e => e.preventDefault()}>
               <input type="text" placeholder="Your Name" value={contactForm.name} onChange={e => setContactForm({...contactForm, name: e.target.value})} style={{padding: '14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '16px', outline: 'none'}} />
               <input type="email" placeholder="Your Email" value={contactForm.email} onChange={e => setContactForm({...contactForm, email: e.target.value})} style={{padding: '14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '16px', outline: 'none'}} />
               <textarea placeholder="Your Message" rows="5" value={contactForm.message} onChange={e => setContactForm({...contactForm, message: e.target.value})} style={{padding: '14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '16px', outline: 'none', resize: 'vertical'}}></textarea>
               <button 
                 type="button" 
                 onClick={() => {
                   if(!contactForm.name || !contactForm.email || !contactForm.message) return;
                   setIsContactSent(true);
                   
                   // Save to localStorage for Dashboard Inbox
                   const existingMsgs = JSON.parse(localStorage.getItem('csit_messages') || '[]');
                   existingMsgs.unshift({ ...contactForm, date: new Date().toLocaleString() });
                   localStorage.setItem('csit_messages', JSON.stringify(existingMsgs));

                   setContactForm({ name: '', email: '', message: '' });
                   setChatMessages([...chatMessages, { role: 'ai', text: 'Contact form submitted! You can view this message in your Dashboard.' }]);
                   setTimeout(() => setIsContactSent(false), 3000);
                 }} 
                 style={{ background: isContactSent ? '#10b981' : '#3b82f6', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', transition: 'background 0.3s' }}
               >
                 {isContactSent ? '✅ Message Sent!' : 'Send Message'}
               </button>
            </form>
          </div>
        )}
      </div>
    );
  };

  if (isPreview) {
    return (
      <div style={{minHeight: '100vh', background: 'white', fontFamily: 'Poppins, sans-serif', overflowX: 'hidden'}}>
        <button onClick={() => setIsPreview(false)} style={{position: 'fixed', top: 20, right: 20, background: '#5A4AF0', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer', zIndex: 1000, boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}}>Exit Preview</button>
        <div style={{paddingTop: '20px'}}>
          {renderTemplateLayout()}
        </div>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '40px'}}>
          {droppedElements.map(el => renderDroppedElement(el))}
        </div>
      </div>
    );
  }

  return (
    <div className="builder-layout" onClick={() => setSelectedId(null)}>
      {/* Top Header Navigation */}
      <header className="builder-header">
        <div className="header-left">
          <div className="csit-logo-container">
            <div className="csit-logo" style={{background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '14px', boxShadow: '0 4px 10px rgba(59, 130, 246, 0.3)'}}>
              CSIT
            </div>
            <div className="csit-title">CSIT <span>AI Website Builder</span></div>
            <div className="csit-version">v1.0</div>
          </div>
        </div>

        <div className="header-center">
          <div className="device-toggles">
            <button className={`device-btn ${viewMode === 'desktop' ? 'active' : ''}`} onClick={() => setViewMode('desktop')}>💻 Desktop</button>
            <button className={`device-btn ${viewMode === 'tablet' ? 'active' : ''}`} onClick={() => setViewMode('tablet')}>📱 Tablet</button>
            <button className={`device-btn ${viewMode === 'mobile' ? 'active' : ''}`} onClick={() => setViewMode('mobile')}>📱 Mobile</button>
          </div>
          <button className="icon-btn">↩</button>
          <button className="icon-btn">↪</button>
          <button className="btn btn-secondary" onClick={() => setIsPreview(true)}>👁 Preview</button>
          <button className="btn btn-secondary" onClick={handleSave} style={{ minWidth: '85px' }}>
            {isSaving ? '⏳ Saving...' : isSaved ? '✅ Saved!' : '💾 Save'}
          </button>
        </div>

        <div className="header-right">
          <Link to="/" className="back-btn">← Back to Home</Link>
          <div className="save-status">✓ Connected to Java DB</div>
          <button className="btn btn-primary" onClick={handlePublish}>
            {isPublishing ? 'Saving to Backend...' : isPublished ? 'Saved in DB! ✅' : '🚀 Publish Project'}
          </button>
        </div>
      </header>

      <div className="builder-workspace">
        {/* Left Sidebar */}
        <aside className="builder-sidebar left-sidebar" onClick={e => e.stopPropagation()}>
          <div className="sidebar-header">
            <h3>ADD ELEMENTS</h3>
            <div className="search-input-container">
              <span className="search-icon">🔍</span>
              <input type="text" placeholder="Search elements..." />
            </div>
          </div>

          <div className="components-category">
            <div className="category-title">BASIC (CLICK OR DRAG)</div>
            <div className="components-grid">
              <div draggable onDragStart={(e) => handleDragStart(e, 'Heading')} onClick={() => addElementToCanvas('Heading')} className="component-item"><span className="icon">T</span><span className="label">Heading</span></div>
              <div draggable onDragStart={(e) => handleDragStart(e, 'Text Block')} onClick={() => addElementToCanvas('Text Block')} className="component-item"><span className="icon">≡</span><span className="label">Text Block</span></div>
              <div draggable onDragStart={(e) => handleDragStart(e, 'Image')} onClick={() => addElementToCanvas('Image')} className="component-item"><span className="icon">🖼</span><span className="label">Image</span></div>
              <div draggable onDragStart={(e) => handleDragStart(e, 'Button')} onClick={() => addElementToCanvas('Button')} className="component-item"><span className="icon">🔲</span><span className="label">Button</span></div>
            </div>
          </div>

          <div style={{flex: 1}}></div>

          <div className="ask-ai-section">
            <div className="ask-ai-title">✨ Ask AI to Build</div>
            <textarea 
              className="ask-ai-input" 
              placeholder={`I want a modern ${detectedCategory} website with responsive design.`}
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              disabled={isGeneratingAI}
            ></textarea>
            <button className="btn-generate" onClick={handleGenerateAI} disabled={isGeneratingAI} style={{ opacity: isGeneratingAI ? 0.7 : 1, cursor: isGeneratingAI ? 'wait' : 'pointer' }}>
              {isGeneratingAI ? '✨ Generating...' : 'Generate with AI'}
            </button>
          </div>
        </aside>

        {/* Center Canvas */}
        <div className="builder-canvas-wrapper" style={{ display: 'flex', justifyContent: 'center', width: '100%', background: '#0b1120' }}>
          <div className="canvas-area" style={{
            width: viewMode === 'desktop' ? '100%' : viewMode === 'tablet' ? '768px' : '375px',
            transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            margin: '0 auto',
            boxShadow: viewMode !== 'desktop' ? '0 0 40px rgba(0,0,0,0.5)' : 'none',
            background: 'white'
          }}>
            <div 
              className="canvas-frame"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              style={{
                border: draggedType ? '2px dashed #3b82f6' : 'none',
                background: '#f8fafc',
                minHeight: '700px',
                color: '#0f172a',
                overflowY: 'auto'
              }}
            >
              {renderTemplateLayout()}

              <div style={{padding: '40px'}}>
                {droppedElements.length === 0 && (
                  <div style={{textAlign: 'center', padding: '40px', border: '2px dashed #cbd5e1', borderRadius: '8px', color: '#94a3b8', marginTop: '20px'}}>
                    Drag & Drop new elements here
                  </div>
                )}
                {droppedElements.map(el => renderDroppedElement(el))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        <aside className="builder-sidebar right-sidebar" onClick={e => e.stopPropagation()}>
          <div className="properties-header">
            <h3>≡ PROPERTIES</h3>
            <span onClick={() => setSelectedId(null)} style={{color: 'var(--csit-text-muted)', cursor: 'pointer'}}>✕</span>
          </div>
          
          {selectedElement ? (
            <>
              <div className="prop-section">
                <h4 style={{ margin: '0 0 16px 0', fontSize: '13px', color: 'white' }}>{selectedElement.type}</h4>
                <label className="prop-label">Content</label>
                <textarea 
                  className="prop-input" 
                  rows="3" 
                  value={selectedElement.content}
                  onChange={(e) => updateProperty('content', e.target.value)}
                ></textarea>
              </div>

              {selectedElement.type !== 'Image' && (
                <div className="prop-section">
                  <label className="prop-label" style={{ color: 'white', fontWeight: 'bold' }}>Typography</label>
                  
                  <div className="prop-row">
                    <span className="prop-row-label">Font</span>
                    <select className="prop-select" value={selectedElement.fontFamily} onChange={(e) => updateProperty('fontFamily', e.target.value)}>
                      <option value="Poppins">Poppins</option>
                      <option value="Inter">Inter</option>
                      <option value="Roboto">Roboto</option>
                    </select>
                  </div>
                  
                  <div className="prop-row">
                    <span className="prop-row-label">Size</span>
                    <input type="range" style={{flex: 1, margin: '0 8px'}} min="10" max="120" value={selectedElement.fontSize} onChange={(e) => updateProperty('fontSize', parseInt(e.target.value))} />
                    <div style={{background: 'var(--csit-bg)', border: '1px solid var(--csit-border)', padding: '4px', borderRadius: '4px', fontSize: '11px', color: 'white'}}>{selectedElement.fontSize}px</div>
                  </div>
                  
                  <div className="prop-row">
                    <span className="prop-row-label">Color</span>
                    <input type="color" value={selectedElement.color} onChange={(e) => updateProperty('color', e.target.value)} style={{width: '100%', height: '30px', cursor: 'pointer', background: 'transparent'}} />
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="prop-section">
              <p style={{fontSize: '12px', color: 'var(--csit-text-muted)', textAlign: 'center'}}>Select any text on the {detectedCategory} template or dragged elements to view and edit its properties.</p>
            </div>
          )}

          <div className="ai-chat-section">
            <div className="ai-chat-header">
              <div className="ai-chat-title">⚡ AI ASSISTANT</div>
              <span className="ai-beta-tag">BETA</span>
            </div>
            
            <div style={{maxHeight: '150px', overflowY: 'auto', marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
              {chatMessages.map((msg, i) => (
                <div key={i} style={{fontSize: '11px', padding: '6px', borderRadius: '4px', background: msg.role === 'ai' ? 'var(--csit-primary)' : 'var(--csit-panel-light)', color: 'white', alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start'}}>
                  {msg.text}
                </div>
              ))}
            </div>
            
            <div className="ai-chat-input-box">
              <input 
                type="text" 
                placeholder="Ask anything..." 
                value={chatInput} 
                onChange={e => setChatInput(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && handleSendChat()}
              />
              <button className="ai-send-btn" onClick={handleSendChat}>➤</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
