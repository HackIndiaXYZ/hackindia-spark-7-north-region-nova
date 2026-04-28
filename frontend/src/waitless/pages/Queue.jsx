import React, { useState, useEffect } from 'react';

const Queue = () => {
  const myToken = 9; // Hardcoded user token for demo
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
    
    // Simulate queue moving
    const timer = setInterval(() => {
      const saved = localStorage.getItem('globalQueue');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.currentServing !== queueState.currentServing || parsed.queue.length !== queueState.queue.length) {
          setQueueState(parsed);
        }
      }
    }, 2000); // Poll every 2 seconds for demo

    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(timer);
    };
  }, [queueState.currentServing, queueState.queue.length]);

  const { currentServing, queue } = queueState;
  const maxToken = queue.length > 0 ? Math.max(...queue) : 0;
  const totalTokens = maxToken > 0 ? maxToken : 12;

  const served = currentServing - 1;
  const progressPercent = Math.round((served / totalTokens) * 100);
  const isNext = currentServing === myToken - 1;
  const isServed = currentServing >= myToken;
  const estimatedTime = Math.max(0, (myToken - currentServing) * 15);

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Queue Status</h1>
          <p className="page-subtitle">City General Hospital &nbsp;·&nbsp; Dr. Arjun Mehta &nbsp;·&nbsp; General Physician</p>
        </div>
      </section>

      <main className="container queue-status-section">
        {isNext && (
          <div className="alert-banner alert-next">
            <span className="alert-icon">🔔</span>
            <div className="alert-text">
              <strong>You're next!</strong> Please proceed to Room 3 and be ready.
            </div>
          </div>
        )}
        
        {isServed && currentServing === myToken && (
          <div className="alert-banner alert-next" style={{ backgroundColor: '#d1fae5', borderColor: '#34d399', color: '#065f46' }}>
            <span className="alert-icon">🩺</span>
            <div className="alert-text">
              <strong>It's your turn!</strong> The doctor is ready for you.
            </div>
          </div>
        )}

        <div className="token-row">
          <div className="card token-card token-card-yours">
            <p className="token-label">Your Token</p>
            <p className="token-number">#{myToken}</p>
            <p className="token-sub">Registered at 10:15 AM</p>
          </div>

          <div className="card token-card token-card-current">
            <p className="token-label">Now Serving</p>
            <p className="token-number">#{currentServing}</p>
            <p className="token-sub">Started at 11:42 AM</p>
          </div>

          <div className="card token-card token-card-wait">
            <p className="token-label">Est. Wait Time</p>
            <p className="token-number">{estimatedTime > 0 ? `~${estimatedTime}` : '0'}<span className="token-unit">min</span></p>
            <p className="token-sub">{isNext ? "1 patient ahead of you" : isServed ? "It's your turn!" : `${myToken - currentServing} patients ahead`}</p>
          </div>
        </div>

        <div className="card progress-card">
          <div className="progress-header">
            <span className="progress-title">Queue Progress</span>
            <span className="progress-fraction">{served} of {totalTokens} served</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <div className="progress-labels">
            <span>Start</span>
            <span>{progressPercent}% Complete</span>
            <span>{totalTokens} total</span>
          </div>
        </div>

        <div className="card queue-list-card">
          <h3 className="queue-list-title">Patients in Queue</h3>
          <ul className="queue-list">
            {queue.map(num => {
              if (num < currentServing) {
                return (
                  <li key={num} className="queue-item queue-item-done">
                    <span className="queue-token">#{num}</span>
                    <span className="queue-status-label">Missed</span>
                    <span className="queue-check" style={{ color: '#991b1b' }}>✖</span>
                  </li>
                );
              } else if (num === currentServing) {
                return (
                  <li key={num} className={`queue-item ${num === myToken ? 'queue-item-you' : 'queue-item-active'}`}>
                    <span className="queue-token">#{num}</span>
                    <span className="queue-status-label">{num === myToken ? 'You \u00a0\uD83E\uDEF5 (Now Serving)' : 'Now Serving'}</span>
                    <span className="queue-pulse"></span>
                  </li>
                );
              } else if (num === myToken) {
                return (
                  <li key={num} className="queue-item queue-item-you">
                    <span className="queue-token">#{num}</span>
                    <span className="queue-status-label">You &nbsp;🫵</span>
                    <span className="queue-next-tag">{num === currentServing + 1 ? 'You are next' : 'Waiting'}</span>
                  </li>
                );
              } else {
                return (
                  <li key={num} className="queue-item queue-item-waiting">
                    <span className="queue-token">#{num}</span>
                    <span className="queue-status-label">{num === currentServing + 1 ? 'Next' : 'Waiting'}</span>
                    <span className="queue-eta">~{(num - currentServing) * 15} min</span>
                  </li>
                );
              }
            })}
          </ul>
        </div>

        <div className="queue-actions">
          <div className="card info-card">
            <p className="info-icon">📍</p>
            <p className="info-label">Room</p>
            <p className="info-value">Room 3, OPD Block B</p>
          </div>
          <div className="card info-card">
            <p className="info-icon">🩺</p>
            <p className="info-label">Doctor</p>
            <p className="info-value">Dr. Arjun Mehta</p>
          </div>
          <div className="card info-card">
            <p className="info-icon">📅</p>
            <p className="info-label">Date</p>
            <p className="info-value">28 April 2025</p>
          </div>
        </div>

        <div className="queue-cta">
          <button className="btn btn-outline" onClick={() => window.location.reload()}>🔄 Refresh Status</button>
          <button className="btn btn-danger">✖ Cancel Token</button>
        </div>
      </main>
    </>
  );
};

export default Queue;
