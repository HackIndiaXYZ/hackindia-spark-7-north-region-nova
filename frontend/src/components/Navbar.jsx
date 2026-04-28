import React from 'react';
import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

const Navbar = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 2rem', borderBottom: '1px solid var(--border)', alignItems: 'center', backgroundColor: 'var(--bg-color)', position: 'sticky', top: 0, zIndex: 50, boxShadow: 'var(--shadow-sm)' }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'var(--text-dark)' }}>
        <Activity size={28} color="var(--primary)" />
        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '-0.5px' }}>WaitLess</span>
      </Link>
      
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', display: 'none' /* Will show on desktop */ }} className="nav-links">
        <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-dark)', fontWeight: '500' }}>Home</Link>
        <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-light)', fontWeight: '500' }}>Hospitals</Link>
        <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-light)', fontWeight: '500' }}>Pricing</Link>
        <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-light)', fontWeight: '500' }}>About</Link>
      </div>

      <div>
        <Link to="/auth" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          Login / Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
