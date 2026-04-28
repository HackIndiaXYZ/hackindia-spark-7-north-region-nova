import React from 'react';
import { Link } from 'react-router-dom';

const DoctorSelect = () => {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <Link to="/hospital" className="back-link">← Back to Hospitals</Link>
          <h1 className="page-title">Select a Doctor</h1>
          <p className="page-subtitle">City General Hospital &nbsp;·&nbsp; Andheri West, Mumbai</p>

          <div className="filter-row">
            <input
              type="text"
              className="input search-input"
              placeholder="🔍  Search by name or specialization..."
            />
            <select className="input filter-select">
              <option value="">All Specializations</option>
              <option>General Physician</option>
              <option>Cardiology</option>
              <option>Orthopedics</option>
              <option>Dermatology</option>
              <option>Pediatrics</option>
              <option>Neurology</option>
            </select>
          </div>
        </div>
      </section>

      <main className="container doctor-section">
        <div className="doctor-grid">
          {/* Card 1 */}
          <div className="card doctor-card">
            <div className="doctor-card-top">
              <div className="doctor-avatar-wrap">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Dr. Arjun Mehta"
                  className="doctor-avatar"
                />
                <span className="availability-dot dot-available"></span>
              </div>
              <div className="doctor-info">
                <h3 className="doctor-name">Dr. Arjun Mehta</h3>
                <span className="specialization-badge">General Physician</span>
                <p className="doctor-meta">MBBS, MD &nbsp;·&nbsp; 12 yrs exp.</p>
              </div>
            </div>
            <div className="doctor-stats">
              <div className="stat-item">
                <span className="stat-icon">⏱</span>
                <span className="stat-label">Avg. Wait</span>
                <span className="stat-value">20 min</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-icon">👥</span>
                <span className="stat-label">In Queue</span>
                <span className="stat-value">8</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-icon">🏷</span>
                <span className="stat-label">Token</span>
                <span className="stat-value">#9</span>
              </div>
            </div>
            <Link to="/patient" className="btn btn-primary btn-block">Join Queue</Link>
          </div>

          {/* Card 2 */}
          <div className="card doctor-card">
            <div className="doctor-card-top">
              <div className="doctor-avatar-wrap">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Dr. Priya Nair"
                  className="doctor-avatar"
                />
                <span className="availability-dot dot-available"></span>
              </div>
              <div className="doctor-info">
                <h3 className="doctor-name">Dr. Priya Nair</h3>
                <span className="specialization-badge spec-cardio">Cardiology</span>
                <p className="doctor-meta">MBBS, DM Cardiology &nbsp;·&nbsp; 18 yrs exp.</p>
              </div>
            </div>
            <div className="doctor-stats">
              <div className="stat-item">
                <span className="stat-icon">⏱</span>
                <span className="stat-label">Avg. Wait</span>
                <span className="stat-value">35 min</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-icon">👥</span>
                <span className="stat-label">In Queue</span>
                <span className="stat-value">14</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-icon">🏷</span>
                <span className="stat-label">Token</span>
                <span className="stat-value">#15</span>
              </div>
            </div>
            <Link to="/patient" className="btn btn-primary btn-block">Join Queue</Link>
          </div>

          {/* Card 3 */}
          <div className="card doctor-card">
            <div className="doctor-card-top">
              <div className="doctor-avatar-wrap">
                <img
                  src="https://randomuser.me/api/portraits/men/56.jpg"
                  alt="Dr. Rohan Desai"
                  className="doctor-avatar"
                />
                <span className="availability-dot dot-busy"></span>
              </div>
              <div className="doctor-info">
                <h3 className="doctor-name">Dr. Rohan Desai</h3>
                <span className="specialization-badge spec-ortho">Orthopedics</span>
                <p className="doctor-meta">MBBS, MS Ortho &nbsp;·&nbsp; 9 yrs exp.</p>
              </div>
            </div>
            <div className="doctor-stats">
              <div className="stat-item">
                <span className="stat-icon">⏱</span>
                <span className="stat-label">Avg. Wait</span>
                <span className="stat-value">55 min</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-icon">👥</span>
                <span className="stat-label">In Queue</span>
                <span className="stat-value">27</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-icon">🏷</span>
                <span className="stat-label">Token</span>
                <span className="stat-value">#28</span>
              </div>
            </div>
            <Link to="/patient" className="btn btn-primary btn-block">Join Queue</Link>
          </div>

        </div>
      </main>
    </>
  );
};

export default DoctorSelect;
