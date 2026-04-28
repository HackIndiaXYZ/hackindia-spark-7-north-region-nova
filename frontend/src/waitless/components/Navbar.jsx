import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          setUser(JSON.parse(userStr));
        } catch (e) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, [location.pathname]); // Re-check on navigation as well

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    if (user.role === 'admin') return '/dashboard/hospital';
    if (user.role === 'super') return '/dashboard/admin';
    return '/dashboard/patient'; // patient
  };

  return (
    <nav className="navbar">
      <div className="navbar-content container">
        <Link to={getDashboardLink()} className="logo">
          <div className="logo-icon">⚕️</div>
          <span>WaitLess</span>
        </Link>
        
        <ul className="nav-links">
          <li><Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link></li>
          <li><Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>About</Link></li>
          <li><Link to="/pricing" className={`nav-link ${location.pathname === '/pricing' ? 'active' : ''}`}>Pricing</Link></li>
          <li><Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link></li>
        </ul>
        
        <div className="nav-actions">
          {user ? (
            <>
              <Link to={getDashboardLink()} className="btn btn-secondary btn-sm">Dashboard</Link>
              <button onClick={handleLogout} className="btn btn-outline btn-sm">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary btn-sm">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
            </>
          )}
        </div>
      </div>
      <style>{`
        .nav-link.active {
          color: var(--primary);
          border-bottom-color: var(--primary);
        }
        .logo {
          text-decoration: none;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
