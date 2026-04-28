import React, { useState } from 'react';
import { ChevronRight, AlertTriangle, User, MoreVertical } from 'lucide-react';

const AdminDashboard = () => {
  // Dummy State
  const [queue, setQueue] = useState([
    { id: '1', token: 'A-101', name: 'John Doe', status: 'waiting', priority: false },
    { id: '2', token: 'A-102', name: 'Jane Smith', status: 'waiting', priority: false },
    { id: '3', token: 'A-103', name: 'Mike Johnson', status: 'waiting', priority: true },
    { id: '4', token: 'A-104', name: 'Emily Davis', status: 'waiting', priority: false }
  ]);

  const [currentServing, setCurrentServing] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCallNext = () => {
    if (queue.length === 0) return;
    setIsProcessing(true);
    
    // Simulate network delay
    setTimeout(() => {
      // Sort priority first, then take top
      const sortedQueue = [...queue].sort((a, b) => (b.priority === a.priority ? 0 : b.priority ? 1 : -1));
      const nextPatient = sortedQueue[0];
      
      setCurrentServing(nextPatient);
      setQueue(queue.filter(p => p.id !== nextPatient.id));
      setIsProcessing(false);
    }, 500);
  };

  const handleSkip = (id) => {
    setQueue(queue.filter(p => p.id !== id));
  };

  const markEmergency = (id) => {
    setQueue(queue.map(p => p.id === id ? { ...p, priority: true } : p));
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-off)', minHeight: 'calc(100vh - 73px)', padding: '2rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ color: 'var(--text-dark)', margin: '0 0 0.25rem 0', fontSize: '1.75rem' }}>Queue Control Panel</h2>
            <p style={{ color: 'var(--text-light)', margin: 0 }}>General OPD • Dr. Sarah Williams</p>
          </div>
          <select className="input-field" style={{ width: 'auto', backgroundColor: 'white' }}>
            <option>Status: Available</option>
            <option>Status: On Break</option>
            <option>Status: Delayed</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {/* Left Column: Actions & Current Serving */}
          <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <button 
              className="btn btn-primary"
              onClick={handleCallNext}
              disabled={isProcessing || queue.length === 0}
              style={{ width: '100%', padding: '1.5rem', fontSize: '1.25rem', boxShadow: 'var(--shadow-md)' }}
            >
              {isProcessing ? <span className="loading-spinner"></span> : (
                <>Call Next Patient <ChevronRight size={24} /></>
              )}
            </button>

            <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ color: 'var(--text-light)', margin: '0 0 1rem 0', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Currently Serving</h3>
              <div style={{ flex: 1, backgroundColor: currentServing ? 'var(--secondary)' : 'transparent', border: currentServing ? 'none' : '2px dashed var(--border)', borderRadius: '0.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem', textAlign: 'center' }}>
                {currentServing ? (
                  <>
                    <div style={{ width: '4rem', height: '4rem', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', boxShadow: 'var(--shadow-sm)' }}>
                      <User size={32} color="var(--primary)" />
                    </div>
                    <h1 style={{ fontSize: '3.5rem', margin: '0 0 0.5rem 0', color: 'var(--primary)', lineHeight: 1 }}>{currentServing.token}</h1>
                    <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-dark)' }}>{currentServing.name}</p>
                    {currentServing.priority && <span style={{ marginTop: '0.5rem', padding: '0.25rem 0.75rem', backgroundColor: 'var(--danger)', color: 'white', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 'bold' }}>EMERGENCY</span>}
                  </>
                ) : (
                  <p style={{ margin: 0, fontSize: '1.125rem', color: 'var(--text-light)' }}>Ready for next patient</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Queue List */}
          <div className="card" style={{ flex: '2 1 500px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
              <h3 style={{ margin: 0, color: 'var(--text-dark)', fontSize: '1.25rem' }}>Up Next</h3>
              <span style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.875rem', fontWeight: 'bold' }}>
                {queue.length} Waiting
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {queue.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-light)' }}>
                  <p style={{ margin: 0, fontSize: '1.125rem' }}>Queue is completely empty.</p>
                </div>
              ) : (
                queue.map((patient, index) => (
                  <div key={patient.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: patient.priority ? 'var(--danger-light)' : 'white', border: `1px solid ${patient.priority ? '#fca5a5' : 'var(--border)'}`, borderRadius: '0.5rem', transition: 'transform 0.2s' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '2rem', height: '2rem', color: 'var(--text-light)', fontWeight: 'bold', fontSize: '0.875rem' }}>
                        #{index + 1}
                      </div>
                      <div style={{ backgroundColor: patient.priority ? 'var(--danger)' : 'var(--secondary)', color: patient.priority ? 'white' : 'var(--text-dark)', padding: '0.5rem 1rem', borderRadius: '0.375rem', fontWeight: 'bold', fontSize: '1.125rem' }}>
                        {patient.token}
                      </div>
                      <div>
                        <p style={{ margin: 0, fontWeight: '600', color: 'var(--text-dark)' }}>{patient.name}</p>
                        {patient.priority && <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: 'var(--danger)', fontWeight: 'bold', textTransform: 'uppercase' }}>Emergency Priority</p>}
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {!patient.priority && (
                        <button 
                          onClick={() => markEmergency(patient.id)} 
                          title="Mark Emergency" 
                          style={{ padding: '0.5rem', backgroundColor: 'white', border: '1px solid #fca5a5', color: 'var(--danger)', borderRadius: '0.375rem', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'all 0.2s' }}
                        >
                          <AlertTriangle size={18} />
                        </button>
                      )}
                      <button 
                        onClick={() => handleSkip(patient.id)} 
                        title="Skip Patient"
                        style={{ padding: '0.5rem 1rem', backgroundColor: 'white', border: '1px solid var(--border)', color: 'var(--text-light)', borderRadius: '0.375rem', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '600', transition: 'all 0.2s' }}
                      >
                        Skip
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
