import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('patient');

  const handleRegister = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({ role }));
    window.dispatchEvent(new Event('storage'));

    if (role === 'patient') navigate('/dashboard/patient');
    else if (role === 'admin') navigate('/dashboard/hospital');
    else navigate('/dashboard/admin');
  };

  return (
    <>
      <section className="register-section">
        <div className="register-container">
          <div className="register-card">
            <div className="register-header">
              <h1>Create Account</h1>
              <p>Join WaitLess and skip the queues</p>
            </div>

            <form className="register-form" onSubmit={handleRegister}>
              <div className="form-group" style={{ marginBottom: 'var(--spacing-md)' }}>
                <label className="form-label">I am a</label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                  <button type="button" onClick={() => setRole('patient')} className={`btn ${role === 'patient' ? 'btn-primary' : 'btn-outline'}`} style={{ flex: 1, padding: '8px' }}>Patient</button>
                  <button type="button" onClick={() => setRole('admin')} className={`btn ${role === 'admin' ? 'btn-primary' : 'btn-outline'}`} style={{ flex: 1, padding: '8px' }}>Admin</button>
                  <button type="button" onClick={() => setRole('super')} className={`btn ${role === 'super' ? 'btn-primary' : 'btn-outline'}`} style={{ flex: 1, padding: '8px' }}>Super</button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input type="text" id="name" name="name" className="form-input" placeholder="Enter your full name" required />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input type="email" id="email" name="email" className="form-input" placeholder="Enter your email" required />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" id="password" name="password" className="form-input" placeholder="Create a strong password" required />
              </div>

              <button type="submit" className="btn btn-primary btn-block btn-lg">Create Account</button>
            </form>

            <div className="register-footer">
              <p>Already have an account? <Link to="/login" className="login-link">Login here</Link></p>
            </div>
          </div>
        </div>
      </section>
      <style>{`
        .register-section {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 300px);
          padding: var(--spacing-lg) var(--spacing-md);
          background: linear-gradient(135deg, var(--primary-light) 0%, var(--white) 100%);
        }
        .register-container {
          width: 100%;
          max-width: 400px;
        }
        .register-card {
          background-color: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: var(--spacing-2xl) var(--spacing-lg);
          box-shadow: var(--shadow-lg);
        }
        .register-header {
          text-align: center;
          margin-bottom: var(--spacing-xl);
        }
        .register-header h1 {
          font-size: 28px;
          color: var(--primary-dark);
          margin-bottom: var(--spacing-sm);
        }
        .register-header p {
          color: var(--text-secondary);
          margin-bottom: 0;
        }
        .register-form {
          margin-bottom: var(--spacing-lg);
        }
        .register-footer {
          text-align: center;
          padding-top: var(--spacing-lg);
          border-top: 1px solid var(--border);
        }
        .register-footer p {
          color: var(--text-secondary);
          margin-bottom: 0;
        }
        .login-link {
          color: var(--primary);
          font-weight: 600;
        }
        .login-link:hover {
          color: var(--primary-dark);
          text-decoration: underline;
        }
        @media (max-width: 480px) {
          .register-card {
            padding: var(--spacing-lg) var(--spacing-md);
          }
          .register-header h1 {
            font-size: 24px;
          }
        }
      `}</style>
    </>
  );
};

export default Register;
