'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/navbar';
import { useSession } from 'next-auth/react';
export default function HomePage() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const { data: session } = useSession();

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

  const appFlow = [
    {
      step: 1,
      title: "Sign In Securely",
      description: "Create your account using Google authentication for secure access to your personal health dashboard.",
      icon: "🔐",
      details: "Your data is encrypted and HIPAA compliant. We never store your personal information without consent."
    },
    {
      step: 2,
      title: "Upload Your Image",
      description: "Take a clear photo of your skin concern or upload an existing image from your device.",
      icon: "📸",
      details: "Use good lighting and ensure the area of concern is clearly visible. Supported formats: JPG, PNG, HEIC."
    },
    {
      step: 3,
      title: "AI Analysis",
      description: "Our advanced AI model analyzes your image using deep learning algorithms trained on extensive dermatological datasets.",
      icon: "🧠",
      details: "The analysis typically takes 15-30 seconds and provides detailed insights about potential skin conditions."
    },
    {
      step: 4,
      title: "Review Results",
      description: "Get comprehensive results with risk categorization, confidence levels, and actionable recommendations.",
      icon: "📊",
      details: "Results include visual analysis, risk assessment (Low/Medium/High), and suggested next steps."
    },
    {
      step: 5,
      title: "Track & Monitor",
      description: "Save your results to your personal dashboard for ongoing monitoring and sharing with healthcare providers.",
      icon: "📈",
      details: "Export reports as PDF, schedule follow-ups, and maintain a complete history of your skin health journey."
    }
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

  const AboutModal = () => {
    if (!isAboutModalOpen) return null;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem',
        overflowY: 'auto'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative'
        }}>
          {/* Header */}
          <div style={{
            position: 'sticky',
            top: 0,
            backgroundColor: 'white',
            padding: '2rem 2rem 1rem',
            borderBottom: '1px solid #e5e7eb',
            borderRadius: '1rem 1rem 0 0'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
                  About SkinSafeAI
                </h2>
                <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
                  Your Complete Guide to AI-Powered Skin Health Analysis
                </p>
              </div>
              <button 
                onClick={() => setIsAboutModalOpen(false)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  fontSize: '2rem', 
                  cursor: 'pointer',
                  color: '#9ca3af',
                  padding: '0.5rem'
                }}
              >
                ×
              </button>
            </div>
          </div>

          <div style={{ padding: '2rem' }}>
            {/* How It Works Section */}
            <section style={{ marginBottom: '3rem' }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ color: '#2563eb' }}>🚀</span>
                How SkinSafeAI Works
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {appFlow.map((step, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    gap: '1.5rem',
                    padding: '1.5rem',
                    backgroundColor: index % 2 === 0 ? '#f8fafc' : 'white',
                    borderRadius: '0.75rem',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div style={{
                      minWidth: '60px',
                      height: '60px',
                      backgroundColor: '#2563eb',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      color: 'white',
                      fontWeight: 'bold',
                      flexShrink: 0
                    }}>
                      {step.step}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.75rem'
                      }}>
                        <span style={{ fontSize: '1.5rem' }}>{step.icon}</span>
                        <h4 style={{
                          fontSize: '1.25rem',
                          fontWeight: '600',
                          color: '#1f2937',
                          margin: 0
                        }}>
                          {step.title}
                        </h4>
                      </div>
                      <p style={{
                        color: '#4b5563',
                        marginBottom: '0.75rem',
                        fontSize: '1rem',
                        lineHeight: '1.6'
                      }}>
                        {step.description}
                      </p>
                      <p style={{
                        color: '#6b7280',
                        fontSize: '0.9rem',
                        fontStyle: 'italic',
                        margin: 0
                      }}>
                        {step.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Important Medical Disclaimer */}
            <section style={{ marginBottom: '3rem' }}>
              <div style={{
                backgroundColor: '#fef3c7',
                border: '2px solid #f59e0b',
                borderRadius: '0.75rem',
                padding: '2rem'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#92400e',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span>⚠</span>
                  Important Medical Disclaimer
                </h3>
                
                <div style={{ color: '#92400e', lineHeight: '1.7', fontSize: '1rem' }}>
                  <p style={{ marginBottom: '1rem', fontWeight: '600' }}>
                    SkinSafeAI is an AI-powered tool designed to assist in skin condition analysis, but it has important limitations:
                  </p>
                  
                  <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                    <li style={{ marginBottom: '0.5rem' }}>
                      <strong>Not a replacement for medical diagnosis:</strong> Our AI model cannot provide definitive medical diagnoses and should not replace professional medical consultation.
                    </li>
                    <li style={{ marginBottom: '0.5rem' }}>
                      <strong>Accuracy limitations:</strong> While our model shows good accuracy in testing, AI systems can make errors and may miss certain conditions.
                    </li>
                    <li style={{ marginBottom: '0.5rem' }}>
                      <strong>Emergency situations:</strong> If you notice rapid changes, bleeding, pain, or other concerning symptoms, seek immediate medical attention.
                    </li>
                    <li style={{ marginBottom: '0.5rem' }}>
                      <strong>Regular screening important:</strong> Continue regular dermatological check-ups as recommended by your healthcare provider.
                    </li>
                  </ul>

                  <div style={{
                    backgroundColor: '#fed7d7',
                    border: '1px solid #f56565',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    marginTop: '1rem'
                  }}>
                    <p style={{ margin: 0, fontWeight: '600', color: '#c53030' }}>
                      🚨 ALWAYS consult with a qualified dermatologist or healthcare provider for suspicious skin conditions, 
                      especially if the AI suggests medium or high risk levels.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Technical Information */}
            <section style={{ marginBottom: '2rem' }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ color: '#2563eb' }}>🔬</span>
                Technical Details
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem'
              }}>
                <div style={{
                  backgroundColor: '#f8fafc',
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  border: '1px solid #e2e8f0'
                }}>
                  <h4 style={{ color: '#1f2937', fontWeight: '600', marginBottom: '1rem' }}>
                    🤖 AI Model Information
                  </h4>
                  <ul style={{ color: '#4b5563', fontSize: '0.9rem', lineHeight: '1.6', paddingLeft: '1rem' }}>
                    <li>Deep learning convolutional neural network</li>
                    <li>Trained on 100,000+ dermatological images</li>
                    <li>Validated by medical professionals</li>
                    <li>Continuous learning and improvement</li>
                  </ul>
                </div>

                <div style={{
                  backgroundColor: '#f0fdf4',
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  border: '1px solid #d1fae5'
                }}>
                  <h4 style={{ color: '#1f2937', fontWeight: '600', marginBottom: '1rem' }}>
                    🔒 Privacy & Security
                  </h4>
                  <ul style={{ color: '#4b5563', fontSize: '0.9rem', lineHeight: '1.6', paddingLeft: '1rem' }}>
                    <li>HIPAA compliant data handling</li>
                    <li>End-to-end encryption</li>
                    <li>No image storage without consent</li>
                    <li>Secure Google authentication</li>
                  </ul>
                </div>

                <div style={{
                  backgroundColor: '#fef7ff',
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  border: '1px solid #e9d5ff'
                }}>
                  <h4 style={{ color: '#1f2937', fontWeight: '600', marginBottom: '1rem' }}>
                    📋 Supported Conditions
                  </h4>
                  <ul style={{ color: '#4b5563', fontSize: '0.9rem', lineHeight: '1.6', paddingLeft: '1rem' }}>
                    <li>Melanoma detection</li>
                    <li>Basal cell carcinoma</li>
                    <li>Squamous cell carcinoma</li>
                    <li>Benign nevus identification</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              backgroundColor: 'linear-gradient(135deg, #dbeafe 0%, #e0f2fe 100%)',
              borderRadius: '0.75rem',
              border: '1px solid #bfdbfe'
            }}>
              <p style={{ color: '#1e40af', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                Ready to take control of your skin health with AI-powered insights?
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={() => {
                    setIsAboutModalOpen(false);
                    setIsLoginModalOpen(true);
                  }}
                  style={{
                    backgroundColor: '#2563eb',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  Get Started Now
                </button>
                <button
                  onClick={() => setIsAboutModalOpen(false)}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#2563eb',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    border: '2px solid #2563eb',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}

      <Navbar />
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

            AI that sees what you can&apos;t {' '}
            <span style={{ 
              background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #0891b2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              protecting your skin, protecting you.
            </span>

          </h1>
          </div>

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

          {session && <div style={{ gap: '1rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <Link href="/upload" style={{ textDecoration: 'none' }}>
              <button
                style={{
                  backgroundColor: isHovered ? "#1e40af" : "#2563eb",
                  color: "white",
                  padding: "1rem 2rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  fontWeight: "600",
                  fontSize: "1.125rem",
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                🔬 Get Started 
              </button>
            </Link>

            <button
              onClick={() => setIsAboutModalOpen(true)}
              style={{
                backgroundColor: "transparent",
                color: "#2563eb",
                padding: "1rem 2rem",
                borderRadius: "0.5rem",
                border: "2px solid #2563eb",
                fontWeight: "600",
                fontSize: "1.125rem",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
              }}
            >
              📖 About Us & How It Works
            </button>
          </div>

          {/* Add Dashboard Button */}
      

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
        </div>}
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
          {!session && <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              style={{
                border: "2px solid white",
                color: "white",
                backgroundColor: "#2563eb",
                padding: "1rem",
                borderRadius: "0.5rem",
                fontWeight: "600",
                fontSize: "1.125rem",
                cursor: "pointer",
              }}
            >
              Start Trial
            </button>
          </div>}
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
                  <button 
                    onClick={() => setIsAboutModalOpen(true)}
                    style={{ 
                      color: '#9ca3af', 
                      textDecoration: 'none', 
                      background: 'none', 
                      border: 'none', 
                      cursor: 'pointer',
                      padding: 0,
                      fontSize: 'inherit'
                    }}
                  >
                    About Us
                  </button>
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

      {/* About Modal */}
      <AboutModal />
    </div>
  );
}