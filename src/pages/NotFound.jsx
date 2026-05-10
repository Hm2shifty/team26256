import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

function NotFound() {
  return (
    <section className="page fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
      <AlertCircle size={64} style={{ color: 'var(--gold)', marginBottom: '24px' }} />
      <h1 style={{ fontSize: '48px', marginBottom: '16px', color: 'var(--text-primary)' }}>404 Not Found</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '500px', marginBottom: '32px' }}>
        We couldn't find the page you're looking for. It might have been moved, deleted, or never existed in the first place.
      </p>
      <Link
        to="/"
        className="btn"
        style={{ padding: '12px 24px', fontSize: '16px', fontWeight: '500' }}
      >
        Return to Home
      </Link>
    </section>
  );
}

export default NotFound;
