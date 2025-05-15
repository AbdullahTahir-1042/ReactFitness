import React from 'react';

function LifetimeStats({ lifetimeStats }) {
  if (!lifetimeStats) return null;

  const stats = lifetimeStats.lifetime || {};
  
  
  return (
    <div className="card mb-4">
      <div className="card-header">
        <h3>Lifetime Stats</h3>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-6">
            <p><strong>Total Steps:</strong></p>
            <p><strong>Total Distance:</strong></p>
            <p><strong>Total Floors:</strong></p>
          </div>
          <div className="col-6">
            <p>{stats.total?.steps?.toLocaleString() || '0'}</p>
            <p>{stats.total?.distance?.toFixed(2) || '0'} miles</p>
            <p>{stats.total?.floors?.toLocaleString() || '0'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LifetimeStats; 