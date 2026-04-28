import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/auth';

const AuthPage = () => {
  const [role, setRole] = useState('patient'); // 'patient' or 'admin'
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  
  // Form State
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState(''); // For new patient registration
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // UI State
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch(`${API_URL}/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStep('otp');
        // Hackathon trick: display the OTP in a success message so the user can copy it
        setMessage(`OTP Sent! (Demo OTP: ${data.data.otp})`);
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Cannot connect to server. Ensure backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp, name: name || 'Demo Patient' })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Save token to local storage
        localStorage.setItem('waitless_token', data.data.token);
        localStorage.setItem('waitless_user', JSON.stringify(data.data));
        navigate('/patient');
      } else {
        setError(data.message || 'Invalid OTP');
      }
    } catch (err) {
      setError('Cannot connect to server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: email, password }) // Reusing phone field for email as per schema
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('waitless_token', data.data.token);
        localStorage.setItem('waitless_admin', JSON.stringify(data.data));
        navigate('/admin');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Cannot connect to server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setMessage("Google login will be integrated in future releases.");
    setTimeout(() => setMessage(null), 3000);
  };

  const activeTabStyle = { flex: 1, padding: '1rem', borderBottom: '2px solid var(--primary)', backgroundColor: 'transparent', color: 'var(--primary)', fontWeight: 'bold', cursor: 'pointer', borderTop: 'none', borderLeft: 'none', borderRight: 'none', transition: 'all 0.2s' };
  const inactiveTabStyle = { flex: 1, padding: '1rem', borderBottom: '2px solid var(--border)', backgroundColor: 'transparent', color: 'var(--text-light)', cursor: 'pointer', borderTop: 'none', borderLeft: 'none', borderRight: 'none', transition: 'all 0.2s' };

  return (
    <div style={{ minHeight: 'calc(100vh - 73px)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-off)', padding: '2rem' }}>
      <div className="card" style={{ maxWidth: '450px', width: '100%', padding: '0', overflow: 'hidden' }}>
        
        {/* Header Tabs */}
        <div style={{ display: 'flex', backgroundColor: 'var(--bg-color)' }}>
          <button style={role === 'patient' ? activeTabStyle : inactiveTabStyle} onClick={() => { setRole('patient'); setError(null); setMessage(null); }}>
            Patient Login
          </button>
          <button style={role === 'admin' ? activeTabStyle : inactiveTabStyle} onClick={() => { setRole('admin'); setError(null); setMessage(null); }}>
            Admin Login
          </button>
        </div>

        <div style={{ padding: '2rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--text-dark)', fontSize: '1.5rem' }}>
            Welcome to WaitLess
          </h2>

          {/* Feedback Messages */}
          {error && <div style={{ padding: '0.75rem', backgroundColor: 'var(--danger-light)', color: 'var(--danger)', borderRadius: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem', border: '1px solid #fca5a5' }}>{error}</div>}
          {message && <div style={{ padding: '0.75rem', backgroundColor: 'var(--success-light)', color: 'var(--success)', borderRadius: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem', border: '1px solid #6ee7b7' }}>{message}</div>}

          {/* Forms */}
          {role === 'patient' ? (
            <div>
              {step === 'phone' ? (
                <form onSubmit={handleSendOtp}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)', fontWeight: '500' }}>Phone Number</label>
                    <input type="tel" className="input-field" placeholder="e.g. 1234567890" value={phone} onChange={(e) => setPhone(e.target.value)} required disabled={isLoading} />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isLoading || phone.length < 5}>
                    {isLoading ? <span className="loading-spinner"></span> : 'Send OTP'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)', fontWeight: '500' }}>Full Name (If new patient)</label>
                    <input type="text" className="input-field" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading} />
                  </div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)', fontWeight: '500' }}>Enter 6-digit OTP</label>
                    <input type="text" className="input-field" placeholder="123456" value={otp} onChange={(e) => setOtp(e.target.value)} required disabled={isLoading} />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '0.5rem' }} disabled={isLoading || otp.length < 4}>
                    {isLoading ? <span className="loading-spinner"></span> : 'Verify & Login'}
                  </button>
                  <button type="button" className="btn" onClick={() => setStep('phone')} style={{ width: '100%', backgroundColor: 'transparent', color: 'var(--text-light)' }} disabled={isLoading}>
                    Back
                  </button>
                </form>
              )}
              
              <div style={{ marginTop: '2rem', textAlign: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', backgroundColor: 'var(--border)', zIndex: 1 }}></div>
                <span style={{ position: 'relative', zIndex: 2, backgroundColor: 'white', padding: '0 1rem', color: 'var(--text-light)', fontSize: '0.875rem' }}>Or continue with</span>
              </div>
              <button type="button" className="btn btn-secondary" onClick={handleGoogleLogin} style={{ width: '100%', marginTop: '1.5rem' }} disabled={isLoading}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" style={{ width: '18px', height: '18px', marginRight: '0.5rem' }} />
                Google
              </button>
            </div>
          ) : (
            <form onSubmit={handleAdminLogin}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)', fontWeight: '500' }}>Email Address</label>
                <input type="email" className="input-field" placeholder="admin@hospital.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading} />
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)', fontWeight: '500' }}>Password</label>
                <input type="password" className="input-field" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isLoading}>
                {isLoading ? <span className="loading-spinner"></span> : 'Login to Dashboard'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
