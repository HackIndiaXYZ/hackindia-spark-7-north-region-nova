import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <main>
      <section className="page-header" style={{ textAlign: 'center' }}>
        <div className="container">
          <h1 className="page-title">About WaitLess</h1>
          <p className="page-subtitle">Revolutionizing the hospital waiting experience</p>
        </div>
      </section>

      <section className="container" style={{ padding: 'var(--spacing-2xl) 0', maxWidth: '800px' }}>
        <div className="card" style={{ marginBottom: 'var(--spacing-xl)' }}>
          <h2>The Problem</h2>
          <p>
            Hospitals are busy places, and waiting rooms are often crowded, stressful, and unpredictable. Patients spend hours not knowing when their turn will come, increasing anxiety and risk of cross-infection.
          </p>
        </div>

        <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
          <h2>Our Solution</h2>
          <p>
            WaitLess replaces physical queues with intelligent digital tokens. By scanning a simple QR code, patients join a virtual queue that they can track in real-time from anywhere. 
          </p>
          <ul style={{ paddingLeft: 'var(--spacing-lg)', marginTop: 'var(--spacing-md)', color: 'var(--text-secondary)' }}>
            <li style={{ marginBottom: '8px' }}>Reduce waiting room congestion by up to 70%</li>
            <li style={{ marginBottom: '8px' }}>Provide accurate, real-time wait estimates</li>
            <li style={{ marginBottom: '8px' }}>Improve patient satisfaction and operational efficiency</li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default About;
