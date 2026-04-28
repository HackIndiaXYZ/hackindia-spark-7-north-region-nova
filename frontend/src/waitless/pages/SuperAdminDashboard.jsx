import React from 'react';

const SuperAdminDashboard = () => {
  return (
    <>
      <section className="page-header">
        <div className="container dashboard-header-row">
          <div>
            <h1 className="page-title">Super Admin Dashboard</h1>
            <p className="page-subtitle">Global System Overview & Management</p>
          </div>
        </div>
      </section>

      <main className="container admin-section">
        <div className="stats-row">
          <div className="card stat-card">
            <p className="stat-card-icon">🏥</p>
            <p className="stat-card-value">24</p>
            <p className="stat-card-label">Total Hospitals</p>
          </div>
          <div className="card stat-card">
            <p className="stat-card-icon">👨‍⚕️</p>
            <p className="stat-card-value">156</p>
            <p className="stat-card-label">Active Queues</p>
          </div>
          <div className="card stat-card">
            <p className="stat-card-icon">👥</p>
            <p className="stat-card-value">1,420</p>
            <p className="stat-card-label">Patients Waiting</p>
          </div>
          <div className="card stat-card">
            <p className="stat-card-icon">✅</p>
            <p className="stat-card-value">8,940</p>
            <p className="stat-card-label">Patients Served Today</p>
          </div>
        </div>

        <div className="card table-card">
          <div className="table-toolbar">
            <h3 className="table-title">Hospital Network Status</h3>
          </div>

          <div className="table-wrapper">
            <table className="queue-table">
              <thead>
                <tr>
                  <th>Hospital Name</th>
                  <th>Location</th>
                  <th>Active Queues</th>
                  <th>Total Waiting</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>City General Hospital</strong></td>
                  <td>Mumbai, MH</td>
                  <td>12</td>
                  <td>145</td>
                  <td><span className="status-chip chip-active">Operational</span></td>
                </tr>
                <tr>
                  <td><strong>St. Mary's Medical Centre</strong></td>
                  <td>Pune, MH</td>
                  <td>8</td>
                  <td>89</td>
                  <td><span className="status-chip chip-active">Operational</span></td>
                </tr>
                <tr>
                  <td><strong>Sunrise Multispeciality</strong></td>
                  <td>Dadar, Mumbai</td>
                  <td>18</td>
                  <td>312</td>
                  <td><span className="status-chip chip-next" style={{ background: '#fef3c7', color: '#92400e' }}>High Load</span></td>
                </tr>
                <tr>
                  <td><strong>Apollo Wellness Clinic</strong></td>
                  <td>Bangalore, KA</td>
                  <td>5</td>
                  <td>22</td>
                  <td><span className="status-chip chip-active">Operational</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
};

export default SuperAdminDashboard;
