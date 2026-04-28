import React, { useState, useEffect } from 'react';

const HospitalDashboard = () => {
  const [queueState, setQueueState] = useState(() => {
    const saved = localStorage.getItem('globalQueue');
    if (saved) return JSON.parse(saved);
    return { currentServing: 8, queue: [8, 9, 10, 11, 12] };
  });

  useEffect(() => {
    // If not set, initialize global queue
    if (!localStorage.getItem('globalQueue')) {
      localStorage.setItem('globalQueue', JSON.stringify({ currentServing: 8, queue: [8, 9, 10, 11, 12] }));
    }

    const handleStorage = () => {
      const saved = localStorage.getItem('globalQueue');
      if (saved) setQueueState(JSON.parse(saved));
    };

    window.addEventListener('storage', handleStorage);
    
    // Poll to keep everything in sync fast
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
  
  // Calculate waiting patients (only those in queue who are > currentServing)
  const waitingPatients = queue.filter(token => token > currentServing);
  const maxToken = queue.length > 0 ? Math.max(...queue) : 0;

  const updateGlobalQueue = (newState) => {
    setQueueState(newState);
    localStorage.setItem('globalQueue', JSON.stringify(newState));
    window.dispatchEvent(new Event('storage'));
  };

  const handleNext = () => {
    if (currentServing > maxToken) return; // Empty or finished
    
    const nextToken = currentServing + 1;
    updateGlobalQueue({
      currentServing: nextToken,
      queue: queue
    });
  };

  const handleSkip = () => {
    // Just move the currentServing forward, leaving the skipped one behind
    handleNext();
  };

  const handleCancel = (tokenToCancel) => {
    const newQueue = queue.filter(t => t !== tokenToCancel);
    updateGlobalQueue({
      currentServing,
      queue: newQueue
    });
  };

  const getStatusBadge = (token) => {
    if (token < currentServing) return <span className="status-chip chip-served" style={{ background: '#fef2f2', color: '#991b1b' }}>Missed</span>;
    if (token === currentServing) return <span className="status-chip chip-active">Serving</span>;
    if (token === currentServing + 1) return <span className="status-chip chip-next">Next</span>;
    return <span className="status-chip chip-waiting">Waiting</span>;
  };

  return (
    <>
      <section className="page-header">
        <div className="container dashboard-header-row">
          <div>
            <h1 className="page-title">Hospital Admin Dashboard</h1>
            <p className="page-subtitle">City General Hospital &nbsp;·&nbsp; Live Queue Management</p>
          </div>
          <div className="dashboard-header-meta">
            <span className="live-badge">🟢 Live</span>
          </div>
        </div>
      </section>

      <main className="container admin-section">
        <div className="stats-row">
          <div className="card stat-card stat-card-active">
            <p className="stat-card-icon">🩺</p>
            <p className="stat-card-value">#{currentServing}</p>
            <p className="stat-card-label">Now Serving</p>
          </div>
          <div className="card stat-card">
            <p className="stat-card-icon">⏳</p>
            <p className="stat-card-value">{waitingPatients.length}</p>
            <p className="stat-card-label">Total Waiting</p>
          </div>
          <div className="card stat-card">
            <p className="stat-card-icon">🎫</p>
            <p className="stat-card-value">{queue.length}</p>
            <p className="stat-card-label">Total in Queue</p>
          </div>
          <div className="card stat-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <button className="btn btn-primary btn-block" onClick={handleNext} disabled={currentServing > maxToken}>▶ Call Next Patient</button>
            <button className="btn btn-outline btn-block" onClick={handleSkip} disabled={currentServing > maxToken} style={{ marginTop: '8px' }}>⏭ Skip Current</button>
          </div>
        </div>

        <div className="card table-card">
          <div className="table-toolbar">
            <h3 className="table-title">Live Queue List</h3>
          </div>

          <div className="table-wrapper">
            <table className="queue-table">
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Patient Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {queue.length === 0 ? (
                  <tr><td colSpan="4" style={{ textAlign: 'center', padding: '32px' }}>No patients in queue</td></tr>
                ) : (
                  queue.map(token => {
                    const isCurrent = token === currentServing;
                    const isMissed = token < currentServing;
                    return (
                      <tr key={token} className={isCurrent ? "row-current" : isMissed ? "row-done" : ""}>
                        <td>
                          <span className={`token-pill ${isCurrent ? 'pill-current' : isMissed ? 'pill-done' : token === currentServing + 1 ? 'pill-next' : 'pill-wait'}`}>
                            #{token}
                          </span>
                        </td>
                        <td>
                          {isCurrent ? <span className="current-row-name">Patient {token} <span className="current-row-tag">In Consultation</span></span> : `Patient ${token}`}
                        </td>
                        <td>
                          {getStatusBadge(token)}
                        </td>
                        <td>
                          {!isMissed && !isCurrent && (
                            <button className="btn btn-danger btn-xs" onClick={() => handleCancel(token)}>Cancel</button>
                          )}
                          {isCurrent && (
                            <button className="btn btn-primary btn-xs" onClick={handleNext}>Finish</button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
};

export default HospitalDashboard;
