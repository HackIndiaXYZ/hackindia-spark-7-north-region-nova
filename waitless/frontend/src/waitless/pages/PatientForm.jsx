import React from 'react';
import { useNavigate } from 'react-router-dom';

const PatientForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/queue');
  };

  return (
    <>
      <section className="patient-section">
        <div className="patient-container">
          <div className="patient-card">
            <div className="patient-header">
              <h1>Enter Your Details</h1>
              <p>Complete your profile to join the queue</p>
            </div>

            <form className="patient-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input type="text" id="name" name="name" className="form-input" placeholder="Enter your full name" required />
                <span className="form-text">Your name as it appears in hospital records.</span>
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input type="tel" id="phone" name="phone" className="form-input" placeholder="Enter your phone number" required />
                <span className="form-text">We'll use this to notify you when it's your turn.</span>
              </div>

              <button type="submit" className="btn btn-primary btn-block btn-lg">Submit</button>
            </form>

            <div className="patient-footer">
              <p className="patient-security">🔒 Your data is secure and encrypted</p>
            </div>
          </div>
        </div>
      </section>
      <style>{`
        .patient-section {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 300px);
          padding: var(--spacing-lg) var(--spacing-md);
          background: linear-gradient(135deg, var(--primary-light) 0%, var(--white) 100%);
        }
        .patient-container {
          width: 100%;
          max-width: 450px;
        }
        .patient-card {
          background-color: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: var(--spacing-2xl) var(--spacing-lg);
          box-shadow: var(--shadow-lg);
        }
        .patient-header {
          text-align: center;
          margin-bottom: var(--spacing-xl);
        }
        .patient-header h1 {
          font-size: 28px;
          color: var(--primary-dark);
          margin-bottom: var(--spacing-sm);
        }
        .patient-header p {
          color: var(--text-secondary);
          margin-bottom: 0;
        }
        .patient-form {
          margin-bottom: var(--spacing-lg);
        }
        .patient-footer {
          text-align: center;
          padding-top: var(--spacing-lg);
          border-top: 1px solid var(--border);
        }
        .patient-security {
          color: var(--text-secondary);
          font-size: 14px;
          margin-bottom: 0;
        }
        @media (max-width: 480px) {
          .patient-card {
            padding: var(--spacing-lg) var(--spacing-md);
          }
          .patient-header h1 {
            font-size: 24px;
          }
        }
      `}</style>
    </>
  );
};

export default PatientForm;
