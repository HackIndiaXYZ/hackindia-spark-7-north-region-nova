import React, { useState, useEffect } from 'react';
import { Bell, Clock, Users, UserCheck, AlertCircle } from 'lucide-react';
// import { io } from 'socket.io-client';

const PatientDashboard = () => {
  // Dummy State for Hackathon
  const [position, setPosition] = useState(3);
  const [patientsAhead, setPatientsAhead] = useState(2);
  const [waitTime, setWaitTime] = useState(10);
  const [doctorStatus, setDoctorStatus] = useState('Available');
  const [notification, setNotification] = useState('Welcome! Please wait for your turn.');

  useEffect(() => {
    // Placeholder for backend real-time updates
    /*
    const socket = io('http://localhost:5000');
    socket.on('queue-update', (data) => {
      setPosition(data.newPosition);
      // Update other states dynamically
    });
    return () => socket.disconnect();
    */
    
    // Simulate queue moving after 10 seconds for demo
    const timer = setTimeout(() => {
      if (position > 1) {
        setPosition(pos => pos - 1);
        setPatientsAhead(p => p - 1);
        setWaitTime(w => w - 5);
        setNotification('Queue moved! You are getting closer.');
      }
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [position]);

  // Determine badge color based on status
  const getStatusColor = () => {
    switch(doctorStatus.toLowerCase()) {
      case 'available': return 'var(--success)';
      case 'busy': return '#f59e0b';
      case 'delayed': return 'var(--danger)';
      default: return 'var(--text-light)';
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-off)', minHeight: 'calc(100vh - 73px)', padding: '2rem' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        
        {/* Dynamic Notification Banner */}
        {notification && (
          <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', color: '#1e40af', padding: '1rem', borderRadius: '0.75rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', boxShadow: 'var(--shadow-sm)' }}>
            <AlertCircle size={20} />
            <span style={{ fontWeight: '500' }}>{notification}</span>
          </div>
        )}

        {/* Token Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <p style={{ margin: '0 0 0.25rem 0', color: 'var(--text-light)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Token</p>
            <h2 style={{ color: 'var(--text-dark)', margin: 0, fontSize: '2rem', letterSpacing: '-0.5px' }}>A-105</h2>
          </div>
          <button style={{ backgroundColor: 'white', border: '1px solid var(--border)', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
            <Bell size={20} color="var(--text-light)" />
          </button>
        </div>

        {/* Main Position Card */}
        <div className="card" style={{ backgroundColor: 'var(--primary)', color: 'white', border: 'none', padding: '3rem 2rem', textAlign: 'center', marginBottom: '2rem', boxShadow: '0 20px 25px -5px rgb(2 132 199 / 0.4), 0 8px 10px -6px rgb(2 132 199 / 0.4)' }}>
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', opacity: 0.9, fontWeight: '500' }}>Current Position</p>
          <h1 style={{ fontSize: '6rem', margin: 0, lineHeight: 1, letterSpacing: '-2px' }}>{position}</h1>
          {position === 1 && <p style={{ margin: '1rem 0 0 0', backgroundColor: 'rgba(255,255,255,0.2)', display: 'inline-block', padding: '0.5rem 1.5rem', borderRadius: '999px', fontWeight: 'bold' }}>You're Next!</p>}
        </div>

        {/* Secondary Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem' }}>
            <div style={{ padding: '0.75rem', backgroundColor: 'var(--secondary)', borderRadius: '0.5rem' }}><Users color="var(--primary)" /></div>
            <div>
              <p style={{ margin: 0, color: 'var(--text-light)', fontSize: '0.875rem' }}>Patients Ahead</p>
              <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-dark)' }}>{patientsAhead}</p>
            </div>
          </div>
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem' }}>
            <div style={{ padding: '0.75rem', backgroundColor: 'var(--secondary)', borderRadius: '0.5rem' }}><Clock color="var(--primary)" /></div>
            <div>
              <p style={{ margin: 0, color: 'var(--text-light)', fontSize: '0.875rem' }}>Est. Wait Time</p>
              <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-dark)' }}>~{waitTime}m</p>
            </div>
          </div>
        </div>

        {/* Doctor Status */}
        <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <UserCheck color="var(--text-light)" />
            <span style={{ fontWeight: '500', color: 'var(--text-dark)' }}>Doctor Status</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: getStatusColor() }}></span>
            <span style={{ fontWeight: 'bold', color: 'var(--text-dark)' }}>{doctorStatus}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PatientDashboard;
