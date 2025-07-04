import React from 'react';

const Unauthorized = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
    <h1 style={{ color: '#e53e3e', fontSize: '2.5rem', marginBottom: '1rem' }}>403 - Unauthorized</h1>
    <p style={{ fontSize: '1.2rem' }}>You do not have permission to access this page.</p>
  </div>
);

export default Unauthorized; 