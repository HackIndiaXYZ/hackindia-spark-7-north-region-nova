import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PatientDashboard = () => {
  const myToken = 9; // Simulated user token
  const avgTimePerPatient = 15; // minutes

  const [queueState, setQueueState] = useState(() => {
    const saved = localStorage.getItem('globalQueue');
    if (saved) return JSON.parse(saved);
    return { currentServing: 8, queue: [8, 9, 10, 11, 12] };
  });

  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem('globalQueue');
      if (saved) setQueueState(JSON.parse(saved));
    };

    window.addEventListener('storage', handleStorage);
    
    const interval = setInterval(() => {
      const saved = localStorage.getItem('globalQueue');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.currentServing !== queueState.currentServing || parsed.queue.length !== queueState.queue.length) {
          setQueueState(parsed);
        }
      }
    }, 2000);

    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, [queueState.currentServing, queueState.queue.length]);

  const { currentServing, queue } = queueState;

  // Determine status logic based on requirements
  let status = "Waiting";
  let badgeClass = "chip-waiting";
  
  if (!queue.includes(myToken)) {
    status = "Cancelled";
    badgeClass = "chip-served"; // gray
  } else if (myToken < currentServing) {
    status = "Missed";
    badgeClass = "chip-served"; // we'll override color inline
  } else if (myToken === currentServing) {
    status = "Now Serving";
    badgeClass = "chip-active";
  } else if (myToken === currentServing + 1) {
    status = "You are next";
    badgeClass = "chip-next";
  }

  const estimatedTime = Math.max(0, (myToken - currentServing) * avgTimePerPatient);

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Patient Dashboard</h1>
          <p className="page-subtitle">Welcome back! Here are your active appointments.</p>
        </div>
      </section>

      <main className="container" style={{ marginBottom: 'var(--spacing-2xl)' }}>
        <div className="card" style={{ borderLeft: myToken === currentServing ? '4px solid var(--success)' : myToken < currentServing ? '4px solid var(--danger)' : '4px solid var(--primary)', padding: 'var(--spacing-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--spacing-md)' }}>
            
            <div>
              <h2 style={{ marginBottom: '8px' }}>Active Appointment</h2>
              <p style={{ margin: '0 0 4px 0', color: 'var(--text-primary)', fontWeight: 'bold' }}>🏥 City General Hospital</p>
              <p style={{ margin: '0 0 16px 0', color: 'var(--text-secondary)' }}>👨‍⚕️ Dr. Arjun Mehta - General Physician</p>
              
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
                <div style={{ background: 'var(--gray-50)', padding: '12px 24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <p style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-secondary)', margin: '0 0 4px 0', fontWeight: 'bold' }}>Your Token</p>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: 'var(--primary-dark)' }}>#{myToken}</p>
                </div>
                <div style={{ background: 'var(--gray-50)', padding: '12px 24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <p style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-secondary)', margin: '0 0 4px 0', fontWeight: 'bold' }}>Current Serving</p>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: 'var(--text-primary)' }}>#{currentServing}</p>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span className={`status-chip ${badgeClass}`} style={{ fontSize: '16px', padding: '8px 16px', display: 'inline-block', marginBottom: '16px', ...(status === 'Missed' ? {background: '#fef2f2', color: '#991b1b'} : {}) }}>
                {status}
              </span>
              
              {status === "Waiting" || status === "You are next" ? (
                <div>
                  <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: 'var(--text-secondary)' }}>Estimated Wait Time</p>
                  <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: 'var(--text-primary)' }}>Approx wait: {estimatedTime} min</p>
                </div>
              ) : null}
            </div>

          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '16px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
            <Link to="/queue" className="btn btn-primary">📊 View Live Queue</Link>
            <Link to="/hospital" className="btn btn-outline">➕ Join New Queue</Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default PatientDashboard;
