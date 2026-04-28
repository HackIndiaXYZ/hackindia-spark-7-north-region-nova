import React, { useState } from 'react';
import { X, Clock, Calendar, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HospitalModal = ({ hospital, onClose }) => {
  const [step, setStep] = useState(1); // 1: Dept, 2: Action, 3: Confirm
  const [selectedDept, setSelectedDept] = useState(null);
  const [actionType, setActionType] = useState(null); // 'live' or 'book'
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const navigate = useNavigate();

  if (!hospital) return null;

  const handleDeptSelect = (dept) => {
    setSelectedDept(dept);
    setStep(2);
  };

  const handleActionSelect = (type) => {
    setActionType(type);
    if (type === 'live') {
      processBooking();
    }
  };

  const processBooking = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 1000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-dark)' }}>{hospital.name}</h2>
            {selectedDept && <p style={{ margin: '0.25rem 0 0 0', color: 'var(--primary)', fontSize: '0.875rem', fontWeight: '500' }}>{selectedDept}</p>}
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%', color: 'var(--text-light)' }}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '1.5rem' }}>
          
          {step === 1 && (
            <div>
              <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-dark)' }}>Select Department</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {hospital.departments.map((dept, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleDeptSelect(dept)}
                    style={{ padding: '1rem', textAlign: 'left', backgroundColor: 'var(--secondary)', border: '1px solid var(--border)', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '1rem', fontWeight: '500', color: 'var(--text-dark)', transition: 'all 0.2s' }}
                    onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.backgroundColor = '#e0f2fe'; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.backgroundColor = 'var(--secondary)'; }}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && actionType !== 'book' && (
            <div>
              <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-dark)' }}>How would you like to proceed?</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                
                <div 
                  onClick={() => handleActionSelect('live')}
                  style={{ border: '2px solid var(--primary)', borderRadius: '0.75rem', padding: '1.5rem', textAlign: 'center', cursor: 'pointer', backgroundColor: '#f0f9ff' }}
                >
                  <Clock size={32} color="var(--primary)" style={{ margin: '0 auto 1rem auto' }} />
                  <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-dark)' }}>Join Live Queue</h4>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-light)' }}>Get a token for right now</p>
                </div>

                <div 
                  onClick={() => handleActionSelect('book')}
                  style={{ border: '1px solid var(--border)', borderRadius: '0.75rem', padding: '1.5rem', textAlign: 'center', cursor: 'pointer' }}
                >
                  <Calendar size={32} color="var(--text-light)" style={{ margin: '0 auto 1rem auto' }} />
                  <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-dark)' }}>Book Appointment</h4>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-light)' }}>Schedule for later</p>
                </div>

              </div>
              {isProcessing && <div style={{ textAlign: 'center', marginTop: '2rem' }}><span className="loading-spinner" style={{ borderTopColor: 'var(--primary)' }}></span></div>}
            </div>
          )}

          {step === 2 && actionType === 'book' && (
            <div>
              <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-dark)' }}>Schedule Appointment</h3>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Select Date</label>
                <input type="date" className="input-field" value={date} onChange={e => setDate(e.target.value)} />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Select Time</label>
                <input type="time" className="input-field" value={time} onChange={e => setTime(e.target.value)} />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setActionType(null)}>Back</button>
                <button className="btn btn-primary" style={{ flex: 2 }} onClick={processBooking} disabled={!date || !time || isProcessing}>
                  {isProcessing ? <span className="loading-spinner"></span> : 'Confirm Booking'}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <CheckCircle size={64} color="var(--success)" style={{ margin: '0 auto 1.5rem auto' }} />
              <h2 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-dark)' }}>Booking Confirmed!</h2>
              <p style={{ margin: '0 0 2rem 0', color: 'var(--text-light)' }}>You have successfully joined the queue.</p>
              
              <div style={{ backgroundColor: 'var(--bg-off)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem', border: '1px dashed var(--border)' }}>
                <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-light)', fontSize: '0.875rem', textTransform: 'uppercase' }}>Your Token</p>
                <h1 style={{ margin: 0, fontSize: '3rem', color: 'var(--primary)' }}>A-108</h1>
              </div>

              <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => { onClose(); navigate('/patient'); }}>
                Go to Patient Dashboard
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default HospitalModal;
