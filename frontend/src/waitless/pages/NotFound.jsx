import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 'var(--spacing-2xl)' }}>
      <h1 style={{ fontSize: '72px', color: 'var(--primary)', marginBottom: 'var(--spacing-md)' }}>404</h1>
      <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xl)', maxWidth: '500px' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="btn btn-primary">Return to Home</Link>
    </main>
  );
};

export default NotFound;
