import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const totalTokens = 12;
  const [currentServing, setCurrentServing] = useState(() => {
    return parseInt(localStorage.getItem('currentToken')) || 8;
  });

  useEffect(() => {
    // Sync with localStorage
    const handleStorage = () => {
      const token = parseInt(localStorage.getItem('currentToken'));
      if (token && token !== currentServing) {
        setCurrentServing(token);
      }
    };
    
    // Also poll for changes (since same-window might not trigger 'storage' event)
    const interval = setInterval(() => {
      const token = parseInt(localStorage.getItem('currentToken'));
      if (token && token !== currentServing) {
        setCurrentServing(token);
      }
    }, 1000);

    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, [currentServing]);

  const served = currentServing - 1;
  const waiting = totalTokens - currentServing;

  // Generate dynamic patient list
  const patients = Array.from({ length: totalTokens }, (_, i) => {
    const num = i + 1;
    return { 
      token: `#${num}`, 
      name: num === 8 ? 'Ramesh Sharma' : num === 9 ? 'Anita Desai' : `Patient ${num}`, 
      age: 30 + (num % 30), 
      gender: num % 2 === 0 ? 'M' : 'F', 
      time: `10:${num < 10 ? '0' + num : num} AM`, 
      wait: num > currentServing ? `~${(num - currentServing) * 15} min` : '—' 
    };
  });

  const handleNext = () => {
    if (currentServing < totalTokens) {
      const next = currentServing + 1;
      setCurrentServing(next);
      localStorage.setItem('currentToken', next);
    }
  };

  const currentPatient = patients.find(p => p.token === `#${currentServing}`) || patients[patients.length - 1];
  const nextPatient = currentServing < totalTokens ? patients.find(p => p.token === `#${currentServing + 1}`) : null;

  return (
    <>
      <section className="page-header">
        <div className="container dashboard-header-row">
          <div>
            <h1 className="page-title">Admin Dashboard</h1>
            <p className="page-subtitle">City General Hospital &nbsp;·&nbsp; OPD Queue Management &nbsp;·&nbsp; 28 April 2025</p>
          </div>
          <div className="dashboard-header-meta">
            <span className="live-badge">🟢 Live</span>
            <span className="last-updated">Last updated: 11:47 AM</span>
          </div>
        </div>
      </section>

      <main className="container admin-section">
        <div className="stats-row">
          <div className="card stat-card">
            <p className="stat-card-icon">🎫</p>
            <p className="stat-card-value">{totalTokens}</p>
            <p className="stat-card-label">Total Tokens</p>
          </div>
          <div className="card stat-card">
            <p className="stat-card-icon">✅</p>
            <p className="stat-card-value">{served}</p>
            <p className="stat-card-label">Served</p>
          </div>
          <div className="card stat-card">
            <p className="stat-card-icon">⏳</p>
            <p className="stat-card-value">{waiting}</p>
            <p className="stat-card-label">Waiting</p>
          </div>
          <div className="card stat-card stat-card-active">
            <p className="stat-card-icon">🩺</p>
            <p className="stat-card-value">#{currentServing}</p>
            <p className="stat-card-label">Now Serving</p>
          </div>
        </div>

        <div className="card current-patient-card">
          <div className="current-patient-left">
            <span className="current-label">Currently Serving</span>
            <div className="current-patient-info">
              <span className="current-token">{currentPatient.token}</span>
              <div>
                <p className="current-name">{currentPatient.name}</p>
                <p className="current-meta">Age {currentPatient.age} &nbsp;·&nbsp; {currentPatient.gender === 'M' ? 'Male' : 'Female'} &nbsp;·&nbsp; General Physician</p>
                <p className="current-meta">Checked in: {currentPatient.time} &nbsp;·&nbsp; Room 3, OPD Block B</p>
              </div>
            </div>
          </div>
          <div className="current-patient-right">
            <button className="btn btn-primary btn-next" onClick={handleNext} disabled={waiting === 0}>
              ▶&nbsp; Call Next Patient
            </button>
            {nextPatient ? (
              <p className="next-preview">Next up: <strong>{nextPatient.token} – {nextPatient.name}</strong></p>
            ) : (
              <p className="next-preview"><strong>No more patients</strong></p>
            )}
          </div>
        </div>

        <div className="doctor-tabs">
          <button className="tab-btn tab-active">All Doctors</button>
          <button className="tab-btn">Dr. Arjun Mehta</button>
          <button className="tab-btn">Dr. Priya Nair</button>
          <button className="tab-btn">Dr. Sneha Kulkarni</button>
        </div>

        <div className="card table-card">
          <div className="table-toolbar">
            <h3 className="table-title">Patient Queue</h3>
            <div className="table-actions">
              <input type="text" className="input table-search" placeholder="🔍 Search patient..." />
              <button className="btn btn-outline btn-sm">⬇ Export</button>
            </div>
          </div>

          <div className="table-wrapper">
            <table className="queue-table">
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Patient Name</th>
                  <th>Age / Gender</th>
                  <th>Doctor</th>
                  <th>Check-in Time</th>
                  <th>Est. Wait</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {patients.map(p => {
                  const pNum = parseInt(p.token.replace('#', ''));
                  if (pNum < currentServing) {
                    return (
                      <tr key={p.token} className="row-done">
                        <td><span className="token-pill pill-done">{p.token}</span></td>
                        <td>{p.name}</td>
                        <td>{p.age} / {p.gender}</td>
                        <td>Dr. Arjun Mehta</td>
                        <td>{p.time}</td>
                        <td>—</td>
                        <td><span className="status-chip chip-served">Served</span></td>
                        <td><button className="btn btn-ghost btn-xs">View</button></td>
                      </tr>
                    );
                  } else if (pNum === currentServing) {
                    return (
                      <tr key={p.token} className="row-current">
                        <td><span className="token-pill pill-current">{p.token}</span></td>
                        <td>
                          <span className="current-row-name">{p.name}</span>
                          <span className="current-row-tag">In Consultation</span>
                        </td>
                        <td>{p.age} / {p.gender}</td>
                        <td>Dr. Arjun Mehta</td>
                        <td>{p.time}</td>
                        <td>—</td>
                        <td><span className="status-chip chip-active">Serving</span></td>
                        <td><button className="btn btn-primary btn-xs" onClick={handleNext}>▶ Next</button></td>
                      </tr>
                    );
                  } else if (pNum === currentServing + 1) {
                    return (
                      <tr key={p.token} className="row-next">
                        <td><span className="token-pill pill-next">{p.token}</span></td>
                        <td>{p.name} <span className="next-tag">Next</span></td>
                        <td>{p.age} / {p.gender}</td>
                        <td>Dr. Arjun Mehta</td>
                        <td>{p.time}</td>
                        <td>{p.wait}</td>
                        <td><span className="status-chip chip-next">Waiting</span></td>
                        <td><button className="btn btn-ghost btn-xs">Skip</button></td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr key={p.token} className="row-waiting">
                        <td><span className="token-pill pill-wait">{p.token}</span></td>
                        <td>{p.name}</td>
                        <td>{p.age} / {p.gender}</td>
                        <td>Dr. Arjun Mehta</td>
                        <td>{p.time}</td>
                        <td>{p.wait}</td>
                        <td><span className="status-chip chip-waiting">Waiting</span></td>
                        <td><button className="btn btn-ghost btn-xs">Skip</button></td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
          
          <div className="table-footer">
            <p className="table-count">Showing {totalTokens} patients &nbsp;·&nbsp; {served} served &nbsp;·&nbsp; {waiting} waiting</p>
            <div className="table-pagination">
              <button className="btn btn-ghost btn-xs" disabled>← Prev</button>
              <span className="page-indicator">Page 1 of 1</span>
              <button className="btn btn-ghost btn-xs" disabled>Next →</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;
