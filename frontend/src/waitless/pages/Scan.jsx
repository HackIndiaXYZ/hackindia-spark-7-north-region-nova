import React from 'react';
import { useNavigate } from 'react-router-dom';

const Scan = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="qr-section">
        <div className="qr-container">
          <div className="qr-card">
            <div className="qr-success-icon">✓</div>
            
            <h1 className="qr-title">Welcome to WaitLess</h1>
            
            <div className="qr-message">
              <p>Scan successful</p>
              <p className="qr-subtext">Your QR code has been verified successfully. You're all set to join the queue.</p>
            </div>

            <button onClick={() => navigate('/hospital')} className="btn btn-primary btn-block btn-lg qr-button">Continue to Enter Details</button>
          </div>
        </div>
      </section>
      <style>{`
        .qr-section {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 300px);
          padding: var(--spacing-lg) var(--spacing-md);
          background: linear-gradient(135deg, var(--primary-light) 0%, var(--white) 100%);
        }
        .qr-container {
          width: 100%;
          max-width: 450px;
        }
        .qr-card {
          background-color: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: var(--spacing-2xl) var(--spacing-lg);
          box-shadow: var(--shadow-lg);
          text-align: center;
        }
        .qr-success-icon {
          width: 80px;
          height: 80px;
          background-color: var(--success);
          color: var(--white);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          font-weight: 700;
          margin: 0 auto var(--spacing-xl);
          animation: scaleUp 0.5s ease-out;
        }
        @keyframes scaleUp {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .qr-title {
          font-size: 32px;
          color: var(--primary-dark);
          margin-bottom: var(--spacing-lg);
        }
        .qr-message {
          margin-bottom: var(--spacing-xl);
        }
        .qr-message p {
          margin-bottom: var(--spacing-sm);
        }
        .qr-message p:first-child {
          font-size: 20px;
          font-weight: 600;
          color: var(--success);
          margin-bottom: var(--spacing-md);
        }
        .qr-subtext {
          color: var(--text-secondary);
          font-size: 16px;
        }
        .qr-button {
          margin-top: var(--spacing-lg);
        }
        @media (max-width: 480px) {
          .qr-card {
            padding: var(--spacing-lg) var(--spacing-md);
          }
          .qr-title {
            font-size: 24px;
          }
          .qr-success-icon {
            width: 70px;
            height: 70px;
            font-size: 40px;
            margin-bottom: var(--spacing-lg);
          }
        }
      `}</style>
    </>
  );
};

export default Scan;
