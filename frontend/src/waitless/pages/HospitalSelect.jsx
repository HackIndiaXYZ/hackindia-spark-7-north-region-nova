import React from 'react';
import { Link } from 'react-router-dom';

const HospitalSelect = () => {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Select a Hospital</h1>
          <p className="page-subtitle">Choose the hospital you'd like to register your queue at</p>

          <div className="search-wrapper">
            <input
              type="text"
              className="input search-input"
              placeholder="🔍  Search by hospital name or location..."
            />
          </div>
        </div>
      </section>

      <main className="container hospital-section">
        <div className="hospital-grid">
          {/* Card 1 */}
          <div className="card hospital-card">
            <div className="card-img-wrapper">
              <img
                src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&q=80"
                alt="City General Hospital"
                className="card-img"
              />
              <span className="badge badge-open">Open Now</span>
            </div>
            <div className="card-body">
              <h3 className="hospital-name">City General Hospital</h3>
              <p className="hospital-meta">
                <span className="meta-icon">📍</span> Andheri West, Mumbai
              </p>
              <p className="hospital-meta">
                <span className="meta-icon">⏱</span> Avg. Wait: <strong>25 min</strong>
              </p>
              <p className="hospital-meta">
                <span className="meta-icon">👥</span> Queue: <strong>12 patients</strong>
              </p>
              <Link to="/doctor" className="btn btn-primary btn-block">Select Hospital</Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card hospital-card">
            <div className="card-img-wrapper">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80"
                alt="St. Mary's Medical Centre"
                className="card-img"
              />
              <span className="badge badge-open">Open Now</span>
            </div>
            <div className="card-body">
              <h3 className="hospital-name">St. Mary's Medical Centre</h3>
              <p className="hospital-meta">
                <span className="meta-icon">📍</span> Bandra East, Mumbai
              </p>
              <p className="hospital-meta">
                <span className="meta-icon">⏱</span> Avg. Wait: <strong>40 min</strong>
              </p>
              <p className="hospital-meta">
                <span className="meta-icon">👥</span> Queue: <strong>20 patients</strong>
              </p>
              <Link to="/doctor" className="btn btn-primary btn-block">Select Hospital</Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card hospital-card">
            <div className="card-img-wrapper">
              <img
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80"
                alt="Sunrise Multispeciality Hospital"
                className="card-img"
              />
              <span className="badge badge-busy">Busy</span>
            </div>
            <div className="card-body">
              <h3 className="hospital-name">Sunrise Multispeciality Hospital</h3>
              <p className="hospital-meta">
                <span className="meta-icon">📍</span> Dadar, Mumbai
              </p>
              <p className="hospital-meta">
                <span className="meta-icon">⏱</span> Avg. Wait: <strong>1 hr 10 min</strong>
              </p>
              <p className="hospital-meta">
                <span className="meta-icon">👥</span> Queue: <strong>47 patients</strong>
              </p>
              <Link to="/doctor" className="btn btn-primary btn-block">Select Hospital</Link>
            </div>
          </div>

          {/* Card 4 */}
          <div className="card hospital-card">
            <div className="card-img-wrapper">
              <img
                src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&q=80"
                alt="Apollo Wellness Clinic"
                className="card-img"
              />
              <span className="badge badge-open">Open Now</span>
            </div>
            <div className="card-body">
              <h3 className="hospital-name">Apollo Wellness Clinic</h3>
              <p className="hospital-meta">
                <span className="meta-icon">📍</span> Powai, Mumbai
              </p>
              <p className="hospital-meta">
                <span className="meta-icon">⏱</span> Avg. Wait: <strong>15 min</strong>
              </p>
              <p className="hospital-meta">
                <span className="meta-icon">👥</span> Queue: <strong>6 patients</strong>
              </p>
              <Link to="/doctor" className="btn btn-primary btn-block">Select Hospital</Link>
            </div>
          </div>

          {/* Card 5 */}
          <div className="card hospital-card">
            <div className="card-img-wrapper">
              <img
                src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&q=80"
                alt="Lifeline Children's Hospital"
                className="card-img"
              />
              <span className="badge badge-closed">Closed</span>
            </div>
            <div className="card-body">
              <h3 className="hospital-name">Lifeline Children's Hospital</h3>
              <p className="hospital-meta">
                <span className="meta-icon">📍</span> Chembur, Mumbai
              </p>
              <p className="hospital-meta">
                <span className="meta-icon">⏱</span> Avg. Wait: <strong>—</strong>
              </p>
              <p className="hospital-meta">
                <span className="meta-icon">👥</span> Queue: <strong>Unavailable</strong>
              </p>
              <button className="btn btn-disabled btn-block" disabled>Currently Closed</button>
            </div>
          </div>

        </div>
      </main>
    </>
  );
};

export default HospitalSelect;
