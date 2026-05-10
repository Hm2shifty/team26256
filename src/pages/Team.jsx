import React from 'react';

// Team page temporarily hidden from nav.
// To restore: uncomment the NavLink in Header.jsx and restore this component's full content.
function Team() {
  return (
    <section className="page fade-in" style={{ display: 'block' }}>
      <div className="page-header">
        <h2>The Engineers</h2>
        <p>Our team roster is still being finalized. Check back soon!</p>
      </div>
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '48px' }}>
        <h3 style={{ marginBottom: '16px' }}>Roster Coming Soon</h3>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          We're finalizing our team roster for the 2026 season. Our members are currently being confirmed — 
          check back in a few months to meet the full crew behind SWERVO 26256.
        </p>
      </div>
    </section>
  );
}

export default Team;
