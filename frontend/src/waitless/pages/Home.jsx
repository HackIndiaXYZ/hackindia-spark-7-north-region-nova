import React from 'react';
import { Link } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard';

const Home = () => {
  return (
    <>
      <section id="home" className="hero" style={{ minHeight: '600px' }}>
        <div className="hero-content">
          <h1 style={{ fontSize: '56px', marginBottom: '24px' }}>Skip the Waiting Room Chaos</h1>
          <p style={{ fontSize: '22px', marginBottom: '40px' }}>Experience hassle-free hospital visits with our intelligent QR-based queue management system. Know exactly when it's your turn.</p>
          
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary btn-lg" style={{ padding: '16px 32px', fontSize: '18px', boxShadow: 'var(--shadow-md)', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>Get Started for Free</Link>
            <Link to="/pricing" className="btn btn-outline btn-lg" style={{ padding: '16px 32px', fontSize: '18px', backgroundColor: 'var(--white)' }}>View Pricing</Link>
          </div>
        </div>
      </section>

      <section id="partner-hospitals" className="features" style={{ backgroundColor: 'var(--white)' }}>
        <div className="container">
          <div className="section-title">
            <h2>Trusted by Top Hospitals</h2>
            <p>Join the network of forward-thinking healthcare providers</p>
          </div>
          
          <div className="hospital-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--spacing-lg)' }}>
            <div className="card hospital-card" style={{ padding: 0, overflow: 'hidden', transition: 'transform 0.3s' }}>
              <img src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&q=80" alt="City General" style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
              <div style={{ padding: '16px' }}>
                <h3 style={{ margin: '0 0 8px 0' }}>City General Hospital</h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px' }}>Mumbai, Maharashtra</p>
              </div>
            </div>
            <div className="card hospital-card" style={{ padding: 0, overflow: 'hidden', transition: 'transform 0.3s' }}>
              <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80" alt="St. Mary's" style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
              <div style={{ padding: '16px' }}>
                <h3 style={{ margin: '0 0 8px 0' }}>St. Mary's Medical Centre</h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px' }}>Pune, Maharashtra</p>
              </div>
            </div>
            <div className="card hospital-card" style={{ padding: 0, overflow: 'hidden', transition: 'transform 0.3s' }}>
              <img src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&q=80" alt="Apollo Wellness" style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
              <div style={{ padding: '16px' }}>
                <h3 style={{ margin: '0 0 8px 0' }}>Apollo Wellness Clinic</h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px' }}>Bangalore, Karnataka</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="features" style={{ backgroundColor: 'var(--gray-50)' }}>
        <div className="container">
          <div className="section-title">
            <h2>Powerful Features</h2>
            <p>Everything you need for a seamless hospital experience</p>
          </div>
          
          <div className="features-grid">
            <FeatureCard 
              icon="📊" 
              title="Live Queue Tracking" 
              description="Monitor your position in real-time. See exactly how many patients are ahead of you and get instant updates as the queue moves." 
            />
            <FeatureCard 
              icon="⏱️" 
              title="Estimated Wait Time" 
              description="Get accurate wait time predictions based on real hospital data. Plan your time effectively and never waste precious minutes waiting around." 
            />
            <FeatureCard 
              icon="📱" 
              title="QR-Based Entry" 
              description="Simply scan a QR code at the reception to join the digital queue instantly. No paperwork, no standing in lines, pure convenience." 
            />
          </div>
        </div>
      </section>

      <section id="how-it-works" className="steps" style={{ backgroundColor: 'var(--white)' }}>
        <div className="container">
          <div className="section-title">
            <h2>How It Works</h2>
            <p>Just three simple steps to skip the queue</p>
          </div>
          
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Scan QR Code</h3>
              <p>Upon arrival at the hospital, simply scan the unique QR code at the reception desk using your smartphone camera or dedicated app.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Join the Queue</h3>
              <p>Your profile automatically joins the digital queue for your selected department or doctor. No manual registration or waiting at counters needed.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Track Your Status</h3>
              <p>Watch your queue position update in real-time and receive notifications when you're next. Head to your appointment exactly when called.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pricing-preview" style={{ padding: 'var(--spacing-2xl) 0', backgroundColor: 'var(--primary)', color: 'var(--white)', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'var(--white)', marginBottom: 'var(--spacing-md)' }}>Ready to transform your hospital?</h2>
          <p style={{ color: 'var(--primary-light)', fontSize: '20px', marginBottom: 'var(--spacing-xl)', maxWidth: '600px', margin: '0 auto 32px' }}>
            Join hundreds of hospitals providing a better experience for their patients. Simple pricing, powerful results.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link to="/pricing" className="btn" style={{ backgroundColor: 'var(--white)', color: 'var(--primary)', padding: '12px 24px', fontSize: '18px' }}>See Pricing Plans</Link>
            <Link to="/contact" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.5)', color: 'var(--white)', padding: '12px 24px', fontSize: '18px' }}>Contact Sales</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
