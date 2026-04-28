import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('patient');

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({ role }));
    
    // Trigger storage event manually for same-window updates
    window.dispatchEvent(new Event('storage'));

    if (role === 'patient') navigate('/dashboard/patient');
    else if (role === 'admin') navigate('/dashboard/hospital');
    else navigate('/dashboard/admin'); // super admin
  };

  return (
    <>
      <section className="login-section">
        <div className="login-container">
          <div className="login-card">
            <div className="login-header">
              <h1>Welcome Back</h1>
              <p>Login to your WaitLess account</p>
            </div>

            <form className="login-form" onSubmit={handleLogin}>
              <div className="form-group" style={{ marginBottom: 'var(--spacing-md)' }}>
                <label className="form-label">I am a</label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                  <button type="button" onClick={() => setRole('patient')} className={`btn ${role === 'patient' ? 'btn-primary' : 'btn-outline'}`} style={{ flex: 1, padding: '8px' }}>Patient</button>
                  <button type="button" onClick={() => setRole('admin')} className={`btn ${role === 'admin' ? 'btn-primary' : 'btn-outline'}`} style={{ flex: 1, padding: '8px' }}>Admin</button>
                  <button type="button" onClick={() => setRole('super')} className={`btn ${role === 'super' ? 'btn-primary' : 'btn-outline'}`} style={{ flex: 1, padding: '8px' }}>Super</button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input type="email" id="email" name="email" className="form-input" placeholder="Enter your email" required />
                <span className="form-text">We'll never share your email with anyone else.</span>
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" id="password" name="password" className="form-input" placeholder="Enter your password" required />
                <a href="#forgot" className="form-text forgot-link">Forgot password?</a>
              </div>

              <button type="submit" className="btn btn-primary btn-block btn-lg">Login</button>
            </form>

            <div className="login-footer">
              <p>Don't have an account? <Link to="/register" className="register-link">Register here</Link></p>
            </div>
          </div>
        </div>
      </section>
      <style>{`
        .login-section {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 300px);
          padding: var(--spacing-lg) var(--spacing-md);
          background: linear-gradient(135deg, var(--primary-light) 0%, var(--white) 100%);
        }
        .login-container {
          width: 100%;
          max-width: 400px;
        }
        .login-card {
          background-color: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: var(--spacing-2xl) var(--spacing-lg);
          box-shadow: var(--shadow-lg);
        }
        .login-header {
          text-align: center;
          margin-bottom: var(--spacing-xl);
        }
        .login-header h1 {
          font-size: 28px;
          color: var(--primary-dark);
          margin-bottom: var(--spacing-sm);
        }
        .login-header p {
          color: var(--text-secondary);
          margin-bottom: 0;
        }
        .login-form {
          margin-bottom: var(--spacing-lg);
        }
        .forgot-link {
          color: var(--primary);
          font-weight: 500;
          margin-top: var(--spacing-sm);
          display: inline-block;
        }
        .forgot-link:hover {
          color: var(--primary-dark);
          text-decoration: underline;
        }
        .login-footer {
          text-align: center;
          padding-top: var(--spacing-lg);
          border-top: 1px solid var(--border);
        }
        .login-footer p {
          color: var(--text-secondary);
          margin-bottom: 0;
        }
        .register-link {
          color: var(--primary);
          font-weight: 600;
        }
        .register-link:hover {
          color: var(--primary-dark);
          text-decoration: underline;
        }
        @media (max-width: 480px) {
          .login-card {
            padding: var(--spacing-lg) var(--spacing-md);
          }
          .login-header h1 {
            font-size: 24px;
          }
        }
      `}</style>
    </>
  );
};

export default Login;
