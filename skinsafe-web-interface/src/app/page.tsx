'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/navbar';
export default function HomePage() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: "🔬",
      title: "AI-Powered Analysis",
      description: "Deep learning algorithms trained on over 100,000 dermatological images for precise skin condition detection.",
      accuracy: "Good"
    },
    {
      icon: "⚡",
      title: "Instant Results",
      description: "Get comprehensive skin analysis results in under 30 seconds with detailed risk categorization.",
      accuracy: "< 30s"
    },
    // {
    //   icon: "🏥",
    //   title: "Clinical Grade",
    //   description: "FDA-compliant analysis designed to assist healthcare professionals in clinical decision making.",
    //   accuracy: "FDA Ready"
    // },
    {
      icon: "📊",
      title: "Risk Assessment",
      description: "Clear High, Medium, Low risk categorization with actionable recommendations for patient care.",
      accuracy: "3 Levels"
    }
  ];

  const stats = [
    { number: "Good", label: "Accuracy Rate", suffix: "" },
    { number: "100K", label: "Images Analyzed", suffix: "+" },
    { number: "500", label: "Healthcare Providers", suffix: "+" },
    { number: "30", label: "Analysis Time", suffix: "s" }
  ];

  const LoginModal = () => {
    if (!isLoginModalOpen) return null;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem'
      }}>
        <div style={{
          
          backgroundColor: 'white',
          borderRadius: '1rem',
          maxWidth: '400px',
          width: '100%',
          padding: '2rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>Sign In to SkinSafeAI</h2>
            <button 
              onClick={() => setIsLoginModalOpen(false)}
              style={{ 
                background: 'none', 
                border: 'none', 
                fontSize: '1.5rem', 
                cursor: 'pointer',
                color: '#9ca3af'
              }}
            >
              ×
            </button>
          </div>
          
          <Link href="/login" style={{ textDecoration: 'none' }}>
            <div style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              textAlign: 'center',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              Sign In
            </div>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      
      <Navbar  />
      {/* Hero Section */}
      <section style={{ 
        padding: '5rem 1rem',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '800',
            color: '#111827',
            marginBottom: '1.5rem',
            lineHeight: '1.1'
          }}>
            AI that sees what you can’t {' '}
            <span style={{ 
              background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #0891b2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              protecting your skin, protecting you.
            </span>
          </h1>
          
          <p style={{
            fontSize: '1.25rem',
            color: '#4b5563',
            maxWidth: '768px',
            margin: '0 auto 2rem',
            lineHeight: '1.7'
          }}>
            Clinical decision support system powered by deep learning to assist skin cancer 
            in detecting and classifying skin conditions with <strong>Excellent Accuracy</strong>
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
            <Link href="/upload" style={{ textDecoration: 'none' }}>
   



                <button
                  style={{
                    backgroundColor: isHovered ? "#1e40af" : "#2563eb", // darker on hover
                    color: "white",
                    padding: "1rem 2rem",
                    borderRadius: "0.5rem",
                    border: "none",
                    fontWeight: "600",
                    fontSize: "1.125rem",
                    cursor: "pointer",
                   
                    transition: "all 0.2s ease-in-out", // smooth animation
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  🔬 Get Started 
                </button>
              

                        </Link>
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            maxWidth: '1024px',
            margin: '0 auto'
          }}>
            {stats.map((stat, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: '#2563eb',
                  marginBottom: '0.5rem'
                }}>
                  {stat.number}{stat.suffix}
                </div>
                <div style={{
                  fontSize: '1rem',
                  color: '#4b5563'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '5rem 1rem', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: '1rem'
            }}>
              Advanced Diagnostic Capabilities
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: '#4b5563',
              maxWidth: '768px',
              margin: '0 auto'
            }}>
              Experience the future of Skin Cancer analysis with our state-of-the-art AI technology
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {features.map((feature, index) => (
              <div 
                key={index}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  border: activeFeature === index ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setActiveFeature(index)}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{feature.icon}</div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '0.75rem'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: '#4b5563',
                  marginBottom: '1rem',
                  lineHeight: '1.6'
                }}>
                  {feature.description}
                </p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#dbeafe',
                  color: '#1e40af',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  {feature.accuracy}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '5rem 1rem',
        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #0891b2 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem'
          }}>
            Ready to Transform Your Practice?
          </h2>
          <p style={{
            fontSize: '1.25rem',
            marginBottom: '2rem',
            maxWidth: '512px',
            margin: '0 auto 2rem',
            opacity: 0.9
          }}>
            Join hundreds of healthcare providers using SkinSafeAI to improve diagnostic accuracy and patient outcomes.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setIsLoginModalOpen(true)}
              style={{
                border: "2px solid white",
        
                color: "white" , // text changes
                backgroundColor: "#2563eb",  // blue on hover
                padding: "1rem ",
                borderRadius: "0.5rem",
                fontWeight: "600",
                fontSize: "1.125rem",
                cursor: "pointer",
              }}
            >
              Start Free Trial
            </button>
          <button
      style={{
        border: "2px solid white",
        
         color: "#2563eb" , // text changes
        backgroundColor: "white",  // blue on hover
        padding: "1rem ",
        borderRadius: "0.5rem",
        fontWeight: "600",
        fontSize: "1.125rem",
        cursor: "pointer",
      
      }}
    >
      Schedule Demo
    </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#111827', color: 'white', padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  backgroundColor: '#2563eb',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.25rem' }}>S</span>
                </div>
                <span style={{ marginLeft: '0.75rem', fontSize: '1.25rem', fontWeight: 'bold' }}>
                  SkinSafeAI
                </span>
              </div>
              <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>
                Advancing dermatology through artificial intelligence and precision medicine.
              </p>
            </div>
            
            <div>
              <h4 style={{ fontWeight: '600', marginBottom: '1rem' }}>Product</h4>
              <ul style={{ listStyle: 'none', padding: 0, color: '#9ca3af' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Features</a>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Technology</a>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Pricing</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 style={{ fontWeight: '600', marginBottom: '1rem' }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0, color: '#9ca3af' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>About</a>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Research</a>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Contact</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontWeight: '600', marginBottom: '1rem' }}>Support</h4>
              <ul style={{ listStyle: 'none', padding: 0, color: '#9ca3af' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Documentation</a>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Help Center</a>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div style={{
            borderTop: '1px solid #374151',
            marginTop: '3rem',
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
              © 2025 SkinSafeAI. All rights reserved. FDA registration pending.
            </p>
            <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
              Professional medical device - For use by licensed healthcare providers only
            </p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <LoginModal />
    </div>
  );
}