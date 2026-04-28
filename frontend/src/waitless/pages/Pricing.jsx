import React from 'react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  return (
    <main>
      <section className="page-header" style={{ textAlign: 'center' }}>
        <div className="container">
          <h1 className="page-title">Simple, Transparent Pricing</h1>
          <p className="page-subtitle">Plans designed for healthcare facilities of all sizes</p>
        </div>
      </section>

      <section className="container" style={{ padding: 'var(--spacing-2xl) 0' }}>
        <div className="features-grid">
          {/* Free Plan */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--text-secondary)' }}>Starter</h3>
            <h2 style={{ fontSize: '48px', margin: 'var(--spacing-md) 0' }}>₹0<span style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>/mo</span></h2>
            <p>Perfect for individual clinics</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 'var(--spacing-lg) 0', flex: 1 }}>
              <li style={{ padding: '8px 0', borderBottom: '1px solid var(--border)' }}>Up to 50 patients/day</li>
              <li style={{ padding: '8px 0', borderBottom: '1px solid var(--border)' }}>1 Doctor Account</li>
              <li style={{ padding: '8px 0', borderBottom: '1px solid var(--border)' }}>Basic Queue Management</li>
            </ul>
            <Link to="/register" className="btn btn-outline btn-block">Get Started</Link>
          </div>

          {/* Pro Plan */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', borderColor: 'var(--primary)', boxShadow: 'var(--shadow-md)', transform: 'translateY(-8px)' }}>
            <div style={{ background: 'var(--primary)', color: 'white', padding: '4px 0', margin: '-var(--spacing-lg) -var(--spacing-lg) var(--spacing-lg) -var(--spacing-lg)', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase' }}>Most Popular</div>
            <h3 style={{ color: 'var(--primary)' }}>Professional</h3>
            <h2 style={{ fontSize: '48px', margin: 'var(--spacing-md) 0' }}>₹4,999<span style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>/mo</span></h2>
            <p>For growing hospitals and polyclinics</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 'var(--spacing-lg) 0', flex: 1 }}>
              <li style={{ padding: '8px 0', borderBottom: '1px solid var(--border)' }}>Unlimited patients</li>
              <li style={{ padding: '8px 0', borderBottom: '1px solid var(--border)' }}>Up to 10 Doctor Accounts</li>
              <li style={{ padding: '8px 0', borderBottom: '1px solid var(--border)' }}>Live Dashboard Analytics</li>
              <li style={{ padding: '8px 0', borderBottom: '1px solid var(--border)' }}>Priority Support</li>
            </ul>
            <Link to="/register" className="btn btn-primary btn-block">Start Free Trial</Link>
          </div>

          {/* Enterprise Plan */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--text-secondary)' }}>Enterprise</h3>
            <h2 style={{ fontSize: '48px', margin: 'var(--spacing-md) 0' }}>Custom</h2>
            <p>For large hospital networks</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 'var(--spacing-lg) 0', flex: 1 }}>
              <li style={{ padding: '8px 0', borderBottom: '1px solid var(--border)' }}>Unlimited everything</li>
              <li style={{ padding: '8px 0', borderBottom: '1px solid var(--border)' }}>Custom Integrations (HIS/EMR)</li>
              <li style={{ padding: '8px 0', borderBottom: '1px solid var(--border)' }}>Dedicated Account Manager</li>
              <li style={{ padding: '8px 0', borderBottom: '1px solid var(--border)' }}>White-labeling Options</li>
            </ul>
            <Link to="/contact" className="btn btn-outline btn-block">Contact Sales</Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Pricing;
